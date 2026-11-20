/**
 * Firestore + Cloud Storage over REST.
 *
 * Replaces firebase-admin so the app runs on Cloudflare Workers: workerd has no
 * gRPC/protobuf codegen (firebase-admin throws "Code generation from strings
 * disallowed"). Exposes the small subset of the Admin SDK API this app uses, so
 * call sites are unchanged: collection/doc/get/set/update/add/delete/where/
 * orderBy/limit/batch, and bucket/file/save/delete/getSignedUrl/getFiles.
 *
 * Auth uses the service account's private key via WebCrypto (works in Node and
 * workerd) to mint OAuth tokens.
 */
const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1'
const STORAGE_BASE = 'https://storage.googleapis.com'

interface ServiceAccount {
  project_id: string
  client_email: string
  private_key: string
}

let account: ServiceAccount | null = null
let cachedToken: { value: string; expiresAt: number } | null = null
// Single-flight: on a cold isolate several parallel Firestore calls each used to
// mint their own OAuth token (sign + token endpoint). Share one mint instead.
let tokenRequest: Promise<string> | null = null

function getAccount(): ServiceAccount {
  if (account) return account
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set')
  account = JSON.parse(raw)
  return account as ServiceAccount
}

function base64Url(input: Uint8Array | ArrayBuffer): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input)
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function pemToBytes(pem: string): Uint8Array {
  const b64 = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '')
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
}

async function importKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'pkcs8',
    pemToBytes(getAccount().private_key) as unknown as BufferSource,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )
}

function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return Promise.resolve(cachedToken.value)
  }

  tokenRequest ??= mintAccessToken().finally(() => {
    tokenRequest = null
  })
  return tokenRequest
}

async function mintAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = base64Url(new TextEncoder().encode(JSON.stringify({ alg: 'RS256', typ: 'JWT' })))
  const claims = base64Url(
    new TextEncoder().encode(
      JSON.stringify({
        iss: getAccount().client_email,
        scope: 'https://www.googleapis.com/auth/cloud-platform',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
      })
    )
  )
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    await importKey(),
    new TextEncoder().encode(`${header}.${claims}`)
  )

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${base64Url(signature)}`,
    }),
  })
  if (!res.ok) throw new Error(`Google token request failed: ${res.status} ${await res.text()}`)

  const body = (await res.json()) as { access_token: string; expires_in: number }
  cachedToken = { value: body.access_token, expiresAt: Date.now() + body.expires_in * 1000 }
  return cachedToken.value
}

async function authedFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${await getAccessToken()}`)
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

  let res = await fetch(url, { ...init, headers })
  if (res.status === 401) {
    cachedToken = null
    headers.set('Authorization', `Bearer ${await getAccessToken()}`)
    res = await fetch(url, { ...init, headers })
  }
  return res
}

async function jsonRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await authedFetch(url, init)
  if (!res.ok) {
    throw new Error(`${init?.method || 'GET'} ${url} failed: ${res.status} ${await res.text()}`)
  }
  return (await res.json()) as T
}

/* ------------------------------- values -------------------------------- */

type RawValue = Record<string, any>
type RawFields = Record<string, RawValue>

function encodeValue(value: unknown): RawValue {
  if (value === null || value === undefined) return { nullValue: null }
  if (typeof value === 'string') return { stringValue: value }
  if (typeof value === 'boolean') return { booleanValue: value }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value }
  }
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encodeValue) } }
  if (typeof value === 'object') {
    return { mapValue: { fields: encodeFields(value as Record<string, unknown>) } }
  }
  return { nullValue: null }
}

function encodeFields(data: object): RawFields {
  const fields: RawFields = {}
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) fields[key] = encodeValue(value)
  }
  return fields
}

function decodeValue(value: RawValue): unknown {
  if (!value) return null
  if ('stringValue' in value) return value.stringValue
  if ('integerValue' in value) return Number(value.integerValue)
  if ('doubleValue' in value) return value.doubleValue
  if ('booleanValue' in value) return value.booleanValue
  if ('nullValue' in value) return null
  if ('timestampValue' in value) return value.timestampValue
  if ('arrayValue' in value) return (value.arrayValue.values || []).map(decodeValue)
  if ('mapValue' in value) return decodeFields(value.mapValue.fields || {})
  return null
}

function decodeFields(fields: RawFields | undefined): Record<string, unknown> {
  const data: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(fields || {})) data[key] = decodeValue(value)
  return data
}

/* ------------------------------ firestore ------------------------------ */

const OPS: Record<string, string> = {
  '==': 'EQUAL',
  '!=': 'NOT_EQUAL',
  '<': 'LESS_THAN',
  '<=': 'LESS_THAN_OR_EQUAL',
  '>': 'GREATER_THAN',
  '>=': 'GREATER_THAN_OR_EQUAL',
  'array-contains': 'ARRAY_CONTAINS',
  'array-contains-any': 'ARRAY_CONTAINS_ANY',
  in: 'IN',
  'not-in': 'NOT_IN',
}

const documentsBase = () =>
  `${FIRESTORE_BASE}/projects/${getAccount().project_id}/databases/(default)/documents`

const documentName = (path: string) =>
  `projects/${getAccount().project_id}/databases/(default)/documents/${path}`

export interface QueryDocumentSnapshot {
  id: string
  ref: DocumentReference
  data(): Record<string, any>
}

export interface QuerySnapshot {
  docs: QueryDocumentSnapshot[]
  empty: boolean
  size: number
}

interface Filter {
  field: string
  op: string
  value: unknown
}

export class Query {
  constructor(
    protected db: Firestore,
    readonly path: string,
    protected filters: Filter[] = [],
    protected ordering: { field: string; dir: 'ASCENDING' | 'DESCENDING' } | null = null,
    protected max: number | null = null
  ) {}

  where(field: string, op: string, value: unknown): Query {
    return new Query(this.db, this.path, [...this.filters, { field, op, value }], this.ordering, this.max)
  }

  orderBy(field: string, dir: 'asc' | 'desc' = 'asc'): Query {
    return new Query(this.db, this.path, this.filters, {
      field,
      dir: dir === 'desc' ? 'DESCENDING' : 'ASCENDING',
    }, this.max)
  }

  limit(n: number): Query {
    return new Query(this.db, this.path, this.filters, this.ordering, n)
  }

  async get(): Promise<QuerySnapshot> {
    const segments = this.path.split('/')
    const collectionId = segments.pop()!
    const parent = segments.join('/')
    const url = parent ? `${documentsBase()}/${parent}:runQuery` : `${documentsBase()}:runQuery`

    const fieldFilters = this.filters.map((f) => ({
      fieldFilter: {
        field: { fieldPath: f.field },
        op: OPS[f.op] || 'EQUAL',
        value: encodeValue(f.value),
      },
    }))

    const structuredQuery: Record<string, any> = {
      from: [{ collectionId }],
    }
    if (fieldFilters.length === 1) structuredQuery.where = fieldFilters[0]
    if (fieldFilters.length > 1) {
      structuredQuery.where = { compositeFilter: { op: 'AND', filters: fieldFilters } }
    }

    if (this.ordering) {
      structuredQuery.orderBy = [
        { field: { fieldPath: this.ordering.field }, direction: this.ordering.dir },
      ]
    }
    if (this.max !== null) structuredQuery.limit = this.max

    const results = await jsonRequest<Array<{ document?: any }>>(url, {
      method: 'POST',
      body: JSON.stringify({ structuredQuery }),
    })

    const docs = results
      .filter((r) => r.document)
      .map((r) => {
        const id = String(r.document.name).split('/').pop()!
        const ref = new DocumentReference(this.db, String(r.document.name).split('/documents/')[1])
        return { id, ref, data: () => decodeFields(r.document.fields) }
      })

    return { docs, empty: docs.length === 0, size: docs.length }
  }
}

export class CollectionReference extends Query {
  doc(id: string): DocumentReference {
    return new DocumentReference(this.db, `${this.path}/${id}`)
  }

  async add(data: object): Promise<DocumentReference> {
    const res = await jsonRequest<{ name: string }>(`${documentsBase()}/${this.path}`, {
      method: 'POST',
      body: JSON.stringify({ fields: encodeFields(data) }),
    })
    return new DocumentReference(this.db, String(res.name).split('/documents/')[1])
  }
}

export class DocumentReference {
  constructor(protected db: Firestore, readonly path: string) {}

  get id(): string {
    return this.path.split('/').pop()!
  }

  collection(name: string): CollectionReference {
    return new CollectionReference(this.db, `${this.path}/${name}`)
  }

  async get(): Promise<{ exists: boolean; id: string; ref: DocumentReference; data(): any }> {
    const res = await authedFetch(`${documentsBase()}/${this.path}`)
    if (res.status === 404) {
      return { exists: false, id: this.id, ref: this, data: () => undefined }
    }
    if (!res.ok) throw new Error(`GET ${this.path} failed: ${res.status} ${await res.text()}`)
    const doc = (await res.json()) as { fields?: RawFields }
    return { exists: true, id: this.id, ref: this, data: () => decodeFields(doc.fields) }
  }

  async set(data: object): Promise<void> {
    // PATCH without an update mask replaces the whole document (Firestore set()).
    await jsonRequest(`${documentsBase()}/${this.path}`, {
      method: 'PATCH',
      body: JSON.stringify({ fields: encodeFields(data) }),
    })
  }

  async update(data: object): Promise<void> {
    const params = new URLSearchParams()
    for (const field of Object.keys(data)) params.append('updateMask.fieldPaths', field)
    await jsonRequest(`${documentsBase()}/${this.path}?${params}`, {
      method: 'PATCH',
      body: JSON.stringify({ fields: encodeFields(data) }),
    })
  }

  async delete(): Promise<void> {
    await jsonRequest(`${documentsBase()}/${this.path}`, { method: 'DELETE' })
  }
}

export class WriteBatch {
  private writes: Array<Record<string, unknown>> = []

  constructor(private db: Firestore) {}

  update(ref: DocumentReference, data: object): void {
    this.writes.push({
      update: { name: documentName(ref.path), fields: encodeFields(data) },
      updateMask: { fieldPaths: Object.keys(data) },
    })
  }

  delete(ref: DocumentReference): void {
    this.writes.push({ delete: documentName(ref.path) })
  }

  async commit(): Promise<void> {
    if (this.writes.length === 0) return
    await jsonRequest(`${documentsBase()}:commit`, {
      method: 'POST',
      body: JSON.stringify({ writes: this.writes }),
    })
    this.writes = []
  }
}

export class Firestore {
  collection(path: string): CollectionReference {
    return new CollectionReference(this, path)
  }

  batch(): WriteBatch {
    return new WriteBatch(this)
  }
}

let firestore: Firestore | null = null

export const getFirestore = (): Firestore => {
  if (!firestore) firestore = new Firestore()
  return firestore
}

/* ------------------------------- storage ------------------------------- */

const bucketName = () =>
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${getAccount().project_id}.firebasestorage.app`

export class StorageFile {
  constructor(
    readonly bucket: Bucket,
    readonly path: string
  ) {}

  get name(): string {
    return this.path
  }

  /** Upload (create or replace) a file's contents. */
  async save(
    data: Uint8Array | ArrayBuffer | string,
    opts: { contentType?: string } = {}
  ): Promise<void> {
    const contentType = opts.contentType || 'application/octet-stream'
    const body =
      typeof data === 'string'
        ? new TextEncoder().encode(data)
        : data instanceof Uint8Array
          ? data
          : new Uint8Array(data)
    const url = `${STORAGE_BASE}/upload/storage/v1/b/${this.bucket.name}/o?uploadType=media&name=${encodeURIComponent(this.path)}`
    const res = await authedFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': contentType },
      body: body as unknown as BodyInit,
    })
    if (!res.ok) throw new Error(`SAVE ${this.path} failed: ${res.status} ${await res.text()}`)
  }

  async delete(opts: { ignoreNotFound?: boolean } = {}): Promise<void> {
    const url = `${STORAGE_BASE}/storage/v1/b/${this.bucket.name}/o/${encodeURIComponent(this.path)}`
    const res = await authedFetch(url, { method: 'DELETE' })
    if (!res.ok && !(opts.ignoreNotFound && res.status === 404)) {
      throw new Error(`DELETE ${this.path} failed: ${res.status} ${await res.text()}`)
    }
  }

  async getSignedUrl(opts: {
    version?: string
    action: 'read' | 'write' | 'delete' | 'resumable'
    expires: number
    contentType?: string
  }): Promise<[string]> {
    const method = opts.action === 'write' ? 'PUT' : 'GET'
    const host = 'storage.googleapis.com'
    const now = new Date()
    const datestamp = now.toISOString().slice(0, 10).replace(/-/g, '')
    const timestamp = now.toISOString().replace(/[^\dTZ]/g, '').slice(0, 15) + 'Z'
    const scope = `${datestamp}/auto/storage/goog4_request`
    const credential = `${getAccount().client_email}/${scope}`
    const expires = Math.max(1, Math.floor((opts.expires - Date.now()) / 1000))

    const canonicalUri = `/${this.bucket.name}/${this.path.split('/').map(encodeURIComponent).join('/')}`

    const signed: Array<[string, string]> = [['host', host]]
    if (opts.action === 'write' && opts.contentType) signed.push(['content-type', opts.contentType])
    signed.sort((a, b) => (a[0] < b[0] ? -1 : 1))
    const canonicalHeaders = signed.map(([k, v]) => `${k}:${v}\n`).join('')
    const signedHeaders = signed.map(([k]) => k).join(';')

    const query = (
      [
        ['X-Goog-Algorithm', 'GOOG4-RSA-SHA256'],
        ['X-Goog-Credential', credential],
        ['X-Goog-Date', timestamp],
        ['X-Goog-Expires', String(expires)],
        ['X-Goog-SignedHeaders', signedHeaders],
      ] as Array<[string, string]>
    )
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')

    const canonicalRequest = [
      method,
      canonicalUri,
      query,
      canonicalHeaders,
      signedHeaders,
      'UNSIGNED-PAYLOAD',
    ].join('\n')

    const requestHash = await sha256Hex(canonicalRequest)
    const stringToSign = `GOOG4-RSA-SHA256\n${timestamp}\n${scope}\n${requestHash}`
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      await importKey(),
      new TextEncoder().encode(stringToSign)
    )
    const hex = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    return [`https://${host}${canonicalUri}?${query}&X-Goog-Signature=${hex}`]
  }
}

export class Bucket {
  constructor(readonly name: string) {}

  file(path: string): StorageFile {
    return new StorageFile(this, path)
  }

  async getFiles(opts: { prefix?: string } = {}): Promise<[StorageFile[], undefined]> {
    const files: StorageFile[] = []
    let pageToken: string | undefined
    do {
      const params = new URLSearchParams({ maxResults: '1000' })
      if (opts.prefix) params.set('prefix', opts.prefix)
      if (pageToken) params.set('pageToken', pageToken)
      const res = await jsonRequest<{ items?: Array<{ name: string }>; nextPageToken?: string }>(
        `${STORAGE_BASE}/storage/v1/b/${this.name}/o?${params}`
      )
      for (const item of res.items || []) files.push(new StorageFile(this, item.name))
      pageToken = res.nextPageToken
    } while (pageToken)
    return [files, undefined]
  }
}

export class Storage {
  bucket(name?: string): Bucket {
    return new Bucket(name || bucketName())
  }
}

let storage: Storage | null = null

export const getStorage = (): Storage => {
  if (!storage) storage = new Storage()
  return storage
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

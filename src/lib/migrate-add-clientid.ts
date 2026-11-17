import { getFirestore } from './firebase-admin'

interface MigrationResults {
  success: number
  alreadyMigrated: number
  orphaned: number
  multipleClients: number
  errors: number
}

interface OrphanedDoc {
  id: string
  phone?: string
  title: string
}

interface MultipleClientDoc {
  id: string
  phone: string
  title: string
  clients: Array<{ id: string; name: string }>
}

/**
 * One-time migration: add clientId to documents that only have a phone number.
 */
export async function migrateAddClientId() {
  const db = getFirestore()

  console.log('Starting migration: Add clientId to documents')

  const docsSnapshot = await db.collection('documents').get()
  console.log(`Found ${docsSnapshot.size} documents to migrate`)

  const results: MigrationResults = {
    success: 0,
    alreadyMigrated: 0,
    orphaned: 0,
    multipleClients: 0,
    errors: 0,
  }

  const orphanedDocs: OrphanedDoc[] = []
  const multipleClientDocs: MultipleClientDoc[] = []

  const batchSize = 500
  let batch = db.batch()
  let batchCount = 0

  for (const doc of docsSnapshot.docs) {
    const data = doc.data()

    if (data.clientId) {
      results.alreadyMigrated++
      continue
    }

    const phone = data.phone

    if (!phone) {
      results.orphaned++
      orphanedDocs.push({ id: doc.id, title: data.title })
      continue
    }

    const clientSnapshot = await db
      .collection('users')
      .where('phones', 'array-contains', phone)
      .get()

    if (clientSnapshot.empty) {
      results.orphaned++
      orphanedDocs.push({ id: doc.id, phone, title: data.title })
      continue
    }

    if (clientSnapshot.size > 1) {
      results.multipleClients++
      multipleClientDocs.push({
        id: doc.id,
        phone,
        title: data.title,
        clients: clientSnapshot.docs.map((c) => ({ id: c.id, name: c.data().name })),
      })
      continue
    }

    const clientId = clientSnapshot.docs[0].id
    batch.update(doc.ref, { clientId })
    batchCount++
    results.success++

    if (batchCount >= batchSize) {
      await batch.commit()
      batch = db.batch()
      batchCount = 0
    }
  }

  if (batchCount > 0) {
    await batch.commit()
  }

  console.log('Migration complete:', results)
  return { results, orphanedDocs, multipleClientDocs }
}

<script lang="ts">
  import { onMount } from 'svelte'
  import { auth } from '#lib/auth.svelte'
  import ClientList from '#lib/components/admin/ClientList.svelte'
  import ClientForm from '#lib/components/admin/ClientForm.svelte'
  import DocumentList from '#lib/components/admin/DocumentList.svelte'
  import DocumentForm from '#lib/components/admin/DocumentForm.svelte'
  import ConfirmDialog from '#lib/components/admin/ConfirmDialog.svelte'
  import CategoryManager from '#lib/components/admin/CategoryManager.svelte'
  import PasswordConfirmDialog from '#lib/components/admin/PasswordConfirmDialog.svelte'
  import { CATEGORIES } from '#lib/document-categories'
  import type {
    ClientRecord,
    DocumentRecord,
    UploadPreset,
    CategoryConfig,
  } from '#lib/components/admin/types'

  type ModalMode = 'create' | 'edit' | null

  let clients = $state<ClientRecord[]>([])
  let selectedClient = $state<ClientRecord | null>(null)
  let documents = $state<DocumentRecord[]>([])
  let loadingClients = $state(true)
  let loadingDocs = $state(false)
  let initialDocsLoaded = $state(false)

  let clientModal = $state<ModalMode>(null)
  let editingClient = $state<ClientRecord | null>(null)
  let deletingClient = $state<ClientRecord | null>(null)
  let creatingClient = $state(false)
  let updatingClient = $state(false)
  let isDeletingClient = $state(false)

  let categories = $state<Record<string, CategoryConfig>>(structuredClone(CATEGORIES))
  let categoryModal = $state(false)
  let loadingCategories = $state(false)
  let showPasswordConfirm = $state(false)

  let docModal = $state<ModalMode>(null)
  let editingDoc = $state<DocumentRecord | null>(null)
  let deletingDoc = $state<DocumentRecord | null>(null)
  let isDeletingDoc = $state(false)
  let uploading = $state(false)
  let uploadProgress = $state('')
  let uploadPreset = $state<UploadPreset | null>(null)

  let toast = $state<{ message: string; type: 'success' | 'error' } | null>(null)
  let toastTimer: ReturnType<typeof setTimeout> | undefined

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    toast = { message, type }
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (toast = null), 3000)
  }

  onMount(() => {
    loadClients()
    loadCategories()
  })

  $effect(() => {
    const client = selectedClient
    if (client) {
      initialDocsLoaded = false
      loadDocuments(client.id)
    } else {
      documents = []
      initialDocsLoaded = false
    }
  })

  function authHeaders() {
    return { Authorization: 'Bearer ' + auth.getToken() }
  }

  async function loadClients() {
    try {
      loadingClients = true
      const res = await fetch('/api/admin/clients', { headers: authHeaders() })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      clients = (Array.isArray(data) ? data : []).map((client: any) => ({
        ...client,
        phones: client.phones || (client.phone ? [client.phone] : []),
      }))
    } catch {
      showToast('Failed to load clients', 'error')
    } finally {
      loadingClients = false
    }
  }

  async function loadCategories() {
    try {
      loadingCategories = true
      const res = await fetch('/api/admin/categories', { headers: authHeaders() })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      if (data.categories && Object.keys(data.categories).length > 0) {
        categories = data.categories
      } else {
        await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...authHeaders() },
          body: JSON.stringify({ categories: CATEGORIES }),
        })
      }
    } catch (error) {
      console.error('Failed to load categories', error)
    } finally {
      loadingCategories = false
    }
  }

  async function handleSaveCategories(nextCategories: Record<string, CategoryConfig>) {
    try {
      loadingCategories = true
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ categories: nextCategories }),
      })
      if (!res.ok) throw new Error('Failed')
      categories = nextCategories
      categoryModal = false
      showToast('Categories updated successfully')
    } catch {
      showToast('Failed to save categories', 'error')
    } finally {
      loadingCategories = false
    }
  }

  async function handlePasswordConfirm(password: string) {
    if (!auth.user?.email) throw new Error('Not authenticated')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: auth.user.email, password }),
    })

    if (!res.ok) throw new Error('Invalid password')

    showPasswordConfirm = false
    categoryModal = true
  }

  async function loadDocuments(clientId: string) {
    try {
      loadingDocs = true
      const res = await fetch('/api/admin/clients/' + clientId + '/documents', {
        headers: authHeaders(),
      })
      if (!res.ok) throw new Error('Failed')
      documents = await res.json()
      initialDocsLoaded = true
    } catch {
      showToast('Failed to load documents', 'error')
    } finally {
      loadingDocs = false
    }
  }

  async function handleCreateClient(data: { name: string; phones: string[]; gstNumber?: string }) {
    try {
      creatingClient = true
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed')
      }
      clientModal = null
      await loadClients()
      showToast('Client created successfully')
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to create client', 'error')
    } finally {
      creatingClient = false
    }
  }

  async function handleUpdateClient(data: { name: string; phones: string[]; gstNumber?: string }) {
    if (!editingClient) return
    try {
      updatingClient = true
      const res = await fetch('/api/admin/clients/' + editingClient.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed')
      }
      const updated = { ...editingClient, ...data }
      editingClient = null
      clientModal = null
      await loadClients()
      if (selectedClient?.id === updated.id) selectedClient = updated
      showToast('Client updated successfully')
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to update client', 'error')
    } finally {
      updatingClient = false
    }
  }

  async function handleDeleteClient() {
    if (!deletingClient) return
    isDeletingClient = true
    try {
      await fetch('/api/admin/clients/' + deletingClient.id, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      if (selectedClient?.id === deletingClient.id) selectedClient = null
      deletingClient = null
      await loadClients()
      showToast('Client deleted successfully')
    } catch {
      showToast('Failed to delete client', 'error')
    } finally {
      isDeletingClient = false
    }
  }

  async function uploadFileViaSignedUrl(file: File, filePath: string) {
    const urlRes = await fetch('/api/admin/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ filePath, contentType: file.type }),
    })
    if (!urlRes.ok) throw new Error('Failed to get upload URL')
    const { url } = await urlRes.json()
    const uploadRes = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    })
    if (!uploadRes.ok) throw new Error('Failed to upload file to storage')
  }

  async function handleCreateDocument(data: {
    title: string
    file: File | null
    files: File[]
    category: string
    fiscalYear: string | null
    subCategory: string | null
  }) {
    if (!selectedClient) return
    const filesToUpload = data.files.length > 0 ? data.files : data.file ? [data.file] : []
    if (filesToUpload.length === 0) return
    const isMulti = filesToUpload.length > 1

    try {
      uploading = true
      let failed = 0
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i]
        if (isMulti) uploadProgress = `Uploading ${i + 1} of ${filesToUpload.length}...`
        const fileTitle = isMulti ? file.name.replace(/\.[^/.]+$/, '') : data.title

        const pathParts = ['JPCO Client Documents', selectedClient.name, data.category]
        if (data.fiscalYear) pathParts.push(data.fiscalYear)
        if (data.subCategory) pathParts.push(data.subCategory)
        pathParts.push(file.name)
        const filePath = pathParts.join('/')

        try {
          await uploadFileViaSignedUrl(file, filePath)
          const res = await fetch('/api/admin/clients/' + selectedClient.id + '/documents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeaders() },
            body: JSON.stringify({
              title: fileTitle,
              filePath,
              category: data.category,
              fiscalYear: data.fiscalYear,
              subCategory: data.subCategory,
            }),
          })
          if (!res.ok) failed++
        } catch {
          failed++
        }
      }
      docModal = null
      uploadPreset = null
      await loadDocuments(selectedClient.id)
      if (failed > 0) {
        showToast(`${filesToUpload.length - failed} uploaded, ${failed} failed`, 'error')
      } else {
        showToast(isMulti ? `${filesToUpload.length} documents uploaded` : 'Document uploaded')
      }
    } catch {
      showToast('Failed to upload documents', 'error')
    } finally {
      uploading = false
      uploadProgress = ''
    }
  }

  async function handleUpdateDocument(data: {
    title: string
    file: File | null
    category: string
    fiscalYear: string | null
    subCategory: string | null
  }) {
    if (!selectedClient || !editingDoc) return
    try {
      uploading = true
      let newFilePath: string | undefined
      if (data.file) {
        const pathParts = ['JPCO Client Documents', selectedClient.name, data.category]
        if (data.fiscalYear) pathParts.push(data.fiscalYear)
        if (data.subCategory) pathParts.push(data.subCategory)
        pathParts.push(data.file.name)
        newFilePath = pathParts.join('/')
        await uploadFileViaSignedUrl(data.file, newFilePath)
      }

      const res = await fetch(
        '/api/admin/clients/' + selectedClient.id + '/documents/' + editingDoc.id,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ...authHeaders() },
          body: JSON.stringify({
            title: data.title,
            filePath: newFilePath,
            category: data.category,
            fiscalYear: data.fiscalYear,
            subCategory: data.subCategory,
          }),
        }
      )

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed')
      }

      editingDoc = null
      docModal = null
      await loadDocuments(selectedClient.id)
      showToast('Document updated')
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to update document', 'error')
    } finally {
      uploading = false
    }
  }

  async function handleDeleteDocument() {
    if (!selectedClient || !deletingDoc) return
    isDeletingDoc = true
    try {
      await fetch(
        '/api/admin/clients/' + selectedClient.id + '/documents/' + deletingDoc.id,
        { method: 'DELETE', headers: authHeaders() }
      )
      deletingDoc = null
      await loadDocuments(selectedClient.id)
      showToast('Document deleted successfully')
    } catch {
      showToast('Failed to delete document', 'error')
    } finally {
      isDeletingDoc = false
    }
  }
</script>

<div class="h-screen flex overflow-hidden bg-surface relative">
  <div class="absolute inset-0 diagonal-stripes pointer-events-none z-0"></div>

  <aside class="w-80 flex-shrink-0 bg-sidebar flex flex-col shadow-sidebar z-10 relative">
    <div class="px-6 py-5 border-b-2 border-sidebar-border relative">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="w-10 h-10 rounded-none bg-ink flex items-center justify-center">
            <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.5}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent"></div>
        </div>
        <div>
          <h1 class="text-ink-inverse text-lg font-display font-bold tracking-tight leading-none">JPCO<span class="text-accent">.</span></h1>
          <p class="text-ink-muted text-[10px] font-mono uppercase tracking-widest mt-0.5">Admin Dashboard</p>
        </div>
      </div>
    </div>

    <nav class="px-3 pt-3 pb-1 flex flex-col gap-1 border-b-2 border-sidebar-border">
      <a
        href="/admin/reports"
        class="flex items-center gap-3 px-3 py-2.5 rounded-none bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 transition-colors group"
        title="Open Reports"
      >
        <span class="w-7 h-7 flex items-center justify-center bg-accent text-white shadow-bold">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </span>
        <span class="flex-1">
          <span class="block text-ink-inverse text-sm font-display font-bold tracking-tight leading-none">Reports</span>
          <span class="block text-ink-muted text-[10px] font-mono uppercase tracking-widest mt-0.5">Chat &amp; Clients</span>
        </span>
        <svg class="w-3.5 h-3.5 text-accent-light opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </a>
    </nav>

    <div class="px-6 pt-4 pb-2 flex items-center justify-between">
      <span class="eyebrow text-ink-muted">Clients</span>
      <div class="flex gap-1">
        <button
          onclick={() => (showPasswordConfirm = true)}
          class="w-8 h-8 flex items-center justify-center rounded-none bg-accent/15 hover:bg-accent/25 text-accent-light transition-colors border border-accent/20 hover:border-accent/40"
          title="Manage categories"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
        </button>
        <button
          onclick={() => {
            editingClient = null
            clientModal = 'create'
          }}
          class="w-8 h-8 flex items-center justify-center rounded-none bg-accent/15 hover:bg-accent/25 text-accent-light transition-colors border border-accent/20 hover:border-accent/40"
          title="Add client"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto py-1 px-3 min-h-0">
      {#if loadingClients}
        <div class="px-3 py-8 space-y-3">
          {#each [0, 1, 2] as i (i)}
            <div class="flex items-center gap-3 animate-pulse-soft">
              <div class="w-10 h-10 rounded-none bg-sidebar-hover"></div>
              <div class="flex-1 space-y-1.5">
                <div class="h-3 bg-sidebar-hover w-3/4"></div>
                <div class="h-2 bg-sidebar-hover w-1/2"></div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <ClientList
          {clients}
          selectedClientId={selectedClient?.id || null}
          onSelect={(client) => (selectedClient = client)}
          onEdit={(client) => {
            editingClient = client
            clientModal = 'edit'
          }}
          onDelete={(client) => (deletingClient = client)}
        />
      {/if}
    </div>

    <div class="px-6 py-4 border-t-2 border-sidebar-border">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-none bg-accent/20 flex items-center justify-center border border-accent/30">
            <span class="text-accent-light text-xs font-bold">{auth.user?.email?.[0]?.toUpperCase() || 'A'}</span>
          </div>
          <span class="text-xs text-ink-muted truncate max-w-[140px] font-mono">{auth.user?.email}</span>
        </div>
        <button
          onclick={() => auth.signOut()}
          class="w-8 h-8 flex items-center justify-center rounded-none hover:bg-sidebar-hover text-ink-muted hover:text-danger transition-colors border border-transparent hover:border-danger/30"
          title="Sign out"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
        </button>
      </div>
    </div>
  </aside>

  <main class="flex-1 flex flex-col min-h-0 z-10">
    {#if selectedClient}
      <div class="flex-1 flex flex-col min-h-0 animate-panel-in">
        <header class="px-8 py-5 border-b-2 border-ink/10 bg-white/80 backdrop-blur-sm flex-shrink-0 relative">
          <div class="absolute top-0 left-0 w-24 h-1 bg-accent"></div>
          <div class="flex items-center justify-between">
            <div>
              <span class="eyebrow text-ink-muted">Managing Documents For</span>
              <div class="flex items-center gap-3 mt-1">
                <h2 class="text-2xl font-display font-bold text-ink tracking-tight leading-none">{selectedClient.name}</h2>
                <span class="inline-flex items-center px-2 py-0.5 bg-teal-light text-teal text-[10px] font-bold uppercase tracking-wider rounded-none border border-teal/20">
                  Active
                </span>
              </div>
              <p class="text-xs text-ink-muted font-mono mt-1">{selectedClient.phones[0]}</p>
            </div>
            <button
              onclick={() => {
                editingDoc = null
                docModal = 'create'
              }}
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded-none hover:bg-accent-hover transition-colors shadow-bold hover:shadow-glow-accent"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Upload Document
            </button>
          </div>
        </header>

        <div class="flex-1 overflow-y-auto p-8 min-h-0 relative">
          {#if !initialDocsLoaded && loadingDocs}
            <div class="space-y-3">
              {#each [0, 1, 2, 3] as i (i)}
                <div class="h-14 bg-white border-2 border-ink/5 rounded-none animate-pulse-soft"></div>
              {/each}
            </div>
          {:else}
            <DocumentList
              {documents}
              onEdit={(doc) => {
                editingDoc = doc
                uploadPreset = null
                docModal = 'edit'
              }}
              onDelete={(doc) => (deletingDoc = doc)}
              onUpload={(preset) => {
                editingDoc = null
                uploadPreset = preset
                docModal = 'create'
              }}
              getToken={auth.getToken}
              categoryConfig={categories}
              onDocumentsChanged={() => {
                if (selectedClient) loadDocuments(selectedClient.id)
              }}
            />
          {/if}
        </div>
      </div>
    {:else}
      <div class="flex-1 flex items-center justify-center relative">
        <div class="text-center animate-fade-in max-w-sm">
          <div class="relative inline-block mb-8">
            <div class="w-28 h-28 rounded-none bg-white border-2 border-ink/10 flex items-center justify-center shadow-bold">
              <svg class="w-14 h-14 text-ink-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-accent rotate-12"></div>
          </div>
          <span class="eyebrow mb-3 block">Client Management</span>
          <h3 class="text-2xl font-display font-bold text-ink mb-3 leading-tight">Select a Client</h3>
          <p class="text-sm text-ink-muted leading-relaxed">Choose a client from the sidebar to view and manage their documents</p>
        </div>
      </div>
    {/if}
  </main>

  {#if showPasswordConfirm}
    <PasswordConfirmDialog
      onConfirm={handlePasswordConfirm}
      onCancel={() => (showPasswordConfirm = false)}
      title="Confirm Your Identity"
      message="Managing categories requires password confirmation"
    />
  {/if}

  {#if clientModal}
    <div
      class="fixed inset-0 bg-ink/50 modal-backdrop flex items-center justify-center z-50 animate-fade-in"
      onclick={() => {
        clientModal = null
        editingClient = null
      }}
      onkeydown={(e) => {
        if (e.key === 'Escape') {
          clientModal = null
          editingClient = null
        }
      }}
      role="presentation"
    >
      <div
        class="bg-white border-2 border-ink/10 shadow-modal animate-scale-in max-w-md w-full mx-4"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
      >
        <div class="px-6 py-4 border-b-2 border-ink/10 flex items-center justify-between">
          <h3 class="text-lg font-display font-bold text-ink">{clientModal === 'create' ? 'New Client' : 'Edit Client'}</h3>
          <button
            onclick={() => {
              clientModal = null
              editingClient = null
            }}
            class="w-8 h-8 flex items-center justify-center rounded-none hover:bg-surface-hover text-ink-muted hover:text-ink transition-colors"
            aria-label="Close"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-6">
          <ClientForm
            initial={editingClient || undefined}
            onSubmit={clientModal === 'create' ? handleCreateClient : handleUpdateClient}
            onCancel={() => {
              clientModal = null
              editingClient = null
            }}
            loading={clientModal === 'create' ? creatingClient : updatingClient}
          />
        </div>
      </div>
    </div>
  {/if}

  {#if categoryModal}
    <div
      class="fixed inset-0 bg-ink/50 modal-backdrop flex items-center justify-center z-50 animate-fade-in"
      onclick={() => (categoryModal = false)}
      onkeydown={(e) => e.key === 'Escape' && (categoryModal = false)}
      role="presentation"
    >
      <div
        class="bg-white border-2 border-ink/10 shadow-modal animate-scale-in max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
      >
        <div class="px-6 py-4 border-b-2 border-ink/10 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 class="text-lg font-display font-bold text-ink">Manage Categories</h3>
          <button
            onclick={() => (categoryModal = false)}
            class="w-8 h-8 flex items-center justify-center rounded-none hover:bg-surface-hover text-ink-muted hover:text-ink transition-colors"
            aria-label="Close"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-6">
          <CategoryManager
            {categories}
            onSave={handleSaveCategories}
            onCancel={() => (categoryModal = false)}
            loading={loadingCategories}
          />
        </div>
      </div>
    </div>
  {/if}

  {#if docModal}
    <div
      class="fixed inset-0 bg-ink/50 modal-backdrop flex items-center justify-center z-50 animate-fade-in"
      onclick={() => {
        docModal = null
        editingDoc = null
        uploadPreset = null
      }}
      onkeydown={(e) => {
        if (e.key === 'Escape') {
          docModal = null
          editingDoc = null
          uploadPreset = null
        }
      }}
      role="presentation"
    >
      <div
        class="bg-white border-2 border-ink/10 shadow-modal animate-scale-in max-w-md w-full mx-4"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
      >
        <div class="px-6 py-4 border-b-2 border-ink/10 flex items-center justify-between">
          <h3 class="text-lg font-display font-bold text-ink">{docModal === 'create' ? 'Upload Document' : 'Edit Document'}</h3>
          <button
            onclick={() => {
              docModal = null
              editingDoc = null
              uploadPreset = null
            }}
            class="w-8 h-8 flex items-center justify-center rounded-none hover:bg-surface-hover text-ink-muted hover:text-ink transition-colors"
            aria-label="Close"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-6">
          {#if uploading}
            <div class="py-12 text-center">
              <div class="animate-spin rounded-none h-10 w-10 border-2 border-accent border-t-transparent mx-auto mb-4"></div>
              <p class="text-sm text-ink-muted font-medium">{uploadProgress || 'Uploading...'}</p>
            </div>
          {:else}
            <DocumentForm
              initial={editingDoc || undefined}
              preset={docModal === 'create' ? uploadPreset || undefined : undefined}
              onSubmit={docModal === 'create' ? handleCreateDocument : handleUpdateDocument}
              onCancel={() => {
                docModal = null
                editingDoc = null
                uploadPreset = null
              }}
              categoryConfig={categories}
            />
          {/if}
        </div>
      </div>
    </div>
  {/if}

  {#if deletingClient}
    <ConfirmDialog
      message={`Delete "${deletingClient.name}" and all their documents? This cannot be undone.`}
      onConfirm={handleDeleteClient}
      onCancel={() => (deletingClient = null)}
      loading={isDeletingClient}
    />
  {/if}

  {#if deletingDoc}
    <ConfirmDialog
      message={`Delete "${deletingDoc.title}"? This cannot be undone.`}
      onConfirm={handleDeleteDocument}
      onCancel={() => (deletingDoc = null)}
      loading={isDeletingDoc}
    />
  {/if}

  {#if toast}
    <div class="fixed top-5 right-5 z-[60] toast-enter">
      <div class="flex items-center gap-2.5 px-5 py-3 rounded-none shadow-bold text-sm font-medium border-2 {toast.type === 'success' ? 'bg-ink text-white border-ink' : 'bg-danger text-white border-danger'}">
        {#if toast.type === 'success'}
          <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        {:else}
          <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {/if}
        {toast.message}
      </div>
    </div>
  {/if}
</div>

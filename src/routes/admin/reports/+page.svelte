<script lang="ts">
  import { onMount } from 'svelte'
  import * as XLSX from 'xlsx'
  import { auth } from '#lib/auth.svelte'
  import TableSkeleton from '#lib/components/admin/TableSkeleton.svelte'
  import EmptyState from '#lib/components/admin/EmptyState.svelte'

  type Tab = 'chat' | 'clients'

  interface ChatAccessRow {
    sessionId: string
    phone: string
    clientName: string
    date: string
    time: string
    timeTaken: string
    durationMs: number
    documentAccessed: string
    documentAccessCount: number
    status: string
    startedAt: string
    endedAt?: string
  }

  interface ClientSummaryRow {
    clientId: string
    clientName: string
    phoneCount: number
    phones: string[]
    gstNumber?: string
    categoryCount: number
    categories: string[]
    documentCount: number
    createdAt?: string
  }

  let tab = $state<Tab>('clients')
  let chatRows = $state<ChatAccessRow[]>([])
  let clientRows = $state<ClientSummaryRow[]>([])
  let loadingChat = $state(false)
  let loadingClients = $state(false)
  let error = $state<string | null>(null)
  let search = $state('')
  let datePreset = $state<'all' | 'today' | 'yesterday' | '7days' | 'month' | 'custom'>('all')
  let dateFrom = $state('')
  let dateTo = $state('')
  let searchField = $state<'all' | 'phone' | 'clientName' | 'documentAccessed' | 'status'>('all')
  let colFilters = $state({
    phone: '',
    clientName: '',
    date: '',
    documentAccessed: '',
    status: '',
  })

  function headers() {
    return { Authorization: 'Bearer ' + auth.getToken() }
  }

  async function loadChat() {
    try {
      loadingChat = true
      error = null
      const res = await fetch('/api/admin/reports/chat-access', { headers: headers() })
      if (!res.ok) throw new Error('Failed to load chat access report')
      const data = await res.json()
      chatRows = Array.isArray(data.rows) ? data.rows : []
    } catch (e) {
      console.error(e)
      error = e instanceof Error ? e.message : 'Failed to load'
    } finally {
      loadingChat = false
    }
  }

  async function loadClients() {
    try {
      loadingClients = true
      error = null
      const res = await fetch('/api/admin/reports/clients-summary', { headers: headers() })
      if (!res.ok) throw new Error('Failed to load clients summary')
      const data = await res.json()
      clientRows = Array.isArray(data.rows) ? data.rows : []
    } catch (e) {
      console.error(e)
      error = e instanceof Error ? e.message : 'Failed to load'
    } finally {
      loadingClients = false
    }
  }

  onMount(() => {
    loadClients()
    loadChat()
  })

  let filteredChat = $derived.by(() => {
    let rows = chatRows

    if (datePreset !== 'all' && datePreset !== 'custom') {
      const now = new Date()
      const todayStr = now.toISOString().slice(0, 10)
      let startStr = ''
      let endStr = todayStr

      if (datePreset === 'today') {
        startStr = todayStr
      } else if (datePreset === 'yesterday') {
        const yesterday = new Date(now)
        yesterday.setDate(yesterday.getDate() - 1)
        startStr = endStr = yesterday.toISOString().slice(0, 10)
      } else if (datePreset === '7days') {
        const weekAgo = new Date(now)
        weekAgo.setDate(weekAgo.getDate() - 7)
        startStr = weekAgo.toISOString().slice(0, 10)
      } else if (datePreset === 'month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        startStr = monthStart.toISOString().slice(0, 10)
      }

      rows = rows.filter((r) => r.date >= startStr && r.date <= endStr)
    } else if (datePreset === 'custom' && (dateFrom || dateTo)) {
      rows = rows.filter((r) => {
        if (dateFrom && r.date < dateFrom) return false
        if (dateTo && r.date > dateTo) return false
        return true
      })
    }

    const q = search.trim().toLowerCase()
    if (q) {
      if (searchField === 'all') {
        rows = rows.filter(
          (r) =>
            r.phone.includes(q) ||
            r.clientName.toLowerCase().includes(q) ||
            r.documentAccessed.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q)
        )
      } else {
        rows = rows.filter((r) => {
          const val = (r as unknown as Record<string, unknown>)[searchField]
          return typeof val === 'string' ? val.toLowerCase().includes(q) : false
        })
      }
    }

    if (colFilters.phone) {
      const q2 = colFilters.phone.toLowerCase()
      rows = rows.filter((r) => r.phone.toLowerCase().includes(q2))
    }
    if (colFilters.clientName) {
      const q2 = colFilters.clientName.toLowerCase()
      rows = rows.filter((r) => r.clientName.toLowerCase().includes(q2))
    }
    if (colFilters.date) {
      const q2 = colFilters.date.toLowerCase()
      rows = rows.filter((r) => r.date.toLowerCase().includes(q2))
    }
    if (colFilters.documentAccessed) {
      const q2 = colFilters.documentAccessed.toLowerCase()
      rows = rows.filter((r) => r.documentAccessed.toLowerCase().includes(q2))
    }
    if (colFilters.status) {
      const q2 = colFilters.status.toLowerCase()
      rows = rows.filter((r) => r.status.toLowerCase().includes(q2))
    }

    return rows
  })

  let filteredClients = $derived.by(() => {
    const q = search.trim().toLowerCase()
    if (!q) return clientRows
    return clientRows.filter(
      (r) =>
        r.clientName.toLowerCase().includes(q) ||
        r.phones.some((p) => p.includes(q)) ||
        (r.gstNumber || '').toLowerCase().includes(q) ||
        r.categories.some((c) => c.toLowerCase().includes(q))
    )
  })

  let totals = $derived.by(() => ({
    totalPhonesMapped: clientRows.reduce((sum, r) => sum + r.phoneCount, 0),
    totalDocs: clientRows.reduce((sum, r) => sum + r.documentCount, 0),
    totalChats: chatRows.length,
  }))

  function exportChatToExcel() {
    const data = filteredChat.length > 0 ? filteredChat : chatRows
    if (data.length === 0) return

    const exportData = data.map((r) => ({
      'User No': r.phone,
      'Client Name': r.clientName,
      Date: r.date,
      Time: r.time,
      'Time Taken': r.timeTaken,
      'Doc Report Accessed': r.documentAccessed,
      '# Docs': r.documentAccessCount,
      Status: r.status,
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Chat Access')
    XLSX.writeFile(wb, `chat-access-report-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  function clearAll() {
    search = ''
    datePreset = 'all'
    dateFrom = ''
    dateTo = ''
    searchField = 'all'
    colFilters = { phone: '', clientName: '', date: '', documentAccessed: '', status: '' }
  }
</script>

<div class="h-screen flex overflow-hidden bg-surface relative">
  <div class="absolute inset-0 diagonal-stripes pointer-events-none z-0"></div>

  <aside class="w-80 flex-shrink-0 bg-sidebar flex flex-col shadow-sidebar z-10 relative">
    <div class="px-6 py-5 border-b-2 border-sidebar-border">
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
          <p class="text-ink-muted text-[10px] font-mono uppercase tracking-widest mt-0.5">Reports</p>
        </div>
      </div>
    </div>

    <nav class="px-3 pt-4 pb-2 flex flex-col gap-1">
      <a
        href="/admin"
        class="flex items-center gap-3 px-3 py-2.5 rounded-none hover:bg-sidebar-hover border border-transparent hover:border-sidebar-border transition-colors group"
      >
        <span class="w-7 h-7 flex items-center justify-center bg-sidebar-hover text-ink-inverse">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </span>
        <span class="flex-1">
          <span class="block text-ink-inverse text-sm font-display font-bold tracking-tight leading-none">Back to Clients</span>
          <span class="block text-ink-muted text-[10px] font-mono uppercase tracking-widest mt-0.5">Manage documents</span>
        </span>
      </a>
    </nav>

    <div class="px-3 pt-2 pb-1 flex flex-col gap-1">
      <p class="eyebrow text-ink-muted px-3 pt-2">Reports</p>
      <button
        onclick={() => (tab = 'clients')}
        class="text-left flex items-center gap-3 px-3 py-2.5 border transition-colors {tab === 'clients'
          ? 'bg-accent/15 border-accent/40 text-ink-inverse'
          : 'bg-transparent border-transparent hover:bg-sidebar-hover text-ink-inverse'}"
      >
        <span class="w-1.5 h-6 {tab === 'clients' ? 'bg-accent' : 'bg-sidebar-border'}"></span>
        <div>
          <p class="text-sm font-display font-bold leading-none">Client Summary</p>
          <p class="text-[10px] font-mono uppercase tracking-widest text-ink-muted mt-1">
            {loadingClients ? 'Loading…' : `${clientRows.length} clients`}
          </p>
        </div>
      </button>
      <button
        onclick={() => (tab = 'chat')}
        class="text-left flex items-center gap-3 px-3 py-2.5 border transition-colors {tab === 'chat'
          ? 'bg-accent/15 border-accent/40 text-ink-inverse'
          : 'bg-transparent border-transparent hover:bg-sidebar-hover text-ink-inverse'}"
      >
        <span class="w-1.5 h-6 {tab === 'chat' ? 'bg-accent' : 'bg-sidebar-border'}"></span>
        <div>
          <p class="text-sm font-display font-bold leading-none">Chat Access</p>
          <p class="text-[10px] font-mono uppercase tracking-widest text-ink-muted mt-1">
            {loadingChat ? 'Loading…' : `${chatRows.length} sessions`}
          </p>
        </div>
      </button>
    </div>

    <div class="mt-auto px-6 py-4 border-t-2 border-sidebar-border">
      <button
        onclick={() => auth.signOut()}
        class="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-ink-muted hover:text-danger border border-sidebar-border hover:border-danger/40 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        Sign out
      </button>
    </div>
  </aside>

  <main class="flex-1 flex flex-col min-h-0 z-10">
    <div class="bg-surface-card border-b-2 border-ink/10">
      <div class="h-1 w-24 bg-accent"></div>
      <div class="px-8 py-5 flex items-center justify-between gap-6">
        <div>
          <p class="eyebrow text-ink-secondary">Reports Dashboard</p>
          <h2 class="font-display text-2xl text-ink mt-1 leading-none">
            {tab === 'clients' ? 'Client Summary' : 'Chat Access Monitor'}
          </h2>
          <p class="text-ink-secondary text-xs mt-2 font-mono">
            {tab === 'clients'
              ? 'Consolidated view of every client, mapped phone numbers, and document counts.'
              : 'Every chat the bot has handled — who came, how long they stayed, and which documents they accessed.'}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-right">
            <p class="eyebrow text-ink-secondary">Totals</p>
            <p class="font-mono text-ink text-sm mt-1">
              {totals.totalChats} chats · {clientRows.length} clients · {totals.totalDocs} docs
            </p>
          </div>
          {#if tab === 'chat'}
            <button
              onclick={exportChatToExcel}
              class="flex items-center gap-2 px-3 py-2 bg-ink text-white text-xs font-mono uppercase tracking-wider shadow-bold hover:bg-ink/80 transition-colors"
              title="Export to Excel"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export
            </button>
          {/if}
          <button
            onclick={() => (tab === 'chat' ? loadChat() : loadClients())}
            class="w-10 h-10 flex items-center justify-center bg-accent text-white shadow-bold hover:shadow-glow-accent transition-shadow"
            title="Refresh"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="px-8 py-4 border-b border-ink/10 bg-surface space-y-3">
      {#if tab === 'chat'}
        <div class="flex items-center gap-3 flex-wrap">
          <p class="eyebrow text-ink-muted text-[10px]">Date</p>
          <div class="flex items-center border-2 border-ink/10 bg-white">
            {#each [
              ['all', 'All'],
              ['today', 'Today'],
              ['yesterday', 'Yesterday'],
              ['7days', 'Last 7 Days'],
              ['month', 'This Month'],
              ['custom', 'Custom'],
            ] as [key, label] (key)}
              <button
                onclick={() => (datePreset = key as typeof datePreset)}
                class="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors border-r border-ink/10 last:border-r-0 {datePreset === key
                  ? 'bg-accent text-white'
                  : 'text-ink-secondary hover:bg-ink/5'}"
              >
                {label}
              </button>
            {/each}
          </div>
          {#if datePreset === 'custom'}
            <div class="flex items-center gap-2">
              <input
                type="date"
                bind:value={dateFrom}
                class="px-3 py-1.5 bg-white border-2 border-ink/10 text-sm text-ink font-mono focus:border-accent focus:outline-none"
              />
              <span class="text-ink-muted text-xs">to</span>
              <input
                type="date"
                bind:value={dateTo}
                class="px-3 py-1.5 bg-white border-2 border-ink/10 text-sm text-ink font-mono focus:border-accent focus:outline-none"
              />
            </div>
          {/if}
        </div>
      {/if}

      <div class="flex items-center gap-3">
        {#if tab === 'chat'}
          <select
            value={searchField}
            onchange={(e) => (searchField = e.currentTarget.value as typeof searchField)}
            class="px-3 py-2.5 bg-white border-2 border-ink/10 text-sm text-ink font-mono focus:border-accent focus:outline-none appearance-none cursor-pointer"
          >
            <option value="all">All Fields</option>
            <option value="phone">Phone</option>
            <option value="clientName">Client Name</option>
            <option value="documentAccessed">Document</option>
            <option value="status">Status</option>
          </select>
        {/if}
        <div class="flex-1 relative">
          <input
            type="text"
            bind:value={search}
            placeholder={tab === 'clients' ? 'Search by client, phone, GST, category…' : 'Search by phone, client, document…'}
            class="w-full px-4 py-2.5 bg-white border-2 border-ink/10 rounded-none focus:border-accent focus:outline-none text-sm text-ink placeholder:text-ink-muted/60"
          />
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        {#if tab === 'chat' && (search || datePreset !== 'all' || Object.values(colFilters).some(Boolean))}
          <button
            onclick={clearAll}
            class="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-danger hover:bg-danger/10 border border-danger/30 transition-colors"
          >
            Clear all
          </button>
        {/if}
        {#if error}
          <p class="text-danger text-xs font-medium">{error}</p>
        {/if}
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-8 py-6">
      {#if tab === 'clients'}
        {#if loadingClients && filteredClients.length === 0}
          <TableSkeleton rows={6} cols={6} />
        {:else if filteredClients.length === 0}
          <EmptyState
            title="No clients yet"
            body="Add a client and upload documents to populate this report."
          />
        {:else}
          <div class="bg-white border-2 border-ink/10 shadow-card">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="text-left bg-ink/[0.03] border-b-2 border-ink/10">
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-left">Client Name</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-left">Phone Numbers Mapped</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-right">Numbers</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-right">Categories</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-right">Documents</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-left">Categories Used</th>
                  </tr>
                </thead>
                <tbody>
                  {#each filteredClients as r (r.clientId)}
                    <tr class="border-b border-ink/5 last:border-0 hover:bg-ink/[0.02] transition-colors">
                      <td class="px-4 py-3 align-top text-left">
                        <div>
                          <p class="font-display text-ink font-bold leading-tight">{r.clientName}</p>
                          {#if r.gstNumber}
                            <p class="text-[10px] font-mono text-ink-muted mt-0.5">GST: {r.gstNumber}</p>
                          {/if}
                        </div>
                      </td>
                      <td class="px-4 py-3 align-top text-left">
                        <div class="flex flex-wrap gap-1.5">
                          {#if r.phones.length === 0}
                            <span class="text-ink-muted text-xs italic">No phone</span>
                          {:else}
                            {#each r.phones as phone, i (i)}
                              <span class="inline-flex items-center px-2 py-0.5 bg-ink/5 border border-ink/10 text-ink font-mono text-[11px]">
                                {phone}
                              </span>
                            {/each}
                          {/if}
                        </div>
                      </td>
                      <td class="px-4 py-3 align-top text-right">
                        <span class="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 border font-mono font-bold text-[12px] bg-teal/10 text-teal border-teal/30">{r.phoneCount}</span>
                      </td>
                      <td class="px-4 py-3 align-top text-right">
                        <span class="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 border font-mono font-bold text-[12px] bg-gold/15 text-ink border-gold/40">{r.categoryCount}</span>
                      </td>
                      <td class="px-4 py-3 align-top text-right">
                        <span class="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 border font-mono font-bold text-[12px] bg-accent/10 text-accent border-accent/30">{r.documentCount}</span>
                      </td>
                      <td class="px-4 py-3 align-top text-left">
                        {#if r.categories.length === 0}
                          <span class="text-ink-muted text-xs italic">None</span>
                        {:else}
                          <div class="flex flex-wrap gap-1.5">
                            {#each r.categories as category, i (i)}
                              <span class="inline-flex items-center px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 text-[11px] font-mono">
                                {category}
                              </span>
                            {/each}
                          </div>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {/if}
      {:else}
        {#if loadingChat && filteredChat.length === 0}
          <TableSkeleton rows={6} cols={8} />
        {:else if filteredChat.length === 0}
          <EmptyState
            title="No chat sessions yet"
            body="Once users start messaging the WhatsApp bot, every visit will appear here with timing and document access details."
          />
        {:else}
          <div class="bg-white border-2 border-ink/10 shadow-card">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="text-left bg-ink/[0.03] border-b-2 border-ink/10">
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-left">User No</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-left">Client Name</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-left">Date</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-left">Time</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-right">Time Taken</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-left">Doc Report Accessed</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-right"># Docs</th>
                    <th class="px-4 py-3 eyebrow text-ink-secondary font-bold text-left">Status</th>
                  </tr>
                  <tr class="border-b border-ink/10 bg-ink/[0.02]">
                    <td class="px-4 py-1.5">
                      <input type="text" bind:value={colFilters.phone} placeholder="Filter…" class="w-full px-2 py-1 bg-white border border-ink/15 text-[11px] font-mono text-ink focus:border-accent focus:outline-none placeholder:text-ink-muted/50" />
                    </td>
                    <td class="px-4 py-1.5">
                      <input type="text" bind:value={colFilters.clientName} placeholder="Filter…" class="w-full px-2 py-1 bg-white border border-ink/15 text-[11px] font-mono text-ink focus:border-accent focus:outline-none placeholder:text-ink-muted/50" />
                    </td>
                    <td class="px-4 py-1.5">
                      <input type="date" bind:value={colFilters.date} class="w-full px-2 py-1 bg-white border border-ink/15 text-[11px] font-mono text-ink focus:border-accent focus:outline-none" />
                    </td>
                    <td class="px-4 py-1.5"></td>
                    <td class="px-4 py-1.5"></td>
                    <td class="px-4 py-1.5">
                      <input type="text" bind:value={colFilters.documentAccessed} placeholder="Filter…" class="w-full px-2 py-1 bg-white border border-ink/15 text-[11px] font-mono text-ink focus:border-accent focus:outline-none placeholder:text-ink-muted/50" />
                    </td>
                    <td class="px-4 py-1.5"></td>
                    <td class="px-4 py-1.5">
                      <select bind:value={colFilters.status} class="w-full px-2 py-1 bg-white border border-ink/15 text-[11px] font-mono text-ink focus:border-accent focus:outline-none appearance-none cursor-pointer">
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {#each filteredChat as r (r.sessionId)}
                    <tr class="border-b border-ink/5 last:border-0 hover:bg-ink/[0.02] transition-colors">
                      <td class="px-4 py-3 align-top text-left"><span class="font-mono text-ink text-[12px]">{r.phone}</span></td>
                      <td class="px-4 py-3 align-top text-left"><p class="font-display text-ink font-bold leading-tight">{r.clientName}</p></td>
                      <td class="px-4 py-3 align-top text-left"><span class="font-mono text-ink-secondary text-[12px]">{r.date}</span></td>
                      <td class="px-4 py-3 align-top text-left"><span class="font-mono text-ink-secondary text-[12px]">{r.time}</span></td>
                      <td class="px-4 py-3 align-top text-right"><span class="font-mono text-ink text-[12px]">{r.timeTaken}</span></td>
                      <td class="px-4 py-3 align-top text-left">
                        {#if r.documentAccessCount === 0}
                          <span class="text-ink-muted text-xs italic">No document opened</span>
                        {:else}
                          <p class="text-ink-secondary text-[12px] leading-snug max-w-md truncate" title={r.documentAccessed}>{r.documentAccessed}</p>
                        {/if}
                      </td>
                      <td class="px-4 py-3 align-top text-right">
                        <span class="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 border font-mono font-bold text-[12px] bg-teal/10 text-teal border-teal/30">{r.documentAccessCount}</span>
                      </td>
                      <td class="px-4 py-3 align-top text-left">
                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border {r.status === 'active' ? 'bg-success/10 text-success border-success/30' : 'bg-ink/5 text-ink-secondary border-ink/15'}">
                          <span class="w-1.5 h-1.5 {r.status === 'active' ? 'bg-success' : 'bg-ink-secondary'}"></span>
                          {r.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {/if}
      {/if}
    </div>
  </main>
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import { auth } from '#lib/auth.svelte'

  interface Employee {
    id: string
    employeeId?: string
    name: string
    managerName?: string
    city?: string
    zone?: string
    phones: string[]
    createdAt?: string
  }
  interface VideoRow { id: string; moduleNumber: string; videoTitle: string; deliveredAt: string; completedAt: string; status: string }
  interface AssessmentRow {
    id: string
    assessmentTitle: string
    videoTitle: string
    moduleNumber: string
    marksObtained: number
    totalMarks: number
    percentage: number
    result: string
    status: string
    timeTakenSeconds: number
    completedAt: string
  }
  interface Report { employeeId: string; videos: VideoRow[]; assessments: AssessmentRow[] }

  let employees = $state<Employee[]>([])
  let loading = $state(true)
  let showForm = $state(false)
  let name = $state('')
  let phone = $state('')
  let saving = $state(false)
  let toast = $state<string | null>(null)

  let openId = $state<string | null>(null)
  let reports = $state<Record<string, Report>>({})
  let reportLoading = $state<string | null>(null)

  function headers() { return { Authorization: 'Bearer ' + auth.getToken(), 'Content-Type': 'application/json' } }
  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  function ist(iso?: string) {
    if (!iso) return '—'
    return new Date(new Date(iso).getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 16).replace('T', ' ')
  }
  function duration(seconds: number) {
    if (!seconds) return '—'
    const m = Math.floor(seconds / 60)
    return m > 0 ? `${m}m ${seconds % 60}s` : `${seconds}s`
  }

  async function load() {
    loading = true
    try {
      const res = await fetch('/api/admin/clients', { headers: headers() })
      employees = await res.json()
    } catch { showToast('Failed to load') }
    finally { loading = false }
  }

  async function toggleReport(e: Employee) {
    if (openId === e.id) { openId = null; return }
    openId = e.id
    const p = e.phones?.[0]
    if (!p || reports[e.id]) return
    reportLoading = e.id
    try {
      const res = await fetch('/api/admin/reports/employee?phone=' + encodeURIComponent(p), { headers: headers() })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      reports = { ...reports, [e.id]: data }
    } catch { showToast('Failed to load report') }
    finally { reportLoading = null }
  }

  async function save() {
    saving = true
    try {
      const res = await fetch('/api/admin/clients', { method: 'POST', headers: headers(), body: JSON.stringify({ name, phones: [phone] }) })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed') }
      name = ''; phone = ''; showForm = false
      showToast('Employee added')
      load()
    } catch (e) { showToast(e instanceof Error ? e.message : 'Failed') }
    finally { saving = false }
  }

  async function remove(id: string) {
    if (!confirm('Delete this employee?')) return
    await fetch('/api/admin/clients/' + id, { method: 'DELETE', headers: headers() })
    showToast('Deleted')
    load()
  }

  onMount(load)
</script>

<div class="p-6">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-bold text-ink">Employee Management</h2>
    <button onclick={() => (showForm = !showForm)} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded hover:bg-accent-hover">{showForm ? 'Cancel' : '+ Add Employee'}</button>
  </div>

  {#if showForm}
    <div class="bg-white border border-surface-border rounded p-4 mb-4 space-y-3 max-w-md">
      <input bind:value={name} placeholder="Full name" class="w-full px-3 py-2 border rounded text-sm" />
      <input bind:value={phone} placeholder="Phone (91...)" class="w-full px-3 py-2 border rounded text-sm font-mono" />
      <button onclick={save} disabled={saving} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
    </div>
  {/if}

  {#if loading}
    <p class="text-ink-muted">Loading…</p>
  {:else}
    <div class="bg-white border border-surface-border rounded overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-surface">
          <tr><th class="px-3 py-2 text-left">Employee ID</th><th class="px-3 py-2 text-left">Name</th><th class="px-3 py-2 text-left">Manager Name</th><th class="px-3 py-2 text-left">City</th><th class="px-3 py-2 text-left">Zone</th><th class="px-3 py-2 text-left">Phone</th><th class="px-3 py-2 text-left">Action</th></tr>
        </thead>
        <tbody>
          {#each employees as e (e.id)}
            <tr class="border-t border-surface-border">
              <td class="px-3 py-2 font-mono text-xs">{e.employeeId || '—'}</td>
              <td class="px-3 py-2">{e.name}</td>
              <td class="px-3 py-2">{e.managerName || '—'}</td>
              <td class="px-3 py-2">{e.city || '—'}</td>
              <td class="px-3 py-2">{e.zone || '—'}</td>
              <td class="px-3 py-2 font-mono text-xs">{e.phones?.[0] || '—'}</td>
              <td class="px-3 py-2 space-x-3">
                <button onclick={() => toggleReport(e)} class="text-xs text-accent hover:underline">{openId === e.id ? 'Hide Report' : 'Report'}</button>
                {#if e.phones?.[0]}
                  <a href={'/admin/flows?phone=' + encodeURIComponent(e.phones[0])} class="text-xs text-accent hover:underline">View Flow</a>
                {/if}
                <button onclick={() => remove(e.id)} class="text-xs text-danger hover:underline">Delete</button>
              </td>
            </tr>

            {#if openId === e.id}
              <tr class="border-t border-surface-border bg-surface/40">
                <td colspan="7" class="px-4 py-3">
                  {#if reportLoading === e.id}
                    <p class="text-xs text-ink-muted">Loading report…</p>
                  {:else if reports[e.id]}
                    {@const r = reports[e.id]}
                    <div class="grid gap-5 lg:grid-cols-2">
                      <div>
                        <h4 class="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-2">Videos</h4>
                        {#if r.videos.length === 0}
                          <p class="text-xs text-ink-muted">No videos delivered yet.</p>
                        {:else}
                          <table class="w-full text-xs">
                            <thead><tr class="text-ink-muted text-left"><th class="py-1">Module</th><th class="py-1">Video</th><th class="py-1">Delivered</th><th class="py-1">Completed</th><th class="py-1">Status</th></tr></thead>
                            <tbody>
                              {#each r.videos as v (v.id)}
                                <tr class="border-t border-surface-border">
                                  <td class="py-1">{v.moduleNumber || '—'}</td>
                                  <td class="py-1">{v.videoTitle}</td>
                                  <td class="py-1">{ist(v.deliveredAt)}</td>
                                  <td class="py-1">{v.completedAt ? ist(v.completedAt) : '—'}</td>
                                  <td class="py-1 {v.status === 'completed' ? 'text-accent' : 'text-ink-muted'}">{v.status}</td>
                                </tr>
                              {/each}
                            </tbody>
                          </table>
                        {/if}
                      </div>

                      <div>
                        <h4 class="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-2">Assessments</h4>
                        {#if r.assessments.length === 0}
                          <p class="text-xs text-ink-muted">No assessments submitted yet.</p>
                        {:else}
                          <table class="w-full text-xs">
                            <thead><tr class="text-ink-muted text-left"><th class="py-1">Video</th><th class="py-1">Assessment</th><th class="py-1">Score</th><th class="py-1">%</th><th class="py-1">Result</th><th class="py-1">Time</th><th class="py-1">Date</th></tr></thead>
                            <tbody>
                              {#each r.assessments as a (a.id)}
                                <tr class="border-t border-surface-border">
                                  <td class="py-1">{a.videoTitle || a.moduleNumber || '—'}</td>
                                  <td class="py-1">{a.assessmentTitle || '—'}</td>
                                  <td class="py-1">{a.marksObtained}/{a.totalMarks}</td>
                                  <td class="py-1">{a.percentage}%</td>
                                  <td class="py-1 font-semibold {a.result === 'PASS' ? 'text-accent' : a.result === 'FAIL' ? 'text-danger' : 'text-ink-muted'}">{a.status || a.result || '—'}</td>
                                  <td class="py-1">{duration(a.timeTakenSeconds)}</td>
                                  <td class="py-1">{ist(a.completedAt)}</td>
                                </tr>
                              {/each}
                            </tbody>
                          </table>
                        {/if}
                      </div>
                    </div>
                  {:else}
                    <p class="text-xs text-ink-muted">Report unavailable.</p>
                  {/if}
                </td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import { listData } from '#lib/admin-data'
  import { auth } from '#lib/auth.svelte'

  interface Scorecard { id: string; employeeName?: string; employeeId?: string; assessmentTitle?: string; score?: number; total?: number; status?: string; createdAt?: string }
  let rows = $state<Scorecard[]>([])
  let loading = $state(true)
  let error = $state<string | null>(null)
  let regrading = $state(false)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 3500) }

  async function load() {
    loading = true
    try { rows = await listData<Scorecard>('scorecards') }
    catch { error = 'Failed to load results' }
    finally { loading = false }
  }

  /** Grade stored answers again now that answer keys exist. */
  async function regrade() {
    regrading = true
    try {
      const res = await fetch('/api/admin/reports/regrade', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + auth.getToken() },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      showToast(`${data.regraded} re-graded${data.stillPending ? `, ${data.stillPending} still pending (missing answer keys)` : ''}`)
      await load()
    } catch { showToast('Re-grade failed') }
    finally { regrading = false }
  }

  onMount(load)
</script>

<div class="p-6">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h2 class="text-xl font-bold text-ink">Scorecards & Results</h2>
      <p class="text-xs text-ink-muted">Pending Evaluation = a question has no answer key yet. Add keys in Question Bank, then re-grade.</p>
    </div>
    <button onclick={regrade} disabled={regrading} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded disabled:opacity-50">
      {regrading ? 'Re-grading…' : 'Re-grade pending'}
    </button>
  </div>
  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else if error}<p class="text-danger text-sm">{error}</p>
  {:else if rows.length === 0}
    <p class="text-ink-muted text-sm">No results yet. Results will appear here after assessments are completed.</p>
  {:else}
    <div class="bg-white border border-surface-border rounded overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-surface"><tr><th class="px-3 py-2 text-left">Employee</th><th class="px-3 py-2 text-left">Assessment</th><th class="px-3 py-2 text-left">Score</th><th class="px-3 py-2 text-left">Status</th></tr></thead>
        <tbody>
          {#each rows as r (r.id)}
            <tr class="border-t border-surface-border">
              <td class="px-3 py-2">{r.employeeName || r.employeeId || '—'}</td>
              <td class="px-3 py-2">{r.assessmentTitle || '—'}</td>
              <td class="px-3 py-2">{r.total ? `${r.score}/${r.total}` : (r.score ?? '—')}</td>
              <td class="px-3 py-2">{r.status || '—'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

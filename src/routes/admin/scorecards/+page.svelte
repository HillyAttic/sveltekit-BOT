<script lang="ts">
  import { onMount } from 'svelte'
  import { listData } from '#lib/admin-data'

  interface Scorecard { id: string; employeeName?: string; employeeId?: string; assessmentTitle?: string; score?: number; total?: number; status?: string; createdAt?: string }
  let rows = $state<Scorecard[]>([])
  let loading = $state(true)
  let error = $state<string | null>(null)

  onMount(async () => {
    try { rows = await listData<Scorecard>('scorecards') }
    catch { error = 'Failed to load results' }
    finally { loading = false }
  })
</script>

<div class="p-6">
  <h2 class="text-xl font-bold text-ink mb-4">Scorecards & Results</h2>
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
</div>

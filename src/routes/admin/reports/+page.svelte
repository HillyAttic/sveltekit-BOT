<script lang="ts">
  import { onMount } from 'svelte'
  import { auth } from '#lib/auth.svelte'

  let deliveries = $state<any[]>([])
  let history = $state<any[]>([])
  let loading = $state(true)

  onMount(async () => {
    try {
      const h = { Authorization: 'Bearer ' + auth.getToken() }
      const d = await (await fetch('/api/admin/video-deliveries', { headers: h })).json()
      deliveries = Array.isArray(d) ? d : []
      const r = await (await fetch('/api/admin/reminders?history=1', { headers: h })).json()
      history = r.history || []
    } finally { loading = false }
  })

  let summary = $derived.by(() => {
    const sent = history.filter((x) => x.deliveryStatus === 'Sent' || x.deliveryStatus === 'Delivered').length
    const failed = history.filter((x) => x.deliveryStatus === 'Failed').length
    const cancelled = history.filter((x) => x.deliveryStatus === 'Cancelled').length
    const scheduled = history.filter((x) => x.deliveryStatus === 'Scheduled').length
    const completed = deliveries.filter((d) => d.status === 'completed').length
    const pending = deliveries.filter((d) => d.status !== 'completed').length
    return { sent, failed, cancelled, scheduled, completed, pending, total: deliveries.length }
  })
</script>

<div class="p-6">
  <h2 class="text-xl font-semibold text-ink mb-4">Reports & Analytics</h2>
  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Total Deliveries</p><p class="text-2xl font-bold text-ink">{summary.total}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Completed</p><p class="text-2xl font-bold text-success">{summary.completed}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Pending</p><p class="text-2xl font-bold text-warning">{summary.pending}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Completion Rate</p><p class="text-2xl font-bold text-accent">{summary.total ? Math.round((summary.completed / summary.total) * 100) : 0}%</p></div>
    </div>

    <h3 class="font-semibold text-ink mb-2">Reminder Analytics</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Sent</p><p class="text-2xl font-bold text-ink">{summary.sent}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Scheduled</p><p class="text-2xl font-bold text-ink">{summary.scheduled}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Cancelled</p><p class="text-2xl font-bold text-ink">{summary.cancelled}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Failed</p><p class="text-2xl font-bold text-danger">{summary.failed}</p></div>
    </div>
  {/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import { auth } from '#lib/auth.svelte'

  let stats = $state({ employees: 0, videos: 0, assessments: 0, questions: 0, deliveries: 0, pending: 0, completed: 0 })
  let loading = $state(true)

  async function count(url: string): Promise<any[]> {
    const res = await fetch(url, { headers: { Authorization: 'Bearer ' + auth.getToken() } })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  }

  onMount(async () => {
    try {
      const [employees, videos, assessments, questions, deliveries] = await Promise.all([
        count('/api/admin/clients'),
        count('/api/admin/data/learningModules'),
        count('/api/admin/data/assessments'),
        count('/api/admin/data/questions'),
        count('/api/admin/video-deliveries'),
      ])
      stats = {
        employees: employees.length,
        videos: videos.length,
        assessments: assessments.length,
        questions: questions.length,
        deliveries: deliveries.length,
        pending: deliveries.filter((d) => d.status === 'pending').length,
        completed: deliveries.filter((d) => d.status === 'completed').length,
      }
    } finally { loading = false }
  })

  const quick = [
    ['Add Employee', '/admin/employees'],
    ['Add Video', '/admin/learning'],
    ['Question Bank', '/admin/questions'],
    ['Reminder Management', '/admin/reminders'],
    ['Certificates', '/admin/certificates'],
    ['City & Zone', '/admin/cityzone'],
  ]
</script>

<div class="p-6">
  <h2 class="text-xl font-semibold text-ink mb-1">Dashboard</h2>
  <p class="text-xs text-ink-muted mb-5">Edventure learning overview</p>

  {#if loading}
    <p class="text-ink-muted text-sm">Loading…</p>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Employees</p><p class="text-2xl font-bold text-ink">{stats.employees}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Videos</p><p class="text-2xl font-bold text-ink">{stats.videos}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Assessments</p><p class="text-2xl font-bold text-ink">{stats.assessments}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Questions</p><p class="text-2xl font-bold text-ink">{stats.questions}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Video Deliveries</p><p class="text-2xl font-bold text-ink">{stats.deliveries}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Pending</p><p class="text-2xl font-bold text-warning">{stats.pending}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Completed</p><p class="text-2xl font-bold text-success">{stats.completed}</p></div>
      <div class="bg-white border border-surface-border rounded p-4"><p class="text-xs text-ink-muted">Completion Rate</p><p class="text-2xl font-bold text-accent">{stats.deliveries ? Math.round((stats.completed / stats.deliveries) * 100) : 0}%</p></div>
    </div>

    <h3 class="font-semibold text-ink mb-2">Quick Actions</h3>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {#each quick as [label, href] (href)}
        <a {href} class="bg-white border border-surface-border rounded p-4 text-sm font-medium text-ink hover:border-accent/40 hover:text-accent transition-colors">{label}</a>
      {/each}
    </div>
  {/if}
</div>

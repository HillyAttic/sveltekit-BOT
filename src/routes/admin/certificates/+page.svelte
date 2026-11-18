<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, createData, deleteData } from '#lib/admin-data'

  interface Certificate { id: string; employeeName: string; course: string; issuedAt: string }
  let certs = $state<Certificate[]>([])
  let employeeName = $state('')
  let course = $state('')
  let loading = $state(true)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  async function load() {
    loading = true
    try { certs = await listData<Certificate>('certificates') }
    catch { showToast('Failed to load') }
    finally { loading = false }
  }

  async function issue() {
    if (!employeeName.trim() || !course.trim()) return
    await createData('certificates', { employeeName: employeeName.trim(), course: course.trim(), issuedAt: new Date().toISOString() })
    employeeName = ''; course = ''
    showToast('Certificate issued')
    await load()
  }

  async function remove(id: string) { await deleteData('certificates', id); await load() }

  onMount(load)
</script>

<div class="p-6">
  <h2 class="text-xl font-bold text-ink mb-4">Certificate Management</h2>
  <div class="flex gap-2 mb-4 flex-wrap">
    <input bind:value={employeeName} placeholder="Employee name" class="px-3 py-2 border rounded text-sm" />
    <input bind:value={course} placeholder="Course / module" class="px-3 py-2 border rounded text-sm" />
    <button onclick={issue} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded">Issue Certificate</button>
  </div>
  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else if certs.length === 0}<p class="text-ink-muted text-sm">No certificates issued yet.</p>
  {:else}
    <div class="space-y-2">
      {#each certs as c (c.id)}
        <div class="bg-white border border-surface-border rounded px-4 py-3 flex items-center justify-between">
          <div>
            <p class="font-semibold text-ink">{c.employeeName}</p>
            <p class="text-xs text-ink-muted">{c.course} — {c.issuedAt ? new Date(c.issuedAt).toLocaleDateString() : ''}</p>
          </div>
          <button onclick={() => remove(c.id)} class="text-xs text-danger hover:underline">Delete</button>
        </div>
      {/each}
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, createData, deleteData } from '#lib/admin-data'

  interface Assessment { id: string; title: string; questionIds?: string[]; questions?: Question[] }
  interface Question { id: string; text: string }
  let assessments = $state<Assessment[]>([])
  let questions = $state<Question[]>([])
  let title = $state('')
  let selected = $state<string[]>([])
  let loading = $state(true)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  async function load() {
    loading = true
    try {
      assessments = await listData<Assessment>('assessments')
      questions = await listData<Question>('questions')
    } catch { showToast('Failed to load') }
    finally { loading = false }
  }

  async function add() {
    if (!title.trim()) return
    try {
      await createData('assessments', { title: title.trim(), questionIds: selected })
      title = ''; selected = []
      await load()
    } catch { showToast('Failed to add') }
  }

  function toggle(id: string) {
    selected = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]
  }

  async function remove(id: string) { await deleteData('assessments', id); await load() }

  onMount(load)
</script>

<div class="p-6">
  <h2 class="text-xl font-bold text-ink mb-4">Assessment Builder</h2>
  <div class="bg-white border border-surface-border rounded p-4 mb-4 space-y-3 max-w-lg">
    <input bind:value={title} placeholder="Assessment title" class="w-full px-3 py-2 border rounded text-sm" />
    <div>
      <p class="text-xs text-ink-muted mb-1">Select questions</p>
      {#if questions.length === 0}<p class="text-xs text-ink-muted">No questions in bank yet.</p>{/if}
      <div class="space-y-1 max-h-40 overflow-y-auto">
        {#each questions as q (q.id)}
          <label class="flex items-center gap-2 text-sm"><input type="checkbox" checked={selected.includes(q.id)} onchange={() => toggle(q.id)} /> {q.text}</label>
        {/each}
      </div>
    </div>
    <button onclick={add} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded">Create Assessment</button>
  </div>

  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else if assessments.length === 0}<p class="text-ink-muted text-sm">No assessments yet.</p>
  {:else}
    <div class="space-y-2">
      {#each assessments as a (a.id)}
        <div class="bg-white border border-surface-border rounded px-4 py-3 flex items-center justify-between">
          <div>
            <p class="font-semibold text-ink">{a.title}</p>
            <p class="text-xs text-ink-muted">{a.questionIds?.length || 0} questions</p>
          </div>
          <button onclick={() => remove(a.id)} class="text-xs text-danger hover:underline">Delete</button>
        </div>
      {/each}
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

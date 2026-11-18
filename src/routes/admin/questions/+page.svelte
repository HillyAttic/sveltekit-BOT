<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, createData, deleteData } from '#lib/admin-data'

  interface Question { id: string; text: string; type: string }
  let questions = $state<Question[]>([])
  let text = $state('')
  let type = $state('mcq')
  let loading = $state(true)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  async function load() {
    loading = true
    try { questions = await listData<Question>('questions') }
    catch { showToast('Failed to load') }
    finally { loading = false }
  }

  async function add() {
    if (!text.trim()) return
    try { await createData('questions', { text: text.trim(), type }); text = ''; await load() }
    catch { showToast('Failed to add') }
  }

  async function remove(id: string) { await deleteData('questions', id); await load() }

  onMount(load)
</script>

<div class="p-6">
  <h2 class="text-xl font-bold text-ink mb-4">Question Bank</h2>
  <div class="flex gap-2 mb-4">
    <input bind:value={text} placeholder="Question text" class="px-3 py-2 border rounded text-sm flex-1" onkeydown={(e) => e.key === 'Enter' && add()} />
    <select bind:value={type} class="px-3 py-2 border rounded text-sm">
      <option value="mcq">MCQ</option>
      <option value="short">Short Answer</option>
      <option value="truefalse">True/False</option>
    </select>
    <button onclick={add} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded">Add</button>
  </div>
  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else if questions.length === 0}<p class="text-ink-muted text-sm">No questions yet.</p>
  {:else}
    <div class="space-y-2">
      {#each questions as q (q.id)}
        <div class="bg-white border border-surface-border rounded px-4 py-2 flex items-center justify-between">
          <span class="text-sm">{q.text} <span class="text-xs text-ink-muted">({q.type})</span></span>
          <button onclick={() => remove(q.id)} class="text-xs text-danger hover:underline">Delete</button>
        </div>
      {/each}
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

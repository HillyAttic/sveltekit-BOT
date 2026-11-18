<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, createData, deleteData } from '#lib/admin-data'

  interface Sequence { id: string; title: string; order: number }
  let steps = $state<Sequence[]>([])
  let input = $state('')
  let loading = $state(true)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  async function load() {
    loading = true
    try { steps = (await listData<Sequence>('learningSequences')).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) }
    catch { showToast('Failed to load') }
    finally { loading = false }
  }

  async function add() {
    if (!input.trim()) return
    try {
      await createData('learningSequences', { title: input.trim(), order: steps.length + 1 })
      input = ''
      await load()
    } catch { showToast('Failed to add') }
  }

  async function remove(id: string) {
    await deleteData('learningSequences', id)
    await load()
  }

  async function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= steps.length) return
    const arr = [...steps]
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    steps = arr
    // persist order
    await Promise.all(arr.map((s, idx) => createData('learningSequences', { id: s.id, title: s.title, order: idx + 1 })))
  }

  onMount(load)
</script>

<div class="p-6">
  <h2 class="text-xl font-bold text-ink mb-4">Learning Sequence Builder</h2>
  <div class="flex gap-2 mb-4">
    <input bind:value={input} placeholder="Module / Video title" class="px-3 py-2 border rounded text-sm flex-1" onkeydown={(e) => e.key === 'Enter' && add()} />
    <button onclick={add} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded">Add Step</button>
  </div>
  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else if steps.length === 0}<p class="text-ink-muted text-sm">No steps yet.</p>
  {:else}
    <ol class="space-y-2">
      {#each steps as s, i (s.id)}
        <li class="bg-white border border-surface-border rounded px-4 py-2 flex items-center justify-between">
          <span class="text-sm"><span class="font-mono text-ink-muted mr-2">{i + 1}.</span>{s.title}</span>
          <div class="flex items-center gap-1">
            <button onclick={() => move(i, -1)} class="px-2 py-1 text-xs border rounded hover:bg-surface-hover">↑</button>
            <button onclick={() => move(i, 1)} class="px-2 py-1 text-xs border rounded hover:bg-surface-hover">↓</button>
            <button onclick={() => remove(s.id)} class="px-2 py-1 text-xs text-danger border border-danger/30 rounded hover:bg-danger/10">Remove</button>
          </div>
        </li>
      {/each}
    </ol>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

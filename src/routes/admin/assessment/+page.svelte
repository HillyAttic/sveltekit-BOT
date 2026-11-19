<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, createData, deleteData, updateData } from '#lib/admin-data'

  interface Assessment { id: string; title: string; questionIds?: string[]; moduleId?: string; moduleNumber?: string }
  interface Question { id: string; text: string }
  interface Video { id: string; title: string; moduleNumber?: string }
  let assessments = $state<Assessment[]>([])
  let questions = $state<Question[]>([])
  let videos = $state<Video[]>([])
  let editingId = $state<string | null>(null)
  let title = $state('')
  let selected = $state<string[]>([])
  let moduleId = $state('')
  let loading = $state(true)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  function videoLabel(v: Video) { return (v.moduleNumber ? `Module ${v.moduleNumber} — ` : '') + v.title }

  async function load() {
    loading = true
    try {
      assessments = await listData<Assessment>('assessments')
      questions = await listData<Question>('questions')
      videos = await listData<Video>('learningModules')
    } catch { showToast('Failed to load') }
    finally { loading = false }
  }

  function reset() {
    editingId = null; title = ''; selected = []; moduleId = ''
  }

  function edit(a: Assessment) {
    editingId = a.id
    title = a.title
    selected = [...(a.questionIds ?? [])]
    moduleId = a.moduleId ?? ''
  }

  async function save() {
    if (!title.trim()) { showToast('Assessment title is required'); return }
    const payload = { title: title.trim(), questionIds: selected, moduleId: moduleId || null }
    try {
      if (editingId) await updateData('assessments', editingId, payload)
      else await createData('assessments', payload)
      showToast(editingId ? 'Assessment updated' : 'Assessment created')
      reset()
      await load()
    } catch { showToast('Failed to save') }
  }

  /** Map this assessment to one video (or clear the mapping). */
  async function link(a: Assessment, id: string) {
    try {
      await updateData('assessments', a.id, { moduleId: id || null })
      assessments = assessments.map((x) => (x.id === a.id ? { ...x, moduleId: id || undefined } : x))
      showToast(id ? 'Video linked' : 'Link removed')
    } catch { showToast('Failed to link video') }
  }

  function videoTitle(a: Assessment) {
    const v = videos.find((x) => x.id === a.moduleId)
    return v ? videoLabel(v) : a.moduleNumber ? `Legacy link — module ${a.moduleNumber}` : 'Not linked'
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
    <h3 class="font-semibold text-ink text-sm">{editingId ? 'Edit assessment' : 'Create assessment'}</h3>
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
    <label class="block text-xs text-ink-muted">Linked video (asked after FINISH on that video)
      <select bind:value={moduleId} class="w-full px-3 py-2 border rounded text-sm mt-1">
        <option value="">— Not linked —</option>
        {#each videos as v (v.id)}<option value={v.id}>{videoLabel(v)}</option>{/each}
      </select>
    </label>
    <div class="flex gap-2">
      <button onclick={save} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded">{editingId ? 'Save changes' : 'Create Assessment'}</button>
      {#if editingId}<button onclick={reset} class="px-4 py-2 text-sm border border-surface-border rounded">Cancel</button>{/if}
    </div>
  </div>

  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else if assessments.length === 0}<p class="text-ink-muted text-sm">No assessments yet.</p>
  {:else}
    <div class="space-y-2">
      {#each assessments as a (a.id)}
        <div class="bg-white border border-surface-border rounded px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
          <div>
            <p class="font-semibold text-ink">{a.title}</p>
            <p class="text-xs text-ink-muted">{a.questionIds?.length || 0} questions · {videoTitle(a)}</p>
          </div>
          <div class="flex items-center gap-3">
            <select value={a.moduleId ?? ''} onchange={(e) => link(a, e.currentTarget.value)} class="px-2 py-1 border rounded text-xs">
              <option value="">— Not linked —</option>
              {#each videos as v (v.id)}<option value={v.id}>{videoLabel(v)}</option>{/each}
            </select>
            <button onclick={() => edit(a)} class="text-xs text-accent hover:underline">Edit</button>
            <button onclick={() => remove(a.id)} class="text-xs text-danger hover:underline">Delete</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

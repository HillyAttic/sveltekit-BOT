<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, createData, updateData, deleteData } from '#lib/admin-data'

  interface Question {
    id: string
    text: string
    type: string
    options?: string[]
    correctAnswer?: string | number
    keywords?: string[]
    marks?: number
  }

  let questions = $state<Question[]>([])
  let editingId = $state<string | null>(null)
  let text = $state('')
  let type = $state('mcq')
  let marks = $state(1)
  let options = $state(['', '', '', ''])
  // null until the admin picks one — never default to Option 1
  let correctIndex = $state<number | null>(null)
  let tfAnswer = $state('True')
  let shortAnswer = $state('')
  let keywords = $state('')
  let loading = $state(true)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  function reset() {
    editingId = null; text = ''; type = 'mcq'; marks = 1
    options = ['', '', '', '']; correctIndex = null; tfAnswer = 'True'; shortAnswer = ''; keywords = ''
  }

  function edit(q: Question) {
    reset()
    editingId = q.id
    text = q.text
    type = q.type || 'mcq'
    marks = q.marks ?? 1
    const opts = [...(q.options ?? []), '', '', '', ''].slice(0, 4)
    options = opts
    // Only preselect what is actually stored — never guess.
    if (typeof q.correctAnswer === 'number' && q.correctAnswer < opts.length) correctIndex = q.correctAnswer
    else if (q.type === 'mcq' && q.correctAnswer) {
      // Older MCQs may store the correct option as text instead of an index
      const i = opts.findIndex((o) => o.trim() === String(q.correctAnswer).trim())
      correctIndex = i >= 0 ? i : null
    }
    if (q.type === 'truefalse' || q.type === 'true_false') tfAnswer = String(q.correctAnswer ?? 'True')
    if (q.type !== 'mcq' && typeof q.correctAnswer === 'string') shortAnswer = q.correctAnswer
    keywords = (q.keywords ?? []).join(', ')
  }

  /** Text of the option currently marked correct, or '' when none is picked. */
  function correctText() {
    return correctIndex === null ? '' : (options[correctIndex] ?? '').trim()
  }

  function correctLabel(q: Question) {
    if (q.correctAnswer === undefined || q.correctAnswer === null || q.correctAnswer === '') return 'not set — manual grading'
    if (q.type === 'mcq') return q.options?.[Number(q.correctAnswer)] ?? String(q.correctAnswer)
    return String(q.correctAnswer)
  }

  async function load() {
    loading = true
    try { questions = await listData<Question>('questions') }
    catch { showToast('Failed to load') }
    finally { loading = false }
  }

  async function save() {
    if (!text.trim()) { showToast('Question text is required'); return }

    const clean = options.map((o) => o.trim()).filter(Boolean)
    const payload: Record<string, unknown> = {
      text: text.trim(),
      type,
      marks: Math.max(1, Math.round(Number(marks) || 1)),
      // null clears the field on update, so switching type does not leave stale keys
      options: null,
      correctAnswer: null,
      keywords: null,
    }

    if (type === 'mcq') {
      if (clean.length < 2) { showToast('Add at least 2 options'); return }
      const picked = correctText()
      if (!picked) { showToast('Select the correct option after typing its text'); return }
      payload.options = clean
      // Index into the saved (blank-filtered) options array
      payload.correctAnswer = Math.max(0, clean.indexOf(picked))
    } else if (type === 'truefalse') {
      payload.correctAnswer = tfAnswer
    } else {
      payload.correctAnswer = shortAnswer.trim() || null
      payload.keywords = keywords.split(',').map((k) => k.trim()).filter(Boolean)
    }

    try {
      if (editingId) await updateData('questions', editingId, payload)
      else await createData('questions', payload)
      showToast(editingId ? 'Question updated' : 'Question added')
      reset()
      await load()
    } catch { showToast('Failed to save') }
  }

  async function remove(id: string) {
    await deleteData('questions', id)
    if (editingId === id) reset()
    await load()
  }

  onMount(load)
</script>

<div class="p-6">
  <h2 class="text-xl font-bold text-ink mb-1">Question Bank</h2>
  <p class="text-xs text-ink-muted mb-4">Set the correct answer here — assessments are scored automatically from it.</p>

  <div class="bg-white border border-surface-border rounded p-4 mb-5 max-w-2xl space-y-3">
    <h3 class="font-semibold text-ink text-sm">{editingId ? 'Edit question' : 'Add question'}</h3>
    <input bind:value={text} placeholder="Question text" class="w-full px-3 py-2 border rounded text-sm" onkeydown={(e) => e.key === 'Enter' && save()} />

    <div class="grid grid-cols-2 gap-3">
      <label class="block text-xs text-ink-muted">Type
        <select bind:value={type} class="w-full px-3 py-2 border rounded text-sm mt-1">
          <option value="mcq">MCQ</option>
          <option value="short">Short Answer</option>
          <option value="truefalse">True/False</option>
        </select>
      </label>
      <label class="block text-xs text-ink-muted">Marks
        <input type="number" min="1" bind:value={marks} class="w-full px-3 py-2 border rounded text-sm mt-1" />
      </label>
    </div>

    {#if type === 'mcq'}
      <div>
        <p class="text-xs text-ink-muted mb-1">Options — select the radio button beside the correct answer</p>
        <div class="space-y-2">
          {#each options as _, i (i)}
            <div class="flex items-center gap-2 text-sm">
              <input type="radio" bind:group={correctIndex} value={i} aria-label={'Correct answer is option ' + (i + 1)} />
              <input bind:value={options[i]} placeholder={'Option ' + (i + 1)} class="flex-1 px-3 py-2 border rounded text-sm" />
              {#if correctIndex === i}<span class="text-[11px] font-bold text-accent w-16 shrink-0">✓ Correct</span>{/if}
            </div>
          {/each}
        </div>
        <p class="text-xs mt-2 {correctText() ? 'text-ink-muted' : 'text-danger'}">
          Correct answer: {correctText() || 'none selected yet — click a radio button'}
        </p>
      </div>
    {:else if type === 'truefalse'}
      <label class="block text-xs text-ink-muted">Correct answer
        <select bind:value={tfAnswer} class="w-full px-3 py-2 border rounded text-sm mt-1">
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
      </label>
    {:else}
      <label class="block text-xs text-ink-muted">Correct answer (leave blank to grade manually)
        <input bind:value={shortAnswer} placeholder="Expected answer" class="w-full px-3 py-2 border rounded text-sm mt-1" />
      </label>
      <label class="block text-xs text-ink-muted">Accepted keywords (comma separated, optional)
        <input bind:value={keywords} placeholder="e.g. safety, helmet" class="w-full px-3 py-2 border rounded text-sm mt-1" />
      </label>
    {/if}

    <div class="flex gap-2">
      <button onclick={save} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded">{editingId ? 'Save changes' : 'Add'}</button>
      {#if editingId}<button onclick={reset} class="px-4 py-2 text-sm border border-surface-border rounded">Cancel</button>{/if}
    </div>
  </div>

  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else if questions.length === 0}<p class="text-ink-muted text-sm">No questions yet.</p>
  {:else}
    <div class="space-y-2">
      {#each questions as q (q.id)}
        <div class="bg-white border border-surface-border rounded px-4 py-2 flex items-center justify-between gap-3">
          <div class="text-sm">
            {q.text}
            <span class="text-xs text-ink-muted">({q.type}{q.marks ? ` · ${q.marks} mark${q.marks > 1 ? 's' : ''}` : ''})</span>
            <div class="text-xs {correctLabel(q).startsWith('not set') ? 'text-danger' : 'text-ink-muted'}">Answer: {correctLabel(q)}</div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <button onclick={() => edit(q)} class="text-xs text-accent hover:underline">Edit</button>
            <button onclick={() => remove(q.id)} class="text-xs text-danger hover:underline">Delete</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

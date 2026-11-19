<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, createData, deleteData, updateData } from '#lib/admin-data'

  interface Video { id: string; title: string; videoUrl: string; moduleNumber?: string; description?: string }
  interface Assessment { id: string; title: string; moduleId?: string }
  let videos = $state<Video[]>([])
  let assessments = $state<Assessment[]>([])
  let editingId = $state<string | null>(null)
  let title = $state('')
  let videoUrl = $state('')
  let moduleNumber = $state('')
  let description = $state('')
  let loading = $state(true)
  let saving = $state(false)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  async function load() {
    loading = true
    try {
      videos = await listData<Video>('learningModules')
      assessments = await listData<Assessment>('assessments')
    } catch { showToast('Failed to load') }
    finally { loading = false }
  }

  function reset() {
    editingId = null; title = ''; videoUrl = ''; moduleNumber = ''; description = ''
  }

  function edit(v: Video) {
    editingId = v.id
    title = v.title
    videoUrl = v.videoUrl
    moduleNumber = v.moduleNumber ?? ''
    description = v.description ?? ''
  }

  async function save() {
    if (!title.trim() || !videoUrl.trim()) { showToast('Title and video link are required'); return }
    saving = true
    const payload = { title: title.trim(), videoUrl: videoUrl.trim(), moduleNumber, description }
    try {
      if (editingId) await updateData('learningModules', editingId, payload)
      else await createData('learningModules', payload)
      showToast(editingId ? 'Video updated' : 'Video added')
      reset()
      await load()
    } catch { showToast('Failed to save') }
    finally { saving = false }
  }

  async function remove(id: string) { await deleteData('learningModules', id); await load() }

  onMount(load)
</script>

<div class="p-6">
  <h2 class="text-xl font-semibold text-ink mb-4">Video & Learning Management</h2>

  <div class="bg-white border border-surface-border rounded p-4 mb-5 max-w-lg space-y-3">
    <h3 class="font-semibold text-ink">{editingId ? 'Edit Video' : 'Add Video'}</h3>
    <input bind:value={title} placeholder="Video title" class="w-full px-3 py-2 border rounded text-sm" />
    <input bind:value={videoUrl} placeholder="Video link (https://…)" class="w-full px-3 py-2 border rounded text-sm" />
    <div class="grid grid-cols-2 gap-3">
      <input bind:value={moduleNumber} placeholder="Module number" class="px-3 py-2 border rounded text-sm" />
      <input bind:value={description} placeholder="Description (optional)" class="px-3 py-2 border rounded text-sm" />
    </div>
    <div class="flex gap-2">
      <button onclick={save} disabled={saving} class="px-4 py-2 text-sm font-medium bg-accent text-white rounded disabled:opacity-50">{saving ? 'Saving…' : editingId ? 'Save changes' : 'Add Video'}</button>
      {#if editingId}<button onclick={reset} class="px-4 py-2 text-sm border border-surface-border rounded">Cancel</button>{/if}
    </div>
  </div>

  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else if videos.length === 0}<p class="text-ink-muted text-sm">No videos yet.</p>
  {:else}
    <div class="bg-white border border-surface-border rounded overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-surface"><tr><th class="px-3 py-2 text-left">Module</th><th class="px-3 py-2 text-left">Title</th><th class="px-3 py-2 text-left">Video Link</th><th class="px-3 py-2 text-left">Assessment</th><th class="px-3 py-2 text-left">Action</th></tr></thead>
        <tbody>
          {#each videos as v (v.id)}
            <tr class="border-t border-surface-border">
              <td class="px-3 py-2">{v.moduleNumber || '—'}</td>
              <td class="px-3 py-2">{v.title}{#if v.description}<div class="text-[11px] text-ink-muted">{v.description}</div>{/if}</td>
              <td class="px-3 py-2"><a href={v.videoUrl} target="_blank" rel="noopener" class="text-accent hover:underline text-xs truncate block max-w-[280px]">{v.videoUrl}</a></td>
              <td class="px-3 py-2 text-xs">
                {#if assessments.find((a) => a.moduleId === v.id)}
                  {assessments.find((a) => a.moduleId === v.id)!.title}
                {:else}
                  <a href="/admin/assessment" class="text-danger hover:underline">Not mapped</a>
                {/if}
              </td>
              <td class="px-3 py-2 space-x-3">
                <button onclick={() => edit(v)} class="text-xs text-accent hover:underline">Edit</button>
                <button onclick={() => remove(v.id)} class="text-xs text-danger hover:underline">Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

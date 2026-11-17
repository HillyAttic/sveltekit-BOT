<script lang="ts">
  import { CATEGORIES } from '#lib/document-categories'
  import type { DocumentRecord, UploadPreset, DocumentFormData } from './types'

  let {
    initial,
    preset,
    onSubmit,
    onCancel,
    categoryConfig,
  }: {
    initial?: DocumentRecord
    preset?: UploadPreset
    onSubmit: (data: DocumentFormData) => void
    onCancel: () => void
    categoryConfig?: Record<string, { fiscalYears: string[]; subCategories: string[] }>
  } = $props()

  let title = $state(initial?.title || '')
  let files = $state<File[]>([])
  let category = $state(initial?.category || preset?.category || '')
  let fiscalYear = $state<string>(initial?.fiscalYear || preset?.fiscalYear || '')
  let subCategory = $state<string>(initial?.subCategory || preset?.subCategory || '')
  let errors = $state<Partial<Record<string, string>>>({})

  let file = $derived(files.length === 1 ? files[0] : null)
  let isMultiMode = $derived(!initial && files.length > 1)
  let categoriesToUse = $derived(categoryConfig || CATEGORIES)
  let categoryNames = $derived(Object.keys(categoriesToUse))
  let catConfig = $derived(category ? categoriesToUse[category] : null)

  function handleCategoryChange(value: string) {
    category = value
    fiscalYear = ''
    subCategory = ''
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    const nextErrors: Partial<Record<string, string>> = {}

    if (!isMultiMode && !title.trim()) nextErrors.title = 'Title is required.'
    if (!initial && !category) nextErrors.category = 'Category is required.'
    if (!initial && files.length === 0) nextErrors.file = 'At least one file is required.'

    if (category && catConfig) {
      if (catConfig.fiscalYears.length > 0 && !fiscalYear) {
        nextErrors.fiscalYear = 'Fiscal year is required.'
      }
      if (catConfig.subCategories.length > 0 && !subCategory) {
        nextErrors.subCategory = 'Sub-category is required.'
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      errors = nextErrors
      return
    }

    onSubmit({
      title: title.trim(),
      file,
      files,
      category,
      fiscalYear: fiscalYear || null,
      subCategory: subCategory || null,
    })
  }
</script>

<form onsubmit={handleSubmit} class="space-y-5">
  {#if !isMultiMode}
    <div>
      <label for="doc-title" class="eyebrow block mb-2">Document Title</label>
      <input
        type="text"
        id="doc-title"
        bind:value={title}
        placeholder="Enter document title"
        class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent transition-all"
      />
      {#if errors.title}<p class="text-danger text-xs mt-1.5 font-medium">{errors.title}</p>{/if}
    </div>
  {/if}

  <div>
    <label for="doc-category" class="eyebrow block mb-2">Category</label>
    <select
      id="doc-category"
      value={category}
      onchange={(e) => handleCategoryChange(e.currentTarget.value)}
      class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink focus:outline-none focus:border-accent transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20d%3D%22M6%209l4%204%204-4%22%20fill%3D%22none%22%20stroke%3D%22%23333%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat"
    >
      <option value="">Select category</option>
      {#each categoryNames as name (name)}
        <option value={name}>{name}</option>
      {/each}
    </select>
    {#if errors.category}<p class="text-danger text-xs mt-1.5 font-medium">{errors.category}</p>{/if}
  </div>

  {#if catConfig && catConfig.fiscalYears.length > 0}
    <div>
      <label for="doc-fy" class="eyebrow block mb-2">Fiscal Year</label>
      <select
        id="doc-fy"
        bind:value={fiscalYear}
        class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink focus:outline-none focus:border-accent transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20d%3D%22M6%209l4%204%204-4%22%20fill%3D%22none%22%20stroke%3D%22%23333%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat"
      >
        <option value="">Select fiscal year</option>
        {#each catConfig.fiscalYears as fy (fy)}
          <option value={fy}>{fy}</option>
        {/each}
      </select>
      {#if errors.fiscalYear}<p class="text-danger text-xs mt-1.5 font-medium">{errors.fiscalYear}</p>{/if}
    </div>
  {/if}

  {#if catConfig && catConfig.subCategories.length > 0}
    <div>
      <label for="doc-subcat" class="eyebrow block mb-2">Sub-Category</label>
      <select
        id="doc-subcat"
        bind:value={subCategory}
        class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink focus:outline-none focus:border-accent transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20d%3D%22M6%209l4%204%204-4%22%20fill%3D%22none%22%20stroke%3D%22%23333%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat"
      >
        <option value="">Select sub-category</option>
        {#each catConfig.subCategories as sc (sc)}
          <option value={sc}>{sc}</option>
        {/each}
      </select>
      {#if errors.subCategory}<p class="text-danger text-xs mt-1.5 font-medium">{errors.subCategory}</p>{/if}
    </div>
  {/if}

  <div>
    <label for="doc-file" class="eyebrow block mb-2">
      {#if initial}
        File <span class="text-ink-muted font-normal normal-case text-xs"> (leave empty to keep existing)</span>
      {:else}
        Files <span class="text-ink-muted font-normal normal-case text-xs"> (select multiple to bulk upload)</span>
      {/if}
    </label>
    <div class="relative">
      <input
        type="file"
        id="doc-file"
        multiple={!initial}
        onchange={(e) => {
          files = e.currentTarget.files ? Array.from(e.currentTarget.files) : []
        }}
        class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink file:mr-4 file:py-1 file:px-4 file:border-0 file:text-xs file:font-bold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 file:cursor-pointer file:uppercase file:tracking-wider focus:outline-none focus:border-accent transition-all"
      />
    </div>
    {#if errors.file}<p class="text-danger text-xs mt-1.5 font-medium">{errors.file}</p>{/if}
    {#if isMultiMode}
      <div class="mt-3 space-y-1">
        <p class="text-xs text-ink-muted font-medium uppercase tracking-wider">{files.length} files selected — filenames will be used as titles</p>
        <div class="max-h-32 overflow-y-auto space-y-0.5">
          {#each files as f, i (f.name + i)}
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-none bg-ink/[0.02] border border-ink/5 text-xs text-ink-secondary">
              <svg class="w-3 h-3 text-ink-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span class="truncate flex-1">{f.name}</span>
              <span class="text-ink-muted ml-auto flex-shrink-0 font-mono">{(f.size / 1024).toFixed(0)} KB</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <div class="flex justify-end gap-3 pt-3 border-t border-ink/5">
    <button
      type="button"
      onclick={onCancel}
      class="px-5 py-2.5 text-sm font-medium text-ink-secondary hover:text-ink rounded-none hover:bg-surface-hover transition-colors border border-ink/10 hover:border-ink/20"
    >
      Cancel
    </button>
    <button
      type="submit"
      class="px-6 py-2.5 text-sm font-bold uppercase tracking-wider bg-accent text-white rounded-none hover:bg-accent-hover transition-colors shadow-bold hover:shadow-glow-accent border-2 border-transparent"
    >
      {initial ? 'Update' : 'Upload'}
    </button>
  </div>
</form>

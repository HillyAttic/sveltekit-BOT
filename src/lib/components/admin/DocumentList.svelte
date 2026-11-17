<script lang="ts">
  import { CATEGORIES } from '#lib/document-categories'
  import DocRow from './DocRow.svelte'
  import RenameDialog from './RenameDialog.svelte'
  import ConfirmDialog from './ConfirmDialog.svelte'
  import Chevron from './Chevron.svelte'
  import UploadButton from './UploadButton.svelte'
  import type { DocumentRecord, UploadPreset } from './types'

  interface RenameTarget {
    type: 'category' | 'fiscalYear' | 'subCategory'
    category: string
    fiscalYear?: string
    subCategory?: string
    currentName: string
  }

  interface DeleteTarget {
    type: 'category' | 'fiscalYear' | 'subCategory'
    category: string
    fiscalYear?: string
    subCategory?: string
    name: string
  }

  let {
    documents,
    onEdit,
    onDelete,
    onUpload,
    getToken,
    categoryConfig = CATEGORIES,
    onDocumentsChanged,
  }: {
    documents: DocumentRecord[]
    onEdit: (document: DocumentRecord) => void
    onDelete: (document: DocumentRecord) => void
    onUpload: (preset: UploadPreset) => void
    getToken: () => string | null
    categoryConfig?: Record<string, { fiscalYears: string[]; subCategories: string[] }>
    onDocumentsChanged?: () => void
  } = $props()

  let openSections = $state<Set<string>>(new Set())
  let renameTarget = $state<RenameTarget | null>(null)
  let deleteTarget = $state<DeleteTarget | null>(null)
  let isRenaming = $state(false)
  let isDeleting = $state(false)

  let uncategorised = $derived(documents.filter((d) => !d.category))
  let categoryNames = $derived(Object.keys(categoryConfig).reverse())

  function toggle(key: string) {
    const next = new Set(openSections)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    openSections = next
  }

  function getLeafDocs(category: string, fiscalYear: string | null, subCategory: string | null) {
    return documents.filter(
      (d) =>
        d.category === category &&
        (d.fiscalYear ?? null) === fiscalYear &&
        (d.subCategory ?? null) === subCategory
    )
  }

  async function handleRename(newName: string) {
    if (!renameTarget) return

    try {
      isRenaming = true
      const token = getToken()
      const response = await fetch('/api/admin/rename', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: renameTarget.type,
          category: renameTarget.category,
          fiscalYear: renameTarget.fiscalYear,
          subCategory: renameTarget.subCategory,
          newName,
        }),
      })

      if (!response.ok) throw new Error('Failed to rename')

      const next = new Set<string>()
      const oldName = renameTarget.currentName

      if (renameTarget.type === 'category') {
        for (const key of openSections) {
          if (key === oldName) next.add(newName)
          else if (key.startsWith(`${oldName}||`)) next.add(key.replace(`${oldName}||`, `${newName}||`))
          else next.add(key)
        }
      } else if (renameTarget.type === 'fiscalYear') {
        const oldFyKey = `${renameTarget.category}||${oldName}`
        const newFyKey = `${renameTarget.category}||${newName}`
        for (const key of openSections) next.add(key === oldFyKey ? newFyKey : key)
      } else {
        for (const key of openSections) next.add(key)
      }
      openSections = next

      onDocumentsChanged?.()
    } catch (error) {
      console.error('Error renaming:', error)
      alert('Failed to rename. Please try again.')
    } finally {
      isRenaming = false
      renameTarget = null
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return

    try {
      isDeleting = true
      const token = getToken()
      const response = await fetch('/api/admin/delete-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: deleteTarget.type,
          category: deleteTarget.category,
          fiscalYear: deleteTarget.fiscalYear,
          subCategory: deleteTarget.subCategory,
        }),
      })

      if (!response.ok) throw new Error('Failed to delete')

      const next = new Set<string>()
      const deletedName = deleteTarget.name

      if (deleteTarget.type === 'category') {
        for (const key of openSections) {
          if (key !== deletedName && !key.startsWith(`${deletedName}||`)) next.add(key)
        }
      } else if (deleteTarget.type === 'fiscalYear') {
        const deletedFyKey = `${deleteTarget.category}||${deletedName}`
        for (const key of openSections) {
          if (key !== deletedFyKey) next.add(key)
        }
      } else {
        for (const key of openSections) next.add(key)
      }
      openSections = next

      onDocumentsChanged?.()
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Failed to delete. Please try again.')
    } finally {
      isDeleting = false
      deleteTarget = null
    }
  }
</script>

<div class="space-y-3">
  {#each categoryNames as category (category)}
    {@const config = categoryConfig[category]}
    {@const catOpen = openSections.has(category)}
    {@const catDocCount = documents.filter((d) => d.category === category).length}
    <div class="border-2 border-ink/8 overflow-hidden bg-white">
      <div class="flex items-center gap-2.5 px-4 py-3 bg-surface/80 hover:bg-surface transition-colors border-b border-ink/8 group">
        <div class="flex items-center gap-2.5 flex-1 cursor-pointer" onclick={() => toggle(category)} role="button" tabindex="0" onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(category)}>
          <Chevron open={catOpen} />
          <div class="w-1.5 h-1.5 rounded-none bg-accent flex-shrink-0"></div>
          <span class="text-sm font-bold text-ink flex-1 font-display">{category}</span>
          {#if catDocCount > 0}
            <span class="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 uppercase tracking-wider border border-accent/20">
              {catDocCount}
            </span>
          {/if}
        </div>
        <div class="flex items-center gap-1">
          <button
            onclick={() => (renameTarget = { type: 'category', category, currentName: category })}
            class="w-7 h-7 flex items-center justify-center hover:bg-accent/10 text-ink-muted hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
            title="Rename category"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
            </svg>
          </button>
          {#if config.fiscalYears.length === 0}
            <UploadButton {category} fiscalYear={null} subCategory={null} {onUpload} />
          {/if}
        </div>
      </div>

      {#if catOpen}
        <div>
          {#if config.fiscalYears.length === 0}
            {@const leafDocs = getLeafDocs(category, null, null)}
            <div class="px-2 py-1">
              {#if leafDocs.length === 0}
                <p class="text-xs text-ink-muted px-3 py-3 italic">No documents uploaded</p>
              {:else}
                {#each leafDocs as doc (doc.id)}
                  <DocRow {doc} onEdit={() => onEdit(doc)} onDelete={() => onDelete(doc)} {getToken} />
                {/each}
              {/if}
            </div>
          {/if}

          {#each config.fiscalYears as fy (fy)}
            {@const fyKey = `${category}||${fy}`}
            {@const fyOpen = openSections.has(fyKey)}
            {@const fyDocCount = documents.filter((d) => d.category === category && d.fiscalYear === fy).length}
            <div>
              <div class="flex items-center gap-2 pl-8 pr-4 py-2.5 hover:bg-ink/[0.02] transition-colors border-b border-ink/5 group">
                <div class="flex items-center gap-2 flex-1 cursor-pointer" onclick={() => toggle(fyKey)} role="button" tabindex="0" onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(fyKey)}>
                  <Chevron open={fyOpen} />
                  <svg class="w-3.5 h-3.5 text-[#0c8599] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.5}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121.75 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span class="text-xs font-bold text-ink-secondary flex-1 uppercase tracking-wide">{fy}</span>
                  {#if fyDocCount > 0}
                    <span class="text-[10px] font-medium text-ink-muted bg-ink/5 px-1.5 py-0.5 border border-ink/10">{fyDocCount}</span>
                  {/if}
                </div>
                <div class="flex items-center gap-1">
                  <button
                    onclick={() => (renameTarget = { type: 'fiscalYear', category, fiscalYear: fy, currentName: fy })}
                    class="w-7 h-7 flex items-center justify-center hover:bg-accent/10 text-ink-muted hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                    title="Rename fiscal year"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  {#if config.subCategories.length === 0}
                    <UploadButton {category} fiscalYear={fy} subCategory={null} {onUpload} />
                  {/if}
                </div>
              </div>

              {#if fyOpen}
                <div>
                  {#if config.subCategories.length === 0}
                    {@const leafDocs = getLeafDocs(category, fy, null)}
                    <div class="pl-12 pr-2 py-1">
                      {#if leafDocs.length === 0}
                        <p class="text-xs text-ink-muted px-3 py-2 italic">No documents uploaded</p>
                      {:else}
                        {#each leafDocs as doc (doc.id)}
                          <DocRow {doc} onEdit={() => onEdit(doc)} onDelete={() => onDelete(doc)} {getToken} />
                        {/each}
                      {/if}
                    </div>
                  {/if}

                  {#each config.subCategories as sc (sc)}
                    {@const leafDocs = getLeafDocs(category, fy, sc)}
                    <div>
                      <div class="flex items-center gap-2 pl-14 pr-4 py-2 bg-ink/[0.01] border-b border-ink/5 group">
                        <svg class="w-3.5 h-3.5 text-ink-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.5}>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span class="text-xs font-semibold text-ink-secondary flex-1">{sc}</span>
                        {#if leafDocs.length > 0}
                          <span class="text-[10px] font-medium text-ink-muted bg-ink/5 px-1.5 py-0.5 border border-ink/10">{leafDocs.length}</span>
                        {/if}
                        <button
                          onclick={() => (renameTarget = { type: 'subCategory', category, fiscalYear: fy, subCategory: sc, currentName: sc })}
                          class="w-7 h-7 flex items-center justify-center hover:bg-accent/10 text-ink-muted hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                          title="Rename subcategory"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button
                          onclick={() => (deleteTarget = { type: 'subCategory', category, fiscalYear: fy, subCategory: sc, name: sc })}
                          class="w-7 h-7 flex items-center justify-center hover:bg-danger/10 text-ink-muted hover:text-danger transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete subcategory"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                        <UploadButton {category} fiscalYear={fy} subCategory={sc} {onUpload} />
                      </div>
                      <div class="pl-16 pr-2 py-1">
                        {#if leafDocs.length === 0}
                          <p class="text-xs text-ink-muted px-2 py-1.5 italic">No documents uploaded</p>
                        {:else}
                          {#each leafDocs as doc (doc.id)}
                            <DocRow {doc} onEdit={() => onEdit(doc)} onDelete={() => onDelete(doc)} {getToken} />
                          {/each}
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}

  {#if uncategorised.length > 0}
    <div class="border-2 border-ink/8 overflow-hidden bg-white">
      <div class="px-4 py-3 bg-surface/80 border-b border-ink/8">
        <span class="text-sm font-bold text-ink-secondary">Uncategorised</span>
      </div>
      <div class="px-2 py-1">
        {#each uncategorised as doc (doc.id)}
          <DocRow {doc} onEdit={() => onEdit(doc)} onDelete={() => onDelete(doc)} {getToken} />
        {/each}
      </div>
    </div>
  {/if}

  {#if renameTarget}
    <RenameDialog
      title={`Rename ${renameTarget.type === 'category' ? 'Category' : renameTarget.type === 'fiscalYear' ? 'Fiscal Year' : 'Subcategory'}`}
      currentName={renameTarget.currentName}
      onConfirm={handleRename}
      onCancel={() => (renameTarget = null)}
      loading={isRenaming}
    />
  {/if}

  {#if deleteTarget}
    <ConfirmDialog
      message={`Delete "${deleteTarget.name}" ${deleteTarget.type}? ${
        deleteTarget.type === 'subCategory'
          ? 'This will remove the subcategory from the configuration but will NOT delete any documents.'
          : 'This will remove it from the configuration but will NOT delete any documents.'
      }`}
      onConfirm={handleDelete}
      onCancel={() => (deleteTarget = null)}
      loading={isDeleting}
    />
  {/if}
</div>

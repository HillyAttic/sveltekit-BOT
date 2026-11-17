<script lang="ts">
  interface CategoryConfig {
    fiscalYears: string[]
    subCategories: string[]
  }

  let {
    categories,
    onSave,
    onCancel,
    loading = false,
  }: {
    categories: Record<string, CategoryConfig>
    onSave: (categories: Record<string, CategoryConfig>) => void
    onCancel: () => void
    loading?: boolean
  } = $props()

  let newCategoryName = $state('')
  let categoryData = $state<Record<string, CategoryConfig>>(structuredClone(categories))
  let errors = $state<{ name?: string }>({})

  function addCategory() {
    const trimmed = newCategoryName.trim()
    if (!trimmed) {
      errors = { name: 'Category name is required' }
      return
    }
    if (categoryData[trimmed]) {
      errors = { name: 'Category already exists' }
      return
    }
    categoryData = { ...categoryData, [trimmed]: { fiscalYears: [], subCategories: [] } }
    newCategoryName = ''
    errors = {}
  }

  function deleteCategory(name: string) {
    const copy = { ...categoryData }
    delete copy[name]
    categoryData = copy
  }

  function addFiscalYear(category: string) {
    const year = prompt('Enter fiscal year (e.g., FY 2025-26):')
    if (!year) return
    const current = categoryData[category]
    if (current.fiscalYears.includes(year)) {
      alert('Fiscal year already exists')
      return
    }
    categoryData = {
      ...categoryData,
      [category]: { ...current, fiscalYears: [...current.fiscalYears, year] },
    }
  }

  function deleteFiscalYear(category: string, year: string) {
    const current = categoryData[category]
    categoryData = {
      ...categoryData,
      [category]: { ...current, fiscalYears: current.fiscalYears.filter((y) => y !== year) },
    }
  }

  function addSubCategory(category: string) {
    const sub = prompt('Enter sub-category name:')
    if (!sub) return
    const current = categoryData[category]
    if (current.subCategories.includes(sub)) {
      alert('Sub-category already exists')
      return
    }
    categoryData = {
      ...categoryData,
      [category]: { ...current, subCategories: [...current.subCategories, sub] },
    }
  }

  function deleteSubCategory(category: string, sub: string) {
    const current = categoryData[category]
    categoryData = {
      ...categoryData,
      [category]: { ...current, subCategories: current.subCategories.filter((s) => s !== sub) },
    }
  }
</script>

<div class="space-y-5">
  <div class="bg-surface border-2 border-ink/8 p-4">
    <h4 class="eyebrow mb-3">Add New Category</h4>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={newCategoryName}
        placeholder="Enter category name"
        class="flex-1 px-4 py-2.5 bg-white border-2 border-ink/10 rounded-none text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent transition-all"
      />
      <button
        onclick={addCategory}
        class="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-none hover:bg-accent-hover transition-colors shadow-bold border-2 border-transparent"
      >
        Add
      </button>
    </div>
    {#if errors.name}<p class="text-danger text-xs mt-1.5 font-medium">{errors.name}</p>{/if}
  </div>

  <div class="space-y-3 max-h-96 overflow-y-auto pr-1">
    {#each Object.entries(categoryData) as [name, config] (name)}
      <div class="bg-white border-2 border-ink/8 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-3 bg-ink/[0.02] border-b border-ink/8">
          <div class="flex-1">
            <h5 class="text-sm font-bold text-ink">{name}</h5>
            <p class="text-[11px] text-ink-muted mt-0.5">
              {config.fiscalYears.length} fiscal year(s) &bull; {config.subCategories.length} sub-categor{config.subCategories.length !== 1 ? 'ies' : 'y'}
            </p>
          </div>
          <button
            onclick={() => deleteCategory(name)}
            class="w-8 h-8 flex items-center justify-center rounded-none hover:bg-danger/10 text-ink-muted hover:text-danger transition-colors border border-transparent hover:border-danger/20"
            title="Delete category"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>

        <div class="px-4 py-3 space-y-3">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="eyebrow">Fiscal Years</span>
              <button
                onclick={() => addFiscalYear(name)}
                class="text-[10px] font-bold uppercase tracking-wider text-accent hover:text-accent-hover flex items-center gap-1"
              >
                + Add Year
              </button>
            </div>
            <div class="flex flex-wrap gap-1.5">
              {#if config.fiscalYears.length === 0}
                <span class="text-[11px] text-ink-muted italic">No fiscal years</span>
              {:else}
                {#each config.fiscalYears as year (year)}
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-accent/10 text-accent border border-accent/20">
                    {year}
                    <button onclick={() => deleteFiscalYear(name, year)} class="hover:text-danger transition-colors" aria-label="Remove {year}">
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                {/each}
              {/if}
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="eyebrow">Sub-Categories</span>
              <button
                onclick={() => addSubCategory(name)}
                class="text-[10px] font-bold uppercase tracking-wider text-[#0c8599] hover:text-[#0b7285] flex items-center gap-1"
              >
                + Add Sub
              </button>
            </div>
            <div class="flex flex-wrap gap-1.5">
              {#if config.subCategories.length === 0}
                <span class="text-[11px] text-ink-muted italic">No sub-categories</span>
              {:else}
                {#each config.subCategories as sub (sub)}
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-[#0c8599]/10 text-[#0c8599] border border-[#0c8599]/20">
                    {sub}
                    <button onclick={() => deleteSubCategory(name, sub)} class="hover:text-danger transition-colors" aria-label="Remove {sub}">
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                {/each}
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="flex justify-end gap-3 pt-3 border-t border-ink/10">
    <button
      type="button"
      onclick={onCancel}
      disabled={loading}
      class="px-5 py-2.5 text-sm font-medium text-ink-secondary hover:text-ink rounded-none hover:bg-surface-hover transition-colors border border-ink/10 hover:border-ink/20 disabled:opacity-50"
    >
      Cancel
    </button>
    <button
      type="button"
      onclick={() => onSave(categoryData)}
      disabled={loading}
      class="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-none hover:bg-accent-hover transition-colors shadow-bold border-2 border-transparent disabled:opacity-70 flex items-center gap-2"
    >
      {#if loading}
        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Saving...
      {:else}
        Save Categories
      {/if}
    </button>
  </div>
</div>

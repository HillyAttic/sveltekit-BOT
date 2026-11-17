<script lang="ts">
  import type { UploadPreset } from './types'

  let {
    category,
    fiscalYear,
    subCategory,
    onUpload,
  }: {
    category: string
    fiscalYear: string | null
    subCategory: string | null
    onUpload: (preset: UploadPreset) => void
  } = $props()
</script>

<button
  onclick={() => onUpload({ category, fiscalYear, subCategory })}
  class="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent hover:bg-accent/10 border border-accent/20 hover:border-accent/40 transition-all"
>
  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
  Upload
</button>

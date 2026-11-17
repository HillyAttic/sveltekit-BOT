<script lang="ts">
  let {
    message,
    onConfirm,
    onCancel,
    loading = false,
  }: {
    message: string
    onConfirm: () => void
    onCancel: () => void
    loading?: boolean
  } = $props()
</script>

<div
  class="fixed inset-0 bg-ink/50 modal-backdrop flex items-center justify-center z-50 animate-fade-in"
  onclick={onCancel}
  onkeydown={(e) => e.key === 'Escape' && onCancel()}
  role="presentation"
>
  <div
    class="bg-white border-2 border-ink/10 shadow-modal animate-scale-in max-w-md w-full mx-4"
    onclick={(e) => e.stopPropagation()}
    onkeydown={(e) => e.stopPropagation()}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <div class="px-6 py-4 border-b-2 border-danger/20 bg-danger/5 flex items-center gap-3">
      <div class="w-10 h-10 rounded-none bg-danger/10 flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <div>
        <h4 class="text-sm font-bold text-ink uppercase tracking-wide">Confirm Deletion</h4>
      </div>
    </div>

    <div class="px-6 py-5">
      <p class="text-ink text-[15px] leading-relaxed">{message}</p>
    </div>

    <div class="px-6 py-4 border-t-2 border-ink/8 flex justify-end gap-3">
      <button
        onclick={onCancel}
        disabled={loading}
        class="px-5 py-2.5 text-sm font-medium text-ink-secondary hover:text-ink rounded-none hover:bg-surface-hover transition-colors border border-ink/10 hover:border-ink/20 disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        onclick={onConfirm}
        disabled={loading}
        class="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-danger text-white rounded-none hover:bg-danger-hover transition-colors shadow-bold border-2 border-transparent disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {#if loading}
          <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Deleting...
        {:else}
          Delete
        {/if}
      </button>
    </div>
  </div>
</div>

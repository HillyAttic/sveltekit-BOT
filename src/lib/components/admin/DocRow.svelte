<script lang="ts">
  import type { DocumentRecord } from './types'

  let {
    doc,
    onEdit,
    onDelete,
    getToken,
  }: {
    doc: DocumentRecord
    onEdit: () => void
    onDelete: () => void
    getToken: () => string | null
  } = $props()

  let isLoadingUrl = $state(false)

  function getFileExtension(filePath: string): string {
    const parts = filePath.split('.')
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''
  }

  function getFileIcon(ext: string) {
    const map: Record<string, { bg: string; text: string; label: string; border: string }> = {
      pdf: { bg: 'bg-[#c92a2a]/10', text: 'text-[#c92a2a]', label: 'PDF', border: 'border-[#c92a2a]/20' },
      doc: { bg: 'bg-[#0c8599]/10', text: 'text-[#0c8599]', label: 'DOC', border: 'border-[#0c8599]/20' },
      docx: { bg: 'bg-[#0c8599]/10', text: 'text-[#0c8599]', label: 'DOC', border: 'border-[#0c8599]/20' },
      xls: { bg: 'bg-[#2b8a3e]/10', text: 'text-[#2b8a3e]', label: 'XLS', border: 'border-[#2b8a3e]/20' },
      xlsx: { bg: 'bg-[#2b8a3e]/10', text: 'text-[#2b8a3e]', label: 'XLS', border: 'border-[#2b8a3e]/20' },
      jpg: { bg: 'bg-[#7048e8]/10', text: 'text-[#7048e8]', label: 'IMG', border: 'border-[#7048e8]/20' },
      jpeg: { bg: 'bg-[#7048e8]/10', text: 'text-[#7048e8]', label: 'IMG', border: 'border-[#7048e8]/20' },
      png: { bg: 'bg-[#7048e8]/10', text: 'text-[#7048e8]', label: 'IMG', border: 'border-[#7048e8]/20' },
      gif: { bg: 'bg-[#7048e8]/10', text: 'text-[#7048e8]', label: 'IMG', border: 'border-[#7048e8]/20' },
    }
    return (
      map[ext] || {
        bg: 'bg-ink/5',
        text: 'text-ink-muted',
        label: (ext || 'FILE').toUpperCase(),
        border: 'border-ink/10',
      }
    )
  }

  let icon = $derived(getFileIcon(getFileExtension(doc.filePath)))

  async function handleView() {
    try {
      isLoadingUrl = true
      const token = getToken()
      const response = await fetch(`/api/admin/documents/${doc.id}/download-url`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error('Failed to get download URL')
      const data = await response.json()
      window.open(data.url, '_blank')
    } catch (error) {
      console.error('Error viewing document:', error)
      alert('Failed to open document. Please try again.')
    } finally {
      isLoadingUrl = false
    }
  }
</script>

<div class="flex items-center gap-3 px-4 py-2.5 hover:bg-ink/[0.03] group transition-colors border-b border-ink/5 last:border-0">
  <span class="inline-flex items-center justify-center w-8 h-5 rounded-none text-[9px] font-bold uppercase flex-shrink-0 {icon.bg} {icon.text} {icon.border} border">
    {icon.label}
  </span>
  <span class="text-sm text-ink flex-1 min-w-0 truncate font-medium">{doc.title}</span>
  <div class="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
    <button
      onclick={handleView}
      disabled={isLoadingUrl}
      class="w-7 h-7 flex items-center justify-center hover:bg-ink/5 text-ink-muted hover:text-[#0c8599] transition-colors disabled:opacity-50"
      title="View"
    >
      {#if isLoadingUrl}
        <svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      {:else}
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      {/if}
    </button>
    <button
      onclick={onEdit}
      class="w-7 h-7 flex items-center justify-center hover:bg-ink/5 text-ink-muted hover:text-accent transition-colors"
      title="Edit"
    >
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
      </svg>
    </button>
    <button
      onclick={onDelete}
      class="w-7 h-7 flex items-center justify-center hover:bg-danger/10 text-ink-muted hover:text-danger transition-colors"
      title="Delete"
    >
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.8}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    </button>
  </div>
</div>

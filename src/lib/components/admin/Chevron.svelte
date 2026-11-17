<script lang="ts">
  let { open }: { open: boolean } = $props()
</script>

<svg
  class="w-3.5 h-3.5 text-ink-muted transition-transform duration-200 {open ? 'rotate-90' : ''}"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width={2.5}
>
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

<script lang="ts">
  import type { Snippet } from 'svelte'
  import AdminGuard from '#lib/components/AdminGuard.svelte'

  let { children }: { children: Snippet } = $props()
</script>

<AdminGuard>{@render children()}</AdminGuard>

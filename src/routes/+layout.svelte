<script lang="ts">
  import '../app.css'
  import { onMount, type Snippet } from 'svelte'

  let { children }: { children: Snippet } = $props()

  onMount(() => {
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
    }
  })
</script>

{@render children()}

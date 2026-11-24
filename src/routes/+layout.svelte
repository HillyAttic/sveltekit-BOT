<script lang="ts">
  import '../app.css'
  import { onMount, type Snippet } from 'svelte'

  let { children }: { children: Snippet } = $props()

  // The PWA is gone, but browsers that loaded the old build still have its
  // service worker (and cached pages). Unregister it once so they refresh.
  // ponytail: delete this after the first deploy — no new SW can be installed.
  onMount(() => {
    navigator.serviceWorker?.getRegistrations().then((rs) => rs.forEach((r) => r.unregister()))
  })
</script>

{@render children()}

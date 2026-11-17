<script lang="ts">
  let { rows, cols }: { rows: number; cols: number } = $props()
</script>

<div class="bg-white border-2 border-ink/10 shadow-card p-4 space-y-2">
  {#each Array.from({ length: rows }) as _, r (r)}
    <div class="flex gap-3 animate-pulse-soft">
      {#each Array.from({ length: cols }) as __, c (c)}
        <div class="flex-1 h-4 bg-ink/5"></div>
      {/each}
    </div>
  {/each}
</div>

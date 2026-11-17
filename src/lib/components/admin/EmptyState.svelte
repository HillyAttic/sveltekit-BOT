<script lang="ts">
  let { title, body }: { title: string; body: string } = $props()
</script>

<div class="bg-white border-2 border-ink/10 p-16 text-center relative">
  <div class="absolute top-3 right-3 w-6 h-6 bg-accent rotate-12"></div>
  <svg class="w-12 h-12 mx-auto text-ink-muted/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.2}>
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5l1.5 1.5 3-3M6.75 21.75h10.5a2.25 2.25 0 002.25-2.25V4.5a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v15a2.25 2.25 0 002.25 2.25z" />
  </svg>
  <p class="eyebrow text-ink-muted">No data</p>
  <h3 class="font-display text-lg text-ink mt-2">{title}</h3>
  <p class="text-ink-secondary text-sm mt-2 max-w-md mx-auto">{body}</p>
</div>

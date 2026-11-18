<script lang="ts">
  import type { Snippet } from 'svelte'
  import AdminGuard from '#lib/components/AdminGuard.svelte'
  import { auth } from '#lib/auth.svelte'

  const nav = [
    ['Dashboard', '/admin'],
    ['Employee Management', '/admin/employees'],
    ['Video & Learning', '/admin/learning'],
    ['Learning Sequence', '/admin/sequence'],
    ['Assessment Builder', '/admin/assessment'],
    ['Question Bank', '/admin/questions'],
    ['Scorecards & Results', '/admin/scorecards'],
    ['Certificate Management', '/admin/certificates'],
    ['Reminder Management', '/admin/reminders'],
    ['Reports & Analytics', '/admin/reports'],
    ['City & Zone', '/admin/cityzone'],
    ['Settings', '/admin/settings'],
  ]

  let { children }: { children: Snippet } = $props()
</script>

<AdminGuard>
  <div class="h-screen flex overflow-hidden bg-surface">
    <aside class="w-64 flex-shrink-0 bg-white border-r border-surface-border flex flex-col">
      <div class="px-5 py-4 border-b border-surface-border">
        <h1 class="text-lg font-bold text-ink">Edventure</h1>
        <p class="text-[10px] text-ink-muted uppercase tracking-widest">Admin Panel</p>
      </div>
      <nav class="flex-1 overflow-y-auto p-2 space-y-0.5">
        {#each nav as [label, href] (href)}
          <a {href} class="block px-3 py-2 rounded text-sm text-ink hover:bg-surface-hover hover:text-accent transition-colors">{label}</a>
        {/each}
      </nav>
      <div class="p-3 border-t border-surface-border">
        <button onclick={() => auth.signOut()} class="w-full text-xs text-ink-muted hover:text-danger">Sign out</button>
      </div>
    </aside>
    <main class="flex-1 overflow-y-auto">
      {@render children()}
    </main>
  </div>
</AdminGuard>
EOF
echo done
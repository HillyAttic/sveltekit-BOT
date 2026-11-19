<script lang="ts">
  import type { Snippet } from 'svelte'
  import { page } from '$app/state'
  import AdminGuard from '#lib/components/AdminGuard.svelte'
  import { auth } from '#lib/auth.svelte'

  const nav = [
    ['Dashboard', '/admin'],
    ['Employee Management', '/admin/employees'],
    ['Video & Learning', '/admin/learning'],
    ['Assessment Builder', '/admin/assessment'],
    ['Question Bank', '/admin/questions'],
    ['Scorecards & Results', '/admin/scorecards'],
    ['Certificate Management', '/admin/certificates'],
    ['Reminder Management', '/admin/reminders'],
    ['User Flows', '/admin/flows'],
    ['Reports & Analytics', '/admin/reports'],
    ['City & Zone', '/admin/cityzone'],
    ['Settings', '/admin/settings'],
  ]

  let { children }: { children: Snippet } = $props()
</script>

<AdminGuard>
  <div class="h-screen flex overflow-hidden bg-surface">
    <aside class="w-60 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div class="px-5 py-5 border-b border-sidebar-border">
        <h1 class="text-lg font-semibold text-ink leading-none">Edventure</h1>
        <p class="mt-1.5 text-[11px] text-ink-muted">Learning admin</p>
      </div>

      <nav class="flex-1 overflow-y-auto py-2" aria-label="Admin">
        {#each nav as [label, href] (href)}
          {@const active = href === '/admin' ? page.url.pathname === '/admin' : page.url.pathname.startsWith(href)}
          <a
            {href}
            aria-current={active ? 'page' : undefined}
            class="group relative flex items-center px-5 py-2 text-[13px] transition-colors
              {active ? 'text-accent bg-accent-light font-medium' : 'text-ink-secondary hover:bg-surface-hover hover:text-ink'}"
          >
            {#if active}
              <span class="absolute left-0 top-1 bottom-1 w-[2px] bg-accent" aria-hidden="true"></span>
            {/if}
            {label}
          </a>
        {/each}
      </nav>

      <div class="px-5 py-4 border-t border-sidebar-border">
        <button onclick={() => auth.signOut()} class="text-[12px] text-ink-muted hover:text-accent">
          Sign out
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-y-auto">
      <div class="mx-auto w-full max-w-[1200px]">
        {@render children()}
      </div>
    </main>
  </div>
</AdminGuard>

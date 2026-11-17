<script lang="ts">
  import { goto } from '$app/navigation'
  import { auth } from '#lib/auth.svelte'

  let email = $state('')
  let password = $state('')
  let error = $state('')
  let loading = $state(false)

  $effect(() => {
    if (auth.user && auth.isAdmin) {
      goto('/admin')
    }
  })

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    error = ''
    loading = true

    try {
      await auth.signIn(email, password)
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to sign in'
    } finally {
      loading = false
    }
  }
</script>

<div class="min-h-screen bg-surface flex items-center justify-center p-4 relative overflow-hidden">
  <div class="fixed top-0 left-0 w-64 h-64 bg-accent/5 -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none"></div>
  <div class="fixed bottom-0 right-0 w-96 h-96 bg-teal/5 translate-x-1/3 translate-y-1/3 rotate-12 pointer-events-none"></div>
  <div class="fixed top-1/4 right-8 w-2 h-32 bg-accent/20 rotate-45 pointer-events-none hidden lg:block"></div>
  <div class="fixed bottom-1/4 left-8 w-2 h-24 bg-teal/20 -rotate-12 pointer-events-none hidden lg:block"></div>

  <div class="w-full max-w-sm relative z-10">
    <div class="mb-10 animate-slide-up">
      <div class="flex items-start gap-4 mb-6">
        <div class="relative">
          <div class="w-16 h-16 rounded-none bg-ink flex items-center justify-center shadow-bold">
            <svg class="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.5}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-accent"></div>
        </div>
        <div class="pt-2">
          <span class="eyebrow block mb-1">Admin Portal</span>
          <h1 class="text-4xl font-display font-bold text-ink tracking-tight leading-none">JPCO<span class="text-accent">.</span></h1>
        </div>
      </div>
      <div class="accent-line pl-3">
        <p class="text-sm text-ink-secondary font-medium">WhatsApp Document Retrieval System</p>
        <p class="text-xs text-ink-muted mt-0.5">Sign in to your admin account to continue</p>
      </div>
    </div>

    <div class="bg-white border-2 border-ink/10 shadow-bold p-6 animate-slide-up" style="animation-delay: 100ms">
      {#if error}
        <div class="mb-4 p-3 bg-danger-light border-l-4 border-danger flex items-center gap-2">
          <svg class="w-4 h-4 text-danger flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <span class="text-sm text-danger font-medium">{error}</span>
        </div>
      {/if}

      <form onsubmit={handleSubmit} class="space-y-5">
        <div>
          <label for="email" class="eyebrow block mb-2">Email Address</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            placeholder="admin@jpco.com"
            class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent focus:ring-0 transition-all font-mono"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label for="password" class="eyebrow block mb-2">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            placeholder="Enter your password"
            class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent focus:ring-0 transition-all font-mono"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          class="w-full py-3 bg-accent text-white text-sm font-bold uppercase tracking-wider rounded-none hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-bold hover:shadow-glow-accent"
        >
          {#if loading}
            <span class="flex items-center justify-center gap-2">
              <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Signing in...
            </span>
          {:else}
            Sign In
          {/if}
        </button>
      </form>
    </div>

    <p class="text-center text-[11px] text-ink-muted mt-6 animate-fade-in">
      JPCO &copy; {new Date().getFullYear()} — WhatsApp Bot v2.0
    </p>
  </div>
</div>

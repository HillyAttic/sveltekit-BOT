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
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-accent"></div>
        </div>
        <div class="pt-2">
          <span class="eyebrow block mb-1">Admin Portal</span>
          <h1 class="text-4xl font-display font-bold text-ink tracking-tight leading-none">Edventure<span class="text-accent">.</span></h1>
        </div>
      </div>
      <div class="accent-line pl-3">
        <p class="text-sm text-ink-secondary font-medium">WhatsApp Learning Bot</p>
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
            placeholder="admin@edventure.com"
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
      Edventure &copy; {new Date().getFullYear()} — Learning Bot v2.0
    </p>
  </div>
</div>

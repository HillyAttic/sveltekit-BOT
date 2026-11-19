<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/state'
  import { auth } from '#lib/auth.svelte'

  interface FlowMessage { at: string; from: 'user' | 'bot'; text: string }
  /** Legacy (pre-transcript) rows. */
  interface FlowStep { step: string; at: string; message?: string }
  interface Flow {
    sessionId: string
    phone: string
    clientName: string
    date: string
    time: string
    timeTaken: string
    status: string
    messageCount: number
    messages: FlowMessage[]
    steps: FlowStep[]
    startedAt: string
    endedAt?: string
  }

  let flows = $state<Flow[]>([])
  let loading = $state(true)
  // Employees page links here with ?phone=… to show just that person's flows.
  let query = $state(page.url.searchParams.get('phone') ?? '')

  const filtered = $derived(
    flows.filter((f) => {
      const q = query.trim().toLowerCase()
      return !q || f.clientName.toLowerCase().includes(q) || f.phone.includes(q)
    })
  )

  onMount(async () => {
    try {
      const res = await fetch('/api/admin/reports/chat-access?limit=500', {
        headers: { Authorization: 'Bearer ' + auth.getToken() },
      })
      const data = await res.json()
      flows = Array.isArray(data.rows) ? data.rows : []
    } finally {
      loading = false
    }
  })

  // Times are shown in IST, same as the reports API.
  function istTime(iso?: string) {
    if (!iso) return '—'
    return new Date(new Date(iso).getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(11, 19)
  }

  async function remove(sessionId: string) {
    if (!confirm('Delete this flow and its transcript?')) return
    const res = await fetch('/api/admin/data/chatSessions/' + encodeURIComponent(sessionId), {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + auth.getToken() },
    })
    if (res.ok) flows = flows.filter((f) => f.sessionId !== sessionId)
    else alert('Failed to delete flow')
  }

  function stepLabel(step: string) {
    if (step === 'done' || step === 'flow_ended') return 'Completed'
    if (step === 'awaiting_finish') return 'Video sent — awaiting FINISH'
    if (step === 'assessment_question') return 'Assessment question'
    if (step === 'consent') return 'Consent'
    if (step.startsWith('registration_')) {
      const field = step.slice('registration_'.length)
      return 'Registration — ' + field.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
    }
    return step.replaceAll('_', ' ')
  }
</script>

<div class="p-6">
  <div class="flex items-center justify-between mb-4 gap-4">
    <div>
      <h2 class="text-xl font-semibold text-ink">User Flows</h2>
      <p class="text-xs text-ink-muted">One entry per Hi → completion run, with exact step times (IST).</p>
    </div>
    <input
      bind:value={query}
      placeholder="Search name or phone"
      class="px-3 py-2 border border-surface-border rounded text-sm w-64"
    />
  </div>

  {#if loading}
    <p class="text-ink-muted text-sm">Loading…</p>
  {:else if filtered.length === 0}
    <p class="text-ink-muted text-sm">No flows recorded yet.</p>
  {:else}
    <div class="space-y-4">
      {#each filtered as f (f.sessionId)}
        <div class="bg-white border border-surface-border rounded">
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 border-b border-surface-border">
            <span class="font-semibold text-ink">{f.clientName}</span>
            <span class="font-mono text-xs text-ink-muted">{f.phone}</span>
            <span class="text-xs text-ink-muted">{f.date} · {f.time} → {istTime(f.endedAt)}</span>
            <span class="text-xs text-ink-muted">{f.timeTaken}</span>
            <span class="text-xs text-ink-muted">{f.messageCount} messages</span>
            <span
              class="ml-auto text-[11px] px-2 py-0.5 rounded {f.status === 'active'
                ? 'bg-accent/10 text-accent'
                : 'bg-surface text-ink-muted'}"
            >{f.status}</span>
            <button
              onclick={() => remove(f.sessionId)}
              class="text-xs text-red-600 hover:underline"
              title="Delete flow"
            >Delete</button>
          </div>

          {#if f.messages?.length}
            <ol class="px-4 py-3 space-y-3">
              {#each f.messages as m, i (i)}
                <li class="text-sm">
                  <div class="flex items-center gap-3">
                    <span class="font-mono text-xs text-ink-muted w-20 shrink-0">{istTime(m.at)}</span>
                    <span class="text-xs font-semibold {m.from === 'bot' ? 'text-ink-muted' : 'text-ink'}">
                      {m.from === 'bot' ? 'Edventure' : f.clientName}
                    </span>
                  </div>
                  <p class="whitespace-pre-line pl-[5.75rem] {m.from === 'bot' ? 'text-ink-muted' : 'text-ink'}">{m.text}</p>
                </li>
              {/each}
            </ol>
          {:else if f.steps?.length}
            <ol class="px-4 py-3 space-y-2">
              {#each f.steps as s, i (i)}
                <li class="flex gap-3 text-sm">
                  <span class="font-mono text-xs text-ink-muted w-20 shrink-0">{istTime(s.at)}</span>
                  <span class="text-ink w-48 shrink-0">{stepLabel(s.step)}</span>
                  <span class="text-ink-muted truncate">{s.message || ''}</span>
                </li>
              {/each}
            </ol>
          {:else}
            <p class="px-4 py-3 text-xs text-ink-muted">No messages recorded for this flow.</p>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, deleteData } from '#lib/admin-data'
  import { auth } from '#lib/auth.svelte'

  interface Certificate {
    id: string
    certificateNumber?: string
    employeeId?: string
    employeeName?: string
    course?: string
    issuedAt?: string
    deliveryStatus?: 'scheduled' | 'sent' | 'failed'
    scheduledFor?: string
    sentAt?: string
    error?: string
  }

  function deliveryLabel(c: Certificate) {
    if (c.deliveryStatus === 'sent') return `Sent ${ist(c.sentAt)}`
    if (c.deliveryStatus === 'scheduled') return `Scheduled ${ist(c.scheduledFor)}`
    if (c.deliveryStatus === 'failed') return `Failed${c.error ? ' — ' + c.error : ''}`
    return 'Not sent'
  }

  let certs = $state<Certificate[]>([])
  let loading = $state(true)
  let generating = $state(false)
  let sendingId = $state<string | null>(null)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 3500) }

  function ist(iso?: string) {
    if (!iso) return '—'
    return new Date(new Date(iso).getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')
  }

  async function load() {
    loading = true
    try { certs = await listData<Certificate>('certificates') }
    catch { showToast('Failed to load') }
    finally { loading = false }
  }

  /** Issue every certificate that is now due — computed from videos + assessment results. */
  async function generate() {
    generating = true
    try {
      const res = await fetch('/api/admin/certificates/generate', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + auth.getToken() },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      showToast(
        `${data.created} certificate${data.created === 1 ? '' : 's'} generated` +
          (data.skipped ? `, ${data.skipped} employee${data.skipped === 1 ? '' : 's'} not eligible yet` : '')
      )
      await load()
    } catch { showToast('Certificate generation failed') }
    finally { generating = false }
  }

  /** Send this certificate's PDF on WhatsApp right now. */
  async function send(c: Certificate) {
    sendingId = c.id
    try {
      const res = await fetch(`/api/admin/certificates/${c.id}/send`, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + auth.getToken() },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      showToast(`Certificate sent to ${c.employeeName || 'the employee'}`)
      await load()
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Send failed')
    } finally { sendingId = null }
  }

  async function remove(id: string) {
    if (!confirm('Delete this certificate?')) return
    await deleteData('certificates', id)
    showToast('Certificate deleted')
    await load()
  }

  onMount(load)
</script>

<div class="p-6">
  <div class="flex items-start justify-between gap-4 mb-4">
    <div>
      <h2 class="text-xl font-bold text-ink">Certificate Management</h2>
      <p class="text-xs text-ink-muted">
        Generated automatically when the employee completes every video and passes every mapped assessment
        (retakes count). Use Generate to backfill employees who already qualified.
      </p>
    </div>
    <button onclick={generate} disabled={generating} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded disabled:opacity-50 shrink-0">
      {generating ? 'Generating…' : 'Generate certificates'}
    </button>
  </div>

  {#if loading}
    <p class="text-ink-muted text-sm">Loading…</p>
  {:else if certs.length === 0}
    <p class="text-ink-muted text-sm">No certificates issued yet.</p>
  {:else}
    <div class="bg-white border border-surface-border rounded overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-surface">
          <tr>
            <th class="px-3 py-2 text-left">Certificate ID</th>
            <th class="px-3 py-2 text-left">Employee</th>
            <th class="px-3 py-2 text-left">Employee ID</th>
            <th class="px-3 py-2 text-left">Course</th>
            <th class="px-3 py-2 text-left">Issued</th>
            <th class="px-3 py-2 text-left">WhatsApp</th>
            <th class="px-3 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {#each certs as c (c.id)}
            <tr class="border-t border-surface-border">
              <td class="px-3 py-2 font-mono text-xs">{c.certificateNumber || c.id}</td>
              <td class="px-3 py-2">{c.employeeName || '—'}</td>
              <td class="px-3 py-2 font-mono text-xs">{c.employeeId || '—'}</td>
              <td class="px-3 py-2">{c.course || '—'}</td>
              <td class="px-3 py-2 text-xs">{ist(c.issuedAt)}</td>
              <td class="px-3 py-2 text-xs">
                <span class={c.deliveryStatus === 'failed' ? 'text-danger' : c.deliveryStatus === 'sent' ? 'text-accent' : 'text-ink-muted'}>{deliveryLabel(c)}</span>
                <button onclick={() => send(c)} disabled={sendingId === c.id} class="block mt-0.5 text-xs text-accent hover:underline disabled:opacity-50">
                  {sendingId === c.id ? 'Sending…' : c.deliveryStatus === 'sent' ? 'Resend' : 'Send now'}
                </button>
              </td>
              <td class="px-3 py-2"><button onclick={() => remove(c.id)} class="text-xs text-danger hover:underline">Delete</button></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

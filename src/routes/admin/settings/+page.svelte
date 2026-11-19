<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, createData } from '#lib/admin-data'

  interface Settings {
    id?: string
    orgName: string
    whatsappNumber: string
    adminEmail: string
    sessionTimeoutMinutes?: number
  }
  let settings = $state<Settings>({
    orgName: 'Edventure',
    whatsappNumber: '',
    adminEmail: '',
    sessionTimeoutMinutes: 30,
  })
  let loading = $state(true)
  let saving = $state(false)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  onMount(async () => {
    try {
      const rows = await listData<Settings & { id: string }>('settings')
      if (rows.length) settings = rows[0]
    } catch { showToast('Failed to load') }
    finally { loading = false }
  })

  async function save() {
    saving = true
    try {
      await createData('settings', {
        id: settings.id || 'app',
        orgName: settings.orgName,
        whatsappNumber: settings.whatsappNumber,
        adminEmail: settings.adminEmail,
        sessionTimeoutMinutes: Math.min(1440, Math.max(1, Math.round(settings.sessionTimeoutMinutes || 30))),
      })
      showToast('Saved')
    } catch { showToast('Save failed') }
    finally { saving = false }
  }
</script>

<div class="p-6">
  <h2 class="text-xl font-bold text-ink mb-4">Settings</h2>
  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else}
    <div class="bg-white border border-surface-border rounded p-4 space-y-3 max-w-md">
      <label class="block text-xs text-ink-muted">Organization Name
        <input bind:value={settings.orgName} class="w-full px-3 py-2 border rounded text-sm mt-1" />
      </label>
      <label class="block text-xs text-ink-muted">WhatsApp Number
        <input bind:value={settings.whatsappNumber} class="w-full px-3 py-2 border rounded text-sm mt-1 font-mono" />
      </label>
      <label class="block text-xs text-ink-muted">Admin Email
        <input bind:value={settings.adminEmail} class="w-full px-3 py-2 border rounded text-sm mt-1" />
      </label>
      <label class="block text-xs text-ink-muted">Bot Session Timeout (minutes of inactivity)
        <input type="number" min="1" max="1440" bind:value={settings.sessionTimeoutMinutes} class="w-full px-3 py-2 border rounded text-sm mt-1" />
        <span class="block mt-1 text-[11px] text-ink-muted">After this many idle minutes the conversation session expires; users just send Hi to continue. 1–1440.</span>
      </label>
      <button onclick={save} disabled={saving} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded disabled:opacity-50">{saving ? 'Saving…' : 'Save'}</button>
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

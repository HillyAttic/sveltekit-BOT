<script lang="ts">
  import { onMount } from 'svelte'
  import { auth } from '#lib/auth.svelte'

  interface Employee {
    id: string
    employeeId?: string
    name: string
    managerName?: string
    city?: string
    zone?: string
    phones: string[]
    createdAt?: string
  }
  let employees = $state<Employee[]>([])
  let loading = $state(true)
  let showForm = $state(false)
  let name = $state('')
  let phone = $state('')
  let saving = $state(false)
  let toast = $state<string | null>(null)

  function headers() { return { Authorization: 'Bearer ' + auth.getToken(), 'Content-Type': 'application/json' } }
  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  async function load() {
    loading = true
    try {
      const res = await fetch('/api/admin/clients', { headers: headers() })
      employees = await res.json()
    } catch { showToast('Failed to load') }
    finally { loading = false }
  }

  async function save() {
    saving = true
    try {
      const res = await fetch('/api/admin/clients', { method: 'POST', headers: headers(), body: JSON.stringify({ name, phones: [phone] }) })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed') }
      name = ''; phone = ''; showForm = false
      showToast('Employee added')
      load()
    } catch (e) { showToast(e instanceof Error ? e.message : 'Failed') }
    finally { saving = false }
  }

  async function remove(id: string) {
    if (!confirm('Delete this employee?')) return
    await fetch('/api/admin/clients/' + id, { method: 'DELETE', headers: headers() })
    showToast('Deleted')
    load()
  }

  onMount(load)
</script>

<div class="p-6">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-bold text-ink">Employee Management</h2>
    <button onclick={() => (showForm = !showForm)} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded hover:bg-accent-hover">{showForm ? 'Cancel' : '+ Add Employee'}</button>
  </div>

  {#if showForm}
    <div class="bg-white border border-surface-border rounded p-4 mb-4 space-y-3 max-w-md">
      <input bind:value={name} placeholder="Full name" class="w-full px-3 py-2 border rounded text-sm" />
      <input bind:value={phone} placeholder="Phone (91...)" class="w-full px-3 py-2 border rounded text-sm font-mono" />
      <button onclick={save} disabled={saving} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
    </div>
  {/if}

  {#if loading}
    <p class="text-ink-muted">Loading…</p>
  {:else}
    <div class="bg-white border border-surface-border rounded overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-surface">
          <tr><th class="px-3 py-2 text-left">Employee ID</th><th class="px-3 py-2 text-left">Name</th><th class="px-3 py-2 text-left">Manager Name</th><th class="px-3 py-2 text-left">City</th><th class="px-3 py-2 text-left">Zone</th><th class="px-3 py-2 text-left">Phone</th><th class="px-3 py-2 text-left">Action</th></tr>
        </thead>
        <tbody>
          {#each employees as e (e.id)}
            <tr class="border-t border-surface-border">
              <td class="px-3 py-2 font-mono text-xs">{e.employeeId || '—'}</td>
              <td class="px-3 py-2">{e.name}</td>
              <td class="px-3 py-2">{e.managerName || '—'}</td>
              <td class="px-3 py-2">{e.city || '—'}</td>
              <td class="px-3 py-2">{e.zone || '—'}</td>
              <td class="px-3 py-2 font-mono text-xs">{e.phones?.[0] || '—'}</td>
              <td class="px-3 py-2"><button onclick={() => remove(e.id)} class="text-xs text-danger hover:underline">Delete</button></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

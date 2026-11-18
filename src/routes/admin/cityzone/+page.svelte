<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, createData, updateData, deleteData } from '#lib/admin-data'

  interface Item { id: string; name: string }
  interface City extends Item { zone?: string }
  let cities = $state<City[]>([])
  let zones = $state<Item[]>([])
  let cityInput = $state('')
  let cityZone = $state('')
  let zoneInput = $state('')
  let loading = $state(true)
  let toast = $state<string | null>(null)

  function showToast(m: string) { toast = m; setTimeout(() => (toast = null), 2500) }

  async function load() {
    loading = true
    try {
      cities = await listData<City>('cities')
      zones = await listData<Item>('zones')
    } catch { showToast('Failed to load') }
    finally { loading = false }
  }

  async function addCity() {
    if (!cityInput.trim()) return
    await createData('cities', { name: cityInput.trim(), zone: cityZone })
    cityInput = ''
    cityZone = ''
    await load()
  }

  async function setCityZone(city: City, zone: string) {
    await updateData('cities', city.id, { zone })
    await load()
  }

  async function addZone() {
    if (!zoneInput.trim()) return
    await createData('zones', { name: zoneInput.trim() })
    zoneInput = ''
    await load()
  }

  onMount(load)
</script>

<div class="p-6">
  <h2 class="text-xl font-bold text-ink mb-4">City & Zone Management</h2>
  {#if loading}<p class="text-ink-muted text-sm">Loading…</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="font-semibold text-ink mb-2">Cities</h3>
        <div class="flex gap-2 mb-3">
          <input bind:value={cityInput} placeholder="City name" class="px-3 py-2 border rounded text-sm flex-1" onkeydown={(e) => e.key === 'Enter' && addCity()} />
          <select bind:value={cityZone} class="px-3 py-2 border rounded text-sm">
            <option value="">No zone</option>
            {#each zones as z (z.id)}<option value={z.name}>{z.name}</option>{/each}
          </select>
          <button onclick={addCity} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded">Add</button>
        </div>
        <ul class="space-y-1">
          {#each cities as c (c.id)}
            <li class="bg-white border border-surface-border rounded px-3 py-1.5 text-sm flex items-center justify-between gap-2">
              <span class="flex-1">{c.name}</span>
              <select value={c.zone || ''} onchange={(e) => setCityZone(c, e.currentTarget.value)} class="px-2 py-1 border rounded text-xs">
                <option value="">No zone</option>
                {#each zones as z (z.id)}<option value={z.name}>{z.name}</option>{/each}
              </select>
              <button onclick={async () => { await deleteData('cities', c.id); load() }} class="text-xs text-danger hover:underline">Delete</button>
            </li>
          {/each}
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-ink mb-2">Zones</h3>
        <div class="flex gap-2 mb-3">
          <input bind:value={zoneInput} placeholder="Zone name" class="px-3 py-2 border rounded text-sm flex-1" onkeydown={(e) => e.key === 'Enter' && addZone()} />
          <button onclick={addZone} class="px-4 py-2 text-sm font-bold bg-accent text-white rounded">Add</button>
        </div>
        <ul class="space-y-1">
          {#each zones as z (z.id)}
            <li class="bg-white border border-surface-border rounded px-3 py-1.5 text-sm flex items-center justify-between">
              {z.name}
              <button onclick={async () => { await deleteData('zones', z.id); load() }} class="text-xs text-danger hover:underline">Delete</button>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import { auth } from '#lib/auth.svelte'

  interface ReminderStep { id: string; triggerMinutes: number; message: string; enabled: boolean; order: number }
  interface Config { enabled: boolean; maxReminders: number; reminders: ReminderStep[]; applyTo?: string }
  interface Delivery { id: string; phone: string; employeeName?: string; videoTitle: string; videoUrl?: string; moduleNumber?: string; deliveredAt: string; completedAt?: string | null; status: string }
  interface History { employeeName: string; employeeId: string; videoTitle: string; videoDeliveryTime: string; scheduledReminderTime: string; actualReminderSentTime: string; reminderNumber: number; deliveryStatus: string; completionStatus: string; nextScheduledReminder: string }

  let config = $state<Config>({ enabled: true, maxReminders: 5, reminders: [], applyTo: 'all' })
  let deliveries = $state<Delivery[]>([])
  let history = $state<History[]>([])
  let employees = $state<any[]>([])
  let videos = $state<any[]>([])
  let selectedVideo = $state('')
  let loading = $state(true)
  let tab = $state<'config' | 'deliveries' | 'history'>('deliveries')
  let toast = $state<{ message: string; type: 'success' | 'error' } | null>(null)

  // delivery form
  let employeeName = $state('')
  let phone = $state('')
  let videoTitle = $state('')
  let videoUrl = $state('')
  let moduleNumber = $state('')
  let saving = $state(false)

  function headers() { return { Authorization: 'Bearer ' + auth.getToken(), 'Content-Type': 'application/json' } }
  function showToast(m: string, t: 'success' | 'error' = 'success') { toast = { message: m, type: t }; setTimeout(() => (toast = null), 2500) }

  async function load() {
    loading = true
    try {
      const res = await fetch('/api/admin/reminders', { headers: headers() })
      const data = await res.json()
      config = data.config
      deliveries = data.deliveries || []
      const h = await fetch('/api/admin/reminders?history=1', { headers: headers() })
      const hd = await h.json()
      history = hd.history || []
      const e = await fetch('/api/admin/clients', { headers: headers() })
      employees = await e.json()
      videos = await (await fetch('/api/admin/data/learningModules', { headers: headers() })).json()
    } catch { showToast('Failed to load', 'error') }
    finally { loading = false }
  }

  async function save() {
    try {
      const res = await fetch('/api/admin/reminders', { method: 'POST', headers: headers(), body: JSON.stringify({ config }) })
      if (!res.ok) throw new Error('fail')
      showToast('Configuration saved')
    } catch { showToast('Save failed', 'error') }
  }

  async function addDelivery() {
    if (!videoTitle.trim() || (!phone && !employeeName)) { showToast('Video title and employee/phone required', 'error'); return }
    saving = true
    try {
      const res = await fetch('/api/admin/video-deliveries', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ phone, employeeName, videoTitle: videoTitle.trim(), videoUrl: videoUrl.trim() || undefined, moduleNumber, deliveredAt: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error('fail')
      videoTitle = ''; videoUrl = ''; moduleNumber = ''
      showToast('Video delivery recorded — reminders scheduled')
      await load()
    } catch { showToast('Failed to record delivery', 'error') }
    finally { saving = false }
  }

  async function processNow() {
    try {
      const res = await fetch('/api/admin/reminders/process', { method: 'POST', headers: headers() })
      const data = await res.json()
      showToast(`Processed ${data.processed}, sent ${data.sent}, cancelled ${data.cancelled}`)
      await load()
    } catch { showToast('Process failed', 'error') }
  }

  async function complete(id: string) {
    await fetch('/api/admin/video-deliveries?id=' + id, { method: 'DELETE', headers: headers() })
    showToast('Marked complete — pending reminders cancelled')
    await load()
  }

  function addReminder() {
    const nextOrder = config.reminders.length + 1
    config.reminders = [...config.reminders, { id: 'r' + Date.now(), triggerMinutes: 60, message: 'Reminder: please complete your learning video and type FINISH.', enabled: true, order: nextOrder }]
  }

  function removeReminder(i: number) {
    config.reminders = config.reminders.filter((_, idx) => idx !== i).map((r, idx) => ({ ...r, order: idx + 1 }))
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= config.reminders.length) return
    const arr = [...config.reminders]
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    config.reminders = arr.map((r, idx) => ({ ...r, order: idx + 1 }))
  }

  function minsLabel(m: number) {
    if (m >= 1440) return `${Math.round(m / 1440)} day${m >= 2880 ? 's' : ''}`
    if (m >= 60) return `${Math.round(m / 60)} hour${m >= 120 ? 's' : ''}`
    return `${m} minutes`
  }

  onMount(load)
</script>

<div class="p-6">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h2 class="text-xl font-semibold text-ink">Reminder Management</h2>
      <p class="text-xs text-ink-muted">Configure reminder timing, messages and track every reminder.</p>
    </div>
    <button onclick={processNow} class="px-4 py-2 text-sm font-medium bg-accent text-white rounded hover:bg-accent-hover">Process Due Now</button>
  </div>

  <div class="flex gap-1 mb-5 border-b border-surface-border">
    <button onclick={() => (tab = 'deliveries')} class="px-4 py-2 text-sm -mb-px border-b-2 {tab === 'deliveries' ? 'border-accent text-accent font-semibold' : 'border-transparent text-ink-muted'}">Video Deliveries</button>
    <button onclick={() => (tab = 'config')} class="px-4 py-2 text-sm -mb-px border-b-2 {tab === 'config' ? 'border-accent text-accent font-semibold' : 'border-transparent text-ink-muted'}">Configuration</button>
    <button onclick={() => (tab = 'history')} class="px-4 py-2 text-sm -mb-px border-b-2 {tab === 'history' ? 'border-accent text-accent font-semibold' : 'border-transparent text-ink-muted'}">Reminder History</button>
  </div>

  {#if loading}
    <p class="text-ink-muted">Loading…</p>
  {:else if tab === 'deliveries'}
    <div class="bg-white border border-surface-border rounded p-4 mb-5 max-w-xl space-y-3">
      <h3 class="font-semibold text-ink">Add Video Delivery</h3>
      <p class="text-xs text-ink-muted">Recording a delivery sends nothing immediately — it starts the reminder clock and stores the video link.</p>
      <div class="grid grid-cols-2 gap-3">
        <select bind:value={employeeName} onchange={() => { const e = employees.find(x => x.name === employeeName); if (e) phone = e.phones?.[0] || '' }} class="px-3 py-2 border rounded text-sm">
          <option value="">Select employee</option>
          {#each employees as e (e.id)}<option value={e.name}>{e.name}</option>{/each}
        </select>
        <input bind:value={phone} placeholder="Phone (91…)" class="px-3 py-2 border rounded text-sm font-mono" />
        <select bind:value={selectedVideo} onchange={() => { const v = videos.find(x => x.id === selectedVideo); if (v) { videoTitle = v.title; videoUrl = v.videoUrl || ''; moduleNumber = v.moduleNumber || '' } }} class="col-span-2 px-3 py-2 border rounded text-sm">
          <option value="">Select video from library</option>
          {#each videos as v (v.id)}<option value={v.id}>{v.moduleNumber ? 'M' + v.moduleNumber + ' — ' : ''}{v.title}</option>{/each}
        </select>
        <input bind:value={videoTitle} placeholder="Video title" class="px-3 py-2 border rounded text-sm" />
        <input bind:value={moduleNumber} placeholder="Module number" class="px-3 py-2 border rounded text-sm" />
        <input bind:value={videoUrl} placeholder="Video link (optional)" class="col-span-2 px-3 py-2 border rounded text-sm" />
      </div>
      <button onclick={addDelivery} disabled={saving} class="px-4 py-2 text-sm font-medium bg-accent text-white rounded disabled:opacity-50">{saving ? 'Saving…' : 'Record Delivery & Schedule Reminders'}</button>
    </div>

    <div class="bg-white border border-surface-border rounded overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-surface">
          <tr><th class="px-3 py-2 text-left">Employee</th><th class="px-3 py-2 text-left">Video</th><th class="px-3 py-2 text-left">Module</th><th class="px-3 py-2 text-left">Delivered</th><th class="px-3 py-2 text-left">Status</th><th class="px-3 py-2 text-left">Action</th></tr>
        </thead>
        <tbody>
          {#each deliveries as d (d.id)}
            <tr class="border-t border-surface-border">
              <td class="px-3 py-2">{d.employeeName || d.phone}<div class="text-[11px] font-mono text-ink-muted">{d.phone}</div></td>
              <td class="px-3 py-2">{d.videoTitle}{#if d.videoUrl}<a href={d.videoUrl} target="_blank" rel="noopener" class="block text-[11px] text-accent hover:underline truncate max-w-[220px]">{d.videoUrl}</a>{/if}</td>
              <td class="px-3 py-2">{d.moduleNumber || '—'}</td>
              <td class="px-3 py-2 font-mono text-xs">{new Date(d.deliveredAt).toLocaleString()}</td>
              <td class="px-3 py-2"><span class="px-2 py-0.5 text-xs rounded {d.status === 'completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}">{d.status}</span></td>
              <td class="px-3 py-2">
                {#if d.status !== 'completed'}
                  <button onclick={() => complete(d.id)} class="text-xs text-success hover:underline">Mark Complete</button>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      {#if deliveries.length === 0}<p class="px-3 py-4 text-sm text-ink-muted">No deliveries yet.</p>{/if}
    </div>
  {:else if tab === 'config'}
    <div class="max-w-3xl space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-ink">Reminder Configuration</h3>
        <label class="flex items-center gap-2 text-sm"><input type="checkbox" bind:checked={config.enabled} /> Enable Reminders</label>
      </div>
      <div class="flex items-center gap-4 flex-wrap">
        <label class="text-sm text-ink-secondary">Max Reminders
          <input type="number" bind:value={config.maxReminders} min="1" class="ml-2 w-20 px-3 py-2 border border-surface-border rounded text-sm" />
        </label>
        <label class="text-sm text-ink-secondary">Apply To
          <select bind:value={config.applyTo} class="ml-2 px-3 py-2 border rounded text-sm">
            <option value="all">All videos</option>
            <option value="module">Individual module override</option>
          </select>
        </label>
      </div>

      <div class="space-y-3">
        {#each config.reminders as r, i (r.id)}
          <div class="bg-white border border-surface-border rounded p-4 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-semibold text-ink">Reminder {i + 1} <span class="text-xs text-ink-muted font-normal">— {minsLabel(r.triggerMinutes)} after delivery</span></span>
              <div class="flex items-center gap-1">
                <button onclick={() => move(i, -1)} class="px-2 py-1 text-xs border rounded hover:bg-surface-hover">↑</button>
                <button onclick={() => move(i, 1)} class="px-2 py-1 text-xs border rounded hover:bg-surface-hover">↓</button>
                <label class="flex items-center gap-1 text-xs"><input type="checkbox" bind:checked={r.enabled} /> Active</label>
                <button onclick={() => removeReminder(i)} class="px-2 py-1 text-xs text-danger border border-danger/30 rounded hover:bg-danger/10">Delete</button>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-xs text-ink-secondary">Trigger (minutes)</label>
              <input type="number" bind:value={r.triggerMinutes} min="1" class="w-24 px-3 py-2 border border-surface-border rounded text-sm" />
              <span class="text-xs text-ink-muted">({minsLabel(r.triggerMinutes)})</span>
            </div>
            <label class="block text-xs text-ink-secondary">Message — variables: {'{name}'}, {'{video}'}, {'{module}'}, {'{reminderNumber}'}
              <textarea bind:value={r.message} rows="2" class="w-full mt-1 px-3 py-2 border border-surface-border rounded text-sm"></textarea>
            </label>
          </div>
        {/each}
      </div>

      <div class="flex gap-2">
        <button onclick={addReminder} class="px-4 py-2 text-sm border border-accent text-accent rounded hover:bg-accent/10">+ Add Reminder</button>
        <button onclick={save} class="px-4 py-2 text-sm font-medium bg-accent text-white rounded hover:bg-accent-hover">Save Configuration</button>
      </div>
    </div>
  {:else}
    <div class="bg-white border border-surface-border rounded overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-surface">
          <tr>
            <th class="px-3 py-2 text-left">Employee</th>
            <th class="px-3 py-2 text-left">Video</th>
            <th class="px-3 py-2 text-left">Delivery Time</th>
            <th class="px-3 py-2 text-left">Scheduled</th>
            <th class="px-3 py-2 text-left">Sent</th>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Status</th>
            <th class="px-3 py-2 text-left">Completion</th>
            <th class="px-3 py-2 text-left">Next</th>
          </tr>
        </thead>
        <tbody>
          {#each history as h (h.employeeId + h.scheduledReminderTime + h.reminderNumber)}
            <tr class="border-t border-surface-border">
              <td class="px-3 py-2">{h.employeeName}<div class="text-[11px] font-mono text-ink-muted">{h.employeeId}</div></td>
              <td class="px-3 py-2">{h.videoTitle}</td>
              <td class="px-3 py-2 font-mono text-xs">{h.videoDeliveryTime ? new Date(h.videoDeliveryTime).toLocaleString() : '—'}</td>
              <td class="px-3 py-2 font-mono text-xs">{h.scheduledReminderTime ? new Date(h.scheduledReminderTime).toLocaleString() : '—'}</td>
              <td class="px-3 py-2 font-mono text-xs">{h.actualReminderSentTime ? new Date(h.actualReminderSentTime).toLocaleString() : '—'}</td>
              <td class="px-3 py-2">{h.reminderNumber}</td>
              <td class="px-3 py-2">
                <span class="px-2 py-0.5 text-xs rounded {h.deliveryStatus === 'Sent' || h.deliveryStatus === 'Delivered' ? 'bg-success/10 text-success' : h.deliveryStatus === 'Failed' ? 'bg-danger/10 text-danger' : h.deliveryStatus === 'Cancelled' ? 'bg-ink/5 text-ink-muted' : 'bg-warning/10 text-warning'}">{h.deliveryStatus}</span>
              </td>
              <td class="px-3 py-2">{h.completionStatus}</td>
              <td class="px-3 py-2 font-mono text-xs">{h.nextScheduledReminder ? new Date(h.nextScheduledReminder).toLocaleString() : '—'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      {#if history.length === 0}<p class="px-3 py-4 text-sm text-ink-muted">No reminders scheduled yet. Add a video delivery to start.</p>{/if}
    </div>
  {/if}
</div>

{#if toast}
  <div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white {toast.type === 'success' ? 'bg-success' : 'bg-danger'}">{toast.message}</div>
{/if}

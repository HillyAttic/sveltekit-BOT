<script lang="ts">
  import { onMount } from 'svelte'
  import { listData, createData } from '#lib/admin-data'
  import {
    MESSAGE_DEFS,
    MESSAGE_GROUPS,
    DEFAULT_MESSAGES,
    isBotInsertion,
    type BotInsertion,
  } from '#lib/bot-messages'

  // Every reply the bot sends, from the first Hi to the certificate.
  let values = $state<Record<string, string>>({ ...DEFAULT_MESSAGES })
  // Extra admin-added messages, delivered alongside their anchor message.
  let insertions = $state<BotInsertion[]>([])
  let loading = $state(true)
  let saving = $state(false)
  let toast = $state<string | null>(null)

  function showToast(m: string) {
    toast = m
    setTimeout(() => (toast = null), 2500)
  }

  onMount(async () => {
    try {
      const rows = await listData<{ id: string } & Record<string, unknown>>('config')
      const saved = rows.find((r) => r.id === 'botMessages')
      if (saved) {
        for (const def of MESSAGE_DEFS) {
          const v = saved[def.key]
          if (typeof v === 'string' && v.trim()) values[def.key] = v
        }
        if (Array.isArray(saved.insertions)) insertions = saved.insertions.filter(isBotInsertion)
      }
    } catch {
      showToast('Failed to load messages')
    } finally {
      loading = false
    }
  })

  const grouped = $derived(
    MESSAGE_GROUPS.map((group) => ({
      group,
      items: MESSAGE_DEFS.filter((d) => d.group === group),
    }))
  )

  async function save() {
    saving = true
    try {
      await createData('config', { id: 'botMessages', ...values, insertions })
      showToast('Saved — the bot now uses this copy')
    } catch {
      showToast('Save failed')
    } finally {
      saving = false
    }
  }

  function resetOne(key: string) {
    values[key] = DEFAULT_MESSAGES[key]
  }

  function resetAll() {
    if (!confirm('Reset every message (including added messages) to the default copy?')) return
    values = { ...DEFAULT_MESSAGES }
    insertions = []
  }

  function insertionsFor(key: string, position: 'before' | 'after') {
    return insertions.filter((i) => i.anchorKey === key && i.position === position)
  }

  function addInsertion(anchorKey: string, position: 'before' | 'after') {
    insertions.push({
      id: crypto.randomUUID?.() ?? String(Date.now()),
      anchorKey,
      position,
      text: '',
    })
  }

  function removeInsertion(id: string) {
    insertions = insertions.filter((i) => i.id !== id)
  }

  const rows = (text: string) => Math.min(14, Math.max(3, text.split('\n').length + 1))
</script>

<div class="p-6 pb-24">
  <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
    <div>
      <h2 class="text-xl font-semibold text-ink">Bot Messages</h2>
      <p class="text-xs text-ink-muted">
        Edit every reply in the Hi → registration → videos → assessment → certificate flow.
        Blank or missing messages fall back to the default copy.
      </p>
      <p class="text-xs text-ink-muted mt-1">
        Use “+ Above” / “+ Below” on any step to add an extra message at that point in the flow.
      </p>
    </div>
    <div class="flex items-center gap-2">
      <button onclick={resetAll} class="px-3 py-2 text-sm border border-surface-border rounded text-ink-secondary hover:bg-surface-hover">
        Reset all
      </button>
      <button
        onclick={save}
        disabled={saving || loading}
        class="px-4 py-2 text-sm font-medium bg-accent text-white rounded disabled:opacity-50"
      >{saving ? 'Saving…' : 'Save all'}</button>
    </div>
  </div>

  {#if loading}
    <p class="text-ink-muted text-sm">Loading…</p>
  {:else}
    <div class="space-y-6">
      {#each grouped as { group, items } (group)}
        <section class="bg-white border border-surface-border rounded">
          <h3 class="px-4 py-3 border-b border-surface-border font-semibold text-sm text-ink">{group}</h3>
          <div class="divide-y divide-surface-border">
            {#each items as def (def.key)}
              {#each insertionsFor(def.key, 'before') as ins (ins.id)}
                <div class="px-4 py-3 bg-accent-light/40 space-y-2">
                  <div class="flex items-center justify-between gap-3">
                    <span class="text-[11px] font-medium text-accent">
                      Added message — sent before “{def.label}”
                    </span>
                    <button onclick={() => removeInsertion(ins.id)} class="text-[11px] text-red-600 hover:underline shrink-0">
                      Delete
                    </button>
                  </div>
                  <textarea
                    bind:value={ins.text}
                    rows={rows(ins.text)}
                    placeholder="Type the extra message…"
                    class="w-full px-3 py-2 border border-surface-border rounded text-[13px] font-mono leading-relaxed bg-white"
                  ></textarea>
                  {#if def.placeholders?.length}
                    <p class="text-[11px] text-ink-muted">
                      You can use:
                      {#each def.placeholders as p, i (p)}<code class="font-mono">{`{${p}}`}</code>{i < def.placeholders.length - 1 ? ', ' : ''}{/each}
                    </p>
                  {/if}
                </div>
              {/each}

              <div class="px-4 py-4 space-y-2">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <label for={def.key} class="text-xs font-medium text-ink">{def.label}</label>
                    {#if def.placeholders?.length}
                      <p class="mt-1 text-[11px] text-ink-muted">
                        Placeholders:
                        {#each def.placeholders as p, i (p)}<code class="font-mono">{`{${p}}`}</code>{i < def.placeholders.length - 1 ? ', ' : ''}{/each}
                      </p>
                    {/if}
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    {#if def.insertable !== false}
                      <button
                        onclick={() => addInsertion(def.key, 'before')}
                        class="text-[11px] text-accent hover:underline"
                        title="Add an extra message sent just before this one"
                      >+ Above</button>
                      <button
                        onclick={() => addInsertion(def.key, 'after')}
                        class="text-[11px] text-accent hover:underline"
                        title="Add an extra message sent just after this one"
                      >+ Below</button>
                    {/if}
                    <button
                      onclick={() => resetOne(def.key)}
                      class="text-[11px] text-ink-muted hover:text-accent hover:underline"
                    >Reset</button>
                  </div>
                </div>
                <textarea
                  id={def.key}
                  bind:value={values[def.key]}
                  rows={rows(values[def.key] ?? '')}
                  class="w-full px-3 py-2 border border-surface-border rounded text-[13px] font-mono leading-relaxed"
                ></textarea>
              </div>

              {#each insertionsFor(def.key, 'after') as ins (ins.id)}
                <div class="px-4 py-3 bg-accent-light/40 space-y-2">
                  <div class="flex items-center justify-between gap-3">
                    <span class="text-[11px] font-medium text-accent">
                      Added message — sent after “{def.label}”
                    </span>
                    <button onclick={() => removeInsertion(ins.id)} class="text-[11px] text-red-600 hover:underline shrink-0">
                      Delete
                    </button>
                  </div>
                  <textarea
                    bind:value={ins.text}
                    rows={rows(ins.text)}
                    placeholder="Type the extra message…"
                    class="w-full px-3 py-2 border border-surface-border rounded text-[13px] font-mono leading-relaxed bg-white"
                  ></textarea>
                  {#if def.placeholders?.length}
                    <p class="text-[11px] text-ink-muted">
                      You can use:
                      {#each def.placeholders as p, i (p)}<code class="font-mono">{`{${p}}`}</code>{i < def.placeholders.length - 1 ? ', ' : ''}{/each}
                    </p>
                  {/if}
                </div>
              {/each}
            {/each}
          </div>
        </section>
      {/each}
    </div>
  {/if}

  {#if toast}<div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">{toast}</div>{/if}
</div>

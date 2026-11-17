<script lang="ts">
  import { normalizePhone } from '#lib/phone'

  interface ClientRecord {
    id: string
    name: string
    phones: string[]
    gstNumber?: string
  }

  let {
    initial,
    onSubmit,
    onCancel,
    loading = false,
  }: {
    initial?: ClientRecord
    onSubmit: (data: { name: string; phones: string[]; gstNumber?: string }) => void
    onCancel: () => void
    loading?: boolean
  } = $props()

  let name = $state(initial?.name || '')
  let phones = $state<string[]>(initial?.phones?.length ? initial.phones : [''])
  let gstNumber = $state(initial?.gstNumber || '')
  let errors = $state<{ name?: string; phones?: string[]; gstNumber?: string }>({})

  function handlePhoneChange(index: number, value: string) {
    let processedValue = value.trim()

    if (processedValue.startsWith('+')) {
      processedValue = processedValue.substring(1)
    }

    if (/^\d{10}$/.test(processedValue)) {
      processedValue = '91' + processedValue
    }

    phones[index] = processedValue
  }

  function addPhoneField() {
    if (phones.length < 5) phones = [...phones, '']
  }

  function removePhoneField(index: number) {
    if (phones.length > 1) phones = phones.filter((_, i) => i !== index)
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    const nextErrors: typeof errors = {}
    if (!name.trim()) nextErrors.name = 'Name is required.'

    const phoneErrors: string[] = []
    const seenPhones = new Set<string>()
    let filledCount = 0

    phones.forEach((phone, index) => {
      const trimmed = phone.trim()
      if (!trimmed) return
      filledCount++

      if (!trimmed.startsWith('91')) {
        phoneErrors[index] = 'Phone number must include country code (start with 91)'
      } else if (trimmed.length !== 12) {
        phoneErrors[index] = 'Phone number must be exactly 12 digits (91 + 10 digits)'
      } else if (seenPhones.has(trimmed)) {
        phoneErrors[index] = 'This phone number is already added'
      } else {
        seenPhones.add(trimmed)
      }
    })

    if (filledCount === 0) {
      nextErrors.phones = ['At least one phone number is required']
    } else if (phoneErrors.length > 0) {
      nextErrors.phones = phoneErrors
    }

    if (gstNumber.trim()) {
      const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
      if (gstNumber.trim().length !== 15) {
        nextErrors.gstNumber = 'GST number must be exactly 15 characters'
      } else if (!gstPattern.test(gstNumber.trim().toUpperCase())) {
        nextErrors.gstNumber = 'Invalid GST format (e.g., 22AAAAA0000A1Z5)'
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      errors = nextErrors
      return
    }

    onSubmit({
      name: name.trim(),
      phones: phones.filter((p) => p.trim()).map((p) => normalizePhone(p)),
      gstNumber: gstNumber.trim().toUpperCase() || undefined,
    })
  }
</script>

<form onsubmit={handleSubmit} class="space-y-5">
  <div>
    <label for="client-name" class="eyebrow block mb-2">Full Name</label>
    <input
      type="text"
      id="client-name"
      bind:value={name}
      placeholder="Enter client name"
      class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent transition-all"
    />
    {#if errors.name}<p class="text-danger text-xs mt-1.5 font-medium">{errors.name}</p>{/if}
  </div>

  <div>
    <span class="eyebrow block mb-2">Phone Numbers</span>
    <div class="space-y-3">
      {#each phones as phone, index (index)}
        <div class="flex gap-2">
          <div class="flex-1">
            <input
              type="text"
              value={phone}
              oninput={(e) => handlePhoneChange(index, e.currentTarget.value)}
              placeholder="919823860000 or 9823860000"
              class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent transition-all font-mono"
            />
            {#if errors.phones?.[index] && errors.phones[index] !== 'At least one phone number is required'}
              <p class="text-danger text-xs mt-1.5 font-medium">{errors.phones[index]}</p>
            {/if}
          </div>
          {#if phones.length > 1}
            <button
              type="button"
              onclick={() => removePhoneField(index)}
              class="px-3 py-3 text-danger hover:bg-danger/10 border-2 border-ink/10 hover:border-danger/30 rounded-none transition-colors"
              title="Remove phone number"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          {/if}
        </div>
      {/each}
    </div>
    {#if phones.length < 5}
      <button
        type="button"
        onclick={addPhoneField}
        class="mt-3 px-4 py-2 text-xs font-medium text-accent hover:text-accent-hover border border-accent/30 hover:border-accent rounded-none transition-colors flex items-center gap-2"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Phone Number
      </button>
    {/if}
    {#if errors.phones?.[0] === 'At least one phone number is required'}
      <p class="text-danger text-xs mt-1.5 font-medium">{errors.phones[0]}</p>
    {/if}
  </div>

  <div>
    <label for="client-gst" class="eyebrow block mb-2">GST Number (Optional)</label>
    <input
      type="text"
      id="client-gst"
      value={gstNumber}
      oninput={(e) => (gstNumber = e.currentTarget.value.toUpperCase())}
      placeholder="22AAAAA0000A1Z5"
      maxlength={15}
      class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent transition-all font-mono uppercase"
    />
    {#if errors.gstNumber}<p class="text-danger text-xs mt-1.5 font-medium">{errors.gstNumber}</p>{/if}
    <p class="text-ink-muted text-xs mt-1.5">Format: 2-digit state + 10-char PAN + entity + Z + check digit</p>
  </div>

  <div class="flex justify-end gap-3 pt-3 border-t border-ink/5">
    <button
      type="button"
      onclick={onCancel}
      disabled={loading}
      class="px-5 py-2.5 text-sm font-medium text-ink-secondary hover:text-ink rounded-none hover:bg-surface-hover transition-colors border border-ink/10 hover:border-ink/20 disabled:opacity-50"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={loading}
      class="px-6 py-2.5 text-sm font-bold uppercase tracking-wider bg-accent text-white rounded-none hover:bg-accent-hover transition-colors shadow-bold hover:shadow-glow-accent disabled:opacity-70 flex items-center gap-2 border-2 border-transparent"
    >
      {#if loading}
        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {initial ? 'Updating...' : 'Creating...'}
      {:else}
        {initial ? 'Update' : 'Create'}
      {/if}
    </button>
  </div>
</form>

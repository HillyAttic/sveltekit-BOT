<svelte:head>
  <title>Data Deletion | JPCO WhatsApp Bot</title>
</svelte:head>

<div class="min-h-screen bg-surface relative overflow-hidden">
  <div class="fixed top-10 left-10 w-64 h-64 bg-danger/5 rotate-12 pointer-events-none"></div>
  <div class="fixed bottom-0 right-10 w-72 h-72 bg-accent/5 -rotate-6 pointer-events-none"></div>

  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
    <div class="mb-12 animate-slide-up">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-1.5 h-8 bg-danger"></div>
        <span class="eyebrow text-danger">Privacy</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-display font-bold text-ink tracking-tight leading-none mb-3">
        Data <span class="text-danger">Deletion</span> Instructions
      </h1>
      <p class="text-base text-ink-secondary leading-relaxed mt-4 max-w-lg">
        We respect your privacy and your right to control your personal data.
        If you wish to delete your data from our WhatsApp chatbot service, please follow the instructions below.
      </p>
    </div>

    <div class="bg-white border-2 border-ink/8 shadow-card p-8 md:p-10 space-y-10 animate-slide-up" style="animation-delay: 100ms">
      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-danger"></div>
          <h2 class="text-xl font-display font-bold text-ink">What Data Will Be Deleted</h2>
        </div>
        <p class="text-ink-secondary mb-3">When you request data deletion, we will remove:</p>
        <div class="space-y-2">
          {#each [
            'Your phone number and WhatsApp profile information',
            'All messages and conversation history',
            'Documents and files you have submitted',
            'Any personal information associated with your account',
          ] as item, i (i)}
            <div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-danger/30">
              <span class="text-danger font-bold text-sm leading-none mt-0.5">&#8226;</span>
              <span class="text-sm text-ink-secondary">{item}</span>
            </div>
          {/each}
        </div>
      </section>

      <section>
        <div class="flex items-center gap-2 mb-6">
          <div class="w-1 h-6 bg-accent"></div>
          <h2 class="text-xl font-display font-bold text-ink">How to Request Data Deletion</h2>
        </div>

        <div class="border-2 border-accent/20 bg-accent/5 p-5 relative">
          <div class="absolute top-0 left-0 w-2 h-full bg-accent"></div>
          <p class="eyebrow text-accent mb-2">Option 1: Via WhatsApp</p>
          <p class="text-ink-secondary text-sm">
            Send a message to our WhatsApp chatbot with the text:{' '}
            <span class="font-mono bg-accent/10 text-accent px-2 py-1 border border-accent/20">"Delete my data"</span>{' '}
            or{' '}
            <span class="font-mono bg-accent/10 text-accent px-2 py-1 border border-accent/20">"Remove my information"</span>
          </p>
        </div>

        <div class="border-2 border-teal/20 bg-teal/5 p-5 mt-4 relative">
          <div class="absolute top-0 left-0 w-2 h-full bg-teal"></div>
          <p class="eyebrow text-teal mb-2">Option 2: Via Email</p>
          <p class="text-ink-secondary text-sm">
            Send an email to{' '}
            <span class="font-mono bg-teal/10 text-teal px-2 py-1 border border-teal/20">[email]</span>{' '}
            with the subject{' '}
            <span class="font-mono bg-teal/10 text-teal px-2 py-1 border border-teal/20">"Data Deletion Request"</span>{' '}
            and include your WhatsApp phone number in the message.
          </p>
        </div>
      </section>

      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-teal"></div>
          <h2 class="text-xl font-display font-bold text-ink">Processing Time</h2>
        </div>
        <p class="text-ink-secondary leading-relaxed">
          We will process your data deletion request within 30 days. You will receive a confirmation
          once your data has been successfully deleted from our systems.
        </p>
      </section>

      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-accent"></div>
          <h2 class="text-xl font-display font-bold text-ink">Data Retention Exceptions</h2>
        </div>
        <p class="text-ink-secondary mb-3">
          Please note that we may retain certain information if required by law or for legitimate business purposes, such as:
        </p>
        <div class="space-y-2">
          {#each [
            'Legal compliance and regulatory requirements',
            'Fraud prevention and security purposes',
            'Resolving disputes or enforcing agreements',
          ] as item, i (i)}
            <div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-accent/30">
              <span class="text-accent font-bold text-sm leading-none mt-0.5">&#8226;</span>
              <span class="text-sm text-ink-secondary">{item}</span>
            </div>
          {/each}
        </div>
      </section>

      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-accent"></div>
          <h2 class="text-xl font-display font-bold text-ink">Questions?</h2>
        </div>
        <p class="text-ink-secondary leading-relaxed">
          If you have any questions about data deletion or need assistance, please contact us
          through our WhatsApp chatbot or email us at{' '}
          <span class="font-mono bg-surface px-1.5 py-0.5 border border-ink/10 text-ink">[email]</span>.
        </p>
      </section>

      <section class="pt-6 border-t-2 border-ink/8">
        <p class="text-sm text-ink-muted">
          For more information about how we handle your data, please review our{' '}
          <a href="/privacy" class="text-accent hover:text-accent-hover font-medium border-b border-accent/30 hover:border-accent/60 transition-colors">Privacy Policy</a>.
        </p>
      </section>
    </div>

    <p class="text-center text-[11px] text-ink-muted mt-10">
      JPCO &copy; {new Date().getFullYear()} — All rights reserved
    </p>
  </div>
</div>

<svelte:head>
  <title>Privacy Policy | JPCO WhatsApp Bot</title>
</svelte:head>

<div class="min-h-screen bg-surface relative overflow-hidden">
  <div class="fixed top-20 right-0 w-72 h-72 bg-accent/5 rotate-12 pointer-events-none"></div>
  <div class="fixed bottom-0 left-10 w-40 h-40 bg-teal/5 -rotate-12 pointer-events-none"></div>

  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
    <div class="mb-12 animate-slide-up">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-1.5 h-8 bg-accent"></div>
        <span class="eyebrow">Legal</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-display font-bold text-ink tracking-tight leading-none mb-3">
        Privacy <span class="text-accent">Policy</span>
      </h1>
      <p class="text-sm text-ink-muted font-mono">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>

    <div class="bg-white border-2 border-ink/8 shadow-card p-8 md:p-10 space-y-10 animate-slide-up" style="animation-delay: 100ms">
      <section>
        <p class="text-ink-secondary leading-relaxed">
          This Privacy Policy describes how we collect, use, and protect your personal information when you use our WhatsApp chatbot service operated by JPCO.
        </p>
      </section>

      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-accent"></div>
          <h2 class="text-xl font-display font-bold text-ink">Information We Collect</h2>
        </div>
        <p class="text-ink-secondary mb-3">We collect the following types of information:</p>
        <div class="space-y-2">
          {#each [
            'Phone number and WhatsApp profile information',
            'Messages and interactions with our chatbot',
            'Documents and files you share with us',
            'Usage data and interaction patterns',
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
          <div class="w-1 h-6 bg-teal"></div>
          <h2 class="text-xl font-display font-bold text-ink">How We Use Your Information</h2>
        </div>
        <p class="text-ink-secondary mb-3">We use your information to:</p>
        <div class="space-y-2">
          {#each [
            'Provide and improve our chatbot services',
            'Process and manage document submissions',
            'Communicate with you about your requests',
            'Ensure security and prevent fraud',
            'Comply with legal obligations',
          ] as item, i (i)}
            <div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-teal/30">
              <span class="text-teal font-bold text-sm leading-none mt-0.5">&#8226;</span>
              <span class="text-sm text-ink-secondary">{item}</span>
            </div>
          {/each}
        </div>
      </section>

      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-success"></div>
          <h2 class="text-xl font-display font-bold text-ink">Data Storage and Security</h2>
        </div>
        <p class="text-ink-secondary leading-relaxed">
          We store your data securely using industry-standard encryption and security practices.
          Your documents are stored in secure cloud storage with access controls and encryption at rest and in transit.
        </p>
      </section>

      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-accent"></div>
          <h2 class="text-xl font-display font-bold text-ink">Data Sharing</h2>
        </div>
        <p class="text-ink-secondary mb-3">We do not sell your personal information. We may share your data with:</p>
        <div class="space-y-2">
          {#each [
            'Service providers who help us operate our platform',
            'Legal authorities when required by law',
            'Third parties with your explicit consent',
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
          <div class="w-1 h-6 bg-[#7048e8]"></div>
          <h2 class="text-xl font-display font-bold text-ink">Your Rights</h2>
        </div>
        <p class="text-ink-secondary mb-3">You have the right to:</p>
        <div class="space-y-2">
          {#each [
            'Access your personal data',
            'Request correction of inaccurate data',
            'Request deletion of your data',
            'Opt-out of communications',
            'Export your data',
          ] as item, i (i)}
            <div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-[#7048e8]/30">
              <span class="text-[#7048e8] font-bold text-sm leading-none mt-0.5">&#8226;</span>
              <span class="text-sm text-ink-secondary">{item}</span>
            </div>
          {/each}
        </div>
      </section>

      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-accent"></div>
          <h2 class="text-xl font-display font-bold text-ink">Data Retention</h2>
        </div>
        <p class="text-ink-secondary leading-relaxed">
          We retain your personal information for as long as necessary to provide our services
          and comply with legal obligations. You may request deletion of your data at any time.
        </p>
      </section>

      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-teal"></div>
          <h2 class="text-xl font-display font-bold text-ink">Contact Us</h2>
        </div>
        <p class="text-ink-secondary leading-relaxed">
          If you have questions about this Privacy Policy or wish to exercise your rights,
          please contact us through our WhatsApp chatbot or email us at <span class="font-mono text-ink bg-surface px-1.5 py-0.5 border border-ink/10">[email]</span>.
        </p>
      </section>
    </div>

    <p class="text-center text-[11px] text-ink-muted mt-10">
      JPCO &copy; {new Date().getFullYear()} — All rights reserved
    </p>
  </div>
</div>

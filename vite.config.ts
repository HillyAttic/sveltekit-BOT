import adapter from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { withPwa } from '@vite-pwa/sveltekit'
import { defineConfig } from 'vite'
import type { Adapter } from '@sveltejs/kit'
import { readFileSync, writeFileSync } from 'node:fs'

// adapter-cloudflare's worker exports a `default` handler object with only
// `fetch`. Workers ignore named `scheduled` exports when a default export object
// exists, so the `* * * * *` cron in wrangler.jsonc died every tick with
// "Handler does not export a scheduled() function". Rename that object and
// re-export it with both handlers.
const WORKER = '.svelte-kit/cloudflare/_worker.js' // must match `main` in wrangler.jsonc
const DEFAULT_EXPORT = 'export default {'
const RENAMED = 'const __sveltekit_worker = {'
const HANDLER = `
// cron: scheduled handler
export default {
	fetch: __sveltekit_worker.fetch.bind(__sveltekit_worker),
	async scheduled(event, env, ctx) {
		console.log('cron: scheduled fired', new Date().toISOString());
		if (!env.CRON_SECRET) {
			console.error('CRON_SECRET is not set — run: npx wrangler secret put CRON_SECRET');
			return;
		}
		await initialized;
		// Deliberately not touching module-level \`origin\` (only used for asset reads).
		const url = new URL('/api/cron/reminders', 'https://cron.internal');
		url.searchParams.set('secret', env.CRON_SECRET);
		try {
			const res = await server.respond(new Request(url), {
				getClientAddress: () => '127.0.0.1'
			});
			console.log('cron: reminders route responded', res.status);
			if (!res.ok) console.error('cron run failed:', res.status, await res.text());
		} catch (error) {
			console.error('cron run failed:', error);
			throw error;
		}
	}
};
`

/** Patch the worker the moment the adapter has written it — no build-lifecycle races. */
function withCronHandler(base: Adapter): Adapter {
  return {
    ...base,
    async adapt(builder) {
      await base.adapt(builder)
      const src = readFileSync(WORKER, 'utf8')
      if (src.includes(RENAMED)) return
      // Shares module scope with the adapter template; fail loudly if that changes.
      if (
        src.split(DEFAULT_EXPORT).length !== 2 ||
        !src.includes('const initialized = server.init(') ||
        !src.includes('server.respond(')
      ) {
        throw new Error(
          'adapter-cloudflare worker template changed; update the scheduled handler in vite.config.ts'
        )
      }
      writeFileSync(WORKER, src.replace(DEFAULT_EXPORT, RENAMED) + HANDLER)
    },
  }
}

export default defineConfig({
  plugins: [
    withPwa(
      {
        preprocess: vitePreprocess(),
        adapter: withCronHandler(adapter()),
      },
      {
        registerType: 'autoUpdate',
        injectRegister: false,
        manifest: {
          name: 'JPCO WhatsApp Bot Admin Panel',
          short_name: 'JPCO Admin',
          description: 'Admin panel for WhatsApp document retrieval system',
          start_url: '/',
          display: 'standalone',
          background_color: '#0f172a',
          theme_color: '#7c3aed',
          icons: [
            { src: '/registration_karo_logo.png', sizes: '192x192', type: 'image/png' },
            { src: '/registration_karo_logo.png', sizes: '512x512', type: 'image/png' },
          ],
        },
        generateSW: {
          navigateFallback: null,
          // No prerendered pages in this app; don't fail on the default pattern.
          globStrict: false,
          // API routes must always hit the network, never the cache.
          runtimeCaching: [{ urlPattern: /\/api\//, handler: 'NetworkOnly' }],
        },
      }
    ),
  ],
})

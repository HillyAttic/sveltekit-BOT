/**
 * adapter-cloudflare's generated worker exports only `fetch`, so a Wrangler cron
 * trigger would have nothing to run. Append a `scheduled` handler that calls the
 * app's cron endpoint (certificate delivery + reminders) through SvelteKit.
 *
 * Runs as npm `postbuild`. Also needs `triggers.crons` in wrangler.jsonc and a
 * CRON_SECRET secret (`npx wrangler secret put CRON_SECRET`).
 */
import fs from 'node:fs'

const file = '.svelte-kit/cloudflare/_worker.js'
const MARK = '// cron: scheduled handler'

let src = fs.readFileSync(file, 'utf8')
if (src.includes(MARK)) process.exit(0)

// This handler shares module scope with the template; fail loudly if that changes.
for (const required of ['const initialized = server.init(', 'server.respond(']) {
  if (!src.includes(required)) {
    throw new Error(`adapter-cloudflare worker template changed (missing ${required}); update scripts/add-scheduled-handler.mjs`)
  }
}

src += `
${MARK}
export async function scheduled(event, env, ctx) {
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
`
fs.writeFileSync(file, src)

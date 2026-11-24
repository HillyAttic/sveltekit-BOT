# JPCO WhatsApp Bot — SvelteKit port

SvelteKit + Svelte 5 (runes) version of the Next.js project in the parent folder.
The original app is untouched; this folder is self-contained.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run check    # svelte-check + TS
npm run test     # vitest
npm run build
```

Copy `.env.example` to `.env.local` and fill it in.

Kit 3 no longer copies `.env` files into `process.env`, so `dev` and `preview` run Node with `--env-file-if-exists=.env --env-file-if-exists=.env.local`. On Vercel the platform supplies `process.env` directly.

## Cloudflare deploy

```bash
npm run build && npx wrangler deploy
npx wrangler secret put CRON_SECRET   # once — cron endpoint auth
```

`vite.config.ts` wraps the Cloudflare adapter and appends a `scheduled` handler to
the worker it writes (the adapter only exports `fetch` by default), so the
every-minute `triggers.crons` in `wrangler.jsonc` runs `/api/cron/reminders` — due
certificate PDFs and reminders are sent from there. Deploying without this handler
makes every cron tick fail with "Handler does not export a scheduled() function".

## Structure

| Next.js | SvelteKit |
| --- | --- |
| `app/layout.tsx` | `src/routes/+layout.svelte` |
| `app/page.tsx` | `src/routes/+page.svelte` |
| `app/admin/page.tsx` | `src/routes/admin/+page.svelte` |
| `app/admin/reports/page.tsx` | `src/routes/admin/reports/+page.svelte` |
| `app/api/**/route.ts` | `src/routes/api/**/+server.ts` |
| `middleware.ts` | `src/hooks.server.ts` |
| `contexts/AuthContext.tsx` | `src/lib/auth.svelte.ts` |
| `components/**` | `src/lib/components/**` |
| `lib/**` | `src/lib/**` |

## Notes

- Kit 3 removed the implicit `$lib` alias. This port uses a subpath import
  (`#lib/*` → `src/lib/*`, declared in `package.json`), mirrored in `tsconfig.json`
  for type-checking and `vitest.config.ts` for tests.
- Deployment target is Vercel (`@sveltejs/adapter-vercel`), matching the Next.js app.
- Auth is the same HMAC token in `localStorage` and the `auth_token` cookie;
  `hooks.server.ts` guards `/admin` server-side, and `AdminGuard` guards client-side.
- The webhook returns 200 before processing and uses `platform.context.waitUntil`
  when the adapter provides it (Vercel/Cloudflare).
- `/api/admin/debug` and `/api/admin/debug-documents` now require an admin token;
  the debug payload no longer echoes key material.
- API routes keep the same paths, request bodies and Bearer-token auth as the Next.js app,
  so the existing frontend contract is unchanged.
- `waitUntil` is taken from `event.platform` when present, then `@vercel/functions`,
  so the webhook can acknowledge WhatsApp before the bot finishes replying.
- Not ported: `app/home-old.tsx` (dead duplicate), `lib/simple-storage.ts` and the
  empty `/api/files/[...path]` route (unused legacy), `scripts/gen_admin.py`.

import adapter from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { withPwa } from '@vite-pwa/sveltekit'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    withPwa(
      {
        preprocess: vitePreprocess(),
        adapter: adapter(),
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

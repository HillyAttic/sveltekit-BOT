import { videoWatchPath } from './video-upload'

const FALLBACK_SITE = 'https://sveltekit-bot.websculptorsofficial.workers.dev'

/**
 * Absolute link for WhatsApp. Storage videos and app-relative links resolve to
 * the player page, so no direct file URL (which always offers Download) is
 * ever handed out. External links (YouTube, SharePoint…) pass through.
 */
export function videoWatchUrl(link?: string): string {
  if (!link) return ''
  if (link.startsWith('//')) return link
  const base = (process.env.SITE_URL || FALLBACK_SITE).replace(/\/+$/, '')
  const watch = videoWatchPath(link)
  if (watch) return base + watch
  return link.startsWith('/') ? base + link : link
}

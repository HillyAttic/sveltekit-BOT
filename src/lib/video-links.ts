import { storagePathFromLink } from './video-upload'

const FALLBACK_SITE = 'https://sveltekit-bot.websculptorsofficial.workers.dev'

/**
 * What employees receive. Storage videos become the in-app player page, so no
 * direct file URL (which always offers Download) is ever handed out. External
 * links (YouTube, SharePoint…) pass through untouched.
 */
export function videoWatchUrl(link?: string): string {
  if (!link) return ''
  const path = storagePathFromLink(link)
  if (!path) return link
  const base = (process.env.SITE_URL || FALLBACK_SITE).replace(/\/+$/, '')
  return `${base}/watch/${path.split('/').map(encodeURIComponent).join('/')}`
}

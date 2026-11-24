import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { generateSignedUrl } from '#lib/storage-service'

// Employee-facing player. The raw file URL is minted here, server-side, and
// never sent to anyone but the viewer of this page.
export const load: PageServerLoad = async ({ params }) => {
  if (!params.path?.startsWith('learning-videos/')) throw error(404, 'Not found')
  const fileName = params.path.slice(params.path.lastIndexOf('/') + 1)
  return {
    title: fileName.replace(/\.[^.]+$/, '') || 'Learning video',
    // Long enough for a full sitting; the page re-mints on reload.
    src: await generateSignedUrl(params.path, 6 * 60 * 60 * 1000),
  }
}

/**
 * Admin video upload: browser PUTs the file straight to a signed Firebase
 * Storage URL (no big body through the Worker). The stored link is the app's
 * player page, never the raw file (which always offers Download).
 */

export function videoStoragePath(fileName: string, now = Date.now()): string {
  const safe = fileName
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '_')
    .replace(/^[._]+/, '')
  return `learning-videos/${now}-${safe || 'video'}`
}

function watchPath(storagePath: string): string {
  return '/watch/' + storagePath.split('/').map(encodeURIComponent).join('/')
}

/** Player-page link (`/watch/…`) for a stored video link, else null. */
export function videoWatchPath(link: string): string | null {
  const path = storagePathFromLink(link)
  return path ? watchPath(path) : null
}

/** Storage path inside a stored video link, else null. */
export function storagePathFromLink(link: string): string | null {
  try {
    const url = new URL(link)
    const pathname = url.pathname
    if (pathname.startsWith('/api/video/')) {
      return decodeURIComponent(pathname.slice('/api/video/'.length))
    }
    // Firebase download URL: https://firebasestorage.googleapis.com/v0/b/<bucket>/o/<encoded path>?…
    const encoded = pathname.match(/^\/v0\/b\/[^/]+\/o\/(.+)$/)?.[1]
    if (encoded) {
      const path = decodeURIComponent(encoded)
      if (path.startsWith('learning-videos/')) return path
    }
    return null
  } catch {
    return null
  }
}

export async function uploadVideo(
  file: File,
  token: string | null,
  onProgress?: (pct: number) => void
): Promise<string> {
  const contentType = file.type || 'application/octet-stream'
  const filePath = videoStoragePath(file.name)

  const res = await fetch('/api/admin/upload-url', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ filePath, contentType }),
  })
  if (!res.ok) throw new Error('Could not get an upload URL')
  const { url } = (await res.json()) as { url: string }

  // XHR instead of fetch only for upload progress events.
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', url)
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`Upload failed (${xhr.status})`))
    xhr.onerror = () => reject(new Error('Upload failed — check Storage CORS'))
    xhr.send(file)
  })

  return watchPath(filePath)
}

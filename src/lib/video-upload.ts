/**
 * Admin video upload: browser PUTs the file straight to a signed Firebase
 * Storage URL (no big body through the Worker), and the stored link is a stable
 * app URL that redirects to a fresh signed URL on every click, so it never rots.
 */

export function videoStoragePath(fileName: string, now = Date.now()): string {
  const safe = fileName
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '_')
    .replace(/^[._]+/, '')
  return `learning-videos/${now}-${safe || 'video'}`
}

export function videoLink(filePath: string, origin: string): string {
  return `${origin}/api/video/${filePath.split('/').map(encodeURIComponent).join('/')}`
}

export async function uploadVideo(
  file: File,
  token: string | null,
  origin: string,
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

  return videoLink(filePath, origin)
}

import { getStorage } from './firebase-admin'

/**
 * Generate a signed URL for a file in Firebase Storage.
 */
export async function generateSignedUrl(
  filePath: string,
  expiresInMs = 60 * 60 * 1000
): Promise<string> {
  const bucket = getStorage().bucket()
  const file = bucket.file(filePath)

  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + expiresInMs,
  })

  return url
}

/**
 * Delete a file from Firebase Storage.
 */
export async function deleteFile(filePath: string): Promise<void> {
  const bucket = getStorage().bucket()
  const file = bucket.file(filePath)
  await file.delete()
}

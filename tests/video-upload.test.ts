import { describe, it, expect, afterEach } from 'vitest'
import { videoStoragePath, storagePathFromLink, videoWatchPath } from '#lib/video-upload'
import { videoWatchUrl } from '#lib/video-links'

describe('videoStoragePath', () => {
  it('builds a sanitized path under learning-videos', () => {
    expect(videoStoragePath('Module 1: intro!.mp4', 100)).toBe('learning-videos/100-Module_1_intro_.mp4')
  })

  it('strips leading dots so no traversal segment survives', () => {
    const path = videoStoragePath('../../etc/passwd', 100)
    expect(path.startsWith('learning-videos/')).toBe(true)
    expect(path).not.toContain('..')
  })
})

describe('storagePathFromLink', () => {
  it('extracts and decodes the path from an /api/video/ redirect link', () => {
    expect(storagePathFromLink('https://app.test/api/video/learning-videos/1-a%20b.mp4')).toBe(
      'learning-videos/1-a b.mp4'
    )
  })

  it('extracts the path from a Firebase download URL', () => {
    expect(
      storagePathFromLink(
        'https://firebasestorage.googleapis.com/v0/b/bot-edventure.firebasestorage.app/o/learning-videos%2F1-a.mp4?alt=media&token=x'
      )
    ).toBe('learning-videos/1-a.mp4')
  })

  it('returns null for other links', () => {
    expect(storagePathFromLink('https://edventurehub-my.sharepoint.com/personal/x')).toBeNull()
    expect(storagePathFromLink('not a url')).toBeNull()
  })
})

describe('videoWatchPath', () => {
  it('maps a storage link to the in-app player path', () => {
    const firebase =
      'https://firebasestorage.googleapis.com/v0/b/b/o/learning-videos%2F1-a.mp4?alt=media&token=x'
    expect(videoWatchPath(firebase)).toBe('/watch/learning-videos/1-a.mp4')
    expect(videoWatchPath('https://youtu.be/abc')).toBeNull()
  })
})

describe('videoWatchUrl', () => {
  afterEach(() => { delete process.env.SITE_URL })

  it('rewrites storage links to the in-app player, never the raw file', () => {
    process.env.SITE_URL = 'https://app.test'
    const firebase =
      'https://firebasestorage.googleapis.com/v0/b/b/o/learning-videos%2F1-a%20b.mp4?alt=media&token=x'
    expect(videoWatchUrl(firebase)).toBe('https://app.test/watch/learning-videos/1-a%20b.mp4')
  })

  it('leaves external links untouched', () => {
    expect(videoWatchUrl('https://youtu.be/abc')).toBe('https://youtu.be/abc')
    expect(videoWatchUrl(undefined)).toBe('')
  })
})

import { describe, it, expect } from 'vitest'
import { videoStoragePath, videoLink } from '#lib/video-upload'

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

describe('videoLink', () => {
  it('encodes each segment and points at the redirect route', () => {
    expect(videoLink('learning-videos/1-a b.mp4', 'https://app.test')).toBe(
      'https://app.test/api/video/learning-videos/1-a%20b.mp4'
    )
  })
})

import { describe, it, expect } from 'vitest'
import {
  MESSAGE_DEFS,
  DEFAULT_MESSAGES,
  renderMessage,
  withInsertions,
  type BotInsertion,
} from '#lib/bot-messages'

const ins = (position: 'before' | 'after', text: string): BotInsertion => ({
  id: position + text,
  anchorKey: 'videoPrompt',
  position,
  text,
})

describe('renderMessage', () => {
  it('fills named placeholders and leaves unknown ones visible', () => {
    expect(renderMessage('Hi {name}, {missing}', { name: 'Ravi' })).toBe('Hi Ravi, {missing}')
  })

  it('drops blank lines left behind by empty optional values', () => {
    expect(renderMessage('A\n\n{description}\n\nB', { description: '' })).toBe('A\n\nB')
  })
})

describe('withInsertions', () => {
  it('places added messages before and after the anchor, in array order', () => {
    const out = withInsertions(
      'videoPrompt',
      'MAIN',
      [ins('after', 'SECOND'), ins('before', 'FIRST'), ins('after', 'THIRD')]
    )
    expect(out).toBe('FIRST\n\nMAIN\n\nSECOND\n\nTHIRD')
  })

  it('fills placeholders in added messages and ignores other anchors', () => {
    const out = withInsertions('videoPrompt', 'MAIN', [
      { ...ins('before', 'Hi {name}'), },
      { ...ins('after', 'other'), anchorKey: 'fallback' },
    ], { name: 'Ravi' })
    expect(out).toBe('Hi Ravi\n\nMAIN')
  })

  it('skips blank added messages', () => {
    expect(withInsertions('videoPrompt', 'MAIN', [ins('after', '   ')])).toBe('MAIN')
  })
})

describe('default bot copy', () => {
  it('only references placeholders it declares', () => {
    for (const def of MESSAGE_DEFS) {
      const used = [...def.default.matchAll(/\{(\w+)\}/g)].map((m) => m[1])
      for (const token of used) expect(def.placeholders ?? [], def.key).toContain(token)
    }
  })

  it('exposes every message by key', () => {
    expect(Object.keys(DEFAULT_MESSAGES).sort()).toEqual(MESSAGE_DEFS.map((d) => d.key).sort())
  })
})

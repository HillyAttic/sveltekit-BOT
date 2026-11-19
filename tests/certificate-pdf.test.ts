import { describe, it, expect } from 'vitest'
import { buildCertificatePdf } from '#lib/certificate-pdf'

const text = (bytes: Uint8Array) => new TextDecoder('latin1').decode(bytes)

describe('buildCertificatePdf', () => {
  const pdf = buildCertificatePdf({
    employeeName: 'Naveen Kumar',
    course: 'Edventure Learning Program',
    certificateNumber: 'EDV-EMP-001',
    issuedAt: '2026-11-19T10:00:00.000Z',
  })
  const body = text(pdf)

  it('is a valid single-page PDF', () => {
    expect(body.startsWith('%PDF-1.4')).toBe(true)
    expect(body.trimEnd().endsWith('%%EOF')).toBe(true)
    expect(body).toContain('/Type /Page /Parent 2 0 R')
    expect(body).toContain('/Count 1')
  })

  it('carries the certificate details', () => {
    expect(body).toContain('Naveen Kumar')
    expect(body).toContain('Edventure Learning Program')
    expect(body).toContain('EDV-EMP-001')
    expect(body).toContain('19 November 2026')
  })

  it('writes an xref table whose offsets point at the objects', () => {
    const startxref = Number(/startxref\n(\d+)/.exec(body)![1])
    expect(body.slice(startxref, startxref + 4)).toBe('xref')
    const [, firstOffset] = /xref\n0 \d+\n0000000000 65535 f \n(\d{10})/.exec(body)!
    expect(body.slice(Number(firstOffset), Number(firstOffset) + 7)).toBe('1 0 obj')
  })
})

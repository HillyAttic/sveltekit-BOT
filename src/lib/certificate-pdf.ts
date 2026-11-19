/**
 * Tiny hand-rolled PDF writer for certificates — no dependencies (workerd-safe).
 * One landscape A4 page: bordered frame, title, employee name, course, issue
 * date and certificate ID, using the built-in Helvetica fonts.
 */
export interface CertificatePdfInput {
  employeeName: string
  course: string
  certificateNumber: string
  issuedAt: string
  orgName?: string
}

const PAGE_W = 842
const PAGE_H = 595
const ACCENT = '0.11 0.31 0.85'

function ascii(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\x20-\x7E]/g, '?')
}

function escapeText(value: string): string {
  return ascii(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

/** Rough Helvetica advance widths are good enough for centring a certificate. */
function textWidth(value: string, size: number, bold: boolean): number {
  return ascii(value).length * size * (bold ? 0.56 : 0.5)
}

function centredLine(text: string, size: number, y: number, bold: boolean, rgb = '0.1 0.12 0.2') {
  const x = Math.round((PAGE_W - textWidth(text, size, bold)) / 2)
  return `${rgb} rg BT /${bold ? 'F2' : 'F1'} ${size} Tf ${x} ${y} Td (${escapeText(text)}) Tj ET`
}

function issueDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ascii(iso)
  const ist = new Date(d.getTime() + 5.5 * 60 * 60 * 1000)
  return ist.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

function buildContent(input: CertificatePdfInput): string {
  const org = input.orgName || 'Edventure'
  const lines = [
    'q',
    '1 1 1 rg 0 0 842 595 re f',
    // Outer + inner frame and a bottom accent band
    `${ACCENT} RG 3 w 24 24 794 547 re S`,
    `${ACCENT} RG 1 w 46 46 750 503 re S`,
    `${ACCENT} rg 46 46 750 8 re f`,
    'Q',
    centredLine('CERTIFICATE OF COMPLETION', 30, 452, true, ACCENT),
    centredLine('This is to certify that', 14, 396, false),
    centredLine(input.employeeName, 36, 342, true),
    centredLine('has successfully completed the', 13, 302, false),
    centredLine(input.course, 20, 268, true),
    centredLine('completing every learning video and passing all assessments', 11, 238, false, '0.35 0.38 0.45'),
    `${ACCENT} RG 1 w 250 205 m 592 205 l S`,
    centredLine(`Date of Issue: ${issueDate(input.issuedAt)}`, 12, 176, false, '0.35 0.38 0.45'),
    centredLine(`Certificate ID: ${input.certificateNumber}`, 12, 158, false, '0.35 0.38 0.45'),
    centredLine(org, 14, 100, true, ACCENT),
  ]
  return lines.join('\n')
}

export function buildCertificatePdf(input: CertificatePdfInput): Uint8Array {
  const content = buildContent(input)
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ]

  // Everything written above is ASCII, so string length === byte offset.
  let pdf = '%PDF-1.4\n'
  const offsets: number[] = []
  objects.forEach((object, i) => {
    offsets.push(pdf.length)
    pdf += `${i + 1} 0 obj\n${object}\nendobj\n`
  })
  const xrefStart = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (const offset of offsets) pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

  return new TextEncoder().encode(pdf)
}

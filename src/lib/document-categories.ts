const ALL_FISCAL_YEARS = [
  'FY 2021-22', 'FY 2022-23', 'FY 2023-24', 'FY 2024-25',
  'FY 2025-26', 'FY 2026-27', 'FY 2027-28', 'FY 2028-29', 'FY 2029-30',
]

export const CATEGORIES: Record<string, { fiscalYears: string[]; subCategories: string[] }> = {
  'Audit Report': {
    fiscalYears: [...ALL_FISCAL_YEARS],
    subCategories: [],
  },
  'Financial Statements': {
    fiscalYears: [...ALL_FISCAL_YEARS],
    subCategories: [],
  },
  'GST Related Documents': {
    fiscalYears: [...ALL_FISCAL_YEARS],
    subCategories: ['GSTR-1', 'GSTR-3B'],
  },
  'Income Tax Documents': {
    fiscalYears: [...ALL_FISCAL_YEARS],
    subCategories: ['ITR', 'Acknowledgement', 'Computation'],
  },
  'Incorporation & Other Documents': {
    fiscalYears: [],
    subCategories: [],
  },
  'TDS reports': {
    fiscalYears: [...ALL_FISCAL_YEARS],
    subCategories: [],
  },
  'GST user ID and PDF': {
    fiscalYears: [],
    subCategories: [],
  },
}

export const CATEGORY_NAMES = Object.keys(CATEGORIES)

export function buildStoragePath(
  clientName: string,
  category: string,
  fiscalYear: string | null,
  subCategory: string | null,
  filename: string
): string {
  const parts = ['JPCO Client Documents', clientName, category]
  if (fiscalYear) parts.push(fiscalYear)
  if (subCategory) parts.push(subCategory)
  parts.push(filename)
  return parts.join('/')
}

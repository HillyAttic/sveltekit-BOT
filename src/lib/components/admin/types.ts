export interface ClientRecord {
  id: string
  name: string
  phones: string[]
  gstNumber?: string
}

export interface DocumentRecord {
  id: string
  phone?: string
  title: string
  filePath: string
  uploadedAt?: string
  category?: string
  fiscalYear?: string | null
  subCategory?: string | null
}

export interface UploadPreset {
  category: string
  fiscalYear: string | null
  subCategory: string | null
}

export interface DocumentFormData {
  title: string
  file: File | null
  files: File[]
  category: string
  fiscalYear: string | null
  subCategory: string | null
}

export interface CategoryConfig {
  fiscalYears: string[]
  subCategories: string[]
}

export type StockStatus = "in-stock" | "pre-order" | "out-of-stock"

export interface BaseProduct {
  id: string
  name: string
  description: string
  price: number
  stockStatus: StockStatus
  images: string[]
  thumbnail: string
  variantId?: string
  metadata?: Record<string, any>
}

export interface ProductOption {
  title: string
  options: { id: string; label: string; available: boolean }[]
}

export interface ProductOptionGroup {
  title: string
  options: { id: string; label: string; available: boolean }[]
}

export interface DetailedProduct extends BaseProduct {
  subtitle?: string
  options?: ProductOptionGroup[]
  advantages?: string[]
  specifications?: Record<string, string>
  pdfDownloads?: { title: string; url: string }[]
  includes?: string
}


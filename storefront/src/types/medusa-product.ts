import { HttpTypes } from "@medusajs/types"

/**
 * Extended Medusa product type with heater-specific metadata
 */
export interface HeaterProductMetadata {
  PEB?: string // JSON string array like '["PED 36"]'
  size_to?: number
  size_from?: number
  rock_boxes?: number
  controllers?: string // JSON string array like '["EmoStyle D", "Compact DC"]'
  advantages?: string[] // Custom advantages array
  specifications?: Record<string, string> // Technical specifications
  includes?: string // What's included with the product
}

/**
 * Medusa store product with typed metadata
 */
export type HeaterProduct = HttpTypes.StoreProduct & {
  metadata?: HeaterProductMetadata
}

/**
 * Stock status type
 */
export type StockStatus = "in-stock" | "pre-order" | "out-of-stock"


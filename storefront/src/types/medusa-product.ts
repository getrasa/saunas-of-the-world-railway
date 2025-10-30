import { HttpTypes } from "@medusajs/types"

/**
 * Extended Medusa product type with heater-specific metadata
 */
export interface HeaterProductMetadata {
  peb?: string[] // Array of product IDs for Power Extension Boxes
  size_to?: number // Maximum sauna size (can be float like 4.5)
  size_from?: number // Minimum sauna size (can be float like 3.5)
  rock_boxes?: number // Number of rock boxes (integer)
  controllers?: string[] // Array of product IDs for controllers
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


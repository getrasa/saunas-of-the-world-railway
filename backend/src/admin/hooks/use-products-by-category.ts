import { useState, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import { sdk } from "../lib/client"
import { useCategoryByHandle } from "./use-category-by-handle"

interface UseProductsByCategoryOptions {
  categoryHandle?: string
  searchQuery?: string
  enabled?: boolean
}

export const useProductsByCategory = ({
  categoryHandle,
  searchQuery,
  enabled = true,
}: UseProductsByCategoryOptions) => {
  // First, resolve category handle to ID
  const { data: category, isLoading: isCategoryLoading } = useCategoryByHandle(categoryHandle)
  
  const [data, setData] = useState<HttpTypes.AdminProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Don't fetch if disabled, category is still loading, or we need a category but don't have one yet
    if (!enabled || isCategoryLoading || (categoryHandle && !category)) {
      return
    }

    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const params: any = {
          limit: 100,
          fields: "id,title,handle,thumbnail",
        }

        // Add category filter if we have a category ID
        if (category?.id) {
          params.category_id = [category.id]
        }

        const response = await sdk.admin.product.list(params)
        setData(response.products as HttpTypes.AdminProduct[])
      } catch (err) {
        setError(err as Error)
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [enabled, isCategoryLoading, category?.id, categoryHandle])

  return { data, isLoading: isLoading || isCategoryLoading, error }
}

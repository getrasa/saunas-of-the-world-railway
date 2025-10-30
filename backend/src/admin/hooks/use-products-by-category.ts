import { useQuery } from "@tanstack/react-query"
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

  return useQuery({
    queryKey: ["products", "by-category", category?.id, searchQuery],
    queryFn: async () => {
      const params: any = {
        limit: 100,
        fields: "id,title,handle,thumbnail",
      }

      // Add category filter if we have a category ID
      if (category?.id) {
        params.category_id = [category.id]
      }

      // Add search query if provided
      if (searchQuery) {
        params.q = searchQuery
      }

      const response = await sdk.admin.product.list(params)
      return response.products as HttpTypes.AdminProduct[]
    },
    enabled: enabled && !isCategoryLoading && (!categoryHandle || !!category),
  })
}

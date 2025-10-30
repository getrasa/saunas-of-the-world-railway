import { useQuery } from "@tanstack/react-query"
import { sdk } from "../lib/client"

export const useCategoryByHandle = (handle?: string) => {
  return useQuery({
    queryKey: ["category", "by-handle", handle],
    queryFn: async () => {
      if (!handle) return null

      const response = await sdk.admin.productCategory.list({
        handle: [handle],
        limit: 1,
      })

      return response.product_categories?.[0] || null
    },
    enabled: !!handle,
  })
}

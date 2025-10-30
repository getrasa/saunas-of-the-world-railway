import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../lib/client"

export const useUpdateProductMetadata = (productId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (metadata: Record<string, any>) => {
      return await sdk.admin.product.update(productId, { metadata })
    },
    onSuccess: () => {
      // Invalidate product queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ["products", productId]
      })
      queryClient.invalidateQueries({
        queryKey: ["product", productId]
      })
    },
  })
}

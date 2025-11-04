import { useState, useEffect } from "react"
import { sdk } from "../lib/client"
import { HttpTypes } from "@medusajs/types"

export const useCategoryByHandle = (handle?: string) => {
  const [data, setData] = useState<HttpTypes.AdminProductCategory | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!handle) {
      setData(null)
      return
    }

    const fetchCategory = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await sdk.admin.productCategory.list({
          handle: [handle],
          limit: 1,
        })
        setData(response.product_categories?.[0] || null)
      } catch (err) {
        setError(err as Error)
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategory()
  }, [handle])

  return { data, isLoading, error }
}

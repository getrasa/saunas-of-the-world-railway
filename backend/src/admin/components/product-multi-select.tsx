import { useState, useMemo } from "react"
import { Input, Label, Badge, Button } from "@medusajs/ui"
import { XMarkMini } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { useProductsByCategory } from "../hooks/use-products-by-category"

interface ProductMultiSelectProps {
  label: string
  categoryHandle: string
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export const ProductMultiSelect = ({
  label,
  categoryHandle,
  value,
  onChange,
  placeholder = "Search products...",
}: ProductMultiSelectProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  // Load all products from category (for displaying selected products)
  const { data: allProducts = [] } = useProductsByCategory({
    categoryHandle,
    enabled: value.length > 0,
  })

  // Load filtered products based on search
  const { data: searchProducts = [], isLoading } = useProductsByCategory({
    categoryHandle,
    searchQuery,
    enabled: isOpen && !!searchQuery,
  })

  // Use search results when searching, otherwise use all products
  const products = searchQuery ? searchProducts : allProducts

  // Filter out already selected products
  const availableProducts = useMemo(() => {
    return products.filter((product) => !value.includes(product.id))
  }, [products, value])

  // Get selected product details
  const selectedProducts = useMemo(() => {
    return products.filter((product) => value.includes(product.id))
  }, [products, value])

  const handleAddProduct = (productId: string) => {
    onChange([...value, productId])
    setSearchQuery("")
    setIsOpen(false)
  }

  const handleRemoveProduct = (productId: string) => {
    onChange(value.filter((id) => id !== productId))
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>

      {/* Selected products */}
      {selectedProducts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedProducts.map((product) => (
            <Badge key={product.id} size="small" className="flex items-center gap-1">
              {product.title}
              <button
                type="button"
                onClick={() => handleRemoveProduct(product.id)}
                className="ml-1 hover:text-red-500"
              >
                <XMarkMini />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
        />

        {/* Dropdown results */}
        {isOpen && searchQuery && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {isLoading ? (
              <div className="p-3 text-sm text-gray-500">Loading...</div>
            ) : availableProducts.length > 0 ? (
              <div>
                {availableProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleAddProduct(product.id)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2"
                  >
                    {product.thumbnail && (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span>{product.title}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 text-sm text-gray-500">No products found</div>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

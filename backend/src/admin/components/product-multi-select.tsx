import { useState, useMemo } from "react"
import { Input, Label, Badge, Button } from "@medusajs/ui"
import { XMarkMini } from "@medusajs/icons"
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

  // Load all products from category
  const { data: allProducts = [], isLoading } = useProductsByCategory({
    categoryHandle,
  })

  // Get selected product details
  const selectedProducts = useMemo(() => {
    return allProducts.filter((product) => value.includes(product.id))
  }, [allProducts, value])

  // Filter products: show all if empty, otherwise filter by startsWith
  const availableProducts = useMemo(() => {
    const unselected = allProducts.filter((product) => !value.includes(product.id))

    if (!searchQuery) {
      return unselected
    }

    const query = searchQuery.toLowerCase()

    // Filter to only show products that start with the search query
    return unselected.filter((product) =>
      product.title.toLowerCase().startsWith(query)
    )
  }, [allProducts, value, searchQuery])

  const handleAddProduct = (productId: string) => {
    onChange([...value, productId])
    setSearchQuery("")
    // Keep dropdown open for multi-selection
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
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-ui-bg-base border border-ui-border-base rounded-md shadow-lg max-h-60 overflow-auto">
            {isLoading ? (
              <div className="p-3 text-sm text-ui-fg-muted">Loading...</div>
            ) : availableProducts.length > 0 ? (
              <div>
                {availableProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleAddProduct(product.id)}
                    className="w-full px-3 py-2 text-left hover:bg-ui-bg-base-hover text-sm flex items-center gap-2 text-ui-fg-base"
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
              <div className="p-3 text-sm text-ui-fg-muted">No products found</div>
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

import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

export function AddToCartButton({ 
  onClick, 
  disabled = false, 
  isLoading = false,
  className = "",
  children 
}: AddToCartButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-black text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {isLoading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span className="font-semibold">Adding...</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          <span className="font-semibold">{children || "Add to Cart"}</span>
        </>
      )}
    </button>
  )
}


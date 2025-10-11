interface ProductPriceProps {
  value: number | null
  currency?: string
  className?: string
}

export function ProductPrice({ value, currency = "$", className = "" }: ProductPriceProps) {
  if (value === null) return null
  
  return (
    <span className={`text-3xl font-semibold ${className}`}>
      {currency}{value}
    </span>
  )
}


interface ProductDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function ProductDescription({ children, className = "" }: ProductDescriptionProps) {
  return (
    <p className={`mb-4 text-gray-600 ${className}`}>
      {children}
    </p>
  )
}


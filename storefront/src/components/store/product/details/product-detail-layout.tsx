"use client"

interface ProductDetailLayoutProps {
  children: React.ReactNode
  className?: string
}

export function ProductDetailLayout({ children, className = "" }: ProductDetailLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <div className="mx-auto max-w-[1512px] px-6 py-8">
        {children}
      </div>
    </div>
  )
}

interface ProductDetailGridProps {
  children: React.ReactNode
  className?: string
}

function ProductDetailGrid({ children, className = "" }: ProductDetailGridProps) {
  return (
    <div className={`grid gap-12 lg:grid-cols-[737px_1fr] ${className}`}>
      {children}
    </div>
  )
}

interface ProductDetailColumnProps {
  children: React.ReactNode
  className?: string
}

function LeftColumn({ children, className = "" }: ProductDetailColumnProps) {
  return (
    <div className={`flex flex-col gap-12 ${className}`}>
      {children}
    </div>
  )
}

function RightColumn({ children, className = "" }: ProductDetailColumnProps) {
  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      {children}
    </div>
  )
}

interface SectionDividerProps {
  className?: string
}

function SectionDivider({ className = "" }: SectionDividerProps) {
  return <div className={`h-px bg-gray-200 ${className}`} />
}

ProductDetailLayout.Grid = ProductDetailGrid
ProductDetailLayout.LeftColumn = LeftColumn
ProductDetailLayout.RightColumn = RightColumn
ProductDetailLayout.Divider = SectionDivider


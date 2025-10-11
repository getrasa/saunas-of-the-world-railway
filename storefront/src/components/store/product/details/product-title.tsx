interface ProductTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function ProductTitle({ title, subtitle, className = "" }: ProductTitleProps) {
  return (
    <h1 className={`mb-6 text-3xl font-semibold ${className}`}>
      <span className="text-[#C5AF71]">{title}</span>
      {subtitle && <span className="text-black"> - {subtitle}</span>}
    </h1>
  )
}


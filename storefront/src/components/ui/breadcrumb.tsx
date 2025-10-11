import Link from "next/link"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 text-xs text-gray-500 ${className}`}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-black">{item.label}</span>
          )}
          {index < items.length - 1 && <span>&gt;</span>}
        </span>
      ))}
    </nav>
  )
}


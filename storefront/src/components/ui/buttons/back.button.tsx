import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface BackButtonProps {
  href: string
  children?: React.ReactNode
  className?: string
}

export function BackButton({ href, children = "Back", className = "" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 rounded-full border border-black px-3 py-1 text-xs font-semibold transition-colors hover:bg-gray-100 ${className}`}
    >
      <ChevronLeft className="h-3 w-3" />
      {children}
    </Link>
  )
}


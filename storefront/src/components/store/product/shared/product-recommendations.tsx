import Link from "next/link"
import { ProductCard, type ProductCardData } from "~/components/store/product/list/product-card"

interface ProductRecommendationsProps {
  products: ProductCardData[]
  title?: string
  linkBuilder: (id: string) => string
  onAddToCart?: (product: ProductCardData) => void
  className?: string
}

export function ProductRecommendations({
  products,
  title = "You may also be interested in",
  linkBuilder,
  onAddToCart,
  className = "",
}: ProductRecommendationsProps) {
  if (products.length === 0) return null

  return (
    <div className={`bg-neutral-100 px-6 py-16 ${className}`}>
      <div className="mx-auto max-w-[1512px]">
        <h2 className="mb-12 text-3xl font-semibold">{title}</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link key={product.id} href={linkBuilder(product.id)}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { StockIndicator, type StockStatus } from "~/components/store/stock-indicator"

export interface ProductCardData {
  id: string
  name: string
  description: string
  price: number
  stockStatus: StockStatus
  image: string
  metadata?: Record<string, string>
  variantId?: string
}

interface ProductCardProps {
  product: ProductCardData
  onAddToCart?: (product: ProductCardData) => void
  className?: string
  children?: React.ReactNode
}

export function ProductCard({ product, onAddToCart, className = "", children }: ProductCardProps) {
  return (
    <div className={`flex flex-col gap-2.5 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:p-6 ${className}`}>
      {children || (
        <>
          <ProductCard.Image src={product.image} alt={product.name} />
          <ProductCard.Info product={product} />
          {onAddToCart && (
            <ProductCard.Actions product={product} onAddToCart={onAddToCart} />
          )}
          {product.metadata && <ProductCard.Metadata metadata={product.metadata} />}
        </>
      )}
    </div>
  )
}

interface CardImageProps {
  src: string
  alt: string
  className?: string
}

function CardImage({ src, alt, className = "" }: CardImageProps) {
  return (
    <div className={`relative h-72 w-full overflow-hidden rounded-lg bg-gray-50 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
      />
    </div>
  )
}

interface CardInfoProps {
  product: ProductCardData
  className?: string
}

function CardInfo({ product, className = "" }: CardInfoProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-medium text-[#C5AF71]">{product.name}</h3>
        <p className="line-clamp-3 text-xs text-gray-600">{product.description}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">${product.price}</span>
        <StockIndicator status={product.stockStatus} />
      </div>
    </div>
  )
}

interface CardActionsProps {
  product: ProductCardData
  onAddToCart: (product: ProductCardData) => void
  className?: string
}

function CardActions({ product, onAddToCart, className = "" }: CardActionsProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart(product)
  }

  return (
    <button
      onClick={handleClick}
      disabled={product.stockStatus === "out-of-stock"}
      className={`flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-black text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 ${className}`}
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="font-medium">Add to My Cart</span>
    </button>
  )
}

interface CardMetadataProps {
  metadata: Record<string, string>
  className?: string
}

function CardMetadata({ metadata, className = "" }: CardMetadataProps) {
  return (
    <div className={`flex flex-col gap-3 border-t pt-3 ${className}`}>
      {Object.entries(metadata).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-1">
          <span className="text-xs font-medium text-[#C5AF71]">{key}</span>
          <span className="text-xs text-gray-600">{value}</span>
        </div>
      ))}
    </div>
  )
}

ProductCard.Image = CardImage
ProductCard.Info = CardInfo
ProductCard.Actions = CardActions
ProductCard.Metadata = CardMetadata


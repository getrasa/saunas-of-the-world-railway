"use client"

import { createContext, useContext, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

interface GalleryContextValue {
  images: string[]
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  productName: string
}

const GalleryContext = createContext<GalleryContextValue | null>(null)

function useGallery() {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error("Gallery sub-components must be used within ProductImageGallery")
  }
  return context
}

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  children?: React.ReactNode
  className?: string
}

export function ProductImageGallery({ 
  images, 
  productName, 
  children,
  className = "" 
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <GalleryContext.Provider value={{ images, selectedIndex, setSelectedIndex, productName }}>
      <div className={`flex gap-0 ${className}`}>
        {children}
      </div>
    </GalleryContext.Provider>
  )
}

interface ThumbnailListProps {
  children?: React.ReactNode
  className?: string
}

function ThumbnailList({ children, className = "" }: ThumbnailListProps) {
  const { images } = useGallery()
  const [showAll, setShowAll] = useState(false)
  
  const visibleCount = 4
  const hasMore = images.length > visibleCount

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col gap-2.5 py-2 pr-6">
        {children}
      </div>

      {hasMore && !showAll && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-[210px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
          <button
            onClick={() => setShowAll(true)}
            className="absolute bottom-4 left-1/2 flex h-[35px] w-[35px] -translate-x-1/2 items-center justify-center rounded-full bg-gray-100 shadow-sm hover:bg-gray-200 transition-colors"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  )
}

interface ThumbnailProps {
  src: string
  index: number
  className?: string
}

function Thumbnail({ src, index, className = "" }: ThumbnailProps) {
  const { selectedIndex, setSelectedIndex, productName } = useGallery()

  return (
    <button
      onClick={() => setSelectedIndex(index)}
      className={`relative mx-auto h-[97px] w-[99px] overflow-hidden rounded border-2 transition-colors ${
        selectedIndex === index ? "border-[#C5AF71]" : "border-gray-300"
      } ${className}`}
    >
      <Image
        src={src}
        alt={`${productName} view ${index + 1}`}
        fill
        className="object-contain"
      />
    </button>
  )
}

interface MainImageProps {
  selectedOptions?: string
  className?: string
}

function MainImage({ selectedOptions, className = "" }: MainImageProps) {
  const { images, selectedIndex, productName } = useGallery()
  const currentImage = images[selectedIndex] ?? images[0] ?? ""

  return (
    <div className={`relative flex-1 ${className}`}>
      <div className="relative h-[531px] w-full overflow-hidden bg-gray-50">
        <Image
          src={currentImage}
          alt={productName}
          fill
          className="object-cover"
        />
        {selectedOptions && (
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-600">
            {selectedOptions}
          </p>
        )}
      </div>
    </div>
  )
}

ProductImageGallery.ThumbnailList = ThumbnailList
ProductImageGallery.Thumbnail = Thumbnail
ProductImageGallery.MainImage = MainImage


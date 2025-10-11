"use client"

import { createContext, useContext, useState } from "react"
import Image from "next/image"
import { ScrollArea } from "~/lib/components/ui/scroll-area"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel"

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
      <div className={`flex flex-col md:flex-row gap-4 md:gap-0 ${className}`}>
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
  const childArray = Array.isArray(children) ? children : [children]

  return (
    <>
      {/* Desktop: Vertical scrollable list */}
      <div className={`hidden md:block ${className}`}>
        <ScrollArea className="h-[531px] w-[115px]">
          <div className="flex flex-col gap-2.5 py-2 pr-2">
            {children}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile: Horizontal carousel */}
      <div className="block md:hidden w-full">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {childArray.map((child, idx) => (
              <CarouselItem key={idx} className="basis-1/3 pl-2">
                {child}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  )
}

interface ThumbnailProps {
  src: string
  index: number
  className?: string
}

function Thumbnail({ src, index, className = "" }: ThumbnailProps) {
  const { selectedIndex, setSelectedIndex, productName } = useGallery()
  const isSelected = selectedIndex === index

  return (
    <button
      onMouseEnter={() => setSelectedIndex(index)}
      className={`relative h-[97px] overflow-hidden rounded border-2 transition-colors cursor-pointer select-none ${
        isSelected ? "border-[#C5AF71]" : "border-gray-300"
      } ${className} md:mx-auto md:w-[99px] md:flex-shrink-0 w-full`}
    >
      <Image
        src={src}
        alt={`${productName} view ${index + 1}`}
        fill
        className="object-cover pointer-events-none"
        draggable={false}
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
      <div className="relative h-[400px] md:h-[531px] w-full overflow-hidden bg-gray-50 rounded-lg select-none">
        <Image
          src={currentImage}
          alt={productName}
          fill
          className="object-cover pointer-events-none"
          draggable={false}
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


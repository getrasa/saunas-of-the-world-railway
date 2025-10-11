"use client"

import { ProductImageGallery } from "~/components/store/product/details/product-image-gallery"

interface HeaterDetailGalleryProps {
  images: string[]
  productName: string
}

export function HeaterDetailGallery({ images, productName }: HeaterDetailGalleryProps) {
  return (
    <ProductImageGallery images={images} productName={productName}>
      <ProductImageGallery.ThumbnailList>
        {images.map((img, index) => (
          <ProductImageGallery.Thumbnail key={img} src={img} index={index} />
        ))}
      </ProductImageGallery.ThumbnailList>
      <ProductImageGallery.MainImage />
    </ProductImageGallery>
  )
}


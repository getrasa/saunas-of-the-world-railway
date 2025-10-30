"use client"

import { ProductImageGallery } from "~/components/store/product/details/product-image-gallery"

interface AccessoryDetailGalleryProps {
  images: string[]
  productName: string
}

export function AccessoryDetailGallery({ images, productName }: AccessoryDetailGalleryProps) {
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

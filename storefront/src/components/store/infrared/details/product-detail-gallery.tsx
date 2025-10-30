"use client"

import { ProductImageGallery } from "~/components/store/product/details/product-image-gallery"

interface InfraredDetailGalleryProps {
  images: string[]
  productName: string
}

export function InfraredDetailGallery({ images, productName }: InfraredDetailGalleryProps) {
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

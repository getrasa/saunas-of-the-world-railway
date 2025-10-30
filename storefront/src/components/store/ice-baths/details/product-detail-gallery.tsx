"use client"

import { ProductImageGallery } from "~/components/store/product/details/product-image-gallery"

interface IceBathDetailGalleryProps {
  images: string[]
  productName: string
}

export function IceBathDetailGallery({ images, productName }: IceBathDetailGalleryProps) {
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

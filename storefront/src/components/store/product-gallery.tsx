"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  selectedOptions?: string;
}

export function ProductGallery({ images, productName, selectedOptions }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllThumbnails, setShowAllThumbnails] = useState(false);

  const visibleThumbnails = showAllThumbnails ? images : images.slice(0, 4);

  return (
    <div className="flex gap-0">
      <div className="relative w-[154px]">
        <div className="flex flex-col gap-2.5 py-2">
          {visibleThumbnails.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative mx-auto h-[97px] w-[99px] overflow-hidden rounded border-2 transition-colors ${
                selectedImage === index ? "border-[#C5AF71]" : "border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} view ${index + 1}`}
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>

        {images.length > 4 && !showAllThumbnails && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-[210px] bg-gradient-to-t from-white to-transparent" />
            <button
              onClick={() => setShowAllThumbnails(true)}
              className="absolute bottom-4 left-1/2 flex h-[35px] w-[35px] -translate-x-1/2 items-center justify-center rounded-full bg-gray-100 shadow-sm"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      <div className="relative flex-1">
        <div className="relative h-[531px] w-full bg-gray-50">
          <Image
            src={images[selectedImage] ?? images[0] ?? ""}
            alt={productName}
            fill
            className="object-contain p-8"
          />
          {selectedOptions && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-600">
              {selectedOptions}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
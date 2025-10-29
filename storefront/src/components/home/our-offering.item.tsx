"use client";

import type { JSX } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface ProductItemProps {
  label: string;
  imgPath: string;
  href: string;
  brightness?: number;
}

export const ProductItem = (props: ProductItemProps): JSX.Element => {
  const { label, imgPath, href, brightness = 70 } = props;
  const [isHovered, setIsHovered] = useState(false);

  // Convert brightness number (0-100) to decimal for CSS filter
  const brightnessValue = brightness / 100;
  const hoverBrightnessValue = Math.max(0, brightnessValue - 0.1); // Slightly darker on hover
  
  const currentBrightness = isHovered ? hoverBrightnessValue : brightnessValue;

  return (
    <div className="col-span-12 cursor-pointer sm:col-span-6 lg:col-span-4">
      <Link href={href}>
        <div 
          className="relative aspect-[412/360] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={imgPath}
            alt={label}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-300"
            style={{
              filter: `brightness(${currentBrightness})`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center px-16 text-[26px] transition-all duration-300 hover:text-[30px]">
            <span
              className="text-center font-semibold text-white"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {label.toUpperCase()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

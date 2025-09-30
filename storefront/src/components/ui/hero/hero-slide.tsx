"use client";

import type { JSX, ReactNode } from "react";
import Image from "next/image";

interface HeroSlideProps {
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  brightness?: string;
  children?: ReactNode;
  className?: string;
}

export const HeroSlide = ({
  imageSrc,
  imageAlt,
  priority = false,
  brightness = "brightness-75",
  children,
  className = "",
}: HeroSlideProps): JSX.Element => {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        priority={priority}
        className={`object-cover ${brightness}`}
      />
      {children && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
          {children}
        </div>
      )}
    </div>
  );
};

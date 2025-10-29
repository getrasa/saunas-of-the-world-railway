"use client";

import type { JSX, ReactNode } from "react";
import Image from "next/image";

interface HeroSlideProps {
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  brightness?: number;
  children?: ReactNode;
  className?: string;
}

export const HeroSlide = ({
  imageSrc,
  imageAlt,
  priority = false,
  brightness = 75,
  children,
  className = "",
}: HeroSlideProps): JSX.Element => {
  const brightnessValue = brightness / 100;

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover"
        style={{ filter: `brightness(${brightnessValue})` }}
      />
      {children && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
          {children}
        </div>
      )}
    </div>
  );
};

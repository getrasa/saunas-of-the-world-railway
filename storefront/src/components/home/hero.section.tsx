"use client";

import type { JSX } from "react";
import Link from "next/link";
import { Hero } from "~/components/ui/hero";
import { CtaButton } from "~/components/ui/buttons/cta-button";
import type { HeroSlideData } from "~/lib/data/homepage";

interface HeroSectionProps {
  slides: HeroSlideData[];
}

export const HeroSection = ({ slides }: HeroSectionProps): JSX.Element => {
  // Fallback message if no slides are found
  if (!slides || slides.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-gray-500">
          No hero slides configured. Please add slides in the CMS.
        </p>
      </div>
    );
  }

  return (
    <Hero>
      {slides.map((slide, index) => (
        <Hero.Item
          key={index}
          imageSrc={slide.imageSrc}
          imageAlt={slide.imageAlt}
          priority={slide.priority}
          brightness={slide.brightness}
        >
          <div className="text-center text-[14px] font-medium tracking-wide drop-shadow-lg sm:text-[16px]  md:text-[18px] lg:text-[22px] xl:text-[28px]">
            {slide.tagline.toUpperCase()}
          </div>
          <span className="text-center text-[24px] font-medium drop-shadow-lg sm:text-[32px] md:text-[48px] lg:text-[52px] xl:text-[64px]">
            {slide.headline.toUpperCase()}
          </span>
          {slide.showButton && (
            <CtaButton className="mt-2 sm:mt-8" ctaSize="lg" asChild>
              <Link href={slide.path}>{slide.buttonText}</Link>
            </CtaButton>
          )}
        </Hero.Item>
      ))}
    </Hero>
  );
};
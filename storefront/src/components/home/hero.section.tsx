"use client";

import type { JSX } from "react";
import Link from "next/link";
import { imageUrls } from "~/lib/imageUrls";
import { Hero } from "~/components/ui/hero";
import { CtaButton } from "~/components/ui/buttons/cta-button";

interface HeroSlideConfig {
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  tagline: string;
  headline: string;
  showButton: boolean;
  path: string;
}

const heroSlides: HeroSlideConfig[] = [
  {
    imageSrc: imageUrls.heroOne,
    imageAlt: "Custom-made saunas hero image",
    priority: true,
    tagline: "Commercial & Residential",
    headline: "Custom-Made Saunas",
    showButton: true,
    path: "/products/saunas",
  },
  {
    imageSrc: imageUrls.heroTwo,
    imageAlt: "Sauna equipment hero image",
    tagline: "Eos Supplied",
    headline: "Sauna Equipment",
    showButton: true,
    path: "/products/equipment",
  },
  {
    imageSrc: imageUrls.heroThree,
    imageAlt: "Refreshing ice baths hero image",
    tagline: "Wellness Retreat",
    headline: "Refreshing Ice Baths",
    showButton: true,
    path: "/products/baths",
  },
  {
    imageSrc: imageUrls.heroFour,
    imageAlt: "Pre-made saunas hero image",
    tagline: "Trivial to assemble",
    headline: "Pre-made Saunas",
    showButton: true,
    path: "/products/saunas",
  },
];

export const HeroSection = (): JSX.Element => {
  return (
    <Hero>
      {heroSlides.map((slide, index) => (
        <Hero.Item
          key={index}
          imageSrc={slide.imageSrc}
          imageAlt={slide.imageAlt}
          priority={slide.priority}
        >
          <div className="text-center text-[14px] font-medium tracking-wide drop-shadow-lg sm:text-[16px]  md:text-[18px] lg:text-[22px] xl:text-[28px]">
            {slide.tagline.toUpperCase()}
          </div>
          <span className="text-center text-[24px] font-medium drop-shadow-lg sm:text-[32px] md:text-[48px] lg:text-[52px] xl:text-[64px]">
            {slide.headline.toUpperCase()}
          </span>
          {slide.showButton && (
            <CtaButton className="mt-2 sm:mt-8" ctaSize="lg" asChild>
              <Link href={slide.path}>EXPLORE NOW</Link>
            </CtaButton>
          )}
        </Hero.Item>
      ))}
    </Hero>
  );
};
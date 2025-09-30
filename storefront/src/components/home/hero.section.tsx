"use client";

import type { JSX } from "react";
import { imageUrls } from "~/lib/imageUrls";
import { HeroCarousel } from "~/components/ui/hero";
import { CarouselItem } from "~/components/ui/carousel";
import { HeroContent } from "./hero.content";

export const HeroSection = (): JSX.Element => {
  return (
    <HeroCarousel>
      <CarouselItem className="relative h-full w-screen">
        <HeroContent
          imageSrc={imageUrls.heroOne}
          imageAlt="Custom-made saunas hero image"
          priority
          tagline="Commercial & Residential"
          headline="Custom-Made Saunas"
          showButton
          path="/products/saunas"
        />
      </CarouselItem>

      <CarouselItem className="relative h-full w-screen">
        <HeroContent
          imageSrc={imageUrls.heroTwo}
          imageAlt="Sauna equipment hero image"
          tagline="Eos Supplied"
          headline="Sauna Equipment"
          showButton
          path="/products/equipment"
        />
      </CarouselItem>

      <CarouselItem className="relative h-full w-screen">
        <HeroContent
          imageSrc={imageUrls.heroThree}
          imageAlt="Refreshing ice baths hero image"
          tagline="Wellness Retreat"
          headline="Refreshing Ice Baths"
          showButton
          path="/products/baths"
        />
      </CarouselItem>

      <CarouselItem className="relative h-full w-screen">
        <HeroContent
          imageSrc={imageUrls.heroFour}
          imageAlt="Pre-made saunas hero image"
          tagline="Trivial to assemble"
          headline="Pre-made Saunas"
          showButton
          path="/products/saunas"
        />
      </CarouselItem>
    </HeroCarousel>
  );
};
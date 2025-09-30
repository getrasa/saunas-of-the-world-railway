"use client";

import type { JSX } from "react";
import Link from "next/link";
import { CtaButton } from "~/components/ui/buttons/cta-button";
import { HeroSlide } from "~/components/ui/hero";

interface HeroContentProps {
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  tagline: string;
  headline: string;
  showButton: boolean;
  path: string;
}

export const HeroContent = (props: HeroContentProps): JSX.Element => {
  const { imageSrc, imageAlt, priority, tagline, headline, showButton, path } = props;
  
  return (
    <HeroSlide
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      priority={priority}
    >
      <div className="text-center text-[14px] font-medium tracking-wide drop-shadow-lg sm:text-[16px]  md:text-[18px] lg:text-[22px] xl:text-[28px]">
        {tagline.toUpperCase()}
      </div>
      <span className="text-center text-[24px] font-medium drop-shadow-lg sm:text-[32px] md:text-[48px] lg:text-[52px] xl:text-[64px]">
        {headline.toUpperCase()}
      </span>
      {showButton && (
        <CtaButton className="mt-2 sm:mt-8" ctaSize="lg" asChild>
          <Link href={path}>EXPLORE NOW</Link>
        </CtaButton>
      )}
    </HeroSlide>
  );
};
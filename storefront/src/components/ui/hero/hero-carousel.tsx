"use client";

import type { JSX, ReactNode } from "react";
import { createRef, useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { HeroSelector } from "./hero-selector";

interface HeroCarouselProps {
  children: ReactNode;
  aspectRatio?: string;
  autoplayDelay?: number;
  showSelector?: boolean;
  selectorPosition?: string;
  className?: string;
}

export const HeroCarousel = ({
  children,
  aspectRatio = "aspect-[10/8] sm:aspect-[12/8] lg:aspect-[16/8] xl:aspect-[20/8]",
  autoplayDelay = 8000,
  showSelector = true,
  selectorPosition = "bottom-8",
  className = "",
}: HeroCarouselProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [pause, setPause] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const sliderDivRef = createRef<HTMLDivElement>();
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
    setSlideCount(api.scrollSnapList().length);
    const onSelect = () => setCurrentSlide(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    timer.current = setInterval(() => {
      if (!pause) {
        const nextIndex = (api.selectedScrollSnap() + 1) % api.scrollSnapList().length;
        api.scrollTo(nextIndex);
      }
    }, autoplayDelay);
    return () => {
      if (timer.current !== null) clearInterval(timer.current);
    };
  }, [api, pause, autoplayDelay]);

  return (
    <div
      ref={sliderDivRef}
      className={`${aspectRatio} w-screen ${className}`}
      style={{ overflowX: "hidden", position: "relative" }}
    >
      <Carousel
        className="h-full w-screen [&_[data-slot=carousel-content]]:h-full"
        opts={{ loop: true }}
        plugins={[
          Autoplay({ delay: autoplayDelay, stopOnInteraction: true, stopOnMouseEnter: true }),
        ]}
        setApi={setApi}
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        <CarouselContent className="h-full">
          {children}
        </CarouselContent>
      </Carousel>
      {showSelector && slideCount > 0 && (
        <div className={`absolute ${selectorPosition} left-0 flex w-full justify-center`}>
          <HeroSelector
            count={slideCount}
            current={currentSlide}
            onClickItem={(idx: number) => api?.scrollTo(idx)}
          />
        </div>
      )}
    </div>
  );
};

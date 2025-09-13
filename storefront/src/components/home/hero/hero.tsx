"use client";

import type { JSX } from "react";
import { createRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { imageUrls } from "~/lib/imageUrls";
import { HeroContent } from "./hero.content";
import { HeroSelector } from "./hero.selector";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const Hero = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [pause, setPause] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const sliderDivRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
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
    }, 8000);
    return () => {
      if (timer.current !== null) clearInterval(timer.current);
    };
  }, [api, pause]);

  return (
    <div
      ref={sliderDivRef}
      className="aspect-[10/8] w-screen sm:aspect-[12/8] lg:aspect-[16/8] xl:aspect-[20/8]"
      style={{ overflowX: "hidden", position: "relative" }}
    >
      <Carousel
        className="h-full w-screen [&_[data-slot=carousel-content]]:h-full"
        opts={{ loop: true }}
        plugins={[
          Autoplay({ delay: 8000, stopOnInteraction: true, stopOnMouseEnter: true }),
        ]}
        setApi={setApi}
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        <CarouselContent className="h-full">
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
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-8 left-0 flex w-full justify-center">
        <HeroSelector
          count={4}
          current={currentSlide}
          onClickItem={(idx: number) => api?.scrollTo(idx)}
        />
      </div>
    </div>
  );
};



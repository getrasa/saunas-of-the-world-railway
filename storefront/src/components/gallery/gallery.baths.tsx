"use client";

import React, { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { imageUrls } from "~/lib/imageUrls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/lib/components/ui/tabs";
import { Photo } from "./photo";
import { useSearchParams } from "next/navigation";

export interface BathsGallerySectionProps {}

export const BathsGallerySection: React.FC<BathsGallerySectionProps> = () => {
  const searchParams = useSearchParams();
  const shouldScrollToSelf = searchParams.get("category") === "ice-baths";

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const executeScroll = () =>
    scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    if (shouldScrollToSelf) {
      executeScroll();
    }
  }, [shouldScrollToSelf]);

  const title = "Ice Baths";
  const description = `Immerse yourself in the transformative benefits of our Ice Baths, featuring
  a best materials for durability and aesthetics and advanced chiller system
  that cools the water to 3 degrees, offering an invigorating and holistic
  wellness solution. Embrace the chill, redefine well-being, and let our Ice
  Baths elevate your cold water immersion journey.`;
  return (
    <div id="baths" ref={scrollRef}>
      <div className="flex flex-col justify-center text-black">
        <span className="f-title">{title}</span>
        <span className="py-6 leading-7 sm:leading-9">{description}</span>
      </div>

      <Tabs defaultValue="ice-baths">
        <TabsList className="grid w-full grid-cols-1 ">
          <TabsTrigger value="ice-baths">Ice Baths</TabsTrigger>
        </TabsList>

        <TabsContent value="ice-baths">
          <GallerySection
            photos={[
              imageUrls.ib2,
              imageUrls.ib12,
              imageUrls.ib1,
              imageUrls.ib3,
              imageUrls.ib4,
              imageUrls.ib5,
              imageUrls.ib6,
              imageUrls.ib7,
              imageUrls.ib8,
              imageUrls.ib9,
              imageUrls.ib10,
              imageUrls.ib11,
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export interface GallerySectionProps {
  photos: string[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  return (
    <div className="h-[500px]">
      <Carousel>
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={index} className="basis-auto pl-1">
              <Photo path={photo}>
                <img loading="lazy" src={photo} alt={`Ice bath ${index + 1}`} className="h-[500px]" />
              </Photo>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

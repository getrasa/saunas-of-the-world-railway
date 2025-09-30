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

export interface InfraredGallerySectionProps {}

export const InfraredGallerySection: React.FC<
  InfraredGallerySectionProps
> = () => {
  const searchParams = useSearchParams();
  const shouldScrollToSelf = searchParams.get("category") === "infrared";

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const executeScroll = () =>
    scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    if (shouldScrollToSelf) {
      executeScroll();
    }
  }, [shouldScrollToSelf]);

  const title = "Infrared Saunas";
  const description =
    "Elevate your relaxation experience with our Infrared Saunas, where your vision meets our expert craftsmanship. Craft your dream sanctuary with limitless design possibilities, immersing yourself in the soothing warmth of infrared heat. Where innovation meets indulgence.";
  return (
    <div id="infrared" ref={scrollRef}>
      <div className="flex flex-col justify-center text-black">
        <span className="f-title">{title}</span>
        <span className="py-6 leading-7 sm:leading-9">{description}</span>
      </div>

      <Tabs defaultValue="tri-sauna">
        <TabsList className="grid h-fit w-full grid-cols-1 sm:grid-cols-2">
          <TabsTrigger value="tri-sauna">
            The TriSauna Oasis with Ice Immersion
          </TabsTrigger>
          <TabsTrigger value="tranquil-sauna">Tranquil Tri Sauna</TabsTrigger>
        </TabsList>

        <TabsContent value="tri-sauna">
          <GallerySection
            photos={[
              imageUrls.triSauna1,
              imageUrls.triSauna3,
              imageUrls.triSauna4,
            ]}
          />
        </TabsContent>
        <TabsContent value="tranquil-sauna">
          <GallerySection
            photos={[
              imageUrls.tranquilSauna1,
              imageUrls.tranquilSauna2,
              imageUrls.tranquilSauna3,
              imageUrls.tranquilSauna4,
              imageUrls.tranquilSauna5,
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
                <img loading="lazy" src={photo} alt={`Infrared sauna ${index + 1}`} className="h-[500px]" />
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

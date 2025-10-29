"use client";

import React, { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/lib/components/ui/tabs";
import { Photo } from "./photo";
import { useSearchParams } from "next/navigation";
import type { GallerySectionData } from "~/lib/data/gallery-page";

interface GallerySectionProps {
  section: GallerySectionData;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ section }) => {
  const searchParams = useSearchParams();
  const shouldScrollToSelf = searchParams.get("category") === section.sectionId;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const executeScroll = () =>
    scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    if (shouldScrollToSelf) {
      executeScroll();
    }
  }, [shouldScrollToSelf]);

  if (!section.imageGroups || section.imageGroups.length === 0) {
    return null;
  }

  // Generate tab value from name (lowercase, replace spaces with hyphens)
  const getTabValue = (name: string) => 
    name.toLowerCase().replace(/\s+/g, '-');

  const defaultTab = section.imageGroups[0] ? getTabValue(section.imageGroups[0].name) : '';

  return (
    <div id={section.sectionId} ref={scrollRef}>
      <div className="flex flex-col justify-center text-black">
        <span className="f-title">{section.title}</span>
        <span className="py-6 leading-7 sm:leading-9">{section.description}</span>
      </div>

      <Tabs defaultValue={defaultTab}>
        <TabsList className={`grid h-fit w-full grid-cols-1 ${
          section.imageGroups.length === 2 ? 'sm:grid-cols-2' :
          section.imageGroups.length === 3 ? 'sm:grid-cols-2 md:grid-cols-3' :
          section.imageGroups.length === 4 ? 'sm:grid-cols-2 md:grid-cols-4' :
          section.imageGroups.length > 4 ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
          ''
        }`}>
          {section.imageGroups.map((group, index) => (
            <TabsTrigger key={index} value={getTabValue(group.name)}>
              {group.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {section.imageGroups.map((group, groupIndex) => (
          <TabsContent key={groupIndex} value={getTabValue(group.name)}>
            <div className="h-[500px]">
              <Carousel>
                <CarouselContent>
                  {group.photos.map((photo, photoIndex) => (
                    <CarouselItem key={photoIndex} className="basis-auto pl-1">
                      <Photo path={photo.url}>
                        <img 
                          loading="lazy" 
                          src={photo.url} 
                          alt={photo.alt} 
                          className="h-[500px]" 
                        />
                      </Photo>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};


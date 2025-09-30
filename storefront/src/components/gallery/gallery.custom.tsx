"use client";

import React from "react";
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

export interface CustomBuiltSaunaGallerySectionProps {}

export const CustomBuiltSaunaGallerySection: React.FC<
  CustomBuiltSaunaGallerySectionProps
> = () => {
  const title = "Custom-Built Saunas";
  const description =
    "Unleash Your Imagination and Craft Your Dream Sauna: Where Your Vision Meets Our Expert Craftsmanship. Embark on the Journey to Create Your Ultimate Personal Retreat with Saunas of the World. Let Your Ideas Soar. There Are No Limits to What We Can Achieve Together.";
  return (
    <div id="custom-built-saunas">
      <div className="flex flex-col justify-center text-black">
        <span className="f-title">{title}</span>
        <span className="py-6 leading-7 sm:leading-9">{description}</span>
      </div>

      <Tabs defaultValue="majestic-mantion">
        <TabsList className="grid h-fit w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="majestic-mantion">
            Majestic Sauna Mansion
          </TabsTrigger>
          <TabsTrigger value="cozy-retreat">Cozy Retreat</TabsTrigger>
          <TabsTrigger value="exquisit-heaven">
            Exquisite Sauna Heaven
          </TabsTrigger>
          <TabsTrigger value="zen-package">Zen Package</TabsTrigger>
        </TabsList>
        <TabsContent value="majestic-mantion">
          <GallerySection
            photos={[
              imageUrls.majesticSauna1,
              imageUrls.majesticSauna2,
              imageUrls.majesticSauna3,
              imageUrls.majesticSauna4,
            ]}
          />
        </TabsContent>
        <TabsContent value="cozy-retreat">
          <GallerySection
            photos={[
              imageUrls.cozyAspen1,
              imageUrls.cozyAspen2,
              imageUrls.cozyAspen3,
              imageUrls.cozyAspen4,
            ]}
          />
        </TabsContent>
        <TabsContent value="exquisit-heaven">
          <GallerySection
            photos={[
              imageUrls.exquisiteSauna1,
              imageUrls.exquisiteSauna2,
              imageUrls.exquisiteSauna3,
              imageUrls.exquisiteSauna4,
            ]}
          />
        </TabsContent>
        <TabsContent value="zen-package">
          <GallerySection
            photos={[
              imageUrls.zenSauna1,
              imageUrls.zenSauna2,
              imageUrls.zenSauna3,
              imageUrls.zenSauna4,
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
                <img loading="lazy" src={photo} alt={`Gallery item ${index + 1}`} className="h-[500px]" />
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

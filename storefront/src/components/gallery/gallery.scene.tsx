"use client";

import React from "react";
import {
  BathsGallerySection,
} from "./gallery.baths";
import {
  CustomBuiltSaunaGallerySection,
} from "./gallery.custom";
import {
  InfraredGallerySection,
} from "./gallery.infrared";

export interface GallerySceneProps {}

export const GalleryScene: React.FC<GallerySceneProps> = () => {
  return (
    <div className="container flex flex-col gap-32 py-16">
      <CustomBuiltSaunaGallerySection />
      <BathsGallerySection />
      <InfraredGallerySection />
    </div>
  );
};

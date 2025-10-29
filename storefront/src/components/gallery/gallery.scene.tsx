import React from "react";
import { GallerySection } from "./gallery-section";
import { getGalleryPageData } from "~/lib/data/gallery-page";

export const GalleryScene = async () => {
  const { sections } = await getGalleryPageData();

  return (
    <div className="container flex flex-col gap-32 py-16">
      {sections.map((section, index) => (
        <GallerySection key={index} section={section} />
      ))}
    </div>
  );
};

"use client";


import ContactUs from "~/components/ui/contact-us/contact-us";
import React from "react";
import ProductHero from "../shared/product-hero";
import HorizontalProduct from "../shared/horizontal-product";
import { imageUrls } from "~/lib/imageUrls";

export interface MaterialsSceneProps {}

export const MaterialsScene: React.FC<MaterialsSceneProps> = () => {
  return (
    <>
      <ProductHero
        title="Materials & Accessories"
        imagePath={imageUrls.materialsHero}
      />
      <div className="h-[50px]" />
      <HorizontalProduct
        variant="left"
        title="SAUNA BUILDING MATERIALS"
        description="Timber, aluminium foil, lampshades, ventilation grills. Explore our premium selection of top-notch building materials. Whether
        you're crafting a personal sanctuary or creating a dream sauna for a client,
        we have everything you need for an unparalleled experience. Share your
        wishlist, and let us help you with the project."
        imagePath={imageUrls.buildingMaterials}
        imageAlt="Sauna Building Materials"
      />
      <HorizontalProduct
        variant="right"
        title="SAUNA & STEAM ROOM DOORS"
        description="Embarking on a journey to create or renovate your sauna or steam room? Elevate your space with our selection of doors. Choose from our curated stock, or let us craft a custom door that perfectly complements your vision. Your sauna, your style – we've got you covered!"
        imagePath={imageUrls.saunaDoors}
        imageAlt="Sauna & Steam Room Doors"
      />
      <HorizontalProduct
        variant="left"
        title="SAUNA LIGHTS & STEREO"
        description="Illuminate and harmonize your sauna or steam room experience with our captivating selection of lights and cutting-edge sound systems. Select from our premium stock or reach out for tailored solution to add a perfect blend of ambiance and technology – your oasis, your way."
        imagePath={imageUrls.saunaLights}
        imageAlt="Sauna Lights & Stereo"
      />
      <HorizontalProduct
        variant="right"
        title="SAUNA BUCKETS"
        description="Transform your sauna experience with our exquisite accessories. Refresh your senses with our invigorating shower buckets or add a touch of tradition with our artisan-crafted sauna buckets and ladles. Elevate your relaxation ritual with a stylish sand timer, ensuring every moment is perfectly timed. Explore our collection of sauna accessories – because every detail matters in creating your perfect retreat."
        imagePath={imageUrls.buckets}
        imageAlt="Sauna Buckets"
      />
      <div className="h-[120px]" />
      <ContactUs />
    </>
  );
};

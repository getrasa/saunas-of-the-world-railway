"use client";


import ContactUs from "../ui/contact-us/contact-us";
import React from "react";
import ProductHero from "../products/shared/product-hero";
import { imageUrls } from "~/lib/imageUrls";
import HorizontalProduct, { ProductSide } from "../products/shared/horizontal-product";

export interface ServicesSceneProps {}

export const ServicesScene: React.FC<ServicesSceneProps> = () => {
  return (
    <>
      <ProductHero title="Services" imagePath={imageUrls.servicesHero} />
      <div className="h-[50px]" />
      <HorizontalProduct
        variant={ProductSide.Left}
        title="REFURBISHMENT"
        description="Revitalize your sauna experience with our expert refurbishment services! Whether it's functionality, aesthetics, or a contemporary makeover you're after, we've got the expertise. Let us take care of every detail, transforming your existing sauna into a haven of comfort and style. Trust us to bring innovation to your space, creating a refreshed retreat for you and other users to enjoy."
        imagePath={imageUrls.beforeAfter}
        imageAlt="Refurbishment"
      />
      <HorizontalProduct
        variant={ProductSide.Right}
        title="MAINTENANCE"
        description="Elevate your sauna experience with our essential maintenance services. We prioritize preserving the quality and performance of your beloved sauna, ensuring users enjoy a consistently safe, clean, and rejuvenating experience. Our expert team goes beyond routine upkeep, proactively identifying and addressing potential issues before they become significant problems. Entrust us with your sauna's well-being, and let our dedicated professionals maintain its comfort and serenity for an uninterrupted sanctuary of relaxation."
        imagePath={imageUrls.maintenance}
        imageAlt="Maintenance"
      />
      <HorizontalProduct
        variant={ProductSide.Left}
        title="INSPECTIONS & REPORTS"
        description="Is your sauna experiencing unexpected issues? Fear not – our expert team is ready to swing into action! Let us take the reins and conduct a thorough investigation into the heart of the matter. We don't just fix problems; we provide you with a detailed report on our findings and offer recommendations tailored to breathe new life into your sauna. Don't let a malfunctioning sauna dampen your relaxation plans – contact us today, and let's get your personal oasis back to its revitalized best!"
        imagePath={imageUrls.inspection}
        imageAlt="Inspections & Reports"
        stretchHorizontally
      />
      <div className="h-[120px]" />
      <ContactUs />
    </>
  );
};

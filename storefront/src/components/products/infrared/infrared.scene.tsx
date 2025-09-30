"use client";


import ContactUs from "~/components/ui/contact-us/contact-us";
import { HealthWellbeing } from "../shared/health-wellbeing";
import React from "react";
import ProductHero from "../shared/product-hero";
import HorizontalProduct, { ProductSide } from "../shared/horizontal-product";
import { imageUrls } from "~/lib/imageUrls";

export interface InfraredSceneProps {}

export const InfraredScene: React.FC<InfraredSceneProps> = () => {
  return (
    <>
      <ProductHero title="Infrared" imagePath={imageUrls.infraredHero} />
      <div className="h-[50px]" />
      <HorizontalProduct
        variant={ProductSide.Left}
        title="CUSTOM-MADE INFRARED ROOMS"
        description="Elevate your relaxation experience with our Infrared Saunas, where your
            vision meets our expert craftsmanship. Craft your dream sanctuary with
            limitless design possibilities, immersing yourself in the soothing warmth of
            infrared heat. Where innovation meets indulgence."
        imagePath={imageUrls.customInfraredRooms}
        imageAlt="Custom-Made Infrared Rooms"
        buttonHref="/gallery?category=infrared"
      />
      <HorizontalProduct
        variant={ProductSide.Right}
        title="PREFARICATED INFRARED ROOMS"
        description="Elevate your home with sophistication and simplicity through our premade
            Hemlock Infrared Saunas. Embrace a touch of class as the natural beauty
            of Hemlock wood graces your space, creating a refined sanctuary.
            Experience the numerous benefits of red light exposure, seamlessly
            integrated into the design, as our infrared saunas add the perfect final
            touch to your home."
        imagePath={imageUrls.prefabricated_infrared_rooms}
        imageAlt="Prefabricated Infrared Rooms"
        buttonHref="/gallery?category=infrared"
      />
      <HorizontalProduct
        variant={ProductSide.Left}
        title="IR PANELS AND CONTROL UNITS"
        description="Infrared radiator for private and commercial sauna and IR warming cabins.
            Full spectre IR radiator with durable housing, pre-mounted cable
            and protective grill. With special ceramic glass filter for additional
            dispersion of the infrared heat and humidity protection."
        imagePath={imageUrls.irPanels}
        imageAlt="IR Panels and Control Units"
        buttonHref="/gallery?category=infrared"
      />
      <div className="h-[50px]" />
      <HealthWellbeing
        title="Infrared saunas offer a range of health and wellness benefits."
        points={[
          <span key={1}>
            Infrared saunas provide a peaceful retreat from everyday stress,
            with their gentle heat enveloping the body to soothe and relax both
            the mind and the muscles.
          </span>,
          <span key={2}>
            The calming warmth of infrared rays penetrates deeply, reducing
            tension in muscles and joints while promoting a profound sense of
            tranquility and relaxation.
          </span>,
          <span key={3}>
            Improved blood circulation is a key health benefit of regular
            infrared sauna use, as the warm environment supports the body&apos;s
            detoxification pathways and contributes to overall well-being.
          </span>,
          <span key={4}>
            As the radiant heat from the sauna encourages perspiration, it helps
            to purify the skin, leading to rejuvenation and the revitalization
            of skin cells for a healthier, more radiant complexion.
          </span>,
        ]}
      />
      <div className="h-[120px]" />
      <ContactUs />
    </>
  );
};

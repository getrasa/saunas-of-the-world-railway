"use client";

import React from "react";
import ProductHero from "../shared/product-hero";
import HorizontalProduct, { ProductSide } from "../shared/horizontal-product";
import { HealthWellbeing } from "../shared/health-wellbeing";
import ContactUs from "~/components/ui/contact-us/contact-us";
import { imageUrls } from "~/lib/imageUrls";

export interface BathsSceneProps {}

export const BathsScene: React.FC<BathsSceneProps> = () => {
  return (
    <>
      <ProductHero
        title="Refreshing Ice Baths"
        imagePath={imageUrls.bathsHero}
      />
      <div className="h-[50px]" />
      <HorizontalProduct
        variant={ProductSide.Left}
        title="Ice Baths"
        description="Immerse yourself in the transformative benefits of our Ice Baths, featuring
            a best materials for durability and aesthetics and advanced chiller system
            that cools the water to 3 degrees, offering an invigorating and holistic
            wellness solution. Embrace the chill, redefine well-being, and let our Ice
            Baths elevate your cold water immersion journey."
        imagePath={imageUrls.iceBaths}
        imageAlt="Ice Baths"
        buttonHref="/gallery?category=ice-baths"
      />
      <HealthWellbeing
        title="Ice baths offer a range of health and wellness benefits."
        points={[
          <span key={1}>
            They reduce inflammation and expedite recovery post-exercise by
            causing blood vessels to constrict, which helps{" "}
            <b>alleviate muscle soreness</b>.
          </span>,
          <span key={2}>
            Regular cold water immersion can{" "}
            <b>enhance circulation and heart health</b> by making the heart pump
            more efficiently.
          </span>,
          <span key={3}>
            The extreme cold triggers endorphin release, which{" "}
            <b>boosts mood, reduces stress, and can numb pain</b>, benefiting
            those with arthritis or injuries.
          </span>,
          <span key={4}>
            Cold exposure may <b>strengthen the immune system</b>, improve
            sleep, and aid weight management by activating brown fat cells.
          </span>,
        ]}
      />
      <div className="h-[120px]" />
      <ContactUs />
    </>
  );
};

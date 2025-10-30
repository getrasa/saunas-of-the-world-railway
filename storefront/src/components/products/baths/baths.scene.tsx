import React from "react";
import ProductHero from "../shared/product-hero";
import HorizontalProduct from "../shared/horizontal-product";
import { HealthWellbeing } from "../shared/health-wellbeing";
import ContactUs from "~/components/ui/contact-us/contact-us";
import { getBathsPageData } from "~/lib/data/product-page";

export const BathsScene = async () => {
  const { hero, products, healthWellbeing } = await getBathsPageData();

  return (
    <>
      {hero && (
        <ProductHero
          title={hero.title}
          imagePath={hero.imageUrl}
          brightness={hero.brightness}
        />
      )}
      <div className="h-[50px]" />
      {products.map((product, index) => (
        <HorizontalProduct
          key={index}
          variant={product.variant}
          title={product.title}
          description={product.description}
          imagePath={product.imageUrl}
          imageAlt={product.title}
          showButton={product.showButton}
          buttonText={product.buttonText}
          buttonHref={product.buttonHref}
          openInNewTab={product.openInNewTab}
        />
      ))}
      {healthWellbeing && (
        <HealthWellbeing
          title={healthWellbeing.title}
          points={healthWellbeing.benefits}
        />
      )}
      <div className="h-[120px]" />
      <ContactUs />
    </>
  );
};

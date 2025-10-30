import ContactUs from "../ui/contact-us/contact-us";
import React from "react";
import ProductHero from "../products/shared/product-hero";
import HorizontalProduct from "../products/shared/horizontal-product";
import { getServicesPageData } from "~/lib/data/services-page";

export const ServicesScene = async () => {
  const { hero, products } = await getServicesPageData();

  return (
    <>
      {hero && (
        <ProductHero title={hero.title} imagePath={hero.imageUrl} brightness={hero.brightness} />
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
          stretchHorizontally={product.stretchHorizontally}
          showButton={product.showButton}
          buttonText={product.buttonText}
          buttonHref={product.buttonHref}
          openInNewTab={product.openInNewTab}
        />
      ))}
      <div className="h-[120px]" />
      <ContactUs />
    </>
  );
};

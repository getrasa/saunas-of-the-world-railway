import type { JSX } from "react";
import { imageUrls } from "~/lib/imageUrls";
import { ProductItem } from "./our-offering.item";

export const OurOffering = (): JSX.Element => {
  return (
    <section className="flex w-full justify-center gap-4 bg-white py-[92px] text-[16px]">
      <div className="container flex flex-col pb-12">
        <span className="py-4 text-[20px]">OUR OFFERING</span>
        <div className="grid w-full grid-cols-12 gap-2">
          <ProductItem
            label="Saunas"
            imgPath={imageUrls.offering1}
            href="/products/saunas"
          />
          <ProductItem
            label={`Ice Baths`}
            imgPath={imageUrls.offering2}
            href="/products/baths"
          />
          <ProductItem
            label="Infrared"
            imgPath={imageUrls.offering3}
            href="/products/infrared"
          />
          <ProductItem
            label={`Sauna &\nSteam Room Equipment`}
            imgPath={imageUrls.offering4}
            href="/products/equipment"
          />
          <ProductItem
            label="Materials & Accessories"
            imgPath={imageUrls.offering5}
            href="/products/materials"
          />
          <ProductItem
            label="Residential & Commercial Services"
            imgPath={imageUrls.offering6}
            href="/services"
          />
        </div>
      </div>
    </section>
  );
};

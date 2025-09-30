import React from "react";
import ProductHero from "../shared/product-hero";
import HorizontalProduct, { ProductSide } from "../shared/horizontal-product";
import ContactUs from "~/components/ui/contact-us/contact-us";
import { imageUrls } from "~/lib/imageUrls";

export interface EquipmentSceneProps {}

export const EquipmentScene: React.FC<EquipmentSceneProps> = () => {
  return (
    <>
      <ProductHero
        title="Sauna & Steam Room Equipment"
        imagePath={imageUrls.equipmentHero}
      />
      <div className="h-[50px]" />
      <HorizontalProduct
        variant={ProductSide.Left}
        title="ELECTRIC SAUNA HEATERS"
        description="Discover unparalleled relaxation with our sleek electric sauna heaters.
            Designed for both private and commercial spaces, these heaters blend
            efficiency with elegance. Experience swift, reliable heating, customizable
            controls, and eco-friendly design."
        imagePath={imageUrls.electricSaunaHeater}
        imageAlt="Electric Sauna Heaters"
      />
      <HorizontalProduct
        variant={ProductSide.Right}
        title="WOOD BURN SAUNA HEATERS"
        description="Immerse yourself in cozy warmth with our stylish wood-burning heaters,
            perfect for private retreats or commercial spaces. Crafted for durability,
            these heaters effortlessly combine rustic charm with modern functionality.
            Redefine your space and enjoy the natural allure of wood-burning warmth."
        imagePath={imageUrls.woodSaunaHeater}
        imageAlt="Wood Burn Sauna Heaters"
      />
      <HorizontalProduct
        variant={ProductSide.Left}
        title="STEAM GENERATORS"
        description="Immerse yourself in the epitome of well-being and relaxation with the state-
            of-the-art steam generators from us. Perfect for creating a spa-like
            ambiance in the comfort of your home or enhancing commercial spa
            settings, these generators invite you to let the warm steam caress your
            senses."
        imagePath={imageUrls.steamGenerators}
        imageAlt="Steam Generators"
      />
      <HorizontalProduct
        variant={ProductSide.Right}
        title="CONTROL UNITS"
        description="Sauna heaters and infrared panels require control units to ensure a
            seamless sauna experience. With intuitive controls, managing your sauna
            becomes effortless, allowing you to fully immerse yourself in relaxation.
            Regardless of the sauna type, the control units facilitate optimal interaction,
            leaving nothing to chance. Control temperature, light, sound, steam, and
            fragrances with ease, setting a new standard for both private and
            commercial sauna enjoyment."
        imagePath={imageUrls.controlUnit}
        imageAlt="Control Units"
      />
      <div className="h-[120px]" />
      <ContactUs />
    </>
  );
};

"use client";


import ProductHero from "../shared/product-hero";
import { ProductShowcase, ProductSide } from "../shared/product-showcase";
import { HealthWellbeing } from "../shared/health-wellbeing";
import { KeyConsiderations } from "../shared/key-considerations";
import ContactUs from "~/components/ui/contact-us/contact-us";
import { imageUrls } from "~/lib/imageUrls";

export const SaunasScene = () => {
  const healthBenefits = [
    <span key={1}>
      They promote relaxation by increasing circulation and releasing
      <b> endorphins, reducing stress and improving sleep quality.</b>
    </span>,
    <span key={2}>
      The heat and steam can help with
      <b> muscle relaxation and pain relief</b>, making saunas
      beneficial for sore muscles and arthritis.
    </span>,
    <span key={3}>
      Saunas also aid in <b>detoxification</b> by promoting sweating,
      which can remove toxins from the body.
    </span>,
    <span key={4}>
      Regular sauna use has been linked to improved
      <b>
        {" "}
        cardiovascular health, enhanced skin health, and a
        strengthened immune system,
      </b>{" "}
      making it a valuable addition to a holistic wellness routine.
    </span>,
  ];

  return (
    <>
      <ProductHero 
        title="Saunas" 
        imagePath={imageUrls.saunasHero}
      />
      
      <div className="h-[50px]" />
      
      <ProductShowcase
        variant={ProductSide.Left}
        title="Custom-Built Saunas"
        description="Unleash Your Imagination and Craft Your Dream Sauna: Where Your Vision Meets Our Expert Craftsmanship. Embark on the Journey to Create Your Ultimate Personal Retreat with Saunas of the World. Let Your Ideas Soar. There Are No Limits to What We Can Achieve Together."
        imagePath={imageUrls.customBuiltSaunas}
        imageAlt="Custom-Built Saunas"
        buttonHref="/products/saunas/custom-built-saunas"
      />
      
      <ProductShowcase
        variant={ProductSide.Right}
        title="PRE-MADE SAUNAS"
        description="Experience Unmatched Sauna Quality and Longevity. Our dedication to exceptional craftsmanship ensures your sauna will provide years of enjoyment. Crafted from the finest materials and powered by world-class heaters, our saunas guarantee worry-free relaxation and are suitable for indoor and outdoor use."
        imagePath={imageUrls.premadeSaunas}
        imageAlt="Pre-made Saunas"
        buttonHref="/products/saunas/pre-made-saunas"
      />
      
      <div className="h-[50px]" />
      
      <HealthWellbeing
        title="Saunas offer a range of health and wellness benefits."
        points={healthBenefits}
      />
      
      <div className="h-[100px]" />
      
      <KeyConsiderations />
      
      <div className="h-[120px]" />
      
      <ContactUs />
    </>
  );
};

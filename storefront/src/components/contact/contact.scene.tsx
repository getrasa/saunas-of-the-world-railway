"use client";

import React from "react";
import ProductHero from "../products/shared/product-hero";
import { imageUrls } from "~/lib/imageUrls";
import ContactUs from "../ui/contact-us/contact-us";
import { Briefcase, Phone, Clock } from "lucide-react";

export interface ContactSceneProps {}

export const ContactScene: React.FC<ContactSceneProps> = () => {
  return (
    <>
      <ProductHero title="Contact Us" imagePath={imageUrls.contactHero} />
      <div className="col-span-12 bg-black py-4 text-white sm:col-span-6 lg:col-span-4">
        <div className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-8">
          <div className="flex items-center gap-3">
            <Briefcase size={18} />
            <span>PO Box 249 Nerang QLD 4211</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} />
            <span>+61 422-062-294</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} />
            <span>Mon-Sat by appointment only</span>
          </div>
        </div>
      </div>

      <ContactUs />
      <div className="h-[1px] bg-zinc-200" />

      <div className="h-8" />
      <div className="h-[1px] bg-zinc-200" />
      <iframe
        src="https://www.google.com/maps/embed/v1/place?q=68%20Mount%20Nathan%20Rd%2C%20Nerang%20QLD%204211&key=AIzaSyBit9bmzue7GaKAGqtgfN8Tp9pxfHrUmNw"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
      ></iframe>
      <div className="h-[1px] bg-zinc-200" />
      <div className="h-8" />
    </>
  );
};

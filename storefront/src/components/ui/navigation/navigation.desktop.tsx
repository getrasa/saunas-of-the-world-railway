"use client";

import Link from "next/link";
import useTopbarHeightRegulator from "./useTopbarHeightRegulator";
import { imageUrls } from "~/lib/imageUrls";
import React from "react";

const productTypes: IProductType[] = [
  { name: "Saunas", imagePath: imageUrls.productSaunas, px: 8, href: "/products/saunas" },
  { name: "Ice Baths", imagePath: imageUrls.productTubs, href: "/products/baths" },
  { name: "Infrared", imagePath: imageUrls.productInfrared, href: "/products/infrared" },
  { name: "Equipment", imagePath: imageUrls.productHeater, href: "/products/equipment" },
  { name: "Materials & Accessories", imagePath: imageUrls.productMaterials, href: "/products/materials" },
];

export const NavigationDesktop = (props: { isTop: boolean }) => {
  const { isTop } = props;
  return (
    <div className="flex text-[15px] font-medium tracking-wider" style={{ height: isTop ? undefined : "100%" }}>
      <MenuButton text="PRODUCTS" menu={productTypes} />
      <MenuButton text="SERVICES" dest="/services" />
      <MenuButton text="GALLERY" dest="/gallery" />
      <MenuButton text="COMPANY" dest="/about" />
      <MenuButton text="CONTACT" dest="/contact" />
    </div>
  );
};

interface IProductType {
  name: string;
  imagePath: string;
  px?: number;
  href?: string;
}

const MenuButton = (props: {
  text: string;
  dest?: string;
  menu?: IProductType[];
}) => {
  const { text, dest, menu } = props;
  const [isHovered, setIsHovered] = React.useState(false);
  const elRef = React.useRef<HTMLDivElement | null>(null);
  const { topbarHeight, isTop } = useTopbarHeightRegulator();

  return (
    <div
      className={`cursor-pointer px-5 py-4 ${isTop ? "hover:bg-[#F2F2F2]" : "hover:bg-[#FFFFFF]"} flex items-center transition-all duration-500 hover:text-[#000000] ${isTop ? "" : "decoration-[#E5AD03] decoration-2 underline-offset-8 hover:underline"}`}
      ref={elRef}
      onMouseEnter={() => setIsHovered(!!menu && true)}
      onMouseLeave={() => setIsHovered(!!menu && false)}
      style={{ height: isTop ? undefined : "100%" }}
      onClick={() => dest ? (window.location.href = dest) : undefined}
    >
      <span>{text}</span>
      <div
        style={{ top: topbarHeight, opacity: isHovered ? 100 : 0, pointerEvents: isHovered ? "auto" : "none" }}
        className="absolute left-0 flex  w-screen justify-center bg-[#F2F2F2] transition-opacity duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-wrap gap-4 px-4 py-8 md:max-w-7xl">
          {menu?.map((productType, idx) => (
            <ProductTypeItem key={idx} {...productType} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductTypeItem: React.FC<IProductType> = ({ name, imagePath, px, href }) => {
  return (
    <Link href={href ?? ""}>
      <div className="box-sizing-border flex h-[120px] w-[300px] gap-4 border-[#E5AD03] bg-white p-4 text-[14px] font-semibold uppercase hover:border-2 ">
        <img loading="lazy" src={imagePath} className="object-contain" style={{ paddingLeft: px, paddingRight: px, maxWidth: 80 }} />
        <span>{name}</span>
      </div>
    </Link>
  );
};



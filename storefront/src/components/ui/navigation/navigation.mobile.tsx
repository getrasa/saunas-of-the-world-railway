"use client";

import React from "react";
import Link from "next/link";
import useTopbarHeightRegulator from "./useTopbarHeightRegulator";

export interface NavigationMobileProps {
  menuOpen: boolean;
}

export const NavigationMobile: React.FC<NavigationMobileProps> = ({ menuOpen }) => {
  const { topbarHeight } = useTopbarHeightRegulator();
  return (
    <div
      className="flex w-full bg-white transition-all duration-300"
      style={{ height: menuOpen ? `calc(100vh - ${topbarHeight}px)` : 0 }}
    >
      <div
        className="flex h-full w-full items-center justify-center transition-all"
        style={{
          opacity: menuOpen ? 100 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transitionDuration: menuOpen ? "1s" : "0s",
          transitionDelay: menuOpen ? "100ms" : "0s",
        }}
      >
        <ul className="flex min-h-[250px] flex-col items-center justify-between">
          <MobileLinkItem title="Products">
            <MobileLinkItem title="Saunas" path="/products/saunas" secondary />
            <MobileLinkItem title="Ice Baths" path="/products/baths" secondary />
            <MobileLinkItem title="Infrared" path="/products/infrared" secondary />
            <MobileLinkItem title="Equipment" path="/products/equipment" secondary />
            <MobileLinkItem title="Materials & Accessories" path="/products/materials" secondary />
          </MobileLinkItem>
          <MobileLinkItem title="Services" path="/services" />
          <MobileLinkItem title="Gallery" path="/gallery" />
          <MobileLinkItem title="Company" path="/about" />
          <MobileLinkItem title="Contact" path="/contact" />
        </ul>
      </div>
    </div>
  );
};

const MobileLinkItem = (props: {
  title: string;
  path?: string;
  children?: React.ReactNode;
  secondary?: boolean;
}) => {
  const { title, path, children, secondary = false } = props;

  const item = (
    <li
      className={
        "my-8 cursor-pointer border-b border-gray-400 uppercase transition-all duration-300 hover:border-[#E5AD03]"
      }
      style={
        secondary
          ? { fontSize: 12, borderBottom: "none", marginTop: 4 }
          : {}
      }
    >
      {path && <Link href={path}>{title}</Link>}
      {!path && !children && <span>{title}</span>}
      {children && <label>{title}</label>}
    </li>
  );

  return (
    <>
      {item}
      <div className="flex flex-col items-center">
        {children}
      </div>
    </>
  );
};



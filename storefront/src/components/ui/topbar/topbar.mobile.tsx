"use client";

import Link from "next/link";
import React, { useState } from "react";
import useTopbarHeightRegulator from "../navigation/useTopbarHeightRegulator";
import HamburgerMenu from "./hamburger-menu";
import { NavigationMobile } from "../navigation/navigation.mobile";
import { imageUrls } from "~/lib/imageUrls";

export interface TopbarMobileProps {}

const TopbarMobile: React.FC<TopbarMobileProps> = ({}) => {
  const { topbarHeight } = useTopbarHeightRegulator();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div
        className="container flex h-28 w-screen items-center justify-between transition-all duration-300"
        style={{ height: topbarHeight }}
      >
        <Logo />
        <span>
          <HamburgerMenu open={menuOpen} setOpen={setMenuOpen} />
        </span>
      </div>
      <NavigationMobile menuOpen={menuOpen} />
    </>
  );
};

const Logo = () => {
  const { isTop } = useTopbarHeightRegulator();
  return (
    <Link href="/">
      <div style={{ height: (isTop ? 68 : 54) - 12 }} className="transition-all duration-300">
        <img loading="lazy" src={imageUrls.logo} className="h-full" />
      </div>
    </Link>
  );
};

export default TopbarMobile;



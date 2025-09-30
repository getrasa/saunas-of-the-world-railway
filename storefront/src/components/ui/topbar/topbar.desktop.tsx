"use client";

import Link from "next/link";
import React from "react";
import useTopbarHeightRegulator from "../navigation/useTopbarHeightRegulator";
import { imageUrls } from "~/lib/imageUrls";
import { NavigationDesktop } from "../navigation/navigation.desktop";
import TopbarActions from "./actions";

export interface TopbarDesktopProps {
  isStore?: boolean;
}

const TopbarDesktop: React.FC<TopbarDesktopProps> = ({ isStore = false }) => {
  const { topbarHeight, isTop } = useTopbarHeightRegulator();

  return (
    <div className={`${isStore ? 'max-w-[1512px]' : 'container'} flex h-28 w-screen items-center justify-between transition-all duration-300`} style={{ height: topbarHeight }}>
      <Logo />
      <div
        className={`flex h-full flex-col justify-between pt-4 text-[#4e4d4d] transition-all duration-500`}
        style={{
          justifyContent: isTop ? "space-between" : "center",
          paddingTop: isTop ? 16 : 0,
          boxSizing: "border-box",
        }}
      >
        {isTop ? <TopbarActions /> : <></>}
        <NavigationDesktop isTop={isTop} />
      </div>
    </div>
  );
};

const Logo = () => {
  const { isTop } = useTopbarHeightRegulator();
  return (
    <Link href="/">
      <div style={{ height: (isTop ? 68 : 54) - 0 }} className="transition-all duration-300">
        <img loading="lazy" src={imageUrls.logo} className="h-full" />
      </div>
    </Link>
  );
};

export default TopbarDesktop;



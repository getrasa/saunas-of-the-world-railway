"use client";

import React from "react";
import TopbarDesktop from "./topbar.desktop";
import TopbarMobile from "./topbar.mobile";

export interface TopbarProps {
  isStore?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ isStore = false }) => {

  if (isStore) {
    return (
      <header className="sticky top-0 z-40 flex w-screen border-b border-slate-300 bg-white text-[14px]">
        <div className="relative flex h-full w-full flex-col items-center">
          <div className="hidden lg:block">
            <TopbarDesktop isStore={isStore} />
          </div>
          <div className="block lg:hidden">
            <TopbarMobile />
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="sticky top-0 z-40 flex w-screen border-b border-slate-300 bg-white text-[14px]">
      <div className="relative flex h-full w-full flex-col items-center">
        <div className="hidden lg:block">
          <TopbarDesktop />
        </div>
        <div className="block lg:hidden">
          <TopbarMobile />
        </div>
      </div>
    </header>
  );
};

export default Topbar;



"use client";

import React from "react";
import Topbar from "../topbar/topbar";

export interface NavigationProps {
  isStore?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isStore = false }) => {
  return <Topbar isStore={isStore} />;
};

export default Navigation;



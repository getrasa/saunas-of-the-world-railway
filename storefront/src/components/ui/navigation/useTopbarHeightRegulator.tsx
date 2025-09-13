"use client";

import { useEffect, useState } from "react";

const useTopbarHeightRegulator = () => {
  const [isTop, setIsTop] = useState(true);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width ? width < 1024 : false;
  const topbarHeight = (isTop ? 124 : 86) - (isMobile ? (isTop ? 24 : 16) : 0);

  const checkDimensions = () => {
    window.scrollY < 100 && setIsTop(true);
    window.scrollY > 140 && setIsTop(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkDimensions);
    return () => {
      window.removeEventListener("scroll", checkDimensions);
    };
  }, []);

  return { topbarHeight, isTop, isMobile };
};

export default useTopbarHeightRegulator;



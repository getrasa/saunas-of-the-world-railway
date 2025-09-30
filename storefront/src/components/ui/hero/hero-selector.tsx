"use client";

import type { JSX } from "react";

interface HeroSelectorProps {
  count: number;
  current: number;
  onClickItem: (idx: number) => void;
}

export const HeroSelector = (props: HeroSelectorProps): JSX.Element => {
  const { count, current, onClickItem } = props;

  const getCircle = (idx: number, isCurrent: boolean) => {
    if (isCurrent) {
      return (
        <div
          key={idx}
          className="h-2.5 w-2.5 rounded-full border border-white bg-white"
        ></div>
      );
    }
    return (
      <div key={idx} onClick={() => onClickItem(idx)} className="cursor-pointer">
        <div className="h-2.5 w-2.5 rounded-full border border-white bg-white/30"></div>
      </div>
    );
  };
  const emptyArray = new Array(count).fill(null);
  return <div className="flex gap-4">{emptyArray.map((_, i) => getCircle(i, i === current))}</div>;
};

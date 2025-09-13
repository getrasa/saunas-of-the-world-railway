"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "./actions.searchbar";

const TopbarActions = () => {
  const [hoverFindUs, setHoverFindUs] = useState(false);
  return (
    <div className="flex items-center justify-end gap-6 tracking-widest">
      <SearchBar />
      <div
        onClick={() => window.open("https://maps.app.goo.gl/WMaiYnUyMasSxYB4A", "_blank")}
        className="flex cursor-pointer items-center gap-2 text-[12px] font-semibold"
        onMouseEnter={() => setHoverFindUs(true)}
        onMouseLeave={() => setHoverFindUs(false)}
      >
        <span className={hoverFindUs ? "underline underline-offset-4" : ""}>
          FIND US
        </span>
      </div>
      <Link className="flex items-center gap-2 text-[12px] font-semibold" href="/">
        EN
      </Link>
    </div>
  );
};

export default TopbarActions;



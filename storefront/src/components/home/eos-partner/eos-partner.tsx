import type { JSX } from "react";
import { imageUrls } from "~/lib/imageUrls";

export const EosPartnerSection = (): JSX.Element => {
  return (
    <div className="flex w-full items-center justify-center gap-2 bg-white px-3 py-4 sm:gap-4 sm:py-7">
      <img loading="lazy" src={imageUrls.eosFire} className="h-6 sm:h-8" />

      <span className="text-center">
        An <span className="font-bold">exlusive Australian EOS Partner</span>{" "}
        and distribution associate
      </span>
      <img loading="lazy" src={imageUrls.eosFire} className="h-6 sm:h-8" />
    </div>
  );
};

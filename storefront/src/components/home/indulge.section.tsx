import type { JSX } from "react";
import { imageUrls } from "~/lib/imageUrls";

export const Indulge = (): JSX.Element => {
  return (
    <section className="flex w-full justify-center gap-4 bg-[#f2f2f2] pt-6 pb-8 text-[16px] lg:py-16">
      <div className="container flex flex-col items-center gap-8 lg:flex-row lg:gap-32">
        <div className="h-fit w-full bg-black lg:w-1/2">
          <div className="aspect-[628/480] w-full bg-slate-500">
            <img
              loading="lazy"
              src={imageUrls.indulge}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center text-black lg:aspect-square lg:flex-1">
          <span className="text-[22px] lg:text-[26px]">
            Indulge in <span className="font-bold">Serenity</span> and{" "}
            <span className="font-bold">Luxury</span> with Your Private
            Relaxation Oasis
          </span>
          <span className="py-4 leading-7 sm:leading-9">
            {`Unveil the remarkable advantages of owning a personal sanctuary
            adorned with a state-of-the-art sauna and invigorating ice bath. A
            haven where relaxation unfolds effortlessly, right in the comfort of
            your own house. Elevate your property's value and desirability,
            setting it apart with this luxury feature. Alternatively, transform
            your oasis into an exclusive retreat for cherished moments with
            loved ones.`}
          </span>
        </div>
      </div>
    </section>
  );
};

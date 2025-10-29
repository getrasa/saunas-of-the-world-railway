import type { JSX } from "react";
import type { IndulgeData } from "~/lib/data/homepage";

interface IndulgeProps {
  data: IndulgeData | null;
}

export const Indulge = ({ data }: IndulgeProps): JSX.Element => {
  if (!data) {
    return <></>;
  }

  return (
    <section className="flex w-full justify-center gap-4 bg-[#f2f2f2] pt-6 pb-8 text-[16px] lg:py-16">
      <div className="container flex flex-col items-center gap-8 lg:flex-row lg:gap-32">
        <div className="h-fit w-full bg-black lg:w-1/2">
          <div className="aspect-[628/480] w-full bg-slate-500">
            <img
              loading="lazy"
              src={data.imageUrl}
              alt="Indulge section"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center text-black lg:aspect-square lg:flex-1">
          <span 
            className="text-[22px] lg:text-[26px]"
            dangerouslySetInnerHTML={{ __html: data.titleHtml }}
          />
          <span className="py-4 leading-7 sm:leading-9">
            {data.content}
          </span>
        </div>
      </div>
    </section>
  );
};

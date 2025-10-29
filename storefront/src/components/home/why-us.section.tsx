"use client";

import type { JSX } from "react";
import { useRouter } from "next/navigation";
import SquareButton from "~/components/ui/buttons/square-button";
import type { WhyUsData } from "~/lib/data/homepage";

interface WhyUsProps {
  data: WhyUsData | null;
}

export const WhyUs = ({ data }: WhyUsProps): JSX.Element => {
  const router = useRouter();

  if (!data) {
    return <></>;
  }

  return (
    <section className="flex w-full justify-center gap-4 bg-[#F2F2F2] pt-6 pb-8 lg:py-16">
        <div className="container flex flex-col-reverse items-center gap-8 lg:flex-row lg:gap-32">
          <div className="flex flex-col justify-center text-black lg:aspect-square lg:flex-1">
            <span className="text-[22px] lg:text-[26px]">{data.title.toUpperCase()}</span>
            <span className="py-6 leading-7 sm:leading-9">
              {data.content}
            </span>
            <div onClick={() => router.push("/about")}>
              <SquareButton text="LEARN MORE" black />
            </div>
          </div>
          <div className="h-fit w-full bg-black lg:w-1/2">
            <div className="aspect-[628/480] w-full bg-slate-500">
              <video
                controls
                poster={data.posterUrl}
                className="h-full w-full object-cover"
                src={data.videoUrl}
              ></video>
            </div>
          </div>
        </div>
    </section>
  );
};

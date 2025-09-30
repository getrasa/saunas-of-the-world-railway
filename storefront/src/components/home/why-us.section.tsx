"use client";

import type { JSX } from "react";
import { imageUrls } from "~/lib/imageUrls";
import { useRouter } from "next/navigation";
import SquareButton from "~/components/ui/buttons/square-button";

interface WhyUsProps {}

export const WhyUs = (_props: WhyUsProps): JSX.Element => {
  const router = useRouter();

  return (
    <section className="flex w-full justify-center gap-4 bg-[#F2F2F2] pt-6 pb-8 lg:py-16">
        <div className="container flex flex-col-reverse items-center gap-8 lg:flex-row lg:gap-32">
          <div className="flex flex-col justify-center text-black lg:aspect-square lg:flex-1">
            <span className="text-[22px] lg:text-[26px]">WHY CHOOSE US</span>
            <span className="py-6 leading-7 sm:leading-9">
              With over 25 years of experience in the European market, we
              specialize in manufacturing personalized saunas that add a touch
              of prestige to your property. Whether for domestic or commercial
              spaces, we commit ourselves to create visually appealing,
              user-friendly relaxation facilities tailored to your unique needs.
            </span>
            <div onClick={() => router.push("/about")}>
              <SquareButton text="LEARN MORE" black />
            </div>
          </div>
          <div className="h-fit w-full bg-black lg:w-1/2">
            <div className="aspect-[628/480] w-full bg-slate-500">
              <video
                controls
                poster={imageUrls.videoPoster}
                className="h-full w-full object-cover"
                src={"/videos/why-us-video.mp4"}
              ></video>
            </div>
          </div>
        </div>
    </section>
  );
};

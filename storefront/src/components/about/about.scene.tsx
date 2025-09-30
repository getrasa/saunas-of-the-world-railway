import React from "react";
import { imageUrls } from "~/lib/imageUrls";

export interface AboutSceneProps {}

export const AboutScene: React.FC<AboutSceneProps> = () => {
  return (
    <div className="flex flex-col gap-8 py-16">
      <div className="flex flex-col justify-center text-black container text-center">
        <span className="f-title">Our mission is your well-being.</span>
        <span className="py-6 leading-7 sm:leading-9">
          In the fast-paced world we inhabit, constantly under pressure,
          it&apos;s vital to find moments of relaxation, ideally accessible from
          the comfort of our own homes. Saunas offer not just a respite for our
          muscles and minds, but also boast significant health benefits. Paired
          with an invigorating ice bath, it&apos;s the ideal addition to your
          daily rituals, whether morning or evening. This is why we&apos;re
          dedicated to the sauna business – to make a tangible difference in
          people&apos;s lives.
        </span>
      </div>
      <div className="flex w-full flex-col items-center gap-4 bg-[#f2f2f2] pb-16 pt-12">
        <span className="f-title">This is us: Mario & Magda</span>
        <img src={imageUrls.thisIsUs} alt="Mario & Magda" className="w-full max-w-[600px]" />
      </div>

      <div className="flex w-full gap-4 container pt-4">
        <div className="basis-1/2 text-center ">
          <label className="f-title">Mario (Mariusz)</label>
          <p className="px-16 py-4">
            With over two decades of expertise in the sauna industry, our
            founder has honed his craft across Europe, constructing saunas in
            Poland, Germany, Belgium, and Sweden. Having catered to discerning
            European clientele renowned for their exacting standards, the
            dedication to quality and meticulous attention to detail he brings
            from his prior experiences continues to elevate Saunas of the World
            in the Australian market.
          </p>
        </div>
        <div className="basis-1/2 text-center">
          <label className="f-title">Magda (Magdalena)</label>
          <p className="px-16 py-4">
            Having dedicated 20 years to Supply Chain Management within some of
            the world&apos;s largest and most prestigious corporations, she
            traversed the globe, serving clients on nearly every continent.
            Driven by a desire to channel her extensive skills and experience
            into a more personal endeavour, she made the bold decision to
            transition from her corporate career to join forces with her husband
            in nurturing a small business venture.
          </p>
        </div>
      </div>
      <p className="text-center underline">
        We&apos;re proud to have a small yet highly skilled team of installers
        working alongside us, dedicated to ensuring our clients&apos;
        satisfaction.
      </p>
    </div>
  );
};

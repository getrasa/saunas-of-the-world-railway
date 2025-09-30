import type { JSX } from "react";
import { HeroSection } from "./hero.section";
import { EosPartnerSection } from "./eos-partner.section";
import { WhyUs } from "./why-us.section";
import { OurOffering } from "./our-offering.section";
import { Indulge } from "./indulge.section";

export const HomeScene = (): JSX.Element => {
  return (
    <>
      <HeroSection />
      <EosPartnerSection />
      <WhyUs />
      <OurOffering />
      <Indulge />
    </>
  );
};

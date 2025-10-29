import type { JSX } from "react";
import { HeroSection } from "./hero.section";
import { EosPartnerSection } from "./eos-partner.section";
import { WhyUs } from "./why-us.section";
import { OurOffering } from "./our-offering.section";
import { Indulge } from "./indulge.section";
import { getHomepageData } from "~/lib/data/homepage";

export const HomeScene = async (): Promise<JSX.Element> => {
  const { heroSlides, whyUs, ourOffering, indulge } = await getHomepageData();

  return (
    <>
      <HeroSection slides={heroSlides} />
      <EosPartnerSection />
      <WhyUs data={whyUs} />
      <OurOffering data={ourOffering} />
      <Indulge data={indulge} />
    </>
  );
};

import { HydrateClient } from "~/trpc/server";
import { HeroSection } from "~/components/home/hero";
import { EosPartnerSection } from "~/components/home/eos-partner/eos-partner";
import { OurOffering } from "~/components/home/our-offering/our-offering";
import { WhyUs } from "~/components/home/why-us/why-us";
import { Indulge } from "~/components/home/indulge/indulge";

export default async function Home() {
  return (
    <HydrateClient>
      <>
        <HeroSection />
        <EosPartnerSection />
        <WhyUs />
        <OurOffering />
        <Indulge />
      </>
    </HydrateClient>
  );
}

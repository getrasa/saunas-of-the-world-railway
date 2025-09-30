import { HydrateClient } from "~/trpc/server";
import { HomeScene } from "~/components/home";

export default async function Home() {
  return (
    <HydrateClient>
      <HomeScene />
    </HydrateClient>
  );
}

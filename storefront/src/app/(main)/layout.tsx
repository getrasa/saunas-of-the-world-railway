import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { FollowUs } from "~/components/home";
import { Footer } from "~/components/ui/footer/footer";
import { NavigationBar } from "~/components/ui/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <NavigationBar />
        <main className="flex flex-col items-center text-[14px] sm:text-[16px]">
          {children}
        </main>
        <FollowUs />
        <Footer />
      </body>
    </html>
  );
}
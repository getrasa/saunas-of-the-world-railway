import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { FollowUs } from "~/components/home";
import { FooterWrapper } from "~/components/ui/footer/footer-wrapper";
import { NavigationBar } from "~/components/ui/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Saunas of the World",
  description: "Favourite Australian sauna, ice baths and heaters manufacturer.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    images: [
      {
        url: "https://assets-global.website-files.com/63ee5237d63284147aced937/643e7bf6b64e2161c21695e0_63f5977f207f7c1827a8e644_how%2520many%2520calories%2520burned%2520in%2520sauna%25202.jpeg",
      },
    ],
  },
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
        <FooterWrapper />
      </body>
    </html>
  );
}
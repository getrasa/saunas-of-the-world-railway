import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { NavigationBar } from "../components/ui/navigation"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <NavigationBar />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}

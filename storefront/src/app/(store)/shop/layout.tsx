import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { NavigationBar } from "~/components/ui/navigation"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function ShopLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar isStore={true} />
      <main className="relative">{props.children}</main>
    </>
  )
}


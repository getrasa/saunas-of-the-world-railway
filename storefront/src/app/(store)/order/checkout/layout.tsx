import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function CheckoutLayout(props: { children: React.ReactNode }) {
  return (
    <main className="relative">{props.children}</main>
  )
}


import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { FooterWrapper } from "~/components/ui/footer/footer-wrapper";
import { CartProvider } from "~/contexts/cart-context";
import { CartDrawer } from "~/components/store/cart-drawer";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <CartProvider>
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <FooterWrapper />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
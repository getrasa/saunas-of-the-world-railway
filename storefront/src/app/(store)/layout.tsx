import { Footer } from "~/components/ui/footer/footer";
import { CartProvider } from "~/contexts/cart-context";
import { CartDrawer } from "~/components/store/cart-drawer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <main className="flex min-h-screen flex-col">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
import { Suspense } from "react";
import { CheckoutScene } from "~/components/store/checkout/checkout.scene"

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-100 flex items-center justify-center"><p>Loading checkout...</p></div>}>
      <CheckoutScene />
    </Suspense>
  );
}


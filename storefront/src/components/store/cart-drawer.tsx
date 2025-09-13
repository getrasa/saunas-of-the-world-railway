"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart, X } from "lucide-react";
import { useCart } from "~/contexts/cart-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "~/components/ui/sheet";

export function CartDrawer() {
  const { items, isOpen, closeCart } = useCart();

  const lastAddedItem = items[items.length - 1];

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent 
        side="right" 
        className="w-full max-w-[748px] p-0 sm:max-w-[748px] [&>button]:hidden"
      >
        <div className="flex h-full flex-col">
          {/* Custom Header */}
          <SheetHeader className="relative flex-row items-center justify-between px-10 py-12">
            <SheetTitle className="flex items-center gap-3 text-2xl font-normal">
              Added to cart
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                <Check className="h-4 w-4 text-white" />
              </div>
            </SheetTitle>
            <SheetClose className="absolute right-10 top-1/2 -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-gray-100">
              <X className="h-5 w-5" />
            </SheetClose>
          </SheetHeader>

          {/* Last Added Item */}
          {lastAddedItem && (
            <div className="px-16 py-10">
              <div className="flex gap-6">
                <div className="relative h-[238px] w-[241px] flex-shrink-0 bg-gray-50">
                  <Image
                    src={lastAddedItem.image}
                    alt={lastAddedItem.name}
                    fill
                    className="object-contain p-6"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-4 text-xl">
                    <span className="font-medium text-[#C5AF71]">
                      {lastAddedItem.name.split(" - ")[0]}
                    </span>
                    <span> - {lastAddedItem.name.split(" - ")[1]}</span>
                  </h3>
                  {lastAddedItem.selectedOptions && (
                    <p className="mb-3 text-base text-gray-600">
                      {[
                        lastAddedItem.selectedOptions.design,
                        lastAddedItem.selectedOptions.model,
                        lastAddedItem.selectedOptions.power,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}
                  <p className="mb-3 text-sm text-gray-600">
                    Include: Wall-mounting. 3,5 m connection cable 4 x 1,5 mm²
                  </p>
                  <p className="mb-4 text-2xl font-semibold">
                    ${lastAddedItem.price}
                  </p>
                  <p className="text-base text-gray-600">
                    Amount: {lastAddedItem.quantity}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer Actions */}
          <div className="px-20 pb-16">
            <div className="space-y-4">
              <Link
                href="/checkout"
                className="flex h-[49px] w-full items-center justify-center gap-3 rounded-3xl bg-black text-white transition-colors hover:bg-gray-800"
                onClick={closeCart}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-base font-semibold">Go to Cart</span>
              </Link>

              <button
                onClick={closeCart}
                className="flex h-[49px] w-full items-center justify-center rounded-3xl border border-black bg-white text-black transition-colors hover:bg-gray-50"
              >
                <span className="text-base font-semibold">
                  Continue Shopping
                </span>
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart, X } from "lucide-react";
import { useCart } from "~/contexts/cart-context";
import { useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "~/components/ui/sheet";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";

type CartItem = HttpTypes.StoreCartLineItem;

// Function to determine if a product is a heater or accessory
function isHeaterProduct(item: CartItem): boolean {
  const productTitle = item.variant?.product?.title?.toLowerCase() || item.title?.toLowerCase() || "";
  const productHandle = (item.variant?.product as any)?.handle?.toLowerCase() || "";
  
  // Accessories typically have these keywords
  const accessoryKeywords = ["controller", "rock", "stone", "peb", "extension", "box"];
  
  // Check if it's an accessory
  const isAccessory = accessoryKeywords.some(keyword => 
    productTitle.includes(keyword) || productHandle.includes(keyword)
  );
  
  return !isAccessory;
}

export function CartDrawer() {
  const { items, isOpen, closeCart, cart } = useCart();

  // Sort items: heaters first, then accessories
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aIsHeater = isHeaterProduct(a);
      const bIsHeater = isHeaterProduct(b);
      
      if (aIsHeater && !bIsHeater) return -1;
      if (!aIsHeater && bIsHeater) return 1;
      return 0;
    });
  }, [items]);

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

          {/* Scrollable Items List */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {sortedItems.length > 0 ? (
              <div className="space-y-6">
                {sortedItems.map((item) => (
                  <div key={item.id} className="flex gap-6 border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="relative h-[120px] w-[120px] flex-shrink-0 bg-gray-50">
                      <Image
                        src={item.variant?.product?.thumbnail || item.thumbnail || ""}
                        alt={item.title || "Product"}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-base">
                        <span className="font-medium text-[#C5AF71]">
                          {item.variant?.product?.title || item.title}
                        </span>
                      </h3>
                      {item.variant?.title && item.variant?.title !== "Default" && (
                        <p className="mb-2 text-sm text-gray-600">
                          {item.variant.title}
                        </p>
                      )}
                      <p className="mb-2 text-lg font-semibold">
                        {cart?.currency_code && item.unit_price && convertToLocale({
                          amount: item.unit_price,
                          currency_code: cart.currency_code,
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 px-20 py-8">
            <div className="space-y-4">
              <Link
                href="/shop/checkout"
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
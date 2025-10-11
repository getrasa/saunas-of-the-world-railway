"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "~/contexts/cart-context";
import { useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "~/components/ui/sheet";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { updateLineItem, deleteLineItem } from "@lib/data/cart";

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
  const { items, isOpen, closeCart, cart, refreshCart } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

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

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    setUpdatingItems(prev => new Set(prev).add(lineId));
    try {
      if (newQuantity === 0) {
        await deleteLineItem(lineId);
      } else {
        await updateLineItem({ lineId, quantity: newQuantity });
      }
      await refreshCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(lineId);
        return next;
      });
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    setUpdatingItems(prev => new Set(prev).add(lineId));
    try {
      await deleteLineItem(lineId);
      await refreshCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(lineId);
        return next;
      });
    }
  };

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
                {sortedItems.map((item) => {
                  const isUpdating = updatingItems.has(item.id);
                  return (
                    <div key={item.id} className="flex gap-6 border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="relative h-[120px] w-[120px] flex-shrink-0 bg-gray-50">
                        <Image
                          src={item.variant?.product?.thumbnail || item.thumbnail || ""}
                          alt={item.title || "Product"}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="mb-2 flex items-start justify-between">
                          <h3 className="text-base">
                            <span className="font-medium text-[#C5AF71]">
                              {item.variant?.product?.title || item.title}
                            </span>
                          </h3>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isUpdating}
                            className="ml-2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600 disabled:opacity-50"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        {item.variant?.title && item.variant?.title !== "Default" && (
                          <p className="mb-2 text-sm text-gray-600">
                            {item.variant.title}
                          </p>
                        )}
                        <p className="mb-3 text-lg font-semibold">
                          {cart?.currency_code && item.unit_price && convertToLocale({
                            amount: item.unit_price,
                            currency_code: cart.currency_code,
                          })}
                        </p>
                        <div className="mt-auto flex items-center gap-3">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={isUpdating}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100 disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[2rem] text-center text-base font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={isUpdating}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100 disabled:opacity-50"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                href="/order/checkout"
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
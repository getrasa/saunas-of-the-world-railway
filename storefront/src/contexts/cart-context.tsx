"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { HttpTypes } from "@medusajs/types";

type CartItem = HttpTypes.StoreCartLineItem;

type CartContextValue = {
  cart: HttpTypes.StoreCart | null;
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
  totalQuantity: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  // Fetch cart data from the server
  const refreshCart = useCallback(async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, []);

  // Refresh cart periodically when drawer is open
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      refreshCart();
    }, 2000); // Refresh every 2 seconds when drawer is open
    
    return () => clearInterval(interval);
  }, [isOpen, refreshCart]);

  const items = useMemo(() => {
    return (cart?.items as CartItem[]) || [];
  }, [cart]);

  const totals = useMemo(() => {
    const totalQuantity = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
    const totalPrice = cart?.subtotal || 0;
    return { totalQuantity, totalPrice };
  }, [items, cart]);

  const value = useMemo<CartContextValue>(() => ({
    cart,
    items,
    isOpen,
    openCart,
    closeCart,
    refreshCart,
    totalQuantity: totals.totalQuantity,
    totalPrice: totals.totalPrice,
  }), [cart, items, isOpen, openCart, closeCart, refreshCart, totals.totalQuantity, totals.totalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
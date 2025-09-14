"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
  selectedOptions?: Record<string, string | undefined>;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback((item: CartItem) => {
    setItems((prev) => {
      const index = prev.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: updated[index].quantity + item.quantity };
        return updated;
      }
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totals = useMemo(() => {
    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    return { totalQuantity, totalPrice };
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    isOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    clearCart,
    totalQuantity: totals.totalQuantity,
    totalPrice: totals.totalPrice,
  }), [items, isOpen, openCart, closeCart, addToCart, removeFromCart, clearCart, totals.totalQuantity, totals.totalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}



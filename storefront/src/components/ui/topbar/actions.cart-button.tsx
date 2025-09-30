"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "~/contexts/cart-context";

export const CartButton = () => {
  const [hoverCart, setHoverCart] = useState(false);
  const { openCart, totalQuantity } = useCart();

  return (
    <div
      onClick={openCart}
      className="relative flex cursor-pointer items-center gap-2 text-[12px] font-semibold"
      onMouseEnter={() => setHoverCart(true)}
      onMouseLeave={() => setHoverCart(false)}
    >
      <ShoppingCart 
        size={18} 
        className={hoverCart ? "text-[#C5AF71]" : "text-[#4e4d4d]"} 
      />
      {totalQuantity > 0 && (
        <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5AF71] text-[10px] font-bold text-white">
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="flex h-8 w-[109px] items-center rounded-full border border-gray-300">
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="flex h-full w-8 items-center justify-center rounded-l-full transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus className="h-3 w-3" />
      </button>
      
      <div className="flex flex-1 items-center justify-center">
        <span className="text-sm font-medium">{quantity}</span>
      </div>
      
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="flex h-full w-8 items-center justify-center rounded-r-full transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}
import Image from "next/image";
import { StockIndicator, type StockStatus } from "./stock-indicator";
import { ShoppingCart } from "lucide-react";

export interface HeaterProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stockStatus: StockStatus;
  image: string;
  type: string;
  saunaSize: string;
  power: string;
}

interface HeaterCardProps {
  product: HeaterProduct;
  onAddToCart?: (product: HeaterProduct) => void;
}

export function HeaterCard({ product, onAddToCart }: HeaterCardProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:p-6">
      <div className="relative flex h-72 w-full items-center justify-center rounded-lg bg-gray-50 p-8">
        <Image
          src={product.image}
          alt={product.name}
          width={240}
          height={280}
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-medium text-[#C5AF71]">{product.name}</h3>
          <p className="line-clamp-3 text-xs text-gray-600">{product.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">${product.price}</span>
          <StockIndicator status={product.stockStatus} />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart?.(product);
          }}
          disabled={product.stockStatus === "out-of-stock"}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-black text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="font-medium">Add to My Cart</span>
        </button>

        <div className="flex flex-col gap-3 border-t pt-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#C5AF71]">Type Available</span>
            <span className="text-xs text-gray-600">{product.type}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#C5AF71]">Sauna Size Up To</span>
            <span className="text-xs text-gray-600">{product.saunaSize}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#C5AF71]">Power</span>
            <span className="text-xs text-gray-600">{product.power}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { StoreHero } from "~/components/store/store-hero";
import { ProductFilter } from "~/components/store/product-filter";
import { HeaterCard, type HeaterProduct } from "~/components/store/heater-card";
import { useCart } from "~/contexts/cart-context";
import { addToCart } from "@lib/data/cart";
import { imageUrls } from "~/lib/imageUrls";

export function HeatersClient({ products, countryCode }: { products: HeaterProduct[], countryCode: string }) {
  const { refreshCart, openCart } = useCart();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const handleAddToCart = async (product: HeaterProduct) => {
    if (!product.variantId) {
      console.error("No variant ID found for product:", product.id);
      return;
    }

    setAddingProductId(product.id);
    try {
      await addToCart({
        variantId: product.variantId,
        quantity: 1,
        countryCode,
      });
      
      await refreshCart();
      openCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingProductId(null);
    }
  };

  const handleFilterChange = (filters: Record<string, string | null>) => {
    console.log("Filters changed:", filters);
  };

  return (
    <div className="flex flex-col">
      <StoreHero
        title="EOS Sauna Heaters"
        subtitle="German Engineering, Exceptional Comfort"
        description="Experience premium quality with EOS sauna heaters, combining sleek design, durable materials, and advanced air convection for a perfectly balanced sauna climate."
        backgroundImage={imageUrls.heatersHero}
        ctaText="EXPLORE NOW"
        ctaHref="#products"
        features={[
          "Floor-standing, wall-mounted, or concealed models",
          "Power options from 3 to 72 kW",
          "Ideal for sauna rooms from 3 to 160 m³",
        ]}
      />

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-[1512px]">
          <ProductFilter totalItems={products.length} onFilterChange={handleFilterChange} />

          <div id="products" className="grid grid-cols-1 gap-6 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link key={product.id} href={`/shop/heaters/${product.id}`}>
                <HeaterCard product={product} onAddToCart={handleAddToCart} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



"use client";

import Link from "next/link";
import { StoreHero } from "~/components/store/store-hero";
import { ProductFilter } from "~/components/store/product-filter";
import { HeaterCard, type HeaterProduct } from "~/components/store/heater-card";
import { useCart } from "~/contexts/cart-context";
import { imageUrls } from "~/lib/imageUrls";

export function HeatersClient({ products }: { products: HeaterProduct[] }) {
  const { addToCart } = useCart();

  const handleAddToCart = (product: HeaterProduct) => {
    addToCart({
      id: product.id,
      name: `${product.name} - Sauna heater`,
      description: product.description,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
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



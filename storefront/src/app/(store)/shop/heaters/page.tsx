"use client";

import { useState } from "react";
import Link from "next/link";
import { StoreHero } from "~/components/store/store-hero";
import { ProductFilter } from "~/components/store/product-filter";
import { HeaterCard, type HeaterProduct } from "~/components/store/heater-card";
import { useCart } from "~/contexts/cart-context";
import { imageUrls } from "~/lib/imageUrls";

const mockProducts: HeaterProduct[] = [
  {
    id: "1",
    name: "EOS Picco W",
    description: "Inner and outer shell of chrome steel. 3 exterior designs: polished chrome steel, matt black or anthracite pearl effect finish. Rock store fits approx. 10 kg stones.",
    price: 240,
    stockStatus: "in-stock",
    image: imageUrls.heaterProduct1,
    type: "Floor-standing / Wall-Mounting",
    saunaSize: "4.5 m³",
    power: "3.0 kW / 3.5kW",
  },
  {
    id: "2",
    name: "EOS Bi-O Mat W",
    description: "High-quality stainless steel heater with integrated water tank for Finnish and Bio sauna operation. Available in multiple power configurations.",
    price: 450,
    stockStatus: "in-stock",
    image: imageUrls.heaterProduct2,
    type: "Wall-Mounting",
    saunaSize: "8 m³",
    power: "6.0 kW",
  },
  {
    id: "3",
    name: "EOS Cubo",
    description: "Compact cubic design with excellent heat distribution. Premium quality heating elements ensure long service life.",
    price: 380,
    stockStatus: "pre-order",
    image: imageUrls.heaterProduct3,
    type: "Floor-standing",
    saunaSize: "6 m³",
    power: "4.5 kW",
  },
  {
    id: "4",
    name: "EOS 34.A",
    description: "Classic sauna heater with robust construction. Ideal for commercial and residential use with excellent heat output.",
    price: 680,
    stockStatus: "in-stock",
    image: imageUrls.heaterProduct4,
    type: "Floor-standing",
    saunaSize: "12 m³",
    power: "9.0 kW",
  },
  {
    id: "5",
    name: "EOS Germanius",
    description: "Premium tower heater with elegant design. Features advanced air circulation system for optimal sauna climate.",
    price: 920,
    stockStatus: "in-stock",
    image: imageUrls.heaterProduct1,
    type: "Floor-standing",
    saunaSize: "16 m³",
    power: "12.0 kW",
  },
  {
    id: "6",
    name: "EOS Herkules S60",
    description: "Heavy-duty commercial heater with superior performance. Built for continuous operation in professional environments.",
    price: 1850,
    stockStatus: "out-of-stock",
    image: imageUrls.heaterProduct2,
    type: "Floor-standing",
    saunaSize: "60 m³",
    power: "30.0 kW",
  },
  {
    id: "7",
    name: "EOS Saunadome II",
    description: "Innovative dome design for maximum stone capacity. Creates authentic löyly steam for traditional sauna experience.",
    price: 540,
    stockStatus: "in-stock",
    image: imageUrls.heaterProduct3,
    type: "Wall-Mounting",
    saunaSize: "10 m³",
    power: "7.5 kW",
  },
  {
    id: "8",
    name: "EOS AquaJoy",
    description: "Combined sauna heater with integrated aromatherapy system. Perfect for wellness and spa applications.",
    price: 1120,
    stockStatus: "in-stock",
    image: imageUrls.heaterProduct4,
    type: "Floor-standing / Wall-Mounting",
    saunaSize: "20 m³",
    power: "15.0 kW",
  },
  {
    id: "9",
    name: "EOS Mythos S45",
    description: "Professional grade heater with stainless steel construction. Features patented air circulation technology.",
    price: 1450,
    stockStatus: "pre-order",
    image: imageUrls.heaterProduct1,
    type: "Floor-standing",
    saunaSize: "45 m³",
    power: "24.0 kW",
  },
  {
    id: "10",
    name: "EOS Core Compact",
    description: "Space-saving design without compromising performance. Ideal for smaller residential saunas.",
    price: 320,
    stockStatus: "in-stock",
    image: imageUrls.heaterProduct2,
    type: "Wall-Mounting",
    saunaSize: "3.5 m³",
    power: "3.0 kW",
  },
];

export default function HeatersPage() {
  const [products] = useState<HeaterProduct[]>(mockProducts);
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
          <ProductFilter
            totalItems={products.length}
            onFilterChange={handleFilterChange}
          />
          
          <div id="products" className="grid grid-cols-1 gap-6 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link key={product.id} href={`/shop/heaters/${product.id}`}>
                <HeaterCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
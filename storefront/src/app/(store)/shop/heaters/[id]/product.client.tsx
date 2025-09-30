"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { ProductGallery } from "~/components/store/product-gallery";
import { ProductOptions } from "~/components/store/product-options";
import { QuantitySelector } from "~/components/store/quantity-selector";
import { ProductInfo } from "~/components/store/product-info";
import { HeaterCard, type HeaterProduct } from "~/components/store/heater-card";
import { StockIndicator } from "~/components/store/stock-indicator";
import { useCart } from "~/contexts/cart-context";
import { imageUrls } from "~/lib/imageUrls";

type ProductClientProps = {
  title: string | null
  subtitle: string | null
  description: string | null
  images: string[] | null
  price: number | null
}

const relatedProducts: HeaterProduct[] = [
    {
      id: "2",
      name: "EOS Bi-O Mat W",
      description: "High-quality stainless steel heater with integrated water tank for Finnish and Bio sauna operation.",
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
      description: "Compact cubic design with excellent heat distribution. Premium quality heating elements.",
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
      description: "Classic sauna heater with robust construction. Ideal for commercial and residential use.",
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
      description: "Premium tower heater with elegant design. Features advanced air circulation system.",
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
      description: "Heavy-duty commercial heater with superior performance. Built for continuous operation.",
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
      description: "Innovative dome design for maximum stone capacity. Creates authentic löyly steam.",
      price: 540,
      stockStatus: "in-stock",
      image: imageUrls.heaterProduct3,
      type: "Wall-Mounting",
      saunaSize: "10 m³",
      power: "7.5 kW",
    },
  ];

const mockProduct = {
  id: "1",
  name: "EOS Picco W",
  fullName: "EOS Picco W - Sauna heater for small sauna cabins",
  description:
    "Very compact, space-saving design. For dry Finnish sauna, recommended for sauna size up to approx. 4,5 m³. Rock store fits approx. 10 kg stones.",
  includes: "Wall-mounting. 3,5 m connection cable 4 x 1,5 mm²",
  price: 240,
  stockStatus: "in-stock" as const,
  images: [
    imageUrls.heaterProduct1,
    imageUrls.heaterProduct2,
    imageUrls.heaterProduct3,
    imageUrls.heaterProduct4,
    imageUrls.heaterProduct1,
  ],
  optionGroups: [
    {
      title: "Controller (required)",
      options: [
        { id: "stainless", label: "No controller", available: true },
        { id: "matt-black", label: "EmoStyle D", available: true },
        { id: "anthracite", label: "Compact DP", available: true },
      ],
    },
    {
      title: "Power Extension Box (required)",
      options: [
        { id: "stainless", label: "No box", available: true },
        { id: "matt-black", label: "PEB 36", available: true },
      ],
    },
    {
      title: "Rocks",
      options: [
        { id: "model-2", label: "No rocks", available: true },
        { id: "model-1", label: "Add rocks (1x)", available: true },
      ],
    },
    {
      title: "Choose Power",
      options: [
        { id: "3kw", label: "3.0 kW", available: true },
        { id: "3.5kw", label: "3.5kW", available: true },
      ],
    },
    // {
    //   title: "Choose exterior designs",
    //   options: [
    //     { id: "matt-black", label: "Matt Black", available: true },
    //     { id: "anthracite", label: "Anthracite Pearl", available: true },
    //     { id: "stainless", label: "Stainless Steel", available: true },
    //   ],
    // },
    // {
    //   title: "Choose Model",
    //   options: [
    //     { id: "model-1", label: "Model 1", available: true },
    //     { id: "model-2", label: "Model 2", available: true },
    //   ],
    // },
    // {
    //   title: "Choose Power",
    //   options: [
    //     { id: "3kw", label: "3.0 kW", available: true },
    //     { id: "3.5kw", label: "3.5kW", available: true },
    //   ],
    // },
  ],
  advantages: [
    "German engineering and manufacturing",
    "5-year warranty on heating elements",
    "Energy-efficient operation",
    "Quick heat-up time",
    "Low maintenance requirements",
  ],
};

export function ProductClient({ title, subtitle, description, images, price }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const selectedDesign = mockProduct.optionGroups[0]?.options.find(
      (opt) => opt.id === selectedOptions["Choose exterior designs"]
    )?.label;
    const selectedModel = mockProduct.optionGroups[1]?.options.find(
      (opt) => opt.id === selectedOptions["Choose Model"]
    )?.label;
    const selectedPower = mockProduct.optionGroups[2]?.options.find(
      (opt) => opt.id === selectedOptions["Choose Power"]
    )?.label;

    addToCart({
      id: mockProduct.id,
      name: mockProduct.fullName,
      description: mockProduct.description,
      price: price ?? mockProduct.price,
      quantity,
      image: (images && images[0]) || mockProduct.images[0] || "",
      selectedOptions: {
        design: selectedDesign,
        model: selectedModel,
        power: selectedPower,
      },
    });
  };

  const productInfoSections = [
    {
      title: "Your Advantages",
      content: (
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
          {mockProduct.advantages.map((advantage, index) => (
            <li key={index}>{advantage}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Technical Specifications",
      content: (
        <dl className="space-y-2 text-sm">
          {Object.entries({
            "Power Output": "3.0 - 3.5 kW",
            "Sauna Room Size": "3 - 4.5 m³",
            Dimensions: "280 x 375 x 280 mm",
            Weight: "11 kg",
            "Stone Capacity": "10 kg",
            "Electrical Connection": "400V 3N~",
            "Control Unit": "Not included (sold separately)",
          }).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <dt className="font-medium text-gray-600">{key}:</dt>
              <dd className="text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      title: "PDF Downloads",
      content: (
        <div className="space-y-2">
          <a href="#" className="block text-sm text-[#C5AF71] hover:underline">
            Installation Manual (PDF)
          </a>
          <a href="#" className="block text-sm text-[#C5AF71] hover:underline">
            Technical Datasheet (PDF)
          </a>
          <a href="#" className="block text-sm text-[#C5AF71] hover:underline">
            Warranty Information (PDF)
          </a>
        </div>
      ),
    },
  ];

  const getSelectedOptionsString = () => "";

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1512px] px-6 py-8">
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/shop/heaters" className="hover:text-gray-700">
            Products
          </Link>
          <span>&gt;</span>
          <Link href="/shop/heaters" className="hover:text-gray-700">
            Sauna Heaters
          </Link>
          <span>&gt;</span>
          <span className="font-medium text-black">{title ?? mockProduct.name}</span>
        </nav>

        <Link
          href="/shop/heaters"
          className="mb-8 inline-flex items-center gap-1 rounded-full border border-black px-3 py-1 text-xs font-semibold transition-colors hover:bg-gray-100"
        >
          <ChevronLeft className="h-3 w-3" />
          Back
        </Link>

        <div className="grid gap-12 lg:grid-cols-[737px_1fr]">
          <div className="flex flex-col gap-12">
            <ProductGallery
              images={images ?? mockProduct.images}
              productName={title ?? mockProduct.name}
              selectedOptions={getSelectedOptionsString()}
            />
            <div className="w-full">
              <ProductInfo sections={productInfoSections} />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h1 className="mb-6 text-3xl font-semibold">
                <span className="text-[#C5AF71]">{title ?? mockProduct.name}</span>
                <span className="text-black">{" "}- {subtitle ?? "Sauna heater for small sauna cabins"}</span>
              </h1>
              <p className="mb-4 text-gray-600">{description ?? mockProduct.description}</p>
              <p className="mb-6 text-black">Include: Wall-mounting. 3,5 m connection cable 4 x 1,5 mm²</p>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-semibold">${price ?? mockProduct.price}</span>
                <StockIndicator status={mockProduct.stockStatus} />
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            <ProductOptions
              optionGroups={mockProduct.optionGroups}
              onSelectionChange={setSelectedOptions}
            />

            <div className="h-px bg-gray-200" />

            <div>
              <h3 className="mb-2 text-base font-medium">Amount</h3>
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>

            <div className="h-px bg-gray-200" />

            <button
              onClick={handleAddToCart}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-black text-white transition-colors hover:bg-gray-800"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-semibold">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-neutral-100 px-6 py-16 mt-16">
        <div className="mx-auto max-w-[1512px]">
          <h2 className="mb-12 text-3xl font-semibold">You may also interested in</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((product) => (
              <HeaterCard key={product.id} product={product} onAddToCart={() => {}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



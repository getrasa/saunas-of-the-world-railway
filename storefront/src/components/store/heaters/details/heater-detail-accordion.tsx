"use client"

import { ProductAccordion } from "~/components/store/product/details/product-accordion"

interface HeaterDetailAccordionProps {
  advantages: string[]
  specifications: Record<string, string>
}

export function HeaterDetailAccordion({ advantages, specifications }: HeaterDetailAccordionProps) {
  return (
    <ProductAccordion>
      <ProductAccordion.Item title="Your Advantages">
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
          {advantages.map((advantage, index) => (
            <li key={index}>{advantage}</li>
          ))}
        </ul>
      </ProductAccordion.Item>

      {Object.keys(specifications).length > 0 && (
        <ProductAccordion.Item title="Technical Specifications">
          <dl className="space-y-2 text-sm">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <dt className="font-medium text-gray-600">{key}:</dt>
                <dd className="text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </ProductAccordion.Item>
      )}

      <ProductAccordion.Item title="PDF Downloads">
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
      </ProductAccordion.Item>
    </ProductAccordion>
  )
}


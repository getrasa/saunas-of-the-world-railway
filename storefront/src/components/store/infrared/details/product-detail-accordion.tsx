"use client"

import { ProductAccordion } from "~/components/store/product/details/product-accordion"

interface Download {
  label: string
  fileUrl: string
  filename?: string
}

interface InfraredDetailAccordionProps {
  advantages: string[]
  specifications: Record<string, string>
  downloads: Download[]
}

export function InfraredDetailAccordion({ advantages, specifications, downloads }: InfraredDetailAccordionProps) {
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

      {downloads.length > 0 && (
        <ProductAccordion.Item title="PDF Downloads">
          <ul className="space-y-2">
            {downloads.map((download, index) => (
              <li key={index}>
                <a
                  href={download.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#C5AF71] hover:underline"
                >
                  <svg
                    className="h-4 w-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{download.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </ProductAccordion.Item>
      )}
    </ProductAccordion>
  )
}

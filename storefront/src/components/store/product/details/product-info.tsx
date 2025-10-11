"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableSection {
  title: string;
  content: React.ReactNode;
}

interface ProductInfoProps {
  sections: ExpandableSection[];
}

export function ProductInfo({ sections }: ProductInfoProps) {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="flex flex-col">
      {sections.map((section, index) => (
        <div key={index} className="border-t border-black">
          <button
            onClick={() => toggleSection(index)}
            className="flex w-full items-center justify-between px-3 py-6 text-left transition-colors hover:bg-gray-50"
          >
            <span className="text-base font-semibold">{section.title}</span>
            {expandedSections.has(index) ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {expandedSections.has(index) && (
            <div className="px-3 pb-6">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
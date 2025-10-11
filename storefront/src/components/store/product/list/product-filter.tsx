"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export type FilterType = "power" | "room-size" | "price";

interface FilterOption {
  id: FilterType;
  label: string;
  options?: string[];
}

const filterOptions: FilterOption[] = [
  {
    id: "power",
    label: "Power",
    options: ["3-6 kW", "6-9 kW", "9-12 kW", "12+ kW"],
  },
  {
    id: "room-size",
    label: "Sauna Room Size",
    options: ["Up to 6 m³", "6-9 m³", "9-12 m³", "12+ m³"],
  },
  {
    id: "price",
    label: "Price",
    options: ["Under $1000", "$1000-$1500", "$1500-$2000", "Over $2000"],
  },
];

interface ProductFilterProps {
  totalItems: number;
  onFilterChange?: (filters: Record<FilterType, string | null>) => void;
}

export function ProductFilter({ totalItems, onFilterChange }: ProductFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Record<FilterType, string | null>>({
    power: null,
    "room-size": null,
    price: null,
  });

  const [openDropdown, setOpenDropdown] = useState<FilterType | null>(null);
  const dropdownRefs = useRef<Record<FilterType, HTMLDivElement | null>>({
    power: null,
    "room-size": null,
    price: null,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const handleFilterClick = (filterId: FilterType) => {
    setOpenDropdown(openDropdown === filterId ? null : filterId);
  };

  const handleOptionSelect = (filterId: FilterType, option: string | null) => {
    const newFilters = { ...activeFilters, [filterId]: option };
    setActiveFilters(newFilters);
    setOpenDropdown(null);
    onFilterChange?.(newFilters);
  };

  const handleClearFilter = (filterId: FilterType) => {
    handleOptionSelect(filterId, null);
  };

  return (
    <div className="flex flex-col gap-6 px-12 py-8">
      <h2 className="text-3xl font-semibold">Find the right heater for you</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <div 
                key={filter.id} 
                className="relative"
                ref={(el) => {
                  dropdownRefs.current[filter.id] = el;
                }}
              >
                <button
                  onClick={() => handleFilterClick(filter.id)}
                  className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-12 py-2.5 text-base font-medium transition-colors hover:bg-gray-50"
                >
                  <span>{activeFilters[filter.id] ?? filter.label}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {openDropdown === filter.id && filter.options && (
                  <div className="absolute left-0 top-full z-10 mt-2 min-w-[200px] rounded-lg border bg-white py-2 shadow-lg">
                    <button
                      onClick={() => handleClearFilter(filter.id)}
                      className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100"
                    >
                      All {filter.label}
                    </button>
                    <div className="my-1 h-px bg-gray-200" />
                    {filter.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(filter.id, option)}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <span className="text-2xl">{totalItems} Items</span>
        </div>
        
        <div className="h-px w-full bg-gray-200" />
      </div>
    </div>
  );
}
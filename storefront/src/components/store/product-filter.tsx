"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type FilterType = "type" | "power" | "room-size" | "price";

interface FilterOption {
  id: FilterType;
  label: string;
  options?: string[];
}

const filterOptions: FilterOption[] = [
  {
    id: "type",
    label: "Type",
    options: ["Floor-standing", "Wall-mounted", "Concealed"],
  },
  {
    id: "power",
    label: "Power",
    options: ["3-10 kW", "10-20 kW", "20-40 kW", "40+ kW"],
  },
  {
    id: "room-size",
    label: "Sauna Room Size",
    options: ["3-10 m³", "10-30 m³", "30-60 m³", "60+ m³"],
  },
  {
    id: "price",
    label: "Price",
    options: ["Under $500", "$500-$1000", "$1000-$2000", "Over $2000"],
  },
];

interface ProductFilterProps {
  totalItems: number;
  onFilterChange?: (filters: Record<FilterType, string | null>) => void;
}

export function ProductFilter({ totalItems, onFilterChange }: ProductFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Record<FilterType, string | null>>({
    type: null,
    power: null,
    "room-size": null,
    price: null,
  });

  const [openDropdown, setOpenDropdown] = useState<FilterType | null>(null);

  const handleFilterClick = (filterId: FilterType) => {
    setOpenDropdown(openDropdown === filterId ? null : filterId);
  };

  const handleOptionSelect = (filterId: FilterType, option: string) => {
    const newFilters = { ...activeFilters, [filterId]: option };
    setActiveFilters(newFilters);
    setOpenDropdown(null);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-8">
      <h2 className="text-3xl font-semibold">Find the right heater for you</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <div key={filter.id} className="relative">
                <button
                  onClick={() => handleFilterClick(filter.id)}
                  className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-2.5 text-base font-medium transition-colors hover:bg-gray-50"
                >
                  <span>{activeFilters[filter.id] ?? filter.label}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {openDropdown === filter.id && filter.options && (
                  <div className="absolute left-0 top-full z-10 mt-2 min-w-[200px] rounded-lg border bg-white py-2 shadow-lg">
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
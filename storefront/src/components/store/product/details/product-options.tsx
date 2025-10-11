"use client";

import { useState } from "react";

interface Option {
  id: string;
  label: string;
  available: boolean;
}

interface OptionGroup {
  title: string;
  options: Option[];
}

interface ProductOptionsProps {
  optionGroups: OptionGroup[];
  onSelectionChange?: (selections: Record<string, string>) => void;
}

export function ProductOptions({ optionGroups, onSelectionChange }: ProductOptionsProps) {
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    optionGroups.forEach((group) => {
      const firstAvailable = group.options.find((opt) => opt.available);
      if (firstAvailable) {
        initial[group.title] = firstAvailable.id;
      }
    });
    return initial;
  });

  const handleSelection = (groupTitle: string, optionId: string) => {
    const newSelections = { ...selections, [groupTitle]: optionId };
    setSelections(newSelections);
    onSelectionChange?.(newSelections);
  };

  return (
    <div className="flex flex-col gap-6">
      {optionGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <h3 className="text-base font-medium">{group.title}</h3>
          <div className="flex flex-wrap gap-3">
            {group.options.map((option) => (
              <button
                key={option.id}
                onClick={() => option.available && handleSelection(group.title, option.id)}
                disabled={!option.available}
                className={`rounded-xl px-6 py-2 text-xs transition-colors ${
                  selections[group.title] === option.id
                    ? "bg-[#C5AF71] text-white"
                    : option.available
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
"use client";

import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  const hasNotifiedInitial = useRef(false);

  // Build dynamic schema based on option groups
  const schema = useMemo(
    () =>
      z.object(
        optionGroups.reduce((acc, group) => {
          acc[group.title] = z.string().min(1, `Please select ${group.title}`);
          return acc;
        }, {} as Record<string, z.ZodString>)
      ),
    [optionGroups]
  );

  type FormValues = z.infer<typeof schema>;

  // Calculate initial values (first available option for each group)
  const initialValues = useMemo((): FormValues => {
    const initial: Record<string, string> = {};
    optionGroups.forEach((group) => {
      const firstAvailable = group.options.find((opt) => opt.available);
      if (firstAvailable) {
        initial[group.title] = firstAvailable.id;
      }
    });
    return initial as FormValues;
  }, [optionGroups]);

  const { watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const formValues = watch();

  // Notify parent of initial values once on mount
  useEffect(() => {
    if (!hasNotifiedInitial.current) {
      onSelectionChange?.(initialValues);
      hasNotifiedInitial.current = true;
    }
  }, [initialValues, onSelectionChange]);

  const handleSelection = (groupTitle: string, optionId: string) => {
    setValue(groupTitle, optionId, { shouldValidate: true });
    
    // Get the updated values and notify parent
    const currentValues = watch();
    const updatedValues = { ...currentValues, [groupTitle]: optionId };
    onSelectionChange?.(updatedValues);
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
                type="button"
                onClick={() => option.available && handleSelection(group.title, option.id)}
                disabled={!option.available}
                className={`rounded-xl px-6 py-2 text-xs transition-colors ${
                  formValues[group.title] === option.id
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
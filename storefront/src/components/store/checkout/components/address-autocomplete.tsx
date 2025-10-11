"use client"

import React, { useEffect, useRef } from "react"
import { Input } from "@lib/components/ui/input"
import { Search } from "lucide-react"
import { useGooglePlacesAutocomplete, ParsedAddress } from "@lib/hooks/useGooglePlacesAutocomplete"

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onAddressSelect: (address: ParsedAddress) => void
  placeholder?: string
  className?: string
  name?: string
  error?: string
}

export function AddressAutocomplete({
  value,
  onChange,
  onAddressSelect,
  placeholder = "e.g. 1/123 Main Street",
  className = "",
  name = "address",
  error,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const { isLoaded, error: apiError, initAutocomplete } = useGooglePlacesAutocomplete()

  useEffect(() => {
    if (isLoaded && inputRef.current && !autocompleteRef.current) {
      autocompleteRef.current = initAutocomplete(inputRef.current, onAddressSelect)
    }
  }, [isLoaded, initAutocomplete, onAddressSelect])

  // Show error if API failed to load
  if (apiError) {
    console.warn("Address autocomplete disabled:", apiError)
  }

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-[58px] bg-neutral-100 border-0 rounded-lg px-[19px] pr-12 text-[16px] placeholder:text-[#6f6f6f] ${
          error ? "border-2 border-red-500" : ""
        } ${className}`}
      />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-6 text-[#6f6f6f] pointer-events-none" />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}


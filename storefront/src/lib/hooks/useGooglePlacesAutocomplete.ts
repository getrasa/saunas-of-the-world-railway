"use client"

import { useEffect, useRef, useState } from "react"

export interface ParsedAddress {
  address1: string
  city: string
  province: string
  postalCode: string
  countryCode: string
}

/**
 * Hook for Google Places Autocomplete integration
 * Requires NEXT_PUBLIC_GOOGLE_PLACES_API_KEY to be set
 */
export function useGooglePlacesAutocomplete() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    // Check if Google Places API is already loaded
    if (window.google?.maps?.places) {
      setIsLoaded(true)
      return
    }

    // Check if script is already being loaded
    if (scriptLoadedRef.current) return
    scriptLoadedRef.current = true

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY

    if (!apiKey) {
      setError("Google Places API key is not configured")
      console.warn("NEXT_PUBLIC_GOOGLE_PLACES_API_KEY environment variable is not set")
      return
    }

    // Load Google Places API script
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsLoaded(true)
    }

    script.onerror = () => {
      setError("Failed to load Google Places API")
      console.error("Failed to load Google Places API script")
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup is tricky with Google Maps API as it's global
      // We'll leave it loaded once initialized
    }
  }, [])

  /**
   * Parse Google Place result into address components
   */
  const parsePlace = (place: google.maps.places.PlaceResult): ParsedAddress | null => {
    if (!place.address_components) {
      return null
    }

    const addressComponents = place.address_components
    let streetNumber = ""
    let route = ""
    let city = ""
    let province = ""
    let postalCode = ""
    let countryCode = ""

    addressComponents.forEach((component) => {
      const types = component.types

      if (types.includes("street_number")) {
        streetNumber = component.long_name
      }
      if (types.includes("route")) {
        route = component.long_name
      }
      if (types.includes("locality") || types.includes("postal_town")) {
        city = component.long_name
      }
      if (types.includes("administrative_area_level_1")) {
        province = component.short_name
      }
      if (types.includes("postal_code")) {
        postalCode = component.long_name
      }
      if (types.includes("country")) {
        countryCode = component.short_name
      }
    })

    // Combine street number and route for address line 1
    const address1 = streetNumber && route 
      ? `${streetNumber} ${route}` 
      : route || streetNumber || ""

    return {
      address1,
      city,
      province,
      postalCode,
      countryCode, // Will be normalized to lowercase by schema validation
    }
  }

  /**
   * Initialize autocomplete on an input element
   */
  const initAutocomplete = (
    inputElement: HTMLInputElement,
    onPlaceSelected: (address: ParsedAddress) => void
  ) => {
    if (!isLoaded || !window.google?.maps?.places) {
      console.warn("Google Places API not loaded yet")
      return null
    }

    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      types: ["address"],
      fields: ["address_components"],
    })

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()
      const parsedAddress = parsePlace(place)
      
      if (parsedAddress) {
        onPlaceSelected(parsedAddress)
      }
    })

    return autocomplete
  }

  return {
    isLoaded,
    error,
    initAutocomplete,
    parsePlace,
  }
}


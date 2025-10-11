"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { checkoutFormSchema, CheckoutFormData } from "@lib/schemas/checkout.schema"

const STORAGE_KEY = "checkout_form_data"

// Default form values
const defaultValues: CheckoutFormData = {
  shippingAddress: {
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    postalCode: "",
    countryCode: "", // Will be set from cart region countries
    province: "",
    phone: "",
  },
  email: "",
  phone: "",
  billingAddressSameAsShipping: true,
  billingAddress: undefined,
  safeToLeave: false,
  paymentMethod: "credit_card",
}

/**
 * Custom hook for managing checkout form state with localStorage persistence
 */
export function useCheckoutForm() {
  const [isHydrated, setIsHydrated] = useState(false)

  // Initialize form with react-hook-form and Zod validation
  const form = useForm<CheckoutFormData, any, CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues,
    mode: "onBlur", // Validate on blur for better UX
  })

  // Load saved form data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsed = JSON.parse(savedData)
        // Reset form with saved values
        form.reset(parsed)
      }
    } catch (error) {
      console.error("Failed to load checkout form data from localStorage:", error)
    } finally {
      setIsHydrated(true)
    }
  }, []) // Only run on mount

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (!isHydrated) return // Don't save until after hydration

    const subscription = form.watch((value) => {
      try {
        // Don't save invalid or empty data
        if (value) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
        }
      } catch (error) {
        console.error("Failed to save checkout form data to localStorage:", error)
      }
    })

    return () => subscription.unsubscribe()
  }, [form, isHydrated])

  // Function to clear saved form data
  const clearSavedData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      form.reset(defaultValues)
    } catch (error) {
      console.error("Failed to clear checkout form data:", error)
    }
  }

  return {
    form,
    isHydrated,
    clearSavedData,
  }
}


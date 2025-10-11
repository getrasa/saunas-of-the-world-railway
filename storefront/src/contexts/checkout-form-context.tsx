"use client"

import React, { createContext, useContext } from "react"
import { UseFormReturn } from "react-hook-form"
import { CheckoutFormData } from "@lib/schemas/checkout.schema"

interface CheckoutFormContextValue {
  form: UseFormReturn<CheckoutFormData, any, CheckoutFormData>
  isSubmitting: boolean
  submitError: string | null
}

const CheckoutFormContext = createContext<CheckoutFormContextValue | undefined>(undefined)

export function CheckoutFormProvider({
  children,
  form,
  isSubmitting,
  submitError,
}: {
  children: React.ReactNode
  form: UseFormReturn<CheckoutFormData, any, CheckoutFormData>
  isSubmitting: boolean
  submitError: string | null
}) {
  return (
    <CheckoutFormContext.Provider value={{ form, isSubmitting, submitError }}>
      {children}
    </CheckoutFormContext.Provider>
  )
}

export function useCheckoutFormContext() {
  const context = useContext(CheckoutFormContext)
  if (!context) {
    throw new Error("useCheckoutFormContext must be used within CheckoutFormProvider")
  }
  return context
}


import { z } from "zod"

// Address schema
const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  countryCode: z.string()
    .min(2, "Please select a valid country")
    .max(2, "Country code must be 2 characters")
    .transform(val => val.toLowerCase()), // Always normalize to lowercase for MedusaJS
  province: z.string().min(1, "State/Province is required"),
  phone: z.string().optional(),
})

// Payment method enum
export const PaymentMethodEnum = z.enum(["credit_card", "pay_for_quote"])
export type PaymentMethod = z.infer<typeof PaymentMethodEnum>

// Main checkout form schema
export const checkoutFormSchema = z.object({
  // Shipping address
  shippingAddress: addressSchema,
  
  // Shipping method
  shippingMethodId: z.string().min(1, "Please select a shipping method"),
  
  // Contact info
  email: z.string().email("Please enter a valid email address"),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^[0-9\s+\-()]*$/, "Phone number can only contain numbers, spaces, +, -, and parentheses"),
  
  // Billing address
  billingAddressSameAsShipping: z.boolean(),
  billingAddress: addressSchema.optional(),
  
  // Payment
  paymentMethod: PaymentMethodEnum,
})
  .refine(
    (data) => {
      // If billing address is different, it must be provided
      if (!data.billingAddressSameAsShipping && !data.billingAddress) {
        return false
      }
      return true
    },
    {
      message: "Billing address is required when different from shipping address",
      path: ["billingAddress"],
    }
  )

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>

// Individual step schemas for progressive validation
export const shippingStepSchema = checkoutFormSchema.pick({
  shippingAddress: true,
  shippingMethodId: true,
  billingAddressSameAsShipping: true,
  billingAddress: true,
})

export const paymentStepSchema = checkoutFormSchema.pick({
  email: true,
  phone: true,
  paymentMethod: true,
})


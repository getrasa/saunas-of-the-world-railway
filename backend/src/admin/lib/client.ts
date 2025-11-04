import Medusa from "@medusajs/js-sdk"

// Declare global __BACKEND_URL__ injected by Medusa at build time
declare const __BACKEND_URL__: string

export const sdk = new Medusa({
  baseUrl: __BACKEND_URL__,
  auth: {
    type: "session",
    fetchCredentials: "include",
  },
})

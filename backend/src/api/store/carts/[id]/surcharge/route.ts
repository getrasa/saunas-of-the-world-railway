import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import type { ICartModuleService } from "@medusajs/framework/types"

const SURCHARGE_TITLE = "Credit Card Processing Fee (2%)"
const SURCHARGE_RATE = 0.02 // 2%

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id: cartId } = req.params
  const cartModuleService: ICartModuleService = req.scope.resolve(Modules.CART)
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  try {
    // Retrieve cart with line items using query
    const { data: carts } = await query.graph({
      entity: "cart",
      fields: ["id", "items.*", "items.metadata"],
      filters: { id: cartId },
    })

    const cart = carts[0]

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ 
        error: "Cart not found or has no items" 
      })
    }

    // Check if surcharge already exists - if so, remove it for recalculation
    const existingSurcharge = cart.items.find(
      (item: any) => item.title === SURCHARGE_TITLE || item.metadata?.is_surcharge === true
    )

    if (existingSurcharge) {
      // Remove existing surcharge to recalculate with updated cart
      await cartModuleService.deleteLineItems(existingSurcharge.id)
    }

    // Calculate total cart value (excluding existing surcharges)
    let cartSubtotal = 0
    cart.items.forEach((item: any) => {
      // Skip surcharge items in calculation
      if (item.is_custom_price && item.title === SURCHARGE_TITLE) return
      
      const unitPrice = Number(item.unit_price || 0)
      const quantity = Number(item.quantity || 1)
      cartSubtotal += unitPrice * quantity
    })

    const surchargeAmount = Math.round(cartSubtotal * SURCHARGE_RATE)

    // Add surcharge as a custom line item
    await cartModuleService.addLineItems({
      cart_id: cartId,
      title: SURCHARGE_TITLE,
      unit_price: surchargeAmount,
      quantity: 1,
      is_custom_price: true,
      requires_shipping: false, // Fee doesn't need shipping
      metadata: {
        is_surcharge: true,
        surcharge_type: 'credit_card_fee',
      },
    })

    // Retrieve updated cart
    const updatedCart = await cartModuleService.retrieveCart(cartId, {
      relations: ["items"],
    })

    res.status(200).json({ cart: updatedCart })
  } catch (error) {
    console.error("Error adding surcharge:", error)
    res.status(500).json({ 
      error: "Failed to add credit card surcharge" 
    })
  }
}

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id: cartId } = req.params
  const cartModuleService: ICartModuleService = req.scope.resolve(Modules.CART)
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  try {
    // Retrieve cart with line items using query
    const { data: carts } = await query.graph({
      entity: "cart",
      fields: ["id", "items.*", "items.metadata"],
      filters: { id: cartId },
    })

    const cart = carts[0]

    if (!cart || !cart.items) {
      return res.status(400).json({ 
        error: "Cart not found" 
      })
    }

    // Find and remove surcharge line items
    const surchargeItems = cart.items.filter(
      (item: any) => item.title === SURCHARGE_TITLE || item.metadata?.is_surcharge === true
    )

    if (surchargeItems.length > 0) {
      for (const item of surchargeItems) {
        await cartModuleService.deleteLineItems(item.id)
      }
    }

    // Retrieve updated cart
    const updatedCart = await cartModuleService.retrieveCart(cartId, {
      relations: ["items"],
    })

    res.status(200).json({ cart: updatedCart })
  } catch (error) {
    console.error("Error removing surcharge:", error)
    res.status(500).json({ 
      error: "Failed to remove credit card surcharge" 
    })
  }
}


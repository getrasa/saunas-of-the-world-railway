import { retrieveCart, enrichLineItems } from "@lib/data/cart";
import { NextResponse } from "next/server";
import { HttpTypes } from "@medusajs/types";

export async function GET() {
  try {
    const cart = await retrieveCart();
    
    if (!cart) {
      return NextResponse.json({ cart: null }, { status: 200 });
    }

    // Enrich line items if they exist
    if (cart?.items?.length && cart.region_id) {
      const enrichedItems = await enrichLineItems(cart.items, cart.region_id);
      cart.items = enrichedItems as HttpTypes.StoreCartLineItem[];
    }

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart', cart: null },
      { status: 500 }
    );
  }
}

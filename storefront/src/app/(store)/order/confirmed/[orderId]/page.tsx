import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ThankYou } from "~/components/store/checkout"
import { OrderSummaryConfirmation } from "~/components/store/checkout"
import { retrieveOrder } from "@lib/data/orders"
import { enrichLineItems } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your order was successful",
}

interface OrderConfirmationPageProps {
  params: {
    orderId: string
  }
  searchParams: {
    payment_method?: string
  }
}

async function getOrder(id: string) {
  const order = await retrieveOrder(id)

  if (!order) {
    return null
  }

  const enrichedItems = await enrichLineItems(order.items || [], order.region_id!)

  return {
    ...order,
    items: enrichedItems,
  } as unknown as HttpTypes.StoreOrder
}

export default async function OrderConfirmationPage({
  params,
  searchParams,
}: OrderConfirmationPageProps) {
  const order = await getOrder(params.orderId)
  
  if (!order) {
    return notFound()
  }

  // Detect payment method from order payment provider or query param
  const paymentProvider = order.payment_collections?.[0]?.payment_sessions?.[0]?.provider_id || ''
  const isQuotePayment = searchParams.payment_method === 'pay_for_quote' || 
                         paymentProvider.includes('manual')

  return (
    <div className="min-h-screen bg-neutral-100 w-full pb-16 pt-8">
      <div className="mx-auto max-w-[1512px] px-[52px]">
        <div className="flex gap-4 justify-center">
          <ThankYou order={order} isQuotePayment={isQuotePayment} />
          <OrderSummaryConfirmation order={order} />
        </div>
      </div>
    </div>
  )
}


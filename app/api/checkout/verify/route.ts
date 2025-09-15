import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Temporary in-memory order store fallback (replace with real shared module if added elsewhere)
// If you already created lib/orders.ts, swap these with real imports.
interface OrderRecord {
  id: string
  razorpayOrderId: string
  status: "pending" | "paid" | "failed"
  paymentId?: string
}

// Minimal singleton map (will reset on server restart)
const orderStore: Map<string, OrderRecord> = (global as any).__ORDERS__ || new Map()
if (!(global as any).__ORDERS__) {
  ;(global as any).__ORDERS__ = orderStore
}

function getOrder(id: string) {
  return orderStore.get(id)
}

function markPaid(id: string, paymentId: string) {
  const o = orderStore.get(id)
  if (!o) return null
  o.status = "paid"
  o.paymentId = paymentId
  orderStore.set(id, o)
  return o
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const secret = process.env.RAZORPAY_KEY_SECRET
    if (!secret) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 })
    }

    const order = getOrder(orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (order.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: "Order ID mismatch" }, { status: 400 })
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`
    const expected = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex")

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "Signature mismatch" }, { status: 400 })
    }

    markPaid(orderId, razorpay_payment_id)

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Verification failed" }, { status: 500 })
  }
}

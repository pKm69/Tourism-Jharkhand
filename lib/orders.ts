type OrderStatus = "pending" | "paid" | "failed"

export interface Order {
  id: string
  productId: number
  title: string
  amount: number        // in paise
  currency: string
  qty: number
  status: OrderStatus
  razorpayOrderId: string
  paymentId?: string
  createdAt: number
  updatedAt: number
}

const store = new Map<string, Order>()

export function createOrder(o: Omit<Order, "createdAt" | "updatedAt">) {
  const order: Order = { ...o, createdAt: Date.now(), updatedAt: Date.now() }
  store.set(order.id, order)
  return order
}

export function getOrder(id: string) {
  return store.get(id) || null
}

export function markPaid(id: string, paymentId: string) {
  const o = store.get(id)
  if (!o) return null
  o.status = "paid"
  o.paymentId = paymentId
  o.updatedAt = Date.now()
  return o
}
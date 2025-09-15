import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { razorpay } from "@/lib/razorpay"
import { createOrder } from "@/lib/orders"

interface Body {
  productId: number
  name: string
  amount: number    // numeric total in INR (NOT paise)
  qty: number
}

const mockProducts: Record<number, { id: number; name: string; price: number }> = {
  1: { id:1, name:"Traditional Sohrai Art Painting", price:2500 },
  2: { id:2, name:"Tribal Homestay Experience", price:1200 },
  3: { id:3, name:"Dokra Metal Craft Workshop", price:800 },
  4: { id:4, name:"Organic Tribal Honey", price:450 },
  5: { id:5, name:"Local Guide - Wildlife Safari", price:1500 },
  6: { id:6, name:"Bamboo Handicraft Set", price:1800 },
  7: { id:7, name:"Traditional Jharkhand Thali", price:300 },
  8: { id:8, name:"Eco-friendly Transport Service", price:12 } // per km (simplified)
}

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json()
    const product = mockProducts[body.productId]
    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 })
    }

    // Recompute total server-side
    const unit = product.price
    const qty = Math.max(1, body.qty || 1)
    const amountInPaise = unit * qty * 100

    const rpOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
      notes: { productId: product.id.toString() }
    })

    const localOrderId = "ord_" + crypto.randomBytes(6).toString("hex")
    createOrder({
      id: localOrderId,
      productId: product.id,
      title: product.name,
      amount: amountInPaise,
      currency: "INR",
      qty,
      status: "pending",
      razorpayOrderId: rpOrder.id
    })

    return NextResponse.json({
      orderId: localOrderId,
      razorpayOrderId: rpOrder.id,
      amount: amountInPaise,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID
    })
  } catch (e:any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'

// Mock orders database
let orders = [
  {
    id: "ORD_001",
    userId: "user_123",
    productId: 1,
    vendorId: "seller_1",
    orderType: "purchase", // purchase, booking, service
    status: "confirmed", // pending, confirmed, in_progress, completed, cancelled
    quantity: 1,
    totalAmount: 2500,
    paymentMethod: "UPI",
    paymentStatus: "completed",
    transactionId: "TXN_ABC123",
    blockchainHash: "0xabcdef1234567890",
    orderDate: "2024-01-15T10:30:00Z",
    expectedDelivery: "2024-01-25T18:00:00Z",
    shippingAddress: {
      name: "John Doe",
      phone: "+91-9876543210",
      address: "123 Main Street, Ranchi, Jharkhand - 834001",
      landmark: "Near City Mall"
    },
    orderNotes: "Please handle with care - fragile artwork",
    trackingInfo: {
      currentStatus: "In Transit",
      estimatedDelivery: "2024-01-25",
      trackingNumber: "TRK123456789"
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const vendorId = searchParams.get('vendorId')
    const status = searchParams.get('status')
    
    let filteredOrders = [...orders]

    if (userId) {
      filteredOrders = filteredOrders.filter(o => o.userId === userId)
    }

    if (vendorId) {
      filteredOrders = filteredOrders.filter(o => o.vendorId === vendorId)
    }

    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status)
    }

    return NextResponse.json({ orders: filteredOrders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newOrder = {
      id: `ORD_${String(orders.length + 1).padStart(3, '0')}`,
      ...body,
      orderDate: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'pending',
      blockchainHash: `0x${Math.random().toString(16).substr(2, 16)}` // Mock blockchain hash
    }

    orders.push(newOrder)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, status, paymentStatus, trackingInfo } = body
    
    const orderIndex = orders.findIndex(o => o.id === orderId)
    
    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      ...(status && { status }),
      ...(paymentStatus && { paymentStatus }),
      ...(trackingInfo && { trackingInfo }),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(orders[orderIndex])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

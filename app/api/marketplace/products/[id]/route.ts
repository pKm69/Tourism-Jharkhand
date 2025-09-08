import { NextRequest, NextResponse } from 'next/server'

// Mock database - In production, this would be a real database
const products = [
  {
    id: 1,
    name: "Traditional Sohrai Art Painting",
    images: ["/jharkhand-tribal-handicrafts-marketplace-artisans.jpg", "/sohrai-art-detail.jpg"],
    price: 2500,
    originalPrice: 3000,
    rating: 4.8,
    reviews: 24,
    sellerId: "seller_1",
    seller: "Kumari Devi",
    location: "Hazaribagh",
    category: "Handicrafts",
    description: "Authentic tribal wall art featuring traditional Sohrai patterns passed down through generations",
    longDescription: "This beautiful Sohrai art painting represents centuries of tribal tradition from Hazaribagh. Each piece is hand-painted using natural pigments and traditional techniques that have been preserved by the Kurmi and Santhal communities. The intricate patterns tell stories of harvest festivals and nature worship.",
    isVerified: true,
    isFavorite: false,
    tags: ["Handmade", "Traditional", "Eco-friendly"],
    stock: 5,
    dimensions: "24x18 inches",
    materials: ["Natural pigments", "Canvas", "Bamboo frame"],
    craftingTime: "7-10 days",
    shippingTime: "3-5 days",
    returnPolicy: "30 days return policy",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id)
    const product = products.find(p => p.id === productId)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id)
    const body = await request.json()
    const productIndex = products.findIndex(p => p.id === productId)

    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    products[productIndex] = {
      ...products[productIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(products[productIndex])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

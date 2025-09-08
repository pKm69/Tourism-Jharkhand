import { NextRequest, NextResponse } from 'next/server'

// Mock database - In production, this would be a real database
let products = [
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
  },
  {
    id: 2,
    name: "Tribal Homestay Experience",
    images: ["/tribal-homestay-exterior.jpg", "/tribal-homestay-interior.jpg"],
    price: 1200,
    originalPrice: null,
    rating: 4.9,
    reviews: 18,
    sellerId: "seller_2",
    seller: "Birsa Munda Family",
    location: "Netarhat",
    category: "Homestays",
    description: "Stay with a local tribal family and experience authentic culture",
    longDescription: "Immerse yourself in authentic tribal life with the Birsa Munda family in the scenic hills of Netarhat. Experience traditional cooking, folk dances, and stories passed down through generations. The homestay includes organic meals, cultural activities, and guided nature walks.",
    isVerified: true,
    isFavorite: true,
    tags: ["Cultural", "Authentic", "Family-friendly"],
    stock: 2,
    amenities: ["Organic meals", "Cultural activities", "Nature walks", "Traditional music"],
    maxGuests: 6,
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Dokra Metal Craft Workshop",
    images: ["/dokra-workshop.jpg", "/dokra-artisan.jpg"],
    price: 800,
    originalPrice: null,
    rating: 4.7,
    reviews: 32,
    sellerId: "seller_3",
    seller: "Raman Kumar",
    location: "Ranchi",
    category: "Experiences",
    description: "Learn the ancient art of Dokra metal casting from master artisans",
    longDescription: "Join master craftsman Raman Kumar for an immersive 4-hour workshop learning the 4000-year-old Dokra metal casting technique. Create your own brass figurine using the lost-wax casting method while learning about the cultural significance of this ancient art form.",
    isVerified: true,
    isFavorite: false,
    tags: ["Workshop", "Traditional", "Hands-on"],
    stock: 8,
    duration: "4 hours",
    groupSize: "Max 8 participants",
    includes: ["Materials", "Tools", "Refreshments", "Certificate"],
    skillLevel: "Beginner friendly",
    languages: ["Hindi", "English", "Mundari"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let filteredProducts = [...products]

    // Apply filters
    if (category && category !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.category === category)
    }

    if (location && location !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.location === location)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price_high':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        // Most popular (by reviews)
        filteredProducts.sort((a, b) => b.reviews - a.reviews)
    }

    // Apply pagination
    const paginatedProducts = filteredProducts.slice(offset, offset + limit)

    return NextResponse.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      hasMore: offset + limit < filteredProducts.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newProduct = {
      id: products.length + 1,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 0,
      reviews: 0,
      isVerified: false
    }

    products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

// Mock vendor database
const vendors = [
  {
    id: "seller_1",
    name: "Kumari Devi",
    profileImage: "/vendor-kumari-devi.jpg",
    location: "Hazaribagh",
    category: "Handicrafts",
    specialization: "Sohrai & Khovar Art",
    isVerified: true,
    verificationDate: "2024-01-15",
    blockchainId: "0x1a2b3c4d5e6f7890abcdef1234567890",
    rating: 4.8,
    totalReviews: 156,
    totalSales: 342,
    joinedDate: "2023-06-10",
    description: "Master artisan specializing in traditional Sohrai and Khovar wall paintings. Third-generation artist preserving ancient tribal art forms.",
    languages: ["Hindi", "English", "Mundari"],
    certifications: [
      "Traditional Art Master Certificate",
      "Jharkhand Handicrafts Board Recognition",
      "UNESCO Intangible Heritage Contributor"
    ],
    socialImpact: {
      familiesSupported: 12,
      apprenticesTrained: 8,
      communityProjects: 3
    },
    contact: {
      phone: "+91-9876543210",
      email: "kumari.devi@tribalarts.com",
      whatsapp: "+91-9876543210"
    },
    businessHours: "9:00 AM - 6:00 PM",
    responseTime: "Within 2 hours",
    products: [1, 15, 23, 31]
  },
  {
    id: "seller_2",
    name: "Birsa Munda Family",
    profileImage: "/vendor-birsa-family.jpg",
    location: "Netarhat",
    category: "Homestays",
    specialization: "Cultural Homestay Experience",
    isVerified: true,
    verificationDate: "2024-02-20",
    blockchainId: "0x2b3c4d5e6f7890abcdef1234567890ab",
    rating: 4.9,
    totalReviews: 89,
    totalSales: 156,
    joinedDate: "2023-08-22",
    description: "Traditional Munda family offering authentic tribal homestay experiences in the beautiful hills of Netarhat.",
    languages: ["Hindi", "English", "Mundari", "Ho"],
    certifications: [
      "Tourism Board Homestay License",
      "Cultural Heritage Ambassador",
      "Sustainable Tourism Certificate"
    ],
    socialImpact: {
      guestsHosted: 456,
      culturalProgramsOrganized: 24,
      localEmploymentCreated: 6
    },
    contact: {
      phone: "+91-9876543211",
      email: "birsa.family@netarhathomestay.com",
      whatsapp: "+91-9876543211"
    },
    businessHours: "24/7 (Homestay)",
    responseTime: "Within 1 hour",
    products: [2, 18, 25]
  },
  {
    id: "seller_3",
    name: "Raman Kumar",
    profileImage: "/vendor-raman-kumar.jpg",
    location: "Ranchi",
    category: "Experiences",
    specialization: "Dokra Metal Craft Workshops",
    isVerified: true,
    verificationDate: "2024-01-30",
    blockchainId: "0x3c4d5e6f7890abcdef1234567890abcd",
    rating: 4.7,
    totalReviews: 124,
    totalSales: 289,
    joinedDate: "2023-05-15",
    description: "Master craftsman with 25 years of experience in Dokra metal casting. Conducts workshops to preserve this ancient art form.",
    languages: ["Hindi", "English", "Santali"],
    certifications: [
      "Master Craftsman Certificate",
      "Workshop Instructor License",
      "Cultural Heritage Preservation Award"
    ],
    socialImpact: {
      studentsTrained: 156,
      workshopsConducted: 89,
      artisansSupported: 15
    },
    contact: {
      phone: "+91-9876543212",
      email: "raman.kumar@dokracraft.com",
      whatsapp: "+91-9876543212"
    },
    businessHours: "10:00 AM - 7:00 PM",
    responseTime: "Within 30 minutes",
    products: [3, 12, 19, 27]
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const verified = searchParams.get('verified')
    
    let filteredVendors = [...vendors]

    if (category && category !== 'All') {
      filteredVendors = filteredVendors.filter(v => v.category === category)
    }

    if (location && location !== 'All') {
      filteredVendors = filteredVendors.filter(v => v.location === location)
    }

    if (verified === 'true') {
      filteredVendors = filteredVendors.filter(v => v.isVerified)
    }

    return NextResponse.json({ vendors: filteredVendors })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newVendor = {
      id: `seller_${vendors.length + 1}`,
      ...body,
      isVerified: false,
      joinedDate: new Date().toISOString(),
      rating: 0,
      totalReviews: 0,
      totalSales: 0,
      products: []
    }

    vendors.push(newVendor)

    return NextResponse.json(newVendor, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create vendor profile' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

// Mock AI recommendation engine
const products = [
  { id: 1, category: "Handicrafts", tags: ["Handmade", "Traditional", "Eco-friendly"], price: 2500, rating: 4.8, location: "Hazaribagh" },
  { id: 2, category: "Homestays", tags: ["Cultural", "Authentic", "Family-friendly"], price: 1200, rating: 4.9, location: "Netarhat" },
  { id: 3, category: "Experiences", tags: ["Workshop", "Traditional", "Hands-on"], price: 800, rating: 4.7, location: "Ranchi" }
]

const userPreferences = {
  "user_123": {
    preferredCategories: ["Handicrafts", "Experiences"],
    priceRange: { min: 500, max: 3000 },
    interests: ["Traditional", "Handmade", "Cultural"],
    previousPurchases: [1, 3],
    location: "Ranchi"
  }
}

function calculateSimilarity(product1: any, product2: any): number {
  let similarity = 0
  
  // Category similarity
  if (product1.category === product2.category) similarity += 0.3
  
  // Tag similarity
  const commonTags = product1.tags.filter((tag: string) => product2.tags.includes(tag))
  similarity += (commonTags.length / Math.max(product1.tags.length, product2.tags.length)) * 0.4
  
  // Price similarity (closer prices get higher similarity)
  const priceDiff = Math.abs(product1.price - product2.price)
  const maxPrice = Math.max(product1.price, product2.price)
  similarity += (1 - (priceDiff / maxPrice)) * 0.2
  
  // Location similarity
  if (product1.location === product2.location) similarity += 0.1
  
  return similarity
}

function getCollaborativeRecommendations(userId: string, limit: number = 5) {
  const userPref = userPreferences[userId as keyof typeof userPreferences]
  if (!userPref) return []

  // Find similar products based on previous purchases
  const recommendations: any[] = []
  
  userPref.previousPurchases.forEach(purchasedId => {
    const purchasedProduct = products.find(p => p.id === purchasedId)
    if (!purchasedProduct) return

    products.forEach(product => {
      if (product.id === purchasedId) return // Skip already purchased
      if (recommendations.find(r => r.id === product.id)) return // Skip duplicates

      const similarity = calculateSimilarity(purchasedProduct, product)
      
      if (similarity > 0.3) { // Threshold for recommendation
        recommendations.push({
          ...product,
          recommendationScore: similarity,
          reason: `Similar to your previous purchase: ${purchasedProduct.category}`
        })
      }
    })
  })

  return recommendations
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, limit)
}

function getContentBasedRecommendations(userId: string, limit: number = 5) {
  const userPref = userPreferences[userId as keyof typeof userPreferences]
  if (!userPref) return []

  const recommendations = products
    .filter(product => {
      // Filter by preferred categories
      if (!userPref.preferredCategories.includes(product.category)) return false
      
      // Filter by price range
      if (product.price < userPref.priceRange.min || product.price > userPref.priceRange.max) return false
      
      // Check if product has user's interests
      const hasInterest = product.tags.some(tag => userPref.interests.includes(tag))
      return hasInterest
    })
    .map(product => {
      // Calculate content-based score
      let score = 0
      
      // Category preference score
      score += 0.3
      
      // Interest alignment score
      const matchingInterests = product.tags.filter(tag => userPref.interests.includes(tag))
      score += (matchingInterests.length / userPref.interests.length) * 0.4
      
      // Rating score
      score += (product.rating / 5) * 0.2
      
      // Location preference (if same location)
      if (product.location === userPref.location) score += 0.1

      return {
        ...product,
        recommendationScore: score,
        reason: `Matches your interests: ${matchingInterests.join(', ')}`
      }
    })
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, limit)

  return recommendations
}

function getTrendingRecommendations(limit: number = 5) {
  // Mock trending algorithm based on rating and recent activity
  return products
    .map(product => ({
      ...product,
      recommendationScore: product.rating * 0.7 + Math.random() * 0.3, // Mock trending score
      reason: "Trending in your area"
    }))
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, limit)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const type = searchParams.get('type') || 'mixed' // collaborative, content, trending, mixed
    const limit = parseInt(searchParams.get('limit') || '10')

    let recommendations: any[] = []

    switch (type) {
      case 'collaborative':
        recommendations = userId ? getCollaborativeRecommendations(userId, limit) : []
        break
      case 'content':
        recommendations = userId ? getContentBasedRecommendations(userId, limit) : []
        break
      case 'trending':
        recommendations = getTrendingRecommendations(limit)
        break
      case 'mixed':
      default:
        if (userId) {
          const collaborative = getCollaborativeRecommendations(userId, Math.ceil(limit / 3))
          const content = getContentBasedRecommendations(userId, Math.ceil(limit / 3))
          const trending = getTrendingRecommendations(Math.ceil(limit / 3))
          
          recommendations = [...collaborative, ...content, ...trending]
            .sort((a, b) => b.recommendationScore - a.recommendationScore)
            .slice(0, limit)
        } else {
          recommendations = getTrendingRecommendations(limit)
        }
    }

    return NextResponse.json({
      recommendations,
      algorithm: type,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

// Mock sentiment analysis function - In production, integrate with actual NLP services
function analyzeSentiment(text: string, language: string = 'en'): {
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  emotions: { [key: string]: number }
  keywords: string[]
} {
  // Simple sentiment analysis simulation
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'beautiful', 'love', 'perfect', 'awesome', 'fantastic']
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'worst', 'disappointing', 'poor', 'dirty', 'unsafe']
  
  // Hindi positive/negative words
  const hindiPositive = ['अच्छा', 'बहुत', 'सुंदर', 'खुश', 'प्रसन्न', 'उत्कृष्ट']
  const hindiNegative = ['बुरा', 'गंदा', 'खराब', 'दुखी', 'निराश']

  const words = text.toLowerCase().split(/\s+/)
  let positiveCount = 0
  let negativeCount = 0
  let keywords: string[] = []

  words.forEach(word => {
    if (positiveWords.includes(word) || hindiPositive.includes(word)) {
      positiveCount++
      keywords.push(word)
    }
    if (negativeWords.includes(word) || hindiNegative.includes(word)) {
      negativeCount++
      keywords.push(word)
    }
  })

  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral'
  let confidence = 0.5

  if (positiveCount > negativeCount) {
    sentiment = 'positive'
    confidence = Math.min(0.9, 0.5 + (positiveCount - negativeCount) * 0.1)
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative'
    confidence = Math.min(0.9, 0.5 + (negativeCount - positiveCount) * 0.1)
  }

  // Mock emotion detection
  const emotions = {
    joy: sentiment === 'positive' ? confidence * 0.8 : 0.1,
    anger: sentiment === 'negative' ? confidence * 0.6 : 0.1,
    sadness: sentiment === 'negative' ? confidence * 0.4 : 0.1,
    surprise: 0.2,
    fear: text.includes('unsafe') || text.includes('scared') ? 0.7 : 0.1,
    disgust: text.includes('dirty') || text.includes('awful') ? 0.6 : 0.1
  }

  return { sentiment, confidence, emotions, keywords }
}

// Mock feedback database
let feedbacks: any[] = [
  {
    id: 1,
    userId: "user_123",
    userName: "Rajesh Kumar",
    location: "Netarhat",
    category: "Homestays",
    rating: 5,
    textFeedback: "Amazing experience staying with the local family. The food was delicious and the cultural activities were wonderful!",
    language: "en",
    sentiment: "positive",
    confidence: 0.9,
    emotions: { joy: 0.8, satisfaction: 0.7 },
    keywords: ["amazing", "delicious", "wonderful"],
    timestamp: new Date().toISOString(),
    isVerified: true,
    responseFromVendor: null,
    flagged: false
  },
  {
    id: 2,
    userId: "user_456",
    userName: "Priya Sharma",
    location: "Betla National Park",
    category: "Experiences",
    rating: 2,
    textFeedback: "The guide was unprofessional and the safari was disappointing. Poor organization overall.",
    language: "en",
    sentiment: "negative",
    confidence: 0.8,
    emotions: { anger: 0.6, disappointment: 0.7 },
    keywords: ["unprofessional", "disappointing", "poor"],
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    isVerified: true,
    responseFromVendor: "We apologize for the poor experience. We have addressed this with our guide team.",
    flagged: true
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    const category = searchParams.get('category')
    const sentiment = searchParams.get('sentiment')
    const flagged = searchParams.get('flagged')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let filteredFeedbacks = [...feedbacks]

    if (location && location !== 'All') {
      filteredFeedbacks = filteredFeedbacks.filter(f => f.location === location)
    }

    if (category && category !== 'All') {
      filteredFeedbacks = filteredFeedbacks.filter(f => f.category === category)
    }

    if (sentiment && sentiment !== 'All') {
      filteredFeedbacks = filteredFeedbacks.filter(f => f.sentiment === sentiment)
    }

    if (flagged === 'true') {
      filteredFeedbacks = filteredFeedbacks.filter(f => f.flagged)
    }

    // Sort by timestamp (newest first)
    filteredFeedbacks.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    const paginatedFeedbacks = filteredFeedbacks.slice(offset, offset + limit)

    // Calculate sentiment statistics
    const sentimentStats = {
      positive: filteredFeedbacks.filter(f => f.sentiment === 'positive').length,
      negative: filteredFeedbacks.filter(f => f.sentiment === 'negative').length,
      neutral: filteredFeedbacks.filter(f => f.sentiment === 'neutral').length,
      total: filteredFeedbacks.length
    }

    return NextResponse.json({
      feedbacks: paginatedFeedbacks,
      total: filteredFeedbacks.length,
      sentimentStats,
      hasMore: offset + limit < filteredFeedbacks.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userName, location, category, rating, textFeedback, language = 'en', voiceData, emojiRating } = body

    // Analyze sentiment
    const analysis = analyzeSentiment(textFeedback, language)

    // Check for flagging conditions
    const flagged = analysis.sentiment === 'negative' && analysis.confidence > 0.7 && 
                   (analysis.keywords.some(k => ['unsafe', 'scam', 'fraud', 'terrible', 'awful'].includes(k)))

    const newFeedback = {
      id: feedbacks.length + 1,
      userId,
      userName,
      location,
      category,
      rating,
      textFeedback,
      language,
      voiceData,
      emojiRating,
      sentiment: analysis.sentiment,
      confidence: analysis.confidence,
      emotions: analysis.emotions,
      keywords: analysis.keywords,
      timestamp: new Date().toISOString(),
      isVerified: false,
      responseFromVendor: null,
      flagged
    }

    feedbacks.push(newFeedback)

    // If flagged, trigger alert (in production, this would send notifications)
    if (flagged) {
      console.log(`ALERT: Negative feedback flagged for ${location} - ${category}`)
    }

    return NextResponse.json(newFeedback, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { feedbackId, responseFromVendor, flagged } = body

    const feedbackIndex = feedbacks.findIndex(f => f.id === feedbackId)
    if (feedbackIndex === -1) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 })
    }

    feedbacks[feedbackIndex] = {
      ...feedbacks[feedbackIndex],
      ...(responseFromVendor && { responseFromVendor }),
      ...(typeof flagged === 'boolean' && { flagged }),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(feedbacks[feedbackIndex])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 })
  }
}

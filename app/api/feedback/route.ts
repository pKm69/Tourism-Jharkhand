import { NextRequest, NextResponse } from 'next/server'
import { aiService, AIAnalysisResult, VoiceAnalysisResult, ImageAnalysisResult } from '@/lib/ai-services'

// Enhanced feedback interface
interface EnhancedFeedback {
  id: number
  userId: string
  userName: string
  location: string
  category: string
  rating: number
  textFeedback?: string
  language: string
  voiceData?: string
  imageData?: string
  emojiRating?: string
  aiAnalysis: AIAnalysisResult
  voiceAnalysis?: VoiceAnalysisResult
  imageAnalysis?: ImageAnalysisResult
  timestamp: string
  isVerified: boolean
  responseFromVendor?: string
  flagged: boolean
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  autoResponseGenerated?: string
  escalated?: boolean
  resolvedAt?: string
  satisfactionFollowUp?: number
}

// Real-time alert system
class AlertSystem {
  static async triggerAlert(feedback: EnhancedFeedback) {
    if (feedback.urgencyLevel === 'critical' || feedback.urgencyLevel === 'high') {
      // In production, this would send real notifications
      console.log(`🚨 CRITICAL ALERT: ${feedback.location} - ${feedback.category}`);
      console.log(`Issue: ${feedback.aiAnalysis.actionableInsights?.join(', ')}`);
      
      // Auto-generate response for critical issues
      feedback.autoResponseGenerated = await this.generateAutoResponse(feedback);
      feedback.escalated = true;
    }
  }

  static async generateAutoResponse(feedback: EnhancedFeedback): Promise<string> {
    const insights = feedback.aiAnalysis.actionableInsights || [];
    
    if (insights.some(i => i.includes('URGENT') || i.includes('Safety'))) {
      return `Thank you for bringing this safety concern to our attention. We have immediately escalated this issue to our safety team and will address it within 24 hours. Your safety is our top priority.`;
    }
    
    if (feedback.aiAnalysis.sentiment === 'negative' && feedback.aiAnalysis.confidence > 0.8) {
      return `We sincerely apologize for your disappointing experience. We have forwarded your feedback to the relevant team for immediate action. We will contact you within 48 hours with an update on the improvements being made.`;
    }
    
    return `Thank you for your valuable feedback. We appreciate you taking the time to share your experience with us.`;
  }
}

// Advanced AI-powered feedback analysis
async function analyzeAdvancedFeedback(
  textFeedback?: string,
  voiceBlob?: Blob,
  imageBlob?: Blob,
  language: string = 'auto'
): Promise<{
  aiAnalysis?: AIAnalysisResult
  voiceAnalysis?: VoiceAnalysisResult
  imageAnalysis?: ImageAnalysisResult
}> {
  try {
    const results: any = {}

    // Analyze text if provided
    if (textFeedback) {
      results.aiAnalysis = await aiService.analyzeText(textFeedback, language)
    }

    // Analyze voice if provided
    if (voiceBlob) {
      results.voiceAnalysis = await aiService.analyzeVoice(voiceBlob)
      
      // If no text feedback, use voice transcription for text analysis
      if (!textFeedback && results.voiceAnalysis.transcription) {
        results.aiAnalysis = await aiService.analyzeText(results.voiceAnalysis.transcription, language)
      }
    }

    // Analyze image if provided
    if (imageBlob) {
      results.imageAnalysis = await aiService.analyzeImage(imageBlob)
    }

    return results
  } catch (error) {
    console.error('Advanced feedback analysis failed:', error)
    
    // Fallback analysis
    if (textFeedback) {
      return {
        aiAnalysis: await aiService.analyzeText(textFeedback, language)
      }
    }
    
    throw error
  }
}

// Real-time sentiment monitoring
class SentimentMonitor {
  private static sentimentHistory: Array<{
    timestamp: string
    sentiment: string
    confidence: number
    location: string
    category: string
  }> = []

  static addSentiment(feedback: EnhancedFeedback) {
    this.sentimentHistory.push({
      timestamp: feedback.timestamp,
      sentiment: feedback.aiAnalysis.sentiment,
      confidence: feedback.aiAnalysis.confidence,
      location: feedback.location,
      category: feedback.category
    })

    // Keep only last 1000 entries
    if (this.sentimentHistory.length > 1000) {
      this.sentimentHistory = this.sentimentHistory.slice(-1000)
    }

    // Check for sentiment trends
    this.checkSentimentTrends(feedback.location, feedback.category)
  }

  static checkSentimentTrends(location: string, category: string) {
    const recentFeedbacks = this.sentimentHistory
      .filter(s => s.location === location && s.category === category)
      .slice(-10) // Last 10 feedbacks for this location/category

    if (recentFeedbacks.length >= 5) {
      const negativeFeedbacks = recentFeedbacks.filter(s => s.sentiment === 'negative')
      
      if (negativeFeedbacks.length >= 3) {
        console.log(`⚠️ TREND ALERT: Increasing negative sentiment detected for ${location} - ${category}`)
        // In production, this would trigger notifications to tourism officials
      }
    }
  }

  static getSentimentTrends(location?: string, category?: string) {
    let filtered = this.sentimentHistory
    
    if (location) {
      filtered = filtered.filter(s => s.location === location)
    }
    
    if (category) {
      filtered = filtered.filter(s => s.category === category)
    }
    
    return filtered.slice(-30) // Last 30 entries
  }
}

// AI-powered chatbot for instant responses
class FeedbackChatbot {
  static async generateResponse(feedback: EnhancedFeedback): Promise<string> {
    const { aiAnalysis, location, category } = feedback
    
    // Generate contextual response based on AI analysis
    if (aiAnalysis.urgency === 'critical') {
      return `Thank you for this critical feedback about ${location}. We are immediately addressing the ${aiAnalysis.categories?.join(', ')} issues you've mentioned. A senior official will contact you within 2 hours.`
    }
    
    if (aiAnalysis.sentiment === 'positive') {
      return `We're delighted to hear about your positive experience at ${location}! Thank you for highlighting ${aiAnalysis.keywords.slice(0, 3).join(', ')}. We'll share your feedback with our team.`
    }
    
    if (aiAnalysis.sentiment === 'negative') {
      const issues = aiAnalysis.actionableInsights?.slice(0, 2).join(' and ') || 'the issues you mentioned'
      return `We sincerely apologize for your experience at ${location}. We're taking immediate action on ${issues}. You can expect an update within 24-48 hours.`
    }
    
    return `Thank you for your feedback about ${location}. Your insights about ${category.toLowerCase()} are valuable for improving our tourism services.`
  }
  
  static async generateFollowUpQuestions(feedback: EnhancedFeedback): Promise<string[]> {
    const questions: string[] = []
    
    if (feedback.aiAnalysis.sentiment === 'negative') {
      questions.push('What specific steps would you like to see implemented to improve this experience?')
      questions.push('Would you be willing to revisit this location if improvements were made?')
    }
    
    if (feedback.aiAnalysis.categories?.includes('service quality')) {
      questions.push('Can you provide more details about the staff interaction?')
    }
    
    if (feedback.aiAnalysis.categories?.includes('cleanliness')) {
      questions.push('Which specific areas need attention regarding cleanliness?')
    }
    
    return questions.slice(0, 3)
  }
}

// Fallback rule-based sentiment analysis
function fallbackSentimentAnalysis(text: string, language: string): {
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  emotions: { [key: string]: number }
  keywords: string[]
} {
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

  const emotions = {
    joy: sentiment === 'positive' ? confidence * 0.8 : 0.1,
    anger: sentiment === 'negative' ? confidence * 0.6 : 0.1,
    sadness: sentiment === 'negative' ? confidence * 0.4 : 0.1,
    surprise: 0.2,
    fear: sentiment === 'negative' ? confidence * 0.3 : 0.05,
    disgust: sentiment === 'negative' ? confidence * 0.2 : 0.05
  }

  return {
    sentiment,
    confidence,
    emotions,
    keywords: keywords.slice(0, 5)
  }
}

// Enhanced feedback database with AI analysis
let feedbacks: EnhancedFeedback[] = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    const category = searchParams.get('category')
    const sentiment = searchParams.get('sentiment')
    const flagged = searchParams.get('flagged')
    const urgency = searchParams.get('urgency')
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
      filteredFeedbacks = filteredFeedbacks.filter(f => f.aiAnalysis.sentiment === sentiment)
    }

    if (flagged === 'true') {
      filteredFeedbacks = filteredFeedbacks.filter(f => f.flagged)
    }

    if (urgency && urgency !== 'All') {
      filteredFeedbacks = filteredFeedbacks.filter(f => f.urgencyLevel === urgency)
    }

    // Sort by timestamp (newest first)
    filteredFeedbacks.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    const paginatedFeedbacks = filteredFeedbacks.slice(offset, offset + limit)

    // Calculate sentiment statistics
    const sentimentStats = {
      positive: filteredFeedbacks.filter(f => f.aiAnalysis.sentiment === 'positive').length,
      negative: filteredFeedbacks.filter(f => f.aiAnalysis.sentiment === 'negative').length,
      neutral: filteredFeedbacks.filter(f => f.aiAnalysis.sentiment === 'neutral').length,
      total: filteredFeedbacks.length
    }

    // Calculate urgency statistics
    const urgencyStats = {
      critical: filteredFeedbacks.filter(f => f.urgencyLevel === 'critical').length,
      high: filteredFeedbacks.filter(f => f.urgencyLevel === 'high').length,
      medium: filteredFeedbacks.filter(f => f.urgencyLevel === 'medium').length,
      low: filteredFeedbacks.filter(f => f.urgencyLevel === 'low').length
    }

    // Get sentiment trends
    const sentimentTrends = SentimentMonitor.getSentimentTrends(location || undefined, category || undefined)

    return NextResponse.json({
      feedbacks: paginatedFeedbacks,
      total: filteredFeedbacks.length,
      sentimentStats,
      urgencyStats,
      sentimentTrends,
      hasMore: offset + limit < filteredFeedbacks.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userName, location, category, rating, textFeedback, language = 'auto', voiceData, imageData, emojiRating } = body

    // Advanced AI analysis
    let aiAnalysis: AIAnalysisResult
    let voiceAnalysis: VoiceAnalysisResult | undefined
    let imageAnalysis: ImageAnalysisResult | undefined

    try {
      // Convert base64 data to blobs if provided
      const voiceBlob = voiceData ? new Blob([Buffer.from(voiceData, 'base64')], { type: 'audio/wav' }) : undefined
      const imageBlob = imageData ? new Blob([Buffer.from(imageData, 'base64')], { type: 'image/jpeg' }) : undefined

      const analysisResults = await analyzeAdvancedFeedback(textFeedback, voiceBlob, imageBlob, language)
      aiAnalysis = analysisResults.aiAnalysis!
      voiceAnalysis = analysisResults.voiceAnalysis
      imageAnalysis = analysisResults.imageAnalysis
    } catch (error) {
      console.error('AI analysis failed, using fallback:', error)
      // Fallback to basic analysis
      aiAnalysis = {
        sentiment: 'neutral',
        confidence: 0.5,
        emotions: {},
        keywords: [],
        language: language || 'en',
        toxicity: 0,
        urgency: 'low',
        categories: [],
        actionableInsights: []
      }
    }

    // Determine urgency level
    const urgencyLevel = aiAnalysis.urgency || 'low'

    // Check for flagging conditions
    const flagged = (aiAnalysis.sentiment === 'negative' && aiAnalysis.confidence > 0.7) ||
                   (aiAnalysis.toxicity && aiAnalysis.toxicity > 0.5) ||
                   urgencyLevel === 'critical' || urgencyLevel === 'high'

    const newFeedback: EnhancedFeedback = {
      id: feedbacks.length + 1,
      userId,
      userName,
      location,
      category,
      rating,
      textFeedback,
      language: aiAnalysis.language,
      voiceData,
      imageData,
      emojiRating,
      aiAnalysis,
      voiceAnalysis,
      imageAnalysis,
      timestamp: new Date().toISOString(),
      isVerified: false,
      responseFromVendor: undefined,
      flagged,
      urgencyLevel
    }

    // Generate auto-response using AI chatbot
    try {
      newFeedback.autoResponseGenerated = await FeedbackChatbot.generateResponse(newFeedback)
    } catch (error) {
      console.error('Auto-response generation failed:', error)
    }

    feedbacks.push(newFeedback)

    // Add to sentiment monitoring
    SentimentMonitor.addSentiment(newFeedback)

    // Trigger alerts for critical issues
    await AlertSystem.triggerAlert(newFeedback)

    return NextResponse.json({
      ...newFeedback,
      followUpQuestions: await FeedbackChatbot.generateFollowUpQuestions(newFeedback)
    }, { status: 201 })
  } catch (error) {
    console.error('Failed to submit feedback:', error)
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

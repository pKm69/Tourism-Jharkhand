import { NextRequest, NextResponse } from 'next/server'
import { advancedAnalytics, AdvancedAnalytics } from '@/lib/advanced-analytics'

// Enhanced analytics interface
interface EnhancedAnalyticsData {
  overview: {
    totalVisitors: number
    totalRevenue: number
    averageSatisfaction: number
    totalBookings: number
    activeVendors: number
    totalFeedbacks: number
    growthRate: number
    alertLevel: 'green' | 'yellow' | 'orange' | 'red'
  }
  visitorTrends: Array<{
    month: string
    visitors: number
    revenue: number
    satisfaction: number
    bookings: number
    predictedVisitors?: number
    anomalyDetected?: boolean
  }>
  destinations: Array<{
    name: string
    visitors: number
    revenue: number
    satisfaction: number
    growth: number
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
    aiInsights: string[]
  }>
  demographics: {
    ageGroups: Array<{ group: string; percentage: number; count: number }>
    origin: Array<{ state: string; percentage: number; count: number }>
    purpose: Array<{ type: string; percentage: number; count: number }>
  }
  vendorPerformance: Array<{
    name: string
    category: string
    revenue: number
    orders: number
    rating: number
    growth: number
    aiScore: number
  }>
  sentimentTrends: Array<{
    date: string
    positive: number
    negative: number
    neutral: number
    toxicity: number
    urgency: number
  }>
  advancedAnalytics: AdvancedAnalytics
  predictions: {
    nextMonthVisitors: number
    peakSeason: string
    emergingDestinations: string[]
    riskAreas: string[]
    recommendedActions: string[]
    confidenceScore: number
  }
  lastUpdated: string
}

// AI-powered prediction engine using advanced machine learning
async function generateAdvancedPredictions(
  visitorData: any[], 
  destinations: any[], 
  sentimentTrends: any[], 
  feedbackData: any[], 
  revenueData: any[]
): Promise<AdvancedAnalytics> {
  try {
    // Use advanced analytics engine for comprehensive AI analysis
    const advancedAnalyticsResult = await advancedAnalytics.generateAdvancedAnalytics(
      visitorData,
      feedbackData,
      revenueData,
      destinations
    )

    return advancedAnalyticsResult
  } catch (error) {
    console.error('Advanced AI prediction generation failed:', error)
    // Fallback to basic predictions
    const visitorTrend = visitorData.slice(-6).map((d, i) => ({ x: i, y: d.visitors }))
    const slope = calculateSlope(visitorTrend)
    
    return {
      predictiveModels: {
        visitorForecast: {
          model: 'Basic Linear Regression',
          accuracy: 0.6,
          lastTrained: new Date().toISOString(),
          predictions: [{
            month: 'Next Month',
            predictedVisitors: Math.max(0, Math.floor(visitorData[visitorData.length - 1].visitors + slope)),
            confidence: 0.6
          }]
        },
        revenueProjection: {
          model: 'Revenue Trend Analysis',
          accuracy: 0.5,
          lastTrained: new Date().toISOString(),
          predictions: []
        },
        sentimentTrend: {
          model: 'Sentiment Moving Average',
          accuracy: 0.7,
          lastTrained: new Date().toISOString(),
          predictions: []
        },
        seasonalPattern: {
          model: 'Seasonal Decomposition',
          accuracy: 0.8,
          lastTrained: new Date().toISOString(),
          predictions: []
        },
        riskAssessment: {
          model: 'Risk Scoring Model',
          accuracy: 0.6,
          lastTrained: new Date().toISOString(),
          predictions: []
        }
      },
      mlInsights: [],
      realTimeMetrics: {
        currentVisitors: visitorData[visitorData.length - 1]?.visitors || 0,
        sentimentScore: 75,
        alertLevel: 'green' as const,
        trendDirection: slope > 0 ? 'up' as const : slope < 0 ? 'down' as const : 'stable' as const,
        anomaliesDetected: 0
      },
      aiRecommendations: {
        strategic: ['Continue monitoring tourism metrics'],
        operational: ['Maintain current service standards'],
        marketing: ['Leverage positive feedback in campaigns'],
        infrastructure: ['Plan for seasonal capacity adjustments']
      }
    }
  }
}

// Calculate slope for linear regression (simple trend analysis)
function calculateSlope(data: { x: number, y: number }[]) {
  const n = data.length
  const sumX = data.reduce((sum, point) => sum + point.x, 0)
  const sumY = data.reduce((sum, point) => sum + point.y, 0)
  const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0)
  const sumXX = data.reduce((sum, point) => sum + point.x * point.x, 0)
  
  return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
}

async function generateEnhancedAnalyticsData(): Promise<EnhancedAnalyticsData> {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Generate visitor data for the last 12 months
  const visitorData = Array.from({ length: 12 }, (_, i) => {
    const month = (currentMonth - 11 + i + 12) % 12
    const year = month > currentMonth ? currentYear - 1 : currentYear
    const monthName = new Date(year, month).toLocaleString('default', { month: 'short' })
    
    // Simulate seasonal patterns
    const baseVisitors = 1000
    const seasonalMultiplier = [0.6, 0.7, 0.9, 1.2, 1.4, 1.1, 0.8, 0.9, 1.0, 1.3, 1.5, 1.2][month]
    const visitors = Math.floor(baseVisitors * seasonalMultiplier * (0.8 + Math.random() * 0.4))
    
    return {
      month: monthName,
      year,
      visitors,
      revenue: visitors * (800 + Math.random() * 400),
      satisfaction: 3.5 + Math.random() * 1.5,
      bookings: Math.floor(visitors * 0.3)
    }
  })

  // Destination popularity data
  const destinations = [
    { name: 'Netarhat', visitors: 15420, revenue: 12500000, satisfaction: 4.6, growth: 15.2 },
    { name: 'Betla National Park', visitors: 12800, revenue: 9800000, satisfaction: 4.3, growth: 8.7 },
    { name: 'Hundru Falls', visitors: 11200, revenue: 6400000, satisfaction: 4.5, growth: 22.1 },
    { name: 'Deoghar', visitors: 18900, revenue: 15200000, satisfaction: 4.4, growth: 5.3 },
    { name: 'Hazaribagh National Park', visitors: 8600, revenue: 5100000, satisfaction: 4.2, growth: 12.8 },
    { name: 'Dassam Falls', visitors: 7300, revenue: 3900000, satisfaction: 4.1, growth: 18.5 }
  ]

  // Tourist demographics
  const demographics = {
    ageGroups: [
      { group: '18-25', percentage: 28, count: 8400 },
      { group: '26-35', percentage: 35, count: 10500 },
      { group: '36-45', percentage: 22, count: 6600 },
      { group: '46-60', percentage: 12, count: 3600 },
      { group: '60+', percentage: 3, count: 900 }
    ],
    origin: [
      { state: 'West Bengal', percentage: 25, count: 7500 },
      { state: 'Bihar', percentage: 20, count: 6000 },
      { state: 'Odisha', percentage: 18, count: 5400 },
      { state: 'Jharkhand', percentage: 15, count: 4500 },
      { state: 'Delhi', percentage: 12, count: 3600 },
      { state: 'Others', percentage: 10, count: 3000 }
    ],
    purpose: [
      { type: 'Leisure', percentage: 45, count: 13500 },
      { type: 'Cultural Experience', percentage: 25, count: 7500 },
      { type: 'Adventure', percentage: 15, count: 4500 },
      { type: 'Spiritual', percentage: 10, count: 3000 },
      { type: 'Business', percentage: 5, count: 1500 }
    ]
  }

  // Vendor performance
  const vendorPerformance = [
    { id: 'seller_1', name: 'Kumari Devi', category: 'Handicrafts', revenue: 185000, orders: 74, rating: 4.8, growth: 25.3 },
    { id: 'seller_2', name: 'Birsa Munda Family', category: 'Homestays', revenue: 156000, orders: 130, rating: 4.9, growth: 18.7 },
    { id: 'seller_3', name: 'Raman Kumar', category: 'Experiences', revenue: 231200, orders: 289, rating: 4.7, growth: 32.1 },
    { id: 'seller_4', name: 'Santhal Craft Collective', category: 'Handicrafts', revenue: 142000, orders: 79, rating: 4.5, growth: 15.2 },
    { id: 'seller_5', name: 'Green Wheels Jharkhand', category: 'Transport', revenue: 98000, orders: 816, rating: 4.4, growth: 8.9 }
  ]

  // Sentiment analysis summary
  const sentimentTrends = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(currentDate.getTime() - (29 - i) * 24 * 60 * 60 * 1000)
    return {
      date: date.toISOString().split('T')[0],
      positive: 60 + Math.random() * 20,
      negative: 10 + Math.random() * 15,
      neutral: 25 + Math.random() * 10
    }
  })

  // Generate mock feedback data for AI analysis
  const mockFeedbackData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    location: destinations[i % destinations.length].name,
    category: ['Homestays', 'Experiences', 'Food', 'Transport'][i % 4],
    aiAnalysis: {
      sentiment: Math.random() > 0.7 ? 'negative' : Math.random() > 0.3 ? 'positive' : 'neutral',
      confidence: 0.7 + Math.random() * 0.3,
      toxicity: Math.random() * 0.2,
      urgency: Math.random() > 0.9 ? 'high' : 'low',
      keywords: ['service', 'quality', 'experience'],
      actionableInsights: ['Improve service quality']
    },
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }))

  // Generate revenue data
  const revenueData = visitorData.map(v => ({
    month: v.month,
    revenue: v.revenue
  }))

  // AI-powered predictions using advanced analytics
  const advancedAnalyticsResult = await generateAdvancedPredictions(
    visitorData, 
    destinations, 
    sentimentTrends, 
    mockFeedbackData, 
    revenueData
  )

  // Enhanced destinations with AI insights
  const enhancedDestinations = destinations.map(dest => {
    const destFeedback = mockFeedbackData.filter(f => f.location === dest.name)
    const negativeCount = destFeedback.filter(f => f.aiAnalysis.sentiment === 'negative').length
    const riskLevel = negativeCount > destFeedback.length * 0.3 ? 'high' : 
                     negativeCount > destFeedback.length * 0.15 ? 'medium' : 'low'
    
    return {
      ...dest,
      riskLevel: riskLevel as 'low' | 'medium' | 'high' | 'critical',
      aiInsights: [
        riskLevel === 'high' ? 'High negative sentiment detected' : 'Sentiment within normal range',
        dest.growth > 15 ? 'Strong growth trajectory' : 'Moderate growth',
        dest.satisfaction > 4.5 ? 'Excellent visitor satisfaction' : 'Room for satisfaction improvement'
      ]
    }
  })

  // Enhanced sentiment trends with toxicity and urgency
  const enhancedSentimentTrends = sentimentTrends.map(trend => ({
    ...trend,
    toxicity: Math.random() * 10,
    urgency: Math.random() * 20
  }))

  // Enhanced vendor performance with AI scoring
  const enhancedVendorPerformance = vendorPerformance.map(vendor => ({
    ...vendor,
    aiScore: Math.round((vendor.rating * 0.4 + (vendor.growth + 50) / 100 * 0.6) * 100)
  }))

  // Legacy predictions for backward compatibility
  const predictions = {
    nextMonthVisitors: advancedAnalyticsResult.predictiveModels.visitorForecast.predictions[0]?.predictedVisitors || 
                      Math.floor(visitorData[visitorData.length - 1].visitors * 1.1),
    peakSeason: 'November-December (Chhath Puja & Winter season)',
    emergingDestinations: enhancedDestinations.filter(d => d.growth > 15).map(d => d.name).slice(0, 3),
    riskAreas: enhancedDestinations.filter(d => d.riskLevel === 'high').map(d => d.name),
    recommendedActions: advancedAnalyticsResult.aiRecommendations.strategic.slice(0, 3),
    confidenceScore: Math.round(Object.values(advancedAnalyticsResult.predictiveModels)
      .reduce((sum, model) => sum + model.accuracy, 0) / 5 * 100)
  }

  return {
    overview: {
      totalVisitors: visitorData.reduce((sum, month) => sum + month.visitors, 0),
      totalRevenue: visitorData.reduce((sum, month) => sum + month.revenue, 0),
      averageSatisfaction: visitorData.reduce((sum, month) => sum + month.satisfaction, 0) / visitorData.length,
      totalBookings: visitorData.reduce((sum, month) => sum + month.bookings, 0),
      activeVendors: enhancedVendorPerformance.length,
      totalFeedbacks: mockFeedbackData.length,
      growthRate: Math.round(((visitorData[visitorData.length - 1].visitors - visitorData[0].visitors) / visitorData[0].visitors) * 100),
      alertLevel: advancedAnalyticsResult.realTimeMetrics.alertLevel
    },
    visitorTrends: visitorData.map(v => ({
      ...v,
      predictedVisitors: Math.round(v.visitors * (1 + Math.random() * 0.2)),
      anomalyDetected: Math.random() > 0.9
    })),
    destinations: enhancedDestinations,
    demographics,
    vendorPerformance: enhancedVendorPerformance,
    sentimentTrends: enhancedSentimentTrends,
    advancedAnalytics: advancedAnalyticsResult,
    predictions,
    lastUpdated: new Date().toISOString()
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '12months'
    const category = searchParams.get('category') || 'all'
    const includeAdvanced = searchParams.get('advanced') === 'true'

    const analyticsData = await generateEnhancedAnalyticsData()

    // Filter data based on parameters
    let filteredData = { ...analyticsData }

    if (timeRange === '30days') {
      filteredData.visitorTrends = analyticsData.visitorTrends.slice(-1)
      filteredData.sentimentTrends = analyticsData.sentimentTrends.slice(-30)
    } else if (timeRange === '6months') {
      filteredData.visitorTrends = analyticsData.visitorTrends.slice(-6)
    }

    if (category !== 'all') {
      filteredData.vendorPerformance = analyticsData.vendorPerformance.filter((v: any) => 
        v.category.toLowerCase() === category.toLowerCase()
      )
    }

    return NextResponse.json(filteredData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data } = body

    // Track custom events (visitor actions, bookings, etc.)
    console.log(`Analytics Event: ${event}`, data)

    // In production, this would store the event in a real analytics database
    return NextResponse.json({ success: true, message: 'Event tracked successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
  }
}

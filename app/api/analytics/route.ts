import { NextRequest, NextResponse } from 'next/server'

// Mock analytics data generator
function generateAnalyticsData() {
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

  // AI predictions
  const predictions = {
    nextMonthVisitors: Math.floor(visitorData[visitorData.length - 1].visitors * (1.1 + Math.random() * 0.2)),
    peakSeason: 'November-December (Chhath Puja season)',
    emergingDestinations: ['Palamau Fort', 'Rajrappa Temple', 'Maithon Dam'],
    riskAreas: destinations.filter(d => d.satisfaction < 4.3).map(d => d.name),
    recommendedActions: [
      'Increase promotion for Hazaribagh National Park',
      'Address service quality issues in low-satisfaction areas',
      'Expand homestay capacity in Netarhat for peak season'
    ]
  }

  return {
    overview: {
      totalVisitors: visitorData.reduce((sum, month) => sum + month.visitors, 0),
      totalRevenue: visitorData.reduce((sum, month) => sum + month.revenue, 0),
      averageSatisfaction: visitorData.reduce((sum, month) => sum + month.satisfaction, 0) / visitorData.length,
      totalBookings: visitorData.reduce((sum, month) => sum + month.bookings, 0),
      activeVendors: vendorPerformance.length,
      totalFeedbacks: 1247
    },
    visitorTrends: visitorData,
    destinations,
    demographics,
    vendorPerformance,
    sentimentTrends,
    predictions,
    lastUpdated: new Date().toISOString()
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '12months'
    const category = searchParams.get('category') || 'all'

    const analyticsData = generateAnalyticsData()

    // Filter data based on parameters
    let filteredData = { ...analyticsData }

    if (timeRange === '30days') {
      filteredData.visitorTrends = analyticsData.visitorTrends.slice(-1)
      filteredData.sentimentTrends = analyticsData.sentimentTrends.slice(-30)
    } else if (timeRange === '6months') {
      filteredData.visitorTrends = analyticsData.visitorTrends.slice(-6)
    }

    if (category !== 'all') {
      filteredData.vendorPerformance = analyticsData.vendorPerformance.filter(v => 
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

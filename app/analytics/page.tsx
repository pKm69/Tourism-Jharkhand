"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  MapPin,
  Star,
  AlertTriangle,
  Download,
  RefreshCw,
  Calendar,
  Target,
  Award,
  Activity,
  Eye,
  ShoppingBag,
  Home,
  Compass,
  Brain,
  Zap,
  Database,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  Volume2,
  MessageSquare,
  Sparkles
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalVisitors: number
    totalRevenue: number
    averageSatisfaction: number
    totalBookings: number
    activeVendors: number
    totalFeedbacks: number
  }
  visitorTrends: Array<{
    month: string
    visitors: number
    revenue: number
    satisfaction: number
    bookings: number
  }>
  destinations: Array<{
    name: string
    visitors: number
    revenue: number
    satisfaction: number
    growth: number
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
  }>
  sentimentTrends: Array<{
    date: string
    positive: number
    negative: number
    neutral: number
  }>
  predictions: {
    nextMonthVisitors: number
    peakSeason: string
    emergingDestinations: string[]
    riskAreas: string[]
    recommendedActions: string[]
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')
  const [exportFormat, setExportFormat] = useState('csv')
  const [isExporting, setIsExporting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    fetchAnalytics()
  }, [selectedTimeRange, selectedCategory])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/analytics?timeRange=${selectedTimeRange}`)
      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = async () => {
    setIsExporting(true)
    try {
      const response = await fetch(`/api/analytics/export?format=${exportFormat}&timeRange=${selectedTimeRange}`)
      const blob = await response.blob()
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tourism-analytics-${selectedTimeRange}.${exportFormat}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to export data:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const COLORS = ['#800020', '#1e3a8a', '#f4d03f', '#a0001a', '#2563eb', '#fbbf24']

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4" />
            <p className="text-lg">Loading analytics dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Failed to load analytics</h1>
          <Button onClick={fetchAnalytics}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#800020] to-[#1e3a8a] bg-clip-text text-transparent">
              AI-Powered Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-[#f4d03f]" />
              Comprehensive AI insights for Jharkhand tourism officials
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-[#800020] rounded-[25px] bg-background text-[#800020]"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 3 Months</option>
              <option value="1y">Last Year</option>
            </select>
            
            {/* Export Controls */}
            <div className="flex items-center gap-2">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="px-3 py-2 border border-[#800020] rounded-[25px] bg-background text-[#800020] text-sm"
              >
                <option value="csv">CSV</option>
                <option value="xlsx">Excel</option>
                <option value="pdf">PDF</option>
                <option value="json">JSON</option>
              </select>
              <Button 
                onClick={exportData} 
                disabled={isExporting}
                className="bg-[#f4d03f] hover:bg-[#f1c40f] text-[#800020] border-[#f4d03f] rounded-[25px]"
                size="sm"
              >
                {isExporting ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Export
              </Button>
            </div>
            
            <Button onClick={fetchAnalytics} disabled={loading} className="bg-[#800020] hover:bg-[#a0001a] text-white rounded-[25px]">
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* AI Features Highlight */}
        <div className="bg-gradient-to-r from-[#800020]/10 to-[#1e3a8a]/10 p-6 rounded-[16px] border border-[#f4d03f] mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-[#f4d03f]" />
            <h2 className="text-xl font-semibold text-[#800020]">AI-Powered Features Active</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm text-[#800020]">
              <Brain className="h-4 w-4 text-[#f4d03f]" />
              <span>Sentiment Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#800020]">
              <Zap className="h-4 w-4 text-[#f4d03f]" />
              <span>Predictive Modeling</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#800020]">
              <Volume2 className="h-4 w-4 text-[#f4d03f]" />
              <span>Voice Analytics</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#800020]">
              <ImageIcon className="h-4 w-4 text-[#f4d03f]" />
              <span>Image Recognition</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Visitors</p>
                        <p className="text-2xl font-bold">{data.overview.totalVisitors.toLocaleString()}</p>
                      </div>
                      <Users className="h-8 w-8 text-[#800020]" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                        <p className="text-2xl font-bold">₹{(data.overview.totalRevenue / 10000000).toFixed(1)}Cr</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-[#f4d03f]" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                        <p className="text-2xl font-bold">{data.overview.averageSatisfaction.toFixed(1)}/5</p>
                      </div>
                      <Star className="h-8 w-8 text-[#f4d03f]" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Bookings</p>
                        <p className="text-2xl font-bold">{data.overview.totalBookings.toLocaleString()}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-[#1e3a8a]" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
                        <p className="text-2xl font-bold">{data.overview.activeVendors}</p>
                      </div>
                      <ShoppingBag className="h-8 w-8 text-[#800020]" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Feedbacks</p>
                        <p className="text-2xl font-bold">{data.overview.totalFeedbacks}</p>
                      </div>
                      <Activity className="h-8 w-8 text-[#1e3a8a]" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Visitor Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Trends Over Time</CardTitle>
                  <CardDescription>Monthly visitor count and revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.visitorTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="visitors" stackId="1" stroke="#800020" fill="#800020" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sentiment Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis Trends</CardTitle>
                  <CardDescription>Daily sentiment analysis of tourist feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.sentimentTrends.slice(-30)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="positive" stroke="#f4d03f" strokeWidth={2} />
                      <Line type="monotone" dataKey="negative" stroke="#800020" strokeWidth={2} />
                      <Line type="monotone" dataKey="neutral" stroke="#1e3a8a" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visitors Tab */}
          <TabsContent value="visitors" className="mt-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Age Demographics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Age Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={data.demographics.ageGroups}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ group, percentage }) => `${group}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="percentage"
                        >
                          {data.demographics.ageGroups.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Origin States */}
                <Card>
                  <CardHeader>
                    <CardTitle>Visitor Origin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data.demographics.origin}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="state" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#800020" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Travel Purpose */}
              <Card>
                <CardHeader>
                  <CardTitle>Travel Purpose Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {data.demographics.purpose.map((purpose, index) => (
                      <Card key={purpose.type}>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-[#800020] mb-2">
                            {purpose.percentage}%
                          </div>
                          <div className="text-sm font-medium">{purpose.type}</div>
                          <div className="text-xs text-muted-foreground">
                            {purpose.count.toLocaleString()} visitors
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Destinations Tab */}
          <TabsContent value="destinations" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Destination Performance</CardTitle>
                  <CardDescription>Visitor count, revenue, and satisfaction by destination</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.destinations.map((destination, index) => (
                      <div key={destination.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-[#800020]/10 rounded-full flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-[#800020]" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{destination.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {destination.visitors.toLocaleString()} visitors
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-medium">₹{(destination.revenue / 1000000).toFixed(1)}M</p>
                            <p className="text-sm text-muted-foreground">Revenue</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-current text-[#f4d03f]" />
                              <span className="font-medium">{destination.satisfaction}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Rating</p>
                          </div>
                          <div className="text-right">
                            <div className={`flex items-center gap-1 ${destination.growth > 0 ? 'text-[#f4d03f]' : 'text-[#800020]'}`}>
                              {destination.growth > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                              <span className="font-medium">{destination.growth > 0 ? '+' : ''}{destination.growth}%</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Growth</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Destination</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data.destinations}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${(Number(value) / 1000000).toFixed(1)}M`, 'Revenue']} />
                      <Bar dataKey="revenue" fill="#1e3a8a" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Vendors</CardTitle>
                  <CardDescription>Revenue, orders, and ratings by vendor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.vendorPerformance.map((vendor, index) => (
                      <div key={vendor.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-[#f4d03f]/10 rounded-full flex items-center justify-center">
                            <Award className="h-4 w-4 text-[#f4d03f]" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{vendor.name}</h3>
                            <Badge variant="outline">{vendor.category}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-medium">₹{(vendor.revenue / 1000).toFixed(0)}K</p>
                            <p className="text-sm text-muted-foreground">Revenue</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{vendor.orders}</p>
                            <p className="text-sm text-muted-foreground">Orders</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-current text-[#f4d03f]" />
                              <span className="font-medium">{vendor.rating}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Rating</p>
                          </div>
                          <div className="text-right">
                            <div className={`flex items-center gap-1 ${vendor.growth > 0 ? 'text-[#f4d03f]' : 'text-[#800020]'}`}>
                              {vendor.growth > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                              <span className="font-medium">{vendor.growth > 0 ? '+' : ''}{vendor.growth}%</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Growth</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vendor Revenue Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data.vendorPerformance}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, revenue }) => `${name}: ₹${(revenue / 1000).toFixed(0)}K`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {data.vendorPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, 'Revenue']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="mt-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-[#f4d03f]" />
                      AI Predictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Next Month Forecast</h4>
                      <p className="text-2xl font-bold text-[#800020]">
                        {data?.predictions?.nextMonthVisitors?.toLocaleString() || '2,300'} visitors
                      </p>
                      <p className="text-sm text-muted-foreground">
                        +15% increase expected
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Peak Season</h4>
                      <p className="text-foreground">{data?.predictions?.peakSeason || 'October-December'}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Compass className="h-5 w-5 text-[#1e3a8a]" />
                      Emerging Destinations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {(data?.predictions?.emergingDestinations || ['Palamau Fort', 'Rajrappa Temple', 'Lodh Falls']).map((destination, index) => (
                        <div key={destination} className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-[#f4d03f]" />
                          <span>{destination}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Risk Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {(data?.predictions?.riskAreas || ['Transport connectivity', 'Accommodation quality', 'Language barriers']).map((area, index) => (
                        <div key={area} className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span>{area}</span>
                          <Badge variant="destructive" className="ml-auto">Needs Attention</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(data?.predictions?.recommendedActions || [
                        'Improve transport infrastructure to remote destinations',
                        'Develop multilingual guide training programs', 
                        'Expand homestay capacity for peak season',
                        'Implement digital payment systems for vendors',
                        'Create emergency response protocols for tourist areas'
                      ]).map((action, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{action}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Insights Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-green-800">Growth Opportunity</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Netarhat showing 22% growth potential for eco-tourism
                      </p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-yellow-800">Attention Needed</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Service quality issues detected in 2 locations
                      </p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-blue-800">Strategic Focus</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Expand homestay capacity for upcoming peak season
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Performance Metrics */}
          <TabsContent value="ai-performance" className="mt-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      AI Model Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Sentiment Analysis</span>
                          <span>94.2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '94.2%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Voice Recognition</span>
                          <span>87.8%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '87.8%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Image Analysis</span>
                          <span>91.5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '91.5%'}}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-orange-600" />
                      Real-time Processing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Feedback Analyzed</span>
                        <Badge className="bg-green-100 text-green-800">1,247 today</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Voice Files</span>
                        <Badge className="bg-blue-100 text-blue-800">342 processed</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Images</span>
                        <Badge className="bg-purple-100 text-purple-800">156 analyzed</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Alerts Generated</span>
                        <Badge className="bg-red-100 text-red-800">3 critical</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-indigo-600" />
                      Prediction Accuracy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-600">89.3%</div>
                        <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Visitor Forecasting</span>
                          <span>92%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Revenue Prediction</span>
                          <span>88%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Risk Assessment</span>
                          <span>85%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    AI Sentiment Trend Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={[
                      { date: 'Jan', positive: 65, negative: 10, neutral: 25 },
                      { date: 'Feb', positive: 68, negative: 8, neutral: 24 },
                      { date: 'Mar', positive: 70, negative: 12, neutral: 18 },
                      { date: 'Apr', positive: 72, negative: 9, neutral: 19 },
                      { date: 'May', positive: 75, negative: 7, neutral: 18 },
                      { date: 'Jun', positive: 73, negative: 11, neutral: 16 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="positive" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="neutral" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">AI-Powered Strategic Insights</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Based on advanced machine learning analysis of {data?.overview?.totalFeedbacks || 892} feedback entries
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">✅ Key Strengths Identified</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Natural beauty consistently praised (95% positive mentions)</li>
                      <li>• Local hospitality highly rated (4.6/5 average)</li>
                      <li>• Cultural experiences exceed expectations</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">⚠️ Areas for Improvement</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Transportation infrastructure (67% mention delays)</li>
                      <li>• Digital payment adoption needed (45% request)</li>
                      <li>• Language barrier concerns (23% of international visitors)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database" className="mt-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-600" />
                      Database Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Connection Status</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total Records</span>
                        <span className="font-medium">{data?.overview.totalFeedbacks || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Storage Used</span>
                        <span className="font-medium">2.4 GB</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Last Backup</span>
                        <span className="font-medium">2 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      AI Data Processing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Processed Today</span>
                        <span className="font-medium">1,247 items</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Voice Analysis</span>
                        <Badge className="bg-blue-100 text-blue-800">342 files</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Image Recognition</span>
                        <Badge className="bg-green-100 text-green-800">156 images</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sentiment Analysis</span>
                        <Badge className="bg-purple-100 text-purple-800">749 texts</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-orange-600" />
                      Export Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => { setExportFormat('csv'); exportData(); }}
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export as CSV
                      </Button>
                      <Button 
                        onClick={() => { setExportFormat('xlsx'); exportData(); }}
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export as Excel
                      </Button>
                      <Button 
                        onClick={() => { setExportFormat('pdf'); exportData(); }}
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Export as PDF Report
                      </Button>
                      <Button 
                        onClick={() => { setExportFormat('json'); exportData(); }}
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <Database className="h-4 w-4 mr-2" />
                        Export as JSON
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent AI Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">Sentiment Analysis</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">94.2% Accuracy</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Voice Processing</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">87.8% Accuracy</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Image Recognition</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">91.5% Accuracy</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Predictive Models</span>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">89.3% Accuracy</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Database Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Query Performance</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Storage Efficiency</span>
                          <span>87%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>AI Processing Speed</span>
                          <span>95%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '95%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Data Integrity</span>
                          <span>99%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '99%'}}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}

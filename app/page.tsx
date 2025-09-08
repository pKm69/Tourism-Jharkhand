"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  MapPin,
  Users,
  Leaf,
  Bot,
  Shield,
  Eye,
  ShoppingBag,
  BarChart3,
  Star,
  ArrowRight,
  Play,
  ChevronDown,
  TrendingUp,
  MessageCircle,
  DollarSign,
  Calendar,
  Activity,
  Send,
  Smile,
  Frown,
  Meh
} from "lucide-react"

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [feedbackStats, setFeedbackStats] = useState<any>(null)
  const [quickFeedback, setQuickFeedback] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState("")

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Fetch analytics data
  useEffect(() => {
    fetchAnalyticsOverview()
    fetchFeedbackStats()
  }, [])

  const fetchAnalyticsOverview = async () => {
    try {
      const response = await fetch('/api/analytics')
      const data = await response.json()
      setAnalyticsData(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    }
  }

  const fetchFeedbackStats = async () => {
    try {
      const response = await fetch('/api/feedback')
      const data = await response.json()
      setFeedbackStats(data.sentimentStats)
    } catch (error) {
      console.error('Failed to fetch feedback stats:', error)
    }
  }

  const submitQuickFeedback = async () => {
    if (!quickFeedback.trim()) return

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: "Anonymous User",
          location: "General",
          category: "General",
          rating: selectedEmotion === "😍" ? 5 : selectedEmotion === "😊" ? 4 : selectedEmotion === "😐" ? 3 : selectedEmotion === "😞" ? 2 : 1,
          textFeedback: quickFeedback,
          language: "en",
          emojiRating: selectedEmotion
        })
      })
      
      setQuickFeedback("")
      setSelectedEmotion("")
      alert("Thank you for your feedback!")
      fetchFeedbackStats() // Refresh stats
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    }
  }

  const features = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI-Powered Itinerary Planning",
      description: "Personalized travel plans with multilingual chatbot assistance",
      link: "/ai-features#itinerary",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Blockchain Security",
      description: "Secure transactions and verified guide certifications",
      link: "/ai-features#blockchain",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "AR/VR Experiences",
      description: "Interactive maps and immersive previews of cultural sites",
      link: "/ai-features#ar-vr",
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Real-time Location Info",
      description: "Live transport updates and geo-location services",
      link: "/ai-features#location",
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Local Marketplace",
      description: "Tribal handicrafts, homestays, and eco-tourism experiences",
      link: "/marketplace",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Tourism insights and impact monitoring for officials",
      link: "/analytics",
    },
  ]

  const destinations = [
    {
      name: "Netarhat",
      image: "/netarhat-hill-station-sunrise-jharkhand.jpg",
      description: "Queen of Chotanagpur - breathtaking sunrise views",
      category: "Hill Station",
    },
    {
      name: "Betla National Park",
      image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
      description: "Wildlife sanctuary with tigers and elephants",
      category: "Wildlife",
    },
    {
      name: "Hundru Falls",
      image: "/hundru-falls-waterfall-jharkhand.jpg",
      description: "Spectacular 98-meter waterfall cascade",
      category: "Waterfall",
    },
    {
      name: "Deoghar",
      image: "/deoghar-temple-spiritual-jharkhand.jpg",
      description: "Sacred pilgrimage site with ancient temples",
      category: "Spiritual",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/jharkhand-landscape-forest-mountains-tribal-cultur.jpg"
            alt="Jharkhand landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              Discover the Heart of
              <span className="text-primary block">Jharkhand</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
              Experience pristine forests, rich tribal culture, and breathtaking landscapes through our AI-powered smart
              tourism platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6 group" asChild>
                <Link href="/destinations">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 group bg-transparent" asChild>
                <Link href="/ai-features">
                  <Play className="mr-2 h-5 w-5" />
                  Explore Features
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Smart Tourism Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Powered by AI, secured by blockchain, and designed for authentic cultural experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.link}>
                <Card
                  className={`transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                    activeFeature === index ? "ring-2 ring-primary shadow-lg scale-105" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{feature.icon}</div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/ai-features">
                Explore All Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Destinations Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Explore Iconic Destinations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              From mystical waterfalls to sacred temples, discover Jharkhand's hidden gems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary/90">{destination.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {destination.name}
                    <div className="flex items-center text-accent">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm ml-1">4.8</span>
                    </div>
                  </CardTitle>
                  <CardDescription>{destination.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/destinations">
                View All Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Live Tourism Analytics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time insights powered by AI and community feedback
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {analyticsData ? analyticsData.overview.totalVisitors.toLocaleString() : '30,000+'}
              </h3>
              <p className="text-muted-foreground">Monthly Visitors</p>
              <div className="flex items-center justify-center mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+15% this month</span>
              </div>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                ₹{analyticsData ? (analyticsData.overview.totalRevenue / 10000000).toFixed(1) : '12.5'}Cr
              </h3>
              <p className="text-muted-foreground">Tourism Revenue</p>
              <div className="flex items-center justify-center mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+22% growth</span>
              </div>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {analyticsData ? analyticsData.overview.averageSatisfaction.toFixed(1) : '4.6'}/5
              </h3>
              <p className="text-muted-foreground">Satisfaction Score</p>
              <div className="flex items-center justify-center mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">Excellent rating</span>
              </div>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {feedbackStats ? feedbackStats.total : '1,247'}
              </h3>
              <p className="text-muted-foreground">Tourist Feedback</p>
              <div className="flex items-center justify-center mt-2">
                {feedbackStats && (
                  <div className="flex gap-1">
                    <Smile className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">{feedbackStats.positive}</span>
                    <Meh className="h-4 w-4 text-yellow-600 ml-2" />
                    <span className="text-sm text-yellow-600">{feedbackStats.neutral}</span>
                    <Frown className="h-4 w-4 text-red-600 ml-2" />
                    <span className="text-sm text-red-600">{feedbackStats.negative}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/analytics">
                View Full Analytics Dashboard
                <BarChart3 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Feedback Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Quick Feedback
                </CardTitle>
                <CardDescription>
                  Share your experience and help us improve Jharkhand tourism
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>How was your experience?</Label>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    {[
                      { emoji: "😍", label: "Loved it" },
                      { emoji: "😊", label: "Good" },
                      { emoji: "😐", label: "Okay" },
                      { emoji: "😞", label: "Poor" },
                      { emoji: "😡", label: "Terrible" }
                    ].map(({ emoji, label }) => (
                      <button
                        key={emoji}
                        onClick={() => setSelectedEmotion(emoji)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedEmotion === emoji
                            ? 'border-primary bg-primary/10 scale-110'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        title={label}
                      >
                        <span className="text-2xl">{emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="quickFeedback">Tell us more (optional)</Label>
                  <textarea
                    id="quickFeedback"
                    value={quickFeedback}
                    onChange={(e) => setQuickFeedback(e.target.value)}
                    placeholder="Share your thoughts about Jharkhand tourism..."
                    className="w-full px-3 py-2 border rounded-md bg-background min-h-[80px] mt-1"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={submitQuickFeedback} className="flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/feedback">
                      Detailed Feedback
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Explore Jharkhand?</h2>
          <p className="text-xl mb-8 text-pretty max-w-2xl mx-auto opacity-90">
            Join thousands of travelers discovering authentic experiences and supporting local communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Download Mobile App
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/destinations">Plan Your Trip</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

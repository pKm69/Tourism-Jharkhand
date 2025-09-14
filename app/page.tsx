"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AOS from 'aos'
import 'aos/dist/aos.css'
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
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [feedbackStats, setFeedbackStats] = useState<any>(null)
  const [quickFeedback, setQuickFeedback] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState("")
  const [counters, setCounters] = useState({
    visitors: 0,
    satisfaction: 0,
    feedback: 0
  })

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30
    })
  }, [])

  // Auto-rotate features (pause when user is interacting)
  useEffect(() => {
    if (isUserInteracting) return
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6)
    }, 5000)
    return () => clearInterval(interval)
  }, [isUserInteracting])

  // Fetch analytics data
  useEffect(() => {
    fetchAnalyticsOverview()
    fetchFeedbackStats()
  }, [])

  // Counter animation function
  const animateCounter = (target: number, key: keyof typeof counters, duration: number = 2000) => {
    const start = 0
    const increment = target / (duration / 16)
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
    }, 16)
  }

  // Trigger counter animations when analytics data loads
  useEffect(() => {
    if (analyticsData && feedbackStats) {
      setTimeout(() => {
        animateCounter(analyticsData.overview.totalVisitors, 'visitors')
        animateCounter(analyticsData.overview.averageSatisfaction * 10, 'satisfaction')
        animateCounter(feedbackStats.total, 'feedback')
      }, 500)
    }
  }, [analyticsData, feedbackStats])

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
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 data-aos="fade-up" data-aos-delay="200">Discover the Heart of Jharkhand</h1>
          <p data-aos="fade-up" data-aos-delay="400">Experience pristine forest, rich tribal culture, ancient temples, and vibrant festivals – all powered by AI.</p>
          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="600">
            <Link href="/destinations">
              <button className="btn primary">Start Your Journey</button>
            </Link>
            <Link href="/ai-features">
              <button className="btn secondary">Explore Features</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Smart Tourism Section */}
      <section className="smart-tourism-section">
        <h2 data-aos="fade-up">Smart Tourism Technology</h2>
        <p className="subtitle" data-aos="fade-up" data-aos-delay="200">Powered by AI, secured by blockchain, and designed for authentic cultural experiences</p>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              data-aos="fade-up"
              data-aos-delay={100 + (index * 50)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p className="feature-description show">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <Link href="/ai-features">
          <button className="btn primary" data-aos="fade-up" data-aos-delay="900">Explore All Features</button>
        </Link>
      </section>

      {/* Iconic Destinations Section */}
      <section className="iconic-destinations-section">
        <h2 data-aos="fade-up">Explore Iconic Destinations</h2>
        <p className="subtitle" data-aos="fade-up" data-aos-delay="200">From mystical waterfalls to sacred temples, discover Jharkhand's hidden gems</p>

        <div className="destination-grid">
          {destinations.map((destination, index) => (
            <div 
              key={index} 
              className="destination-card clickable"
              data-aos="fade-up"
              data-aos-delay={300 + (index * 150)}
            >
              <img src={destination.image || "/placeholder.svg"} alt={destination.name} />
              <div className="card-info">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <div className="rating">⭐ 4.8</div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/destinations">
          <button className="btn primary" data-aos="fade-up" data-aos-delay="750">View All Destinations</button>
        </Link>
      </section>

      {/* Analytics Dashboard Section */}
      <section className="analytics-dashboard-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-aos="fade-up">
              Live Tourism Analytics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Real-time insights powered by AI and community feedback
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="analytics-card" data-aos="fade-up" data-aos-delay="300">
              <div className="analytics-card-icon">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="analytics-card-number">
                {analyticsData ? counters.visitors.toLocaleString() : (
                  <span className="loading-dots">Loading...</span>
                )}
              </h3>
              <p className="analytics-card-label">Monthly Visitors</p>
              <div className="analytics-card-growth">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+15% this month</span>
              </div>
            </div>

            <div className="analytics-card" data-aos="fade-up" data-aos-delay="450">
              <div className="analytics-card-icon">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="analytics-card-number">
                {analyticsData ? (counters.satisfaction / 10).toFixed(1) : '4.6'}/5
              </h3>
              <p className="analytics-card-label">Satisfaction Score</p>
              <div className="analytics-card-growth">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Excellent rating</span>
              </div>
            </div>

            <div className="analytics-card" data-aos="fade-up" data-aos-delay="600">
              <div className="analytics-card-icon">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="analytics-card-number">
                {feedbackStats ? counters.feedback : '1,247'}
              </h3>
              <p className="analytics-card-label">Tourist Feedback</p>
              <div className="analytics-card-growth">
                {feedbackStats && (
                  <div className="flex gap-2">
                    <div className="flex items-center">
                      <Smile className="h-4 w-4 mr-1" />
                      <span>{feedbackStats.positive}</span>
                    </div>
                    <div className="flex items-center">
                      <Meh className="h-4 w-4 mr-1" />
                      <span>{feedbackStats.neutral}</span>
                    </div>
                    <div className="flex items-center">
                      <Frown className="h-4 w-4 mr-1" />
                      <span>{feedbackStats.negative}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="btn primary" data-aos="fade-up" data-aos-delay="750">
              <Link href="/analytics">
                View Full Analytics Dashboard
                <BarChart3 className="ml-2 h-5 w-5" />
              </Link>
            </button>
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="call-to-action-section">
        <h2 data-aos="fade-up">Ready to Explore Jharkhand?</h2>
        <p data-aos="fade-up" data-aos-delay="200">Join thousands of travelers discovering authentic experiences and supporting local communities</p>
        <div className="cta-buttons" data-aos="fade-up" data-aos-delay="400" style={{justifyContent: 'center'}}>
          <Link href="/destinations">
            <button className="btn primary">Plan Your Trip</button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

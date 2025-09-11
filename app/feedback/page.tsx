"use client"

import { useState, useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  Star,
  MessageCircle,
  Send,
  Smile,
  Frown,
  Meh,
  Heart,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Camera,
  Image,
  X,
  Brain,
  Zap,
  Eye,
  MessageSquare
} from "lucide-react"

interface EnhancedFeedback {
  id: number
  userName: string
  location: string
  category: string
  rating: number
  textFeedback?: string
  language: string
  voiceData?: string
  imageData?: string
  emojiRating?: string
  aiAnalysis: {
    sentiment: 'positive' | 'negative' | 'neutral'
    confidence: number
    emotions: { [key: string]: number }
    keywords: string[]
    language: string
    toxicity?: number
    urgency?: 'low' | 'medium' | 'high' | 'critical'
    categories?: string[]
    actionableInsights?: string[]
  }
  voiceAnalysis?: {
    transcription: string
    sentiment: 'positive' | 'negative' | 'neutral'
    confidence: number
    emotions: { [key: string]: number }
    speakerTone: 'calm' | 'excited' | 'frustrated' | 'angry' | 'happy'
    language: string
  }
  imageAnalysis?: {
    description: string
    objects: string[]
    sentiment: 'positive' | 'negative' | 'neutral'
    quality: number
    issues?: string[]
    location?: string
  }
  timestamp: string
  isVerified: boolean
  responseFromVendor?: string
  flagged: boolean
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  autoResponseGenerated?: string
  escalated?: boolean
  followUpQuestions?: string[]
}

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState("submit")
  const [feedbacks, setFeedbacks] = useState<EnhancedFeedback[]>([])
  const [loading, setLoading] = useState(false)
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [sentimentStats, setSentimentStats] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
    total: 0
  })
  const [urgencyStats, setUrgencyStats] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  })
  const [aiInsights, setAiInsights] = useState<any[]>([])
  const [autoResponse, setAutoResponse] = useState<string>('')
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([])

  // Enhanced feedback submission form
  const [formData, setFormData] = useState({
    userName: "",
    location: "Netarhat",
    category: "Homestays",
    rating: 5,
    textFeedback: "",
    language: "auto",
    emojiRating: "",
    voiceData: "",
    imageData: ""
  })

  // Enhanced filters for viewing feedback
  const [filters, setFilters] = useState({
    location: "All",
    category: "All",
    sentiment: "All",
    urgency: "All",
    flagged: false,
    hasVoice: false,
    hasImage: false
  })

  const locations = ["All", "Netarhat", "Betla National Park", "Hundru Falls", "Deoghar", "Hazaribagh"]
  const categories = ["All", "Homestays", "Experiences", "Handicrafts", "Food", "Transport", "Guides"]
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "ho", name: "Ho" },
    { code: "sa", name: "Santali" }
  ]

  // Initialize AOS - Match home page settings
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    })
  }, [])

  useEffect(() => {
    if (activeTab === "view") {
      fetchFeedbacks()
    }
  }, [activeTab, filters])

  const fetchFeedbacks = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        location: filters.location,
        category: filters.category,
        sentiment: filters.sentiment,
        urgency: filters.urgency,
        flagged: filters.flagged.toString()
      })
      
      const response = await fetch(`/api/feedback?${params}`)
      const data = await response.json()
      
      setFeedbacks(data.feedbacks || [])
      setSentimentStats(data.sentimentStats || { positive: 0, negative: 0, neutral: 0, total: 0 })
      setUrgencyStats(data.urgencyStats || { critical: 0, high: 0, medium: 0, low: 0 })
      setAiInsights(data.sentimentTrends || [])
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitFeedback = async () => {
    if (!formData.userName || (!formData.textFeedback && !formData.voiceData && !formData.imageData)) {
      alert('Please provide your name and at least one form of feedback (text, voice, or image)')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        setAutoResponse(result.autoResponseGenerated || '')
        setFollowUpQuestions(result.followUpQuestions || [])
        
        alert('Feedback submitted successfully! AI analysis completed.')
        
        // Reset form
        setFormData({
          userName: "",
          location: "Netarhat",
          category: "Homestays",
          rating: 5,
          textFeedback: "",
          language: "auto",
          emojiRating: "",
          voiceData: "",
          imageData: ""
        })
        setSelectedImage(null)
        setImagePreview(null)
      } else {
        alert('Failed to submit feedback')
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error)
      alert('Failed to submit feedback')
    } finally {
      setLoading(false)
    }
  }

  

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        
        // Convert to base64 for API
        const base64Image = reader.result as string
        setFormData(prev => ({
          ...prev,
          imageData: base64Image.split(',')[1] // Remove data:image/...;base64, prefix
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setFormData(prev => ({ ...prev, imageData: '' }))
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="h-4 w-4 text-green-600" />
      case 'negative': return <Frown className="h-4 w-4 text-red-600" />
      default: return <Meh className="h-4 w-4 text-yellow-600" />
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'high': return <TrendingUp className="h-4 w-4 text-orange-600" />
      case 'medium': return <TrendingUp className="h-4 w-4 text-yellow-600" />
      default: return <CheckCircle className="h-4 w-4 text-green-600" />
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800'
      case 'negative': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 data-aos="fade-up">
            Share Your
            <span className="text-gold block">Experience & Insights</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Help us enhance Jharkhand tourism with smart, AI-powered feedback analysis. Your voice shapes better
            services for everyone.
          </p>
          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="400">
            <button onClick={() => setActiveTab("submit")} className="btn primary">Submit Feedback</button>
            <button onClick={() => setActiveTab("analytics")} className="btn secondary">View Analytics</button>
        </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">

        <div className="ai-demo-card" data-aos="fade-up" data-aos-delay="600">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 mb-2" style={{ background: 'transparent', boxShadow: 'none', border: 'none',borderRadius: '25px' }}>
            <TabsTrigger
              value="submit"
              className="btn"
              style={
                activeTab === 'submit'
                  ? { background: '#f4d03f', color: '#800020', border: '2px solid #f4d03f', borderRadius: '25px' }
                  : { background: 'transparent', color: 'white', border: '2px solid rgba(244, 208, 63, 0.8)', borderRadius: '25px' }
              }
              data-aos="fade-up"
              data-aos-delay="700"
            >
              Submit Feedback
            </TabsTrigger>
            <TabsTrigger
              value="view"
              className="btn"
              style={
                activeTab === 'view'
                  ? { background: '#f4d03f', color: '#800020', border: '2px solid #f4d03f', borderRadius: '25px' }
                  : { background: 'transparent', color: 'white', border: '2px solid rgba(244, 208, 63, 0.8)', borderRadius: '25px' }
              }
              data-aos="fade-up"
              data-aos-delay="800"
            >
              View Feedback
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="btn"
              style={
                activeTab === 'analytics'
                  ? { background: '#f4d03f', color: '#800020', border: '2px solid #f4d03f', borderRadius: '25px' }
                  : { background: 'transparent', color: 'white', border: '2px solid rgba(244, 208, 63, 0.8)', borderRadius: '25px' }
              }
              data-aos="fade-up"
              data-aos-delay="900"
            >
              Sentiment Analytics
            </TabsTrigger>
          </TabsList>

          {/* Submit Feedback Tab */}
          <TabsContent value="submit" className="mt-8">
            <div className="max-w-2xl mx-auto">
              <Card
                className="p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.18) 0%, rgba(30, 58, 138, 0.18) 100%)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(244, 208, 63, 0.35)',
                  borderRadius: '20px',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)'
                }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <CardHeader>
                  <CardTitle style={{ color: '#f4d03f', fontSize: '1.75rem' }}>Share Your Experience</CardTitle>
                  <CardDescription style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Your feedback helps improve tourism services across Jharkhand
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="userName" style={{ color: '#f4d03f' }}>Your Name *</Label>
                      <Input
                        id="userName"
                        value={formData.userName}
                        onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                        placeholder="Enter your name"
                        className="w-full"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.3)',
                          color: 'white',
                          padding: '0.5rem 0.75rem',
                          height: '42px'
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="language" style={{ color: '#f4d03f' }}>Language</Label>
                      <select
                        id="language"
                        value={formData.language}
                        onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-3 py-2 rounded-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.3)',
                          color: 'white',
                          height: '42px'
                        }}
                      >
                        {languages.map(lang => (
                          <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location" style={{ color: '#f4d03f' }}>Location Visited</Label>
                      <select
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 rounded-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.3)',
                          color: 'white'
                        }}
                      >
                        {locations.slice(1).map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="category" style={{ color: '#f4d03f' }}>Category</Label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 rounded-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.3)',
                          color: 'white'
                        }}
                      >
                        {categories.slice(1).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div>
                    <Label style={{ color: '#f4d03f' }}>Overall Rating</Label>
                    <div className="flex items-center gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          className="p-1"
                        >
                          <Star
                            className="h-8 w-8"
                            style={
                              star <= formData.rating
                                ? { fill: '#f4d03f', color: '#f4d03f', stroke: '#f4d03f' }
                                : { fill: 'none', color: '#f4d03f', stroke: '#f4d03f' }
                            }
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        {formData.rating}/5 stars
                      </span>
                    </div>
                  </div>

                  {/* Emoji Rating */}
                  <div>
                    <Label style={{ color: '#f4d03f', fontWeight: 700, marginTop: '20px' }}>How did you feel? (Optional)</Label>
                    <div className="flex items-center gap-4 mt-2">
                      {[
                        { emoji: "😍", label: "Loved it" },
                        { emoji: "😊", label: "Happy" },
                        { emoji: "😐", label: "Okay" },
                        { emoji: "😞", label: "Disappointed" },
                        { emoji: "😡", label: "Angry" }
                      ].map(({ emoji, label }) => (
                        <button
                          key={emoji}
                          onClick={() => setFormData(prev => ({ ...prev, emojiRating: emoji }))}
                          className="p-3 rounded-lg transition-all"
                          style={
                            formData.emojiRating === emoji
                              ? {
                                  border: '2px solid rgba(244, 208, 63, 0.7)',
                                  background: 'rgba(244, 208, 63, 0.18)',
                                  transform: 'scale(1.05)'
                                }
                              : {
                                  border: '2px solid rgba(255, 255, 255, 0.35)',
                                  background: 'rgba(255, 255, 255, 0.10)'
                                }
                          }
                          title={label}
                        >
                          <span className="text-2xl">{emoji}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Feedback */}
                  <div>
                    <Label htmlFor="textFeedback" style={{ color: '#f4d03f', fontWeight: 700, marginTop: '20px' }}>Your Feedback</Label>
                    <div className="relative">
                      <Textarea
                        id="textFeedback"
                        value={formData.textFeedback}
                        onChange={(e) => setFormData(prev => ({ ...prev, textFeedback: e.target.value }))}
                        placeholder="Share your detailed experience..."
                        rows={4}
                        className="pr-12"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.3)',
                          color: 'white'
                        }}
                      />
                      
                    </div>
                    
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label style={{ color: '#f4d03f', fontWeight: 700, marginTop: '20px' }}>Upload Image (Optional)</Label>
                    <div className="mt-2">
                      {!imagePreview ? (
                        <div
                          className="rounded-lg p-6 text-center transition-colors"
                          style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '2px dashed rgba(244, 208, 63, 0.35)',
                            color: 'white'
                          }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            style={{ display: 'none' }}
                          />
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <Camera className="h-12 w-12 mx-auto mb-2" style={{ color: '#f4d03f' }} />
                            <p className="text-sm" style={{color: '#f4d03f'}}>Click to upload an image</p>
                            <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.7)'}}>JPG, PNG, GIF up to 10MB</p>
                          </label>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={removeImage}
                            className="absolute top-2 right-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="mt-2 p-2 bg-green-50 rounded-md flex items-center gap-2">
                            <Image className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-700">Image ready for AI analysis</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Language Selection */}
                  <div>
                    <Label htmlFor="language" style={{ color: '#f4d03f', fontWeight: 700, marginTop: '20px' }}>Language</Label>
                    <select
                      id="language"
                      value={formData.language}
                      onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-3 py-2 rounded-md mt-2"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(244, 208, 63, 0.3)',
                        color: 'white',
                        minWidth: '340px',
                        marginBottom: '16px'
                      }}
                    >
                      <option value="auto">Auto-detect</option>
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* AI Features Info */}
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(244, 208, 63, 0.2) 0%, rgba(128, 0, 32, 0.15) 100%)',
                      border: '1px solid rgba(244, 208, 63, 0.4)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-8 w-8" style={{ color: '#f4d03f' }} />
                      <h3 className="font-semibold" style={{ color: '#f4d03f' }}>AI-Powered Analysis</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm" style={{color: 'rgba(255,255,255,0.9)'}}>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>Sentiment Analysis</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>Emotion Detection</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Image className="h-3 w-3" />
                        <span>Image Recognition</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmitFeedback}
                    disabled={loading}
                    className="w-full"
                    style={{
                      background: '#f4d03f',
                      color: '#800020',
                      border: '2px solid #f4d03f',
                      borderRadius: '25px',
                      fontWeight: 600 as unknown as string,
                      marginTop: '20px'
                    }}
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {loading ? 'AI Processing...' : 'Submit for AI Analysis'}
                  </Button>

                  {/* AI Response Display */}
                  {autoResponse && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-5 w-5" style={{ color: '#f4d03f' }} />
                        <h3 className="font-semibold" style={{ color: '#f4d03f' }}>AI Generated Response</h3>
                      </div>
                      <p className="text-sm" style={{ color: '#ffffff' }}>{autoResponse}</p>
                    </div>
                  )}

                  {/* Follow-up Questions */}
                  {followUpQuestions.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-800">AI Follow-up Questions</h3>
                      </div>
                      <ul className="space-y-1">
                        {followUpQuestions.map((question, index) => (
                          <li key={index} className="text-blue-700 text-sm flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* View Feedback Tab */}
          <TabsContent value="view" className="mt-8">
            <div className="space-y-6">
              {/* Filters */}
              <Card
                style={{
                  background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.12) 0%, rgba(30, 58, 138, 0.12) 100%)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(244, 208, 63, 0.3)',
                  borderRadius: '16px'
                }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#f4d03f' }}>
                    <Filter className="h-5 w-5" style={{ color: '#f4d03f' }} />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                    <div data-aos="fade-up" data-aos-delay="300">
                      <Label htmlFor="locationFilter" style={{ color: '#f4d03f', fontWeight: 700, marginTop: '12px' }}>Location</Label>
                      <select
                        id="locationFilter"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 rounded-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.25)',
                          color: 'white'
                        }}
                      >
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="400">
                      <Label htmlFor="categoryFilter" style={{ color: '#f4d03f', fontWeight: 700, marginTop: '12px' }}>Category</Label>
                      <select
                        id="categoryFilter"
                        value={filters.category}
                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 rounded-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.25)',
                          color: 'white'
                        }}
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="500">
                      <Label htmlFor="sentimentFilter" style={{ color: '#f4d03f', fontWeight: 700, marginTop: '12px' }}>Sentiment</Label>
                      <select
                        id="sentimentFilter"
                        value={filters.sentiment}
                        onChange={(e) => setFilters(prev => ({ ...prev, sentiment: e.target.value }))}
                        className="w-full px-3 py-2 rounded-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.25)',
                          color: 'white'
                        }}
                      >
                        <option value="All">All</option>
                        <option value="positive">Positive</option>
                        <option value="negative">Negative</option>
                        <option value="neutral">Neutral</option>
                      </select>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="600">
                      <Label htmlFor="urgencyFilter" style={{ color: '#f4d03f', fontWeight: 700, marginTop: '12px' }}>Urgency</Label>
                      <select
                        id="urgencyFilter"
                        value={filters.urgency}
                        onChange={(e) => setFilters(prev => ({ ...prev, urgency: e.target.value }))}
                        className="w-full px-3 py-2 rounded-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.25)',
                          color: 'white'
                        }}
                      >
                        <option value="All">All</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2" data-aos="fade-up" data-aos-delay="700">
                      <Label style={{ color: '#f4d03f', fontWeight: 700, marginTop: '12px' }}>Filters</Label>
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.flagged}
                            onChange={(e) => setFilters(prev => ({ ...prev, flagged: e.target.checked }))}
                          />
                          Flagged
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.hasVoice}
                            onChange={(e) => setFilters(prev => ({ ...prev, hasVoice: e.target.checked }))}
                          />
                          Has Voice
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.hasImage}
                            onChange={(e) => setFilters(prev => ({ ...prev, hasImage: e.target.checked }))}
                          />
                          Has Image
                        </label>
                      </div>
                    </div>
                    <div className="flex items-end" data-aos="fade-up" data-aos-delay="800">
                      <Button
                        onClick={fetchFeedbacks}
                        size="sm"
                        className="w-full"
                        style={{
                          background: '#f4d03f',
                          color: '#800020',
                          border: '2px solid #f4d03f',
                          borderRadius: '25px',
                          fontWeight: 600 as unknown as string
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
                <Card className="p-4"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(244, 208, 63, 0.3)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    marginTop: '12px'
                  }}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#f4d03f', fontWeight: 700 }}>Total</p>
                      <p className="text-2xl font-bold">{sentimentStats.total}</p>
                    </div>
                    <MessageCircle className="h-8 w-8 text-blue-600" />
                  </div>
                </Card>
                <Card className="p-4"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(244, 208, 63, 0.3)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    marginTop: '12px'
                  }}
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#f4d03f', fontWeight: 700 }}>Positive</p>
                      <p className="text-2xl font-bold text-green-600">{sentimentStats.positive}</p>
                    </div>
                    <ThumbsUp className="h-8 w-8 text-green-600" />
                  </div>
                </Card>
                <Card className="p-4"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(244, 208, 63, 0.3)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px'
                  }}
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#f4d03f', fontWeight: 700 }}>Negative</p>
                      <p className="text-2xl font-bold text-red-600">{sentimentStats.negative}</p>
                    </div>
                    <ThumbsDown className="h-8 w-8 text-red-600" />
                  </div>
                </Card>
                <Card className="p-4"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(244, 208, 63, 0.3)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px'
                  }}
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#f4d03f', fontWeight: 700 }}>Neutral</p>
                      <p className="text-2xl font-bold text-yellow-600">{sentimentStats.neutral}</p>
                    </div>
                    <Meh className="h-8 w-8 text-yellow-600" />
                  </div>
                </Card>
                <Card className="p-4"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(244, 208, 63, 0.3)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px'
                  }}
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#f4d03f', fontWeight: 700 }}>Critical</p>
                      <p className="text-2xl font-bold text-red-600">{urgencyStats.critical}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </Card>
                <Card className="p-4"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(244, 208, 63, 0.3)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px'
                  }}
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#f4d03f', fontWeight: 700 }}>High</p>
                      <p className="text-2xl font-bold text-orange-600">{urgencyStats.high}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </Card>
                <Card className="p-4"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(244, 208, 63, 0.3)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px'
                  }}
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#f4d03f', fontWeight: 700 }}>Medium</p>
                      <p className="text-2xl font-bold text-yellow-600">{urgencyStats.medium}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                  </div>
                </Card>
                <Card className="p-4"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(244, 208, 63, 0.3)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px'
                  }}
                  data-aos="fade-up"
                  data-aos-delay="900"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#f4d03f', fontWeight: 700 }}>Low</p>
                      <p className="text-2xl font-bold text-green-600">{urgencyStats.low}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </Card>
              </div>

              {/* Feedback List */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Loading feedback...</p>
                  </div>
                ) : feedbacks.length === 0 ? (
                  <Card
                    style={{
                      background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.12) 0%, rgba(30, 58, 138, 0.12) 100%)',
                      border: '1px solid rgba(244, 208, 63, 0.3)',
                      backdropFilter: 'blur(12px)'
                    }}
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <CardContent className="text-center py-8">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4" style={{ color: '#f4d03f' }} data-aos="zoom-in" data-aos-delay="400" />
                      <p className="text-lg font-medium" style={{ color: '#f4d03f' }} data-aos="fade-up" data-aos-delay="500">No feedback found</p>
                      <p style={{ color: '#ffffff' }} data-aos="fade-up" data-aos-delay="600">Try adjusting your filters</p>
                    </CardContent>
                  </Card>
                ) : (
                  feedbacks.map(feedback => (
                    <Card key={feedback.id}
                      className={`${feedback.flagged ? "border-red-200" : ""} ${feedback.urgencyLevel === 'critical' ? 'border-red-300 shadow-red-100 shadow-lg' : ''}`}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: feedback.flagged ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(244, 208, 63, 0.3)',
                        backdropFilter: 'blur(12px)'
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {feedback.userName}
                              {feedback.flagged && <AlertTriangle className="h-4 w-4 text-red-600" />}
                              {feedback.escalated && <TrendingUp className="h-4 w-4 text-orange-600" />}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {feedback.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(feedback.timestamp).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                {feedback.language && (
                                  <Badge variant="outline" className="text-xs">
                                    {feedback.language.toUpperCase()}
                                  </Badge>
                                )}
                              </span>
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{feedback.category}</Badge>
                            <Badge className={getSentimentColor(feedback.aiAnalysis.sentiment)}>
                              {getSentimentIcon(feedback.aiAnalysis.sentiment)}
                              <span className="ml-1 capitalize">{feedback.aiAnalysis.sentiment}</span>
                            </Badge>
                            <Badge className={getUrgencyColor(feedback.urgencyLevel)}>
                              {getUrgencyIcon(feedback.urgencyLevel)}
                              <span className="ml-1 capitalize">{feedback.urgencyLevel}</span>
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= feedback.rating
                                    ? 'fill-current text-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                              {feedback.rating}/5 stars
                            </span>
                            {feedback.emojiRating && (
                              <span className="ml-4 text-lg">{feedback.emojiRating}</span>
                            )}
                          </div>

                          {/* Text Feedback */}
                          {feedback.textFeedback && (
                            <div>
                              <p className="text-sm">{feedback.textFeedback}</p>
                            </div>
                          )}

                          {/* AI Analysis Summary */}
                          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="h-4 w-4 text-purple-600" />
                              <span className="font-medium text-purple-800 text-sm">AI Analysis</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="text-purple-700">Sentiment:</span>
                                <span className="ml-1 font-medium">{feedback.aiAnalysis.sentiment}</span>
                              </div>
                              <div>
                                <span className="text-purple-700">Confidence:</span>
                                <span className="ml-1 font-medium">{(feedback.aiAnalysis.confidence * 100).toFixed(1)}%</span>
                              </div>
                              <div>
                                <span className="text-purple-700">Language:</span>
                                <span className="ml-1 font-medium">{feedback.aiAnalysis.language}</span>
                              </div>
                              <div>
                                <span className="text-purple-700">Urgency:</span>
                                <span className="ml-1 font-medium capitalize">{feedback.urgencyLevel}</span>
                              </div>
                            </div>

                            {/* Keywords */}
                            {feedback.aiAnalysis.keywords.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs font-medium text-purple-700 mb-1">Key Topics:</p>
                                <div className="flex flex-wrap gap-1">
                                  {feedback.aiAnalysis.keywords.slice(0, 4).map((keyword, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs bg-blue-100">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Status Indicators */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                            <div className="flex items-center gap-2">
                              
                              {feedback.imageData && (
                                <Badge variant="outline" className="text-xs">
                                  <Image className="h-3 w-3 mr-1" />
                                  Image
                                </Badge>
                              )}
                              {feedback.isVerified && (
                                <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: #{feedback.id}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(244, 208, 63, 0.3)',
                  backdropFilter: 'blur(12px)'
                }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#f4d03f' }}>
                    <TrendingUp className="h-5 w-5" style={{ color: '#f4d03f' }} />
                    Sentiment Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Positive Trend</span>
                      <span className="text-green-600 font-medium">↗ +12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Negative Trend</span>
                      <span className="text-red-600 font-medium">↘ -8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Overall Satisfaction</span>
                      <span className="font-medium">4.2/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(244, 208, 63, 0.3)',
                  backdropFilter: 'blur(12px)'
                }}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#f4d03f' }}>
                    <AlertTriangle className="h-5 w-5" style={{ color: '#f4d03f' }} />
                    Alert Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Flagged Reviews</span>
                      <Badge variant="destructive">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Service Issues</span>
                      <Badge variant="secondary">2</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Safety Concerns</span>
                      <Badge variant="destructive">1</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(244, 208, 63, 0.3)',
                  backdropFilter: 'blur(12px)'
                }}
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#f4d03f' }}>
                    <CheckCircle className="h-5 w-5" style={{ color: '#f4d03f' }} />
                    Response Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Vendor Responses</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Avg Response Time</span>
                      <span className="font-medium">2.3 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Resolution Rate</span>
                      <span className="font-medium">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}

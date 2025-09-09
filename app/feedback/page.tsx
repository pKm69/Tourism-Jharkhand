"use client"

import { useState, useEffect } from "react"
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
  Mic,
  MicOff,
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
  Volume2,
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
  const [isRecording, setIsRecording] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
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

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        const chunks: Blob[] = []
        
        recorder.ondataavailable = (event) => {
          chunks.push(event.data)
        }
        
        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' })
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64Audio = reader.result as string
            setFormData(prev => ({
              ...prev,
              voiceData: base64Audio.split(',')[1] // Remove data:audio/wav;base64, prefix
            }))
          }
          reader.readAsDataURL(audioBlob)
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop())
        }
        
        setMediaRecorder(recorder)
        setAudioChunks(chunks)
        recorder.start()
        setIsRecording(true)
      } catch (error) {
        console.error('Error accessing microphone:', error)
        alert('Could not access microphone. Please check permissions.')
      }
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop()
        setIsRecording(false)
        setMediaRecorder(null)
      }
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI-Powered Feedback System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share your experience and help us improve Jharkhand tourism through AI-driven sentiment analysis
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
            <TabsTrigger value="view">View Feedback</TabsTrigger>
            <TabsTrigger value="analytics">Sentiment Analytics</TabsTrigger>
          </TabsList>

          {/* Submit Feedback Tab */}
          <TabsContent value="submit" className="mt-8">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Share Your Experience</CardTitle>
                  <CardDescription>
                    Your feedback helps improve tourism services across Jharkhand
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="userName">Your Name *</Label>
                      <Input
                        id="userName"
                        value={formData.userName}
                        onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        value={formData.language}
                        onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        {languages.map(lang => (
                          <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location Visited</Label>
                      <select
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        {locations.slice(1).map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        {categories.slice(1).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div>
                    <Label>Overall Rating</Label>
                    <div className="flex items-center gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          className="p-1"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= formData.rating
                                ? 'fill-current text-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {formData.rating}/5 stars
                      </span>
                    </div>
                  </div>

                  {/* Emoji Rating */}
                  <div>
                    <Label>How did you feel? (Optional)</Label>
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
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.emojiRating === emoji
                              ? 'border-primary bg-primary/10'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          title={label}
                        >
                          <span className="text-2xl">{emoji}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Feedback */}
                  <div>
                    <Label htmlFor="textFeedback">Your Feedback</Label>
                    <div className="relative">
                      <Textarea
                        id="textFeedback"
                        value={formData.textFeedback}
                        onChange={(e) => setFormData(prev => ({ ...prev, textFeedback: e.target.value }))}
                        placeholder="Share your detailed experience..."
                        rows={4}
                        className="pr-12"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant={isRecording ? "destructive" : "outline"}
                        onClick={toggleRecording}
                        className="absolute bottom-2 right-2"
                      >
                        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    {isRecording && (
                      <p className="text-sm text-red-600 mt-1 animate-pulse">
                        🔴 Recording... Speak now
                      </p>
                    )}
                    {formData.voiceData && (
                      <div className="mt-2 p-2 bg-blue-50 rounded-md flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">Voice recording captured</span>
                      </div>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label>Upload Image (Optional)</Label>
                    <div className="mt-2">
                      {!imagePreview ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload an image</p>
                            <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF up to 10MB</p>
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
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      value={formData.language}
                      onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md bg-background mt-2"
                    >
                      <option value="auto">Auto-detect</option>
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* AI Features Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-800">AI-Powered Analysis</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>Sentiment Analysis</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>Emotion Detection</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Volume2 className="h-3 w-3" />
                        <span>Voice Analysis</span>
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
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold text-green-800">AI Generated Response</h3>
                      </div>
                      <p className="text-green-700 text-sm">{autoResponse}</p>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                    <div>
                      <Label htmlFor="locationFilter">Location</Label>
                      <select
                        id="locationFilter"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="categoryFilter">Category</Label>
                      <select
                        id="categoryFilter"
                        value={filters.category}
                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="sentimentFilter">Sentiment</Label>
                      <select
                        id="sentimentFilter"
                        value={filters.sentiment}
                        onChange={(e) => setFilters(prev => ({ ...prev, sentiment: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="All">All</option>
                        <option value="positive">Positive</option>
                        <option value="negative">Negative</option>
                        <option value="neutral">Neutral</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="urgencyFilter">Urgency</Label>
                      <select
                        id="urgencyFilter"
                        value={filters.urgency}
                        onChange={(e) => setFilters(prev => ({ ...prev, urgency: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="All">All</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Filters</Label>
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
                    <div className="flex items-end">
                      <Button
                        onClick={fetchFeedbacks}
                        variant="outline"
                        size="sm"
                        className="w-full"
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
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">{sentimentStats.total}</p>
                    </div>
                    <MessageCircle className="h-8 w-8 text-blue-600" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Positive</p>
                      <p className="text-2xl font-bold text-green-600">{sentimentStats.positive}</p>
                    </div>
                    <ThumbsUp className="h-8 w-8 text-green-600" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Negative</p>
                      <p className="text-2xl font-bold text-red-600">{sentimentStats.negative}</p>
                    </div>
                    <ThumbsDown className="h-8 w-8 text-red-600" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Neutral</p>
                      <p className="text-2xl font-bold text-yellow-600">{sentimentStats.neutral}</p>
                    </div>
                    <Meh className="h-8 w-8 text-yellow-600" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Critical</p>
                      <p className="text-2xl font-bold text-red-600">{urgencyStats.critical}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">High</p>
                      <p className="text-2xl font-bold text-orange-600">{urgencyStats.high}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Medium</p>
                      <p className="text-2xl font-bold text-yellow-600">{urgencyStats.medium}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Low</p>
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
                  <Card>
                    <CardContent className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium">No feedback found</p>
                      <p className="text-muted-foreground">Try adjusting your filters</p>
                    </CardContent>
                  </Card>
                ) : (
                  feedbacks.map(feedback => (
                    <Card key={feedback.id} className={`${feedback.flagged ? "border-red-200 bg-red-50/50" : ""} ${feedback.urgencyLevel === 'critical' ? 'border-red-300 shadow-red-100 shadow-lg' : ''}`}>
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
                              {feedback.voiceData && (
                                <Badge variant="outline" className="text-xs">
                                  <Volume2 className="h-3 w-3 mr-1" />
                                  Voice
                                </Badge>
                              )}
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
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

      <Footer />
    </div>
  )
}

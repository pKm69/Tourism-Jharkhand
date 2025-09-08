"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  Bot,
  Shield,
  Eye,
  MapPin,
  BarChart3,
  Smartphone,
  MessageCircle,
  Camera,
  NavigationIcon,
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Brain,
  Lock,
  Headphones,
} from "lucide-react"

export default function AIFeaturesPage() {
  const [chatMessage, setChatMessage] = useState("")
  const [activeDemo, setActiveDemo] = useState("itinerary")

  const features = [
    {
      id: "itinerary",
      icon: <Bot className="h-12 w-12" />,
      title: "AI-Powered Itinerary Planning",
      description: "Get personalized travel plans created by advanced AI algorithms",
      longDescription:
        "Our AI analyzes your preferences, budget, time constraints, and interests to create the perfect itinerary. It considers weather patterns, local events, crowd levels, and transportation options to optimize your travel experience.",
      benefits: [
        "Personalized recommendations based on your interests",
        "Real-time optimization based on weather and events",
        "Budget-conscious planning with cost breakdowns",
        "Multi-language support for international travelers",
      ],
      demoContent: {
        title: "Plan Your 3-Day Jharkhand Adventure",
        subtitle: "Tell our AI about your preferences and get a customized itinerary",
      },
    },
    {
      id: "blockchain",
      icon: <Shield className="h-12 w-12" />,
      title: "Blockchain Security",
      description: "Secure transactions and verified guide certifications",
      longDescription:
        "All transactions are secured using blockchain technology, ensuring transparency and trust. Guide certifications, reviews, and payments are all verified and immutable, providing peace of mind for travelers.",
      benefits: [
        "Immutable transaction records",
        "Verified guide and service provider credentials",
        "Transparent pricing with no hidden fees",
        "Secure digital identity for travelers",
      ],
      demoContent: {
        title: "Secure Booking System",
        subtitle: "Experience blockchain-powered security for all your bookings",
      },
    },
    {
      id: "ar-vr",
      icon: <Eye className="h-12 w-12" />,
      title: "AR/VR Experiences",
      description: "Interactive maps and immersive previews of cultural sites",
      longDescription:
        "Experience destinations before you visit with our AR/VR technology. Get virtual tours of temples, wildlife sanctuaries, and cultural sites. Use AR for real-time information overlay during your actual visits.",
      benefits: [
        "Virtual tours of destinations before visiting",
        "AR-enhanced real-world exploration",
        "Interactive cultural and historical information",
        "360-degree immersive experiences",
      ],
      demoContent: {
        title: "Virtual Destination Preview",
        subtitle: "Take a virtual tour of Jharkhand's most beautiful locations",
      },
    },
    {
      id: "location",
      icon: <MapPin className="h-12 w-12" />,
      title: "Real-time Location Services",
      description: "Live transport updates and geo-location services",
      longDescription:
        "Stay connected with real-time location services that provide live updates on transportation, nearby attractions, emergency services, and local amenities. Never get lost with our advanced GPS integration.",
      benefits: [
        "Real-time public transport updates",
        "Nearby attraction and service discovery",
        "Emergency service location and contact",
        "Offline map functionality",
      ],
      demoContent: {
        title: "Smart Navigation System",
        subtitle: "Get real-time updates and smart routing for your journey",
      },
    },
    {
      id: "analytics",
      icon: <BarChart3 className="h-12 w-12" />,
      title: "Tourism Analytics Dashboard",
      description: "Insights and impact monitoring for tourism officials",
      longDescription:
        "Comprehensive analytics dashboard for tourism officials and stakeholders to monitor visitor patterns, economic impact, and sustainability metrics. Make data-driven decisions to improve tourism infrastructure.",
      benefits: [
        "Visitor flow and pattern analysis",
        "Economic impact measurement",
        "Sustainability and environmental monitoring",
        "Predictive analytics for tourism planning",
      ],
      demoContent: {
        title: "Tourism Intelligence Platform",
        subtitle: "Data-driven insights for sustainable tourism development",
      },
    },
    {
      id: "chatbot",
      icon: <MessageCircle className="h-12 w-12" />,
      title: "Multilingual AI Chatbot",
      description: "24/7 assistance in multiple languages including local dialects",
      longDescription:
        "Our AI chatbot provides instant assistance in Hindi, English, and local tribal languages. Get answers to travel queries, booking assistance, and cultural information anytime, anywhere.",
      benefits: [
        "24/7 availability in multiple languages",
        "Cultural context and local knowledge",
        "Instant booking and reservation assistance",
        "Emergency support and guidance",
      ],
      demoContent: {
        title: "AI Travel Assistant",
        subtitle: "Chat with our AI in your preferred language",
      },
    },
  ]

  const activeFeature = features.find((f) => f.id === activeDemo) || features[0]

  const chatMessages = [
    { type: "bot", message: "Namaste! I'm your AI travel assistant. How can I help you explore Jharkhand today?" },
    { type: "user", message: "I want to visit waterfalls and temples in 2 days" },
    {
      type: "bot",
      message:
        "Perfect! I recommend visiting Hundru Falls on Day 1 (45km from Ranchi) and Deoghar temples on Day 2. Would you like a detailed itinerary with timings and transport options?",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Smart Tourism
              <span className="text-primary block">Powered by AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Experience the future of travel with our cutting-edge AI technology, blockchain security, and immersive
              AR/VR experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <Brain className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">Advanced algorithms for personalized experiences</p>
            </Card>
            <Card className="text-center p-6">
              <Lock className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Blockchain Secured</h3>
              <p className="text-sm text-muted-foreground">Transparent and secure transactions</p>
            </Card>
            <Card className="text-center p-6">
              <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-time Updates</h3>
              <p className="text-sm text-muted-foreground">Live information and instant assistance</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Navigation */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature) => (
              <Button
                key={feature.id}
                variant={activeDemo === feature.id ? "default" : "outline"}
                onClick={() => setActiveDemo(feature.id)}
                className="flex items-center gap-2"
              >
                <div className="h-5 w-5">{feature.icon}</div>
                <span className="hidden sm:inline">
                  {feature.title.split(" ")[0]} {feature.title.split(" ")[1]}
                </span>
                <span className="sm:hidden">{feature.title.split(" ")[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Feature Demo */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">{activeFeature.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">{activeFeature.title}</h2>
                  <p className="text-muted-foreground">{activeFeature.description}</p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8 text-pretty">{activeFeature.longDescription}</p>

              <div className="space-y-4 mb-8">
                {activeFeature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="group" asChild>
                <Link href={activeDemo === "analytics" ? "/analytics" : "#"}>
                  Try This Feature
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div>
              <Card className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{activeFeature.demoContent.title}</h3>
                  <p className="text-muted-foreground">{activeFeature.demoContent.subtitle}</p>
                </div>

                {activeDemo === "itinerary" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Duration</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>2-3 days</option>
                          <option>4-5 days</option>
                          <option>1 week</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Budget</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>₹5,000-10,000</option>
                          <option>₹10,000-20,000</option>
                          <option>₹20,000+</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {["Nature", "Culture", "Adventure", "Spiritual", "Wildlife"].map((interest) => (
                          <Badge
                            key={interest}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full">Generate AI Itinerary</Button>
                  </div>
                )}

                {activeDemo === "chatbot" && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-background border"
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask about Jharkhand tourism..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                      />
                      <Button size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {activeDemo === "ar-vr" && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 text-center">
                      <Eye className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Virtual Reality Preview</h4>
                      <p className="text-sm text-muted-foreground mb-4">Experience Netarhat sunrise in VR</p>
                      <Button variant="outline" className="group bg-transparent">
                        <Play className="mr-2 h-4 w-4" />
                        Start VR Tour
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 text-center">
                        <Camera className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">360° Views</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <Headphones className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">Audio Guide</p>
                      </Card>
                    </div>
                  </div>
                )}

                {activeDemo === "blockchain" && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">Verified Transaction</span>
                      </div>
                      <p className="text-sm text-green-700">Block #1234567 - Guide Certification Verified</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Transaction Hash:</span>
                        <span className="font-mono text-xs">0x1a2b3c...</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Verification Status:</span>
                        <Badge variant="default">Confirmed</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Security Level:</span>
                        <span className="text-green-600 font-medium">Maximum</span>
                      </div>
                    </div>
                  </div>
                )}

                {(activeDemo === "location" || activeDemo === "analytics") && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <NavigationIcon className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          {activeDemo === "location" ? "Live Location Services" : "Analytics Dashboard"}
                        </span>
                      </div>
                      <p className="text-sm text-blue-700">
                        {activeDemo === "location"
                          ? "Real-time updates for your current location"
                          : "Tourism insights and visitor analytics"}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">98%</div>
                        <div className="text-xs text-muted-foreground">
                          {activeDemo === "location" ? "Accuracy" : "Satisfaction"}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">24/7</div>
                        <div className="text-xs text-muted-foreground">
                          {activeDemo === "location" ? "Available" : "Monitoring"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Our platform leverages cutting-edge technologies to deliver exceptional travel experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Machine Learning</h3>
              <p className="text-sm text-muted-foreground">Advanced algorithms for personalized recommendations</p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Blockchain</h3>
              <p className="text-sm text-muted-foreground">Secure and transparent transaction processing</p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">AR/VR</h3>
              <p className="text-sm text-muted-foreground">Immersive virtual and augmented reality experiences</p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Smartphone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Mobile First</h3>
              <p className="text-sm text-muted-foreground">Optimized for mobile devices and offline usage</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Experience the Future of Tourism</h2>
          <p className="text-xl mb-8 text-pretty max-w-2xl mx-auto opacity-90">
            Join the revolution in smart tourism with AI-powered planning and blockchain security
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
              <Link href="/destinations">Start Planning</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

"use client"

import React, { useState } from "react"
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
  Brain,
  Eye,
  MapPin,
  BarChart3,
  MessageCircle,
  Smartphone,
  Lock,
  Zap,
  CheckCircle,
  ArrowRight,
  Navigation as NavigationIcon,
  Send,
  Play,
  Camera,
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
    <div className="min-h-screen ai-features-page">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Smart Tourism
            <span className="text-gold block">Powered by AI</span>
          </h1>
          <p>
            Experience the future of travel with our cutting-edge AI technology, blockchain security, and immersive
            AR/VR experiences
          </p>

          <div className="feature-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '800px', margin: '0 auto'}}>
            <div className="feature-card">
              <div className="feature-icon"><Brain className="h-8 w-8" /></div>
              <h3>AI-Powered</h3>
              <p>Advanced algorithms for personalized experiences</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Lock className="h-8 w-8" /></div>
              <h3>Blockchain Secured</h3>
              <p>Transparent and secure transactions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Zap className="h-8 w-8" /></div>
              <h3>Real-time Updates</h3>
              <p>Live information and instant assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Navigation */}
      <section className="smart-tourism-section">
        <div className="ai-features-container">
          <h2 style={{fontSize: '2rem', marginBottom: '40px', textAlign: 'center'}}>Explore AI Features</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveDemo(feature.id)}
                className={`btn ${activeDemo === feature.id ? 'primary' : 'secondary'}`}
              >
                <div className="h-4 w-4">{feature.icon}</div>
                <span className="hidden sm:inline">
                  {feature.title.split(" ")[0]} {feature.title.split(" ")[1]}
                </span>
                <span className="sm:hidden">{feature.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Feature Demo */}
      <section className="destinations-grid-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg" style={{background: 'rgba(244, 208, 63, 0.2)', color: '#f4d03f'}}>{activeFeature.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold" style={{color: '#f4d03f', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'}}>{activeFeature.title}</h2>
                  <p style={{color: '#faf7f2', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}>{activeFeature.description}</p>
                </div>
              </div>

              <p className="text-lg mb-8" style={{color: '#faf7f2', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}>{activeFeature.longDescription}</p>

              <div className="space-y-4 mb-8">
                {activeFeature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#f4d03f'}} />
                    <span style={{color: '#faf7f2', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}>{benefit}</span>
                  </div>
                ))}
              </div>

              <Link href={activeDemo === "analytics" ? "/analytics" : "#"}>
                <button className="btn primary" style={{padding: '12px 32px', fontSize: '18px'}}>
                  Try This Feature
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>

            <div>
              <div className="ai-demo-card">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2" style={{color: '#f4d03f', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'}}>{activeFeature.demoContent.title}</h3>
                  <p style={{color: '#faf7f2', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}>{activeFeature.demoContent.subtitle}</p>
                </div>

                {activeDemo === "itinerary" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block" style={{color: '#f4d03f'}}>Duration</label>
                        <select className="w-full p-2 border rounded-md" style={{background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(244, 208, 63, 0.3)', color: '#faf7f2'}}>
                          <option>2-3 days</option>
                          <option>4-5 days</option>
                          <option>1 week</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block" style={{color: '#f4d03f'}}>Interests</label>
                        <select className="w-full p-2 border rounded-md" style={{background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(244, 208, 63, 0.3)', color: '#faf7f2'}}>
                          <option>Adventure</option>
                          <option>Culture</option>
                          <option>Nature</option>
                        </select>
                      </div>
                    </div>
                    <button className="btn primary" style={{width: '100%', marginTop: '16px'}}>Generate Itinerary</button>
                    <div className="ai-result-container">
                      <p className="text-sm" style={{color: '#faf7f2', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}>
                        ✨ AI-generated itinerary will appear here based on your preferences
                      </p>
                    </div>
                  </div>
                )}

                {activeDemo === "chat" && (
                  <div className="space-y-4">
                    <div className="h-64 rounded-md p-4 overflow-y-auto" style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(244, 208, 63, 0.2)'}}>
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`mb-3 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                          <div
                            className={`inline-block p-3 rounded-lg max-w-xs`}
                            style={msg.type === "user" 
                              ? {background: 'linear-gradient(135deg, #800020, #1e3a8a)', color: '#faf7f2'}
                              : {background: 'rgba(244, 208, 63, 0.1)', border: '1px solid rgba(244, 208, 63, 0.3)', color: '#faf7f2'}
                            }
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input placeholder="Ask about Jharkhand tourism..." className="flex-1 p-2 rounded-md" style={{background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(244, 208, 63, 0.3)', color: '#faf7f2'}} />
                      <button className="btn primary" style={{padding: '8px 16px'}}>
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {activeDemo === "analytics" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-md" style={{background: 'rgba(244, 208, 63, 0.1)', border: '1px solid rgba(244, 208, 63, 0.2)'}}>
                        <div className="text-2xl font-bold" style={{color: '#f4d03f'}}>15,420</div>
                        <div className="text-sm" style={{color: '#faf7f2'}}>Monthly Visitors</div>
                      </div>
                      <div className="text-center p-4 rounded-md" style={{background: 'rgba(244, 208, 63, 0.1)', border: '1px solid rgba(244, 208, 63, 0.2)'}}>
                        <div className="text-2xl font-bold" style={{color: '#f4d03f'}}>4.8⭐</div>
                        <div className="text-sm" style={{color: '#faf7f2'}}>Avg Rating</div>
                      </div>
                      <div className="text-center p-4 rounded-md" style={{background: 'rgba(244, 208, 63, 0.1)', border: '1px solid rgba(244, 208, 63, 0.2)'}}>
                        <div className="text-2xl font-bold" style={{color: '#f4d03f'}}>₹2.1M</div>
                        <div className="text-sm" style={{color: '#faf7f2'}}>Revenue</div>
                      </div>
                      <div className="text-center p-4 rounded-md" style={{background: 'rgba(244, 208, 63, 0.1)', border: '1px solid rgba(244, 208, 63, 0.2)'}}>
                        <div className="text-2xl font-bold" style={{color: '#f4d03f'}}>89%</div>
                        <div className="text-sm" style={{color: '#faf7f2'}}>Satisfaction</div>
                      </div>
                    </div>
                    <Link href="/analytics">
                      <button className="btn primary" style={{width: '100%', marginTop: '16px'}}>View Full Dashboard</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="smart-tourism-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#f4d03f', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>
              Powered by Advanced Technology
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{color: '#faf7f2', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}>
              Our platform leverages cutting-edge technologies to deliver exceptional travel experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card text-center">
              <div className="feature-icon mx-auto mb-4">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2" style={{color: '#f4d03f'}}>Machine Learning</h3>
              <p className="text-sm" style={{color: '#faf7f2'}}>Advanced algorithms for personalized recommendations</p>
            </div>
            <div className="feature-card text-center">
              <div className="feature-icon mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2" style={{color: '#f4d03f'}}>Blockchain</h3>
              <p className="text-sm" style={{color: '#faf7f2'}}>Secure and transparent transaction processing</p>
            </div>
            <div className="feature-card text-center">
              <div className="feature-icon mx-auto mb-4">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2" style={{color: '#f4d03f'}}>AR/VR</h3>
              <p className="text-sm" style={{color: '#faf7f2'}}>Immersive virtual and augmented reality experiences</p>
            </div>
            <div className="feature-card text-center">
              <div className="feature-icon mx-auto mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2" style={{color: '#f4d03f'}}>Mobile First</h3>
              <p className="text-sm" style={{color: '#faf7f2'}}>Optimized for mobile devices and offline usage</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="quick-feedback-section">
        <div className="feedback-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#f4d03f', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>Experience the Future of Tourism</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{color: '#faf7f2', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}>
            Join the revolution in smart tourism with AI-powered planning and blockchain security
          </p>
          <div className="flex flex-row gap-6 justify-center items-center" style={{flexWrap: 'wrap'}}>
            <button className="btn primary" style={{padding: '14px 28px', fontSize: '16px', minWidth: '180px'}}>
              Download Mobile App
            </button>
            <Link href="/destinations">
              <button className="btn secondary" style={{padding: '14px 28px', fontSize: '16px', minWidth: '180px'}}>
                Start Planning
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

"use client"

import React, { useState, useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
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
  X,
  Calendar,
  DollarSign,
  Users,
  Clock,
} from "lucide-react"

interface ItineraryActivity {
  time: string;
  activity: string;
  cost: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: ItineraryActivity[];
}

interface GeneratedItinerary {
  title: string;
  days: ItineraryDay[];
  totalCost: string;
  tips: string[];
}

export default function AIFeaturesPage() {
  const [chatMessage, setChatMessage] = useState("")
  const [activeDemo, setActiveDemo] = useState("itinerary")
  const [showItineraryModal, setShowItineraryModal] = useState(false)
  const [itineraryForm, setItineraryForm] = useState({
    duration: "3 days",
    interests: ["Adventure", "Culture"],
    budget: "Medium",
    groupSize: "2-4 people",
    accommodation: "Hotels"
  })
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null)

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
  }, [])

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
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 data-aos="fade-up">
            Smart Tourism
            <span className="text-gold block">Powered by AI</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Experience the future of travel with our cutting-edge AI technology, blockchain security, and immersive
            AR/VR experiences
          </p>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon"><Brain className="h-8 w-8" /></div>
              <h3>AI-Powered</h3>
              <p>Advanced algorithms for personalized experiences</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon"><Lock className="h-8 w-8" /></div>
              <h3>Blockchain Secured</h3>
              <p>Transparent and secure transactions</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="500">
              <div className="feature-icon"><Zap className="h-8 w-8" /></div>
              <h3>Real-time Updates</h3>
              <p>Live information and instant assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Navigation */}
      <section className="smart-tourism-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8">
            <h2 className="text-center mb-4" data-aos="fade-up">Explore AI Features</h2>
            <p className="subtitle text-center mb-8" data-aos="fade-up" data-aos-delay="200">Interactive demonstrations of our cutting-edge technology stack</p>
            
            {/* Feature Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveDemo(feature.id)}
                  className={`ai-feature-btn ${activeDemo === feature.id ? 'active' : ''}`}
                >
                  <div className="ai-feature-icon">
                    {React.cloneElement(feature.icon, { className: 'w-5 h-5' })}
                  </div>
                  <span className="ai-feature-text">
                    {feature.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                </button>
              ))}
            </div>

            {/* Dynamic Feature Content */}
            <div className="p-6 rounded-lg" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(244, 208, 63, 0.2)',
              color: 'white'
            }} data-aos="fade-up" data-aos-delay="1000">
              <div className="flex items-start gap-4 mb-6">
                <div className="feature-icon" style={{padding: '12px', borderRadius: '12px'}}>{activeFeature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gold mb-2 text-left">{activeFeature.title}</h3>
                  <p className="text-white text-left">{activeFeature.description}</p>
                </div>
              </div>

              <p className="text-lg mb-6 text-white">{activeFeature.longDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {activeFeature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3" data-aos="fade-up" data-aos-delay={1100 + (index * 100)}>
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-gold" />
                    <span className="text-white">{benefit}</span>
                  </div>
                ))}
              </div>

              {activeDemo === "itinerary" ? (
                <button 
                  className="btn primary"
                  onClick={() => setShowItineraryModal(true)}
                  data-aos="fade-up" 
                  data-aos-delay="1500"
                >
                  Try This Feature
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              ) : (
                <Link href={activeDemo === "analytics" ? "/analytics" : activeDemo === "ar-vr" ? "/ar-vr" : "#"}>
                  <button className="btn primary" data-aos="fade-up" data-aos-delay="1500">
                    Try This Feature
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="quick-feedback-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="feedback-card text-center py-16 px-12">
              <h2 className="text-4xl font-bold mb-6" style={{
                background: 'linear-gradient(135deg, #f4d03f 0%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }} data-aos="fade-up">Experience the Future of Tourism</h2>
              <p className="text-xl text-maroon mb-8 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                Join the revolution in smart tourism with AI-powered planning and blockchain security
              </p>
              <div className="button-group flex gap-6 justify-center">
                <button className="btn primary text-lg px-8 py-4 min-w-[200px]" style={{
                  background: '#f4d03f',
                  color: '#800020',
                  border: '2px solid #f4d03f',
                  fontSize: '18px'
                }} data-aos="fade-up" data-aos-delay="400">
                  Download Mobile App
                </button>
                <Link href="/destinations">
                  <button 
                    className="btn secondary text-lg px-8 py-4 min-w-[200px]" 
                    style={{
                      background: 'transparent',
                      color: 'white',
                      border: '2px solid #f4d03f',
                      fontSize: '18px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.background = 'rgba(244, 208, 63, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.background = 'transparent';
                    }}
                    data-aos="fade-up" 
                    data-aos-delay="600"
                  >
                    Start Planning
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* AI Itinerary Planning Modal */}
      {showItineraryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto" style={{
            background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(244, 208, 63, 0.3)'
          }}>
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gold mb-2">AI-Powered Itinerary Planning</h2>
                  <p className="text-cream">Get personalized travel plans created by advanced AI algorithms</p>
                </div>
                <button 
                  onClick={() => setShowItineraryModal(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="h-6 w-6 text-gold" />
                </button>
              </div>

              {/* Feature Description */}
              <div className="mb-8 p-6 rounded-lg" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(244, 208, 63, 0.2)'
              }}>
                <p className="text-cream mb-4">
                  Our AI analyzes your preferences, budget, time constraints, and interests to create the perfect itinerary. 
                  It considers weather patterns, local events, crowd levels, and transportation options to optimize your travel experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-gold" />
                    <span className="text-cream">Personalized recommendations based on your interests</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-gold" />
                    <span className="text-cream">Real-time optimization based on weather and events</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-gold" />
                    <span className="text-cream">Budget-conscious planning with cost breakdowns</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-gold" />
                    <span className="text-cream">Multi-language support for international travelers</span>
                  </div>
                </div>
              </div>

              {!generatedItinerary ? (
                /* Planning Form */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gold mb-6">Tell us about your trip</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gold">
                          <Calendar className="inline h-4 w-4 mr-2" />
                          Trip Duration
                        </label>
                        <select 
                          className="w-full p-3 rounded-lg bg-white/10 border border-gold/30 text-cream focus:outline-none focus:ring-2 focus:ring-gold/50"
                          value={itineraryForm.duration}
                          onChange={(e) => setItineraryForm({...itineraryForm, duration: e.target.value})}
                        >
                          <option value="2 days">2 days</option>
                          <option value="3 days">3 days</option>
                          <option value="4-5 days">4-5 days</option>
                          <option value="1 week">1 week</option>
                          <option value="2 weeks">2 weeks</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gold">
                          <DollarSign className="inline h-4 w-4 mr-2" />
                          Budget Range
                        </label>
                        <select 
                          className="w-full p-3 rounded-lg bg-white/10 border border-gold/30 text-cream focus:outline-none focus:ring-2 focus:ring-gold/50"
                          value={itineraryForm.budget}
                          onChange={(e) => setItineraryForm({...itineraryForm, budget: e.target.value})}
                        >
                          <option value="Budget">Budget (₹2,000-5,000)</option>
                          <option value="Medium">Medium (₹5,000-15,000)</option>
                          <option value="Luxury">Luxury (₹15,000+)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gold">
                          <Users className="inline h-4 w-4 mr-2" />
                          Group Size
                        </label>
                        <select 
                          className="w-full p-3 rounded-lg bg-white/10 border border-gold/30 text-cream focus:outline-none focus:ring-2 focus:ring-gold/50"
                          value={itineraryForm.groupSize}
                          onChange={(e) => setItineraryForm({...itineraryForm, groupSize: e.target.value})}
                        >
                          <option value="Solo">Solo Traveler</option>
                          <option value="2-4 people">2-4 people</option>
                          <option value="5-8 people">5-8 people</option>
                          <option value="Large group">Large group (9+)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gold">Interests (Select multiple)</label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Adventure", "Culture", "Nature", "Wildlife", "Temples", "Waterfalls", "Photography", "Food"].map((interest) => (
                            <button
                              key={interest}
                              onClick={() => {
                                const interests = itineraryForm.interests.includes(interest)
                                  ? itineraryForm.interests.filter(i => i !== interest)
                                  : [...itineraryForm.interests, interest]
                                setItineraryForm({...itineraryForm, interests})
                              }}
                              className={`p-2 rounded-lg text-sm transition-all ${
                                itineraryForm.interests.includes(interest)
                                  ? 'bg-gold text-maroon font-semibold'
                                  : 'bg-white/10 border border-gold/30 text-cream hover:bg-white/20'
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gold mb-6">Preview</h3>
                    <div className="p-6 rounded-lg" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(244, 208, 63, 0.2)'
                    }}>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gold" />
                          <span className="text-cream">{itineraryForm.duration} trip</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-gold" />
                          <span className="text-cream">{itineraryForm.budget} budget</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-gold" />
                          <span className="text-cream">{itineraryForm.groupSize}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Brain className="h-5 w-5 text-gold" />
                            <span className="text-cream">Interests:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {itineraryForm.interests.map((interest) => (
                              <span key={interest} className="px-2 py-1 bg-gold/20 text-gold text-sm rounded">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          // Simulate AI generation
                          setTimeout(() => {
                            setGeneratedItinerary({
                              title: `${itineraryForm.duration} Jharkhand Adventure`,
                              days: [
                                {
                                  day: 1,
                                  title: "Ranchi Exploration",
                                  activities: [
                                    { time: "9:00 AM", activity: "Visit Jagannath Temple", cost: "₹50" },
                                    { time: "11:00 AM", activity: "Rock Garden & Kanke Dam", cost: "₹100" },
                                    { time: "2:00 PM", activity: "Lunch at local restaurant", cost: "₹300" },
                                    { time: "4:00 PM", activity: "Hundru Falls (45km drive)", cost: "₹200" }
                                  ]
                                },
                                {
                                  day: 2,
                                  title: "Deoghar Spiritual Journey",
                                  activities: [
                                    { time: "6:00 AM", activity: "Baba Baidyanath Temple", cost: "₹100" },
                                    { time: "10:00 AM", activity: "Nandan Pahar", cost: "₹150" },
                                    { time: "1:00 PM", activity: "Traditional Jharkhand lunch", cost: "₹250" },
                                    { time: "3:00 PM", activity: "Tapovan Caves", cost: "₹80" }
                                  ]
                                }
                              ],
                              totalCost: "₹2,850",
                              tips: [
                                "Best time to visit waterfalls: Post-monsoon (Oct-Dec)",
                                "Carry comfortable walking shoes for temple visits",
                                "Book accommodation in advance during festival seasons"
                              ]
                            })
                          }, 2000)
                        }}
                        className="btn primary w-full mt-6"
                      >
                        <Bot className="mr-2 h-5 w-5" />
                        Generate AI Itinerary
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Generated Itinerary Display */
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-gold">{generatedItinerary.title}</h3>
                    <button 
                      onClick={() => setGeneratedItinerary(null)}
                      className="btn secondary"
                    >
                      Create New Plan
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="space-y-6">
                        {generatedItinerary.days.map((day: ItineraryDay) => (
                          <div key={day.day} className="p-6 rounded-lg" style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(244, 208, 63, 0.2)'
                          }}>
                            <h4 className="text-lg font-semibold text-gold mb-4">Day {day.day}: {day.title}</h4>
                            <div className="space-y-3">
                              {day.activities.map((activity: ItineraryActivity, idx: number) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded bg-white/5">
                                  <div className="flex items-center gap-3">
                                    <Clock className="h-4 w-4 text-gold" />
                                    <span className="text-cream font-medium">{activity.time}</span>
                                    <span className="text-cream">{activity.activity}</span>
                                  </div>
                                  <span className="text-gold font-semibold">{activity.cost}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="p-6 rounded-lg" style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(244, 208, 63, 0.2)'
                      }}>
                        <h4 className="text-lg font-semibold text-gold mb-4">Trip Summary</h4>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between">
                            <span className="text-cream">Total Cost:</span>
                            <span className="text-gold font-semibold">{generatedItinerary.totalCost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-cream">Duration:</span>
                            <span className="text-cream">{itineraryForm.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-cream">Group Size:</span>
                            <span className="text-cream">{itineraryForm.groupSize}</span>
                          </div>
                        </div>

                        <h5 className="text-md font-semibold text-gold mb-3">AI Tips</h5>
                        <div className="space-y-2">
                          {generatedItinerary.tips.map((tip: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold" />
                              <span className="text-cream text-sm">{tip}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 space-y-3">
                          <button className="btn primary w-full">
                            Download Itinerary
                          </button>
                          <button className="btn secondary w-full">
                            Share with Friends
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

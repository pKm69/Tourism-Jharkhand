"use client"

import React, { useState, useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  Bot,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  X,
  Loader2,
  Mountain,
  Sparkles,
  Heart,
  Star,
  Download,
  Share2,
  RefreshCw,
  AlertCircle
} from "lucide-react"

interface TravelPlannerForm {
  destination: string;
  startDate: string;
  endDate: string;
  interests: string[];
  budget: string;
  groupSize: string;
  accommodation: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    itinerary: string;
    requestDetails: TravelPlannerForm;
    generatedAt: string;
  };
  error?: string;
  fallback?: string;
}

export default function TravelPlannerPage() {
  const [formData, setFormData] = useState<TravelPlannerForm>({
    destination: "",
    startDate: "",
    endDate: "",
    interests: ["Culture", "Nature"],
    budget: "Medium",
    groupSize: "2-4 people",
    accommodation: "Hotels"
  });

  const [generatedItinerary, setGeneratedItinerary] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");
  const [showResult, setShowResult] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  // Helper function to calculate duration from dates
  const calculateDuration = (startDate: string, endDate: string): string => {
    if (!startDate || !endDate) return "0 days";
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day";
    if (diffDays <= 7) return `${diffDays} days`;
    if (diffDays <= 14) return `${Math.ceil(diffDays / 7)} week${diffDays > 7 ? 's' : ''}`;
    return `${Math.ceil(diffDays / 7)} weeks`;
  };

  const interestOptions = [
    "Adventure", "Culture", "Nature", "Wildlife", 
    "Temples", "Waterfalls", "Photography", "Food",
    "History", "Trekking", "Spirituality", "Shopping"
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    setError("");
    setShowResult(false);

    // Calculate duration from dates
    const duration = calculateDuration(formData.startDate, formData.endDate);
    
    // Prepare data for API (convert to old format for backend compatibility)
    const apiData = {
      destination: formData.destination,
      duration: duration,
      interests: formData.interests,
      budget: formData.budget,
      groupSize: formData.groupSize,
      accommodation: formData.accommodation
    };

    // Debug: Log the form data being sent
    console.log('Sending form data:', apiData);

    try {
      const response = await fetch('http://localhost:5000/api/travel-planner/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      console.log('Response status:', response.status);
      const data: ApiResponse = await response.json();
      console.log('Response data:', data);

      if (data.success && data.data) {
        setGeneratedItinerary(data.data.itinerary);
        setShowResult(true);
      } else {
        // Use fallback if available
        if (data.fallback) {
          setGeneratedItinerary(data.fallback);
          setShowResult(true);
          setError("AI service temporarily unavailable. Showing basic itinerary.");
        } else {
          setError(data.error || "Failed to generate itinerary");
        }
      }
    } catch (err) {
      console.error('Error generating itinerary:', err);
      setError("Network error. Please check if the backend server is running.");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setShowResult(false);
    setGeneratedItinerary("");
    setError("");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="feature-icon">
              <Bot className="h-12 w-12" />
            </div>
            <h1 data-aos="fade-up" className="text-center">
              AI Travel Planner
              <span className="text-gold block">for Jharkhand</span>
            </h1>
          </div>
          
          <p data-aos="fade-up" data-aos-delay="200" className="text-center max-w-3xl mx-auto">
            Let our advanced AI create personalized travel itineraries for your Jharkhand adventure. 
            Discover hidden gems, cultural treasures, and natural wonders with intelligent planning.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon"><Sparkles className="h-8 w-8" /></div>
              <h3>AI-Powered</h3>
              <p>Intelligent recommendations based on your preferences</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon"><Mountain className="h-8 w-8" /></div>
              <h3>Jharkhand Focused</h3>
              <p>Specialized knowledge of local attractions and culture</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="500">
              <div className="feature-icon"><Heart className="h-8 w-8" /></div>
              <h3>Personalized</h3>
              <p>Tailored to your interests, budget, and travel style</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="smart-tourism-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8">
            {!showResult ? (
              /* Planning Form */
              <div>
                <h2 className="text-center mb-4" data-aos="fade-up">
                  Plan Your Perfect Jharkhand Trip
                </h2>
                <p className="subtitle text-center mb-8" data-aos="fade-up" data-aos-delay="200">
                  Tell us about your preferences and let AI create your ideal itinerary
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Form Section */}
                  <div className="space-y-8" data-aos="fade-up" data-aos-delay="400">
                    {/* Destination */}
                    <div>
                      <label className="block text-sm font-medium mb-3" style={{ color: '#f4d03f' }}>
                        <MapPin className="inline h-4 w-4 mr-2" style={{ color: '#f4d03f' }} />
                        Primary Destination
                      </label>
                      <input
                        type="text"
                        placeholder="Enter destination (e.g., Ranchi, Deoghar, Jamshedpur)"
                        className="w-full rounded-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.3)',
                          color: 'white',
                          padding: '0.75rem',
                          height: '42px'
                        }}
                        value={formData.destination}
                        onChange={(e) => setFormData({...formData, destination: e.target.value})}
                        onFocus={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                          e.target.style.color = 'white';
                          e.target.style.border = '1px solid rgba(244, 208, 63, 0.5)';
                        }}
                        onBlur={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                          e.target.style.color = 'white';
                          e.target.style.border = '1px solid rgba(244, 208, 63, 0.3)';
                        }}
                      />
                    </div>

                    {/* Trip Dates */}
                    <div>
                      <label className="block text-sm font-medium mb-3" style={{ color: '#f4d03f' }}>
                        <Calendar className="inline h-4 w-4 mr-2" style={{ color: '#f4d03f' }} />
                        Travel Dates
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(244, 208, 63, 0.8)' }}>Start Date</label>
                          <input
                            type="date"
                            className="w-full rounded-md"
                            style={{
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(244, 208, 63, 0.3)',
                              color: 'white',
                              padding: '0.75rem',
                              height: '42px'
                            }}
                            value={formData.startDate}
                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                            min={new Date().toISOString().split('T')[0]}
                            onFocus={(e) => {
                              e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                              e.target.style.color = 'white';
                              e.target.style.border = '1px solid rgba(244, 208, 63, 0.5)';
                            }}
                            onBlur={(e) => {
                              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                              e.target.style.color = 'white';
                              e.target.style.border = '1px solid rgba(244, 208, 63, 0.3)';
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(244, 208, 63, 0.8)' }}>End Date</label>
                          <input
                            type="date"
                            className="w-full rounded-md"
                            style={{
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(244, 208, 63, 0.3)',
                              color: 'white',
                              padding: '0.75rem',
                              height: '42px'
                            }}
                            value={formData.endDate}
                            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                            min={formData.startDate || new Date().toISOString().split('T')[0]}
                            onFocus={(e) => {
                              e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                              e.target.style.color = 'white';
                              e.target.style.border = '1px solid rgba(244, 208, 63, 0.5)';
                            }}
                            onBlur={(e) => {
                              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                              e.target.style.color = 'white';
                              e.target.style.border = '1px solid rgba(244, 208, 63, 0.3)';
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="p-6 rounded-xl border-2 border-gold/30 bg-white/5 backdrop-blur-sm">
                      <label className="block text-sm font-medium mb-4" style={{ color: '#f4d03f' }}>
                        <DollarSign className="inline h-4 w-4 mr-2" style={{ color: '#f4d03f' }} />
                        Budget Range
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "Budget", label: "Budget", range: "₹2,000-5,000" },
                          { value: "Medium", label: "Medium", range: "₹5,000-15,000" },
                          { value: "Luxury", label: "Luxury", range: "₹15,000+" }
                        ].map((budget) => (
                          <button
                            key={budget.value}
                            onClick={() => setFormData({...formData, budget: budget.value})}
                            className={`btn text-center ${
                              formData.budget === budget.value
                                ? 'primary'
                                : 'outline'
                            }`}
                            style={{
                              backgroundColor: formData.budget === budget.value ? '#f4d03f' : 'transparent',
                              borderColor: formData.budget === budget.value ? '#f4d03f' : 'rgba(244, 208, 63, 0.4)',
                              color: formData.budget === budget.value ? '#800020' : '#f4d03f',
                              boxShadow: formData.budget === budget.value ? '0 10px 25px rgba(244, 208, 63, 0.3)' : 'none',
                              transform: 'none !important'
                            }}
                          >
                            <div className="space-y-1">
                              <div className="font-semibold">{budget.label}</div>
                              <div className="text-xs opacity-90">{budget.range}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Group Size */}
                    <div className="p-6 rounded-xl border-2 border-gold/30 bg-white/5 backdrop-blur-sm">
                      <label className="block text-sm font-medium mb-4" style={{ color: '#f4d03f' }}>
                        <Users className="inline h-4 w-4 mr-2" style={{ color: '#f4d03f' }} />
                        Group Size
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "Solo", label: "Solo Traveler" },
                          { value: "2-4 people", label: "2-4 people" },
                          { value: "5-8 people", label: "5-8 people" },
                          { value: "Large group", label: "Large group (9+)" }
                        ].map((group) => (
                          <button
                            key={group.value}
                            onClick={() => setFormData({...formData, groupSize: group.value})}
                            className={`btn text-center ${
                              formData.groupSize === group.value
                                ? 'primary'
                                : 'outline'
                            }`}
                            style={{
                              backgroundColor: formData.groupSize === group.value ? '#f4d03f' : 'transparent',
                              borderColor: formData.groupSize === group.value ? '#f4d03f' : 'rgba(244, 208, 63, 0.4)',
                              color: formData.groupSize === group.value ? '#800020' : '#f4d03f',
                              boxShadow: formData.groupSize === group.value ? '0 10px 25px rgba(244, 208, 63, 0.3)' : 'none',
                              transform: 'none !important'
                            }}
                          >
                            <div className="font-medium">{group.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="p-6 rounded-xl border-2 border-gold/30 bg-white/5 backdrop-blur-sm">
                      <label className="block text-sm font-medium mb-4" style={{ color: '#f4d03f' }}>
                        <Star className="inline h-4 w-4 mr-2" style={{ color: '#f4d03f' }} />
                        Your Interests (Select multiple)
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {interestOptions.map((interest) => (
                          <button
                            key={interest}
                            onClick={() => handleInterestToggle(interest)}
                            className={`btn text-xs font-medium ${
                              formData.interests.includes(interest)
                                ? 'primary'
                                : 'outline'
                            }`}
                            style={{
                              backgroundColor: formData.interests.includes(interest) ? '#f4d03f' : 'transparent',
                              borderColor: formData.interests.includes(interest) ? '#f4d03f' : 'rgba(244, 208, 63, 0.4)',
                              color: formData.interests.includes(interest) ? '#800020' : '#f4d03f',
                              boxShadow: formData.interests.includes(interest) ? '0 10px 25px rgba(244, 208, 63, 0.3)' : 'none',
                              padding: '12px 8px',
                              transform: 'none !important'
                            }}
                          >
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-center leading-tight">{interest}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      {formData.interests.length > 0 && (
                        <div className="mt-4 p-3 bg-gold/10 border border-gold/30 rounded-lg">
                          <p style={{ color: '#f4d03f' }} className="text-sm font-medium">
                            Selected: {formData.interests.length} interest{formData.interests.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div data-aos="fade-up" data-aos-delay="600">
                    <h3 className="text-xl font-semibold text-gold mb-6 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Trip Preview
                    </h3>
                    <div className="p-6 rounded-xl" style={{
                      background: 'linear-gradient(135deg, rgba(244, 208, 63, 0.1) 0%, rgba(128, 0, 32, 0.1) 100%)',
                      border: '2px solid rgba(244, 208, 63, 0.4)',
                      boxShadow: '0 8px 32px rgba(244, 208, 63, 0.1)'
                    }}>
                      <div className="space-y-5">
                        <div className="p-3 rounded-lg bg-white/5 border border-gold/20">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5" style={{ color: '#f4d03f' }} />
                            <div>
                              <span style={{ color: '#f4d03f' }} className="text-sm font-medium">Destination</span>
                              <p style={{ color: 'white !important' }} className="font-semibold">{formData.destination || 'Not selected'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          <div className="p-3 rounded-lg bg-white/5 border border-gold/20">
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5" style={{ color: '#f4d03f' }} />
                              <div>
                                <span style={{ color: '#f4d03f' }} className="text-sm font-medium">Duration</span>
                                <p style={{ color: 'white !important' }} className="font-semibold">
                                  {calculateDuration(formData.startDate, formData.endDate)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-white/5 border border-gold/20">
                            <div className="flex items-center gap-3">
                              <Clock className="h-5 w-5" style={{ color: '#f4d03f' }} />
                              <div>
                                <span style={{ color: '#f4d03f' }} className="text-sm font-medium">Travel Dates</span>
                                <p style={{ color: 'white !important' }} className="font-semibold">
                                  {formData.startDate && formData.endDate 
                                    ? `${formData.startDate} to ${formData.endDate}` 
                                    : 'Not selected'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-white/5 border border-gold/20">
                            <div className="flex items-center gap-3">
                              <DollarSign className="h-5 w-5" style={{ color: '#f4d03f' }} />
                              <div>
                                <span style={{ color: '#f4d03f' }} className="text-sm font-medium">Budget</span>
                                <p style={{ color: 'white !important' }} className="font-semibold">{formData.budget}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-white/5 border border-gold/20">
                            <div className="flex items-center gap-3">
                              <Users className="h-5 w-5" style={{ color: '#f4d03f' }} />
                              <div>
                                <span style={{ color: '#f4d03f' }} className="text-sm font-medium">Group</span>
                                <p style={{ color: 'white !important' }} className="font-semibold">{formData.groupSize}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {formData.interests.length > 0 && (
                          <div className="p-3 rounded-lg bg-white/5 border border-gold/20">
                            <div className="flex items-start gap-3">
                              <Star className="h-5 w-5 mt-0.5" style={{ color: '#f4d03f' }} />
                              <div className="flex-1">
                                <span style={{ color: '#f4d03f' }} className="text-sm font-medium">Selected Interests</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {formData.interests.map((interest) => (
                                    <span 
                                      key={interest} 
                                      className="px-3 py-1 text-sm rounded-full border font-medium"
                                      style={{
                                        backgroundColor: 'rgba(244, 208, 63, 0.2)',
                                        borderColor: 'rgba(244, 208, 63, 0.3)',
                                        color: 'white !important'
                                      }}
                                    >
                                      {interest}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {error && (
                        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <span className="text-red-400 text-sm">{error}</span>
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={generateItinerary}
                        disabled={isGenerating || formData.interests.length === 0 || !formData.destination || !formData.startDate || !formData.endDate}
                        className="btn primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating Your Itinerary...
                          </>
                        ) : (
                          <>
                            <Bot className="mr-2 h-5 w-5" />
                            Generate AI Itinerary
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Generated Itinerary Display */
              <div data-aos="fade-up">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold mb-4" style={{ color: '#f4d03f' }}>
                    🎉 Your Personalized Jharkhand Itinerary
                  </h2>
                  <p className="text-lg mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    Crafted specially for your perfect Jharkhand adventure
                  </p>
                  <button 
                    onClick={resetForm}
                    className="btn secondary flex items-center gap-2 mx-auto"
                    style={{
                      background: 'transparent',
                      border: '2px solid rgba(244, 208, 63, 0.8)',
                      color: 'white',
                      borderRadius: '25px'
                    }}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Create New Plan
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Itinerary Content */}
                  <div className="lg:col-span-3">
                    <div className="p-8 rounded-xl" style={{
                      background: 'linear-gradient(135deg, rgba(244, 208, 63, 0.15) 0%, rgba(128, 0, 32, 0.15) 100%)',
                      border: '2px solid rgba(244, 208, 63, 0.4)',
                      boxShadow: '0 12px 40px rgba(244, 208, 63, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold flex items-center gap-3 mb-4" style={{ color: '#f4d03f' }}>
                          <Mountain className="h-6 w-6" />
                          Your Adventure Awaits
                        </h3>
                        <div className="h-1 w-20 rounded-full mb-6" style={{ background: '#f4d03f' }}></div>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <div 
                          className="whitespace-pre-wrap font-sans text-base leading-relaxed p-6 rounded-lg"
                          style={{ 
                            color: 'white',
                            background: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(244, 208, 63, 0.2)'
                          }}
                        >
                          {generatedItinerary}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Panel */}
                  <div>
                    <div className="p-6 rounded-xl" style={{
                      background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.15) 0%, rgba(244, 208, 63, 0.15) 100%)',
                      border: '2px solid rgba(244, 208, 63, 0.4)',
                      boxShadow: '0 8px 32px rgba(244, 208, 63, 0.15)',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <h4 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: '#f4d03f' }}>
                        <Heart className="h-5 w-5" />
                        Trip Summary
                      </h4>
                      <div className="space-y-4 mb-8">
                        <div className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(244, 208, 63, 0.2)' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" style={{ color: '#f4d03f' }} />
                              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }} className="text-sm">Destination</span>
                            </div>
                            <span style={{ color: '#f4d03f' }} className="font-semibold">{formData.destination}</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(244, 208, 63, 0.2)' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" style={{ color: '#f4d03f' }} />
                              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }} className="text-sm">Duration</span>
                            </div>
                            <span style={{ color: 'white' }} className="font-semibold">{calculateDuration(formData.startDate, formData.endDate)}</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(244, 208, 63, 0.2)' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" style={{ color: '#f4d03f' }} />
                              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }} className="text-sm">Dates</span>
                            </div>
                            <span style={{ color: 'white' }} className="font-semibold text-xs">
                              {formData.startDate && formData.endDate 
                                ? `${formData.startDate} to ${formData.endDate}` 
                                : 'Not selected'}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(244, 208, 63, 0.2)' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" style={{ color: '#f4d03f' }} />
                              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }} className="text-sm">Budget</span>
                            </div>
                            <span style={{ color: 'white' }} className="font-semibold">{formData.budget}</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(244, 208, 63, 0.2)' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" style={{ color: '#f4d03f' }} />
                              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }} className="text-sm">Group</span>
                            </div>
                            <span style={{ color: 'white' }} className="font-semibold">{formData.groupSize}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center mb-4">
                          <h5 className="font-semibold mb-2" style={{ color: '#f4d03f' }}>Quick Actions</h5>
                          <div className="h-0.5 w-12 mx-auto rounded-full" style={{ background: '#f4d03f' }}></div>
                        </div>
                        <button 
                          className="btn w-full flex items-center justify-center gap-2"
                          style={{
                            background: '#f4d03f',
                            color: '#800020',
                            border: '2px solid #f4d03f',
                            borderRadius: '25px',
                            fontWeight: '600',
                            padding: '12px 24px'
                          }}
                        >
                          <Download className="h-4 w-4" />
                          Download PDF
                        </button>
                        <button 
                          className="btn w-full flex items-center justify-center gap-2"
                          style={{
                            background: 'transparent',
                            color: 'white',
                            border: '2px solid rgba(244, 208, 63, 0.8)',
                            borderRadius: '25px',
                            fontWeight: '600',
                            padding: '12px 24px'
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                          Share Itinerary
                        </button>
                        <Link href="/destinations" className="block">
                          <button 
                            className="btn w-full flex items-center justify-center gap-2"
                            style={{
                              background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.8) 0%, rgba(244, 208, 63, 0.8) 100%)',
                              color: 'white',
                              border: '2px solid rgba(244, 208, 63, 0.6)',
                              borderRadius: '25px',
                              fontWeight: '600',
                              padding: '12px 24px'
                            }}
                          >
                            <Mountain className="h-4 w-4" />
                            Explore More Destinations
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

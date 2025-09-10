"use client"

import React, { useState, useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  MapPin,
  Star,
  Clock,
  Camera,
  Mountain,
  TreePine,
  Waves,
  Building2,
  Search,
  ArrowRight,
  Calendar,
  Users,
  Thermometer,
} from "lucide-react"

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
  }, [])

  const destinations = [
    {
      id: "netarhat",
      name: "Netarhat",
      image: "/netarhat-hill-station-sunrise-jharkhand.jpg",
      description:
        "Known as the 'Queen of Chotanagpur', Netarhat offers breathtaking sunrise and sunset views from its hilltops.",
      longDescription:
        "Netarhat is a hill station located in the Latehar district of Jharkhand. At an elevation of 1,128 meters, it's famous for its scenic beauty, dense forests, and pleasant climate. The sunrise and sunset views from Magnolia Point are absolutely spectacular.",
      category: "Hill Station",
      rating: 4.8,
      duration: "2-3 days",
      bestTime: "Oct-Mar",
      temperature: "15-25°C",
      highlights: ["Sunrise Point", "Sunset Point", "Netarhat Dam", "Dense Forests", "Pleasant Climate"],
      activities: ["Trekking", "Photography", "Nature Walks", "Camping"],
      distance: "156 km from Ranchi",
    },
    {
      id: "betla",
      name: "Betla National Park",
      image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
      description: "One of the first national parks in India, home to tigers, elephants, and diverse wildlife.",
      longDescription:
        "Betla National Park, established in 1986, is located in the Latehar and Palamu districts. Spread over 979 sq km, it's part of the Palamu Tiger Reserve and houses a variety of wildlife including tigers, elephants, leopards, and over 174 bird species.",
      category: "Wildlife",
      rating: 4.7,
      duration: "2-3 days",
      bestTime: "Nov-Apr",
      temperature: "20-35°C",
      highlights: ["Tiger Safari", "Elephant Spotting", "Bird Watching", "Betla Fort", "Kechki Waterfalls"],
      activities: ["Wildlife Safari", "Bird Watching", "Photography", "Nature Trails"],
      distance: "170 km from Ranchi",
    },
    {
      id: "hundru",
      name: "Hundru Falls",
      image: "/hundru-falls-waterfall-jharkhand.jpg",
      description: "A spectacular 98-meter waterfall on the Subarnarekha River, perfect for nature lovers.",
      longDescription:
        "Hundru Falls is one of the highest waterfalls in Jharkhand, created by the Subarnarekha River. The waterfall drops from a height of 98 meters, creating a mesmerizing sight especially during monsoons when it's at its full glory.",
      category: "Waterfall",
      rating: 4.6,
      duration: "1 day",
      bestTime: "Jul-Feb",
      temperature: "18-30°C",
      highlights: ["98m Waterfall", "Subarnarekha River", "Rock Formations", "Natural Pool", "Scenic Views"],
      activities: ["Photography", "Picnicking", "Rock Climbing", "Swimming"],
      distance: "45 km from Ranchi",
    },
    {
      id: "deoghar",
      name: "Deoghar",
      image: "/deoghar-temple-spiritual-jharkhand.jpg",
      description: "Sacred pilgrimage site famous for the Baidyanath Temple, one of the twelve Jyotirlingas.",
      longDescription:
        "Deoghar, meaning 'abode of the gods', is one of the most sacred pilgrimage sites in India. The Baidyanath Temple, dedicated to Lord Shiva, is one of the twelve Jyotirlingas and attracts millions of devotees annually, especially during the holy month of Shravan.",
      category: "Spiritual",
      rating: 4.9,
      duration: "1-2 days",
      bestTime: "Oct-Mar",
      temperature: "20-32°C",
      highlights: ["Baidyanath Temple", "Nandan Pahar", "Tapovan", "Trikuta Parvat", "Basukinath Temple"],
      activities: ["Temple Visits", "Spiritual Tours", "Cable Car Ride", "Meditation"],
      distance: "253 km from Ranchi",
    },
    {
      id: "dassam",
      name: "Dassam Falls",
      image: "/dassam-falls-jharkhand-waterfall-nature.jpg",
      description: "A beautiful waterfall formed by the Kanchi River, surrounded by dense forests.",
      longDescription:
        "Dassam Falls is a spectacular waterfall located near Taimara village. The Kanchi River creates this 44-meter high waterfall, which is surrounded by dense forests and rocky terrain, making it a perfect spot for nature enthusiasts and photographers.",
      category: "Waterfall",
      rating: 4.5,
      duration: "1 day",
      bestTime: "Jul-Feb",
      temperature: "18-28°C",
      highlights: ["44m Waterfall", "Dense Forests", "Rocky Terrain", "Kanchi River", "Natural Beauty"],
      activities: ["Photography", "Trekking", "Picnicking", "Nature Walks"],
      distance: "40 km from Ranchi",
    },
    {
      id: "parasnath",
      name: "Parasnath Hills",
      image: "/parasnath-hills-jharkhand-jain-temple-mountain.jpg",
      description: "Highest peak in Jharkhand and sacred Jain pilgrimage site with ancient temples.",
      longDescription:
        "Parasnath Hills, at 1,365 meters, is the highest peak in Jharkhand. It's a sacred Jain pilgrimage site with 24 temples dedicated to Jain Tirthankaras. The hill offers panoramic views and is known for its spiritual significance and natural beauty.",
      category: "Spiritual",
      rating: 4.7,
      duration: "2 days",
      bestTime: "Oct-Mar",
      temperature: "12-25°C",
      highlights: ["Highest Peak", "Jain Temples", "Panoramic Views", "Spiritual Significance", "Trekking Trails"],
      activities: ["Temple Visits", "Trekking", "Photography", "Meditation"],
      distance: "165 km from Ranchi",
    },
    {
      id: "hazaribagh",
      name: "Hazaribagh National Park",
      image: "/hazaribagh-national-park-jharkhand-wildlife-forest.jpg",
      description: "Wildlife sanctuary known for its diverse flora and fauna, including tigers and leopards.",
      longDescription:
        "Hazaribagh National Park, established in 1955, covers an area of 186 sq km. It's known for its diverse wildlife including tigers, leopards, wild boars, and various bird species. The park also features beautiful landscapes with hills, valleys, and streams.",
      category: "Wildlife",
      rating: 4.4,
      duration: "2 days",
      bestTime: "Nov-Apr",
      temperature: "18-32°C",
      highlights: ["Wildlife Safari", "Bird Watching", "Canary Hill", "Hazaribagh Lake", "Dense Forests"],
      activities: ["Wildlife Safari", "Bird Watching", "Boating", "Photography"],
      distance: "91 km from Ranchi",
    },
    {
      id: "jamshedpur",
      name: "Jamshedpur",
      image: "/jamshedpur-jharkhand-steel-city-jubilee-park.jpg",
      description: "The Steel City of India, known for its planned infrastructure and beautiful parks.",
      longDescription:
        "Jamshedpur, founded by Jamsetji Tata, is known as the Steel City of India. It's famous for its well-planned infrastructure, beautiful parks like Jubilee Park, and the Tata Steel Plant. The city offers a perfect blend of industrial heritage and natural beauty.",
      category: "City",
      rating: 4.3,
      duration: "2-3 days",
      bestTime: "Oct-Mar",
      temperature: "20-35°C",
      highlights: ["Jubilee Park", "Tata Steel Plant", "Dimna Lake", "Dalma Wildlife Sanctuary", "Tribal Museum"],
      activities: ["City Tours", "Boating", "Wildlife Safari", "Cultural Visits"],
      distance: "135 km from Ranchi",
    },
  ]

  const categories = ["All", "Hill Station", "Wildlife", "Waterfall", "Spiritual", "City"]

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || destination.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Hill Station":
        return <Mountain className="h-4 w-4" />
      case "Wildlife":
        return <TreePine className="h-4 w-4" />
      case "Waterfall":
        return <Waves className="h-4 w-4" />
      case "Spiritual":
        return <Building2 className="h-4 w-4" />
      case "City":
        return <Building2 className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 data-aos="fade-up">
            Discover Jharkhand's
            <span className="text-gold block">Hidden Treasures</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            From mystical waterfalls to sacred temples, explore the diverse landscapes and rich cultural heritage of
            Jharkhand
          </p>

          {/* Search and Filter */}
          <div className="search-bar" data-aos="fade-up" data-aos-delay="400">
            <div className="relative" style={{width: '100%', maxWidth: '500px'}}>
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`btn ${selectedCategory === category ? 'primary' : 'secondary'}`}
                  style={{display: 'flex', alignItems: 'center', gap: '8px'}}
                >
                  {getCategoryIcon(category)}
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="destinations-grid-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="destination-grid">
            {filteredDestinations.map((destination, index) => (
              <div 
                key={destination.id} 
                className="destination-card clickable"
                data-aos="fade-up"
                data-aos-delay={200 + (index * 100)}
              >
                <div className="destination-image-container">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                  />
                  <div className="destination-badge">
                    {getCategoryIcon(destination.category)}
                    {destination.category}
                  </div>
                  <div className="destination-rating">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{destination.rating}</span>
                  </div>
                </div>

                <div className="card-info">
                  <div className="destination-header">
                    <h3>{destination.name}</h3>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <p className="destination-description">{destination.description}</p>

                  <div className="destination-details">
                    <div className="detail-item">
                      <Clock className="h-4 w-4" />
                      {destination.duration}
                    </div>
                    <div className="detail-item">
                      <Calendar className="h-4 w-4" />
                      {destination.bestTime}
                    </div>
                    <div className="detail-item">
                      <Thermometer className="h-4 w-4" />
                      {destination.temperature}
                    </div>
                  </div>

                  <div className="destination-highlights">
                    <p className="highlights-label">Top Highlights:</p>
                    <div className="highlights-tags">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="highlight-tag">
                          {highlight}
                        </span>
                      ))}
                      {destination.highlights.length > 3 && (
                        <span className="highlight-tag">
                          +{destination.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="destination-footer">
                    <span className="destination-distance">{destination.distance}</span>
                    <button className="btn primary">
                      Explore
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="no-results">
              <p>No destinations found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="btn outline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Planning Section */}
      <section className="smart-tourism-section">
        <h2 data-aos="fade-up">Plan Your Perfect Trip</h2>
        <p className="subtitle" data-aos="fade-up" data-aos-delay="200">
          Let our AI-powered platform create a personalized itinerary based on your preferences
        </p>

        <div className="feature-grid">
          <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-icon">
              <Users className="h-8 w-8" />
            </div>
            <h3>Personalized Recommendations</h3>
            <p>
              Get destination suggestions based on your interests and travel style
            </p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
            <div className="feature-icon">
              <Calendar className="h-8 w-8" />
            </div>
            <h3>Smart Itinerary Planning</h3>
            <p>AI-powered trip planning with optimal routes and timing</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="500">
            <div className="feature-icon">
              <Camera className="h-8 w-8" />
            </div>
            <h3>Local Experiences</h3>
            <p>Connect with local guides and authentic cultural experiences</p>
          </div>
        </div>

        <Link href="/ai-features">
          <button className="btn primary" data-aos="fade-up" data-aos-delay="600">
            Start Planning with AI
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </Link>
      </section>

      <Footer />
    </div>
  )
}

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

// Define types
interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  longDescription: string;
  category: string;
  rating: number;
  duration: string;
  bestTime: string;
  temperature: string;
  highlights: string[];
  activities: string[];
  distance: string;
}

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [destinationsWithImages, setDestinationsWithImages] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch image URL for a destination
  const fetchImageForDestination = async (destinationId: string): Promise<string | null> => {
    try {
      console.log(`🔍 Fetching image for destination: "${destinationId}"`);
      const url = `http://localhost:5000/api/images/destination/${encodeURIComponent(destinationId)}`;
      console.log(`📡 API URL: ${url}`);
      
      const response = await fetch(url);
      console.log(`📊 Response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Image data for ${destinationId}:`, data);
        const fullImageUrl = `http://localhost:5000${data.data.imageUrl}`;
        console.log(`🖼️ Full image URL: ${fullImageUrl}`);
        return fullImageUrl;
      } else if (response.status === 404) {
        console.log(`❌ No image found for ${destinationId}`);
        return null;
      } else {
        const errorText = await response.text();
        console.error(`❌ Error ${response.status} for ${destinationId}:`, errorText);
        return null;
      }
    } catch (error: any) {
      console.error(`💥 Network error fetching image for ${destinationId}:`, error);
      return null;
    }
  };

  // Load destinations with images from MongoDB
  useEffect(() => {
    const loadDestinationsWithImages = async () => {
      try {
        setLoading(true);
        
        // Import destinations data dynamically
        const destinationsModule = await import('../../public/destination.js');
        const destinationsData = destinationsModule.default;
        
        console.log('Loaded destinations data:', destinationsData?.length);
        
        if (!destinationsData || !Array.isArray(destinationsData)) {
          console.error('Invalid destinations data');
          setLoading(false);
          return;
        }
        
        // Simplified approach - load destinations first, then fetch images
        const destinationsWithPlaceholders = destinationsData.map(dest => ({
          ...dest,
          image: dest.image || "/placeholder.svg"
        }));
        
        setDestinationsWithImages(destinationsWithPlaceholders);
        setLoading(false);
        
        // Fetch images in background after initial load
        console.log('🚀 Starting background image fetch for', destinationsData.length, 'destinations');
        setTimeout(async () => {
          console.log('⏰ Background image fetch timeout triggered');
          const updatedDestinations = [];
          
          for (const destination of destinationsData) {
            try {
              console.log(`🔄 Processing destination: ${destination.name} (ID: ${destination.id})`);
              const imageUrl = await fetchImageForDestination(destination.id);
              updatedDestinations.push({
                ...destination,
                image: imageUrl || destination.image || "/placeholder.svg"
              });
              console.log(`✅ Processed ${destination.name}, image: ${imageUrl ? 'found' : 'not found'}`);
            } catch (error) {
              console.error(`❌ Failed to fetch image for ${destination.id}:`, error);
              updatedDestinations.push({
                ...destination,
                image: destination.image || "/placeholder.svg"
              });
            }
          }
          
          console.log('🏁 Finished processing all destinations, updating state');
          setDestinationsWithImages(updatedDestinations);
        }, 100);
        
      } catch (error) {
        console.error('Error loading destinations:', error);
        setLoading(false);
      }
    };

    loadDestinationsWithImages();
  }, []);

  // Initialize AOS - Match home page settings
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    })
  }, [])

  // Update categories to match destinations.js structure
  const categories = ["All", "Hill Station", "Waterfall", "Temple", "Spiritual", "Wildlife", "Hill", "City"]

  const filteredDestinations = destinationsWithImages.filter((destination) => {
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
      case "Temple":
        return <Building2 className="h-4 w-4" />
      case "Hill":
        return <Mountain className="h-4 w-4" />
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
          <h1 data-aos="fade-up" data-aos-delay="200">
            Discover Jharkhand's
            <span className="text-gold block">Hidden Treasures</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="400">
            From mystical waterfalls to sacred temples, explore the diverse landscapes and rich cultural heritage of
            Jharkhand
          </p>

          {/* Search and Filter */}
          <div className="search-bar" data-aos="fade-up" data-aos-delay="600">
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

      {/* Loading State */}
      {loading && (
        <section className="destinations-grid-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Loading destinations...</p>
            </div>
          </div>
        </section>
      )}

      {/* Destinations Grid */}
      {!loading && (
      <section className="destinations-grid-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="destination-grid">
            {filteredDestinations.map((destination, index) => (
              <div 
                key={destination.id} 
                className="destination-card clickable"
                data-aos="fade-up"
                data-aos-delay={300 + (index * 100)}
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
                      {destination.highlights.slice(0, 3).map((highlight: string, index: number) => (
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
                    <Link href={`/destinations/${encodeURIComponent(destination.name)}`}>
                      <button className="btn primary">
                        Explore
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </Link>
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
      )}

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

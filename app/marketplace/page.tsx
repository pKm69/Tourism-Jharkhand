"use client"

import { useState, useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  ShoppingBag,
  Star,
  MapPin,
  Users,
  Heart,
  Search,
  ArrowRight,
  Leaf,
  Home,
  Camera,
  Utensils,
  Car,
  Palette,
  Shield,
  CheckCircle,
  Clock,
  Phone,
} from "lucide-react"

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
  }, [])

  const categories = ["All", "Handicrafts", "Homestays", "Experiences", "Food", "Transport", "Guides"]
  const locations = ["All", "Ranchi", "Deoghar", "Netarhat", "Jamshedpur", "Hazaribagh"]

  const products = [
    {
      id: 1,
      name: "Traditional Sohrai Art Painting",
      image: "/jharkhand-tribal-handicrafts-marketplace-artisans.jpg",
      price: "₹2,500",
      originalPrice: "₹3,000",
      rating: 4.8,
      reviews: 24,
      seller: "Kumari Devi",
      location: "Hazaribagh",
      category: "Handicrafts",
      description: "Authentic tribal wall art featuring traditional Sohrai patterns",
      isVerified: true,
      isFavorite: false,
      tags: ["Handmade", "Traditional", "Eco-friendly"],
    },
    {
      id: 2,
      name: "Tribal Homestay Experience",
      image: "/netarhat-hill-station-sunrise-jharkhand.jpg",
      price: "₹1,200",
      originalPrice: null,
      rating: 4.9,
      reviews: 18,
      seller: "Birsa Munda Family",
      location: "Netarhat",
      category: "Homestays",
      description: "Stay with a local tribal family and experience authentic culture",
      isVerified: true,
      isFavorite: true,
      tags: ["Cultural", "Authentic", "Family-friendly"],
    },
    {
      id: 3,
      name: "Dokra Metal Craft Workshop",
      image: "/jharkhand-landscape-forest-mountains-tribal-cultur.jpg",
      price: "₹800",
      originalPrice: null,
      rating: 4.7,
      reviews: 32,
      seller: "Raman Kumar",
      location: "Ranchi",
      category: "Experiences",
      description: "Learn the ancient art of Dokra metal casting from master artisans",
      isVerified: true,
      isFavorite: false,
      tags: ["Workshop", "Traditional", "Hands-on"],
    },
    {
      id: 4,
      name: "Organic Tribal Honey",
      image: "/deoghar-temple-spiritual-jharkhand.jpg",
      price: "₹450",
      originalPrice: "₹500",
      rating: 4.6,
      reviews: 45,
      seller: "Jharkhand Tribal Cooperative",
      location: "Deoghar",
      category: "Food",
      description: "Pure honey collected from forest beehives by tribal communities",
      isVerified: true,
      isFavorite: false,
      tags: ["Organic", "Pure", "Forest"],
    },
    {
      id: 5,
      name: "Local Guide - Wildlife Safari",
      image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
      price: "₹1,500",
      originalPrice: null,
      rating: 5.0,
      reviews: 28,
      seller: "Suresh Oraon",
      location: "Betla",
      category: "Guides",
      description: "Expert wildlife guide with 15 years experience in Betla National Park",
      isVerified: true,
      isFavorite: true,
      tags: ["Expert", "Wildlife", "Experienced"],
    },
    {
      id: 6,
      name: "Bamboo Handicraft Set",
      image: "/hazaribagh-national-park-jharkhand-wildlife-forest.jpg",
      price: "₹1,800",
      originalPrice: "₹2,200",
      rating: 4.5,
      reviews: 19,
      seller: "Santhal Craft Collective",
      location: "Jamshedpur",
      category: "Handicrafts",
      description: "Beautiful bamboo baskets and decorative items made by Santhal artisans",
      isVerified: true,
      isFavorite: false,
      tags: ["Sustainable", "Handwoven", "Traditional"],
    },
    {
      id: 7,
      name: "Traditional Jharkhand Thali",
      image: "/jamshedpur-jharkhand-steel-city-jubilee-park.jpg",
      price: "₹300",
      originalPrice: null,
      rating: 4.8,
      reviews: 67,
      seller: "Maa Durga Restaurant",
      location: "Ranchi",
      category: "Food",
      description: "Authentic tribal cuisine featuring local ingredients and recipes",
      isVerified: true,
      isFavorite: false,
      tags: ["Authentic", "Local", "Traditional"],
    },
    {
      id: 8,
      name: "Eco-friendly Transport Service",
      image: "/parasnath-hills-jharkhand-jain-temple-mountain.jpg",
      price: "₹12/km",
      originalPrice: null,
      rating: 4.4,
      reviews: 156,
      seller: "Green Wheels Jharkhand",
      location: "Ranchi",
      category: "Transport",
      description: "Electric vehicle transport service for eco-conscious travelers",
      isVerified: true,
      isFavorite: false,
      tags: ["Eco-friendly", "Electric", "Sustainable"],
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesLocation = selectedLocation === "All" || product.location === selectedLocation
    return matchesSearch && matchesCategory && matchesLocation
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Handicrafts":
        return <Palette className="h-4 w-4" />
      case "Homestays":
        return <Home className="h-4 w-4" />
      case "Experiences":
        return <Camera className="h-4 w-4" />
      case "Food":
        return <Utensils className="h-4 w-4" />
      case "Transport":
        return <Car className="h-4 w-4" />
      case "Guides":
        return <Users className="h-4 w-4" />
      default:
        return <ShoppingBag className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 data-aos="fade-up">
            Local Marketplace
            <span className="text-gold block">Supporting Communities</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Discover authentic tribal handicrafts, stay with local families, and support sustainable tourism
            initiatives
          </p>

          <div className="search-bar" data-aos="fade-up" data-aos-delay="400">
            <div className="relative" style={{width: '100%', maxWidth: '500px'}}>
              <input
                type="text"
                placeholder="Search products, experiences, or services..."
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
            <div className="filter-buttons">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => setSelectedLocation(location)}
                  className={`btn ${selectedLocation === location ? 'primary' : 'secondary'}`}
                  style={{display: 'flex', alignItems: 'center', gap: '8px'}}
                >
                  <MapPin className="h-4 w-4" />
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8" style={{
            background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.2) 0%, rgba(30, 58, 138, 0.2) 100%)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(244, 208, 63, 0.3)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }} data-aos="fade-up">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold" style={{color: '#f4d03f'}}>{filteredProducts.length} Products Found</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{color: '#f4d03f'}}>Sort by:</span>
                <select className="px-3 py-1 border rounded-md text-sm" style={{
                  background: '#f4d03f',
                  color: '#800020',
                  border: '2px solid #f4d03f',
                  borderRadius: '25px',
                  fontWeight: '600'
                }}>
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          <div className="destination-grid">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="destination-card clickable"
                data-aos="fade-up"
                data-aos-delay={200 + (index * 100)}
              >
                <div className="destination-image-container">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                  />
                  <div className="destination-badge">
                    {getCategoryIcon(product.category)}
                    {product.category}
                  </div>
                  <div className="destination-rating">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  {product.originalPrice && (
                    <div className="absolute bottom-3 left-3 bg-maroon text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      Save ₹{Number.parseInt(product.originalPrice.replace("₹", "").replace(",", "")) -
                        Number.parseInt(product.price.replace("₹", "").replace(",", ""))}
                    </div>
                  )}
                </div>

                <div className="card-info">
                  <div className="destination-header">
                    <h3>{product.name}</h3>
                    <Heart
                      className={`h-4 w-4 ${product.isFavorite ? "fill-red-500 text-red-500" : "text-gold"}`}
                    />
                  </div>
                  <p className="destination-description">{product.description}</p>

                  <div className="destination-details">
                    <div className="detail-item">
                      <MapPin className="h-4 w-4" />
                      {product.location}
                    </div>
                    <div className="detail-item">
                      <Users className="h-4 w-4" />
                      by {product.seller}
                    </div>
                    <div className="detail-item">
                      <span>({product.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="destination-highlights">
                    <p className="highlights-label">Tags:</p>
                    <div className="highlights-tags">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="highlight-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="destination-footer">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gold">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm line-through opacity-60" style={{
                          textDecoration: 'line-through',
                          textDecorationColor: '#000',
                          textDecorationThickness: '2px',
                          color: 'white'
                        }}>{product.originalPrice}</span>
                      )}
                    </div>
                    <button className="btn primary">
                      {product.category === "Guides" || product.category === "Transport" ? "Book" : "Buy"}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl mb-4" style={{color: '#800020'}}>No products found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setSelectedLocation("All")
                }}
                style={{background: 'transparent', border: '2px solid #800020', color: '#800020', borderRadius: '25px', fontWeight: '600'}}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Seller Benefits */}
      <section className="smart-tourism-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8">
            <h2 className="text-center mb-4" data-aos="fade-up">Join Our Marketplace</h2>
            <p className="subtitle text-center mb-8" data-aos="fade-up" data-aos-delay="200">Become a verified seller and reach thousands of travelers looking for authentic experiences</p>
            
            {/* Dynamic Feature Content */}
            <div className="p-6 rounded-lg" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(244, 208, 63, 0.2)',
              color: 'white'
            }} data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-start gap-4 mb-6">
                <div className="feature-icon" style={{padding: '12px', borderRadius: '12px'}}><Shield className="h-12 w-12" /></div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gold mb-2 text-left">Trust & Safety Guaranteed</h3>
                  <p className="text-white text-left">Shop with confidence knowing that every transaction is secured by blockchain technology and every seller is verified</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3" data-aos="fade-up" data-aos-delay="500">
                  <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-gold" />
                  <span className="text-white">Blockchain-secured transactions</span>
                </div>
                <div className="flex items-start gap-3" data-aos="fade-up" data-aos-delay="600">
                  <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-gold" />
                  <span className="text-white">Verified seller certifications</span>
                </div>
                <div className="flex items-start gap-3" data-aos="fade-up" data-aos-delay="700">
                  <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-gold" />
                  <span className="text-white">24/7 customer support</span>
                </div>
                <div className="flex items-start gap-3" data-aos="fade-up" data-aos-delay="800">
                  <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-gold" />
                  <span className="text-white">Money-back guarantee</span>
                </div>
              </div>

              <button className="btn primary" data-aos="fade-up" data-aos-delay="900">
                Become a Seller
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}

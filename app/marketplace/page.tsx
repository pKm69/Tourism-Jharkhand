"use client"

import { useState } from "react"
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
      image: "/placeholder.svg?height=300&width=400&text=Tribal+Homestay",
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
      image: "/placeholder.svg?height=300&width=400&text=Dokra+Workshop",
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
      image: "/placeholder.svg?height=300&width=400&text=Tribal+Honey",
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
      image: "/placeholder.svg?height=300&width=400&text=Wildlife+Guide",
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
      image: "/placeholder.svg?height=300&width=400&text=Bamboo+Crafts",
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
      image: "/placeholder.svg?height=300&width=400&text=Jharkhand+Thali",
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
      image: "/placeholder.svg?height=300&width=400&text=Eco+Transport",
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
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Local Marketplace
              <span className="text-primary block">Supporting Communities</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover authentic tribal handicrafts, stay with local families, and support sustainable tourism
              initiatives
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search products, experiences, or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border rounded-md bg-background"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-2 border rounded-md bg-background"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                {getCategoryIcon(category)}
                <span className="text-xs">{category}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">{filteredProducts.length} Products Found</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="px-3 py-1 border rounded-md bg-background text-sm">
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-primary/90 flex items-center gap-1">
                      {getCategoryIcon(product.category)}
                      {product.category}
                    </Badge>
                    {product.isVerified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-background/90 rounded-full hover:bg-background transition-colors">
                    <Heart
                      className={`h-4 w-4 ${product.isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                    />
                  </button>
                  {product.originalPrice && (
                    <Badge className="absolute bottom-3 left-3 bg-red-500">
                      Save ₹
                      {Number.parseInt(product.originalPrice.replace("₹", "").replace(",", "")) -
                        Number.parseInt(product.price.replace("₹", "").replace(",", ""))}
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{product.location}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">by {product.seller}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="group">
                      {product.category === "Guides" || product.category === "Transport" ? "Book" : "Buy"}
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No products found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setSelectedLocation("All")
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Seller Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Join Our Marketplace</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Become a verified seller and reach thousands of travelers looking for authentic experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Verified Sellers</h3>
              <p className="text-muted-foreground">
                Get verified through our blockchain-based certification system for increased trust and visibility
              </p>
            </Card>
            <Card className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Direct Connection</h3>
              <p className="text-muted-foreground">
                Connect directly with travelers and tourists without intermediaries, keeping more of your earnings
              </p>
            </Card>
            <Card className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Sustainable Impact</h3>
              <p className="text-muted-foreground">
                Contribute to sustainable tourism and community development while preserving local culture
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="group">
              Become a Seller
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                Trust & Safety Guaranteed
              </h2>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Shop with confidence knowing that every transaction is secured by blockchain technology and every seller
                is verified
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-foreground">Blockchain-secured transactions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-foreground">Verified seller certifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-foreground">24/7 customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Phone className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-foreground">Money-back guarantee</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/jharkhand-tribal-handicrafts-marketplace-artisans.jpg"
                alt="Trust and safety"
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

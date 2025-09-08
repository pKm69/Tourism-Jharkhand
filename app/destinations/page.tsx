"use client"

import { useState } from "react"
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
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Discover Jharkhand's
              <span className="text-primary block">Hidden Treasures</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              From mystical waterfalls to sacred temples, explore the diverse landscapes and rich cultural heritage of
              Jharkhand
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="flex items-center gap-2"
                  >
                    {getCategoryIcon(category)}
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <Card key={destination.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary/90 flex items-center gap-1">
                    {getCategoryIcon(destination.category)}
                    {destination.category}
                  </Badge>
                  <div className="absolute top-3 right-3 bg-background/90 rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {destination.name}
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-base">{destination.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {destination.duration}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {destination.bestTime}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Thermometer className="h-4 w-4" />
                      {destination.temperature}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Top Highlights:</p>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {destination.highlights.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{destination.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{destination.distance}</span>
                    <Button size="sm" className="group">
                      Explore
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No destinations found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Planning Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Plan Your Perfect Trip</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Let our AI-powered platform create a personalized itinerary based on your preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Personalized Recommendations</h3>
              <p className="text-muted-foreground">
                Get destination suggestions based on your interests and travel style
              </p>
            </Card>
            <Card className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Smart Itinerary Planning</h3>
              <p className="text-muted-foreground">AI-powered trip planning with optimal routes and timing</p>
            </Card>
            <Card className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Local Experiences</h3>
              <p className="text-muted-foreground">Connect with local guides and authentic cultural experiences</p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/ai-features">
                Start Planning with AI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  Star,
  MapPin,
  Users,
  Heart,
  Share2,
  ShoppingCart,
  Calendar,
  Clock,
  Shield,
  Truck,
  RotateCcw,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Smartphone,
  Wallet,
  ArrowLeft,
  Plus,
  Minus,
  ImageIcon,
  Play
} from "lucide-react"

interface Product {
  id: number
  name: string
  images: string[]
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  sellerId: string
  seller: string
  location: string
  category: string
  description: string
  longDescription: string
  isVerified: boolean
  tags: string[]
  stock: number
  dimensions?: string
  materials?: string[]
  craftingTime?: string
  shippingTime?: string
  returnPolicy?: string
  amenities?: string[]
  maxGuests?: number
  checkInTime?: string
  checkOutTime?: string
  cancellationPolicy?: string
  duration?: string
  groupSize?: string
  includes?: string[]
  skillLevel?: string
  languages?: string[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [guestCount, setGuestCount] = useState(1)
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    specialRequests: ""
  })
  const [paymentMethod, setPaymentMethod] = useState("UPI")

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      // In a real app, fetch from your backend: `/api/products/${id}`
      // For now, use the dataset you provided (expanded to match Product interface)
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Traditional Sohrai Art Painting",
          images: [
            "/jharkhand-tribal-handicrafts-marketplace-artisans.jpg",
            "/sohrai-art-detail.jpg",
            "/sohrai-art-process.jpg",
            "/sohrai-art-artist.jpg"
          ],
          price: 2500,
          originalPrice: 3000,
          rating: 4.8,
          reviews: 24,
          sellerId: "seller_1",
          seller: "Kumari Devi",
          location: "Hazaribagh",
          category: "Handicrafts",
          description: "Authentic tribal wall art featuring traditional Sohrai patterns",
          longDescription: "Hand-painted Sohrai art using natural pigments and traditional motifs celebrating harvest and nature.",
          isVerified: true,
          tags: ["Handmade", "Traditional", "Eco-friendly"],
          stock: 5,
          dimensions: "24x18 inches",
          materials: ["Natural pigments", "Canvas", "Bamboo frame"],
          craftingTime: "7-10 days",
          shippingTime: "3-5 days",
          returnPolicy: "30 days return policy"
        },
        {
          id: 2,
          name: "Tribal Homestay Experience",
          images: ["/netarhat-hill-station-sunrise-jharkhand.jpg"],
          price: 1200,
          rating: 4.9,
          reviews: 18,
          sellerId: "seller_homestay_1",
          seller: "Birsa Munda Family",
          location: "Netarhat",
          category: "Homestays",
          description: "Stay with a local tribal family and experience authentic culture",
          longDescription: "Immersive stay including traditional meals, folklore evenings, and guided walks in the serene hills of Netarhat.",
          isVerified: true,
          tags: ["Cultural", "Authentic", "Family-friendly"],
          stock: 20,
          amenities: ["Meals", "Guided Walks", "Cultural Evenings"],
          maxGuests: 6,
          checkInTime: "12:00",
          checkOutTime: "11:00",
          cancellationPolicy: "Free cancellation up to 48h prior",
          returnPolicy: "N/A"
        },
        {
          id: 3,
          name: "Dokra Metal Craft Workshop",
          images: ["/jharkhand-landscape-forest-mountains-tribal-cultur.jpg"],
          price: 800,
          rating: 4.7,
          reviews: 32,
          sellerId: "seller_workshop_1",
          seller: "Raman Kumar",
          location: "Ranchi",
          category: "Experiences",
          description: "Learn the ancient art of Dokra metal casting from master artisans",
          longDescription: "Hands-on session covering each stage of the lost-wax Dokra technique with a keepsake souvenir.",
          isVerified: true,
          tags: ["Workshop", "Traditional", "Hands-on"],
          stock: 12,
          duration: "3 hours",
          groupSize: "Up to 8",
          includes: ["Materials", "Safety Gear", "Refreshments"],
          skillLevel: "Beginner",
          languages: ["Hindi", "English"],
          returnPolicy: "Non-refundable"
        },
        {
          id: 4,
          name: "Organic Tribal Honey",
          images: ["/deoghar-temple-spiritual-jharkhand.jpg"],
          price: 450,
          originalPrice: 500,
          rating: 4.6,
          reviews: 45,
          sellerId: "seller_food_1",
          seller: "Jharkhand Tribal Cooperative",
          location: "Deoghar",
          category: "Food",
          description: "Pure honey collected from forest beehives by tribal communities",
          longDescription: "Raw, unprocessed honey rich in regional floral notes, sustainably harvested from forest edges.",
          isVerified: true,
          tags: ["Organic", "Pure", "Forest"],
          stock: 50,
          returnPolicy: "7 day replacement for damage"
        },
        {
          id: 5,
          name: "Local Guide - Wildlife Safari",
          images: ["/betla-national-park-wildlife-tigers-jharkhand.jpg"],
          price: 1500,
            rating: 5.0,
          reviews: 28,
          sellerId: "seller_guide_1",
          seller: "Suresh Oraon",
          location: "Betla",
          category: "Guides",
          description: "Expert wildlife guide with 15 years experience in Betla National Park",
          longDescription: "Personalized safari experience focusing on ecology, conservation, and safe wildlife observation.",
          isVerified: true,
          tags: ["Expert", "Wildlife", "Experienced"],
          stock: 10,
          duration: "Half Day",
          groupSize: "Up to 5",
          languages: ["Hindi", "English"],
          returnPolicy: "Non-refundable"
        },
        {
          id: 6,
          name: "Bamboo Handicraft Set",
          images: ["/hazaribagh-national-park-jharkhand-wildlife-forest.jpg"],
          price: 1800,
          originalPrice: 2200,
          rating: 4.5,
          reviews: 19,
          sellerId: "seller_handicraft_2",
          seller: "Santhal Craft Collective",
          location: "Jamshedpur",
          category: "Handicrafts",
          description: "Beautiful bamboo baskets and decorative items made by Santhal artisans",
          longDescription: "Curated set of handwoven bamboo crafts supporting sustainable livelihoods and traditional techniques.",
          isVerified: true,
          tags: ["Sustainable", "Handwoven", "Traditional"],
          stock: 25,
          materials: ["Bamboo", "Natural Dyes"],
          craftingTime: "5 days",
          shippingTime: "4-6 days",
          returnPolicy: "15 days return policy"
        },
        {
          id: 7,
          name: "Traditional Jharkhand Thali",
          images: ["/jamshedpur-jharkhand-steel-city-jubilee-park.jpg"],
          price: 300,
          rating: 4.8,
          reviews: 67,
          sellerId: "seller_food_2",
          seller: "Maa Durga Restaurant",
          location: "Ranchi",
          category: "Food",
          description: "Authentic tribal cuisine featuring local ingredients and recipes",
          longDescription: "Full thali highlighting seasonal indigenous grains and traditional cooking methods.",
          isVerified: true,
          tags: ["Authentic", "Local", "Traditional"],
          stock: 100,
          returnPolicy: "Not applicable"
        },
        {
          id: 8,
          name: "Eco-friendly Transport Service",
          images: ["/parasnath-hills-jharkhand-jain-temple-mountain.jpg"],
          price: 12, // per km
          rating: 4.4,
          reviews: 156,
          sellerId: "seller_transport_1",
          seller: "Green Wheels Jharkhand",
          location: "Ranchi",
          category: "Transport",
          description: "Electric vehicle transport service for eco-conscious travelers",
          longDescription: "On-demand EV transport. Displayed price represents per-kilometer base rate (final total distance-based).",
          isVerified: true,
          tags: ["Eco-friendly", "Electric", "Sustainable"],
          stock: 999,
          returnPolicy: "Usage-based; no returns"
        }
      ]

      const rawId = Array.isArray(params.id) ? params.id[0] : params.id
      const numericId = Number(rawId)
      const found = !isNaN(numericId) ? mockProducts.find(p => p.id === numericId) : undefined

      setProduct(found || null)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch product:', error)
      setLoading(false)
    }
  }

  // Razorpay payment integration
  const startRazorpay = async () => {
    if (!product) return
    const qty = product.category === "Homestays" ? guestCount : quantity
    if ((product.category === "Homestays" || product.category === "Experiences") && !selectedDate) {
      alert("Please select a date before proceeding.")
      return
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          qty,
          amount: product.price * qty
        })
      })
      if (!res.ok) {
        alert("Failed to initiate payment.")
        return
      }
      const data = await res.json()

      // @ts-ignore
      if (!window.Razorpay) {
        alert("Payment SDK not loaded. Please retry in a moment.")
        return
      }

      // @ts-ignore
      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Marketplace",
        description: product.name,
        order_id: data.razorpayOrderId,
        prefill: {
          name: customerInfo.name || "Guest",
          email: customerInfo.email || "guest@example.com",
          contact: customerInfo.phone || "9999999999"
        },
        notes: { localOrderId: data.orderId },
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          })
          if (verifyRes.ok) {
            setIsBookingDialogOpen(false)
            window.location.href = `/order/${data.orderId}/confirmation`
          } else {
            alert("Payment verification failed.")
          }
        },
        theme: { color: "#dc2626" }
      })

      rzp.on("payment.failed", function () {
        alert("Payment failed. Please try again.")
      })

      rzp.open()
    } catch (err) {
      console.error("Razorpay init error", err)
      alert("Unexpected error starting payment.")
    }
  }

  // Replace previous mock order placement with real payment flow
  const handleBooking = async () => {
    await startRazorpay()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = product.price * (product.category === "Homestays" ? guestCount : quantity)
  const savings = product.originalPrice ? (product.originalPrice - product.price) * (product.category === "Homestays" ? guestCount : quantity) : 0

  return (
    <div className="min-h-screen bg-background">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link href="/marketplace" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Marketplace
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-4 right-4"
              >
                <Play className="h-4 w-4 mr-1" />
                360° View
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/10 text-primary">{product.category}</Badge>
                {product.isVerified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{product.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Link href={`/marketplace/vendor/${product.sellerId}`} className="text-primary hover:underline">
                  {product.seller}
                </Link>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
                {savings > 0 && (
                  <Badge className="bg-red-500">Save ₹{savings.toLocaleString()}</Badge>
                )}
              </div>

              {/* Quantity/Guest Selection */}
              {product.category === "Homestays" ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        disabled={guestCount <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{guestCount}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setGuestCount(Math.min(product.maxGuests || 10, guestCount + 1))}
                        disabled={guestCount >= (product.maxGuests || 10)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {product.maxGuests && (
                      <p className="text-sm text-muted-foreground mt-1">Maximum {product.maxGuests} guests</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="date">Check-in Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                  </div>
                </div>
              ) : product.category === "Experiences" ? (
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{product.stock} items available</p>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold text-primary">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {product.category === "Homestays" || product.category === "Experiences" ? "Book Now" : "Buy Now"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Complete Your Order</DialogTitle>
                    <DialogDescription>
                      Please provide your details to complete the {product.category === "Homestays" || product.category === "Experiences" ? "booking" : "purchase"}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {product.category !== "Experiences" && (
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                          placeholder="Enter your address"
                          rows={3}
                        />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="requests">Special Requests (Optional)</Label>
                      <Textarea
                        id="requests"
                        value={customerInfo.specialRequests}
                        onChange={(e) => setCustomerInfo({...customerInfo, specialRequests: e.target.value})}
                        placeholder="Any special requests or notes"
                        rows={2}
                      />
                    </div>
                    
                    {/* Payment Method */}
                    <div>
                      <Label>Payment Method</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <Button
                          variant={paymentMethod === "UPI" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPaymentMethod("UPI")}
                          className="flex items-center gap-1"
                        >
                          <Smartphone className="h-4 w-4" />
                          UPI
                        </Button>
                        <Button
                          variant={paymentMethod === "Card" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPaymentMethod("Card")}
                          className="flex items-center gap-1"
                        >
                          <CreditCard className="h-4 w-4" />
                          Card
                        </Button>
                        <Button
                          variant={paymentMethod === "Wallet" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPaymentMethod("Wallet")}
                          className="flex items-center gap-1"
                        >
                          <Wallet className="h-4 w-4" />
                          Wallet
                        </Button>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>Subtotal:</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                      {product.category !== "Experiences" && (
                        <div className="flex justify-between items-center mb-2">
                          <span>Shipping:</span>
                          <span>Free</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center font-bold text-lg pt-2 border-t">
                        <span>Total:</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button onClick={handleBooking} className="w-full">
                      Confirm Order
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="flex gap-2">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="lg" className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Seller
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Secure Payment</p>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Fast Delivery</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="seller">Seller Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This {product.category.slice(0, -1)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {product.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.dimensions && (
                      <div>
                        <h4 className="font-medium mb-2">Dimensions</h4>
                        <p className="text-muted-foreground">{product.dimensions}</p>
                      </div>
                    )}
                    {product.materials && (
                      <div>
                        <h4 className="font-medium mb-2">Materials</h4>
                        <ul className="text-muted-foreground">
                          {product.materials.map((material, index) => (
                            <li key={index}>• {material}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.craftingTime && (
                      <div>
                        <h4 className="font-medium mb-2">Crafting Time</h4>
                        <p className="text-muted-foreground">{product.craftingTime}</p>
                      </div>
                    )}
                    {product.shippingTime && (
                      <div>
                        <h4 className="font-medium mb-2">Shipping Time</h4>
                        <p className="text-muted-foreground">{product.shippingTime}</p>
                      </div>
                    )}
                    {product.amenities && (
                      <div>
                        <h4 className="font-medium mb-2">Amenities</h4>
                        <ul className="text-muted-foreground">
                          {product.amenities.map((amenity, index) => (
                            <li key={index}>• {amenity}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.includes && (
                      <div>
                        <h4 className="font-medium mb-2">Includes</h4>
                        <ul className="text-muted-foreground">
                          {product.includes.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>{product.reviews} reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock reviews */}
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-current text-yellow-500" />
                          ))}
                        </div>
                        <span className="font-medium">Rajesh Kumar</span>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-muted-foreground">
                        Beautiful artwork! The quality is exceptional and the traditional patterns are stunning. 
                        Delivery was prompt and packaging was excellent.
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1,2,3,4].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-current text-yellow-500" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-medium">Priya Sharma</span>
                        <span className="text-sm text-muted-foreground">1 week ago</span>
                      </div>
                      <p className="text-muted-foreground">
                        Authentic tribal art piece. Love supporting local artisans. The colors are vibrant and the craftsmanship is excellent.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seller" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seller Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.seller}</h3>
                      <p className="text-muted-foreground mb-2">{product.location}</p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          <span>{product.rating} rating</span>
                        </div>
                        <span className="text-muted-foreground">{product.reviews} reviews</span>
                        {product.isVerified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified Seller
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Master artisan specializing in traditional Sohrai and Khovar wall paintings. 
                        Third-generation artist preserving ancient tribal art forms.
                      </p>
                      <Button variant="outline" asChild>
                        <Link href={`/marketplace/vendor/${product.sellerId}`}>
                          View Seller Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}

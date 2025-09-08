"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
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
      // Mock product data - in production, this would fetch from the API
      const mockProduct: Product = {
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
        description: "Authentic tribal wall art featuring traditional Sohrai patterns passed down through generations",
        longDescription: "This beautiful Sohrai art painting represents centuries of tribal tradition from Hazaribagh. Each piece is hand-painted using natural pigments and traditional techniques that have been preserved by the Kurmi and Santhal communities. The intricate patterns tell stories of harvest festivals and nature worship, making each artwork a unique cultural artifact.",
        isVerified: true,
        tags: ["Handmade", "Traditional", "Eco-friendly"],
        stock: 5,
        dimensions: "24x18 inches",
        materials: ["Natural pigments", "Canvas", "Bamboo frame"],
        craftingTime: "7-10 days",
        shippingTime: "3-5 days",
        returnPolicy: "30 days return policy"
      }
      setProduct(mockProduct)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch product:', error)
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    try {
      const orderData = {
        productId: product?.id,
        vendorId: product?.sellerId,
        quantity: product?.category === "Homestays" ? guestCount : quantity,
        totalAmount: (product?.price || 0) * (product?.category === "Homestays" ? guestCount : quantity),
        paymentMethod,
        customerInfo,
        bookingDate: selectedDate,
        orderType: product?.category === "Homestays" || product?.category === "Experiences" ? "booking" : "purchase"
      }

      // Mock API call - in production, this would call the actual API
      console.log('Creating order:', orderData)
      
      // Simulate API response
      setTimeout(() => {
        alert(`Order placed successfully! Order ID: ORD_${Math.random().toString(36).substr(2, 9).toUpperCase()}`)
        setIsBookingDialogOpen(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to place order:', error)
      alert('Failed to place order. Please try again.')
    }
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

"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import {
  Star,
  MapPin,
  Users,
  ArrowLeft,
  ShoppingCart,
  Heart,
  Plus,
  Minus
} from "lucide-react"

interface Product {
  id: number
  name: string
  image: string
  price: number
  rating: number
  reviews: number
  seller: string
  location: string
  category: string
  description: string
  priceUnit?: string
}

export default function SimpleProductPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    console.log('Product page loaded with ID:', params.id)
    fetchProduct()
  }, [params.id])

  // Authentication check effect
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      console.log('User not authenticated on product page, redirecting to login')
      // Store the current page for redirect after login
      localStorage.setItem('redirectAfterLogin', window.location.pathname)
      router.push('/auth')
    }
  }, [authLoading, isAuthenticated, router])

  const fetchProduct = async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Traditional Sohrai Art Painting",
        image: "/mp/one.jpg",
        price: 2500,
        rating: 4.8,
        reviews: 24,
        seller: "Kumari Devi",
        location: "Hazaribagh",
        category: "Handicrafts",
        description: "Authentic tribal wall art featuring traditional Sohrai patterns"
      },
      {
        id: 2,
        name: "Tribal Homestay Experience",
        image: "/mp/two.jpg",
        price: 1200,
        rating: 4.9,
        reviews: 18,
        seller: "Birsa Munda Family",
        location: "Netarhat",
        category: "Homestays",
        description: "Stay with a local tribal family and experience authentic culture",
        priceUnit: "per night"
      },
      {
        id: 3,
        name: "Dokra Metal Craft Workshop",
        image: "/mp/three.jpg",
        price: 800,
        rating: 4.7,
        reviews: 32,
        seller: "Raman Kumar",
        location: "Ranchi",
        category: "Experiences",
        description: "Learn the ancient art of Dokra metal casting from master artisans"
      },
      {
        id: 4,
        name: "Organic Tribal Honey",
        image: "/mp/four.jpg",
        price: 450,
        rating: 4.6,
        reviews: 45,
        seller: "Jharkhand Tribal Cooperative",
        location: "Deoghar",
        category: "Food",
        description: "Pure honey collected from forest beehives by tribal communities",
      },
      {
        id: 5,
        name: "Local Guide - Wildlife Safari",
        image: "/mp/five.jpg",
        price: 1500,
        rating: 5.0,
        reviews: 28,
        seller: "Suresh Oraon",
        location: "Betla",
        category: "Guides",
        description: "Expert wildlife guide with 15 years experience in Betla National Park",
      },
      {
        id: 6,
        name: "Bamboo Handicraft Set",
        image: "/mp/six.jpg",
        price: 1800,
        rating: 4.5,
        reviews: 19,
        seller: "Santhal Craft Collective",
        location: "Jamshedpur",
        category: "Handicrafts",
        description: "Beautiful bamboo baskets and decorative items made by Santhal artisans",
      },
      {
        id: 7,
        name: "Traditional Jharkhand Thali",
        image: "/mp/seven.jpg",
        price: 300,
        rating: 4.8,
        reviews: 67,
        seller: "Maa Durga Restaurant",
        location: "Ranchi",
        category: "Food",
        description: "Authentic tribal cuisine featuring local ingredients and recipes",
      },
      {
        id: 8,
        name: "Eco-friendly Transport Service",
        image: "/mp/eight.webp",
        price: 12,
        rating: 4.4,
        reviews: 156,
        seller: "Green Wheels Jharkhand",
        location: "Ranchi",
        category: "Transport",
        description: "Electric vehicle transport service for eco-conscious travelers",
      },
      {
        id: 9,
        name: "Jharkhand Terracotta Handicrafts",
        image: "/mp/nine.webp",
        price: 2000,
        rating: 4.7,
        reviews: 234,
        seller: "Tribal Artisans Collective",
        location: "Bastar, Jharkhand",
        category: "Handicrafts",
        description: "Beautifully handcrafted terracotta items made by skilled tribal artisans of Jharkhand, perfect for home décor and gifting.",
      }, 
    ]

    const rawId = Array.isArray(params.id) ? params.id[0] : params.id
    const numericId = Number(rawId)
    const found = mockProducts.find(p => p.id === numericId)

    setProduct(found || null)
    setLoading(false)
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1)
  }

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev)
    // Placeholder - would integrate with backend
    console.log('Favorite toggled:', !isFavorite)
  }

  const addToCart = () => {
    // Placeholder - would integrate with cart system
    console.log('Added to cart:', { product: product?.name, quantity })
    alert(`Added ${quantity} item(s) to cart!`)
  }

  const handlePayment = () => {
    if (!product) return

    // Double-check authentication before payment
    if (!isAuthenticated || !user) {
      console.log('User not authenticated, redirecting to login')
      localStorage.setItem('redirectAfterLogin', window.location.pathname)
      router.push('/auth')
      return
    }

    console.log('Payment button clicked for:', product.name, 'Quantity:', quantity)
    console.log('Authenticated user:', user)

    // @ts-ignore
    if (!window.Razorpay) {
      alert("Payment system loading... Please try again in a moment.")
      return
    }

    const totalAmount = product.price * quantity

    const options = {
      key: "rzp_test_RHyPcUurH7IKdz",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Jharkhand Tourism",
      description: product.name,
      image: "/Full.ico",
      handler: async function (response: any) {
        console.log('Payment successful:', response)
        
        try {
          // Record payment on blockchain
          console.log('🔗 Recording payment on blockchain...')
          
          const blockchainPayload = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id || 'ORDER_' + Date.now(),
            razorpaySignature: response.razorpay_signature,
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            quantity: quantity,
            userName: user.name,
            userEmail: user.email,
            userMobile: user.phone || "Not provided",
            userId: user._id
          }

          const blockchainResponse = await fetch('http://localhost:5000/api/payment/process', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(blockchainPayload)
          })

          const blockchainResult = await blockchainResponse.json()

          if (blockchainResult.success) {
            console.log('✅ Payment recorded on blockchain!')
            console.log('🔗 Blockchain Hash:', blockchainResult.blockchainHash)
            console.log('📦 Transaction Hash:', blockchainResult.transactionHash)
            
            alert(`Payment successful! 
Payment ID: ${response.razorpay_payment_id}
Blockchain Hash: ${blockchainResult.blockchainHash}
Your payment is now secured on blockchain!`)
            
            window.location.href = `/order/success?payment_id=${response.razorpay_payment_id}&blockchain_hash=${blockchainResult.blockchainHash}`
          } else {
            console.warn('⚠️ Blockchain recording failed:', blockchainResult.error)
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}
Note: Blockchain recording failed, but your payment is confirmed.`)
            window.location.href = `/order/success?payment_id=${response.razorpay_payment_id}`
          }
        } catch (error) {
          console.error('❌ Blockchain integration error:', error)
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}
Note: Blockchain recording failed, but your payment is confirmed.`)
          window.location.href = `/order/success?payment_id=${response.razorpay_payment_id}`
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone || ""
      },
      notes: {
        product_id: product.id,
        product_name: product.name,
        quantity: quantity
      },
      theme: {
        color: "#800020"
      }
    }

    console.log('Opening Razorpay with options:', options)

    // @ts-ignore
    const rzp = new window.Razorpay(options)
    
    rzp.on('payment.failed', function (response: any) {
      console.log('Payment failed:', response)
      alert(`Payment failed: ${response.error.description}`)
    })

    rzp.open()
  }

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse text-center">
            {authLoading ? "Checking authentication..." : "Loading product..."}
          </div>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render the product page content
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="mb-4">Please log in to view this product.</p>
          <Link href="/auth">
            <Button>Login</Button>
          </Link>
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

  return (
    <div className="min-h-screen bg-background">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link href="/marketplace" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
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
                <span className="text-primary">{product.seller}</span>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">
                  {product.priceUnit || (() => {
                    switch (product.category) {
                      case "Transport":
                        return "per km";
                      case "Homestays":
                        return "per night";
                      case "Guides":
                        return "per day";
                      case "Experiences":
                        return "per session";
                      case "Food":
                        return "per plate";
                      case "Handicrafts":
                        return "per item";
                      default:
                        return "per item";
                    }
                  })()}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-lg font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decreaseQuantity}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium min-w-[2rem] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={increaseQuantity}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold text-primary">₹{(product.price * quantity).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Action Buttons Row */}
              <div className="flex gap-3 mb-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleFavorite}
                  className={`flex-1 ${isFavorite ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                >
                  <Heart className={`mr-2 h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={addToCart}
                  className="flex-1"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              {/* Pay Now Button */}
              <Button 
                size="lg" 
                className="w-full"
                onClick={handlePayment}
                style={{
                  backgroundColor: '#800020',
                  color: 'white',
                  fontSize: '18px',
                  padding: '16px'
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Pay Now - ₹{(product.price * quantity).toLocaleString()}
              </Button>
              
              <p className="text-sm text-center text-muted-foreground">
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
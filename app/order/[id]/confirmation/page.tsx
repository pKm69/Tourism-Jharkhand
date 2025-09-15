"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  CheckCircle,
  Download,
  Share2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Star,
  Package,
  Truck,
  Clock
} from "lucide-react"

interface OrderDetails {
  id: string
  productId: number
  title: string
  amount: number
  currency: string
  qty: number
  status: string
  paymentId?: string
  createdAt: number
  estimatedDelivery?: string
  trackingNumber?: string
}

export default function OrderConfirmationPage() {
  const params = useParams()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrderDetails()
  }, [params.id])

  const fetchOrderDetails = async () => {
    try {
      // Mock order details - in a real app, fetch from your backend
      const mockOrder: OrderDetails = {
        id: Array.isArray(params.id) ? params.id[0] : params.id || "unknown",
        productId: 1,
        title: "Traditional Sohrai Art Painting",
        amount: 250000, // in paise
        currency: "INR",
        qty: 1,
        status: "paid",
        paymentId: "pay_" + Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        trackingNumber: "TRK" + Math.random().toString(36).substr(2, 8).toUpperCase()
      }
      
      setOrder(mockOrder)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch order details:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-muted rounded w-1/4 mx-auto mb-8"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link href="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Details
                </CardTitle>
                <CardDescription>Order #{order.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{order.title}</h3>
                    <p className="text-sm text-muted-foreground">Quantity: {order.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(order.amount / 100).toLocaleString()}</p>
                    <Badge className="bg-green-100 text-green-800">
                      {order.status === 'paid' ? 'Paid' : order.status}
                    </Badge>
                  </div>
                </div>

                {order.paymentId && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Payment ID: <span className="font-mono">{order.paymentId}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">{order.estimatedDelivery}</p>
                  </div>
                </div>
                
                {order.trackingNumber && (
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Tracking Number</p>
                      <p className="text-sm text-muted-foreground font-mono">{order.trackingNumber}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Truck className="mr-2 h-4 w-4" />
                    Track Your Order
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-sm text-muted-foreground">
                      Your order is being prepared by the seller
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      We'll send you tracking details once shipped
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Your order will be delivered to your address
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Order
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>support@jharkhandtourism.com</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rate Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-400 cursor-pointer hover:fill-current"
                    />
                  ))}
                </div>
                <Button size="sm" className="w-full">
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/marketplace">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/profile">
            <Button>
              View All Orders
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

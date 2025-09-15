"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  CheckCircle,
  ArrowLeft,
  Download,
  Share2
} from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentId, setPaymentId] = useState("")

  useEffect(() => {
    const id = searchParams.get('payment_id')
    if (id) {
      setPaymentId(id)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">Payment Successful!</h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>

          {paymentId && (
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground">Payment ID:</p>
              <p className="font-mono text-sm font-medium">{paymentId}</p>
            </div>
          )}

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/marketplace">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Receipt
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

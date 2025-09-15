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
  Share2,
  Shield,
  Link as LinkIcon
} from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentId, setPaymentId] = useState("")
  const [blockchainHash, setBlockchainHash] = useState("")

  useEffect(() => {
    const id = searchParams.get('payment_id')
    const hash = searchParams.get('blockchain_hash')
    if (id) {
      setPaymentId(id)
    }
    if (hash) {
      setBlockchainHash(hash)
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

          <div className="space-y-4 mb-6">
            {paymentId && (
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Payment ID:</p>
                <p className="font-mono text-sm font-medium break-all">{paymentId}</p>
              </div>
            )}

            {blockchainHash && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-800">Blockchain Secured</p>
                </div>
                <p className="text-xs text-blue-600 mb-1">Blockchain Hash:</p>
                <p className="font-mono text-xs font-medium text-blue-800 break-all">{blockchainHash}</p>
                <p className="text-xs text-blue-600 mt-2">
                  Your payment data is permanently recorded on our private blockchain for security and verification.
                </p>
              </div>
            )}
          </div>

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

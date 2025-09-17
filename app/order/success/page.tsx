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
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.05) 0%, rgba(30, 58, 138, 0.05) 100%)'
    }}>
      <Navigation />

      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-lg mx-auto" style={{
          background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.15) 0%, rgba(30, 58, 138, 0.15) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(244, 208, 63, 0.4)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(128, 0, 32, 0.3), 0 16px 64px rgba(30, 58, 138, 0.2)'
        }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{
            background: 'linear-gradient(135deg, #f4d03f 0%, #d4af37 100%)',
            border: '3px solid #f4d03f',
            boxShadow: '0 8px 25px rgba(244, 208, 63, 0.4)',
            height: '50px',
          }}>
            <CheckCircle className="h-10 w-10" style={{ color: '#800020',height: '50px',width: '50px' }} />
          </div>
          
          <h1 className="text-4xl font-bold mb-4" style={{
            color: '#f4d03f',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            fontWeight: '800'
          }}>🎉 Payment Successful!</h1>
          
          <p className="text-lg mb-6" style={{
            color: 'white',
            fontSize: '1.2rem',
            lineHeight: '1.6'
          }}>
            Thank you for your purchase! Your payment has been processed successfully and secured on our blockchain.
          </p>

          <div className="space-y-4 mb-6">
            {paymentId && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(244, 208, 63, 0.1) 0%, rgba(244, 208, 63, 0.2) 100%)',
                border: '1px solid rgba(244, 208, 63, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                backdropFilter: 'blur(10px)'
              }}>
                <p className="text-sm mb-2" style={{ color: '#f4d03f', fontWeight: '600' ,fontSize: '2rem'}}> 💳 Payment ID:</p>
                <p className="font-mono text-sm font-medium break-all" style={{ color: 'white',fontSize: '1rem' }}>{paymentId}</p>
              </div>
            )}

            {blockchainHash && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.1) 0%, rgba(128, 0, 32, 0.2) 100%)',
                border: '2px solid rgba(244, 208, 63, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px rgba(128, 0, 32, 0.2)'
              }}>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm font-bold" style={{ color: '#f4d03f', fontSize: '2rem' }}>🔒 Blockchain Secured</p>
                </div>
                <p className="text-xs mb-2" style={{ color: '#f4d03f', fontWeight: '600',fontSize: '2rem' }}>Blockchain Hash:</p>
                <p className="font-mono text-xs font-medium break-all mb-3" style={{ 
                  color: 'white',
                  background: 'rgba(0, 0, 0, 0.2)',
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(244, 208, 63, 0.2)',
                  fontSize: '1rem'
                }}>{blockchainHash}</p>
                <p className="text-xs" style={{ color: 'white', lineHeight: '1.4' }}>
                  ✅ Your payment data is permanently recorded on our private blockchain for ultimate security and verification.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full" style={{
              background: 'linear-gradient(135deg, #f4d03f 0%, #d4af37 100%)',
              border: '2px solid #f4d03f',
              color: '#800020',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1.1rem',
              padding: '16px 24px',
              boxShadow: '0 6px 20px rgba(244, 208, 63, 0.4)',
              transition: 'all 0.3s ease'
            }}>
              <Link href="/marketplace">
                <ArrowLeft className="mr-2 h-5 w-5" style={{ color: '#800020' }} />
                Continue Shopping
              </Link>
            </Button>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" style={{
                background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.1) 0%, rgba(128, 0, 32, 0.2) 100%)',
                border: '2px solid rgba(244, 208, 63, 0.3)',
                color: '#f4d03f',
                borderRadius: '12px',
                fontWeight: '600',
                padding: '12px 16px',
                boxShadow: '0 4px 12px rgba(244, 208, 63, 0.3))',
                transition: 'all 0.3s ease'
              }}>
                <Download className="mr-2 h-4 w-4" style={{ color: '#f4d03f' }} />
                Receipt
              </Button>
              <Button variant="outline" className="flex-1" style={{
                background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.1) 0%, rgba(128, 0, 32, 0.2) 100%)',
                border: '2px solid rgba(244, 208, 63, 0.3)',
                color: '#f4d03f',
                borderRadius: '12px',
                fontWeight: '600',
                padding: '12px 16px',
                boxShadow: '0 4px 12px rgba(128, 0, 32, 0.3)',
                transition: 'all 0.3s ease'
              }}>
                <Share2 className="mr-2 h-4 w-4" style={{ color: '#f4d03f' }} />
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

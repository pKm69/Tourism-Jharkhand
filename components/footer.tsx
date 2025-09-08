import Link from "next/link"
import { Mountain } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="h-8 w-8" />
              <span className="text-xl font-bold">Jharkhand Tourism</span>
            </div>
            <p className="text-background/80 text-pretty">
              Discover the authentic beauty of Jharkhand through our smart digital platform.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/destinations#netarhat" className="hover:text-background transition-colors">
                  Netarhat
                </Link>
              </li>
              <li>
                <Link href="/destinations#betla" className="hover:text-background transition-colors">
                  Betla National Park
                </Link>
              </li>
              <li>
                <Link href="/destinations#hundru" className="hover:text-background transition-colors">
                  Hundru Falls
                </Link>
              </li>
              <li>
                <Link href="/destinations#deoghar" className="hover:text-background transition-colors">
                  Deoghar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/ai-features#itinerary" className="hover:text-background transition-colors">
                  AI Itinerary
                </Link>
              </li>
              <li>
                <Link href="/ai-features#ar-vr" className="hover:text-background transition-colors">
                  AR/VR Tours
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-background transition-colors">
                  Local Marketplace
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-background transition-colors">
                  Community Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/about#help" className="hover:text-background transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about#privacy" className="hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about#terms" className="hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/80">
          <p>&copy; 2024 Jharkhand Tourism Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

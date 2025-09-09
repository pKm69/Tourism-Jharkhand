"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mountain, Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Jharkhand Tourism</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/destinations" className="text-foreground hover:text-primary transition-colors">
              Destinations
            </Link>
            <Link href="/ai-features" className="text-foreground hover:text-primary transition-colors">
              AI Features
            </Link>
            <Link href="/marketplace" className="text-foreground hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link href="/feedback" className="text-foreground hover:text-primary transition-colors">
              Feedback
            </Link>
            <Link href="/analytics" className="text-foreground hover:text-primary transition-colors">
              Analytics
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Button asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-in slide-in-from-top-2">
            <Link href="/destinations" className="block text-foreground hover:text-primary transition-colors">
              Destinations
            </Link>
            <Link href="/ai-features" className="block text-foreground hover:text-primary transition-colors">
              AI Features
            </Link>
            <Link href="/marketplace" className="block text-foreground hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link href="/feedback" className="block text-foreground hover:text-primary transition-colors">
              Feedback
            </Link>
            <Link href="/analytics" className="block text-foreground hover:text-primary transition-colors">
              Analytics
            </Link>
            <Link href="/about" className="block text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Button className="w-full" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

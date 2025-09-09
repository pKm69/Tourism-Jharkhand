"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Mountain } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        <Mountain className="h-6 w-6" />
        Jharkhand Tourism
      </Link>

      {/* Desktop Navigation */}
      <ul className="navbar-links">
        <li>
          <Link href="/destinations">Destinations</Link>
        </li>
        <li>
          <Link href="/ai-features">Smart Features</Link>
        </li>
        <li>
          <Link href="/marketplace">Marketplace</Link>
        </li>
        <li>
          <Link href="/feedback">Feedback</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <Link href="/destinations">
        <button className="navbar-button">Get Started</button>
      </Link>

      {/* Mobile menu button */}
      <button className="mobile-menu-button md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link href="/destinations" onClick={() => setIsMenuOpen(false)}>
            Destinations
          </Link>
          <Link href="/ai-features" onClick={() => setIsMenuOpen(false)}>
            Smart Features
          </Link>
          <Link href="/marketplace" onClick={() => setIsMenuOpen(false)}>
            Marketplace
          </Link>
          <Link href="/feedback" onClick={() => setIsMenuOpen(false)}>
            Feedback
          </Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link href="/destinations" onClick={() => setIsMenuOpen(false)}>
            <button className="navbar-button w-full">Get Started</button>
          </Link>
        </div>
      )}
    </nav>
  )
}

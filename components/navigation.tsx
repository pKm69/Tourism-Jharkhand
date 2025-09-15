"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Mountain, User, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, isAuthenticated, logout, isLoading } = useAuth()

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

      {/* Authentication Section */}
      {!isLoading && (
        <>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 navbar-button"
              >
                <User className="h-4 w-4" />
                <span>{user?.name || 'User'}</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50" style={{
                  background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)',
                  border: '1px solid rgba(244, 208, 63, 0.3)'
                }}>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsUserMenuOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth">
              <button className="navbar-button">Get Started</button>
            </Link>
          )}
        </>
      )}

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
          
          {/* Mobile Authentication */}
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center text-white hover:text-yellow-300 transition-colors">
                    <User className="h-4 w-4 mr-2" />
                    Profile ({user?.name})
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center text-white hover:text-yellow-300 transition-colors w-full text-left"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                  <button className="navbar-button w-full">Get Started</button>
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  )
}

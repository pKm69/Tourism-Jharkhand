"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mountain, User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { useAuth } from '@/hooks/use-auth'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  phone?: string
  general?: string
}

export default function AuthPage() {
  const router = useRouter()
  const { login: authLogin } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long"
    }

    // Additional validations for signup
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required"
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
      if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid Indian phone number"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted!', { isLogin, formData, errors })
    
    if (!validateForm()) {
      console.log('Validation failed:', errors)
      return
    }

    setIsLoading(true)
    console.log('Starting authentication request...')
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password,
            phone: formData.phone 
          }

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.success) {
        // Use the auth hook to manage authentication state
        authLogin(data.data.user, data.data.token)
        
        alert(isLogin ? 'Login successful!' : 'Account created successfully!')
        
        // Check if there's a redirect URL stored
        const redirectUrl = localStorage.getItem('redirectAfterLogin')
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin')
          router.push(redirectUrl)
        } else {
          router.push('/destinations')
        }
      } else {
        setErrors({ general: data.message || 'Authentication failed' })
      }
    } catch (error) {
      console.error('Auth error:', error)
      setErrors({ general: 'Network error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: ""
    })
    setErrors({})
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.3) 0%, rgba(30, 58, 138, 0.3) 100%)'
    }}>
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="ai-demo-card" data-aos="fade-up" data-aos-delay="600">
          <div className="max-w-2xl mx-auto">
            <div 
              className="p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.18) 0%, rgba(30, 58, 138, 0.18) 100%)',
                backdropFilter: 'blur(15px)',
                border: '2px solid rgba(244, 208, 63, 0.35)',
                borderRadius: '20px',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)'
              }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-3xl shadow-lg" style={{
                  backgroundColor: '#f4d03f',
                  boxShadow: '0 8px 25px rgba(244, 208, 63, 0.3)'
                }}>
                  <Mountain className="h-10 w-10" style={{color: '#800020'}} />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight" style={{
                color: '#f4d03f',
                textShadow: '0 2px 10px rgba(244, 208, 63, 0.3)'
              }}>
                {isLogin ? 'Welcome Back' : 'Join Our Community'}
              </h2>
              <p className="text-lg leading-relaxed" style={{color: 'rgba(255,255,255,0.85)'}}>
                {isLogin 
                  ? 'Continue your journey through Jharkhand\'s wonders' 
                  : 'Discover the hidden gems and rich heritage of Jharkhand'
                }
              </p>
            </div>

            {/* General Error Message */}
            {errors.general && (
              <div className="mb-6 p-4 rounded-xl" style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444'
              }}>
                <p className="text-center font-medium">{errors.general}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field (Register only) */}
                {!isLogin && (
                  <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-sm font-semibold mb-3" style={{
                      color: '#f4d03f',
                      textShadow: '0 1px 3px rgba(244, 208, 63, 0.3)'
                    }}>
                      Full Name *
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 group-focus-within:text-white/80 transition-colors" />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          border: '2px solid rgba(244, 208, 63, 0.4)',
                          color: 'white',
                          fontSize: '16px',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#f4d03f';
                          e.target.style.boxShadow = '0 0 20px rgba(244, 208, 63, 0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(244, 208, 63, 0.4)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        }}
                        placeholder="Enter your name"
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-sm mt-2 ml-1">{errors.name}</p>}
                  </div>
                )}

                {/* Email Field */}
                <div className={!isLogin ? "md:col-span-1" : "md:col-span-2"}>
                  <label htmlFor="email" className="block text-sm font-semibold mb-3" style={{
                    color: '#f4d03f',
                    textShadow: '0 1px 3px rgba(244, 208, 63, 0.3)'
                  }}>
                    Email Address *
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 group-focus-within:text-white/80 transition-colors" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        border: '2px solid rgba(244, 208, 63, 0.4)',
                        color: 'white',
                        fontSize: '16px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f4d03f';
                        e.target.style.boxShadow = '0 0 20px rgba(244, 208, 63, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(244, 208, 63, 0.4)';
                        e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                      }}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm mt-2 ml-1">{errors.email}</p>}
                </div>

                {/* Phone Field (Register only) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-3" style={{
                      color: '#f4d03f',
                      textShadow: '0 1px 3px rgba(244, 208, 63, 0.3)'
                    }}>
                      Phone Number (Optional)
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 group-focus-within:text-white/80 transition-colors" />
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300 focus:scale-[1.02]"
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          border: '2px solid rgba(244, 208, 63, 0.4)',
                          color: 'white',
                          fontSize: '16px',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#f4d03f';
                          e.target.style.boxShadow = '0 0 20px rgba(244, 208, 63, 0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(244, 208, 63, 0.4)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        }}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-sm mt-2 ml-1">{errors.phone}</p>}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password Field */}
                <div>
                  <label htmlFor="password" style={{color: '#f4d03f'}} className="block text-sm font-medium mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 rounded-md"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(244, 208, 63, 0.3)',
                        color: 'white',
                        height: '42px'
                      }}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password Field (Register only) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" style={{color: '#f4d03f'}} className="block text-sm font-medium mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 rounded-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(244, 208, 63, 0.3)',
                          color: 'white',
                          height: '42px'
                        }}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => {
                  console.log('Button clicked!', { isLogin, formData });
                  // The form onSubmit will handle the actual submission
                }}
                className="w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl mt-8 relative overflow-hidden cursor-pointer"
                style={{
                  background: isLoading 
                    ? 'linear-gradient(135deg, #999 0%, #666 100%)' 
                    : 'linear-gradient(135deg, #f4d03f 0%, #d4af37 100%)',
                  color: '#800020',
                  border: '3px solid #f4d03f',
                  boxShadow: '0 8px 25px rgba(244, 208, 63, 0.4)',
                  textShadow: '0 1px 2px rgba(128, 0, 32, 0.3)',
                  opacity: isLoading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    const target = e.target as HTMLButtonElement;
                    target.style.background = 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)';
                    target.style.transform = 'translateY(-3px) scale(1.02)';
                    target.style.boxShadow = '0 12px 35px rgba(244, 208, 63, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    const target = e.target as HTMLButtonElement;
                    target.style.background = 'linear-gradient(135deg, #f4d03f 0%, #d4af37 100%)';
                    target.style.transform = 'translateY(0) scale(1)';
                    target.style.boxShadow = '0 8px 25px rgba(244, 208, 63, 0.4)';
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current mr-3"></div>
                    <span className="font-semibold">
                      {isLogin ? 'Logging In...' : 'Creating Account...'}
                    </span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center font-bold">
                    {isLogin ? 'Login to Explore' : 'Join the Journey'}
                  </span>
                )}
              </button>

              {/* Toggle Mode */}
              <div className="text-center mt-8">
                <p style={{color: 'rgba(255,255,255,0.7)'}}>
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  type="button"
                  onClick={toggleMode}
                  className="font-semibold transition-colors mt-2"
                  style={{color: '#f4d03f'}}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#d4af37'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#f4d03f'}
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </div>
            </form>

            {/* Terms */}
            <p className="text-center text-sm mt-6" style={{color: 'rgba(255,255,255,0.5)'}}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

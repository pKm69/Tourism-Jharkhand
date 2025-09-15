'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, Calendar, Edit, Save, X } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { useAuth } from '@/hooks/use-auth'

interface UserProfile {
  _id: string
  name: string
  email: string
  phone?: string
  role: string
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, token, isAuthenticated, isLoading, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    phone: ''
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth')
    }
    if (user) {
      setEditData({
        name: user.name || '',
        phone: user.phone || ''
      })
    }
  }, [isAuthenticated, isLoading, user, router])

  const handleEdit = () => {
    setIsEditing(true)
    setErrors({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({
      name: user?.name || '',
      phone: user?.phone || ''
    })
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!editData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (editData.phone && !/^[6-9]\d{9}$/.test(editData.phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return
    
    setIsSaving(true)
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editData.name,
          phone: editData.phone
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        updateUser(data.data.user)
        setIsEditing(false)
        alert('Profile updated successfully!')
      } else {
        setErrors({ general: data.message || 'Failed to update profile' })
      }
    } catch (error) {
      console.error('Profile update error:', error)
      setErrors({ general: 'Network error. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.3) 0%, rgba(30, 58, 138, 0.3) 100%)'
    }}>
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="ai-demo-card" data-aos="fade-up">
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
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-3xl shadow-lg" style={{
                    backgroundColor: '#f4d03f',
                    boxShadow: '0 8px 25px rgba(244, 208, 63, 0.3)'
                  }}>
                    <User className="h-10 w-10" style={{color: '#800020'}} />
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-4 tracking-tight" style={{
                  color: '#f4d03f',
                  textShadow: '0 2px 10px rgba(244, 208, 63, 0.3)'
                }}>
                  My Profile
                </h1>
                <p className="text-lg leading-relaxed" style={{color: 'rgba(255,255,255,0.85)'}}>
                  Manage your account information and preferences
                </p>
              </div>

              {/* Error Message */}
              {errors.general && (
                <div className="mb-6 p-4 rounded-xl" style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444'
                }}>
                  <p className="text-center font-medium">{errors.general}</p>
                </div>
              )}

              {/* Profile Information */}
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{
                    color: '#f4d03f',
                    textShadow: '0 1px 3px rgba(244, 208, 63, 0.3)'
                  }}>
                    Full Name
                  </label>
                  {isEditing ? (
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300"
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          border: '2px solid rgba(244, 208, 63, 0.4)',
                          color: 'white',
                          fontSize: '16px'
                        }}
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>
                  ) : (
                    <div className="flex items-center p-4 rounded-xl" style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(244, 208, 63, 0.2)'
                    }}>
                      <User className="h-5 w-5 text-white/60 mr-3" />
                      <span className="text-white text-lg">{user.name}</span>
                    </div>
                  )}
                </div>

                {/* Email Field (Read-only) */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{
                    color: '#f4d03f',
                    textShadow: '0 1px 3px rgba(244, 208, 63, 0.3)'
                  }}>
                    Email Address
                  </label>
                  <div className="flex items-center p-4 rounded-xl" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(244, 208, 63, 0.1)'
                  }}>
                    <Mail className="h-5 w-5 text-white/40 mr-3" />
                    <span className="text-white/70 text-lg">{user.email}</span>
                    <span className="ml-auto text-xs text-white/40">(Cannot be changed)</span>
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{
                    color: '#f4d03f',
                    textShadow: '0 1px 3px rgba(244, 208, 63, 0.3)'
                  }}>
                    Phone Number
                  </label>
                  {isEditing ? (
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300"
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          border: '2px solid rgba(244, 208, 63, 0.4)',
                          color: 'white',
                          fontSize: '16px'
                        }}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  ) : (
                    <div className="flex items-center p-4 rounded-xl" style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(244, 208, 63, 0.2)'
                    }}>
                      <Phone className="h-5 w-5 text-white/60 mr-3" />
                      <span className="text-white text-lg">{user.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                {/* Account Info */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{
                    color: '#f4d03f',
                    textShadow: '0 1px 3px rgba(244, 208, 63, 0.3)'
                  }}>
                    Account Information
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 rounded-xl" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(244, 208, 63, 0.1)'
                    }}>
                      <Calendar className="h-5 w-5 text-white/40 mr-3" />
                      <div>
                        <p className="text-white/70 text-sm">Member Since</p>
                        <p className="text-white text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 rounded-xl" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(244, 208, 63, 0.1)'
                    }}>
                      <User className="h-5 w-5 text-white/40 mr-3" />
                      <div>
                        <p className="text-white/70 text-sm">Account Status</p>
                        <p className="text-green-400 text-sm">Active</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 pt-6">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #f4d03f 0%, #d4af37 100%)',
                          color: '#800020',
                          border: '2px solid #f4d03f'
                        }}
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white border-2 border-white/30 hover:bg-white/10"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #f4d03f 0%, #d4af37 100%)',
                        color: '#800020',
                        border: '2px solid #f4d03f'
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

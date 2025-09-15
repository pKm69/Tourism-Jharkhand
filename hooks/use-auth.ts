'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  _id: string
  name: string
  email: string
  phone?: string
  role: string
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false
  })

  useEffect(() => {
    // Check for stored auth data on mount
    const token = localStorage.getItem('authToken')
    const userStr = localStorage.getItem('user')
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        setAuthState({
          user,
          token,
          isLoading: false,
          isAuthenticated: true
        })
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        logout()
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = (user: User, token: string) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('user', JSON.stringify(user))
    setAuthState({
      user,
      token,
      isLoading: false,
      isAuthenticated: true
    })
  }

  const logout = async () => {
    try {
      // Call backend logout endpoint if token exists
      if (authState.token) {
        await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authState.token}`,
            'Content-Type': 'application/json'
          }
        })
      }
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      // Clear local storage and state regardless of API call result
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false
      })
      router.push('/')
    }
  }

  const updateUser = (updatedUser: User) => {
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setAuthState(prev => ({
      ...prev,
      user: updatedUser
    }))
  }

  return {
    ...authState,
    login,
    logout,
    updateUser
  }
}

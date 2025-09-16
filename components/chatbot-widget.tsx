"use client"

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Globe, Mountain, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  language?: string
}

interface ChatbotResponse {
  success: boolean
  response: string
  detectedLanguage: string
  supportedLanguages?: string[]
  error?: string
}

const LANGUAGE_OPTIONS = {
  'auto': '🌐 Auto-detect',
  'en': '🇬🇧 English',
  'hi': '🇮🇳 हिंदी',
  'bn': '🇧🇩 বাংলা',
  'or': '🇮🇳 ଓଡ଼ିଆ',
  'ur': '🇵🇰 اردو'
};

const WELCOME_MESSAGES = {
  'en': 'नमस्ते! Welcome to Jharkhand Tourism! How can I help you explore the beauty of Jharkhand today? 🏔️',
  'hi': 'नमस्ते! झारखंड पर्यटन में आपका स्वागत है! मैं आज झारखंड की सुंदरता का पता लगाने में आपकी कैसे मदद कर सकता हूं? 🏔️',
  'bn': 'নমস্কার! ঝাড়খণ্ড পর্যটনে স্বাগতম! আজ ঝাড়খণ্ডের সৌন্দর্য অন্বেষণে আমি কীভাবে আপনাকে সাহায্য করতে পারি? 🏔️',
  'or': 'ନମସ୍କାର! ଝାଡଖଣ୍ଡ ପର୍ଯ୍ୟଟନରେ ସ୍ୱାଗତ! ଆଜି ଝାଡଖଣ୍ଡର ସୌନ୍ଦର୍ଯ୍ୟ ଅନ୍ବେଷଣରେ ମୁଁ କିପରି ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିପାରିବି? 🏔️'
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('auto')
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: WELCOME_MESSAGES['en'],
      isUser: false,
      timestamp: new Date(),
      language: 'en'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const languageMenuRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Change welcome message when language changes
  const changeLanguage = (langCode: string) => {
    setSelectedLanguage(langCode)
    setShowLanguageMenu(false)
    
    // Update welcome message if it's the first message
    if (messages.length === 1 && !messages[0].isUser) {
      const welcomeText = WELCOME_MESSAGES[langCode as keyof typeof WELCOME_MESSAGES] || WELCOME_MESSAGES['en']
      setMessages([{
        id: '1',
        text: welcomeText,
        isUser: false,
        timestamp: new Date(),
        language: langCode
      }])
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { 
      id: Date.now().toString(),
      text: userMessage, 
      isUser: true,
      timestamp: new Date()
    }]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          language: selectedLanguage
        }),
      });

      const data: ChatbotResponse = await response.json();

      // Simulate typing delay for better UX
      setTimeout(() => {
        setIsTyping(false);
        
        if (data.success) {
          setMessages(prev => [...prev, { 
            id: Date.now().toString(),
            text: data.response, 
            isUser: false,
            timestamp: new Date(),
            language: data.detectedLanguage
          }]);
        } else {
          setMessages(prev => [...prev, { 
            id: Date.now().toString(),
            text: data.error || 'Sorry, I encountered an error. Please try again.', 
            isUser: false,
            timestamp: new Date()
          }]);
        }
      }, 1000);

    } catch (error) {
      console.error('Chatbot API error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(),
        text: 'Unable to connect to chatbot service. Please ensure the backend is running.', 
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div 
      className="chatbot-widget-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        pointerEvents: 'auto'
      }}
    >
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #800020 0%, #1e3a8a 100%)',
            border: '2px solid #f4d03f'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <MessageCircle className="h-7 w-7 text-white relative z-10" />
          <Mountain className="h-4 w-4 text-yellow-300 absolute top-1 right-1 relative z-10" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 flex flex-col overflow-hidden backdrop-blur-sm"
          style={{ 
            position: 'fixed', 
            bottom: '100px', 
            right: '24px', 
            zIndex: 9999,
            width: '380px',
            maxWidth: '380px',
            height: '600px',
            minHeight: '600px',
            maxHeight: '600px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(244,208,63,0.05) 100%)'
          }}
        >
          {/* Header - Fixed */}
          <div 
            className="px-4 py-4 text-white flex items-center justify-between flex-shrink-0 relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #800020 0%, #1e3a8a 100%)',
              borderBottom: '2px solid #f4d03f'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <Mountain className="h-6 w-6 text-yellow-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
              </div>
              <div>
                <span className="font-bold text-sm">Jharkhand Tourism</span>
                <div className="text-xs text-yellow-200 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI Assistant
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 relative z-10">
              {/* Language Selector */}
              <div className="relative" ref={languageMenuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0 flex-shrink-0 rounded-full"
                >
                  <Globe className="h-4 w-4" />
                </Button>
                
                {showLanguageMenu && (
                  <div className="absolute top-10 right-0 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[160px] z-50">
                    {Object.entries(LANGUAGE_OPTIONS).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => changeLanguage(code)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-yellow-50 transition-colors ${
                          selectedLanguage === code ? 'bg-yellow-100 text-yellow-800 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0 flex-shrink-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages - Scrollable */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 chatbot-scrollbar" 
            style={{
              background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.1) 0%, rgba(30, 58, 138, 0.1) 100%)',
              height: '420px',
              maxHeight: '420px',
              overflowY: 'scroll'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm break-words shadow-sm ${
                    message.isUser
                      ? 'rounded-br-md border-2 border-yellow-300 text-white'
                      : 'rounded-bl-md border-2 border-yellow-300 shadow-md text-white'
                  }`}
                  style={{ 
                    background: message.isUser 
                      ? 'linear-gradient(135deg, #800020 0%, #1e3a8a 100%)'
                      : 'linear-gradient(135deg, rgba(128, 0, 32, 0.9) 0%, rgba(30, 58, 138, 0.9) 100%)',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    color: 'white'
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {(isLoading || isTyping) && (
              <div className="flex justify-start">
                <div className="border-2 border-yellow-300 px-4 py-3 rounded-2xl rounded-bl-md shadow-md" style={{
                  background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.9) 0%, rgba(30, 58, 138, 0.9) 100%)'
                }}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Invisible div to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input - Fixed */}
          <div className="p-4 border-t-2 border-yellow-200 bg-white/90 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Jharkhand tourism..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="h-10 w-10 p-0 rounded-full flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-yellow-300"
                style={{ 
                  background: 'linear-gradient(135deg, #800020 0%, #1e3a8a 100%)',
                  opacity: (!inputMessage.trim() || isLoading) ? 0.5 : 1
                }}
              >
                <Send className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

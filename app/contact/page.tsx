"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Briefcase,
  HelpCircle,
  ArrowRight,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email Us",
      details: ["info@jharkhantourism.com", "support@jharkhantourism.com"],
      description: "Get in touch via email for detailed inquiries",
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Call Us",
      details: ["+91 651 234 5678", "+91 651 234 5679"],
      description: "Speak directly with our team",
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-600" />,
      title: "Visit Us",
      details: ["123 Tourism Hub", "Ranchi, Jharkhand 834001"],
      description: "Our office is open Monday to Friday",
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: "Office Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      description: "We're here to help during business hours",
    },
  ]

  const inquiryTypes = [
    {
      value: "general",
      label: "General Inquiry",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "General questions about our platform",
    },
    {
      value: "partnership",
      label: "Partnership",
      icon: <Briefcase className="h-5 w-5" />,
      description: "Interested in partnering with us",
    },
    {
      value: "community",
      label: "Community Support",
      icon: <Users className="h-5 w-5" />,
      description: "Questions about community programs",
    },
    {
      value: "support",
      label: "Technical Support",
      icon: <HelpCircle className="h-5 w-5" />,
      description: "Need help with the platform",
    },
  ]

  const offices = [
    {
      city: "Ranchi",
      address: "123 Tourism Hub, Main Road, Ranchi 834001",
      phone: "+91 651 234 5678",
      email: "ranchi@jharkhantourism.com",
      manager: "Dr. Rajesh Kumar",
    },
    {
      city: "Jamshedpur",
      address: "456 Steel City Plaza, Jamshedpur 831001",
      phone: "+91 657 890 1234",
      email: "jamshedpur@jharkhantourism.com",
      manager: "Amit Singh",
    },
    {
      city: "Hazaribagh",
      address: "789 Heritage Center, Hazaribagh 825301",
      phone: "+91 654 567 8901",
      email: "hazaribagh@jharkhantourism.com",
      manager: "Priya Sharma",
    },
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="max-w-md mx-auto text-center p-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Message Sent!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="w-full">
              Send Another Message
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Get In Touch
              <span className="text-primary block">We're Here to Help</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Have questions about sustainable tourism in Jharkhand? Want to partner with us? We'd love to hear from
              you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{info.title}</h3>
                <div className="space-y-2 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-primary font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">Send Us a Message</h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 12345 67890"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-foreground mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Inquiry Types */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">How Can We Help?</h3>
              <div className="space-y-4 mb-8">
                {inquiryTypes.map((type) => (
                  <Card key={type.value} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">{type.icon}</div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">{type.label}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-bold text-foreground mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="p-2 bg-transparent">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2 bg-transparent">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2 bg-transparent">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2 bg-transparent">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Our Offices</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Visit us at any of our locations across Jharkhand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{office.city}</h3>
                </div>

                <div className="space-y-3">
                  <p className="text-muted-foreground">{office.address}</p>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-primary">{office.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-primary">{office.email}</span>
                  </div>

                  <div className="pt-2">
                    <Badge variant="outline">Manager: {office.manager}</Badge>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4 group bg-transparent">
                  Get Directions
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Quick answers to common questions about our platform and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-3">How do I book a homestay?</h3>
              <p className="text-muted-foreground text-sm">
                Browse our marketplace, select a homestay, and book directly through our secure platform. All bookings
                are verified and protected.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-3">Can I become a local guide?</h3>
              <p className="text-muted-foreground text-sm">
                Yes! Apply through our community section. We provide training and certification for local guides
                interested in sharing their knowledge.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-3">Is the platform available in local languages?</h3>
              <p className="text-muted-foreground text-sm">
                Currently available in English and Hindi. We're working on adding more local languages including
                Santhali and Mundari.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-3">How do you ensure authentic experiences?</h3>
              <p className="text-muted-foreground text-sm">
                All our partners are verified local community members. We use blockchain technology to ensure
                authenticity and transparency.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

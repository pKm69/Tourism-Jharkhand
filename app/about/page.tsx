"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  Heart,
  Award,
  Globe,
  Lightbulb,
  Shield,
  Leaf,
  ArrowRight,
  MapPin,
  Calendar,
  Mail,
  Linkedin,
} from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=200&width=200&text=Rajesh",
      bio: "Tourism expert with 15+ years experience in sustainable development",
      location: "Ranchi",
      email: "rajesh@jharkhantourism.com",
      linkedin: "#",
    },
    {
      name: "Priya Sharma",
      role: "Head of Community Relations",
      image: "/placeholder.svg?height=200&width=200&text=Priya",
      bio: "Anthropologist specializing in tribal culture preservation",
      location: "Hazaribagh",
      email: "priya@jharkhantourism.com",
      linkedin: "#",
    },
    {
      name: "Amit Singh",
      role: "Technology Director",
      image: "/placeholder.svg?height=200&width=200&text=Amit",
      bio: "AI/ML engineer focused on sustainable tourism solutions",
      location: "Jamshedpur",
      email: "amit@jharkhantourism.com",
      linkedin: "#",
    },
    {
      name: "Sunita Devi",
      role: "Cultural Heritage Advisor",
      image: "/placeholder.svg?height=200&width=200&text=Sunita",
      bio: "Traditional artist and cultural preservation advocate",
      location: "Deoghar",
      email: "sunita@jharkhantourism.com",
      linkedin: "#",
    },
  ]

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Community First",
      description: "Every decision we make prioritizes the wellbeing and empowerment of local communities",
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      title: "Sustainability",
      description: "Promoting eco-friendly tourism that preserves natural resources for future generations",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Cultural Preservation",
      description: "Protecting and celebrating the rich tribal heritage and traditions of Jharkhand",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-500" />,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to create meaningful travel experiences",
    },
  ]

  const milestones = [
    {
      year: "2022",
      title: "Platform Launch",
      description: "Launched the first version with 50 local partners",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Introduced AI-powered itinerary planning and AR experiences",
    },
    {
      year: "2023",
      title: "Community Impact",
      description: "Reached 1000+ families with direct economic benefits",
    },
    {
      year: "2024",
      title: "International Recognition",
      description: "Awarded 'Best Sustainable Tourism Platform' by UNESCO",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              About Our Mission
              <span className="text-primary block">Transforming Tourism</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              We're building a bridge between authentic tribal culture and responsible tourism, creating opportunities
              that benefit both travelers and local communities
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                To create a sustainable digital ecosystem that empowers tribal communities in Jharkhand through
                responsible tourism, while preserving their rich cultural heritage and protecting the environment.
              </p>
              <p className="text-lg text-muted-foreground text-pretty">
                We believe that tourism should be a force for good - creating economic opportunities, fostering cultural
                exchange, and promoting environmental conservation.
              </p>
            </div>
            <div className="relative">
              <img
                src="/jharkhand-landscape-forest-mountains-tribal-cultur.jpg"
                alt="Jharkhand landscape"
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <img
                src="/jharkhand-tribal-handicrafts-marketplace-artisans.jpg"
                alt="Tribal artisans"
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                To make Jharkhand a global model for sustainable, community-driven tourism that celebrates indigenous
                culture while creating lasting economic impact.
              </p>
              <p className="text-lg text-muted-foreground text-pretty">
                We envision a future where every visitor contributes to the preservation of tribal heritage and the
                prosperity of local communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              The principles that guide every decision we make and every partnership we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground text-pretty">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Key milestones in our mission to transform tourism in Jharkhand
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <Badge variant="outline">{milestone.year}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Passionate individuals dedicated to sustainable tourism and community empowerment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-shadow">
                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{member.location}</span>
                </div>
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Awards & Recognition</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Recognition for our commitment to sustainable tourism and community development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">UNESCO Award</h3>
              <p className="text-primary font-medium mb-3">Best Sustainable Tourism Platform 2024</p>
              <p className="text-sm text-muted-foreground">
                Recognized for innovative approach to cultural preservation through tourism
              </p>
            </Card>
            <Card className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Green Tourism Award</h3>
              <p className="text-primary font-medium mb-3">Ministry of Tourism, India 2023</p>
              <p className="text-sm text-muted-foreground">Excellence in promoting eco-friendly tourism practices</p>
            </Card>
            <Card className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Innovation Award</h3>
              <p className="text-primary font-medium mb-3">Travel Tech Summit 2023</p>
              <p className="text-sm text-muted-foreground">Outstanding use of AI and blockchain in tourism</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">Join Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty">
              Whether you're a traveler, partner, or community member, there's a place for you in our journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

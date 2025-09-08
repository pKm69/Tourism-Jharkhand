"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  Users,
  TrendingUp,
  Heart,
  Leaf,
  GraduationCap,
  Briefcase,
  DollarSign,
  Award,
  Target,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  TreePine,
  Handshake,
} from "lucide-react"

export default function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState("impact")

  const impactStats = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Families Empowered",
      value: "2,847",
      change: "+23%",
      description: "Local families directly benefiting from tourism initiatives",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Income Generated",
      value: "₹45.2L",
      change: "+34%",
      description: "Total income generated for local communities this year",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-purple-600" />,
      title: "Skills Trained",
      value: "1,234",
      change: "+45%",
      description: "People trained in hospitality and digital skills",
    },
    {
      icon: <TreePine className="h-8 w-8 text-green-500" />,
      title: "Trees Planted",
      value: "12,450",
      change: "+67%",
      description: "Trees planted through eco-tourism initiatives",
    },
  ]

  const projects = [
    {
      id: 1,
      title: "Digital Literacy Program",
      description: "Teaching smartphone and internet skills to tribal communities",
      location: "Ranchi District",
      beneficiaries: 450,
      progress: 78,
      status: "Active",
      image: "/placeholder.svg?height=200&width=300&text=Digital+Training",
      category: "Education",
      startDate: "Jan 2024",
      budget: "₹8.5L",
    },
    {
      id: 2,
      title: "Homestay Development Initiative",
      description: "Supporting families to set up authentic homestay experiences",
      location: "Netarhat Hills",
      beneficiaries: 125,
      progress: 92,
      status: "Completing",
      image: "/tribal-homestay-jharkhand-authentic-experience.jpg",
      category: "Tourism",
      startDate: "Mar 2023",
      budget: "₹12.3L",
    },
    {
      id: 3,
      title: "Handicraft Skill Enhancement",
      description: "Preserving traditional crafts while improving market access",
      location: "Hazaribagh",
      beneficiaries: 320,
      progress: 65,
      status: "Active",
      image: "/placeholder.svg?height=200&width=300&text=Handicraft+Training",
      category: "Livelihood",
      startDate: "Aug 2023",
      budget: "₹15.7L",
    },
    {
      id: 4,
      title: "Eco-Tourism Trail Development",
      description: "Creating sustainable nature trails with local guide training",
      location: "Betla National Park",
      beneficiaries: 85,
      progress: 43,
      status: "Active",
      image: "/placeholder.svg?height=200&width=300&text=Nature+Trails",
      category: "Environment",
      startDate: "Nov 2023",
      budget: "₹9.2L",
    },
  ]

  const testimonials = [
    {
      name: "Kumari Devi",
      role: "Sohrai Artist",
      location: "Hazaribagh",
      image: "/placeholder.svg?height=80&width=80&text=Kumari",
      quote:
        "Through this platform, I can now sell my traditional art to people from all over the world. My monthly income has increased by 300%.",
      rating: 5,
    },
    {
      name: "Birsa Munda",
      role: "Homestay Owner",
      location: "Netarhat",
      image: "/placeholder.svg?height=80&width=80&text=Birsa",
      quote:
        "The training program helped me understand how to welcome tourists while preserving our cultural values. Now we host 15-20 families every month.",
      rating: 5,
    },
    {
      name: "Suresh Oraon",
      role: "Wildlife Guide",
      location: "Betla",
      image: "/placeholder.svg?height=80&width=80&text=Suresh",
      quote:
        "Being a certified guide through this program has given me steady income and helped me share my knowledge of our forests with visitors.",
      rating: 5,
    },
  ]

  const partnerships = [
    {
      name: "Jharkhand Tourism Board",
      type: "Government",
      contribution: "Policy Support & Funding",
      logo: "/placeholder.svg?height=60&width=120&text=JTB",
    },
    {
      name: "Tribal Welfare Department",
      type: "Government",
      contribution: "Community Outreach",
      logo: "/placeholder.svg?height=60&width=120&text=TWD",
    },
    {
      name: "Local NGOs Network",
      type: "Non-Profit",
      contribution: "Ground Implementation",
      logo: "/placeholder.svg?height=60&width=120&text=NGO",
    },
    {
      name: "Tech for Good Foundation",
      type: "Private",
      contribution: "Technology & Training",
      logo: "/placeholder.svg?height=60&width=120&text=TFG",
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
              Community Impact
              <span className="text-primary block">Empowering Local Lives</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover how sustainable tourism is transforming tribal communities across Jharkhand through technology,
              training, and authentic cultural exchange
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-muted rounded-lg p-1">
              {[
                { id: "impact", label: "Impact Stats", icon: <TrendingUp className="h-4 w-4" /> },
                { id: "projects", label: "Active Projects", icon: <Target className="h-4 w-4" /> },
                { id: "stories", label: "Success Stories", icon: <Heart className="h-4 w-4" /> },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={selectedTab === tab.id ? "default" : "ghost"}
                  onClick={() => setSelectedTab(tab.id)}
                  className="flex items-center gap-2"
                >
                  {tab.icon}
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      {selectedTab === "impact" && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {impactStats.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-lg font-medium text-foreground mb-2">{stat.title}</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {stat.change} this year
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </Card>
              ))}
            </div>

            {/* Impact Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Economic Empowerment</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Handicraft Sales</span>
                    <span className="font-medium">₹18.5L</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Homestay Revenue</span>
                    <span className="font-medium">₹12.3L</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Guide Services</span>
                    <span className="font-medium">₹8.7L</span>
                  </div>
                  <Progress value={58} className="h-2" />
                </div>
              </Card>

              <Card className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Environmental Impact</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Carbon Offset</span>
                    <span className="font-medium">245 tons</span>
                  </div>
                  <Progress value={82} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Waste Reduction</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Water Conservation</span>
                    <span className="font-medium">34%</span>
                  </div>
                  <Progress value={34} className="h-2" />
                </div>
              </Card>

              <Card className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Skill Development</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Digital Literacy</span>
                    <span className="font-medium">450 people</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Hospitality Training</span>
                    <span className="font-medium">320 people</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Language Skills</span>
                    <span className="font-medium">280 people</span>
                  </div>
                  <Progress value={56} className="h-2" />
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Active Projects */}
      {selectedTab === "projects" && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary/90">{project.category}</Badge>
                      <Badge
                        variant="secondary"
                        className={
                          project.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Started {project.startDate}
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />

                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Beneficiaries</p>
                          <p className="font-bold text-primary">{project.beneficiaries} people</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Budget</p>
                          <p className="font-bold text-primary">{project.budget}</p>
                        </div>
                      </div>

                      <Button className="w-full group">
                        View Project Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      {selectedTab === "stories" && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-8 text-center hover:shadow-xl transition-shadow">
                  <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-6">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</blockquote>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Community Achievements */}
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground text-center mb-8">Community Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">UNESCO Recognition</h4>
                  <p className="text-sm text-muted-foreground">Sohrai art preservation initiative</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">International Visitors</h4>
                  <p className="text-sm text-muted-foreground">From 23 countries this year</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Zero Poverty Goal</h4>
                  <p className="text-sm text-muted-foreground">85% progress in target villages</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Handshake className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Partnership Network</h4>
                  <p className="text-sm text-muted-foreground">45+ organizations collaborating</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Partnerships */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Our Partners</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Working together with government, NGOs, and private organizations to create lasting impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerships.map((partner, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="mx-auto w-24 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-foreground mb-2">{partner.name}</h3>
                <Badge variant="outline" className="mb-3">
                  {partner.type}
                </Badge>
                <p className="text-sm text-muted-foreground">{partner.contribution}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">Join Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty">
              Be part of the change. Support sustainable tourism that empowers communities and preserves culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Donate to Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

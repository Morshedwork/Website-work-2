"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Search, Filter, Star, Clock, Users } from "lucide-react"

// Mentor type definition
type Mentor = {
  id: number
  name: string
  title: string
  image: string
  specialties: string[]
  experience: number
  rating: number
  sessions: number
  availability: string
  price: string
  location: string
  description: string
}

// Sample mentors data
const MENTORS: Mentor[] = [
  {
    id: 1,
    name: "Dr. Aminul Islam",
    title: "Senior HR Consultant",
    image: "/placeholder.svg?height=300&width=300",
    specialties: ["Career Transitions", "Leadership Development", "HR Strategy"],
    experience: 15,
    rating: 4.9,
    sessions: 120,
    availability: "Weekdays, Evenings",
    price: "2,500 BDT/hour",
    location: "Dhaka",
    description:
      "With 15+ years of experience in HR and talent acquisition at multinational companies, Dr. Islam helps students navigate complex career decisions and develop leadership skills.",
  },
  {
    id: 2,
    name: "Farhana Rahman",
    title: "Tech Industry Specialist",
    image: "/placeholder.svg?height=300&width=300",
    specialties: ["Software Engineering", "Product Management", "Tech Interviews"],
    experience: 12,
    rating: 4.8,
    sessions: 95,
    availability: "Weekends, Evenings",
    price: "3,000 BDT/hour",
    location: "Remote",
    description:
      "Former engineering leader at Google and local tech companies, Farhana guides students pursuing careers in technology and product development with practical industry insights.",
  },
  {
    id: 3,
    name: "Mohammed Hasan",
    title: "Entrepreneurship Coach",
    image: "/placeholder.svg?height=300&width=300",
    specialties: ["Startups", "Business Development", "Fundraising"],
    experience: 10,
    rating: 4.7,
    sessions: 78,
    availability: "Flexible",
    price: "2,800 BDT/hour",
    location: "Dhaka",
    description:
      "Serial entrepreneur with 3 successful exits, Mohammed mentors students interested in building their own businesses in Bangladesh's growing startup ecosystem.",
  },
  {
    id: 4,
    name: "Tasneem Ahmed",
    title: "Communications Expert",
    image: "/placeholder.svg?height=300&width=300",
    specialties: ["Public Speaking", "Personal Branding", "Media Relations"],
    experience: 8,
    rating: 4.9,
    sessions: 110,
    availability: "Weekdays",
    price: "2,200 BDT/hour",
    location: "Dhaka, Chittagong",
    description:
      "Communications director with experience at leading NGOs, Tasneem helps students develop essential soft skills for professional success and personal branding.",
  },
  {
    id: 5,
    name: "Rafiqul Haque",
    title: "Finance Career Advisor",
    image: "/placeholder.svg?height=300&width=300",
    specialties: ["Banking", "Financial Analysis", "Investment"],
    experience: 18,
    rating: 4.6,
    sessions: 85,
    availability: "Weekends",
    price: "3,500 BDT/hour",
    location: "Dhaka",
    description:
      "Senior banking professional with expertise in Bangladesh's financial sector, Rafiqul guides students pursuing careers in finance and banking with practical industry knowledge.",
  },
  {
    id: 6,
    name: "Nusrat Jahan",
    title: "Creative Industries Mentor",
    image: "/placeholder.svg?height=300&width=300",
    specialties: ["Digital Marketing", "Content Creation", "Brand Strategy"],
    experience: 9,
    rating: 4.8,
    sessions: 92,
    availability: "Evenings, Weekends",
    price: "2,600 BDT/hour",
    location: "Remote",
    description:
      "Award-winning creative director, Nusrat mentors students interested in marketing, advertising, and digital content creation with a focus on building compelling portfolios.",
  },
  {
    id: 7,
    name: "Kamal Uddin",
    title: "IT Infrastructure Specialist",
    image: "/placeholder.svg?height=300&width=300",
    specialties: ["Cloud Computing", "Network Security", "DevOps"],
    experience: 14,
    rating: 4.7,
    sessions: 65,
    availability: "Weekdays, Evenings",
    price: "3,200 BDT/hour",
    location: "Dhaka, Remote",
    description:
      "IT infrastructure expert with experience at multinational tech companies, Kamal helps students navigate careers in cloud computing, cybersecurity, and IT operations.",
  },
  {
    id: 8,
    name: "Sabina Yasmin",
    title: "Healthcare Career Advisor",
    image: "/placeholder.svg?height=300&width=300",
    specialties: ["Medical Careers", "Healthcare Management", "Biotech"],
    experience: 16,
    rating: 4.9,
    sessions: 105,
    availability: "Weekends",
    price: "3,000 BDT/hour",
    location: "Dhaka",
    description:
      "With extensive experience in healthcare administration, Sabina guides medical and healthcare students in planning their career paths and specializations.",
  },
]

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>(MENTORS)

  // Get unique specialties and locations for filters
  const specialties = ["all", ...Array.from(new Set(MENTORS.flatMap((mentor) => mentor.specialties)))]
  const locations = ["all", ...Array.from(new Set(MENTORS.map((mentor) => mentor.location)))]

  // Handle search and filter
  const handleSearch = () => {
    let results = MENTORS

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply specialty filter
    if (selectedSpecialty !== "all") {
      results = results.filter((mentor) => mentor.specialties.includes(selectedSpecialty))
    }

    // Apply location filter
    if (selectedLocation !== "all") {
      results = results.filter((mentor) => mentor.location.includes(selectedLocation))
    }

    setFilteredMentors(results)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Expert Mentors & Career Counsellors</h1>
        <p className="text-muted-foreground mb-8">
          Connect with industry professionals who can guide you on your career journey
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, title, or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/20 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-[180px] border-primary/20">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties
                  .filter((s) => s !== "all")
                  .map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px] border-primary/20">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations
                  .filter((l) => l !== "all")
                  .map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Button onClick={handleSearch} className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Mentors</TabsTrigger>
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
            <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors card-hover-effect"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={mentor.image || "/placeholder.svg"}
                  alt={mentor.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{mentor.name}</h3>
                    <p className="text-primary">{mentor.title}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{mentor.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 my-3">
                  {mentor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{mentor.experience} years experience</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{mentor.sessions}+ sessions completed</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Available: {mentor.availability}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{mentor.description}</p>

                <div className="flex justify-between items-center">
                  <span className="font-medium">{mentor.price}</span>
                  <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">Book Session</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No mentors found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria to find more mentors.</p>
          </div>
        )}
      </div>
    </div>
  )
}


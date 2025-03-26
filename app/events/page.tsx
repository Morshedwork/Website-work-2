"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Search, Filter, Users, BookOpen, Zap } from "lucide-react"

// Event type definition
type Event = {
  id: number
  title: string
  type: "Workshop" | "Course" | "Event" | "Webinar"
  date: string
  endDate?: string
  location: string
  price: string
  capacity: number
  enrolled: number
  description: string
  instructor?: string
  category: string
}

// Sample events data
const EVENTS: Event[] = [
  {
    id: 1,
    title: "Technical Interview Masterclass",
    type: "Workshop",
    date: "April 15, 2025",
    location: "Online",
    price: "1,500 BDT",
    capacity: 30,
    enrolled: 18,
    description:
      "Learn proven strategies to excel in technical interviews for software engineering roles. Includes mock interviews and personalized feedback.",
    instructor: "Farhana Rahman",
    category: "tech",
  },
  {
    id: 2,
    title: "Resume Building Workshop",
    type: "Workshop",
    date: "April 22, 2025",
    location: "Dhaka University",
    price: "1,200 BDT",
    capacity: 40,
    enrolled: 25,
    description:
      "Hands-on workshop to create ATS-friendly resumes that highlight your strengths and catch recruiters' attention.",
    instructor: "Dr. Aminul Islam",
    category: "career",
  },
  {
    id: 3,
    title: "Digital Marketing Fundamentals",
    type: "Course",
    date: "May 5, 2025",
    endDate: "May 26, 2025",
    location: "Online",
    price: "5,000 BDT",
    capacity: 50,
    enrolled: 32,
    description:
      "Four-week course covering SEO, social media marketing, content strategy, and analytics. Includes certification upon completion.",
    instructor: "Nusrat Jahan",
    category: "marketing",
  },
  {
    id: 4,
    title: "Bangladesh Tech Career Fair",
    type: "Event",
    date: "May 10, 2025",
    location: "Bangabandhu International Conference Center",
    price: "Free",
    capacity: 500,
    enrolled: 320,
    description:
      "Connect with 50+ leading tech companies in Bangladesh. Bring your resume for on-the-spot interviews with hiring managers.",
    category: "tech",
  },
  {
    id: 5,
    title: "Full-Stack Web Development Bootcamp",
    type: "Course",
    date: "May 15, 2025",
    endDate: "June 15, 2025",
    location: "Hybrid (Online & In-person)",
    price: "12,000 BDT",
    capacity: 25,
    enrolled: 15,
    description:
      "Intensive 5-week bootcamp covering modern web development technologies. Build real projects for your portfolio.",
    instructor: "Kamal Uddin",
    category: "tech",
  },
  {
    id: 6,
    title: "Women in Leadership Panel",
    type: "Event",
    date: "June 3, 2025",
    location: "Radisson Blu Dhaka",
    price: "800 BDT",
    capacity: 200,
    enrolled: 85,
    description:
      "Inspiring panel discussion featuring women leaders from various industries sharing their career journeys and advice.",
    category: "leadership",
  },
  {
    id: 7,
    title: "Data Science for Beginners",
    type: "Course",
    date: "June 10, 2025",
    endDate: "July 15, 2025",
    location: "Online",
    price: "8,000 BDT",
    capacity: 40,
    enrolled: 22,
    description:
      "Comprehensive introduction to data science, covering Python, statistics, data visualization, and machine learning basics.",
    instructor: "Rafiqul Haque",
    category: "tech",
  },
  {
    id: 8,
    title: "Entrepreneurship Bootcamp",
    type: "Workshop",
    date: "July 5-6, 2025",
    location: "BRAC Center, Dhaka",
    price: "3,500 BDT",
    capacity: 50,
    enrolled: 28,
    description:
      "Intensive weekend bootcamp for aspiring entrepreneurs. Learn business model development, pitching, and fundraising strategies.",
    instructor: "Mohammed Hasan",
    category: "business",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(EVENTS)

  // Get unique types and categories for filters
  const types = ["all", ...Array.from(new Set(EVENTS.map((event) => event.type)))]
  const categories = ["all", ...Array.from(new Set(EVENTS.map((event) => event.category)))]

  // Handle search and filter
  const handleSearch = () => {
    let results = EVENTS

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (event.instructor && event.instructor.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply type filter
    if (selectedType !== "all") {
      results = results.filter((event) => event.type === selectedType)
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      results = results.filter((event) => event.category === selectedCategory)
    }

    setFilteredEvents(results)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Courses & Events</h1>
        <p className="text-muted-foreground mb-8">
          Enhance your skills and expand your network with our specialized courses and career events
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title, description, or instructor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/20 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px] border-primary/20">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types
                  .filter((t) => t !== "all")
                  .map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px] border-primary/20">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories
                  .filter((c) => c !== "all")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
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
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
            <TabsTrigger value="free">Free Events</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors card-hover-effect"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 bg-secondary p-6 flex flex-col items-center justify-center text-center">
                    {event.type === "Course" && <BookOpen className="h-8 w-8 text-primary mb-2" />}
                    {event.type === "Workshop" && <Users className="h-8 w-8 text-primary mb-2" />}
                    {event.type === "Event" && <Calendar className="h-8 w-8 text-primary mb-2" />}
                    {event.type === "Webinar" && <Zap className="h-8 w-8 text-primary mb-2" />}

                    <p className="font-medium">{event.date}</p>
                    {event.endDate && <p className="text-sm text-muted-foreground">to {event.endDate}</p>}

                    <Badge variant="gradient" className="mt-3">
                      {event.type}
                    </Badge>
                  </div>

                  <div className="md:w-3/4 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <Badge variant={event.price === "Free" ? "secondary" : "outline"} className="md:self-start">
                        {event.price}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground flex items-center mb-1">
                      <MapPin className="h-4 w-4 mr-1" /> {event.location}
                    </p>

                    {event.instructor && <p className="text-sm text-primary mb-3">Instructor: {event.instructor}</p>}

                    <p className="text-muted-foreground mb-4">{event.description}</p>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>
                          {event.enrolled} enrolled / {event.capacity} spots
                        </span>
                        <div className="w-32 h-2 bg-secondary rounded-full ml-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-ujjibon rounded-full"
                            style={{ width: `${(event.enrolled / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">Register Now</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No events found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria to find more events.</p>
          </div>
        )}
      </div>
    </div>
  )
}


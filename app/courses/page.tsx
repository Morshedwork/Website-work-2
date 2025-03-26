"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Search,
  Filter,
  User,
  Clock,
  CheckCircle,
  X,
  Video,
  FileText,
  MessageSquare,
  Award,
  Users,
} from "lucide-react"

// Add the import for the header at the top of the file
import CoursesHeader from "./header"

// Course type definition
type Course = {
  id: number
  title: string
  instructor: string
  price: string
  duration: string
  sessions: string
  category: string
  image: string
  badge?: {
    text: string
    variant: "default" | "secondary" | "outline" | "gradient"
  }
  enrolledStudents: number
  description: string
}

// Sample courses data
const COURSES: Course[] = [
  {
    id: 1,
    title: "Technical Interview Mastery",
    instructor: "Farhana Rahman",
    price: "৳3,500",
    duration: "8 weeks",
    sessions: "16 sessions",
    category: "technical",
    image: "/placeholder.svg?height=300&width=500",
    badge: {
      text: "Bestseller",
      variant: "default",
    },
    enrolledStudents: 125,
    description:
      "Master technical interviews for software engineering roles with hands-on practice, mock interviews, and personalized feedback.",
  },
  {
    id: 2,
    title: "Resume Building Workshop",
    instructor: "Dr. Aminul Islam",
    price: "৳1,200",
    duration: "1 day",
    sessions: "4 hours",
    category: "resume",
    image: "/placeholder.svg?height=300&width=500",
    badge: {
      text: "New",
      variant: "secondary",
    },
    enrolledStudents: 45,
    description:
      "Learn how to create an ATS-friendly resume that highlights your strengths and catches recruiters' attention.",
  },
  {
    id: 3,
    title: "Digital Marketing Fundamentals",
    instructor: "Nusrat Jahan",
    price: "৳5,000",
    duration: "4 weeks",
    sessions: "8 sessions",
    category: "marketing",
    image: "/placeholder.svg?height=300&width=500",
    badge: {
      text: "Popular",
      variant: "outline",
    },
    enrolledStudents: 78,
    description:
      "Learn SEO, social media marketing, content strategy, and analytics. Includes certification upon completion.",
  },
  {
    id: 4,
    title: "Leadership Development Program",
    instructor: "Mohammed Hasan",
    price: "৳7,500",
    duration: "6 weeks",
    sessions: "12 sessions",
    category: "leadership",
    image: "/placeholder.svg?height=300&width=500",
    enrolledStudents: 32,
    description:
      "Develop essential leadership skills including communication, team management, conflict resolution, and strategic thinking.",
  },
  {
    id: 5,
    title: "Soft Skills for Professionals",
    instructor: "Tasneem Ahmed",
    price: "৳2,800",
    duration: "3 weeks",
    sessions: "6 sessions",
    category: "soft-skills",
    image: "/placeholder.svg?height=300&width=500",
    badge: {
      text: "Recommended",
      variant: "gradient",
    },
    enrolledStudents: 56,
    description:
      "Enhance your communication, presentation, time management, and interpersonal skills for professional success.",
  },
  {
    id: 6,
    title: "Full-Stack Web Development Bootcamp",
    instructor: "Kamal Uddin",
    price: "৳12,000",
    duration: "12 weeks",
    sessions: "24 sessions",
    category: "technical",
    image: "/placeholder.svg?height=300&width=500",
    enrolledStudents: 40,
    description:
      "Comprehensive bootcamp covering modern web development technologies. Build real projects for your portfolio.",
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(COURSES)
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // Get unique categories for filters
  const categories = ["all", ...Array.from(new Set(COURSES.map((course) => course.category)))]

  // Handle search and filter
  const handleSearch = () => {
    let results = COURSES

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      results = results.filter((course) => course.category === selectedCategory)
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        results = [...results].sort((a, b) => b.enrolledStudents - a.enrolledStudents)
        break
      case "price-low":
        results = [...results].sort((a, b) => {
          const aPrice = Number.parseInt(a.price.replace(/[^\d]/g, ""))
          const bPrice = Number.parseInt(b.price.replace(/[^\d]/g, ""))
          return aPrice - bPrice
        })
        break
      case "price-high":
        results = [...results].sort((a, b) => {
          const aPrice = Number.parseInt(a.price.replace(/[^\d]/g, ""))
          const bPrice = Number.parseInt(b.price.replace(/[^\d]/g, ""))
          return bPrice - aPrice
        })
        break
      case "duration-short":
        results = [...results].sort((a, b) => {
          const aDuration = Number.parseInt(a.duration.split(" ")[0])
          const bDuration = Number.parseInt(b.duration.split(" ")[0])
          return aDuration - bDuration
        })
        break
      case "duration-long":
        results = [...results].sort((a, b) => {
          const aDuration = Number.parseInt(a.duration.split(" ")[0])
          const bDuration = Number.parseInt(b.duration.split(" ")[0])
          return bDuration - aDuration
        })
        break
      default:
        break
    }

    setFilteredCourses(results)
  }

  // Open course detail modal
  const openCourseModal = (course: Course) => {
    setSelectedCourse(course)
    setShowCourseModal(true)
  }

  // Then, at the beginning of the component's return statement, add the header
  return (
    <>
      <CoursesHeader />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Career Development Courses</h1>
          <p className="text-muted-foreground mb-8">
            Enhance your skills and boost your employability with our specialized career development courses.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses by title, instructor, or keywords"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-primary/20 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] border-primary/20">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technical">Technical Skills</SelectItem>
                  <SelectItem value="soft-skills">Soft Skills</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="resume">Resume Building</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-primary/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration-short">Duration: Shortest</SelectItem>
                  <SelectItem value="duration-long">Duration: Longest</SelectItem>
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
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="free">Free Courses</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors card-hover-effect"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {course.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant={course.badge.variant as any}
                        className={course.badge.variant === "gradient" ? "bg-gradient-ujjibon" : ""}
                      >
                        {course.badge.text}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{course.title}</h3>
                    <div className="text-lg font-bold text-primary">{course.price}</div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {course.duration} • {course.sessions}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{course.instructor}</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => openCourseModal(course)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No courses found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria to find more courses.
              </p>
            </div>
          )}

          {/* Add New Course Button */}
          <div className="text-center">
            <Link href="/#course-section">
              <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">Add Your Own Course</Button>
            </Link>
          </div>
        </div>

        {/* Course Detail Modal */}
        {showCourseModal && selectedCourse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-background rounded-xl border border-border/40 shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-background p-4 border-b border-border/40 flex justify-between items-center z-10">
                <h2 className="text-2xl font-bold">Course Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowCourseModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="relative h-64 w-full overflow-hidden rounded-xl mb-6">
                      <Image
                        src={selectedCourse.image || "/placeholder.svg"}
                        alt={selectedCourse.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <h1 className="text-3xl font-bold mb-2">{selectedCourse.title}</h1>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedCourse.badge && (
                        <Badge
                          variant={selectedCourse.badge.variant as any}
                          className={selectedCourse.badge.variant === "gradient" ? "bg-gradient-ujjibon" : ""}
                        >
                          {selectedCourse.badge.text}
                        </Badge>
                      )}
                      <Badge variant="outline">{selectedCourse.category}</Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{selectedCourse.sessions}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {selectedCourse.enrolledStudents} students enrolled
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Course Description</h3>
                        <p className="text-muted-foreground">{selectedCourse.description}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">What You'll Learn</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>Comprehensive understanding of the subject matter</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>Practical skills that can be applied immediately</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>Industry best practices and current trends</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>Personalized feedback on your progress</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>Networking opportunities with peers and professionals</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Course Curriculum</h3>
                        <div className="space-y-3">
                          <div className="p-3 border border-border rounded-lg">
                            <h4 className="font-medium">Module 1: Introduction</h4>
                            <p className="text-sm text-muted-foreground">Overview of the course and key concepts</p>
                          </div>
                          <div className="p-3 border border-border rounded-lg">
                            <h4 className="font-medium">Module 2: Core Principles</h4>
                            <p className="text-sm text-muted-foreground">Fundamental principles and methodologies</p>
                          </div>
                          <div className="p-3 border border-border rounded-lg">
                            <h4 className="font-medium">Module 3: Practical Applications</h4>
                            <p className="text-sm text-muted-foreground">
                              Hands-on exercises and real-world applications
                            </p>
                          </div>
                          <div className="p-3 border border-border rounded-lg">
                            <h4 className="font-medium">Module 4: Advanced Topics</h4>
                            <p className="text-sm text-muted-foreground">In-depth exploration of advanced concepts</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <div className="sticky top-24 bg-card rounded-xl border border-border/40 p-6 shadow-sm">
                      <div className="text-3xl font-bold mb-4 text-center">{selectedCourse.price}</div>

                      <div className="space-y-4 mb-6">
                        <Button className="w-full bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                          Enroll Now
                        </Button>
                        <Button variant="outline" className="w-full">
                          Add to Wishlist
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">This course includes:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Live sessions</span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Comprehensive course materials</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">1-on-1 feedback sessions</span>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Certificate of completion</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">Access to alumni network</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="font-semibold mb-4">Instructor</h4>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-medium">{selectedCourse.instructor}</h5>
                            <p className="text-sm text-muted-foreground">Expert Instructor</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="font-semibold mb-4">Payment Options</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Full Payment</span>
                            <span className="text-sm font-medium">{selectedCourse.price}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Installment (2x)</span>
                            <span className="text-sm font-medium">
                              {`৳${Math.round(Number.parseInt(selectedCourse.price.replace(/[^\d]/g, "")) * 0.55)} x 2`}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Early Bird</span>
                            <span className="text-sm font-medium">
                              {`৳${Math.round(Number.parseInt(selectedCourse.price.replace(/[^\d]/g, "")) * 0.8)}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}


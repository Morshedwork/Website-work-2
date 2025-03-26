"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Search, Plus, Edit, Trash2, Eye, Users, Upload, Save, Filter, MoreVertical, CheckCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
  status: "published" | "draft" | "archived"
  createdAt: string
  updatedAt: string
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
    status: "published",
    createdAt: "2025-01-15",
    updatedAt: "2025-03-10",
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
    status: "published",
    createdAt: "2025-02-20",
    updatedAt: "2025-03-15",
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
    status: "published",
    createdAt: "2025-01-05",
    updatedAt: "2025-03-01",
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
    status: "draft",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-10",
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
    status: "published",
    createdAt: "2025-02-10",
    updatedAt: "2025-03-05",
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
    status: "archived",
    createdAt: "2024-11-15",
    updatedAt: "2025-02-20",
  },
]

export default function CourseDashboardPage() {
  const [courses, setCourses] = useState<Course[]>(COURSES)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(COURSES)
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Get unique categories for filters
  const categories = ["all", ...Array.from(new Set(COURSES.map((course) => course.category)))]

  // Handle search and filter
  const handleSearch = () => {
    let results = courses

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

    // Apply status filter
    if (selectedStatus !== "all") {
      results = results.filter((course) => course.status === selectedStatus)
    }

    // Apply tab filter
    if (activeTab !== "all") {
      if (activeTab === "published") {
        results = results.filter((course) => course.status === "published")
      } else if (activeTab === "draft") {
        results = results.filter((course) => course.status === "draft")
      } else if (activeTab === "archived") {
        results = results.filter((course) => course.status === "archived")
      }
    }

    setFilteredCourses(results)
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    let results = courses

    // Apply existing filters
    if (searchTerm) {
      results = results.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      results = results.filter((course) => course.category === selectedCategory)
    }

    if (selectedStatus !== "all") {
      results = results.filter((course) => course.status === selectedStatus)
    }

    // Apply tab filter
    if (value !== "all") {
      results = results.filter((course) => course.status === value)
    }

    setFilteredCourses(results)
  }

  // Handle delete course
  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      const updatedCourses = courses.filter((course) => course.id !== courseToDelete.id)
      setCourses(updatedCourses)
      setFilteredCourses(updatedCourses)
      setIsDeleteDialogOpen(false)
      setCourseToDelete(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-muted-foreground">Manage your courses, track enrollments, and create new content</p>
        </div>
        <Button
          onClick={() => setIsAddCourseOpen(true)}
          className="bg-gradient-ujjibon hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Courses</p>
                <p className="text-3xl font-bold">{courses.length}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <BookIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Published</p>
                <p className="text-3xl font-bold">{courses.filter((c) => c.status === "published").length}</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Enrollments</p>
                <p className="text-3xl font-bold">
                  {courses.reduce((sum, course) => sum + course.enrolledStudents, 0)}
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Revenue</p>
                <p className="text-3xl font-bold">৳125,400</p>
              </div>
              <div className="bg-orange-500/10 p-3 rounded-full">
                <DollarSignIcon className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
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

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px] border-primary/20">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSearch} className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-16 rounded overflow-hidden">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-muted-foreground">{course.instructor}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.category}</Badge>
                    </TableCell>
                    <TableCell>{course.price}</TableCell>
                    <TableCell>{course.enrolledStudents}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          course.status === "published"
                            ? "default"
                            : course.status === "draft"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.updatedAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteCourse(course)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <BookIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">No courses found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search or filter criteria to find courses.
                      </p>
                      <Button
                        onClick={() => setIsAddCourseOpen(true)}
                        className="bg-gradient-ujjibon hover:opacity-90 transition-opacity"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add New Course
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Course Dialog */}
      <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Create a new course to share your knowledge and expertise with students.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" placeholder="Enter course title" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input id="instructor" placeholder="Enter instructor name" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Skills</SelectItem>
                    <SelectItem value="soft-skills">Soft Skills</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="resume">Resume Building</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Course Description</Label>
                <Textarea id="description" placeholder="Enter course description" rows={4} className="mt-1" />
              </div>

              <div>
                <Label htmlFor="course-image">Course Image</Label>
                <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop an image, or click to browse</p>
                  <Button variant="outline" size="sm">
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (BDT)</Label>
                  <Input id="price" placeholder="e.g., 3500" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger id="status" className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g., 8 weeks" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="sessions">Number of Sessions</Label>
                  <Input id="sessions" placeholder="e.g., 16" className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="curriculum">Course Curriculum</Label>
                <Textarea
                  id="curriculum"
                  placeholder="List the topics covered in your course"
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="requirements">Course Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="List any prerequisites or requirements for students"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Options</Label>
                <div className="grid grid-cols-1 gap-4 p-4 border border-border rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Switch id="full-payment" />
                    <div>
                      <Label htmlFor="full-payment" className="font-medium">
                        Full Payment
                      </Label>
                      <p className="text-sm text-muted-foreground">Students pay the full amount upfront</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Switch id="installment" />
                    <div>
                      <Label htmlFor="installment" className="font-medium">
                        Installment Plan
                      </Label>
                      <p className="text-sm text-muted-foreground">Students can pay in 2-3 installments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Switch id="early-bird" />
                    <div>
                      <Label htmlFor="early-bird" className="font-medium">
                        Early Bird Discount
                      </Label>
                      <p className="text-sm text-muted-foreground">Offer a discount for early registrations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCourseOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
              <Save className="h-4 w-4 mr-2" /> Save Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {courseToDelete && (
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <div className="relative h-10 w-16 rounded overflow-hidden">
                  <Image
                    src={courseToDelete.image || "/placeholder.svg"}
                    alt={courseToDelete.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{courseToDelete.title}</div>
                  <div className="text-sm text-muted-foreground">{courseToDelete.instructor}</div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCourse}>
              <Trash2 className="h-4 w-4 mr-2" /> Delete Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Icons
function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


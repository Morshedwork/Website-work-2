import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface CourseProps {
  variant?: "default" | "compact" | "featured"
  showHeading?: boolean
  limit?: number
  className?: string
}

export function CourseSection({ variant = "default", showHeading = true, limit = 3, className = "" }: CourseProps) {
  // Sample course data - in a real app, this would come from an API or database
  const courses = [
    {
      id: "technical-interview-mastery",
      title: "Technical Interview Mastery",
      price: 3500,
      duration: "8 weeks",
      sessions: 16,
      description:
        "Master technical interviews for software engineering roles with hands-on practice, mock interviews, and personalized feedback.",
      instructor: "Farhana Rahman",
      badge: { text: "Bestseller", variant: "primary" },
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "resume-building-workshop",
      title: "Resume Building Workshop",
      price: 1200,
      duration: "1 day",
      sessions: 4,
      description:
        "Learn how to create an ATS-friendly resume that highlights your strengths and catches recruiters' attention.",
      instructor: "Dr. Aminul Islam",
      badge: { text: "New", variant: "secondary" },
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "digital-marketing-fundamentals",
      title: "Digital Marketing Fundamentals",
      price: 5000,
      duration: "4 weeks",
      sessions: 8,
      description:
        "Learn SEO, social media marketing, content strategy, and analytics. Includes certification upon completion.",
      instructor: "Nusrat Jahan",
      badge: { text: "Popular", variant: "orange" },
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "data-science-bootcamp",
      title: "Data Science Bootcamp",
      price: 7500,
      duration: "12 weeks",
      sessions: 24,
      description:
        "Comprehensive data science training covering Python, statistics, machine learning, and real-world projects.",
      instructor: "Mahfuz Rahman",
      badge: { text: "Advanced", variant: "blue" },
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "soft-skills-masterclass",
      title: "Soft Skills Masterclass",
      price: 2000,
      duration: "2 weeks",
      sessions: 6,
      description:
        "Develop essential workplace skills including communication, leadership, teamwork, and time management.",
      instructor: "Tahmina Akter",
      badge: { text: "Essential", variant: "green" },
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "web-development-fundamentals",
      title: "Web Development Fundamentals",
      price: 4500,
      duration: "6 weeks",
      sessions: 12,
      description:
        "Learn HTML, CSS, JavaScript, and responsive design principles to build modern websites from scratch.",
      instructor: "Sakib Ahmed",
      badge: { text: "Beginner Friendly", variant: "purple" },
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  const displayCourses = courses.slice(0, limit)

  return (
    <section className={`section-padding relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
      <div className="container mx-auto max-w-5xl relative z-10">
        {showHeading && (
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-4 animate-bounce-in">
              FEATURED COURSES
            </span>
            <h2 className="section-title">Advance Your Career with Our Courses</h2>
            <p className="section-subtitle">
              Enhance your skills and boost your employability with our specialized career development courses designed
              for the Bangladesh job market.
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/courses">
                <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                  Browse All Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 ${variant === "compact" ? "md:grid-cols-2" : "md:grid-cols-3"} gap-8 mb-12`}>
          {displayCourses.map((course, index) => (
            <Card
              key={course.id}
              className={`modern-card hover-lift animate-fade-in overflow-hidden ${
                variant === "featured" && index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  {course.badge.variant === "primary" && (
                    <Badge className="bg-gradient-ujjibon">{course.badge.text}</Badge>
                  )}
                  {course.badge.variant === "secondary" && (
                    <Badge className="bg-secondary text-secondary-foreground">{course.badge.text}</Badge>
                  )}
                  {course.badge.variant === "orange" && (
                    <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                      {course.badge.text}
                    </Badge>
                  )}
                  {course.badge.variant === "blue" && (
                    <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                      {course.badge.text}
                    </Badge>
                  )}
                  {course.badge.variant === "green" && (
                    <Badge className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      {course.badge.text}
                    </Badge>
                  )}
                  {course.badge.variant === "purple" && (
                    <Badge className="bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                      {course.badge.text}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{course.title}</h3>
                  <div className="text-lg font-bold text-primary">৳{course.price.toLocaleString()}</div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {course.duration} • {course.sessions} sessions
                  </span>
                </div>
                {(variant !== "compact" || (variant === "featured" && index === 0)) && (
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{course.instructor}</span>
                  </div>
                  <Link href={`/courses/${course.id}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {variant !== "compact" && (
          <div className="flex justify-center">
            <Link href="/courses">
              <Button variant="outline" className="group">
                View All Courses <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export function RecommendedCourses({
  title = "Recommended Courses",
  className = "",
}: { title?: string; className?: string }) {
  return (
    <div className={`bg-secondary/30 rounded-xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {[
          {
            title: "Technical Interview Mastery",
            price: 3500,
            match: 95,
            reason: "Based on your CV analysis",
          },
          {
            title: "Data Structures & Algorithms",
            price: 4200,
            match: 92,
            reason: "Popular among software engineers",
          },
          {
            title: "System Design for Interviews",
            price: 5000,
            match: 88,
            reason: "Complements your technical skills",
          },
        ].map((course, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-background rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-medium">{course.title}</h4>
                <span className="text-sm font-semibold text-primary">৳{course.price}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-muted-foreground">{course.reason}</p>
                <Badge variant="outline" className="text-xs">
                  {course.match}% Match
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Link href="/courses" className="text-sm text-primary hover:underline flex items-center">
          View all recommended courses <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}


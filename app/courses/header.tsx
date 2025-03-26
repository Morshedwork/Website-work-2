import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

export default function CoursesHeader() {
  return (
    <div className="bg-gradient-to-b from-primary/10 to-background py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-4 animate-bounce-in">
            CAREER DEVELOPMENT
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Courses & Workshops</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enhance your skills and boost your employability with our specialized career development courses designed
            for the Bangladesh job market.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Link href="/courses">
            <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
              Browse All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard/courses">
            <Button variant="outline" className="border-primary/50 hover:border-primary">
              <BookOpen className="h-4 w-4 mr-2" /> My Courses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-white dark:hover:bg-white/10 transition-colors duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
            <div className="font-bold text-2xl mb-1 text-primary">25+</div>
            <div className="text-sm text-muted-foreground">Courses Available</div>
          </div>
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-white dark:hover:bg-white/10 transition-colors duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
            <div className="font-bold text-2xl mb-1 text-primary">15+</div>
            <div className="text-sm text-muted-foreground">Expert Instructors</div>
          </div>
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-white dark:hover:bg-white/10 transition-colors duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
            <div className="font-bold text-2xl mb-1 text-primary">5,000+</div>
            <div className="text-sm text-muted-foreground">Students Enrolled</div>
          </div>
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-white dark:hover:bg-white/10 transition-colors duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
            <div className="font-bold text-2xl mb-1 text-primary">95%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}


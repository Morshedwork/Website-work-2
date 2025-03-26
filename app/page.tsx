import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Search,
  FileText,
  BriefcaseBusiness,
  User,
  Zap,
  Award,
  Calendar,
  Brain,
  Sparkles,
  MessageSquare,
  Clock,
  MapPin,
  Bot,
  Cpu,
  UsersIcon,
  CheckCircle,
  Laptop,
  ClipboardCheck,
  UserCheck,
  Users,
  BookOpen,
  Phone,
  Mail,
  CalendarDays,
  X,
  Video,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import CountUp from "@/components/count-up"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Add the import for the CourseSection component at the top of the file
import { CourseSection } from "@/components/course-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Video Only */}
      <section className="bg-gradient-dark py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] opacity-20 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 animate-slide-in-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-white-shadow">Ujjibon Job Assistant</span>
                <span className="gradient-text block mt-2 animate-pulse-slow">Target Every Possibility</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl text-white-shadow">
                Bangladesh's first career counseling and community platform dedicated to empowering students in their
                job search journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 transition-all duration-300 animate-bounce-in shadow-lg hover:shadow-orange-500/20"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm animate-fade-in"
                    style={{ animationDelay: "0.3s" }}
                  >
                    Try AI Assistant
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 animate-slide-in-right">
              <div className="video-container animate-float">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="/videos/logo.mp4"
                  poster="/placeholder.svg?height=400&width=600"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex justify-center mb-3 animate-float">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CountUp end={10} suffix="+" className="text-4xl font-bold text-white" />
              <p className="text-white/80 mt-2">Events Completed</p>
            </div>

            <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex justify-center mb-3 animate-float">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <CountUp end={5000} suffix="+" className="text-4xl font-bold text-white" />
              <p className="text-white/80 mt-2">Lives Impacted</p>
            </div>

            <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex justify-center mb-3 animate-float">
                <BriefcaseBusiness className="h-8 w-8 text-white" />
              </div>
              <CountUp end={25} suffix="+" className="text-4xl font-bold text-white" />
              <p className="text-white/80 mt-2">Partner Companies</p>
            </div>

            <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex justify-center mb-3 animate-float">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CountUp end={95} suffix="%" className="text-4xl font-bold text-white" />
              <p className="text-white/80 mt-2">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-4 animate-bounce-in">
              Our Features
            </span>
            <h2 className="section-title">Comprehensive Career Support</h2>
            <p className="section-subtitle">
              Designed to help students in Bangladesh navigate their professional journey with confidence and clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="modern-card hover-lift animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 animate-float">
                  <Search className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">AI-Driven Job Recommendations</h3>
                <p className="text-muted-foreground">
                  Get personalized job matches based on your skills, interests, and qualifications.
                </p>
              </div>
            </div>

            <div className="modern-card hover-lift animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 animate-float">
                  <BriefcaseBusiness className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Job Tracking & Reminders</h3>
                <p className="text-muted-foreground">
                  Track applications, receive follow-up reminders, and get similar job recommendations.
                </p>
              </div>
            </div>

            <div className="modern-card hover-lift animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 animate-float">
                  <FileText className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Cover Letter Generator</h3>
                <p className="text-muted-foreground">
                  Generate tailored cover letters based on job details and company culture.
                </p>
              </div>
            </div>

            <div className="modern-card hover-lift animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 animate-float">
                  <User className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">CV Analysis</h3>
                <p className="text-muted-foreground">
                  Get insights on your CV's strengths and weaknesses with improvement suggestions.
                </p>
              </div>
            </div>

            <div className="modern-card hover-lift animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 animate-float">
                  <Zap className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Weekly Job Alerts</h3>
                <p className="text-muted-foreground">
                  Receive personalized job updates directly in the chat interface.
                </p>
              </div>
            </div>

            <div className="modern-card hover-lift animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 animate-float">
                  <Award className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Career Advice</h3>
                <p className="text-muted-foreground">
                  Get expert guidance on career development and job search strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section - Enhanced */}
      <CourseSection variant="featured" className="bg-gradient-to-b from-background to-secondary" />

      {/* Detailed Services Section */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-4 animate-bounce-in">
              Our Services
            </span>
            <h2 className="section-title">Comprehensive Career Support</h2>
            <p className="section-subtitle">
              Designed to help students in Bangladesh navigate their professional journey with confidence and clarity.
            </p>
          </div>

          {/* Career Counseling Service - Detailed */}
          <div className="mb-16 animate-fade-in">
            <div className="modern-card hover-glow p-0 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center animate-pulse-slow">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Career Counseling</h3>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    We offer personalized career counseling sessions to guide individuals in making informed decisions
                    about their career paths, helping them align their skills, interests, and aspirations with the right
                    opportunities.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3 hover-lift p-2 rounded-lg hover:bg-secondary">
                      <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Personalized Career Path Planning</h4>
                        <p className="text-sm text-muted-foreground">
                          Develop a customized career roadmap based on your unique skills, interests, and goals.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 hover-lift p-2 rounded-lg hover:bg-secondary">
                      <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Skill Gap Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          Identify the skills you need to develop to achieve your career goals and get recommendations
                          for relevant courses and resources.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 hover-lift p-2 rounded-lg hover:bg-secondary">
                      <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Industry Insights</h4>
                        <p className="text-sm text-muted-foreground">
                          Get up-to-date information about industry trends, job market demands, and salary expectations
                          in Bangladesh.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 hover-lift p-2 rounded-lg hover:bg-secondary">
                      <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Career Transition Guidance</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive expert advice on how to successfully transition between industries or roles with
                          minimal disruption.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link href="/mentors">
                      <Button className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-orange-500/20 animate-bounce-in">
                        Find a Career Counselor
                      </Button>
                    </Link>
                    <Link href="#book-counseling">
                      <Button
                        variant="outline"
                        className="border-primary/50 hover:border-primary animate-fade-in"
                        style={{ animationDelay: "0.3s" }}
                      >
                        Book a Session
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="md:w-1/3 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-6 flex items-center">
                  <div className="w-full">
                    <h4 className="font-semibold mb-4 text-orange-600 dark:text-orange-400">Session Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 hover-lift p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span>45-60 minutes per session</span>
                      </div>
                      <div className="flex items-center gap-2 hover-lift p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5">
                        <Users className="h-4 w-4 text-orange-500" />
                        <span>One-on-one personalized guidance</span>
                      </div>
                      <div className="flex items-center gap-2 hover-lift p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5">
                        <MapPin className="h-4 w-4 text-orange-500" />
                        <span>Online or in-person options</span>
                      </div>
                      <div className="flex items-center gap-2 hover-lift p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span>Flexible scheduling</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-orange-200/50 dark:border-orange-800/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Starting from</span>
                        <span className="text-lg font-bold text-orange-600 dark:text-orange-400">1,500 BDT</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        *Prices may vary based on counselor experience and session type
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Services Grid - Update with modern styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="service-card group animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="service-card-icon animate-float">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Skills Enhancement Programs</h3>
              <p className="text-muted-foreground">
                We provide skill development programs and training courses designed to enhance the professional
                competencies of our users, equipping them with in-demand skills for the job market.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full border-primary/50 hover:border-primary hover:shadow-lg shadow-orange-500/10 transition-all duration-300"
              >
                Explore Programs
              </Button>
            </div>

            <div className="service-card group animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="service-card-icon animate-float">
                <BriefcaseBusiness className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Job Placement Assistance</h3>
              <p className="text-muted-foreground">
                We assist individuals in finding suitable job opportunities by connecting them with our network of
                partner organizations, leveraging our industry connections to increase their chances of securing
                employment.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full border-primary/50 hover:border-primary hover:shadow-lg shadow-orange-500/10 transition-all duration-300"
              >
                View Opportunities
              </Button>
            </div>

            <div className="service-card group animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="service-card-icon animate-float">
                <Laptop className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Online Learning Platform</h3>
              <p className="text-muted-foreground">
                Our ed tech platform offers a wide range of online courses, certifications, and resources to facilitate
                continuous learning and professional development.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full border-primary/50 hover:border-primary hover:shadow-lg shadow-orange-500/10 transition-all duration-300"
              >
                Browse Courses
              </Button>
            </div>

            <div className="service-card group animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="service-card-icon animate-float">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Networking and Events</h3>
              <p className="text-muted-foreground">
                We organize networking events, workshops, and seminars to facilitate connections between individuals,
                industry professionals, and potential employers, creating valuable networking opportunities.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full border-primary/50 hover:border-primary hover:shadow-lg shadow-orange-500/10 transition-all duration-300"
              >
                Upcoming Events
              </Button>
            </div>

            <div className="service-card group animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="service-card-icon animate-float">
                <ClipboardCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Career Assessment</h3>
              <p className="text-muted-foreground">
                Take a career assessment test and identify your strengths and interests to make informed career choices.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full border-primary/50 hover:border-primary hover:shadow-lg shadow-orange-500/10 transition-all duration-300"
              >
                Take Assessment
              </Button>
            </div>

            <div className="service-card group animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="service-card-icon animate-float">
                <UserCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Professional Grooming</h3>
              <p className="text-muted-foreground">
                Improve your skills and polish your professional image with our career grooming services.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full border-primary/50 hover:border-primary hover:shadow-lg shadow-orange-500/10 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* One-on-One Counseling Booking Section */}
      <section id="book-counseling" className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-4 animate-bounce-in">
              Book Now
            </span>
            <h2 className="section-title">One-on-One Counseling Session</h2>
            <p className="section-subtitle">
              Get personalized career guidance from our expert counselors to help you navigate your professional
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-slide-in-left">
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-b border-orange-100 dark:border-orange-900/10">
                  <CardTitle className="text-gradient-primary">Schedule Your Session</CardTitle>
                  <CardDescription>
                    Fill out the form below to book a one-on-one counseling session with one of our career experts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-8">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input id="name" placeholder="Your full name" className="input-modern" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="Your email address" className="input-modern" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input id="phone" placeholder="Your phone number" className="input-modern" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="counseling-type" className="text-sm font-medium">
                          Counseling Type
                        </label>
                        <Select>
                          <SelectTrigger id="counseling-type" className="input-modern">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="career-path">Career Path Planning</SelectItem>
                            <SelectItem value="job-search">Job Search Strategy</SelectItem>
                            <SelectItem value="skill-development">Skill Development</SelectItem>
                            <SelectItem value="interview-prep">Interview Preparation</SelectItem>
                            <SelectItem value="career-transition">Career Transition</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="preferred-date" className="text-sm font-medium">
                          Preferred Date
                        </label>
                        <Input id="preferred-date" type="date" className="input-modern" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="preferred-time" className="text-sm font-medium">
                          Preferred Time
                        </label>
                        <Select>
                          <SelectTrigger id="preferred-time" className="input-modern">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                            <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Additional Information
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Please share any specific concerns or topics you'd like to discuss"
                        rows={4}
                        className="input-modern resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
                    >
                      Book Session
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8 animate-slide-in-right">
              <div>
                <h3 className="text-xl font-bold mb-4 gradient-text">Why Book a One-on-One Session?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300 hover-lift">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Personalized Guidance</h4>
                      <p className="text-sm text-muted-foreground">
                        Get advice tailored specifically to your unique situation, skills, and career goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300 hover-lift">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Expert Insights</h4>
                      <p className="text-sm text-muted-foreground">
                        Learn from experienced professionals who understand the Bangladesh job market.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300 hover-lift">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Actionable Advice</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive concrete steps and strategies you can implement immediately.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300 hover-lift">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Confidential Environment</h4>
                      <p className="text-sm text-muted-foreground">
                        Discuss your career concerns and aspirations in a private, supportive setting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl animate-fade-in">
                <h3 className="text-xl font-bold mb-4 gradient-text">Contact Us Directly</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 hover-lift">
                    <Phone className="h-5 w-5 text-orange-500" />
                    <span>+880 1234 567890</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 hover-lift">
                    <Mail className="h-5 w-5 text-orange-500" />
                    <span>counseling@ujjibon.com</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 hover-lift">
                    <CalendarDays className="h-5 w-5 text-orange-500" />
                    <span>Available 7 days a week, 9AM - 8PM</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-primary p-6 rounded-xl text-white animate-pulse-slow">
                <h3 className="text-xl font-bold mb-2">Special Offer</h3>
                <p className="mb-4">Book your first counseling session and get a free CV review worth 1,000 BDT!</p>
                <p className="text-sm">*Offer valid for new clients only. Limited time offer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-4 animate-bounce-in">
              Trusted By
            </span>
            <h2 className="section-title">Our Partners</h2>
            <p className="section-subtitle">
              We collaborate with leading companies and organizations in Bangladesh to provide the best opportunities
              for our users.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {[
              "/images/partners/partner1.jpg",
              "/images/partners/partner2.jpg",
              "/images/partners/partner3.jpg",
              "/images/partners/partner4.jpg",
              "/images/partners/partner5.jpg",
              "/images/partners/partner6.jpg",
              "/images/partners/partner7.jpg",
              "/images/partners/partner8.jpg",
              "/images/partners/partner9.jpg",
              "/images/partners/partner10.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[150px] h-[80px] flex items-center justify-center hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative w-full h-full">
                  <Image src={src || "/placeholder.svg"} alt={`Partner ${i + 1}`} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="border-primary/50 hover:border-primary hover:shadow-lg shadow-orange-500/10 transition-all duration-300 animate-bounce-in"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      {/* Peer AI Section */}
      <section className="py-20 px-4 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/tech-bg.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 animate-slide-in-left">
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm animate-bounce-in">
                NEW FEATURE
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-white-shadow">
                Meet <span className="gradient-text animate-pulse-slow">Peer AI</span>
              </h2>
              <p className="text-xl text-white/80 mb-6">
                Your personal AI career companion that understands the unique challenges of Bangladesh's job market.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4 hover:-translate-y-1 hover:translate-x-1 transition-transform duration-300 p-2 rounded-lg hover:bg-white/5">
                  <div className="bg-gradient-primary w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-float">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white-shadow mb-1">Conversational Career Guidance</h3>
                    <p className="text-white/70">
                      Chat naturally with Peer AI about your career goals, challenges, and questions. Get personalized
                      advice tailored to your unique situation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 hover:-translate-y-1 hover:translate-x-1 transition-transform duration-300 p-2 rounded-lg hover:bg-white/5">
                  <div className="bg-gradient-primary w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-float">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white-shadow mb-1">Advanced CV Analysis</h3>
                    <p className="text-white/70">
                      Upload your CV for detailed analysis. Peer AI identifies strengths, weaknesses, and provides
                      actionable improvements based on industry standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 hover:-translate-y-1 hover:translate-x-1 transition-transform duration-300 p-2 rounded-lg hover:bg-white/5">
                  <div className="bg-gradient-primary w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-float">
                    <Cpu className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white-shadow mb-1">Real-time Job Market Insights</h3>
                    <p className="text-white/70">
                      Get up-to-date information on industry trends, salary ranges, and in-demand skills specific to
                      Bangladesh's job market.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 hover:-translate-y-1 hover:translate-x-1 transition-transform duration-300 p-2 rounded-lg hover:bg-white/5">
                  <div className="bg-gradient-primary w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-float">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white-shadow mb-1">Interview Preparation</h3>
                    <p className="text-white/70">
                      Practice with AI-simulated interviews tailored to specific roles. Receive feedback on your
                      responses and tips for improvement.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/peer-ai">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-orange-500/20 animate-bounce-in"
                >
                  Try Peer AI Now
                </Button>
              </Link>
            </div>

            <div className="md:w-1/2 mt-8 md:mt-0 animate-slide-in-right">
              <div className="glass-card rounded-xl border border-white/10 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform perspective-1000 rotate-y-5 rotate-x-5 hover:rotate-y-0 hover:rotate-x-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-primary w-8 h-8 rounded-full flex items-center justify-center animate-pulse-slow">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-white-shadow">Peer AI</h3>
                  </div>
                  <Badge variant="outline" className="text-white border-white/20 animate-pulse-slow">
                    Online
                  </Badge>
                </div>

                <div className="space-y-4 mb-4">
                  <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="bg-gradient-primary w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 animate-float">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white/10 rounded-lg rounded-tl-none p-3 text-white/90 max-w-[80%] hover-lift">
                      Hello! I'm Peer AI, your career assistant. How can I help you today?
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <div className="bg-primary/10 rounded-lg rounded-tr-none p-3 text-white/90 max-w-[80%] hover-lift">
                      I'm a computer science graduate looking for entry-level software developer roles in Dhaka. Any
                      advice?
                    </div>
                    <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 animate-float">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "0.8s" }}>
                    <div className="bg-gradient-primary w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 animate-float">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white/10 rounded-lg rounded-tl-none p-3 text-white/90 max-w-[80%] hover-lift">
                      <p className="mb-2">
                        Great to meet you! For entry-level software developer roles in Dhaka, I recommend:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Focus on building a portfolio with 2-3 projects showcasing React, Node.js, and MongoDB</li>
                        <li>
                          Target companies like BJIT, Brain Station 23, and TigerIT who regularly hire fresh graduates
                        </li>
                        <li>Prepare for technical interviews by practicing data structures and algorithms</li>
                      </ol>
                      <p className="mt-2">
                        Would you like me to analyze your CV or help you prepare for technical interviews?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask Peer AI anything..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  />
                  <Button className="absolute right-1 top-1 bg-gradient-primary hover:opacity-90 transition-all duration-300 h-9 w-9 p-0 rounded-lg">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-center mt-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FileText className="h-3 w-3 mr-1" /> Upload CV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <MessageSquare className="h-3 w-3 mr-1" /> Practice Interview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <Search className="h-3 w-3 mr-1" /> Find Jobs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Career Solutions */}
      <section className="py-20 px-4 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/career-bg.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm animate-bounce-in">
              POWERED BY AI
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white-shadow">AI-Powered Career Solutions</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our advanced AI technologies provide personalized career guidance tailored to your unique profile and the
              Bangladesh job market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="glass-card rounded-xl p-8 border border-white/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center mb-6 animate-float">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white-shadow">Skill Gap Analysis</h3>
              <p className="text-white/80">
                Our AI analyzes your skills against job requirements to identify gaps and recommend targeted learning
                resources.
              </p>
            </div>

            <div
              className="glass-card rounded-xl p-8 border border-white/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center mb-6 animate-float">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white-shadow">Career Path Prediction</h3>
              <p className="text-white/80">
                Using data from thousands of career trajectories, our AI predicts optimal career paths based on your
                profile.
              </p>
            </div>

            <div
              className="glass-card rounded-xl p-8 border border-white/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center mb-6 animate-float">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white-shadow">Interview Simulation</h3>
              <p className="text-white/80">
                Practice with our AI interviewer that simulates real interview scenarios and provides feedback to
                improve your performance and confidence.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/20 animate-bounce-in"
              >
                Try AI Career Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-dark py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cta-bg.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white-shadow animate-fade-in">
            Ready to Find Your Dream Job?
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto text-white/80 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Start chatting with our AI assistant and discover the best job opportunities in Bangladesh.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/20 animate-bounce-in"
              >
                Create Your Profile
              </Button>
            </Link>
            <Link href="/chat">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                Chat with Job Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )

  // Add this component before the closing bracket of the Home component
}

function CourseDetailModal() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background rounded-xl border border-border/40 shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background p-4 border-b border-border/40 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">Course Details</h2>
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="relative h-64 w-full overflow-hidden rounded-xl mb-6">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Technical Interview Mastery"
                  fill
                  className="object-cover"
                />
              </div>

              <h1 className="text-3xl font-bold mb-2">Technical Interview Mastery</h1>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-gradient-ujjibon">Bestseller</Badge>
                <Badge variant="outline">Technical Skills</Badge>
                <Badge variant="outline">Career Development</Badge>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">8 weeks</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">16 sessions</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">25 students enrolled</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Course Description</h3>
                  <p className="text-muted-foreground">
                    Master technical interviews for software engineering roles with our comprehensive course. This
                    program is designed to help you excel in technical interviews at top tech companies in Bangladesh
                    and beyond. Through hands-on practice, mock interviews, and personalized feedback, you'll develop
                    the skills and confidence needed to tackle even the most challenging technical interviews.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">What You'll Learn</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Data structures and algorithms fundamentals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Problem-solving techniques and approaches</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>System design principles for both frontend and backend</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Behavioral interview strategies specific to tech roles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Mock interviews with real-time feedback</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Course Curriculum</h3>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium">Week 1-2: Data Structures & Algorithms Foundations</h4>
                      <p className="text-sm text-muted-foreground">
                        Arrays, linked lists, stacks, queues, trees, graphs, and basic algorithms
                      </p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium">Week 3-4: Advanced Algorithms & Problem Solving</h4>
                      <p className="text-sm text-muted-foreground">
                        Sorting, searching, dynamic programming, greedy algorithms
                      </p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium">Week 5-6: System Design</h4>
                      <p className="text-sm text-muted-foreground">
                        Scalability, database design, API design, microservices
                      </p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium">Week 7-8: Mock Interviews & Feedback</h4>
                      <p className="text-sm text-muted-foreground">
                        Practice interviews with industry professionals, personalized feedback
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl border border-border/40 p-6 shadow-sm">
                <div className="text-3xl font-bold mb-4 text-center">৳3,500</div>

                <div className="space-y-4 mb-6">
                  <Button className="w-full bg-gradient-ujjibon hover:opacity-90 transition-opacity">Enroll Now</Button>
                  <Button variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">This course includes:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Video className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">16 live sessions</span>
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
                      <h5 className="font-medium">Farhana Rahman</h5>
                      <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-4">Payment Options</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Full Payment</span>
                      <span className="text-sm font-medium">৳3,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Installment (2x)</span>
                      <span className="text-sm font-medium">৳1,800 x 2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Early Bird (until May 15)</span>
                      <span className="text-sm font-medium">৳2,800</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


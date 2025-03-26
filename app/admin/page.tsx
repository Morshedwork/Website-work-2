"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  Settings,
  BarChart,
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  Upload,
  Save,
  Globe,
  BriefcaseBusiness,
  Bot,
} from "lucide-react"
import Image from "next/image"

// Import the AI settings component
import AISettings from "./ai"

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Top 10 In-Demand Skills for Bangladesh's Tech Industry in 2025",
      status: "Published",
      date: "2025-03-15",
      author: "Admin",
      category: "Career Advice",
      views: 1245,
    },
    {
      id: 2,
      title: "How to Prepare for Technical Interviews at Bangladesh's Top Companies",
      status: "Draft",
      date: "2025-03-20",
      author: "Admin",
      category: "Interview Tips",
      views: 0,
    },
    {
      id: 3,
      title: "The Ultimate Guide to Remote Work Opportunities for Bangladeshi Professionals",
      status: "Published",
      date: "2025-03-10",
      author: "Admin",
      category: "Job Search",
      views: 987,
    },
  ])

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Technical Interview Masterclass",
      type: "Workshop",
      date: "2025-04-15",
      location: "Online",
      registrations: 18,
    },
    {
      id: 2,
      title: "Resume Building Workshop",
      type: "Workshop",
      date: "2025-04-22",
      location: "Dhaka University",
      registrations: 25,
    },
    {
      id: 3,
      title: "Digital Marketing Fundamentals",
      type: "Course",
      date: "2025-05-05",
      location: "Online",
      registrations: 32,
    },
  ])

  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: "Dr. Aminul Islam",
      title: "Senior HR Consultant",
      specialties: ["Career Transitions", "Leadership Development"],
      sessions: 120,
    },
    {
      id: 2,
      name: "Farhana Rahman",
      title: "Tech Industry Specialist",
      specialties: ["Software Engineering", "Product Management"],
      sessions: 95,
    },
    {
      id: 3,
      name: "Mohammed Hasan",
      title: "Entrepreneurship Coach",
      specialties: ["Startups", "Business Development"],
      sessions: 78,
    },
  ])

  return (
    <div className="min-h-screen bg-secondary/50 overflow-x-hidden">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border h-screen sticky top-0 hidden md:block">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative h-8 w-24">
                <Image src="/images/ujjibon-logo.png" alt="Ujjibon Logo" fill className="object-contain" />
              </div>
              <span className="font-bold">Admin</span>
            </div>

            <nav className="space-y-1">
              <NavItem
                icon={<LayoutDashboard className="h-5 w-5" />}
                label="Dashboard"
                active={activeTab === "dashboard"}
                onClick={() => setActiveTab("dashboard")}
              />
              <NavItem
                icon={<FileText className="h-5 w-5" />}
                label="Blog Posts"
                active={activeTab === "blog"}
                onClick={() => setActiveTab("blog")}
              />
              <NavItem
                icon={<Calendar className="h-5 w-5" />}
                label="Events & Courses"
                active={activeTab === "events"}
                onClick={() => setActiveTab("events")}
              />
              <NavItem
                icon={<Users className="h-5 w-5" />}
                label="Mentors"
                active={activeTab === "mentors"}
                onClick={() => setActiveTab("mentors")}
              />
              <NavItem
                icon={<BriefcaseBusiness className="h-5 w-5" />}
                label="Jobs"
                active={activeTab === "jobs"}
                onClick={() => setActiveTab("jobs")}
              />
              <NavItem
                icon={<Bot className="h-5 w-5" />}
                label="AI Settings"
                active={activeTab === "ai"}
                onClick={() => setActiveTab("ai")}
              />
              <NavItem
                icon={<Globe className="h-5 w-5" />}
                label="SEO"
                active={activeTab === "seo"}
                onClick={() => setActiveTab("seo")}
              />
              <NavItem
                icon={<BarChart className="h-5 w-5" />}
                label="Analytics"
                active={activeTab === "analytics"}
                onClick={() => setActiveTab("analytics")}
              />
              <NavItem
                icon={<Settings className="h-5 w-5" />}
                label="Settings"
                active={activeTab === "settings"}
                onClick={() => setActiveTab("settings")}
              />
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Users"
                  value="1,245"
                  change="+12.5%"
                  icon={<Users className="h-8 w-8 text-primary" />}
                />
                <StatCard
                  title="Job Applications"
                  value="3,872"
                  change="+8.2%"
                  icon={<BriefcaseBusiness className="h-8 w-8 text-primary" />}
                />
                <StatCard
                  title="AI Interactions"
                  value="15,623"
                  change="+24.7%"
                  icon={<Bot className="h-8 w-8 text-primary" />}
                />
                <StatCard
                  title="Event Registrations"
                  value="428"
                  change="+5.3%"
                  icon={<Calendar className="h-8 w-8 text-primary" />}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Blog Posts</CardTitle>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("blog")}>
                        View All <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogPosts.map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">{post.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{post.date}</span>
                              <span>•</span>
                              <Badge variant={post.status === "Published" ? "default" : "secondary"}>
                                {post.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Upcoming Events</CardTitle>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("events")}>
                        View All <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{event.date}</span>
                              <span>•</span>
                              <Badge>{event.type}</Badge>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">{event.registrations} registrations</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Blog Posts */}
          {activeTab === "blog" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <Button className="gap-2 bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                  <PlusCircle className="h-4 w-4" /> New Post
                </Button>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search posts..." className="pl-10" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="newest">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="views">Most Views</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 bg-secondary text-sm font-medium">
                      <div className="col-span-5">Title</div>
                      <div className="col-span-2">Category</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-1">Views</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {blogPosts.map((post) => (
                      <div key={post.id} className="grid grid-cols-12 p-4 border-t border-border items-center">
                        <div className="col-span-5">
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-muted-foreground">By {post.author}</div>
                        </div>
                        <div className="col-span-2">
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                        <div className="col-span-2 text-muted-foreground">{post.date}</div>
                        <div className="col-span-1 text-muted-foreground">{post.views}</div>
                        <div className="col-span-2 flex justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Blog Post</CardTitle>
                    <CardDescription>
                      Create and publish a new blog post to share career advice, job market insights, or success
                      stories.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Post Title</Label>
                        <Input id="title" placeholder="Enter post title" className="mt-1" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select defaultValue="career">
                            <SelectTrigger id="category" className="mt-1">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="career">Career Advice</SelectItem>
                              <SelectItem value="interview">Interview Tips</SelectItem>
                              <SelectItem value="job">Job Search</SelectItem>
                              <SelectItem value="skill">Skill Development</SelectItem>
                              <SelectItem value="success">Success Stories</SelectItem>
                            </SelectContent>
                          </Select>
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

                      <div>
                        <Label htmlFor="featured-image">Featured Image</Label>
                        <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop an image, or click to browse
                          </p>
                          <Button variant="outline" size="sm">
                            Upload Image
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="content">Content</Label>
                        <div className="mt-1 border border-border rounded-lg p-2">
                          <div className="flex items-center border-b border-border p-2 gap-2">
                            <Button variant="ghost" size="sm">
                              Heading
                            </Button>
                            <Button variant="ghost" size="sm">
                              Bold
                            </Button>
                            <Button variant="ghost" size="sm">
                              Italic
                            </Button>
                            <Button variant="ghost" size="sm">
                              Link
                            </Button>
                            <Button variant="ghost" size="sm">
                              List
                            </Button>
                            <Button variant="ghost" size="sm">
                              Image
                            </Button>
                          </div>
                          <Textarea
                            id="content"
                            placeholder="Write your blog post content here..."
                            className="min-h-[300px] border-0 focus-visible:ring-0 resize-none"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">SEO Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="meta-title">Meta Title</Label>
                            <Input id="meta-title" placeholder="Enter meta title" className="mt-1" />
                          </div>

                          <div>
                            <Label htmlFor="meta-description">Meta Description</Label>
                            <Textarea
                              id="meta-description"
                              placeholder="Enter meta description"
                              className="mt-1"
                              rows={3}
                            />
                          </div>

                          <div>
                            <Label htmlFor="keywords">Keywords</Label>
                            <Input id="keywords" placeholder="Enter keywords separated by commas" className="mt-1" />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Save as Draft</Button>
                        <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                          Publish Post
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* SEO Settings */}
          {activeTab === "seo" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">SEO Settings</h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Global SEO Settings</CardTitle>
                    <CardDescription>
                      Configure global SEO settings that apply to all pages of your website.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="site-title">Site Title</Label>
                        <Input id="site-title" defaultValue="Job Assistant BD | Ujjibon" className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="site-description">Site Description</Label>
                        <Textarea
                          id="site-description"
                          defaultValue="Bangladesh's first AI-powered career counseling platform dedicated to empowering students in their job search journey."
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="keywords">Global Keywords</Label>
                        <Input
                          id="keywords"
                          defaultValue="career counseling, job search, Bangladesh, students, AI career assistant, job matching"
                          className="mt-1"
                        />
                        <p className="text-sm text-muted-foreground mt-1">Separate keywords with commas</p>
                      </div>

                      <div>
                        <Label htmlFor="robots">Robots Meta Tag</Label>
                        <Select defaultValue="index-follow">
                          <SelectTrigger id="robots" className="mt-1">
                            <SelectValue placeholder="Select robots meta tag" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="index-follow">index, follow</SelectItem>
                            <SelectItem value="noindex-follow">noindex, follow</SelectItem>
                            <SelectItem value="index-nofollow">index, nofollow</SelectItem>
                            <SelectItem value="noindex-nofollow">noindex, nofollow</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="social-image">Social Media Image</Label>
                          <p className="text-sm text-muted-foreground">Used when sharing on social media platforms</p>
                        </div>
                        <Button variant="outline">Upload Image</Button>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">Analytics Integration</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="google-analytics">Google Analytics ID</Label>
                            <Input id="google-analytics" placeholder="e.g., G-XXXXXXXXXX" className="mt-1" />
                          </div>

                          <div>
                            <Label htmlFor="google-tag-manager">Google Tag Manager ID</Label>
                            <Input id="google-tag-manager" placeholder="e.g., GTM-XXXXXXX" className="mt-1" />
                          </div>

                          <div>
                            <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                            <Input id="facebook-pixel" placeholder="e.g., XXXXXXXXXXXXXXXXXX" className="mt-1" />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                          <Save className="h-4 w-4 mr-2" />
                          Save Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Page-Specific SEO</CardTitle>
                      <CardDescription>Configure SEO settings for specific pages of your website.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Select defaultValue="home">
                          <SelectTrigger>
                            <SelectValue placeholder="Select page" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">Home Page</SelectItem>
                            <SelectItem value="jobs">Jobs Page</SelectItem>
                            <SelectItem value="mentors">Mentors Page</SelectItem>
                            <SelectItem value="events">Events Page</SelectItem>
                            <SelectItem value="chat">Chat Page</SelectItem>
                            <SelectItem value="cv">CV Analysis Page</SelectItem>
                          </SelectContent>
                        </Select>

                        <div>
                          <Label htmlFor="page-title">Page Title</Label>
                          <Input
                            id="page-title"
                            defaultValue="Ujjibon - Bangladesh's First AI-Powered Career Platform"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="page-description">Meta Description</Label>
                          <Textarea
                            id="page-description"
                            defaultValue="Ujjibon helps students in Bangladesh find their dream jobs with AI-powered career guidance, job matching, and personalized advice."
                            className="mt-1"
                            rows={3}
                          />
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-muted-foreground">Recommended: 150-160 characters</p>
                            <p className="text-sm text-muted-foreground">Characters: 123/160</p>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="page-keywords">Page Keywords</Label>
                          <Input
                            id="page-keywords"
                            defaultValue="career platform, job search Bangladesh, AI career guidance, student jobs"
                            className="mt-1"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch id="canonical" />
                          <Label htmlFor="canonical">Use canonical URL</Label>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                            Save Page SEO
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Preview</CardTitle>
                      <CardDescription>Preview how your page will appear in search engine results.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border border-border rounded-lg p-4 space-y-2">
                        <div className="text-blue-600 text-xl font-medium">
                          Ujjibon - Bangladesh's First AI-Powered Career Platform
                        </div>
                        <div className="text-green-700 text-sm">https://ujjibon.com/</div>
                        <div className="text-sm text-gray-600">
                          Ujjibon helps students in Bangladesh find their dream jobs with AI-powered career guidance,
                          job matching, and personalized advice.
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">SEO Analysis</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <p className="text-sm">Title length is optimal</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <p className="text-sm">Meta description is well-written</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                            <p className="text-sm">Consider adding more specific keywords</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <p className="text-sm">URL structure is clean and readable</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* AI Settings */}
          {activeTab === "ai" && (
            <div>
              <AISettings />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AdminPage() {
  const router = useRouter()

  // In a real application, this would check for proper authentication
  // This is just a simple demo implementation
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Simple check for demo purposes - in a real app, use proper auth
      const isAuthenticated = sessionStorage.getItem("adminAuthenticated") === "true"

      if (!isAuthenticated) {
        router.push("/admin/access")
      }
    }
  }, [router])

  // Set admin authenticated for demo purposes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("adminAuthenticated", "true")
    }
  }, [])

  return <AdminDashboardContent />
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition-colors ${
        active ? "bg-primary/10 text-primary" : "hover:bg-secondary text-foreground"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function StatCard({ title, value, change, icon }) {
  const isPositive = change.startsWith("+")

  return (
    <Card className="overflow-visible">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p className={`text-sm mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>{change} from last month</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage


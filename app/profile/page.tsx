"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  FileText,
  Upload,
  Loader2,
} from "lucide-react"
import { extractProfileFromCV } from "@/lib/ai-actions"
import { useAuth } from "@/lib/auth-context"
import ProtectedRoute from "@/components/protected-route"
import CareerRoadmapComponent from "@/components/career-roadmap"
import CounsellorMatcher from "@/components/counsellor-matcher"

type ProfileData = {
  name: string
  email: string
  phone: string
  location: string
  education: {
    degree: string
    institution: string
    year: string
  }[]
  experience: {
    title: string
    company: string
    duration: string
    description: string
  }[]
  skills: {
    name: string
    level: number
  }[]
  strengths: string[]
  weaknesses: string[]
  recommendedJobs: {
    title: string
    company: string
    link: string
    match: number
  }[]
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, updateUser } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  // Sample profile data for demonstration
  const sampleProfile: ProfileData = {
    name: user?.name || "Student",
    email: user?.email || "student@example.com",
    phone: "+880 1712 345678",
    location: "Dhaka, Bangladesh",
    education: [
      {
        degree: "BSc in Computer Science",
        institution: "Bangladesh University of Engineering and Technology",
        year: "2018-2022",
      },
      {
        degree: "Higher Secondary Certificate",
        institution: "Dhaka College",
        year: "2016-2018",
      },
    ],
    experience: [
      {
        title: "Junior Web Developer",
        company: "TechBD Solutions",
        duration: "2022-2023",
        description: "Developed and maintained web applications using React and Node.js.",
      },
      {
        title: "Web Development Intern",
        company: "DataSoft Systems",
        duration: "2021 (3 months)",
        description: "Assisted in frontend development using HTML, CSS, and JavaScript.",
      },
    ],
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "Node.js", level: 70 },
      { name: "HTML/CSS", level: 90 },
      { name: "MongoDB", level: 65 },
      { name: "Python", level: 60 },
    ],
    strengths: [
      "Strong frontend development skills with React",
      "Good understanding of responsive design principles",
      "Experience with modern JavaScript frameworks",
      "Ability to work in a team environment",
    ],
    weaknesses: [
      "Limited experience with backend technologies",
      "Needs improvement in database design",
      "No experience with cloud deployment",
    ],
    recommendedJobs: [
      {
        title: "Frontend Developer",
        company: "BrainStation-23",
        link: "https://example.com/job/1",
        match: 92,
      },
      {
        title: "React Developer",
        company: "BJIT Group",
        link: "https://example.com/job/2",
        match: 88,
      },
      {
        title: "UI Developer",
        company: "Kaz Software",
        link: "https://example.com/job/3",
        match: 85,
      },
      {
        title: "Web Application Developer",
        company: "Nascenia",
        link: "https://example.com/job/4",
        match: 80,
      },
    ],
  }

  useEffect(() => {
    // For demonstration, we're using the sample profile
    // In a real app, you would fetch this from your backend
    if (user) {
      setProfileData({
        ...sampleProfile,
        name: user.name,
        email: user.email,
      })

      // Mark profile as completed
      if (!user.profileCompleted) {
        updateUser({ profileCompleted: true })
      }
    }
  }, [user])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return
    setFile(selectedFile)
  }

  const handleProfileExtraction = async () => {
    if (!file) return

    setIsLoading(true)

    try {
      // Read file content
      const fileContent = await readFileAsText(file)

      // Extract profile using AI
      const extractedProfile = await extractProfileFromCV(fileContent)

      // Update profile data
      setProfileData({
        ...extractedProfile,
        name: user?.name || extractedProfile.name,
        email: user?.email || extractedProfile.email,
      })

      // Mark profile as completed
      updateUser({ profileCompleted: true })

      // Show success message
      alert("Profile successfully extracted from CV!")
    } catch (error) {
      console.error("Error extracting profile:", error)
      alert("An error occurred while extracting your profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target?.result as string)
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsText(file)
    })
  }

  return (
    <ProtectedRoute>
      {!profileData ? (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[70vh]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create Your Profile</CardTitle>
              <CardDescription>Upload your CV to automatically create your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6">
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="cv-upload" className="flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">{file ? file.name : "Drag & drop or click to upload"}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOC, DOCX, and TXT files</p>
                  <Button variant="outline" type="button">
                    Select CV
                  </Button>
                </label>
              </div>

              {file && (
                <Button onClick={handleProfileExtraction} className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Extracting Profile...
                    </>
                  ) : (
                    "Create Profile from CV"
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profileData.name} />
                      <AvatarFallback>
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{profileData.name}</h2>
                    <p className="text-muted-foreground">{profileData.location}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Contact Information</h3>
                      <div className="text-sm space-y-1">
                        <p>{profileData.email}</p>
                        <p>{profileData.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Skills</h3>
                      <div className="space-y-3">
                        {profileData.skills.map((skill, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" className="w-full" onClick={() => router.push("/cv-analysis")}>
                        <FileText className="h-4 w-4 mr-2" />
                        Update CV
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="education">Education & Experience</TabsTrigger>
                  <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
                  <TabsTrigger value="jobs">Recommended Jobs</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {profileData.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                          Areas for Improvement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {profileData.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Job Matches</CardTitle>
                      <CardDescription>Jobs that match your skills and experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {profileData.recommendedJobs.slice(0, 2).map((job, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border border-border rounded-lg p-4"
                          >
                            <div>
                              <h3 className="font-medium">{job.title}</h3>
                              <p className="text-sm text-muted-foreground">{job.company}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">{job.match}% Match</Badge>
                              <a href={job.link} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => document.querySelector('[data-value="jobs"]')?.click()}
                        >
                          View All Recommended Jobs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2" />
                          Education
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {profileData.education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-primary pl-4 pb-2">
                              <h3 className="font-medium">{edu.degree}</h3>
                              <p className="text-muted-foreground">{edu.institution}</p>
                              <p className="text-sm text-muted-foreground">{edu.year}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Briefcase className="h-5 w-5 mr-2" />
                          Work Experience
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {profileData.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 border-primary pl-4 pb-2">
                              <h3 className="font-medium">{exp.title}</h3>
                              <p className="text-muted-foreground">{exp.company}</p>
                              <p className="text-sm text-muted-foreground">{exp.duration}</p>
                              <p className="mt-2">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="roadmap">
                  <div className="space-y-6">
                    <CareerRoadmapComponent userProfile={profileData} />
                    <CounsellorMatcher userProfile={profileData} />
                  </div>
                </TabsContent>

                <TabsContent value="jobs">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Jobs</CardTitle>
                      <CardDescription>Jobs that match your skills and experience, updated daily</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {profileData.recommendedJobs.map((job, index) => (
                          <div key={index} className="border border-border rounded-lg p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <h3 className="font-medium">{job.title}</h3>
                                <p className="text-sm text-muted-foreground">{job.company}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge variant="secondary">{job.match}% Match</Badge>
                                <a href={job.link} target="_blank" rel="noopener noreferrer">
                                  <Button>Apply Now</Button>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  )
}


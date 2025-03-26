"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, CheckCircle, BookOpen, Globe, Users } from "lucide-react"
import type { CareerRoadmap, RoadmapStage, Resource } from "@/lib/career-roadmap"
import Link from "next/link"

interface CareerRoadmapProps {
  userProfile: any
  roadmap?: CareerRoadmap
  isLoading?: boolean
}

export default function CareerRoadmapComponent({ userProfile, roadmap, isLoading = false }: CareerRoadmapProps) {
  const [activeTab, setActiveTab] = useState("short-term")

  // Sample roadmap data for preview
  const sampleRoadmap: CareerRoadmap = roadmap || {
    currentStage: "Early Career Professional",
    shortTerm: [
      {
        title: "Skill Development",
        description: "Focus on building core technical skills and gaining practical experience",
        timeframe: "6-12 months",
        milestones: [
          "Complete 2-3 courses in relevant technologies",
          "Build a portfolio with 2-3 projects",
          "Contribute to open-source projects",
          "Attend industry meetups and networking events",
        ],
      },
      {
        title: "Professional Certification",
        description: "Obtain industry-recognized certifications to validate your skills",
        timeframe: "3-6 months",
        milestones: [
          "Research relevant certifications for your field",
          "Prepare and study for certification exams",
          "Pass certification exam",
          "Add certification to resume and LinkedIn profile",
        ],
      },
    ],
    mediumTerm: [
      {
        title: "Career Advancement",
        description: "Seek opportunities for growth and advancement within your organization or industry",
        timeframe: "2-3 years",
        milestones: [
          "Take on leadership roles in projects",
          "Mentor junior team members",
          "Develop management and leadership skills",
          "Seek promotion or advanced position",
        ],
      },
      {
        title: "Industry Specialization",
        description: "Develop expertise in a specific area of your field",
        timeframe: "1-2 years",
        milestones: [
          "Identify high-demand specialization",
          "Complete advanced training in specialization",
          "Build projects showcasing specialized skills",
          "Network with experts in the specialization",
        ],
      },
    ],
    longTerm: [
      {
        title: "Leadership Position",
        description: "Move into a senior leadership or management role",
        timeframe: "5+ years",
        milestones: [
          "Develop strategic thinking skills",
          "Build a strong professional network",
          "Gain experience managing teams and projects",
          "Consider advanced degree or executive education",
        ],
      },
      {
        title: "Industry Recognition",
        description: "Establish yourself as a thought leader in your field",
        timeframe: "5-10 years",
        milestones: [
          "Speak at industry conferences",
          "Publish articles or research",
          "Mentor other professionals",
          "Participate in industry associations",
        ],
      },
    ],
    skills: {
      technical: [
        "Programming languages (JavaScript, Python)",
        "Web development frameworks",
        "Database management",
        "Cloud computing",
        "DevOps practices",
      ],
      soft: ["Communication", "Leadership", "Problem-solving", "Time management", "Teamwork"],
    },
    resources: [
      {
        type: "course",
        title: "Full-Stack Web Development",
        description: "Comprehensive course covering modern web development",
        link: "/courses/web-development",
      },
      {
        type: "book",
        title: "The Pragmatic Programmer",
        description: "Essential guide for software developers",
        link: "https://example.com/book",
      },
      {
        type: "website",
        title: "freeCodeCamp",
        description: "Free coding challenges and tutorials",
        link: "https://www.freecodecamp.org/",
      },
      {
        type: "community",
        title: "Bangladesh Developer Community",
        description: "Local tech community for networking and learning",
        link: "https://example.com/community",
      },
    ],
  }

  const renderStage = (stage: RoadmapStage, index: number) => (
    <Card key={index} className="mb-4 border-primary/20 hover:border-primary/50 transition-colors hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{stage.title}</CardTitle>
            <CardDescription>{stage.timeframe}</CardDescription>
          </div>
          <Badge variant="outline">{`Stage ${index + 1}`}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{stage.description}</p>
        <div className="space-y-2">
          <h4 className="font-medium">Key Milestones:</h4>
          <ul className="space-y-2">
            {stage.milestones.map((milestone, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>{milestone}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )

  const renderResource = (resource: Resource, index: number) => {
    const icons = {
      course: <BookOpen className="h-5 w-5" />,
      book: <BookOpen className="h-5 w-5" />,
      website: <Globe className="h-5 w-5" />,
      community: <Users className="h-5 w-5" />,
    }

    return (
      <div
        key={index}
        className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          {icons[resource.type]}
        </div>
        <div>
          <h4 className="font-medium">{resource.title}</h4>
          <p className="text-sm text-muted-foreground">{resource.description}</p>
          {resource.link && (
            <Link href={resource.link} className="text-sm text-primary hover:underline flex items-center mt-1">
              View resource <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          )}
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Generating Your Career Roadmap</CardTitle>
          <CardDescription>
            Please wait while we analyze your profile and create a personalized career roadmap...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle>Your Personalized Career Roadmap</CardTitle>
        <CardDescription>
          Based on your profile, we've created a customized career roadmap to help you achieve your professional goals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-secondary rounded-lg">
          <h3 className="font-medium mb-2">Current Stage</h3>
          <p>{sampleRoadmap.currentStage}</p>
        </div>

        <Tabs defaultValue="short-term" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="short-term">Short Term</TabsTrigger>
            <TabsTrigger value="medium-term">Medium Term</TabsTrigger>
            <TabsTrigger value="long-term">Long Term</TabsTrigger>
          </TabsList>
          <TabsContent value="short-term" className="mt-4">
            <div className="space-y-4">{sampleRoadmap.shortTerm.map(renderStage)}</div>
          </TabsContent>
          <TabsContent value="medium-term" className="mt-4">
            <div className="space-y-4">{sampleRoadmap.mediumTerm.map(renderStage)}</div>
          </TabsContent>
          <TabsContent value="long-term" className="mt-4">
            <div className="space-y-4">{sampleRoadmap.longTerm.map(renderStage)}</div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium mb-3">Technical Skills to Develop</h3>
            <div className="flex flex-wrap gap-2">
              {sampleRoadmap.skills.technical.map((skill, i) => (
                <Badge key={i} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3">Soft Skills to Develop</h3>
            <div className="flex flex-wrap gap-2">
              {sampleRoadmap.skills.soft.map((skill, i) => (
                <Badge key={i} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Recommended Resources</h3>
          <div className="space-y-3">{sampleRoadmap.resources.map(renderResource)}</div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
            <Calendar className="h-4 w-4 mr-2" /> Schedule Career Counseling Session
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


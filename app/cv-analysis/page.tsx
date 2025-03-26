"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, ExternalLink, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { extractProfileFromCV } from "@/lib/ai-actions"
import { RecommendedCourses } from "@/components/course-section"
import Link from "next/link"

export default function CVAnalysisPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<{
    strengths: string[]
    weaknesses: string[]
    improvements: string[]
    jobMatches: { title: string; company: string; match: number; reason: string; link: string }[]
  } | null>(null)
  const [profileCreated, setProfileCreated] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // Read file content
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setFileContent(content)
    }
    reader.readAsText(selectedFile)
  }

  const analyzeCV = async () => {
    if (!fileContent) return

    setIsAnalyzing(true)

    try {
      // Extract profile data from CV
      const profileData = await extractProfileFromCV(fileContent)

      // Set analysis data
      setAnalysis({
        strengths: profileData.strengths,
        weaknesses: profileData.weaknesses,
        improvements: profileData.strengths.map(
          (_, i) =>
            `Improve your ${profileData.weaknesses[i % profileData.weaknesses.length].toLowerCase().replace("limited ", "").replace("needs improvement in ", "")}`,
        ),
        jobMatches: profileData.recommendedJobs.map((job) => ({
          title: job.title,
          company: job.company,
          match: job.match,
          reason: `Your skills in ${profileData.skills
            .slice(0, 3)
            .map((s) => s.name)
            .join(", ")} align well with this role.`,
          link: job.link,
        })),
      })

      setProfileCreated(true)
    } catch (error) {
      console.error("Error analyzing CV:", error)
      alert("An error occurred while analyzing your CV. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const createProfile = () => {
    router.push("/profile")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">CV Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Your CV</CardTitle>
            <CardDescription>Upload your CV/resume for AI-powered analysis and job matching.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
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
                  Select File
                </Button>
              </label>
            </div>

            {file && (
              <div className="mt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <FileText className="h-4 w-4" />
                  <span>{file.name}</span>
                  <span className="text-xs">({(file.size / 1024).toFixed(2)} KB)</span>
                </div>
                <Button onClick={analyzeCV} className="w-full" disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze CV"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div>
          {analysis ? (
            <Tabs defaultValue="strengths">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                <TabsTrigger value="improvements">Improvements</TabsTrigger>
                <TabsTrigger value="jobs">Job Matches</TabsTrigger>
              </TabsList>

              <TabsContent value="strengths">
                <Card>
                  <CardHeader>
                    <CardTitle>CV Strengths</CardTitle>
                    <CardDescription>Key strengths identified in your CV</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weaknesses">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas for Improvement</CardTitle>
                    <CardDescription>Aspects of your CV that could be strengthened</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="improvements">
                <Card>
                  <CardHeader>
                    <CardTitle>Suggested Improvements</CardTitle>
                    <CardDescription>Actionable recommendations to enhance your CV</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="jobs">
                <Card>
                  <CardHeader>
                    <CardTitle>Potential Job Matches</CardTitle>
                    <CardDescription>Jobs that match your skills and experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.jobMatches.map((job, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h3 className="font-medium">{job.title}</h3>
                              <p className="text-sm text-muted-foreground">{job.company}</p>
                            </div>
                            <div className="bg-secondary text-secondary-foreground text-sm px-2 py-1 rounded-full">
                              {job.match}% Match
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{job.reason}</p>
                          <div className="flex justify-end">
                            <a href={job.link} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" className="gap-1">
                                <ExternalLink className="h-3 w-3" />
                                View Job
                              </Button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="h-full flex flex-col justify-center items-center p-8 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">CV Analysis Results</h2>
              <p className="text-muted-foreground mb-6">
                Upload your CV and click "Analyze CV" to get personalized feedback and job matches.
              </p>
              <div className="text-sm text-muted-foreground max-w-md">
                <p>Our AI will analyze your CV based on Harvard resume guidelines and provide:</p>
                <ul className="list-disc list-inside mt-2 text-left">
                  <li>Key strengths and weaknesses</li>
                  <li>Actionable improvement suggestions</li>
                  <li>Potential job matches with compatibility scores</li>
                </ul>
              </div>
            </Card>
          )}
        </div>
      </div>

      {profileCreated && (
        <div className="mt-8 text-center">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Ready to create your profile?</h2>
            <p className="text-muted-foreground mb-6">
              We've analyzed your CV and can create a personalized profile to help you find the best job matches.
            </p>
            <Button onClick={createProfile} size="lg">
              Create My Profile
            </Button>
          </Card>
        </div>
      )}
      {analysis && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Recommended Courses Based on Your CV</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Skill Enhancement Recommendations</h3>
                <p className="text-muted-foreground mb-6">
                  Based on your CV analysis, we've identified courses that can help you strengthen your skills and
                  increase your employability.
                </p>
                <div className="space-y-4">
                  {analysis.weaknesses.slice(0, 3).map((weakness, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Improve: {weakness}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          We recommend taking courses that focus on this area to strengthen your profile.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Link href="/courses">
                    <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                      Browse All Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
            <div>
              <RecommendedCourses title="Top Course Matches" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


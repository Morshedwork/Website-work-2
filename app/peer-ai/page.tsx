"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Bot,
  User,
  Send,
  Loader2,
  Upload,
  FileText,
  X,
  Sparkles,
  Brain,
  MessageSquare,
  Search,
  BarChart,
  FileUp,
  Zap,
  Briefcase,
} from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { useAuth } from "@/lib/auth-context"
import { useGeminiAPI } from "@/lib/ai-actions" // Add this import
import { RecommendedCourses } from "@/components/course-section"

type Message = {
  role: "user" | "assistant"
  content: string
}

type Feature = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  prompt: string
}

export default function PeerAIPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>("")
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()
  const [geminiResponse, setGeminiResponse] = useState<string>("") // Initialize Gemini response state
  const [userMessageContent, setUserMessageContent] = useState<string>("")

  const features: Feature[] = [
    {
      id: "cv-analysis",
      title: "CV Analysis",
      description: "Upload your CV for detailed analysis and improvement suggestions",
      icon: <FileText className="h-5 w-5" />,
      prompt:
        "Please analyze this CV and provide detailed feedback on strengths, weaknesses, and suggestions for improvement. Also recommend suitable job roles based on the profile.",
    },
    {
      id: "interview-prep",
      title: "Interview Preparation",
      description: "Practice with AI-simulated interviews for specific roles",
      icon: <MessageSquare className="h-5 w-5" />,
      prompt:
        "Let's start an interview simulation. I'm applying for a [job role] position. Please ask me relevant interview questions one by one, wait for my response, and provide feedback after each answer.",
    },
    {
      id: "job-search",
      title: "Job Search Assistant",
      description: "Find relevant job opportunities based on your skills and preferences",
      icon: <Search className="h-5 w-5" />,
      prompt:
        "I'm looking for job opportunities in [industry/role] in [location]. My key skills are [skills]. Please suggest relevant job openings, companies to target, and application strategies.",
    },
    {
      id: "market-insights",
      title: "Job Market Insights",
      description: "Get up-to-date information on industry trends and salary ranges",
      icon: <BarChart className="h-5 w-5" />,
      prompt:
        "Please provide current job market insights for the [industry] sector in Bangladesh. I'm interested in demand trends, salary ranges, required skills, and future outlook.",
    },
    {
      id: "skill-development",
      title: "Skill Development Plan",
      description: "Create a personalized learning path to enhance your employability",
      icon: <Brain className="h-5 w-5" />,
      prompt:
        "I want to develop my skills in [field/technology]. My current level is [beginner/intermediate/advanced]. Please create a structured learning path with resources and timeline to help me become job-ready.",
    },
    {
      id: "cover-letter",
      title: "Cover Letter Generator",
      description: "Generate tailored cover letters for specific job applications",
      icon: <FileUp className="h-5 w-5" />,
      prompt:
        "Please help me write a cover letter for a [job title] position at [company name]. My background includes [brief background]. The job requires [key requirements].",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Send welcome message when component mounts
    const welcomeMessage = {
      role: "assistant" as const,
      content: `Hello${user ? ` ${user.name}` : ""}! I'm Peer AI, your advanced career assistant for the Bangladesh job market. I can help you with:

• CV analysis and improvement suggestions
• Interview preparation with role-specific questions
• Personalized job search and recommendations
• Industry insights and salary information
• Skill development plans tailored to your goals
• Custom cover letter generation

How can I assist with your career journey today?`,
    }
    setMessages([welcomeMessage])
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !fileContent) return

    const userMessage = {
      role: "user" as const,
      content: fileContent ? `${input}\n\nAttached CV/Resume:\n${fileContent}` : input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setFileContent("")
    setFile(null)
    setIsLoading(true)
    setUserMessageContent(userMessage.content)

    let openaiText = ""
    let geminiResponseText = ""

    try {
      // Use both AI models and combine their responses
      const [openaiResponse] = await Promise.all([
        // Use the AI SDK to generate a response with OpenAI
        generateText({
          model: openai("gpt-4o"),
          prompt: userMessage.content,
          system: `You are Peer AI, an advanced career assistant specialized in the Bangladesh job market. You provide detailed, personalized career guidance to students and job seekers in Bangladesh.

Your capabilities include:
1. CV Analysis: You can analyze resumes/CVs to identify strengths, weaknesses, and suggest improvements based on industry standards.
2. Interview Preparation: You can simulate interviews for specific roles, asking relevant questions and providing feedback.
3. Job Search Assistance: You can recommend suitable job opportunities based on skills and preferences, focusing on the Bangladesh market.
4. Market Insights: You provide up-to-date information on industry trends, salary ranges, and in-demand skills in Bangladesh.
5. Skill Development: You create personalized learning paths to enhance employability.
6. Cover Letter Generation: You craft tailored cover letters for specific job applications.

When responding:
- Be conversational but professional
- Provide specific, actionable advice
- Include relevant examples from the Bangladesh context
- Tailor your responses to the local job market
- Be encouraging and supportive
- When recommending resources, prioritize those accessible in Bangladesh

Your responses should be detailed but concise, focusing on practical advice that can be immediately applied.`,
        }),

        // Also use Gemini API for additional insights
        // useGeminiAPI(userMessage.content)
      ])

      // Get the text from OpenAI response
      openaiText = openaiResponse.text

      // Combine responses
      // const finalResponse = `${openaiText}\n\n---\n\nAdditional insights from Gemini:\n${geminiResponse.substring(0, 200)}...`;
      const geminiResponse = await useGeminiAPI(userMessage.content)
      geminiResponseText = geminiResponse

      const finalResponse = `${openaiText}\n\n---\n\nAdditional insights from Gemini:\n${geminiResponseText.substring(0, 200)}...`

      const assistantMessage = { role: "assistant" as const, content: finalResponse }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage = {
        role: "assistant" as const,
        content: "I'm sorry, I encountered an error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setActiveFeature(null)
    }
  }

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

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  const handleFeatureSelect = (feature: Feature) => {
    setActiveFeature(feature.id)
    setInput(feature.prompt)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-ujjibon w-8 h-8 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle>Peer AI</CardTitle>
                </div>
                <CardDescription>Your personal AI career companion for the Bangladesh job market</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="features" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="chat-types">Chat Types</TabsTrigger>
                  </TabsList>

                  <TabsContent value="features" className="space-y-4">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          activeFeature === feature.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-secondary"
                        }`}
                        onClick={() => handleFeatureSelect(feature)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              activeFeature === feature.id ? "bg-gradient-ujjibon" : "bg-secondary"
                            }`}
                          >
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="examples" className="space-y-4">
                    <div className="space-y-3">
                      <div
                        className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary cursor-pointer"
                        onClick={() => setInput("What are the most in-demand tech skills in Bangladesh right now?")}
                      >
                        <p className="text-sm font-medium">
                          What are the most in-demand tech skills in Bangladesh right now?
                        </p>
                      </div>

                      <div
                        className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary cursor-pointer"
                        onClick={() => setInput("How should I prepare for a software engineer interview at BJIT?")}
                      >
                        <p className="text-sm font-medium">
                          How should I prepare for a software engineer interview at BJIT?
                        </p>
                      </div>

                      <div
                        className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary cursor-pointer"
                        onClick={() => setInput("What's a good salary range for a junior marketing position in Dhaka?")}
                      >
                        <p className="text-sm font-medium">
                          What's a good salary range for a junior marketing position in Dhaka?
                        </p>
                      </div>

                      <div
                        className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary cursor-pointer"
                        onClick={() => setInput("I'm a recent CSE graduate. What career paths should I consider?")}
                      >
                        <p className="text-sm font-medium">
                          I'm a recent CSE graduate. What career paths should I consider?
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="chat-types" className="space-y-4">
                    <div className="space-y-3">
                      <div
                        className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary cursor-pointer"
                        onClick={() => setActiveFeature("career-chat")}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-ujjibon flex items-center justify-center flex-shrink-0">
                            <Briefcase className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium">Career Guidance Chat</h3>
                            <p className="text-sm text-muted-foreground">
                              Get personalized career advice and guidance for your professional journey
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary cursor-pointer"
                        onClick={() => setActiveFeature("interview-chat")}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-ujjibon flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium">Interview Practice Chat</h3>
                            <p className="text-sm text-muted-foreground">
                              Practice interview questions and get feedback to improve your interview skills
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary cursor-pointer"
                        onClick={() => setActiveFeature("resume-chat")}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-ujjibon flex items-center justify-center flex-shrink-0">
                            <FileText className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium">Resume Review Chat</h3>
                            <p className="text-sm text-muted-foreground">
                              Upload your resume and get detailed feedback and improvement suggestions
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary cursor-pointer"
                        onClick={() => setActiveFeature("skill-chat")}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-ujjibon flex items-center justify-center flex-shrink-0">
                            <Zap className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium">Skill Development Chat</h3>
                            <p className="text-sm text-muted-foreground">
                              Get personalized learning paths and resources to develop in-demand skills
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 space-y-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Pro Tip</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload your CV to get personalized career recommendations and detailed feedback on how to improve
                      it.
                    </p>
                  </div>

                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Did you know?</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Peer AI is trained on the latest job market data from Bangladesh to provide you with accurate and
                      relevant advice.
                    </p>
                  </div>

                  <RecommendedCourses className="mt-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:w-2/3">
            <Card className="border border-border mb-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-ujjibon w-8 h-8 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Chat with Peer AI</CardTitle>
                    <CardDescription>Your personal career advisor powered by AI</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Online
                </Badge>
              </CardHeader>

              <CardContent>
                <div className="h-[60vh] overflow-y-auto p-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div
                          className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 ${
                            message.role === "user" ? "ml-2 mr-0 bg-primary" : "bg-gradient-ujjibon"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="h-5 w-5 text-primary-foreground" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {message.content.split("\n").map((line, i) => (
                            <p key={i} className={i > 0 ? "mt-2" : ""}>
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="flex">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full mr-2 bg-gradient-ujjibon">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-2">
              {file && (
                <div className="flex items-center p-2 bg-secondary rounded-md">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={() => {
                      setFile(null)
                      setFileContent("")
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {activeFeature === "cover-letter" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Job Title</label>
                      <Input placeholder="e.g., Software Engineer" className="border-primary/20" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Company</label>
                      <Input placeholder="e.g., BJIT Group" className="border-primary/20" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Key Requirements</label>
                    <Input placeholder="e.g., React, Node.js, 2 years experience" className="border-primary/20" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Your Background (Brief)</label>
                    <Textarea
                      placeholder="Briefly describe your relevant experience and skills"
                      className="border-primary/20"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveFeature(null)}>
                      Cancel
                    </Button>
                    <Button type="submit">Generate Cover Letter</Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Peer AI anything about your career..."
                    className="flex-1 border-primary/20"
                    disabled={isLoading}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                  />
                  <Button type="button" variant="outline" disabled={isLoading} onClick={handleAttachClick}>
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || (!input.trim() && !fileContent)}
                    className="bg-gradient-ujjibon hover:opacity-90 transition-opacity"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


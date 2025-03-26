"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, User, Bot, Loader2, Upload, FileText, X } from "lucide-react"
import { generateText } from "ai" // Import from AI SDK [^1]
import { openai } from "@ai-sdk/openai" // Import from AI SDK [^1]
import { useGeminiAPI } from "@/lib/ai-actions" // Add this import

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isFirstMessage, setIsFirstMessage] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [welcomeMessage, setWelcomeMessage] = useState<Message | null>(null)

  useEffect(() => {
    if (isFirstMessage) {
      setWelcomeMessage({
        role: "assistant" as const,
        content: `Welcome to Ujjibon – Bangladesh's first career counseling and community platform dedicated to empowering students by enhancing their skills and helping them become self-reliant in the job market. Job Assistant BD, a service from Ujjibon, is here to make your job search effortless and stress-free. Let's find the best opportunities for you! 🚀

        💼 Our Services:
        ✔️ Job Search & AI-Driven Recommendations
        ✔️ Application Tracking & Follow-Up Reminders
        ✔️ Custom Cover Letter Generator
        ✔️ Weekly Job Alerts & Career Advice
        ✔️ CV-Based Job Matching & Profile Analysis

        How can I assist you today? 😊`,
      })
      setIsFirstMessage(false)
    }
  }, [isFirstMessage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Modify the handleSubmit function to use both OpenAI and Gemini
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

    try {
      const prompt = userMessage.content

      // Use both AI models and combine their responses
      const [openaiResponse, geminiResponse] = await Promise.all([
        // Use the AI SDK to generate a response with OpenAI
        generateText({
          model: openai("gpt-4o"),
          prompt: prompt,
          system: `You are Job Assistant BD, an AI designed to assist students in Bangladesh with job search tasks. 
        You provide job recommendations based on students' profiles, including their skills, interests, and qualifications. 
        You track applied, interested, and recommended jobs, allowing users to organize their job search efficiently. 
        Additionally, you automate job alerts and career advice directly in the chat.
        
        If the user has attached a CV or resume, analyze it to provide personalized job recommendations, identify strengths and weaknesses, and suggest improvements.
        
        When recommending jobs, include:
        - Job Title
        - Company Name
        - Deadline
        - Specific Job Post Link (verified and accurate)
        - Salary Range (if available)
        - Short Requirements
        
        Your responses should be concise (max 200 words), with no broad explanations, only relevant details.
        Prioritize clear, direct responses.`,
        }),

        // Also use Gemini API for additional insights
        useGeminiAPI(prompt),
      ])

      // Get the text from OpenAI response
      const openaiText = openaiResponse.text

      // Combine responses if this is not the welcome message
      let finalResponse = openaiText
      finalResponse = `${openaiText}\n\n---\n\nAdditional insights from Gemini:\n${geminiResponse.substring(0, 150)}...`

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

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chat with Job Assistant BD</h1>

      <Card className="border border-border mb-4">
        <div className="h-[60vh] overflow-y-auto p-4">
          {messages.length === 0 && !welcomeMessage ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="h-16 w-16 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Welcome to Job Assistant BD</h2>
              <p className="text-muted-foreground max-w-md">
                Start chatting to get personalized job recommendations, career advice, and more.
              </p>
            </div>
          ) : (
            <>
              {welcomeMessage && (
                <div className={`flex mb-4 justify-start`}>
                  <div className={`flex max-w-[80%]`}>
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 bg-secondary`}>
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className={`p-3 rounded-lg bg-secondary text-secondary-foreground`}>
                      {welcomeMessage.content.split("\n").map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div key={index} className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 ${
                        message.role === "user" ? "ml-2 mr-0 bg-primary" : "bg-secondary"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <Bot className="h-5 w-5" />
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
            </>
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex">
                <div className="flex items-center justify-center h-8 w-8 rounded-full mr-2 bg-secondary">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
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

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
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
          <Button type="submit" disabled={isLoading || (!input.trim() && !fileContent)}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}


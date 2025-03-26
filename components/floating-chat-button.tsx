"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send, User, Bot, FileUp } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Hi there! 👋 How can I help with your career journey today?",
    },
  ])
  const [input, setInput] = useState("")
  const { user } = useAuth()

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      let responseContent =
        "I'm analyzing your request. Would you like to explore job opportunities, get career advice, or connect with a counsellor?"

      // Check for specific keywords to provide more targeted responses
      if (
        input.toLowerCase().includes("counsellor") ||
        input.toLowerCase().includes("counselor") ||
        input.toLowerCase().includes("mentor")
      ) {
        responseContent =
          "I can help match you with the perfect career counsellor based on your profile and needs. Would you like to see available counsellors?"
      } else if (input.toLowerCase().includes("roadmap") || input.toLowerCase().includes("career path")) {
        responseContent =
          "I can create a personalized career roadmap based on your profile. Have you uploaded your CV or would you like to provide more information about your skills and goals?"
      } else if (input.toLowerCase().includes("cv") || input.toLowerCase().includes("resume")) {
        responseContent =
          "Would you like me to analyze your CV/resume to provide personalized career recommendations and improvement suggestions?"
      }

      const aiMessage = { role: "assistant" as const, content: responseContent }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 bg-gradient-ujjibon hover:opacity-90 transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-80 md:w-96 z-50 transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <Card className="shadow-xl border-primary/20">
          <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <div className="bg-gradient-ujjibon w-8 h-8 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <span>Career Assistant</span>
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 ${
                        message.role === "user" ? "ml-2 mr-0 bg-primary" : "bg-gradient-ujjibon"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="bg-gradient-ujjibon hover:opacity-90">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <button className="hover:text-primary transition-colors flex items-center gap-1">
                  <FileUp className="h-3 w-3" /> Upload CV
                </button>
                <Link href="/chat" className="hover:text-primary transition-colors">
                  Open full chat
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}


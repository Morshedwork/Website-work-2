// Create a new file for AI settings in the admin panel
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Key, RefreshCw, Check, AlertTriangle } from "lucide-react"

export default function AISettings() {
  const [apiKeys, setApiKeys] = useState({
    openai: "sk-••••••••••••••••••••••••",
    gemini: "AIzaSyB2x6J_aVNSYgPkT6vXMZicr0csTcGN6kQ",
  })

  const [testResults, setTestResults] = useState({
    openai: null,
    gemini: null,
  })

  const testApiKey = (provider) => {
    // Simulate API test
    setTimeout(() => {
      setTestResults({
        ...testResults,
        [provider]: provider === "gemini" ? "success" : "error",
      })
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AI Configuration</h1>

      <Tabs defaultValue="api-keys">
        <TabsList>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="prompts">System Prompts</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Configure the API keys for different AI providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <div className="flex mt-1 gap-2">
                    <Input
                      id="openai-key"
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                      type="password"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() => testApiKey("openai")}
                      disabled={testResults.openai === "loading"}
                    >
                      {testResults.openai === "loading" ? (
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Key className="h-4 w-4 mr-2" />
                      )}
                      Test
                    </Button>
                  </div>
                  {testResults.openai === "success" && (
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <Check className="h-4 w-4 mr-1" /> API key is valid
                    </p>
                  )}
                  {testResults.openai === "error" && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertTriangle className="h-4 w-4 mr-1" /> Invalid API key
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="gemini-key">Google Gemini API Key</Label>
                  <div className="flex mt-1 gap-2">
                    <Input
                      id="gemini-key"
                      value={apiKeys.gemini}
                      onChange={(e) => setApiKeys({ ...apiKeys, gemini: e.target.value })}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() => testApiKey("gemini")}
                      disabled={testResults.gemini === "loading"}
                    >
                      {testResults.gemini === "loading" ? (
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Key className="h-4 w-4 mr-2" />
                      )}
                      Test
                    </Button>
                  </div>
                  {testResults.gemini === "success" && (
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <Check className="h-4 w-4 mr-1" /> API key is valid
                    </p>
                  )}
                  {testResults.gemini === "error" && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertTriangle className="h-4 w-4 mr-1" /> Invalid API key
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                  <Save className="h-4 w-4 mr-2" />
                  Save API Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Models Configuration</CardTitle>
              <CardDescription>Configure which AI models to use for different features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Chat Assistant</h3>
                    <p className="text-sm text-muted-foreground">Model used for general chat interactions</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="border rounded p-1 text-sm">
                      <option>OpenAI - GPT-4o</option>
                      <option>OpenAI - GPT-3.5 Turbo</option>
                      <option>Google - Gemini 2.0 Flash</option>
                    </select>
                    <Badge>Active</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">CV Analysis</h3>
                    <p className="text-sm text-muted-foreground">Model used for analyzing resumes and CVs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="border rounded p-1 text-sm">
                      <option>OpenAI - GPT-4o</option>
                      <option>OpenAI - GPT-3.5 Turbo</option>
                      <option>Google - Gemini 2.0 Flash</option>
                    </select>
                    <Badge>Active</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Cover Letter Generation</h3>
                    <p className="text-sm text-muted-foreground">Model used for generating cover letters</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="border rounded p-1 text-sm">
                      <option>OpenAI - GPT-4o</option>
                      <option>OpenAI - GPT-3.5 Turbo</option>
                      <option>Google - Gemini 2.0 Flash</option>
                    </select>
                    <Badge>Active</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Job Search</h3>
                    <p className="text-sm text-muted-foreground">Model used for job search and recommendations</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="border rounded p-1 text-sm">
                      <option>OpenAI - GPT-4o</option>
                      <option>OpenAI - GPT-3.5 Turbo</option>
                      <option>Google - Gemini 2.0 Flash</option>
                    </select>
                    <Badge>Active</Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                  <Save className="h-4 w-4 mr-2" />
                  Save Model Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Prompts</CardTitle>
              <CardDescription>Configure the system prompts used for different AI features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="chat-prompt">Chat Assistant Prompt</Label>
                  <Textarea
                    id="chat-prompt"
                    rows={5}
                    className="mt-1"
                    defaultValue="You are Job Assistant BD, an AI designed to assist students in Bangladesh with job search tasks. You provide job recommendations based on students' profiles, including their skills, interests, and qualifications."
                  />
                </div>

                <div>
                  <Label htmlFor="cv-prompt">CV Analysis Prompt</Label>
                  <Textarea
                    id="cv-prompt"
                    rows={5}
                    className="mt-1"
                    defaultValue="You are an expert CV analyzer following Harvard resume guidelines. Extract accurate information from CVs and provide detailed analysis."
                  />
                </div>

                <div>
                  <Label htmlFor="cover-letter-prompt">Cover Letter Prompt</Label>
                  <Textarea
                    id="cover-letter-prompt"
                    rows={5}
                    className="mt-1"
                    defaultValue="You are an expert cover letter writer who creates personalized, compelling cover letters that help job seekers stand out. Follow best practices for cover letter writing and ensure the letter is tailored to the specific job and company."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                  <Save className="h-4 w-4 mr-2" />
                  Save Prompts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


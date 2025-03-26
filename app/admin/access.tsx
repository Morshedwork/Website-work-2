"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Lock } from "lucide-react"
import Image from "next/image"

export default function AdminAccess() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // In a real application, this would be a server-side check with proper authentication
  // This is just a simple demo implementation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple password check - in a real app, use proper authentication
    if (password === "admin123") {
      router.push("/admin")
    } else {
      setError("Invalid admin password")
    }

    setIsLoading(false)
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <div className="flex justify-center mb-8">
        <div className="relative h-16 w-48">
          <Image src="/images/ujjibon-logo.png" alt="Ujjibon Logo" fill className="object-contain" />
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          </div>
          <CardDescription>Enter the admin password to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-primary/20 focus-visible:ring-primary"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-ujjibon hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Access Admin Panel"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              For demo purposes, use password: <span className="font-semibold">admin123</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


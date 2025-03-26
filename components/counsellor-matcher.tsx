"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Star, Clock, MapPin, CheckCircle } from "lucide-react"

interface CounsellorMatcherProps {
  userProfile: any
  isLoading?: boolean
}

export default function CounsellorMatcher({ userProfile, isLoading = false }: CounsellorMatcherProps) {
  const [matchedCounsellors, setMatchedCounsellors] = useState<any[]>([])
  const [loading, setLoading] = useState(isLoading)

  // Sample matched counsellors for preview
  const sampleCounsellors = [
    {
      id: "c1",
      name: "Dr. Aminul Islam",
      specialization: ["Career Transitions", "Leadership Development", "HR Strategy"],
      experience: 15,
      rating: 4.9,
      bio: "With 15+ years of experience in HR and talent acquisition at multinational companies, Dr. Islam helps students navigate complex career decisions and develop leadership skills.",
      image: "/placeholder.svg?height=300&width=300",
      availability: ["Monday", "Wednesday", "Friday"],
      price: "2,500 BDT/hour",
      matchScore: 95,
      matchReason: "Excellent match for your leadership development goals and career transition needs.",
    },
    {
      id: "c2",
      name: "Farhana Rahman",
      specialization: ["Software Engineering", "Product Management", "Tech Interviews"],
      experience: 12,
      rating: 4.8,
      bio: "Former engineering leader at Google and local tech companies, Farhana guides students pursuing careers in technology and product development with practical industry insights.",
      image: "/placeholder.svg?height=300&width=300",
      availability: ["Tuesday", "Thursday", "Saturday"],
      price: "3,000 BDT/hour",
      matchScore: 92,
      matchReason: "Strong match for your technical background and career aspirations in the tech industry.",
    },
    {
      id: "c3",
      name: "Mohammed Hasan",
      specialization: ["Startups", "Business Development", "Fundraising"],
      experience: 10,
      rating: 4.7,
      bio: "Serial entrepreneur with 3 successful exits, Mohammed mentors students interested in building their own businesses in Bangladesh's growing startup ecosystem.",
      image: "/placeholder.svg?height=300&width=300",
      availability: ["Monday", "Thursday", "Saturday"],
      price: "2,800 BDT/hour",
      matchScore: 88,
      matchReason: "Good match for your entrepreneurial interests and business development goals.",
    },
  ]

  useEffect(() => {
    // In a real implementation, this would call the matchCounsellors function
    // For demo purposes, we'll use the sample data
    setMatchedCounsellors(sampleCounsellors)
    setLoading(false)
  }, [userProfile])

  if (loading) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Finding Your Perfect Counsellor Match</CardTitle>
          <CardDescription>
            Please wait while we analyze your profile to find the best counsellor matches...
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
        <CardTitle>Your Counsellor Matches</CardTitle>
        <CardDescription>
          Based on your profile, we've identified these counsellors as the best matches for your career goals and needs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {matchedCounsellors.map((counsellor, index) => (
            <Card
              key={counsellor.id}
              className="border-primary/20 hover:border-primary/50 transition-colors hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-3">
                      <AvatarImage src={counsellor.image} alt={counsellor.name} />
                      <AvatarFallback>{counsellor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium">{counsellor.name}</h3>
                    <p className="text-sm text-muted-foreground">{counsellor.specialization[0]}</p>
                    <div className="flex items-center mt-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(counsellor.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      <span className="ml-1 text-sm">{counsellor.rating}</span>
                    </div>
                    <Badge className="mt-3 bg-gradient-ujjibon">{counsellor.matchScore}% Match</Badge>
                  </div>

                  <div className="md:w-3/4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {counsellor.specialization.map((specialty: string, i: number) => (
                        <Badge key={i} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-4">{counsellor.bio}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{counsellor.experience} years experience</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Available online & in-person</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Available: {counsellor.availability.join(", ")}</span>
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <span>{counsellor.price}</span>
                      </div>
                    </div>

                    <div className="bg-secondary/50 p-3 rounded-lg mb-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{counsellor.matchReason}</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">Book Session</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


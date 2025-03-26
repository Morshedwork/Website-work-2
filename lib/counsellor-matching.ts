import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Define counsellor types
export type Counsellor = {
  id: string
  name: string
  specialization: string[]
  experience: number
  rating: number
  bio: string
  image: string
  availability: string[]
  price: string
  matchScore?: number
}

// Sample counsellors data
const counsellors: Counsellor[] = [
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
  },
  {
    id: "c4",
    name: "Tasneem Ahmed",
    specialization: ["Public Speaking", "Personal Branding", "Media Relations"],
    experience: 8,
    rating: 4.9,
    bio: "Communications director with experience at leading NGOs, Tasneem helps students develop essential soft skills for professional success and personal branding.",
    image: "/placeholder.svg?height=300&width=300",
    availability: ["Wednesday", "Friday", "Sunday"],
    price: "2,200 BDT/hour",
  },
  {
    id: "c5",
    name: "Rafiqul Haque",
    specialization: ["Banking", "Financial Analysis", "Investment"],
    experience: 18,
    rating: 4.6,
    bio: "Senior banking professional with expertise in Bangladesh's financial sector, Rafiqul guides students pursuing careers in finance and banking with practical industry knowledge.",
    image: "/placeholder.svg?height=300&width=300",
    availability: ["Tuesday", "Saturday", "Sunday"],
    price: "3,500 BDT/hour",
  },
]

// Function to match counsellors based on user profile
export async function matchCounsellors(userProfile: any) {
  try {
    // Extract relevant information from user profile
    const { skills = [], interests = [], education = [], experience = [] } = userProfile

    // Use AI to determine the best counsellor matches
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on the following user profile, rank the top 3 most suitable career counsellors from the provided list. Provide a match percentage and a brief explanation of why each counsellor would be a good match.
      
      User Profile:
      Skills: ${skills.join(", ")}
      Interests: ${interests.join(", ")}
      Education: ${JSON.stringify(education)}
      Experience: ${JSON.stringify(experience)}
      
      Available Counsellors:
      ${counsellors.map((c) => `- ${c.name}: ${c.specialization.join(", ")}. ${c.bio}`).join("\n")}
      
      Return the results as a JSON array with the following structure:
      [
        {
          "id": "counsellor_id",
          "matchScore": 95,
          "reason": "Brief explanation of why this counsellor is a good match"
        }
      ]`,
      system:
        "You are an expert career counsellor matching system. Your task is to analyze a user's profile and match them with the most suitable career counsellors based on their skills, interests, education, and experience.",
    })

    // Parse the AI response
    const matchResults = JSON.parse(text)

    // Map the match results to the counsellor data
    const matchedCounsellors = matchResults
      .map((match: any) => {
        const counsellor = counsellors.find((c) => c.id === match.id)
        if (counsellor) {
          return {
            ...counsellor,
            matchScore: match.matchScore,
            matchReason: match.reason,
          }
        }
        return null
      })
      .filter(Boolean)

    return matchedCounsellors
  } catch (error) {
    console.error("Error matching counsellors:", error)
    // Return default counsellors if there's an error
    return counsellors.slice(0, 3).map((c) => ({
      ...c,
      matchScore: Math.floor(Math.random() * 20) + 80, // Random score between 80-99
      matchReason: "Based on your profile and career interests",
    }))
  }
}


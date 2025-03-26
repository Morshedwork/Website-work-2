import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export type CareerRoadmap = {
  currentStage: string
  shortTerm: RoadmapStage[]
  mediumTerm: RoadmapStage[]
  longTerm: RoadmapStage[]
  skills: {
    technical: string[]
    soft: string[]
  }
  resources: Resource[]
}

export type RoadmapStage = {
  title: string
  description: string
  timeframe: string
  milestones: string[]
}

export type Resource = {
  type: "course" | "book" | "website" | "community"
  title: string
  description: string
  link?: string
}

export async function generateCareerRoadmap(userProfile: any): Promise<CareerRoadmap> {
  try {
    // Extract relevant information from user profile
    const { skills = [], interests = [], education = [], experience = [], goals = [] } = userProfile

    // Use AI to generate a personalized career roadmap
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate a detailed career roadmap for a professional based on their profile. The roadmap should include short-term (1-2 years), medium-term (3-5 years), and long-term (5+ years) goals, with specific milestones, skill development recommendations, and resources.
      
      User Profile:
      Skills: ${skills.join(", ")}
      Interests: ${interests.join(", ")}
      Education: ${JSON.stringify(education)}
      Experience: ${JSON.stringify(experience)}
      Career Goals: ${goals.join(", ")}
      
      Return the results as a JSON object with the following structure:
      {
        "currentStage": "Brief description of current career stage",
        "shortTerm": [
          {
            "title": "Goal title",
            "description": "Detailed description",
            "timeframe": "e.g., 6-12 months",
            "milestones": ["Milestone 1", "Milestone 2"]
          }
        ],
        "mediumTerm": [
          {
            "title": "Goal title",
            "description": "Detailed description",
            "timeframe": "e.g., 2-3 years",
            "milestones": ["Milestone 1", "Milestone 2"]
          }
        ],
        "longTerm": [
          {
            "title": "Goal title",
            "description": "Detailed description",
            "timeframe": "e.g., 5+ years",
            "milestones": ["Milestone 1", "Milestone 2"]
          }
        ],
        "skills": {
          "technical": ["Skill 1", "Skill 2"],
          "soft": ["Skill 1", "Skill 2"]
        },
        "resources": [
          {
            "type": "course",
            "title": "Resource title",
            "description": "Brief description",
            "link": "URL if applicable"
          }
        ]
      }`,
      system:
        "You are an expert career roadmap generator. Your task is to create detailed, personalized career roadmaps based on a user's profile, including their skills, interests, education, experience, and career goals. Focus on the Bangladesh job market and provide realistic, actionable advice.",
    })

    // Parse the AI response
    const roadmap = JSON.parse(text)
    return roadmap
  } catch (error) {
    console.error("Error generating career roadmap:", error)
    // Return a default roadmap if there's an error
    return {
      currentStage: "Early Career Professional",
      shortTerm: [
        {
          title: "Skill Development",
          description: "Focus on building core skills relevant to your field",
          timeframe: "6-12 months",
          milestones: ["Complete 2-3 relevant courses", "Build a portfolio project"],
        },
      ],
      mediumTerm: [
        {
          title: "Career Advancement",
          description: "Seek opportunities for growth and advancement",
          timeframe: "2-3 years",
          milestones: ["Secure a senior position", "Develop leadership skills"],
        },
      ],
      longTerm: [
        {
          title: "Industry Leadership",
          description: "Establish yourself as an industry expert",
          timeframe: "5+ years",
          milestones: ["Mentor junior professionals", "Speak at industry events"],
        },
      ],
      skills: {
        technical: ["Relevant technical skills for your field"],
        soft: ["Communication", "Leadership", "Problem-solving"],
      },
      resources: [
        {
          type: "course",
          title: "Professional Development Course",
          description: "Comprehensive course to enhance your skills",
          link: "https://example.com/course",
        },
      ],
    }
  }
}


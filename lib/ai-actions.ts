import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Function to use the Gemini API
export async function useGeminiAPI(prompt: string): Promise<string> {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY

    if (!GEMINI_API_KEY) {
      console.error("Gemini API key is not set")
      return "Gemini API key is not configured. Please add the GEMINI_API_KEY environment variable."
    }

    const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Gemini API error: ${response.status}`, errorText)
      return `Gemini API error: ${response.status}. Please check your API key and try again.`
    }

    const data = await response.json()

    // Extract the text from the response
    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text
    ) {
      return data.candidates[0].content.parts[0].text
    }

    return "No response from Gemini API. The API may be experiencing issues."
  } catch (error) {
    console.error("Error using Gemini API:", error)
    return "Error using Gemini API. Please try again later."
  }
}

// Function to analyze CV with OpenAI
export async function analyzeCV(cvText: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: cvText,
      system: `You are an expert CV analyzer. Analyze the provided CV and extract the following information:
      1. Name
      2. Contact Information
      3. Education
      4. Work Experience
      5. Skills
      6. Strengths
      7. Weaknesses
      8. Improvement Suggestions
      9. Suitable Job Roles
      
      Format your response in a structured way with clear headings.`,
    })

    return text
  } catch (error) {
    console.error("Error analyzing CV:", error)
    return "Error analyzing CV. Please try again."
  }
}

// Function to generate a cover letter
export async function generateCoverLetter(jobTitle: string, company: string, requirements: string, background: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate a cover letter for a ${jobTitle} position at ${company}. 
      Job requirements: ${requirements}
      My background: ${background}`,
      system: `You are an expert cover letter writer who creates personalized, compelling cover letters that help job seekers stand out. 
      Follow best practices for cover letter writing and ensure the letter is tailored to the specific job and company.
      The cover letter should be professional, concise (max 400 words), and highlight relevant skills and experiences.
      Include proper formatting with date, recipient information, greeting, body paragraphs, closing, and signature.`,
    })

    return text
  } catch (error) {
    console.error("Error generating cover letter:", error)
    return "Error generating cover letter. Please try again."
  }
}

// Function to get job recommendations
export async function getJobRecommendations(skills: string[], location: string, jobType: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Find job recommendations for someone with the following skills: ${skills.join(", ")}. 
      Location: ${location}
      Job type: ${jobType}`,
      system: `You are a job search assistant specializing in the Bangladesh job market. 
      Provide relevant job recommendations based on the user's skills, location, and job type preferences.
      For each job recommendation, include:
      1. Job Title
      2. Company Name
      3. Location
      4. Salary Range (if available)
      5. Key Requirements
      6. Application Deadline (if available)
      7. Brief Job Description
      
      Provide 5-7 job recommendations in a structured format.`,
    })

    return text
  } catch (error) {
    console.error("Error getting job recommendations:", error)
    return "Error getting job recommendations. Please try again."
  }
}

// Function to extract profile data from CV
export async function extractProfileFromCV(cvText: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: cvText,
      system: `You are an expert CV parser. Extract the following information from the provided CV:
      1. Name
      2. Email
      3. Phone
      4. Location
      5. Education (degree, institution, year)
      6. Experience (title, company, duration, description)
      7. Skills (name, level - as a percentage)
      8. Strengths (3-5 key strengths)
      9. Weaknesses (3-5 areas for improvement)
      10. Recommended Jobs (title, company, link, match percentage)

      Format your response as a JSON object. Ensure that all fields are present, even if the information is not explicitly available in the CV. In such cases, provide a reasonable default value or indicate that the information is "Not specified".
      `,
    })

    try {
      // Attempt to parse the JSON response
      const profileData = JSON.parse(text)
      return profileData
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError)
      console.log("Raw response from AI:", text) // Log the raw response for debugging
      return { error: "Failed to parse AI response" }
    }
  } catch (error) {
    console.error("Error extracting profile from CV:", error)
    return { error: "Error extracting profile from CV. Please try again." }
  }
}

// Function to search jobs online
export async function searchJobsOnline(searchTerm: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Search for jobs online matching the term "${searchTerm}". Provide the following information for each job:
      1. Title
      2. Company
      3. Location
      4. URL
      5. Salary (if available)
      6. Deadline (if available)
      7. Requirements (if available)
      8. Posted Date (if available)

      Return the results as a JSON array.`,
      system: `You are a job search expert. You are able to search the internet and find relevant job postings. You should return the results in a JSON array.`,
    })

    try {
      // Attempt to parse the JSON response
      const jobs = JSON.parse(text)
      return jobs
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError)
      console.log("Raw response from AI:", text) // Log the raw response for debugging
      return []
    }
  } catch (error) {
    console.error("Error searching for jobs online:", error)
    return []
  }
}


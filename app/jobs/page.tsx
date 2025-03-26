"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Briefcase, Building, Calendar, DollarSign, Filter, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { searchJobsOnline } from "@/lib/ai-actions"

// Job type definition
type Job = {
  id: number
  title: string
  company: string
  location: string
  salary: string
  description?: string
  requirements: string[]
  deadline: string
  url: string
  type: string
  postedDate: string
}

// Sample job data
const SAMPLE_JOBS: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechBD Solutions",
    location: "Dhaka",
    salary: "30,000 - 50,000 BDT",
    deadline: "2025-04-15",
    type: "Full-time",
    requirements: ["React", "JavaScript", "Tailwind CSS", "2 years experience"],
    url: "https://example.com/job/1",
    postedDate: "2025-03-15",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "DataSoft Systems",
    location: "Dhaka",
    salary: "40,000 - 60,000 BDT",
    deadline: "2025-04-20",
    type: "Full-time",
    requirements: ["Node.js", "Express", "MongoDB", "3 years experience"],
    url: "https://example.com/job/2",
    postedDate: "2025-03-18",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative IT",
    location: "Chittagong",
    salary: "25,000 - 45,000 BDT",
    deadline: "2025-04-10",
    type: "Full-time",
    requirements: ["Figma", "Adobe XD", "UI/UX principles", "1 year experience"],
    url: "https://example.com/job/3",
    postedDate: "2025-03-10",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "BrainStation-23",
    location: "Dhaka",
    salary: "35,000 - 55,000 BDT",
    deadline: "2025-04-25",
    type: "Full-time",
    requirements: ["SQL", "Excel", "Power BI", "2 years experience"],
    url: "https://example.com/job/4",
    postedDate: "2025-03-20",
  },
  {
    id: 5,
    title: "Content Writer",
    company: "NewsCred",
    location: "Remote",
    salary: "20,000 - 35,000 BDT",
    deadline: "2025-04-18",
    type: "Part-time",
    requirements: ["English proficiency", "SEO knowledge", "Creative writing"],
    url: "https://example.com/job/5",
    postedDate: "2025-03-17",
  },
  {
    id: 6,
    title: "Marketing Executive",
    company: "Daraz Bangladesh",
    location: "Dhaka",
    salary: "25,000 - 40,000 BDT",
    deadline: "2025-04-22",
    type: "Full-time",
    requirements: ["Digital marketing", "Social media", "Campaign management"],
    url: "https://example.com/job/6",
    postedDate: "2025-03-19",
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [jobs, setJobs] = useState<Job[]>(SAMPLE_JOBS)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(SAMPLE_JOBS)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [isSearching, setIsSearching] = useState(false)

  const locations = [...new Set(jobs.map((job) => job.location))]
  const jobTypes = [...new Set(jobs.map((job) => job.type))]

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs)
      return
    }

    setIsSearching(true)

    try {
      // First filter the existing jobs
      let results = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requirements.some((req) => req.toLowerCase().includes(searchTerm.toLowerCase())),
      )

      // If we have fewer than 3 results, search online
      if (results.length < 3) {
        const onlineJobs = await searchJobsOnline(searchTerm)

        // Format online jobs to match our Job type
        const formattedOnlineJobs: Job[] = onlineJobs.map((job: any, index: number) => ({
          id: jobs.length + index + 1,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary || "Not specified",
          deadline: job.deadline || "Not specified",
          type: job.type || "Full-time",
          requirements: job.requirements || [],
          url: job.url,
          postedDate: job.postedDate || new Date().toISOString().split("T")[0],
        }))

        // Combine local and online results, removing duplicates
        const combinedJobs = [...results]

        formattedOnlineJobs.forEach((onlineJob) => {
          const isDuplicate = combinedJobs.some(
            (existingJob) =>
              existingJob.title.toLowerCase() === onlineJob.title.toLowerCase() &&
              existingJob.company.toLowerCase() === onlineJob.company.toLowerCase(),
          )

          if (!isDuplicate) {
            combinedJobs.push(onlineJob)
          }
        })

        // Update both jobs and filtered jobs
        setJobs((prevJobs) => [
          ...prevJobs,
          ...formattedOnlineJobs.filter(
            (job) =>
              !prevJobs.some(
                (existingJob) =>
                  existingJob.title.toLowerCase() === job.title.toLowerCase() &&
                  existingJob.company.toLowerCase() === job.company.toLowerCase(),
              ),
          ),
        ])

        results = combinedJobs
      }

      // Apply filters
      if (selectedLocations.length > 0) {
        results = results.filter((job) => selectedLocations.includes(job.location))
      }

      if (selectedTypes.length > 0) {
        results = results.filter((job) => selectedTypes.includes(job.type))
      }

      // Apply sorting
      results = sortJobs(results, sortBy)

      setFilteredJobs(results)
    } catch (error) {
      console.error("Error searching for jobs:", error)
      alert("An error occurred while searching for jobs. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  const sortJobs = (jobsToSort: Job[], sortOption: string) => {
    switch (sortOption) {
      case "newest":
        return [...jobsToSort].sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
      case "deadline":
        return [...jobsToSort].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      case "salary-high":
        return [...jobsToSort].sort((a, b) => {
          const aAvg = getAverageSalary(a.salary)
          const bAvg = getAverageSalary(b.salary)
          return bAvg - aAvg
        })
      case "salary-low":
        return [...jobsToSort].sort((a, b) => {
          const aAvg = getAverageSalary(a.salary)
          const bAvg = getAverageSalary(b.salary)
          return aAvg - bAvg
        })
      default:
        return jobsToSort
    }
  }

  const getAverageSalary = (salaryRange: string) => {
    const matches = salaryRange.match(/(\d+,?\d*)/g)
    if (!matches || matches.length < 2) return 0

    const min = Number.parseInt(matches[0].replace(/,/g, ""))
    const max = Number.parseInt(matches[1].replace(/,/g, ""))
    return (min + max) / 2
  }

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location],
    )
  }

  const toggleJobType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setFilteredJobs(sortJobs(filteredJobs, value))
  }

  useEffect(() => {
    // Apply filters and sorting whenever they change
    let results = jobs

    if (searchTerm) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requirements.some((req) => req.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedLocations.length > 0) {
      results = results.filter((job) => selectedLocations.includes(job.location))
    }

    if (selectedTypes.length > 0) {
      results = results.filter((job) => selectedTypes.includes(job.type))
    }

    results = sortJobs(results, sortBy)

    setFilteredJobs(results)
  }, [selectedLocations, selectedTypes, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs, skills, or companies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="salary-high">Salary (High to Low)</SelectItem>
              <SelectItem value="salary-low">Salary (Low to High)</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Jobs</SheetTitle>
                <SheetDescription>Narrow down job listings based on your preferences.</SheetDescription>
              </SheetHeader>

              <div className="py-4">
                <h3 className="text-lg font-medium mb-2">Location</h3>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={selectedLocations.includes(location)}
                        onCheckedChange={() => toggleLocation(location)}
                      />
                      <Label htmlFor={`location-${location}`}>{location}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-4">
                <h3 className="text-lg font-medium mb-2">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => toggleJobType(type)}
                      />
                      <Label htmlFor={`type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handleSearch} className="w-full">
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <Badge variant={job.type === "Full-time" ? "default" : "secondary"}>{job.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Deadline: {job.deadline}</span>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && !isSearching && (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No jobs found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria to find more opportunities.
          </p>
        </div>
      )}

      {isSearching && filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Searching for jobs...</h2>
          <p className="text-muted-foreground">We're looking for the best opportunities that match your criteria.</p>
        </div>
      )}
    </div>
  )
}


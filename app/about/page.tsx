import React from "react"
import Link from "next/link"
import Image from "next/image"
import type { ReactElement } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Target, CheckCircle, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-ujjibon-dark py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] opacity-20 bg-cover bg-center"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white-shadow">About Ujjibon</h1>
            <p className="text-xl max-w-3xl mx-auto text-white-shadow">
              Bangladesh's first career counseling and community platform dedicated to empowering students in their job
              search journey.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Content */}
      <section className="about-section bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="about-card">
            <h2 className="about-heading">Our Mission</h2>
            <p className="about-text">
              At Ujjibon, our mission is to empower the youth of Bangladesh by providing comprehensive career guidance,
              skill development opportunities, and job placement assistance. We aim to bridge the gap between education
              and employment, fostering self-dependency and contributing to the economic growth of the nation.
            </p>

            <h2 className="about-heading">Our Approach</h2>
            <p className="about-text">
              We take a holistic and inclusive approach to career development. Our platform offers personalized career
              counseling, skill enhancement programs, job placement assistance, an online learning platform, and
              networking opportunities. We believe in addressing the diverse needs of our users and providing them with
              the tools and resources they need to succeed in their professional journeys.
            </p>

            <h2 className="about-heading">Our Unique Selling Proposition</h2>
            <p className="about-text">
              What sets Ujjibon apart is our holistic and inclusive approach to empowering the youth of Bangladesh. We
              go beyond traditional career counseling by offering a comprehensive range of services that address the
              diverse needs of our users. Our focus on fostering self-dependency and promoting youth employability
              breaks the cycle of stagnant age groups as the sole contributors to the economy, driving long-term
              economic sustainability.
            </p>
            <p className="about-text">
              Additionally, our online learning platform, extensive industry connections, and entrepreneurship support
              provide a unique ecosystem for skill enhancement and job opportunities. Ujjibon's commitment to
              personalized guidance, continuous learning, and fostering a thriving community distinguishes us as a
              pioneering platform that equips the youth with the tools and resources they need to overcome career
              challenges and achieve their full potential.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-secondary p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground">
                  To create a thriving ecosystem where every young Bangladeshi has access to quality career guidance,
                  skill development resources, and job opportunities, enabling them to build successful and fulfilling
                  careers.
                </p>
              </div>

              <div className="bg-secondary p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Our Values</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Excellence in service delivery</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Inclusivity and accessibility</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Innovation and continuous improvement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Integrity and transparency</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold mb-6">Ready to start your career journey with us?</h3>
              <Link href="/register">
                <Button size="lg" className="bg-gradient-ujjibon hover:opacity-90 transition-opacity">
                  Join Ujjibon Today <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated professionals behind Ujjibon who are passionate about empowering the youth of
              Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
              <div className="relative h-64 w-full overflow-hidden">
                <Image src="/images/mentors/ceo.jpg" alt="Founder & CEO portrait" width={300} height={300} className="object-cover" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold">Founder & CEO</h3>
                <p className="text-primary">Leadership & Vision</p>
                <p className="mt-4 text-muted-foreground">
                  Leading Ujjibon with a vision to transform career development in Bangladesh.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
              <div className="relative h-64 w-full overflow-hidden">
                <Image src="/images/mentors/tech-director.jpg" alt="Technology Director portrait" width={300} height={300} className="object-cover" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold">Head of Career Services</h3>
                <p className="text-primary">Career Guidance Expert</p>
                <p className="mt-4 text-muted-foreground">
                  Providing expert career guidance and developing our counseling methodologies.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
              <div className="relative h-64 w-full overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=300" alt="Team Member" fill className="object-cover" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold">Technology Director</h3>
                <p className="text-primary">Tech Innovation</p>
                <p className="mt-4 text-muted-foreground">
                  Driving technological innovation to enhance user experience and platform capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}


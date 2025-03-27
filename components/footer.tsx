import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="logo-container mb-4">
              <Image
                src="/images/ujjibon-logo.png"
                alt="Ujjibon Logo"
                width={128}
                height={32}
                className="object-contain"
              />
            </div>
            <p className="text-muted-foreground">
              Bangladesh's first career counseling and community platform dedicated to empowering students.
            </p>
            <p className="text-sm text-primary mt-4 font-medium">Target Every Possibility</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                  Job Search
                </Link>
              </li>
              <li>
                <Link href="/cv-analysis" className="text-muted-foreground hover:text-primary transition-colors">
                  CV Analysis
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors">
                  Cover Letter Generator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Career Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Interview Preparation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Skill Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Email: info@ujjibon.com</li>
              <li className="text-muted-foreground">Phone: +880 1234 567890</li>
              <li className="text-muted-foreground">Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Ujjibon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


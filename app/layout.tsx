import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Inter } from "next/font/google"

import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingChatButton from "@/components/floating-chat-button"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Ujjibon - Career Development Platform",
  description: "Advance your career with personalized learning paths, expert mentorship, and job opportunities tailored to your goals.",
  icons: [
    {
      rel: "icon",
      url: "/icon.svg",
      type: "image/svg+xml"
    }
  ]
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col bg-background">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingChatButton />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


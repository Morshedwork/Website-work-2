import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import FloatingChatButton from "@/components/floating-chat-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Job Assistant BD | Ujjibon",
  description:
    "Bangladesh's first AI-powered career counseling platform dedicated to empowering students in their job search journey.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex flex-col min-h-screen bg-background">
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


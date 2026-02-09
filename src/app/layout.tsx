import type { Metadata } from "next"
import { Fraunces, IBM_Plex_Sans } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display"
})

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body"
})

export const metadata: Metadata = {
  title: "Myrzan Izimbetov | Product Designer | +$4M MRR Impact",
  description:
    "Results-driven Product Designer focused on UX and UI. +$4M in MRR impact and +37% pageview growth across mobile, desktop, and web platforms.",
  openGraph: {
    title: "Myrzan Izimbetov | Product Designer",
    description:
      "Results-driven Product Designer focused on UX and UI. +$4M in MRR impact and +37% pageview growth.",
    type: "profile"
  },
  twitter: {
    card: "summary_large_image",
    title: "Myrzan Izimbetov | Product Designer",
    description:
      "Results-driven Product Designer focused on UX and UI. +$4M in MRR impact and +37% pageview growth."
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased",
          display.variable,
          body.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <a
            href="#main"
            className="skip-link"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

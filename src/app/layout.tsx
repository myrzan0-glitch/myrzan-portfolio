import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

const display = Geist({
  subsets: ["latin"],
  variable: "--font-display"
})

const body = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
})

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: {
    default: "Myrzan Izimbetov — Product Designer",
    template: "%s | Myrzan Izimbetov"
  },
  description:
    "Results-driven Product Designer focused on UX and UI. +$4M in MRR impact and +37% pageview growth across mobile, desktop, and web platforms.",
  openGraph: {
    title: "Myrzan Izimbetov — Product Designer",
    description:
      "Results-driven Product Designer focused on UX and UI. +$4M in MRR impact and +37% pageview growth.",
    type: "profile",
    images: [{ url: "/avatar-default.webp", width: 800, height: 800, alt: "Myrzan Izimbetov" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Myrzan Izimbetov — Product Designer",
    description:
      "Results-driven Product Designer focused on UX and UI. +$4M in MRR impact and +37% pageview growth.",
    images: ["/avatar-default.webp"]
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
          body.variable,
          mono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import localFont from "next/font/local"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

// The fonts live in the repo (src/app/fonts, SIL Open Font License) rather than coming from
// Google Fonts at build time: a failed download there broke Vercel builds.
const display = localFont({
  src: "./fonts/InstrumentSerif-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-display"
})

const body = localFont({
  src: "./fonts/Geist-Variable.woff2",
  weight: "100 900",
  variable: "--font-body"
})

const mono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  weight: "100 900",
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: {
    default: "Myrzan Izimbetov — Product Designer",
    template: "%s | Myrzan Izimbetov"
  },
  description:
    "Results-driven Product Designer focused on UX and UI. +$4M in MRR impact and +37% pageview growth across mobile, desktop and web platforms.",
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

"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"

const HeroCanvas = dynamic(
  () => import("@/components/hero-canvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
)

export function HeroBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const theme = resolvedTheme === "light" ? "light" : "dark"

  return (
    // Full-bleed: break out of the centered column so the field never hard-cuts at its edges
    <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden">
      {/* Light mode: a soft sun glow the sparks drift through */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-56 h-[640px] w-[640px] rounded-full opacity-0 transition-opacity duration-500 dark:opacity-0 [.light_&]:opacity-100"
        style={{ background: "radial-gradient(circle, rgba(252,196,72,0.28) 0%, rgba(252,196,72,0.08) 40%, rgba(252,196,72,0) 70%)" }}
      />
      {mounted ? <HeroCanvas key={theme} theme={theme} /> : null}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--home-bg)]" />
    </div>
  )
}

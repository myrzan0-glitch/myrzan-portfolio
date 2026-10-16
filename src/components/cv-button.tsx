"use client"

import * as React from "react"
import { ArrowDown } from "lucide-react"

import { setHeroWarp as setWarp } from "@/lib/hero-warp"

// Positions for the sparks that blink around the button on hover
const SPARKS = [
  { x: "-10px", y: "-9px", s: 12, d: "0s", tone: "a" },
  { x: "30%", y: "-15px", s: 8, d: ".25s", tone: "b" },
  { x: "78%", y: "-12px", s: 14, d: ".5s", tone: "a" },
  { x: "102%", y: "35%", s: 9, d: ".15s", tone: "b" },
  { x: "60%", y: "46px", s: 11, d: ".7s", tone: "a" },
  { x: "12%", y: "44px", s: 8, d: ".4s", tone: "b" }
] as const

export function CvButton({ className = "" }: { className?: string }) {
  React.useEffect(() => () => setWarp(false), [])

  return (
    <a
      href="/cv-myrzan-izimbetov.pdf"
      download
      onPointerEnter={() => setWarp(true)}
      onPointerLeave={() => setWarp(false)}
      onFocus={() => setWarp(true)}
      onBlur={() => setWarp(false)}
      className={`cv-spark relative inline-flex h-11 items-center justify-center gap-2.5 rounded-full bg-[var(--home-fg)] px-5 text-sm font-medium text-[var(--home-bg)] transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-[0_0_0_4px_var(--home-ring),0_10px_30px_-10px_var(--home-glow)] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--home-ring)] ${className}`}
    >
      {SPARKS.map((spark, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="spark"
          style={
            {
              "--x": spark.x,
              "--y": spark.y,
              "--s": `${spark.s}px`,
              "--d": spark.d,
              color: spark.tone === "a" ? "var(--home-spark-a)" : "var(--home-spark-b)"
            } as React.CSSProperties
          }
        >
          {/* Four-point star at night, a small sun by day */}
          <svg className="spark-star" viewBox="0 0 24 24">
            <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" fill="currentColor" />
          </svg>
          <svg className="spark-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
            <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" />
          </svg>
        </span>
      ))}
      <span>Download CV</span>
      <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  )
}

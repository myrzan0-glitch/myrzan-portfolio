"use client"

import * as React from "react"
import { ArrowDown } from "lucide-react"

import { setHeroWarp as setWarp } from "@/lib/hero-warp"

export function CvButton() {
  const ref = React.useRef<HTMLAnchorElement>(null)

  // Grow the fill from wherever the pointer crosses the edge, like a ripple entering the pill
  const setOrigin = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--x", `${event.clientX - rect.left}px`)
    el.style.setProperty("--y", `${event.clientY - rect.top}px`)
  }

  React.useEffect(() => () => setWarp(false), [])

  return (
    <a
      ref={ref}
      href="/cv-myrzan-izimbetov.pdf"
      download
      onPointerEnter={(event) => {
        setOrigin(event)
        setWarp(true)
      }}
      onPointerLeave={(event) => {
        setOrigin(event)
        setWarp(false)
      }}
      onFocus={() => setWarp(true)}
      onBlur={() => setWarp(false)}
      className="group relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black [--x:50%] [--y:50%] transition-transform duration-300 ease-out hover:scale-[1.04] focus-visible:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[var(--x)] top-[var(--y)] aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-accent transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none"
      />
      <span className="relative">Download CV</span>
      <span className="relative inline-flex h-4 w-4 overflow-hidden" aria-hidden="true">
        <ArrowDown className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-full motion-reduce:transition-none" />
        <ArrowDown className="absolute inset-0 h-4 w-4 -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 motion-reduce:transition-none" />
      </span>
    </a>
  )
}

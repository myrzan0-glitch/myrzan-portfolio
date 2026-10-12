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
      className="group relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black [--x:50%] [--y:50%] transition-[transform,color,box-shadow] duration-300 ease-out hover:scale-[1.04] hover:text-white hover:shadow-[0_0_28px_-4px_rgba(255,255,255,0.45)] focus-visible:scale-[1.04] focus-visible:text-white focus-visible:shadow-[0_0_28px_-4px_rgba(255,255,255,0.45)] focus-visible:outline-none active:scale-[0.98]"
    >
      {/* Inverts the pill to black from the pointer's entry point, like a light switching off */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[var(--x)] top-[var(--y)] aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-black transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none"
      />
      {/* Keeps the pill's outline visible once it turns black */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/80"
      />
      <span className="relative">Download CV</span>
      <span className="relative inline-flex h-4 w-4 overflow-hidden" aria-hidden="true">
        <ArrowDown className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-full motion-reduce:transition-none" />
        <ArrowDown className="absolute inset-0 h-4 w-4 -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 motion-reduce:transition-none" />
      </span>
    </a>
  )
}

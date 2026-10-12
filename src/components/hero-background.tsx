"use client"

import dynamic from "next/dynamic"

const HeroCanvas = dynamic(
  () => import("@/components/hero-canvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
)

export function HeroBackground() {
  return (
    // Full-bleed: break out of the centered content column so the field never hard-cuts at its edges
    <div className="pointer-events-none absolute -top-24 bottom-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden sm:-top-28 md:-top-32">
      <HeroCanvas />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
    </div>
  )
}

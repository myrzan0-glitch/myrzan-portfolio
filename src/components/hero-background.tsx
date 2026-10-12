"use client"

import dynamic from "next/dynamic"

const HeroCanvas = dynamic(
  () => import("@/components/hero-canvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
)

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 -z-10 overflow-hidden sm:-top-28 md:-top-32">
      <HeroCanvas />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
    </div>
  )
}

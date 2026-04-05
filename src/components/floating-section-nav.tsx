"use client"

import Link from "next/link"
import * as React from "react"

type NavItem = {
  id: string
  label: string
  href: string
}

const items: NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Work", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" }
]

export function FloatingSectionNav() {
  const [activeId, setActiveId] = React.useState<string>("about")

  React.useEffect(() => {
    const getSections = () =>
      items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[]

    const updateActive = () => {
      const sections = getSections()
      if (!sections.length) return

      // If scrolled near the bottom — last section is active
      const scrollBottom = window.scrollY + window.innerHeight
      if (scrollBottom >= document.documentElement.scrollHeight - 10) {
        setActiveId(sections[sections.length - 1].id)
        return
      }

      // Find section whose top is closest to 30% of viewport
      const target = window.innerHeight * 0.3
      let closest: HTMLElement | null = null
      let closestDist = Infinity

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        // Consider sections that have entered the top 60% of viewport
        if (rect.top <= window.innerHeight * 0.6) {
          const dist = Math.abs(rect.top - target)
          if (dist < closestDist) {
            closestDist = dist
            closest = section
          }
        }
      }

      if (closest) setActiveId(closest.id)
    }

    window.addEventListener("scroll", updateActive, { passive: true })
    updateActive()
    return () => window.removeEventListener("scroll", updateActive)
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-sm -translate-x-1/2 md:top-6 md:w-auto md:max-w-none md:bottom-auto">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-1 rounded-[1.7rem] border border-white/10 bg-black/88 p-1.5 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl md:rounded-full"
      >
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveId(item.id)}
              className={[
                "flex-1 rounded-[1.15rem] px-4 py-3 text-center text-[0.95rem] transition md:flex-none md:rounded-full md:px-5 md:py-2 md:text-sm",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/8 hover:text-white"
              ].join(" ")}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

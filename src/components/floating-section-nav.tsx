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
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
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

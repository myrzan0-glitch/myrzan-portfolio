"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { LondonClock } from "@/components/home/london-clock"
import { ThemeSwitch } from "@/components/home/theme-switch"

const pages = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" }
]

/** Top bar for the home, about and projects pages: the clock, a segmented control, the theme switch. */
export function SiteNav({ className = "" }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] items-center gap-3 pt-5 sm:pt-7 ${className}`}>
      <span className="home-label max-sm:hidden">
        <LondonClock />
      </span>
      <nav
        aria-label="Pages"
        className="flex rounded-full bg-[var(--home-soft)] p-1 shadow-[inset_0_0_0_1px_var(--home-line)] max-sm:col-span-2 max-sm:justify-self-start"
      >
        {pages.map((p) => {
          const active = pathname === p.href
          return (
            <Link
              key={p.href}
              href={p.href}
              aria-current={active ? "page" : undefined}
              className={`home-label rounded-full px-3.5 py-1.5 transition-colors sm:px-4 ${
                active
                  ? "bg-[var(--home-bg)] !text-[var(--home-fg)] shadow-[0_1px_2px_rgba(0,0,0,0.12),0_0_0_1px_var(--home-line)]"
                  : "hover:!text-[var(--home-fg)]"
              }`}
            >
              {p.label}
            </Link>
          )
        })}
      </nav>
      <span className="justify-self-end">
        <ThemeSwitch />
      </span>
    </div>
  )
}

export function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`home-label flex justify-between pb-12 pt-20 ${className}`}>
      <span>London, UK</span>
      <span>© {new Date().getFullYear()} Myrzan Izimbetov</span>
    </footer>
  )
}

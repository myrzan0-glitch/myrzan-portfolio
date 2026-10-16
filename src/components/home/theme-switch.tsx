"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const isDark = !mounted || resolvedTheme !== "light"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="home-label inline-flex h-7 items-center gap-1.5 rounded-full border border-[var(--home-line)] bg-[var(--home-soft)] px-2.5 !text-[var(--home-fg)] transition-colors hover:border-[var(--home-faint)]"
    >
      {isDark ? <Moon className="h-3 w-3" aria-hidden="true" /> : <Sun className="h-3 w-3" aria-hidden="true" />}
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  )
}

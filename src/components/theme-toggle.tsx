"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-10 w-10 rounded-full border border-border/60 bg-background",
          className
        )}
        aria-hidden
      />
    )
  }

  const isDark = (theme === "dark" || resolvedTheme === "dark") ?? false

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "h-10 w-10 rounded-full border-border/60 bg-background/80 p-0",
        "hover:bg-accent/60",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}

"use client"

import * as React from "react"

export const EMAIL = "izimbetov.myrzan@gmail.com"

export function CopyEmail() {
  const [copied, setCopied] = React.useState(false)

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      // Clipboard can be blocked; the visible confirmation still points people to the address
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }, [])

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "c" || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return
      // Don't hijack the shortcut when someone is selecting text to copy it themselves
      if (window.getSelection()?.toString()) return
      copy()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [copy])

  return (
    <span className="home-muted inline-flex items-center gap-1.5 text-sm" aria-live="polite">
      {copied ? (
        <span className="text-[var(--home-green)]">Email copied</span>
      ) : (
        <>
          <span>or press</span>
          <button type="button" onClick={copy} className="home-key" aria-label={`Copy email ${EMAIL}`}>
            C
          </button>
          <span>to copy my email</span>
        </>
      )}
    </span>
  )
}

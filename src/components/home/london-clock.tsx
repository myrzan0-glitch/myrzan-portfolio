"use client"

import * as React from "react"

function londonTime() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London"
  })
}

export function LondonClock() {
  // Rendered only after mount so server and client markup match
  const [time, setTime] = React.useState<string | null>(null)

  React.useEffect(() => {
    setTime(londonTime())
    const id = window.setInterval(() => setTime(londonTime()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  return <span suppressHydrationWarning>London{time ? ` · ${time}` : ""}</span>
}

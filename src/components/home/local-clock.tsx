"use client"

import * as React from "react"

function localTime() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Dubai"
  })
}

/** The city I live in and its current time, shown in the nav and footer. */
export function LocalClock() {
  // Rendered only after mount so server and client markup match
  const [time, setTime] = React.useState<string | null>(null)

  React.useEffect(() => {
    setTime(localTime())
    const id = window.setInterval(() => setTime(localTime()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  return <span suppressHydrationWarning>Abu Dhabi{time ? ` · ${time}` : ""}</span>
}

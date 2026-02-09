"use client"

import { useEffect } from "react"

export default function CaseStudyError({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">
        We couldn’t load this case study. Please try again.
      </p>
      <button
        className="mt-6 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background"
        onClick={reset}
      >
        Retry
      </button>
    </main>
  )
}

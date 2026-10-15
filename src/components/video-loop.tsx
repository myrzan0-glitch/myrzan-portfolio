"use client"

import * as React from "react"

// Silent looping screen recording that only plays while on screen and respects reduced motion
export function VideoLoop({ src, poster, label, w, h }: { src: string; poster: string; label: string; w: number; h: number }) {
  const ref = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      poster={poster}
      width={w}
      height={h}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className="h-auto w-full"
    >
      <source src={src} type="video/mp4" />
      <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
    </video>
  )
}

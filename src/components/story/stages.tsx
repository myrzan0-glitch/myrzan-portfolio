"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Pause, Play, ZoomIn } from "lucide-react"

import { heroScene, layersScene, loopScene, rowScene, type LayerPart, type LoopStep, type RowPhone, type Scene } from "./phone-scenes"

/** A screen to open full size, with its caption. */
export type Shot = { screen: string; label?: string }

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** The story's accent colour, read from the page so scenes match the text around them. */
function cssColor(el: HTMLElement, name: string) {
  return getComputedStyle(el).getPropertyValue(name).trim()
}

/** Builds the scene once the panel comes near the screen, and keeps play/pause in sync with it. */
function useScene(build: (el: HTMLDivElement, playing: boolean) => Scene) {
  const ref = React.useRef<HTMLDivElement>(null)
  const scene = React.useRef<Scene | null>(null)
  const [playing, setPlaying] = React.useState(true)
  const buildRef = React.useRef(build)
  buildRef.current = build

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = !reducedMotion()
    setPlaying(start)
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !scene.current) {
          near.disconnect()
          scene.current = buildRef.current(el, start)
        }
      },
      { rootMargin: "300px" }
    )
    near.observe(el)
    return () => {
      near.disconnect()
      scene.current?.dispose()
      scene.current = null
    }
  }, [])

  const toggle = () => {
    const next = !playing
    setPlaying(next)
    scene.current?.setPlaying(next)
  }
  return { ref, scene, playing, toggle }
}

function PlayButton({ playing, onClick }: { playing: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={playing ? "Pause animation" : "Play animation"}
      className="absolute bottom-3.5 right-3.5 z-10 grid h-[30px] w-[30px] place-items-center rounded-full bg-[var(--home-fg)] text-[var(--home-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {playing ? <Pause className="h-3 w-3" fill="currentColor" /> : <Play className="h-3 w-3" fill="currentColor" />}
    </button>
  )
}

/** The screens of a panel, full size and side by side. Closes with Close, Escape or a click outside. */
function Lightbox({ shots, onClose }: { shots: Shot[]; onClose: () => void }) {
  const close = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    close.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Screens, full size"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="home-root fixed inset-0 z-50 flex !min-h-0 flex-col bg-[var(--home-bg)] p-4"
    >
      <div className="flex justify-end">
        <button
          ref={close}
          type="button"
          onClick={onClose}
          className="rounded-full bg-[var(--home-panel)] px-3.5 py-2 text-[13px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Close
        </button>
      </div>
      <div
        onClick={(e) => e.target === e.currentTarget && onClose()}
        className="flex min-h-0 flex-1 items-center gap-6 overflow-x-auto py-4 before:flex-1 after:flex-1"
      >
        {shots.map((s) => (
          <figure key={s.screen + s.label} className="m-0 flex h-full flex-none flex-col items-center gap-2.5">
            {/* Full-size exports, shown at their own pixels; next/image would resample them. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.screen}
              alt={s.label ?? ""}
              className="h-[calc(100%-30px)] max-h-[844px] w-auto shadow-[0_0_0_1px_var(--home-line),0_20px_50px_-20px_rgba(0,0,0,0.4)] [border-radius:11.8%/5.45%]"
            />
            {s.label && <figcaption className="home-label">{s.label}</figcaption>}
          </figure>
        ))}
      </div>
    </div>,
    document.body
  )
}

/** A magnifier in the panel's corner, shown on hover, that opens its screens full size. */
function Zoom({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = React.useState(false)
  const button = React.useRef<HTMLButtonElement>(null)
  const onClose = React.useCallback(() => {
    setOpen(false)
    button.current?.focus()
  }, [])
  return (
    <>
      <button
        ref={button}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View screens full size"
        className="absolute left-3 top-3 z-10 grid h-[34px] w-[34px] cursor-zoom-in place-items-center rounded-full bg-[var(--home-bg)] text-[var(--home-fg)] opacity-0 shadow-[0_0_0_1px_var(--home-line),0_4px_14px_-6px_rgba(0,0,0,0.3)] transition-opacity focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
      >
        <ZoomIn className="h-4 w-4" aria-hidden="true" />
      </button>
      {open && <Lightbox shots={shots} onClose={onClose} />}
    </>
  )
}

const panel = "group relative overflow-hidden rounded-[14px] bg-[var(--home-panel)]"
const tag = "absolute left-0 top-0 whitespace-nowrap rounded-full px-2 py-[3px] font-[family-name:var(--font-mono)] text-[9.5px] tracking-[0.03em] sm:text-[10.5px]"

export function HeroStage({ screens, label }: { screens: Shot[]; label: string }) {
  const { ref } = useScene((el, playing) =>
    heroScene(
      el,
      screens.map((s) => s.screen),
      playing
    )
  )
  return (
    <div ref={ref} role="img" aria-label={label} className={`${panel} aspect-[4/3] !bg-[#1c1c1e] sm:aspect-[2/1]`}>
      <Zoom shots={screens} />
    </div>
  )
}

export function LayersStage({ screen, parts, label, zoom }: { screen: string; parts: LayerPart[]; label: string; zoom?: string }) {
  const tags = React.useRef<(HTMLSpanElement | null)[]>([])
  const { ref, playing, toggle } = useScene((el, p) => layersScene(el, screen, parts, tags.current.filter((t): t is HTMLSpanElement => !!t), p))
  return (
    <div ref={ref} role="img" aria-label={label} className={`${panel} aspect-[4/5] sm:aspect-[4/3]`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {parts.map((part, i) => (
          <span
            key={part.name}
            ref={(node) => {
              tags.current[i] = node
            }}
            className={`${tag} opacity-0 ${
              part.mark === "problem"
                ? "bg-[var(--story-warn)] text-white"
                : part.mark === "new"
                  ? "bg-[var(--story-mark)] text-white"
                  : "bg-[var(--home-bg)] text-[var(--home-muted)] shadow-[0_0_0_1px_var(--home-line)]"
            }`}
          >
            {part.name}
          </span>
        ))}
      </div>
      <Zoom shots={[{ screen, label: zoom }]} />
      <PlayButton playing={playing} onClick={toggle} />
    </div>
  )
}

export function LoopStage({ steps, label }: { steps: LoopStep[]; label: string }) {
  const [step, setStep] = React.useState(0)
  const { ref, playing, toggle } = useScene((el, p) => loopScene(el, steps, cssColor(el, "--story-mark"), setStep, p))
  return (
    <figure className="m-0">
      <div ref={ref} role="img" aria-label={label} className={`${panel} aspect-[4/5] sm:aspect-[4/3]`}>
        <Zoom shots={steps.map((s) => ({ screen: s.screen, label: s.name }))} />
        <PlayButton playing={playing} onClick={toggle} />
      </div>
      <figcaption className="mt-3 flex flex-wrap justify-center gap-x-2.5 gap-y-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.04em] text-[var(--home-faint)]">
        {steps.map((s, i) => (
          <React.Fragment key={s.name}>
            {i > 0 && <span aria-hidden="true" className="text-[var(--home-line)]">→</span>}
            <span className={`transition-colors ${i === step ? "text-[var(--home-fg)]" : ""}`}>{s.name}</span>
          </React.Fragment>
        ))}
      </figcaption>
    </figure>
  )
}

/**
 * Phones side by side with their labels. Highlights start hidden so the designs read clean; the
 * switch below the panel, named for what it shows, turns them on.
 */
export function RowStage({ phones, label, toggle: toggleLabel, wide }: { phones: RowPhone[]; label: string; toggle: string; wide?: boolean }) {
  const tags = React.useRef<(HTMLSpanElement | null)[]>([])
  const [marked, setMarked] = React.useState(false)
  const { ref, scene } = useScene((el, p) =>
    rowScene(
      el,
      phones,
      tags.current.filter((t): t is HTMLSpanElement => !!t),
      { mark: cssColor(el, "--story-mark"), problem: cssColor(el, "--story-warn") },
      p
    )
  )
  const flip = () => {
    setMarked(!marked)
    scene.current?.setMarked?.(!marked)
  }
  return (
    <>
      <div ref={ref} role="img" aria-label={label} className={`${panel} ${wide ? "aspect-[4/5] sm:aspect-[2/1]" : "aspect-square sm:aspect-[4/3]"}`}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {phones.map((phone, i) => (
            <span
              key={phone.label}
              ref={(node) => {
                tags.current[i] = node
              }}
              className={`${tag} ${
                phone.on ? "bg-[var(--story-mark)] text-white" : "bg-[var(--home-bg)] text-[var(--home-muted)] shadow-[0_0_0_1px_var(--home-line)]"
              }`}
            >
              {phone.label}
            </span>
          ))}
        </div>
        <Zoom shots={phones.map((p) => ({ screen: p.screen, label: p.label }))} />
      </div>
      <button
        type="button"
        aria-pressed={marked}
        onClick={flip}
        className="mx-auto mt-3 flex items-center gap-2 rounded-full bg-[var(--home-bg)] py-1.5 pl-1.5 pr-3 text-[12px] font-medium shadow-[0_0_0_1px_var(--home-line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span aria-hidden="true" className={`relative h-4 w-[26px] rounded-full transition-colors ${marked ? "bg-[var(--story-mark)]" : "bg-[var(--home-line)]"}`}>
          <span
            className={`absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-[var(--home-bg)] shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-transform ${marked ? "translate-x-2.5" : ""}`}
          />
        </span>
        {toggleLabel}
      </button>
    </>
  )
}

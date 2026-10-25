"use client"

import * as React from "react"
import { Pause, Play, ZoomIn } from "lucide-react"

import { heroScene, layersScene, loopScene, rowScene, type LayerPart, type LoopStep, type RowItem, type RowScene, type Scene } from "./phone-scenes"

/** Telegram’s own blue, for tap rings. */
const TAP = "#3390ec"

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Builds the scene once the panel comes near the screen, and keeps play/pause in sync with it. */
function useScene<S extends Scene = Scene>(build: (el: HTMLDivElement, playing: boolean) => S) {
  const ref = React.useRef<HTMLDivElement>(null)
  const scene = React.useRef<S | null>(null)
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

const panel = "relative overflow-hidden rounded-[14px] bg-[var(--home-panel)]"

export type Shot = { src: string; label?: string }

/** The screens of a panel at full size, side by side; Escape, Close or a click outside closes it. */
function Lightbox({ shots, onClose }: { shots: Shot[]; onClose: () => void }) {
  const close = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    close.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Screens, full size"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex flex-col bg-[color-mix(in_srgb,var(--home-bg)_94%,transparent)] p-4 backdrop-blur-md"
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
          <figure key={s.src} className="m-0 flex h-full flex-none flex-col items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element -- full-size screens, already sized for 2x */}
            <img
              src={s.src}
              alt={s.label ?? ""}
              className="h-[calc(100%-30px)] max-h-[844px] w-auto rounded-[28px] shadow-[0_0_0_1px_var(--home-line),0_20px_50px_-20px_rgba(0,0,0,0.4)]"
            />
            {s.label && <figcaption className="home-label">{s.label}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  )
}

/**
 * A scene panel that opens its screens full size: from the button in the corner, or a click
 * anywhere on the panel that isn’t another control.
 */
function Panel({
  sceneRef,
  label,
  shots,
  className,
  children
}: {
  sceneRef: React.RefObject<HTMLDivElement>
  label: string
  shots: Shot[]
  className: string
  children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const button = React.useRef<HTMLButtonElement>(null)
  const onClose = React.useCallback(() => {
    setOpen(false)
    button.current?.focus()
  }, [])
  return (
    <>
      <div
        ref={sceneRef}
        role="img"
        aria-label={label}
        onClick={(e) => !(e.target as HTMLElement).closest("button") && setOpen(true)}
        className={`${panel} story-panel cursor-zoom-in ${className}`}
      >
        {children}
        <button
          ref={button}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="View screens full size"
          className="story-zoom absolute left-3 top-3 z-10 grid h-[34px] w-[34px] place-items-center rounded-full bg-[var(--home-bg)] text-[var(--home-fg)] shadow-[0_0_0_1px_var(--home-line),0_4px_14px_-6px_rgba(0,0,0,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <ZoomIn className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {open && <Lightbox shots={shots} onClose={onClose} />}
    </>
  )
}

export function HeroStage({ screens, label }: { screens: string[]; label: string }) {
  const { ref } = useScene((el, playing) => heroScene(el, screens, playing))
  return <Panel sceneRef={ref} label={label} shots={screens.map((src) => ({ src }))} className="aspect-[4/3] !bg-[#1c1c1e] sm:aspect-[2/1]" />
}

export function LayersStage({ screen, parts, label }: { screen: string; parts: LayerPart[]; label: string }) {
  const tags = React.useRef<(HTMLSpanElement | null)[]>([])
  const { ref, playing, toggle } = useScene((el, p) => layersScene(el, screen, parts, tags.current.filter((t): t is HTMLSpanElement => !!t), p))
  return (
    <Panel sceneRef={ref} label={label} shots={[{ src: screen }]} className="aspect-[4/5] sm:aspect-[4/3]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {parts.map((part, i) => (
          <span
            key={part.name}
            ref={(node) => {
              tags.current[i] = node
            }}
            className={`absolute left-0 top-0 whitespace-nowrap rounded-full px-2 py-[3px] font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.03em] opacity-0 ${
              part.own ? "bg-[#3390ec] text-white" : "bg-[var(--home-bg)] text-[var(--home-muted)] shadow-[0_0_0_1px_var(--home-line)]"
            }`}
          >
            {part.name}
          </span>
        ))}
      </div>
      <PlayButton playing={playing} onClick={toggle} />
    </Panel>
  )
}

export function LoopStage({ steps, label }: { steps: LoopStep[]; label: string }) {
  const [step, setStep] = React.useState(0)
  const { ref, playing, toggle } = useScene((el, p) => loopScene(el, steps, TAP, setStep, p))
  return (
    <figure className="m-0">
      <Panel sceneRef={ref} label={label} shots={steps.map((s) => ({ src: s.screen, label: s.name }))} className="aspect-[4/5] sm:aspect-[4/3]">
        <PlayButton playing={playing} onClick={toggle} />
      </Panel>
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

/** Reads the story accent from the page, so the outlines follow the light and dark themes. */
function accent(el: HTMLElement) {
  return getComputedStyle(el).getPropertyValue("--story-accent").trim() || "#2f8cf0"
}

export function RowStage({ items, label, mark, note }: { items: RowItem[]; label: string; mark: string; note: string }) {
  const tags = React.useRef<(HTMLSpanElement | null)[]>([])
  const [marked, setMarked] = React.useState(false)
  const { ref, scene } = useScene<RowScene>((el, p) =>
    rowScene(el, items, tags.current.filter((t): t is HTMLSpanElement => !!t), accent(el), p)
  )

  React.useEffect(() => scene.current?.setMarked(marked), [marked, scene])
  React.useEffect(() => {
    // The theme switch changes the class on <html>.
    const recolor = () => ref.current && scene.current?.setColor(accent(ref.current))
    const mo = new MutationObserver(recolor)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => mo.disconnect()
  }, [ref, scene])

  return (
    <figure className="m-0">
      <Panel
        sceneRef={ref}
        label={label}
        shots={items.map((it) => ({ src: it.screen, label: it.label }))}
        className="aspect-[4/5] sm:aspect-[2/1]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {items.map((it, i) => (
            <span
              key={it.screen}
              ref={(node) => {
                tags.current[i] = node
              }}
              className="absolute left-0 top-0 whitespace-nowrap rounded-full bg-[var(--story-accent)] px-2 py-[3px] font-[family-name:var(--font-mono)] text-[9.5px] tracking-[0.03em] text-white sm:text-[10.5px]"
            >
              {it.label}
            </span>
          ))}
        </div>
      </Panel>
      <button
        type="button"
        aria-pressed={marked}
        onClick={() => setMarked((m) => !m)}
        className="group/mark mx-auto mt-3 flex items-center gap-2 rounded-full bg-[var(--home-bg)] py-1.5 pl-1.5 pr-3 text-[12px] font-medium shadow-[0_0_0_1px_var(--home-line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <i
          aria-hidden="true"
          className={`relative h-4 w-[26px] rounded-full transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-3 after:w-3 after:rounded-full after:bg-[var(--home-bg)] after:shadow-[0_1px_2px_rgba(0,0,0,0.25)] after:transition-transform ${
            marked ? "bg-[var(--story-accent)] after:translate-x-2.5" : "bg-[var(--home-line)]"
          }`}
        />
        {mark}
      </button>
      <figcaption className="mt-2.5 text-center font-[family-name:var(--font-mono)] text-[11px] leading-[1.5] text-[var(--home-faint)]">{note}</figcaption>
    </figure>
  )
}

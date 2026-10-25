"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { heroScene, layersScene, loopScene, type LayerPart, type LoopStep, type Scene } from "./phone-scenes"

/** Telegram’s own blue, for tap rings. */
const TAP = "#3390ec"

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
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
  return { ref, playing, toggle }
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

export function HeroStage({ screens, label }: { screens: string[]; label: string }) {
  const { ref } = useScene((el, playing) => heroScene(el, screens, playing))
  return <div ref={ref} role="img" aria-label={label} className={`${panel} aspect-[4/3] !bg-[#1c1c1e] sm:aspect-[2/1]`} />
}

export function LayersStage({ screen, parts, label }: { screen: string; parts: LayerPart[]; label: string }) {
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
            className={`absolute left-0 top-0 whitespace-nowrap rounded-full px-2 py-[3px] font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.03em] opacity-0 ${
              part.own ? "bg-[#3390ec] text-white" : "bg-[var(--home-bg)] text-[var(--home-muted)] shadow-[0_0_0_1px_var(--home-line)]"
            }`}
          >
            {part.name}
          </span>
        ))}
      </div>
      <PlayButton playing={playing} onClick={toggle} />
    </div>
  )
}

export function LoopStage({ steps, label }: { steps: LoopStep[]; label: string }) {
  const [step, setStep] = React.useState(0)
  const { ref, playing, toggle } = useScene((el, p) => loopScene(el, steps, TAP, setStep, p))
  return (
    <figure className="m-0">
      <div ref={ref} role="img" aria-label={label} className={`${panel} aspect-[4/5] sm:aspect-[4/3]`}>
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

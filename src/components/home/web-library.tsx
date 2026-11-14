"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react"

import { grid } from "@/components/home/grid"
import { webProducts, webScreens } from "@/content/web-library"

/**
 * Web library: the web and enterprise products as a carousel of MacBooks. The current project
 * faces you in the middle; its neighbours stand turned away on either side, dimmed and cut by the
 * edges of the page. Arrows, a swipe or the arrow keys roll it round, endlessly, in either
 * direction. The middle screen opens full size in a viewer that zooms.
 */

const N = webScreens.length
const productOf = (i: number) => webProducts.find((p) => p.id === webScreens[i].product)!

const projects = webProducts.map((p) => ({ ...p, first: webScreens.findIndex((s) => s.product === p.id) }))
const P = projects.length
const HALF = Math.floor(P / 2)

const mod = (a: number, n: number) => ((a % n) + n) % n

/**
 * Each project's place relative to the middle, `active` being the project in the middle. Moving on
 * (`dir` 1) keeps the spare places on the left, so the project leaving slides out left and the one
 * arriving comes in from the right; moving back mirrors that.
 */
function offsets(active: number, dir: 1 | -1) {
  const low = dir === 1 ? -HALF : -(P - 1 - HALF)
  return projects.map((_, i) => mod(i - active - low, P) + low)
}

/** Where a MacBook stands for its place: the middle faces you, the neighbours turn away and recede. */
function pose(o: number, w: number, phone: boolean) {
  const a = Math.abs(o)
  const s = Math.sign(o)
  if (a === 0) return { x: 0, z: 0, rotateY: 0, opacity: 1, shade: 0 }
  if (a === 1)
    return { x: s * w * (phone ? 0.9 : 0.86), z: -w * 0.42, rotateY: -s * (phone ? 50 : 42), opacity: 1, shade: 0.55 }
  return { x: s * w * 1.5, z: -w * 0.95, rotateY: -s * 58, opacity: 0, shade: 0.8 }
}

function useWidth(ref: React.RefObject<HTMLElement>) {
  const [w, setW] = React.useState(1200)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return w
}

/**
 * A MacBook Pro drawn in CSS: a black glass bezel with the notch, the screen, a glass highlight,
 * and the aluminium base with its thumb groove. Sizes are in percent so it scales with its width.
 */
function MacBook({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="mbp">
      <div className="mbp-lid">
        <div className="mbp-screen" data-screen>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 84vw, 760px"
            loading={eager ? "eager" : "lazy"}
            className="object-cover object-top"
            draggable={false}
          />
          <span className="mbp-glare" aria-hidden="true" />
        </div>
        <span className="mbp-notch" aria-hidden="true" />
      </div>
      <div className="mbp-base" aria-hidden="true">
        <span className="mbp-groove" />
      </div>
    </div>
  )
}

function Viewer({ start, onClose }: { start: number; onClose: () => void }) {
  const [i, setI] = React.useState(start)
  const [zoom, setZoom] = React.useState(1)
  const paneRef = React.useRef<HTMLDivElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const go = React.useCallback((d: number) => {
    setI((v) => (v + d + N) % N)
    setZoom(1)
  }, [])

  // Zoom in on the point that was clicked, or out again.
  const toggleZoom = (e?: React.MouseEvent) => {
    const pane = paneRef.current
    if (!pane) return
    if (zoom > 1) return setZoom(1)
    const r = pane.getBoundingClientRect()
    const fx = e ? (e.clientX - r.left) / r.width : 0.5
    const fy = e ? (e.clientY - r.top) / r.height : 0.5
    setZoom(2)
    requestAnimationFrame(() => {
      pane.scrollLeft = fx * pane.scrollWidth - r.width / 2
      pane.scrollTop = fy * pane.scrollHeight - r.height / 2
    })
  }

  React.useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = overflow
      prev?.focus()
    }
  }, [go, onClose])

  const s = webScreens[i]
  const p = productOf(i)
  const btn =
    "grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`${p.name}: ${s.title}`} className="fixed inset-0 z-50 flex flex-col bg-black/90">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 pt-5 text-white sm:px-6">
        <div className="min-w-0">
          <p className="t-label m-0 uppercase tracking-[0.06em] text-white/60">
            {p.name} · {p.title}
          </p>
          <p className="t-body1 m-0 truncate">{s.title}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label={zoom > 1 ? "Zoom out" : "Zoom in"} onClick={() => toggleZoom()} className={btn}>
            {zoom > 1 ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          </button>
          <button ref={closeRef} type="button" aria-label="Close" onClick={onClose} className={btn}>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={paneRef}
        className={`relative mx-auto my-4 min-h-0 w-full max-w-[1400px] flex-1 px-5 sm:px-6 ${zoom > 1 ? "overflow-auto" : "overflow-hidden"}`}
        onClick={(e) => e.target === e.currentTarget && zoom === 1 && onClose()}
      >
        <div
          className={zoom > 1 ? "" : "flex h-full w-full items-center justify-center"}
          style={zoom > 1 ? { width: `${zoom * 100}%` } : undefined}
          onClick={(e) => e.target === e.currentTarget && zoom === 1 && onClose()}
        >
          <Image
            key={s.src}
            src={s.src}
            alt={`${p.name}: ${s.title}`}
            width={1440}
            height={900}
            unoptimized
            data-screen
            onClick={toggleZoom}
            className={`rounded-[8px] ${zoom > 1 ? "h-auto w-full cursor-zoom-out" : "max-h-full w-auto max-w-full cursor-zoom-in object-contain"}`}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 pb-6 text-white">
        <button type="button" aria-label="Previous screen" onClick={() => go(-1)} className={btn}>
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="t-label tabular-nums text-white/60">
          {i + 1} / {N}
        </span>
        <button type="button" aria-label="Next screen" onClick={() => go(1)} className={btn}>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>,
    document.body
  )
}


export function WebLibrary() {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const stageW = useWidth(stageRef)
  const phone = stageW < 640
  const w = phone ? stageW * 0.8 : Math.min(stageW * 0.5, 760)
  const still = useReducedMotion() ?? false

  const [active, setActive] = React.useState(0)
  const [dir, setDir] = React.useState<1 | -1>(1)
  // Places as shown. A project that wraps round from one side to the other first jumps, unseen, to
  // the far place on the side it enters from, then slides in on the next frame.
  const [shown, setShown] = React.useState(() => offsets(0, 1).map((o) => ({ o, jump: false })))
  const [open, setOpen] = React.useState<number | null>(null)

  const go = React.useCallback(
    (d: 1 | -1) => {
      const next = active + d
      const target = offsets(next, d)
      setActive(next)
      setDir(d)
      setShown((prev) => {
        const wraps = target.map((o, i) => Math.abs(o - prev[i].o) > 1.5)
        if (!wraps.some(Boolean)) return target.map((o) => ({ o, jump: false }))
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setShown(target.map((o) => ({ o, jump: false }))))
        )
        return target.map((o, i) => (wraps[i] ? { o: o + d, jump: true } : { o: prev[i].o, jump: false }))
      })
    },
    [active]
  )

  // Swipe on touch screens.
  const swipe = React.useRef<number | null>(null)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") swipe.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipe.current === null) return
    const dx = e.clientX - swipe.current
    swipe.current = null
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }

  const current = projects[mod(active, P)]
  const spring = still ? { duration: 0 } : { type: "spring" as const, stiffness: 90, damping: 18, mass: 1 }
  const arrow =
    "grid h-12 w-12 place-items-center rounded-full bg-[var(--home-soft)] text-[var(--home-fg)] shadow-[inset_0_0_0_1px_var(--home-line)] transition-transform hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--home-fg)]"

  return (
    <section id="web" aria-roledescription="carousel" aria-label="Web and enterprise projects" className="pt-16 sm:pt-[72px]">
      <div className={grid}>
        <div className="home-rule">
          <span className="home-label">Web &amp; enterprise</span>
          <span className="home-label">{P} products</span>
        </div>
        <p className="t-h2 mt-6 max-w-[640px] [text-wrap:balance]">Dense, data-heavy systems people work in all day.</p>
      </div>

      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1)
          if (e.key === "ArrowLeft") go(-1)
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="relative mt-10 touch-pan-y select-none overflow-hidden outline-none"
        style={{ height: w * 0.72 + 56, perspective: phone ? 1100 : 1800 }}
      >
        {projects.map((p, i) => {
          const { o, jump } = shown[i]
          const t = pose(o, w, phone)
          const middle = o === 0
          return (
            <motion.div
              key={p.id}
              initial={false}
              animate={{ x: t.x, z: t.z, rotateY: t.rotateY, opacity: t.opacity }}
              transition={jump ? { duration: 0 } : spring}
              className="absolute left-1/2 top-5"
              style={{ width: w, marginLeft: -w / 2, zIndex: 10 - Math.abs(o), transformStyle: "preserve-3d" }}
              aria-hidden={!middle}
            >
              <button
                type="button"
                tabIndex={middle ? 0 : -1}
                aria-label={middle ? `Open ${p.name} screens full size` : `Show ${p.name}`}
                onClick={() => (middle ? setOpen(p.first) : go(o > 0 ? 1 : -1))}
                className={`relative block w-full ${middle ? "cursor-zoom-in" : "cursor-pointer"} ${
                  Math.abs(o) > 1 ? "pointer-events-none" : ""
                }`}
              >
                <MacBook src={webScreens[p.first].src} alt={`${p.name}: ${webScreens[p.first].title}`} eager={i === 0} />
                {/* Neighbours are dimmed, like the cards beside the one in focus. */}
                <motion.span
                  aria-hidden="true"
                  initial={false}
                  animate={{ opacity: t.shade }}
                  transition={jump ? { duration: 0 } : spring}
                  className="pointer-events-none absolute inset-0 rounded-[2%] bg-[var(--home-bg)]"
                />
              </button>
            </motion.div>
          )
        })}

        {/* Arrows on both sides, over the neighbours. */}
        <div className={`${grid} pointer-events-none absolute inset-x-0 top-5 z-20 flex items-center justify-between max-sm:hidden`} style={{ height: w * 0.63 }}>
          <button type="button" aria-label="Previous project" onClick={() => go(-1)} className={`${arrow} pointer-events-auto`}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Next project" onClick={() => go(1)} className={`${arrow} pointer-events-auto`}>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className={`${grid} mt-2 flex flex-col items-center text-center`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -24 }}
            transition={{ duration: still ? 0 : 0.3 }}
            className="flex max-w-[520px] flex-col items-center gap-1.5"
            aria-live="polite"
          >
            <span className="home-label tabular-nums">
              {String(mod(active, P) + 1).padStart(2, "0")} / {String(P).padStart(2, "0")} · {current.years}
            </span>
            <h3 className="t-h2 m-0">{current.name}</h3>
            <p className="t-body1 m-0">{current.title}</p>
            <p className="t-body2 home-muted m-0">{current.line}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center gap-3">
          <button type="button" aria-label="Previous project" onClick={() => go(-1)} className={`${arrow} sm:hidden`}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(current.first)}
            className="home-chip !h-12 gap-2 rounded-full !px-5 text-[12px] transition-opacity hover:opacity-80"
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            View screens
          </button>
          <button type="button" aria-label="Next project" onClick={() => go(1)} className={`${arrow} sm:hidden`}>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex gap-1.5" aria-hidden="true">
          {projects.map((p, i) => (
            <span
              key={p.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === mod(active, P) ? "w-5 bg-[var(--home-fg)]" : "w-1.5 bg-[var(--home-line)]"
              }`}
            />
          ))}
        </div>
      </div>

      {open !== null && <Viewer start={open} onClose={() => setOpen(null)} />}
    </section>
  )
}

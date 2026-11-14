"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion"
import { ArrowLeft, ArrowRight, Search, X, ZoomIn, ZoomOut } from "lucide-react"

import { grid } from "@/components/home/grid"
import { webProducts, webScreens } from "@/content/web-library"

/**
 * Web library: the desktop screens from the web and enterprise products as a deck of cards, tipped
 * back and receding into the page. Scrolling moves through the deck: front cards drop away and
 * new ones come forward from the back. Hovering a card turns it to face you and parts the cards
 * around it; clicking opens it full size in a viewer that zooms in.
 */

const N = webScreens.length
const productOf = (i: number) => webProducts.find((p) => p.id === webScreens[i].product)!

// Deck geometry. Distance is in cards from the front: 0 is the front card, 1 the one behind it.
// Like a drawer of folders seen from the front: cards stand almost upright, each one showing the
// top strip of its screen above the card in front, the strips thinning toward the top of the screen.
const TILT = 14 // how far each card leans back, in degrees
const DECAY = 0.9 // each strip is this much shorter than the one in front of it
const VISIBLE = 10 // cards shown behind the front one
const SCROLL_PER_CARD = 0.32 // viewport heights of scrolling per card
const LAST_FRONT = N // one full turn of the deck: every card comes to the front once

/**
 * How far a card sits behind the front for scroll position `f`. The deck goes round: a card that
 * drops off the front, out of sight below the screen, rejoins the back, so the stack stays full.
 */
const depth = (index: number, f: number) => {
  const d = (((index - f) % N) + N) % N
  return d > N - 1.6 ? d - N : d
}

/** Card width for the stage: about two fifths of a desktop, nearly the full width of a phone. */
const cardWidth = (box: { w: number; h: number }) =>
  box.w < 640 ? box.w * 0.88 : Math.min(box.w * 0.42, (box.h * 0.6 * 16) / 10, 680)

/** Where a card's top edge sits and how big it is, `d` cards behind the front. */
function place(d: number, box: { w: number; h: number }) {
  const phone = box.w < 640
  const strip = box.h * (phone ? 0.08 : 0.115)
  const frontTop = box.h * (phone ? 0.68 : 0.84)
  if (d < 0) {
    // Cards in front of the deck drop away below the screen.
    return { top: frontTop - d * box.h * 0.45, scale: 1 - d * 0.03 }
  }
  return { top: frontTop - (strip * (1 - DECAY ** d)) / (1 - DECAY), scale: Math.max(0.6, 1 - d * 0.03) }
}

function useBox(ref: React.RefObject<HTMLElement>) {
  const [box, setBox] = React.useState({ w: 1200, h: 800 })
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return box
}

function Card({
  index,
  front,
  box,
  hovered,
  onHover,
  onOpen,
  onFocusCard
}: {
  index: number
  front: MotionValue<number>
  box: { w: number; h: number }
  hovered: number | null
  onHover: (i: number | null) => void
  onOpen: (i: number) => void
  onFocusCard: (i: number) => void
}) {
  const s = webScreens[index]
  const cw = cardWidth(box)
  const ch = (cw * 10) / 16

  const transform = useTransform(front, (f) => {
    const { top, scale } = place(depth(index, f), box)
    return `translate(-50%, ${Math.round(top * 100) / 100}px) scale(${Math.round(scale * 1e4) / 1e4})`
  })
  const opacity = useTransform(front, (f) => {
    const d = depth(index, f)
    if (d < -1.4) return 0
    if (d > VISIBLE - 1) return Math.max(0, VISIBLE - d)
    return 1
  })

  // While a card is open it faces you at full height. The cards in front of it drop to just below
  // it, the ones behind close up a little, and the whole deck shifts if needed so the open card
  // fits on the screen.
  const zIndex = useTransform(front, (f) => Math.round(200 - depth(index, f) * 10))

  const open = hovered === index
  let push = 0
  if (hovered !== null) {
    const f = front.get()
    const dh = depth(hovered, f)
    const d = depth(index, f)
    const h = place(dh, box)
    const bottom = h.top + ch * h.scale
    let shift = 0
    if (bottom > box.h * 0.94) shift = box.h * 0.94 - bottom
    if (h.top + shift < box.h * 0.06) shift = box.h * 0.06 - h.top
    if (d < dh) push = shift + Math.max(0, bottom + 14 - place(dh - 1, box).top)
    else if (d > dh) push = shift - box.h * 0.015
    else push = shift
  }

  return (
    <motion.div
      style={{ transform, opacity, zIndex, width: cw, height: ch }}
      className="pointer-events-none absolute left-1/2 top-0 origin-top will-change-transform"
    >
      <div
        className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateY(${push}px)` }}
      >
        <button
          type="button"
          aria-label={`${productOf(index).name}: ${s.title}. Open full size`}
          onPointerEnter={(e) => e.pointerType === "mouse" && onHover(index)}
          onPointerLeave={(e) => e.pointerType === "mouse" && onHover(null)}
          onFocus={() => onFocusCard(index)}
          onBlur={() => onHover(null)}
          onClick={() => onOpen(index)}
          data-screen
          className="web-card pointer-events-auto relative block h-full w-full overflow-hidden rounded-[8px] bg-[var(--home-soft)] shadow-[0_0_0_1px_var(--home-line),0_-12px_32px_-12px_rgba(0,0,0,0.35)] outline-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-[var(--home-fg)]"
          style={{ transform: `perspective(900px) rotateX(${open ? 0 : TILT}deg)`, transformOrigin: "50% 100%" }}
        >
          <Image
            src={s.src}
            alt=""
            fill
            sizes="(max-width: 640px) 88vw, 680px"
            className="object-cover object-top"
            draggable={false}
          />
        </button>
      </div>
    </motion.div>
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
  const sectionRef = React.useRef<HTMLElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const box = useBox(stageRef)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const front = useTransform(scrollYProgress, [0, 1], [0, LAST_FRONT])

  const [hovered, setHovered] = React.useState<number | null>(null)
  const [open, setOpen] = React.useState<number | null>(null)
  const [frontIndex, setFrontIndex] = React.useState(0)
  useMotionValueEvent(front, "change", (f) => setFrontIndex(Math.round(f) % N))

  // The round "Zoom" button that follows the cursor over a card.
  const [cursor, setCursor] = React.useState({ x: 0, y: 0 })
  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect()
    if (r) setCursor({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  // Tabbing to a card out of view scrolls the deck to it.
  const focusCard = (i: number) => {
    setHovered(i)
    const el = sectionRef.current
    if (!el) return
    const f = front.get()
    const d = depth(i, f)
    if (d >= 0 && d <= VISIBLE - 3) return
    const target = i / LAST_FRONT
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + target * (el.offsetHeight - window.innerHeight) })
  }

  const label = hovered ?? frontIndex
  const product = productOf(label)

  return (
    <>
      <div className={`${grid} pt-16 sm:pt-[72px]`}>
        <div className="home-rule">
          <span className="home-label">Web &amp; enterprise</span>
          <span className="home-label">{webProducts.length} products</span>
        </div>
        <p className="t-h2 mt-6 max-w-[640px] [text-wrap:balance]">Dense, data-heavy systems people work in all day.</p>
      </div>

      <section
        ref={sectionRef}
        id="web"
        aria-label="Web and enterprise screens"
        style={{ height: `${100 + LAST_FRONT * SCROLL_PER_CARD * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 isolate h-[100svh] overflow-hidden">
          <div ref={stageRef} className="absolute inset-0" onMouseMove={onMove}>
            {webScreens.map((_, i) => (
              <Card
                key={i}
                index={i}
                front={front}
                box={box}
                hovered={hovered}
                onHover={setHovered}
                onOpen={setOpen}
                onFocusCard={focusCard}
              />
            ))}

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute left-0 top-0 z-[300] grid h-[84px] w-[84px] place-items-center rounded-full bg-[var(--story-accent)] text-white transition-[opacity,transform] duration-200 max-sm:hidden ${
                hovered === null ? "scale-50 opacity-0" : "scale-100 opacity-100"
              }`}
              style={{ translate: `${cursor.x + 18}px ${cursor.y - 42}px` }}
            >
              <span className="flex flex-col items-center gap-1 text-center">
                <Search className="h-4 w-4" />
                <span className="t-label uppercase tracking-[0.06em]">Zoom</span>
              </span>
            </div>
          </div>

          {/* Labels on the sides of the deck, like a filing drawer: the project in view, and the count. */}
          <div className={`${grid} pointer-events-none relative z-[300] flex h-full flex-col justify-between py-6 max-sm:pb-28`}>
            <span />
            <div className="flex items-start justify-between gap-6 max-sm:hidden">
              <div className="min-w-0 max-w-[200px]">
                <p className="home-label m-0 tabular-nums">
                  {label + 1}/{N} · {product.name}
                </p>
                <p className="t-body1 m-0">{webScreens[label].title}</p>
                <p className="t-body2 home-muted m-0 mt-1">
                  {product.title} · {product.years}
                </p>
              </div>
              <p className="t-body1 m-0 shrink-0">{N} screens</p>
            </div>
            <div className="flex items-end justify-between gap-6 max-sm:hidden">
              <p className="home-label m-0 max-w-[220px]">Filed by product. Hover to lift, click to zoom.</p>
              <button
                type="button"
                onClick={() => setOpen(0)}
                className="home-chip pointer-events-auto shrink-0 transition-opacity hover:opacity-80"
              >
                View all screens
              </button>
            </div>
          </div>

          {/* On phones the labels sit above the deck instead. */}
          <div className={`${grid} pointer-events-none absolute inset-x-0 top-5 z-[300] flex justify-between gap-4 sm:hidden`}>
            <div className="min-w-0">
              <p className="home-label m-0 tabular-nums">
                  {label + 1}/{N} · {product.name}
                </p>
              <p className="t-body2 m-0">{webScreens[label].title}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(0)}
              className="home-chip pointer-events-auto shrink-0 self-start"
            >
              View all {N}
            </button>
          </div>
        </div>
      </section>

      {open !== null && <Viewer start={open} onClose={() => setOpen(null)} />}
    </>
  )
}

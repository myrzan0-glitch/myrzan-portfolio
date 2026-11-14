"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react"

import { grid } from "@/components/home/grid"
import { webProducts, webScreens, type WebProductId } from "@/content/web-library"

/**
 * Web library: a tilted wall of desktop screens from the web and enterprise products, in columns
 * that drift up and down at different speeds as the page scrolls. Hovering a product below dims
 * every other product's screens, and hovering a screen lights its product up. A screen, or a
 * product's "View screens", opens it full size in a viewer.
 */

const productIndex = Object.fromEntries(webProducts.map((p, i) => [p.id, i])) as Record<WebProductId, number>

// Interleave the products so neighbouring screens in a column come from different products.
const mixed = (() => {
  const by = webProducts.map((p) => webScreens.filter((s) => s.product === p.id))
  const out: typeof webScreens = []
  for (let i = 0; i < Math.max(...by.map((b) => b.length)); i++) by.forEach((b) => b[i] && out.push(b[i]))
  return out
})()

const COLUMNS = 5
const PER_COLUMN = 7
const columns = Array.from({ length: COLUMNS }, (_, c) =>
  Array.from({ length: PER_COLUMN }, (_, i) => mixed[(c * 3 + i) % mixed.length])
)

function BrowserFrame({ src, title, product }: { src: string; title: string; product: string }) {
  return (
    <div
      data-screen
      className="overflow-hidden rounded-[10px] bg-[var(--home-bg)] shadow-[0_0_0_1px_var(--home-line),0_30px_60px_-30px_rgba(0,0,0,0.45)]"
    >
      <div className="flex h-6 items-center gap-1.5 border-b border-[var(--home-line)] bg-[var(--home-soft)] px-2.5">
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--home-line)]" />
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--home-line)]" />
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--home-line)]" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={`${product}: ${title}`} fill sizes="(max-width: 640px) 220px, 340px" className="object-cover object-left-top" />
      </div>
    </div>
  )
}

function Column({
  items,
  index,
  progress,
  still,
  active,
  onHover,
  onOpen
}: {
  items: typeof webScreens
  index: number
  progress: MotionValue<number>
  still: boolean
  active: WebProductId | null
  onHover: (p: WebProductId | null) => void
  onOpen: (src: string) => void
}) {
  // Odd columns move against even ones, each at its own pace, so the wall shears as you scroll.
  const travel = (index % 2 ? -1 : 1) * (120 + index * 18)
  const y = useTransform(progress, [0, 1], [-travel, travel])

  return (
    <motion.div
      style={still ? undefined : { y }}
      className={`flex w-[220px] shrink-0 flex-col gap-4 sm:w-[340px] sm:gap-5 ${index % 2 ? "-mt-40" : ""}`}
    >
      {items.map((s, i) => {
        const name = webProducts[productIndex[s.product]].name
        const dim = active !== null && active !== s.product
        return (
          <button
            key={`${s.src}-${i}`}
            type="button"
            tabIndex={-1}
            onMouseEnter={() => onHover(s.product)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onOpen(s.src)}
            className={`block text-left transition-[opacity,transform] duration-300 hover:-translate-y-1 ${
              dim ? "opacity-25" : "opacity-100"
            }`}
          >
            <BrowserFrame src={s.src} title={s.title} product={name} />
          </button>
        )
      })}
    </motion.div>
  )
}

function Viewer({ start, onClose }: { start: number; onClose: () => void }) {
  const [i, setI] = React.useState(start)
  const n = webScreens.length
  const go = React.useCallback((d: number) => setI((v) => (v + d + n) % n), [n])
  const closeRef = React.useRef<HTMLButtonElement>(null)

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
  const p = webProducts[productIndex[s.product]]
  const btn =
    "grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${p.name}: ${s.title}`}
      className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-5 pt-5 text-white sm:px-6">
        <div className="min-w-0">
          <p className="t-label m-0 uppercase tracking-[0.06em] text-white/60">
            {p.name} · {p.title}
          </p>
          <p className="t-body1 m-0 truncate">{s.title}</p>
        </div>
        <button ref={closeRef} type="button" aria-label="Close" onClick={onClose} className={btn}>
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center p-5 sm:p-8">
        <div
          data-screen
          className="relative aspect-[16/10] max-h-full w-full max-w-[1200px] overflow-hidden rounded-[10px] bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image key={s.src} src={s.src} alt={`${p.name}: ${s.title}`} fill sizes="(max-width: 1280px) 100vw, 1200px" className="object-contain" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 pb-6 text-white" onClick={(e) => e.stopPropagation()}>
        <button type="button" aria-label="Previous screen" onClick={() => go(-1)} className={btn}>
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="t-label tabular-nums text-white/60">
          {i + 1} / {n}
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
  const wallRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wallRef, offset: ["start end", "end start"] })
  const still = useReducedMotion() ?? false
  const [active, setActive] = React.useState<WebProductId | null>(null)
  const [open, setOpen] = React.useState<number | null>(null)

  const openSrc = (src: string) => setOpen(webScreens.findIndex((s) => s.src === src))
  const openProduct = (id: WebProductId) => setOpen(webScreens.findIndex((s) => s.product === id))

  return (
    <section id="web" className="pt-16 sm:pt-[72px]">
      <div className={grid}>
        <div className="home-rule">
          <span className="home-label">Web &amp; enterprise</span>
          <span className="home-label">{webProducts.length} products</span>
        </div>
        <p className="t-h2 mt-6 max-w-[640px] [text-wrap:balance]">
          Dense, data-heavy systems people work in all day.
        </p>
        <p className="t-body1 home-muted mt-4 max-w-[640px]">
          Bank front offices, warehouses and enterprise workflows: long tables, multi-step forms, roles and
          approvals, built for speed on a desktop.
        </p>
      </div>

      {/* The wall is decorative for assistive tech: every screen is reachable from the product list below. */}
      <div
        ref={wallRef}
        aria-hidden="true"
        className="web-wall relative mt-10 h-[440px] overflow-hidden sm:h-[640px]"
      >
        <div className="web-plane absolute left-1/2 top-1/2 flex gap-4 sm:gap-5">
          {columns.map((items, c) => (
            <Column
              key={c}
              items={items}
              index={c}
              progress={scrollYProgress}
              still={still}
              active={active}
              onHover={setActive}
              onOpen={openSrc}
            />
          ))}
        </div>
      </div>

      <div className={`${grid} mt-8`}>
        <ul className="m-0 grid list-none gap-x-4 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {webProducts.map((p) => {
            const count = webScreens.filter((s) => s.product === p.id).length
            const dim = active !== null && active !== p.id
            return (
              <li
                key={p.id}
                onMouseEnter={() => setActive(p.id)}
                onMouseLeave={() => setActive(null)}
                className={`row-span-4 grid grid-rows-subgrid gap-y-1.5 border-t pt-4 transition-[opacity,border-color] duration-300 ${
                  active === p.id ? "border-[var(--home-fg)]" : "border-[var(--home-line)]"
                } ${dim ? "opacity-40" : ""}`}
              >
                <span className="home-label">
                  {p.years} · {p.name}
                </span>
                <span className="t-body1 font-medium">{p.title}</span>
                <span className="t-body2 home-muted">{p.line}</span>
                <button
                  type="button"
                  onClick={() => openProduct(p.id)}
                  onFocus={() => setActive(p.id)}
                  onBlur={() => setActive(null)}
                  className="t-body2 mt-1.5 inline-flex w-max items-center self-start gap-1.5 text-[var(--home-fg)] underline-offset-4 hover:underline"
                >
                  <Maximize2 className="h-3 w-3" aria-hidden="true" />
                  View {count} screens
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {open !== null && open >= 0 && <Viewer start={open} onClose={() => setOpen(null)} />}
    </section>
  )
}

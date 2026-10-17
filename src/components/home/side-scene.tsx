"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import * as THREE from "three"
import { CSS3DObject, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js"

import { FILMS, type Kind } from "./side-scene-films"

/**
 * Side-project cards: a short three.js film of how each app works. The cards on stage are real
 * DOM, the apps' own components rebuilt in code (see side-scene-films), placed in 3D by
 * CSS3DRenderer, so text stays sharp at any size. Plays only while the card is on screen; the
 * static cover stays for reduced motion.
 */

/** Half the stage's height (the stage is 16 × 9) and the camera distance that fits it. */
const HALF_H = 4.5
const FOV = 32
const DISTANCE = HALF_H / Math.tan(THREE.MathUtils.degToRad(FOV / 2))

type Slots = { fronts: HTMLElement[]; backs: (HTMLElement | null)[] }

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function SideScene({ kind, poster, alt, sizes }: { kind: Kind; poster: string; alt: string; sizes: string }) {
  const film = FILMS[kind]
  const box = React.useRef<HTMLDivElement>(null)
  const bar = React.useRef<HTMLDivElement>(null)
  const [slots, setSlots] = React.useState<Slots | null>(null)
  const [ready, setReady] = React.useState(false)
  const [step, setStep] = React.useState(0)

  React.useEffect(() => {
    const el = box.current
    if (!el || reducedMotion()) return
    let started = false

    const start = () => {
      started = true
      const renderer = new CSS3DRenderer()
      const root = renderer.domElement
      root.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none"
      root.setAttribute("aria-hidden", "true")
      el.querySelector("[data-stage]")?.appendChild(root)

      const scene = new THREE.Scene()
      const stage = new THREE.Group()
      scene.add(stage)
      const camera = new THREE.PerspectiveCamera(FOV, 16 / 9, 1, 10000)

      const slot = (px: number) => {
        const div = document.createElement("div")
        div.style.width = `${px}px`
        div.style.backfaceVisibility = "hidden"
        const object = new CSS3DObject(div)
        div.style.pointerEvents = "none"
        return { div, object }
      }
      const fronts: HTMLElement[] = []
      const backs: (HTMLElement | null)[] = []
      const objects = film.actors.map((a) => {
        const front = slot(a.px)
        stage.add(front.object)
        fronts.push(front.div)
        // A card's other side: turned around behind it, shown when the card flips.
        if (a.back) {
          const back = slot(a.px)
          back.object.rotation.y = Math.PI
          front.object.add(back.object)
          backs.push(back.div)
        } else backs.push(null)
        return front.object
      })
      setSlots({ fronts, backs })

      const cache = new Map<string, HTMLElement>()
      const q = (selector: string) => {
        const found = cache.get(selector) ?? root.querySelector<HTMLElement>(selector)
        if (found) cache.set(selector, found)
        return found
      }

      let raf = 0
      let visible = true
      let currentStep = -1
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1
        pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1
      }
      const onLeave = () => {
        pointer.tx = 0
        pointer.ty = 0
      }

      const begin = performance.now()
      const frame = (now: number) => {
        const t = ((now - begin) / 1000) % film.length
        film.actors.forEach((a, i) => {
          const p = a.pose(t)
          const o = objects[i]
          o.position.set(p.x, p.y, p.z ?? 0)
          o.rotation.set(p.rx ?? 0, p.ry ?? 0, p.rz ?? 0)
          o.scale.setScalar((a.w / a.px) * (p.s ?? 1))
          o.visible = p.o > 0.001
          fronts[i].style.opacity = String(p.o)
          const back = backs[i]
          if (back) back.style.opacity = String(p.o)
        })
        film.tick?.(t, q)
        pointer.x += (pointer.tx - pointer.x) * 0.06
        pointer.y += (pointer.ty - pointer.y) * 0.06
        stage.rotation.y = pointer.x * 0.08
        stage.rotation.x = pointer.y * 0.05

        const s = film.steps.reduce((acc, st, i) => (t >= st.at ? i : acc), 0)
        if (s !== currentStep) {
          currentStep = s
          setStep(s)
        }
        if (bar.current) bar.current.style.transform = `scaleX(${t / film.length})`
        renderer.render(scene, camera)
      }

      const resize = () => {
        const w = el.clientWidth
        const h = el.clientHeight
        if (!w || !h) return
        renderer.setSize(w, h)
        camera.aspect = w / h
        // One stage unit is `unit` CSS pixels and the camera sits where the z = 0 plane is drawn
        // 1:1, so cards are laid out at their real on-screen size and never scaled up (crisp text).
        const unit = h / (HALF_H * 2)
        camera.position.z = DISTANCE * unit
        camera.near = unit
        camera.far = DISTANCE * unit * 4
        camera.updateProjectionMatrix()
        // A little smaller and lower, so the caption on top never covers a card.
        stage.scale.setScalar(0.86 * unit)
        stage.position.y = -0.55 * unit
      }
      const loop = (now: number) => {
        frame(now)
        raf = requestAnimationFrame(loop)
      }
      const update = () => {
        cancelAnimationFrame(raf)
        if (visible && !document.hidden) raf = requestAnimationFrame(loop)
      }
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        update()
      })
      const ro = new ResizeObserver(resize)
      io.observe(el)
      ro.observe(el)
      document.addEventListener("visibilitychange", update)
      el.addEventListener("pointermove", onMove)
      el.addEventListener("pointerleave", onLeave)
      resize()

      // The portals fill the slots on the next render; show the stage once they have.
      const show = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          frame(performance.now())
          setReady(true)
          update()
        })
      )

      return () => {
        cancelAnimationFrame(show)
        cancelAnimationFrame(raf)
        io.disconnect()
        ro.disconnect()
        document.removeEventListener("visibilitychange", update)
        el.removeEventListener("pointermove", onMove)
        el.removeEventListener("pointerleave", onLeave)
        root.remove()
        setSlots(null)
        setReady(false)
      }
    }

    // Build the film only when the card comes near the screen.
    let stop: (() => void) | undefined
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          near.disconnect()
          stop = start()
        }
      },
      { rootMargin: "300px" }
    )
    near.observe(el)
    return () => {
      near.disconnect()
      stop?.()
    }
  }, [film])

  return (
    <div ref={box} className="absolute inset-0">
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover object-top transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <div
        data-stage
        aria-hidden="true"
        className={`absolute inset-0 select-none text-left antialiased transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        style={{ background: film.backdrop }}
      />
      {slots &&
        film.actors.map((a, i) => (
          <React.Fragment key={i}>
            {createPortal(a.node, slots.fronts[i])}
            {a.back && slots.backs[i] && createPortal(a.back, slots.backs[i]!)}
          </React.Fragment>
        ))}
      {ready && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col justify-between p-2.5 sm:p-3">
          <span className="max-w-full w-fit truncate whitespace-nowrap rounded-full border border-black/10 bg-white/90 px-2.5 py-1 text-[11px] font-medium leading-none text-neutral-900 shadow-sm backdrop-blur sm:text-xs">
            <span className="tabular-nums text-neutral-500">
              {step + 1}/{film.steps.length}
            </span>{" "}
            · {film.steps[step].text}
          </span>
          <span className="h-0.5 w-full overflow-hidden rounded-full bg-black/10">
            <span ref={bar} className="block h-full origin-left rounded-full" style={{ background: film.accent, transform: "scaleX(0)" }} />
          </span>
        </div>
      )}
    </div>
  )
}

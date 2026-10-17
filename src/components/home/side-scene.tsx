"use client"

import * as React from "react"
import Image from "next/image"
import * as THREE from "three"

/**
 * Side-project cards: a short three.js film of how each app works, built from screenshots of
 * the apps' real components (their own shadcn tokens and colours). Shown only while the card is
 * on screen; the static cover stays for reduced motion, without WebGL and while textures load.
 */

type Kind = "wallet" | "izipass"

/** Texture size in pixels and the transparent shadow padding baked around the component. */
const TEX: Record<string, [number, number, number]> = {
  "w-form": [1119, 1188, 82],
  "w-plastic": [1188, 838, 82],
  "w-card-apple": [1184, 1148, 82],
  "w-card-google": [1184, 1094, 82],
  "w-wifi": [1108, 1188, 82],
  "w-link": [1184, 1136, 82],
  "w-add": [1188, 460, 82],
  "i-register": [1188, 613, 82],
  "i-pay": [1108, 1188, 82],
  "i-waiting": [930, 1188, 82],
  "i-ticket": [873, 1188, 82],
  "i-telegram": [1114, 643, 77],
  "i-checkin": [1188, 346, 82],
  "i-pass": [594, 657, 45],
  "i-receipt": [450, 650, 45]
}

type Pose = { x: number; y: number; z?: number; rx?: number; ry?: number; rz?: number; s?: number; o: number }

/** One component on stage: `h` is its height in world units (the stage is 16 × 9). */
type Actor = { tex: string; h: number; pose: (t: number) => Pose; order?: number }
/** A tap or a pulse: a ring that grows and fades at a point, in stage coordinates. */
type Ring = { at: number; x: number; y: number; color: string }
/** A red line sweeping a card, like a barcode being read. */
type Scan = { from: number; to: number; actor: number; color: string }

type Film = {
  length: number
  backdrop: string
  accent: string
  steps: { at: number; text: string }[]
  actors: Actor[]
  rings: Ring[]
  scans: Scan[]
}

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2)
/** 0 → 1 between `a` and `b`, eased. */
const k = (t: number, a: number, b: number) => ease(clamp((t - a) / (b - a)))
const mix = (a: number, b: number, v: number) => a + (b - a) * v
/** Visible from `a` (fading in until `b`) to `d` (fading out from `c`). */
const shown = (t: number, a: number, b: number, c: number, d: number) => k(t, a, b) * (1 - k(t, c, d))
const float = (t: number, phase: number, amount = 0.12) => Math.sin(t * 1.3 + phase) * amount

const WALLET: Film = {
  length: 12,
  backdrop:
    "radial-gradient(60% 90% at 78% 35%, rgba(37,99,235,0.16), transparent 70%), radial-gradient(50% 70% at 15% 90%, rgba(234,88,12,0.12), transparent 70%), oklch(0.985 0 0)",
  accent: "#2563eb",
  steps: [
    { at: 0, text: "Scan any card in the browser" },
    { at: 3.4, text: "It becomes an Apple or Google Wallet pass" },
    { at: 7.8, text: "Wi‑Fi and links work too" }
  ],
  // One thing at a time, large enough to read inside a small card.
  actors: [
    // 0 · the plastic loyalty card being scanned
    {
      tex: "w-plastic",
      h: 6.2,
      pose: (t) => ({
        x: 0,
        y: mix(-8, 0.1, k(t, 0, 0.8)) + float(t, 1, 0.06),
        rx: -0.12,
        ry: mix(0.5, 0, k(t, 0, 0.8)) + (Math.PI / 2) * k(t, 3.0, 3.6),
        rz: -0.05,
        o: shown(t, 0, 0.4, 3.5, 3.6)
      })
    },
    // 1 · link pass, fans out on the right
    {
      tex: "w-link",
      h: 7,
      pose: (t) => ({ x: mix(10, 4.7, k(t, 8.1, 8.9)), y: -0.1 + float(t, 4), z: -0.3, rz: -0.08, s: 0.85, o: shown(t, 8.1, 8.4, 11.2, 12) })
    },
    // 2 · the pass: turns out of the plastic card, flips to Google and back, then sits in the middle of the fan
    {
      tex: "w-card-apple",
      h: 8,
      order: 10,
      pose: (t) => ({
        x: 0,
        y: float(t, 2),
        z: 0.3,
        ry: mix(-Math.PI / 2, 0, k(t, 3.6, 4.2)) + Math.PI * (k(t, 5.4, 6.1) - k(t, 7.0, 7.7)),
        s: mix(1, 0.85, k(t, 7.8, 8.6)),
        o: shown(t, 3.6, 3.7, 11.2, 12)
      })
    },
    // 3 · Google preview: the back of the same pass
    { tex: "w-card-google", h: 7.8, pose: () => ({ x: 0, y: 0, o: 1 }), order: 11 },
    // 4 · Wi‑Fi pass, fans out on the left
    {
      tex: "w-wifi",
      h: 7.2,
      pose: (t) => ({ x: mix(-10, -4.7, k(t, 7.9, 8.7)), y: -0.1 + float(t, 5), z: -0.3, rz: 0.08, s: 0.85, o: shown(t, 7.9, 8.2, 11.2, 12) })
    }
  ],
  rings: [],
  scans: [{ from: 1.0, to: 2.7, actor: 0, color: "#ef4444" }]
}

const IZIPASS: Film = {
  length: 14,
  backdrop:
    "radial-gradient(60% 90% at 20% 30%, color-mix(in oklab, oklch(0.646 0.222 41.116) 16%, transparent), transparent 70%), radial-gradient(55% 80% at 85% 85%, color-mix(in oklab, oklch(0.828 0.189 84.429) 20%, transparent), transparent 70%), oklch(0.985 0 0)",
  accent: "oklch(0.646 0.222 41.116)",
  steps: [
    { at: 0, text: "Guests register on the event page" },
    { at: 2.7, text: "Pay the organizer, upload the receipt" },
    { at: 5.8, text: "The organizer approves in Telegram" },
    { at: 8.4, text: "Ticket lands in Apple or Google Wallet" },
    { at: 11.0, text: "Check-in at the door with one scan" }
  ],
  // One thing at a time, large enough to read inside a small card.
  actors: [
    // 0 · registration card with its Register button
    {
      tex: "i-register",
      h: 5.6,
      pose: (t) => ({ x: mix(0, -9, k(t, 2.4, 3.0)), y: 0.1 + float(t, 0, 0.06), s: mix(0.92, 1, k(t, 0, 0.6)), o: shown(t, 0, 0.5, 2.5, 3.0) })
    },
    // 1 · pay the organizer
    {
      tex: "i-pay",
      h: 8.6,
      pose: (t) => ({ x: mix(9, -2.6, k(t, 2.6, 3.3)), y: float(t, 1, 0.06), ry: 0.12, o: shown(t, 2.6, 3.0, 5.6, 6.0) })
    },
    // 2 · the receipt screenshot slides in next to it, then drops into the card
    {
      tex: "i-receipt",
      h: 6.4,
      pose: (t) => ({
        x: mix(mix(9, 3.8, k(t, 3.5, 4.3)), -2.4, k(t, 4.9, 5.6)),
        y: mix(-0.3, -1.2, k(t, 4.9, 5.6)),
        z: 1,
        rz: mix(0.2, 0.05, k(t, 3.5, 4.3)),
        s: mix(1, 0.35, k(t, 4.9, 5.6)),
        o: shown(t, 3.5, 3.8, 5.3, 5.6)
      })
    },
    // 3 · izipass bot message in Telegram
    {
      tex: "i-telegram",
      h: 5.8,
      pose: (t) => ({ x: 0, y: 0.2 + float(t, 3, 0.06), z: 0.5, s: mix(0.8, 1, k(t, 5.8, 6.4)), o: shown(t, 5.8, 6.2, 8.1, 8.5) })
    },
    // 4 · the approved ticket
    {
      tex: "i-ticket",
      h: 8.6,
      pose: (t) => ({ x: -3.0, y: float(t, 4, 0.06), ry: mix(-Math.PI / 2, 0.12, k(t, 8.4, 9.2)), o: shown(t, 8.4, 8.8, 13.2, 14) })
    },
    // 5 · its Wallet pass flies out to the right
    {
      tex: "i-pass",
      h: 6.6,
      pose: (t) => {
        const out = k(t, 9.4, 10.6)
        return {
          x: mix(-3, 3.8, out),
          y: mix(0, mix(0.2, 0.9, k(t, 10.8, 11.4)), out) + float(t, 5),
          z: mix(-0.5, 1, out),
          ry: mix(0, Math.PI * 2, out) + Math.sin(t * 0.9) * 0.15 * out,
          rz: -0.06 * out,
          s: mix(1, 0.85, k(t, 10.8, 11.4)),
          o: shown(t, 9.4, 9.8, 13.2, 14)
        }
      }
    },
    // 6 · checked in at the door
    {
      tex: "i-checkin",
      h: 2,
      pose: (t) => ({ x: 3.6, y: mix(-6, -3.0, k(t, 11.0, 11.6)), z: 1.6, o: shown(t, 11.0, 11.4, 13.2, 14) })
    }
  ],
  rings: [
    { at: 1.6, x: 0, y: -1.33, color: "#171717" },
    { at: 7.2, x: -2.17, y: -1.7, color: "#2aabee" },
    { at: 12.0, x: 1.05, y: -2.85, color: "#16a34a" }
  ],
  scans: []
}

const FILMS: Record<Kind, Film> = { wallet: WALLET, izipass: IZIPASS }

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function SideScene({ kind, poster, alt, sizes }: { kind: Kind; poster: string; alt: string; sizes: string }) {
  const film = FILMS[kind]
  const box = React.useRef<HTMLDivElement>(null)
  const bar = React.useRef<HTMLDivElement>(null)
  const [ready, setReady] = React.useState(false)
  const [step, setStep] = React.useState(0)

  React.useEffect(() => {
    const el = box.current
    if (!el || reducedMotion()) return
    let started = false

    const start = () => {
      started = true
      let renderer: THREE.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" })
      } catch {
        return
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      const canvas = renderer.domElement
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%"
      canvas.setAttribute("aria-hidden", "true")
      el.querySelector("[data-stage]")?.appendChild(canvas)

      const scene = new THREE.Scene()
      const stage = new THREE.Group()
      // A little smaller and lower, so the caption on top never covers a component.
      stage.scale.setScalar(0.86)
      stage.position.y = -0.55
      scene.add(stage)
      // A 16 × 9 stage fills the frame at z = 0.
      const camera = new THREE.PerspectiveCamera(32, 16 / 9, 0.1, 100)
      camera.position.z = 4.5 / Math.tan(THREE.MathUtils.degToRad(16))

      const loader = new THREE.TextureLoader()
      const textures: THREE.Texture[] = []
      const load = (name: string) =>
        new Promise<THREE.Texture>((resolve, reject) =>
          loader.load(
            `/side/scene/${name}.webp`,
            (tex) => {
              tex.colorSpace = THREE.SRGBColorSpace
              tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
              textures.push(tex)
              resolve(tex)
            },
            undefined,
            reject
          )
        )

      const plane = (name: string, tex: THREE.Texture, h: number) => {
        const [w, hp] = TEX[name]
        const material = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false })
        return new THREE.Mesh(new THREE.PlaneGeometry((h * w) / hp, h), material)
      }

      let raf = 0
      let visible = true
      let disposed = false
      let stopLoop = () => {}
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

      Promise.all(film.actors.map((a) => load(a.tex)))
        .then((loaded) => {
          if (disposed) return
          const meshes = film.actors.map((a, i) => {
            const mesh = plane(a.tex, loaded[i], a.h)
            mesh.renderOrder = a.order ?? i
            stage.add(mesh)
            return mesh
          })
          // The Google preview is the back of the Apple preview: it shows when the pass flips.
          if (kind === "wallet") {
            const back = meshes[3]
            stage.remove(back)
            back.rotation.y = Math.PI
            back.position.z = -0.01
            meshes[2].add(back)
          }

          const rings = film.rings.map((r) => {
            const mesh = new THREE.Mesh(
              new THREE.RingGeometry(0.34, 0.42, 48),
              new THREE.MeshBasicMaterial({ color: r.color, transparent: true, depthWrite: false, toneMapped: false })
            )
            mesh.renderOrder = 100
            mesh.position.set(r.x, r.y, 2)
            stage.add(mesh)
            return mesh
          })
          const scans = film.scans.map((s) => {
            const host = meshes[s.actor]
            const width = (host.geometry as THREE.PlaneGeometry).parameters.width * 0.8
            const mesh = new THREE.Mesh(
              new THREE.PlaneGeometry(width, 0.05),
              new THREE.MeshBasicMaterial({ color: s.color, transparent: true, depthWrite: false, toneMapped: false })
            )
            const glow = new THREE.Mesh(
              new THREE.PlaneGeometry(width, 0.35),
              new THREE.MeshBasicMaterial({ color: s.color, transparent: true, opacity: 0.18, depthWrite: false, toneMapped: false })
            )
            mesh.add(glow)
            mesh.renderOrder = 101
            glow.renderOrder = 100
            mesh.position.z = 0.02
            host.add(mesh)
            return mesh
          })

          let currentStep = -1
          const begin = performance.now()
          const frame = (now: number) => {
            const t = ((now - begin) / 1000) % film.length
            film.actors.forEach((a, i) => {
              if (kind === "wallet" && i === 3) return
              const p = a.pose(t)
              const m = meshes[i]
              m.position.set(p.x, p.y, p.z ?? 0)
              m.rotation.set(p.rx ?? 0, p.ry ?? 0, p.rz ?? 0)
              m.scale.setScalar(p.s ?? 1)
              m.visible = p.o > 0.001
              ;(m.material as THREE.MeshBasicMaterial).opacity = p.o
              if (kind === "wallet" && i === 2) (meshes[3].material as THREE.MeshBasicMaterial).opacity = p.o
            })
            film.rings.forEach((r, i) => {
              const v = clamp((t - r.at) / 0.9)
              const m = rings[i]
              m.visible = t >= r.at && v < 1
              m.scale.setScalar(0.4 + v * 1.4)
              ;(m.material as THREE.MeshBasicMaterial).opacity = (1 - v) * 0.9
            })
            film.scans.forEach((s, i) => {
              const m = scans[i]
              const v = clamp((t - s.from) / (s.to - s.from))
              const h = (meshes[s.actor].geometry as THREE.PlaneGeometry).parameters.height
              m.visible = t >= s.from && t <= s.to
              // Down over the barcode and back up, like a scanner.
              m.position.y = -0.1 * h - 0.26 * h * Math.sin(v * Math.PI)
            })
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
            renderer.setSize(w, h, false)
            camera.aspect = w / h
            camera.updateProjectionMatrix()
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
          frame(performance.now())
          setReady(true)
          update()

          stopLoop = () => {
            cancelAnimationFrame(raf)
            io.disconnect()
            ro.disconnect()
            document.removeEventListener("visibilitychange", update)
            el.removeEventListener("pointermove", onMove)
            el.removeEventListener("pointerleave", onLeave)
          }
        })
        .catch(() => {})

      const dispose = () => {
        disposed = true
        stopLoop()
        scene.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.geometry.dispose()
            ;(o.material as THREE.Material).dispose()
          }
        })
        textures.forEach((t) => t.dispose())
        renderer.dispose()
        canvas.remove()
      }
      return dispose
    }

    // Load the film only when the card comes near the screen.
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
  }, [film, kind])

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
        className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        style={{ background: film.backdrop }}
      />
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

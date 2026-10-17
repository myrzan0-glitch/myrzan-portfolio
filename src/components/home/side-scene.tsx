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
    { at: 3.2, text: "Preview it for Apple and Google Wallet" },
    { at: 6.6, text: "Wi‑Fi and links work too" }
  ],
  actors: [
    // 0 · the creator form
    {
      tex: "w-form",
      h: 8.4,
      pose: (t) => ({ x: mix(-4.0, -6, k(t, 5.6, 6.4)), y: 0.1 + float(t, 0, 0.08), z: -0.6, ry: 0.22, o: shown(t, 0, 0.8, 5.6, 6.4) })
    },
    // 1 · a plastic loyalty card: in, scanned, then off to become a pass
    {
      tex: "w-plastic",
      h: 3.4,
      pose: (t) => {
        const land = k(t, 0.3, 1.3)
        const go = k(t, 3.0, 4.0)
        return {
          x: mix(mix(7, -3.3, land), 3.4, go),
          y: mix(mix(5.5, -1.7, land), 0.3, go) + float(t, 1, 0.06),
          z: mix(1.4, 0.4, go),
          rx: mix(-0.25, 0, go),
          rz: mix(mix(-0.6, -0.1, land), 0, go),
          s: mix(1, 1.15, go),
          o: shown(t, 0.3, 0.9, 3.6, 4.1)
        }
      }
    },
    // 2 · the pass: Apple preview, flips to Google, flips back, then joins the stack
    {
      tex: "w-card-apple",
      h: 6.4,
      order: 10,
      pose: (t) => {
        const stack = k(t, 6.6, 7.6)
        return {
          x: mix(3.4, 3.6, stack),
          y: mix(0.4, -1.2, stack) + float(t, 2),
          z: 0.4,
          ry: Math.PI * (k(t, 5.0, 5.8) - k(t, 8.6, 9.4)),
          s: mix(0.9, 1, k(t, 3.6, 4.2)),
          o: shown(t, 3.6, 4.2, 11.2, 12)
        }
      }
    },
    // 3 · Google preview: the back of the same pass
    { tex: "w-card-google", h: 6.2, pose: () => ({ x: 0, y: 0, o: 1 }), order: 11 },
    // 4 · Add to Wallet buttons: under the pass, then on the left
    {
      tex: "w-add",
      h: 1.5,
      order: 12,
      pose: (t) => {
        const left = k(t, 6.4, 7.4)
        return {
          x: mix(3.4, -3.8, left),
          y: mix(-3.6, -0.2, left) + float(t, 3, 0.05),
          z: 0.6,
          s: mix(1, 1.45, left),
          o: shown(t, 4.2, 4.8, 11.2, 12) * (1 - 0.6 * k(t, 5.9, 6.4) * (1 - k(t, 6.8, 7.3)))
        }
      }
    },
    // 5, 6 · Wi‑Fi and link passes slide into a Wallet-style stack behind the card
    {
      tex: "w-link",
      h: 6.2,
      pose: (t) => ({ x: 3.6, y: mix(9, 2.0, k(t, 7.0, 8.0)) + float(t, 4), z: -0.6, o: shown(t, 7.0, 7.4, 11.2, 12) })
    },
    {
      tex: "w-wifi",
      h: 6.4,
      pose: (t) => ({ x: 3.6, y: mix(9, 0.9, k(t, 7.4, 8.4)) + float(t, 5), z: -0.3, o: shown(t, 7.4, 7.8, 11.2, 12) })
    }
  ],
  rings: [{ at: 9.8, x: -3.8, y: 0.15, color: "#2563eb" }],
  scans: [{ from: 1.4, to: 2.8, actor: 1, color: "#ef4444" }]
}

const IZIPASS: Film = {
  length: 14,
  backdrop:
    "radial-gradient(60% 90% at 20% 30%, color-mix(in oklab, oklch(0.646 0.222 41.116) 16%, transparent), transparent 70%), radial-gradient(55% 80% at 85% 85%, color-mix(in oklab, oklch(0.828 0.189 84.429) 20%, transparent), transparent 70%), oklch(0.985 0 0)",
  accent: "oklch(0.646 0.222 41.116)",
  steps: [
    { at: 0, text: "Guests register on the event page" },
    { at: 2.9, text: "Pay the organizer, upload the receipt" },
    { at: 6.0, text: "The organizer approves in Telegram" },
    { at: 8.6, text: "Ticket lands in Apple or Google Wallet" },
    { at: 11.0, text: "Check-in at the door with one scan" }
  ],
  actors: [
    // 0 · registration card
    {
      tex: "i-register",
      h: 5.2,
      pose: (t) => ({
        x: mix(0, -5.5, k(t, 2.8, 3.6)),
        y: 0.4 + float(t, 0, 0.08),
        z: mix(0, -2, k(t, 2.8, 3.6)),
        ry: mix(0, 0.18, k(t, 2.8, 3.6)),
        o: shown(t, 0, 0.7, 2.8, 3.5)
      })
    },
    // 1 · pay the organizer
    {
      tex: "i-pay",
      h: 7.6,
      pose: (t) => ({ x: -3.3, y: 0.1 + float(t, 1, 0.08), z: mix(-1, 0, k(t, 2.8, 3.6)), ry: 0.18, o: shown(t, 2.8, 3.6, 6.0, 6.6) })
    },
    // 2 · the receipt screenshot flies into the pay card
    {
      tex: "i-receipt",
      h: 3.6,
      pose: (t) => {
        const fly = k(t, 4.1, 5.2)
        return {
          x: mix(5.5, -2.6, fly),
          y: mix(-4.5, -1.2, fly),
          z: 1.2,
          rz: mix(0.5, 0.05, fly),
          s: mix(1, 0.55, k(t, 5.2, 5.8)),
          o: shown(t, 4.1, 4.5, 5.5, 5.9)
        }
      }
    },
    // 3 · waiting for approval
    {
      tex: "i-waiting",
      h: 7.6,
      pose: (t) => ({ x: -3.3, y: 0.1 + float(t, 2, 0.08), z: -0.2, ry: 0.18, o: shown(t, 6.0, 6.6, 8.4, 9.0) })
    },
    // 4 · izipass bot message in Telegram
    {
      tex: "i-telegram",
      h: 4.2,
      pose: (t) => ({ x: 3.6, y: 1.2 + float(t, 3, 0.07), z: 0.6, s: mix(0.7, 1, k(t, 6.0, 6.6)), o: shown(t, 6.0, 6.5, 8.4, 9.0) })
    },
    // 5 · the approved ticket
    {
      tex: "i-ticket",
      h: 8.2,
      pose: (t) => ({ x: -3.2, y: 0.1 + float(t, 4, 0.08), z: 0, ry: mix(-Math.PI / 2, 0.16, k(t, 8.6, 9.5)), o: shown(t, 8.6, 9.0, 13.2, 14) })
    },
    // 6 · the Wallet pass leaves the ticket
    {
      tex: "i-pass",
      h: 4.6,
      pose: (t) => {
        const out = k(t, 9.6, 10.8)
        return {
          x: mix(-3, 3.4, out),
          y: mix(0, 1.0, out) + float(t, 5),
          z: mix(-0.5, 1.2, out),
          ry: mix(0, Math.PI * 2, out) + Math.sin(t * 0.9) * 0.18 * out,
          rz: mix(0, -0.08, out),
          o: shown(t, 9.6, 10.0, 13.2, 14)
        }
      }
    },
    // 7 · checked in at the door
    {
      tex: "i-checkin",
      h: 1.5,
      pose: (t) => ({ x: 3.6, y: mix(-5.5, -2.5, k(t, 11.0, 11.7)), z: 1.4, s: 1.25, o: shown(t, 11.0, 11.5, 13.2, 14) })
    }
  ],
  rings: [
    { at: 1.7, x: 0, y: -1.15, color: "#171717" },
    { at: 7.4, x: 2.03, y: -0.17, color: "#2aabee" },
    { at: 11.9, x: 1.21, y: -2.35, color: "#16a34a" }
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
          <span className="max-w-full w-fit truncate whitespace-nowrap rounded-full border border-black/10 bg-white/90 px-2.5 py-1 text-[10px] font-medium leading-none text-neutral-900 shadow-sm backdrop-blur sm:text-[11px]">
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

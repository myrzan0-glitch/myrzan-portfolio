"use client"

import * as React from "react"
import * as THREE from "three"

import { HERO_WARP_EVENT } from "@/lib/hero-warp"

export type HeroTheme = "dark" | "light"

const PARTICLE_COUNT = 1400
const FIELD_RADIUS = 9
const DRIFT_SPEED = 0.035
const PARALLAX_STRENGTH = 0.35
// Warp: particles fly toward the camera and leave streaks, so the field reads as a burst
const WARP_SPEED = 15
const WARP_STREAK = 2
const WARP_NEAR_Z = 12.5
const WARP_FLUSH_SPEED = 8

type Palette = { color: THREE.Color; weight: number }[]

// Dark mode is a night sky: white stars with cool blue and warm ones mixed in.
// Light mode is sunlight: warm gold and amber sparks that stay readable on white.
const THEMES: Record<
  HeroTheme,
  {
    palette: Palette
    blending: THREE.Blending
    size: number
    restOpacity: number
    warpOpacityBoost: number
    streakOpacity: number
  }
> = {
  dark: {
    palette: [
      { color: new THREE.Color("#ffffff"), weight: 0.7 },
      { color: new THREE.Color("hsl(212, 85%, 82%)"), weight: 0.18 },
      { color: new THREE.Color("hsl(38, 90%, 84%)"), weight: 0.12 }
    ],
    blending: THREE.AdditiveBlending,
    size: 0.08,
    restOpacity: 0.7,
    warpOpacityBoost: 0.3,
    streakOpacity: 0.55
  },
  light: {
    palette: [
      { color: new THREE.Color("hsl(40, 95%, 55%)"), weight: 0.45 },
      { color: new THREE.Color("hsl(28, 95%, 55%)"), weight: 0.3 },
      { color: new THREE.Color("hsl(46, 100%, 66%)"), weight: 0.25 }
    ],
    blending: THREE.NormalBlending,
    size: 0.1,
    restOpacity: 0.75,
    warpOpacityBoost: 0.2,
    streakOpacity: 0.7
  }
}

function pick(palette: Palette) {
  let roll = Math.random()
  for (const entry of palette) {
    if (roll < entry.weight) return entry.color
    roll -= entry.weight
  }
  return palette[0].color
}

// Soft round dot so particles render as glowing points, not squares
function makeDotTexture() {
  const size = 64
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, "rgba(255,255,255,1)")
    g.addColorStop(0.35, "rgba(255,255,255,0.85)")
    g.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function HeroCanvas({ theme = "dark" }: { theme?: HeroTheme }) {
  const mountRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const config = THEMES[theme]
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.z = 14

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const phases = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Uniform fill of a sphere so the field reads as a volume, not a flat plane
      const r = FIELD_RADIUS * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const c = pick(config.palette)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      phases[i] = Math.random() * Math.PI * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    const basePositions = positions.slice()

    const dot = makeDotTexture()
    const material = new THREE.PointsMaterial({
      size: config.size,
      map: dot,
      vertexColors: true,
      transparent: true,
      opacity: config.restOpacity,
      sizeAttenuation: true,
      depthWrite: false,
      blending: config.blending
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Streaks: one segment per particle, head at the particle, tail fading out behind it.
    // RGBA vertex colours let the tail fade to transparent in both blending modes.
    const zOffsets = new Float32Array(PARTICLE_COUNT)
    const streakPositions = new Float32Array(PARTICLE_COUNT * 6)
    const streakColors = new Float32Array(PARTICLE_COUNT * 8)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let k = 0; k < 2; k++) {
        streakColors[i * 8 + k * 4] = colors[i * 3]
        streakColors[i * 8 + k * 4 + 1] = colors[i * 3 + 1]
        streakColors[i * 8 + k * 4 + 2] = colors[i * 3 + 2]
        streakColors[i * 8 + k * 4 + 3] = k === 0 ? 1 : 0
      }
    }
    const streakGeometry = new THREE.BufferGeometry()
    streakGeometry.setAttribute("position", new THREE.BufferAttribute(streakPositions, 3))
    streakGeometry.setAttribute("color", new THREE.BufferAttribute(streakColors, 4))
    const streakMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: config.blending
    })
    const streaks = new THREE.LineSegments(streakGeometry, streakMaterial)
    streaks.visible = false
    points.add(streaks)

    let warpTarget = 0
    let warp = 0
    const onWarp = (event: Event) => {
      warpTarget = (event as CustomEvent<{ active: boolean }>).detail?.active ? 1 : 0
    }

    const target = new THREE.Vector2()
    const current = new THREE.Vector2()

    const onPointerMove = (event: PointerEvent) => {
      target.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1)
      )
    }

    const resize = () => {
      const { clientWidth, clientHeight } = mount
      if (!clientWidth || !clientHeight) return
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)
    resize()

    let visible = true
    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 }
    )
    intersection.observe(mount)

    let frame = 0
    const clock = new THREE.Clock()
    let lastT = 0
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute
    const streakAttr = streakGeometry.getAttribute("position") as THREE.BufferAttribute
    const toCamera = new THREE.Vector3()
    const inverseRotation = new THREE.Quaternion()

    const render = () => {
      frame = requestAnimationFrame(render)
      if (!visible || document.hidden) return

      const t = clock.getElapsedTime()
      const dt = Math.min(t - lastT, 0.05)
      lastT = t

      if (!reduceMotion) {
        // Ease in quickly, ease out a little slower so the burst settles rather than snaps
        warp += (warpTarget - warp) * (warpTarget > warp ? 0.08 : 0.05)
        if (warp < 0.001) warp = 0

        // Camera axis expressed in the field's local (rotated) space
        inverseRotation.copy(points.quaternion).invert()
        toCamera.set(0, 0, 1).applyQuaternion(inverseRotation)
        const dx = toCamera.x
        const dy = toCamera.y
        const dz = toCamera.z
        const step = WARP_SPEED * warp * warp * dt
        const tail = WARP_STREAK * warp

        const arr = posAttr.array as Float32Array
        const sArr = streakAttr.array as Float32Array
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const p = phases[i]
          const bx = basePositions[i * 3] + Math.sin(t * DRIFT_SPEED * 6 + p) * 0.12
          const by = basePositions[i * 3 + 1] + Math.cos(t * DRIFT_SPEED * 5 + p) * 0.12
          const bz = basePositions[i * 3 + 2]

          if (zOffsets[i] !== 0 || step > 0) {
            let depth = bx * dx + by * dy + bz * dz + zOffsets[i]
            // Particles left in front of the field after a warp keep flying until recycled,
            // otherwise they'd sit next to the lens as oversized blobs
            const s = depth > FIELD_RADIUS ? Math.max(step, WARP_FLUSH_SPEED * dt) : step
            zOffsets[i] += s
            depth += s
            if (depth > WARP_NEAR_Z) zOffsets[i] -= WARP_NEAR_Z + FIELD_RADIUS
          }

          const o = zOffsets[i]
          const x = bx + dx * o
          const y = by + dy * o
          const z = bz + dz * o
          arr[i * 3] = x
          arr[i * 3 + 1] = y
          arr[i * 3 + 2] = z

          if (warp > 0) {
            sArr[i * 6] = x
            sArr[i * 6 + 1] = y
            sArr[i * 6 + 2] = z
            sArr[i * 6 + 3] = x - dx * tail
            sArr[i * 6 + 4] = y - dy * tail
            sArr[i * 6 + 5] = z - dz * tail
          }
        }
        posAttr.needsUpdate = true
        streaks.visible = warp > 0
        if (warp > 0) {
          streakAttr.needsUpdate = true
          streakMaterial.opacity = config.streakOpacity * warp
        }
        material.opacity = config.restOpacity + config.warpOpacityBoost * warp

        points.rotation.y = t * DRIFT_SPEED
        points.rotation.x = Math.sin(t * DRIFT_SPEED * 0.5) * 0.15

        current.lerp(target, 0.04)
        camera.position.x = current.x * PARALLAX_STRENGTH
        camera.position.y = current.y * PARALLAX_STRENGTH
        camera.lookAt(scene.position)
      }

      renderer.render(scene, camera)
    }

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      window.addEventListener(HERO_WARP_EVENT, onWarp)
    }
    render()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener(HERO_WARP_EVENT, onWarp)
      resizeObserver.disconnect()
      intersection.disconnect()
      geometry.dispose()
      material.dispose()
      dot.dispose()
      streakGeometry.dispose()
      streakMaterial.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [theme])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full"
    />
  )
}

"use client"

import * as React from "react"
import * as THREE from "three"

import { HERO_WARP_EVENT } from "@/lib/hero-warp"

const PARTICLE_COUNT = 1400
const FIELD_RADIUS = 9
const DRIFT_SPEED = 0.035
const PARALLAX_STRENGTH = 0.35
// Warp: particles fly toward the camera and leave streaks, so the field reads as a starburst
const WARP_SPEED = 15
const WARP_STREAK = 2
const WARP_NEAR_Z = 12.5
const WARP_FLUSH_SPEED = 8
const ACCENT = new THREE.Color("hsl(84, 90%, 55%)")
const WHITE = new THREE.Color("#ffffff")

export function HeroCanvas() {
  const mountRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

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
    const tmp = new THREE.Color()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spherical shell with soft inner fill so the field reads as a volume, not a flat plane
      const r = FIELD_RADIUS * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Mostly white, a small share tinted with the site's lime accent
      tmp.copy(Math.random() < 0.12 ? ACCENT : WHITE)
      colors[i * 3] = tmp.r
      colors[i * 3 + 1] = tmp.g
      colors[i * 3 + 2] = tmp.b

      phases[i] = Math.random() * Math.PI * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    const basePositions = positions.slice()

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Streaks: one segment per particle, head at the particle, tail trailing back along z
    const zOffsets = new Float32Array(PARTICLE_COUNT)
    const streakPositions = new Float32Array(PARTICLE_COUNT * 6)
    const streakColors = new Float32Array(PARTICLE_COUNT * 6)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let k = 0; k < 2; k++) {
        streakColors[i * 6 + k * 3] = colors[i * 3]
        streakColors[i * 6 + k * 3 + 1] = colors[i * 3 + 1]
        streakColors[i * 6 + k * 3 + 2] = colors[i * 3 + 2]
      }
    }
    const streakGeometry = new THREE.BufferGeometry()
    streakGeometry.setAttribute("position", new THREE.BufferAttribute(streakPositions, 3))
    streakGeometry.setAttribute("color", new THREE.BufferAttribute(streakColors, 3))
    const streakMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
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
            // otherwise they'd sit next to the lens as oversized squares
            const s = depth > FIELD_RADIUS ? Math.max(step, WARP_FLUSH_SPEED * dt) : step
            zOffsets[i] += s
            depth += s
            // Recycle particles that pass the camera to the far side of the field
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
          streakMaterial.opacity = 0.42 * warp
        }
        material.opacity = 0.55 + 0.35 * warp

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
      streakGeometry.dispose()
      streakMaterial.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full"
    />
  )
}

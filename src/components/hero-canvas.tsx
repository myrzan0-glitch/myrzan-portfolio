"use client"

import * as React from "react"
import * as THREE from "three"

const PARTICLE_COUNT = 1400
const FIELD_RADIUS = 9
const DRIFT_SPEED = 0.035
const PARALLAX_STRENGTH = 0.35
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
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute

    const render = () => {
      frame = requestAnimationFrame(render)
      if (!visible || document.hidden) return

      const t = clock.getElapsedTime()

      if (!reduceMotion) {
        const arr = posAttr.array as Float32Array
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const p = phases[i]
          arr[i * 3] = basePositions[i * 3] + Math.sin(t * DRIFT_SPEED * 6 + p) * 0.12
          arr[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(t * DRIFT_SPEED * 5 + p) * 0.12
        }
        posAttr.needsUpdate = true

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
    }
    render()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onPointerMove)
      resizeObserver.disconnect()
      intersection.disconnect()
      geometry.dispose()
      material.dispose()
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

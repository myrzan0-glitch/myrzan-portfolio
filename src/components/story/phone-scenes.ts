import * as THREE from "three"

/**
 * The story case studies' three.js scenes: real 390 × 844 screen exports on flat phones. A scene
 * renders only while its panel is on screen and is torn down with `dispose`.
 */

/** A 390 × 844 screen in world units. */
const PW = 1.95
const PH = 4.22
const SW = 390
const SH = 844

const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2)
const clamp = (v: number) => Math.min(1, Math.max(0, v))

function drawn(w: number, h: number, draw: (x: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas")
  c.width = w
  c.height = h
  draw(c.getContext("2d")!)
  return c
}

function roundRect(x: CanvasRenderingContext2D, left: number, top: number, w: number, h: number, r: number) {
  x.beginPath()
  x.roundRect(left, top, w, h, r)
}

/** Device body: a thin dark bezel around the screen. */
const BEZEL = { w: 434, h: 888 }
const BW = (PW * BEZEL.w) / SW
const BH = (PH * BEZEL.h) / SH

export type Scene = {
  setPlaying: (playing: boolean) => void
  /** Shows or hides a row's highlight bands. */
  setMarked?: (marked: boolean) => void
  dispose: () => void
}

type Stage = {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  pointer: { x: number; y: number }
  playing: boolean
  material: (src: string) => THREE.MeshBasicMaterial
  texture: (src: string) => THREE.Texture
  phone: (src: string) => THREE.Group
  /** Called every frame while visible; `dt` is 0 while paused. */
  update?: (dt: number) => void
  /** World units the frame must show across and down at an aspect; overrides the fixed distance. */
  fit?: (aspect: number) => [number, number]
  setMarked?: (marked: boolean) => void
  /** Asks for one more frame, e.g. after a change made while paused or off screen. */
  redraw: () => void
}

/**
 * Sets up the renderer, camera and texture cache for a panel and runs `build` on it.
 * `dist` is the camera distance at 4:3; `fit` is the aspect below which the camera backs off.
 */
function mount(el: HTMLElement, dist: number, fit: number, playing: boolean, build: (s: Stage) => void): Scene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
  const canvas = renderer.domElement
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block"
  canvas.setAttribute("aria-hidden", "true")
  el.prepend(canvas)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  const loader = new THREE.TextureLoader()
  const textures = new Map<string, THREE.Texture>()
  let dirty = true

  const texture = (src: string) => {
    let t = textures.get(src)
    if (!t) {
      if (src === "bezel") {
        t = new THREE.CanvasTexture(
          drawn(BEZEL.w, BEZEL.h, (x) => {
            x.fillStyle = "#2b2b2e"
            roundRect(x, 0, 0, BEZEL.w, BEZEL.h, 66)
            x.fill()
            x.fillStyle = "#050505"
            roundRect(x, 6, 6, BEZEL.w - 12, BEZEL.h - 12, 61)
            x.fill()
          })
        )
      } else if (src === "band") {
        // A highlight: a rounded outline with a soft fill, tinted by the material colour.
        t = new THREE.CanvasTexture(
          drawn(256, 64, (x) => {
            x.fillStyle = "rgba(255,255,255,0.22)"
            roundRect(x, 4, 4, 248, 56, 14)
            x.fill()
            x.lineWidth = 7
            x.strokeStyle = "#fff"
            roundRect(x, 4, 4, 248, 56, 14)
            x.stroke()
          })
        )
      } else if (src === "shadow") {
        t = new THREE.CanvasTexture(
          drawn(160, 300, (x) => {
            // Safari ignores ctx.filter, which left a hard dark box, so blur with a canvas shadow instead:
            // the box itself is drawn off the canvas and only its shadow lands. shadowBlur 32 ≈ blur(16px).
            const off = 1000
            x.shadowColor = "rgba(0,0,0,0.5)"
            x.shadowBlur = 32
            x.shadowOffsetX = off
            x.fillStyle = "#000"
            x.fillRect(32 - off, 34, 96, 236)
          })
        )
      } else {
        t = loader.load(src, () => (dirty = true))
      }
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = renderer.capabilities.getMaxAnisotropy()
      textures.set(src, t)
    }
    return t
  }
  const material = (src: string) => new THREE.MeshBasicMaterial({ map: texture(src), transparent: true, depthWrite: false })

  const stage: Stage = {
    scene,
    camera,
    pointer: { x: 0, y: 0 },
    playing,
    material,
    texture,
    // Shadow, bezel and screen, stacked a hair apart.
    phone: (src) => {
      const g = new THREE.Group()
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(BW * 1.7, BH * 1.3), material("shadow"))
      shadow.position.set(0.15, -0.25, -0.05)
      const body = new THREE.Mesh(new THREE.PlaneGeometry(BW, BH), material("bezel"))
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(PW, PH), material(src))
      screen.position.z = 0.004
      // Transparent planes sort by distance, which flips layers this close together; fix the order.
      body.renderOrder = 1
      screen.renderOrder = 2
      g.add(shadow, body, screen)
      g.userData.screen = screen
      return g
    },
    redraw: () => {
      dirty = true
      update()
    }
  }
  build(stage)

  const resize = () => {
    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    if (stage.fit) {
      const view = 2 * Math.tan((camera.fov * Math.PI) / 360)
      const [across, down] = stage.fit(camera.aspect)
      camera.position.set(0, 0, Math.max(dist, across / (view * camera.aspect), down / view))
    } else camera.position.set(0, 0, dist * Math.max(1, fit / camera.aspect))
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    dirty = true
  }

  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    stage.pointer.x = (e.clientX - r.left) / r.width - 0.5
    stage.pointer.y = (e.clientY - r.top) / r.height - 0.5
  }
  const onLeave = () => {
    stage.pointer.x = 0
    stage.pointer.y = 0
  }

  let raf = 0
  let visible = false
  let last = performance.now()
  const frame = (now: number) => {
    // The first frame's timestamp can be earlier than `last`, so never step backwards.
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000))
    last = now
    stage.update?.(stage.playing ? dt : 0)
    renderer.render(scene, camera)
    dirty = false
    raf = requestAnimationFrame(frame)
  }
  const update = () => {
    cancelAnimationFrame(raf)
    if (visible && !document.hidden) {
      last = performance.now()
      raf = requestAnimationFrame(frame)
    } else if (dirty) {
      stage.update?.(0)
      renderer.render(scene, camera)
      dirty = false
    }
  }
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    update()
  })
  const ro = new ResizeObserver(() => {
    resize()
    update()
  })
  io.observe(el)
  ro.observe(el)
  document.addEventListener("visibilitychange", update)
  el.addEventListener("pointermove", onMove)
  el.addEventListener("pointerleave", onLeave)
  resize()

  return {
    setPlaying: (p) => {
      stage.playing = p
    },
    setMarked: (m) => stage.setMarked?.(m),
    dispose: () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener("visibilitychange", update)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          o.material.dispose()
        }
      })
      textures.forEach((t) => t.dispose())
      renderer.dispose()
      canvas.remove()
    }
  }
}

/** Leans a group toward the pointer, with a slow idle drift. */
function lean(stage: Stage, group: THREE.Object3D, base: { x: number; y: number }, clock: number, amount: number) {
  group.rotation.y += (base.y + Math.sin(clock * 0.35) * 0.06 + stage.pointer.x * amount - group.rotation.y) * 0.06
  group.rotation.x += (base.x + stage.pointer.y * amount * 0.5 - group.rotation.x) * 0.06
}

/** Hero: three phones floating side by side. */
export function heroScene(el: HTMLElement, screens: string[], playing: boolean) {
  return mount(el, 10.5, 1.6, playing, (stage) => {
    const group = new THREE.Group()
    stage.scene.add(group)
    const slots = [
      { x: -2.75, z: -0.35, ry: 0.18 },
      { x: 0, z: 0.15, ry: 0 },
      { x: 2.75, z: -0.35, ry: -0.18 }
    ]
    const phones = screens.slice(0, 3).map((src, i) => {
      const p = stage.phone(src)
      p.position.set(slots[i].x, 0, slots[i].z)
      p.rotation.y = slots[i].ry
      group.add(p)
      return p
    })
    let clock = 0
    stage.update = (dt) => {
      clock += dt
      phones.forEach((p, i) => (p.position.y = Math.sin(clock * 0.8 + slots[i].x) * 0.07))
      lean(stage, group, { x: 0, y: 0 }, clock, 0.25)
    }
  })
}

/** `mark` sets a band apart: a part designed from scratch, or a problem found on an old screen. */
export type LayerPart = { y: [number, number]; name: string; mark?: "new" | "problem"; from?: string }

/**
 * Layers: one screen cut into horizontal bands that pull apart and go back together. Marked
 * parts come further forward; `tags` are positioned beside each band.
 */
export function layersScene(el: HTMLElement, screen: string, parts: LayerPart[], tags: HTMLElement[], playing: boolean) {
  const still = !playing
  return mount(el, 11, 0.75, playing, (stage) => {
    const group = new THREE.Group()
    stage.scene.add(group)
    group.add(new THREE.Mesh(new THREE.PlaneGeometry(BW, BH), stage.material("bezel")))
    const bands = parts.map((part) => {
      const [a, b] = part.y
      const geo = new THREE.PlaneGeometry(PW, ((b - a) / SH) * PH)
      // Crop the screen texture to this band.
      const uv = geo.attributes.uv
      for (let i = 0; i < uv.count; i++) uv.setY(i, uv.getY(i) > 0.5 ? 1 - a / SH : 1 - b / SH)
      const mesh = new THREE.Mesh(geo, stage.material(part.from ?? screen))
      mesh.position.y = (0.5 - (a + b) / 2 / SH) * PH
      group.add(mesh)
      return mesh
    })
    const v = new THREE.Vector3()
    let clock = 0
    stage.update = (dt) => {
      clock += dt
      // 8 s cycle: together, apart, hold, back. Paused from the start, it rests apart.
      const c = clock % 8
      const e = still && clock === 0 ? 1 : ease(clamp((c - 1) / 1.4)) * (1 - ease(clamp((c - 6) / 1.4)))
      group.position.x = stage.camera.aspect < 1 ? 1.3 : 0.9
      lean(stage, group, { x: -0.12, y: -0.62 }, clock, 0.3)
      group.updateMatrixWorld()
      const w = el.clientWidth
      const h = el.clientHeight
      bands.forEach((mesh, i) => {
        mesh.position.z = 0.004 + e * (parts[i].mark ? 1.25 : 0.45) + e * i * 0.02
        const tag = tags[i]
        if (!tag) return
        v.set(-PW / 2 - 0.08, mesh.position.y, mesh.position.z)
        group.localToWorld(v).project(stage.camera)
        // Right edge on the band, kept inside the panel on narrow screens.
        const left = Math.min(w - tag.offsetWidth - 6, Math.max(6, ((v.x + 1) / 2) * w - tag.offsetWidth))
        tag.style.transform = `translate(${left}px, ${((1 - v.y) / 2) * h}px) translate(0, -50%)`
        tag.style.opacity = String(clamp(e * 1.6 - 0.5))
      })
    }
  })
}

/** A band to highlight on a row phone, in 390 × 844 screen pixels; `x` defaults to the full width. */
export type RowBand = { y: [number, number]; x?: [number, number]; problem?: boolean }
/** `on` sets the label in the accent colour: the new design, as opposed to the old one or an example. */
export type RowPhone = { screen: string; label: string; short?: string; on?: boolean; bands?: RowBand[] }

/**
 * Row: phones side by side, all visible at once, for before and after or a set of examples.
 * Up to three always share a row; four or more sit in one row on wide frames and two per row on
 * tall ones, with a lone last phone centred. Highlight bands stay
 * hidden until `setMarked(true)`, then fade in with a slow pulse travelling along the row.
 */
export function rowScene(el: HTMLElement, phones: RowPhone[], tags: HTMLElement[], colors: { mark: string; problem: string }, playing: boolean) {
  const GAP = 2.6
  const ROW = BH + 0.9
  const columns = (aspect: number) => (phones.length > 3 && aspect < 1 ? 2 : phones.length)
  return mount(el, 9, 0.75, playing, (stage) => {
    stage.fit = (aspect) => {
      const cols = columns(aspect)
      return [cols * GAP + 0.5, Math.ceil(phones.length / cols) * ROW + 0.5]
    }
    const group = new THREE.Group()
    stage.scene.add(group)
    const items = phones.map((phone) => {
      const p = stage.phone(phone.screen)
      group.add(p)
      const bands = (phone.bands ?? []).map((band) => {
        const [x0, x1] = band.x ?? [10, 380]
        const [y0, y1] = band.y
        const m = new THREE.Mesh(new THREE.PlaneGeometry(((x1 - x0) / SW) * PW, ((y1 - y0) / SH) * PH), stage.material("band"))
        m.material.color.set(band.problem ? colors.problem : colors.mark)
        m.material.opacity = 0
        m.position.set(((x0 + x1) / 2 / SW - 0.5) * PW, (0.5 - (y0 + y1) / 2 / SH) * PH, 0.01)
        m.renderOrder = 3
        p.add(m)
        return m
      })
      return { p, phone, bands }
    })
    let marked = false
    let shown = 0
    stage.setMarked = (m) => {
      marked = m
      stage.redraw()
    }
    const v = new THREE.Vector3()
    let clock = 0
    stage.update = (dt) => {
      clock += dt
      // Fade the highlights in and out instead of snapping; paused, they switch at once.
      shown = dt ? shown + (Number(marked) - shown) * Math.min(1, dt * 8) : Number(marked)
      const cols = columns(stage.camera.aspect)
      const rows = Math.ceil(phones.length / cols)
      lean(stage, group, { x: 0, y: 0 }, clock, 0.18)
      group.updateMatrixWorld()
      const w = el.clientWidth
      const h = el.clientHeight
      items.forEach((item, i) => {
        const c = i % cols
        const r = Math.floor(i / cols)
        const inRow = Math.min(cols, phones.length - r * cols)
        item.p.position.set((c - (inRow - 1) / 2) * GAP, ((rows - 1) / 2 - r) * ROW - 0.2, 0)
        item.p.rotation.y = rows === 1 ? -(c - (cols - 1) / 2) * 0.07 : 0
        const k = 0.5 + 0.5 * Math.sin(clock * 1.6 - i * 0.9)
        item.bands.forEach((m) => (m.material.opacity = shown * (0.75 + 0.25 * k)))
        const tag = tags[i]
        if (!tag) return
        // Short tags on tall or narrow panels, where full ones would run into each other.
        const label = (stage.camera.aspect < 1 || w < 640) && item.phone.short ? item.phone.short : item.phone.label
        if (tag.textContent !== label) tag.textContent = label
        item.p.updateMatrixWorld()
        v.set(0, BH / 2 + 0.12, 0)
        item.p.localToWorld(v).project(stage.camera)
        const left = Math.min(w - tag.offsetWidth - 6, Math.max(6, ((v.x + 1) / 2) * w - tag.offsetWidth / 2))
        tag.style.transform = `translate(${left}px, ${((1 - v.y) / 2) * h - tag.offsetHeight}px)`
      })
    }
  })
}

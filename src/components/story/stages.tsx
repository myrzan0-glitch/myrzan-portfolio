"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { ZoomIn } from "lucide-react"

import type { LayerPart, RowPhone } from "./phone-scenes"

/** A screen to open full size, with its caption. */
export type Shot = { screen: string; label?: string }

/** The screens of a panel, full size and side by side. Closes with Close, Escape or a click outside. */
function Lightbox({ shots, onClose }: { shots: Shot[]; onClose: () => void }) {
  const close = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    close.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Screens, full size"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="home-root fixed inset-0 z-50 flex !min-h-0 flex-col bg-[var(--home-bg)] p-4"
    >
      <div className="flex justify-end">
        <button
          ref={close}
          type="button"
          onClick={onClose}
          className="rounded-full bg-[var(--home-panel)] px-3.5 py-2 text-[13px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Close
        </button>
      </div>
      <div
        onClick={(e) => e.target === e.currentTarget && onClose()}
        className="flex min-h-0 flex-1 items-center gap-6 overflow-x-auto py-4 before:flex-1 after:flex-1"
      >
        {shots.map((s) => (
          <figure key={s.screen + s.label} className="m-0 flex h-full flex-none flex-col items-center gap-2.5">
            {/* Full-size exports, shown at their own pixels; next/image would resample them. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.screen}
              alt={s.label ?? ""}
              className="h-[calc(100%-30px)] max-h-[844px] w-auto shadow-[0_0_0_1px_var(--home-line),0_20px_50px_-20px_rgba(0,0,0,0.4)] [border-radius:11.8%/5.45%]"
            />
            {s.label && <figcaption className="home-label">{s.label}</figcaption>}
          </figure>
        ))}
      </div>
    </div>,
    document.body
  )
}

/** A magnifier in the panel's corner, shown on hover, that opens its screens full size. */
function Zoom({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = React.useState(false)
  const button = React.useRef<HTMLButtonElement>(null)
  const onClose = React.useCallback(() => {
    setOpen(false)
    button.current?.focus()
  }, [])
  return (
    <>
      <button
        ref={button}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View screens full size"
        className="absolute left-3 top-3 z-10 grid h-[34px] w-[34px] cursor-zoom-in place-items-center rounded-full bg-[var(--home-bg)] text-[var(--home-fg)] opacity-0 shadow-[0_0_0_1px_var(--home-line),0_4px_14px_-6px_rgba(0,0,0,0.3)] transition-opacity focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
      >
        <ZoomIn className="h-4 w-4" aria-hidden="true" />
      </button>
      {open && <Lightbox shots={shots} onClose={onClose} />}
    </>
  )
}

const panel = "group relative overflow-hidden rounded-[14px] bg-[var(--home-panel)]"
const tag = "absolute left-0 top-0 whitespace-nowrap rounded-full px-2 py-[3px] font-[family-name:var(--font-mono)] text-[9.5px] tracking-[0.03em] sm:text-[10.5px]"

/** The hero: three still iPhones side by side, front-facing; the magnifier opens the screens. */
export function HeroStage({ screens, label }: { screens: Shot[]; label: string }) {
  const dc = useDeviceClass()
  return (
    <div role="img" aria-label={label} className={`${panel} still-panel ${dc} aspect-[4/3] sm:aspect-[2/1]`}>
      <div className="still-row still-hero" style={{ "--n": screens.length } as React.CSSProperties}>
        {screens.map((s) => (
          <div key={s.screen} className="still-item">
            <StillPhone screen={s.screen} eager />
          </div>
        ))}
      </div>
      <Zoom shots={screens} />
    </div>
  )
}

/** The phone a case is shown on, set per case study; screens and band units differ per device. */
export type Device = "iphone" | "android"
const DEVICES = {
  // iPhone screens are 390 × 844; Android (Technodom) screens are 360 × 800.
  iphone: { sw: 390, sh: 844 },
  android: { sw: 360, sh: 800 }
} as const
const DeviceContext = React.createContext<Device>("iphone")
export function DeviceProvider({ device, children }: { device?: Device; children: React.ReactNode }) {
  return <DeviceContext.Provider value={device ?? "iphone"}>{children}</DeviceContext.Provider>
}
const useDevice = () => DEVICES[React.useContext(DeviceContext)]
const useDeviceClass = () => (React.useContext(DeviceContext) === "android" ? "still-android-panel" : "")

/**
 * A still phone mockup in CSS with the real screen as a plain image, so the browser scales it
 * crisply. iPhone 15 Pro: titanium frame, Dynamic Island, buttons on both sides. Android: thin
 * aluminium frame, even black bezel, punch-hole camera, power and volume on the right. Bands are
 * highlight boxes in screen units, shown while `marked`. Nothing moves.
 */
function StillPhone({ screen, bands, marked, eager }: { screen: string; bands?: RowPhone["bands"]; marked?: boolean; eager?: boolean }) {
  const android = React.useContext(DeviceContext) === "android"
  const { sw: SW, sh: SH } = useDevice()
  return (
    <div className={`still-phone ${android ? "still-android" : ""}`}>
      {android ? (
        <>
          <span aria-hidden="true" className="still-btn still-btn-power" />
          <span aria-hidden="true" className="still-btn still-btn-volume" />
        </>
      ) : (
        <>
          <span aria-hidden="true" className="still-btn still-btn-action" />
          <span aria-hidden="true" className="still-btn still-btn-up" />
          <span aria-hidden="true" className="still-btn still-btn-down" />
          <span aria-hidden="true" className="still-btn still-btn-side" />
        </>
      )}
      <div className="still-glass">
        <div className="still-screen">
          {/* The Figma export as is: next/image would re-encode it and soften small UI text. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={screen} alt="" loading={eager ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          {bands?.map((b, i) => {
            const [x0, x1] = b.x ?? [0, SW]
            return (
              <span
                key={i}
                aria-hidden="true"
                className={`still-band ${b.problem ? "still-band-problem" : ""}`}
                style={{
                  left: `${(x0 / SW) * 100}%`,
                  width: `${((x1 - x0) / SW) * 100}%`,
                  top: `${(b.y[0] / SH) * 100}%`,
                  height: `${((b.y[1] - b.y[0]) / SH) * 100}%`,
                  opacity: marked ? 1 : 0
                }}
              />
            )
          })}
        </div>
        <span aria-hidden="true" className={android ? "still-punch" : "still-island"} />
      </div>
    </div>
  )
}

/**
 * One screen cut into its parts and pulled apart into a still stack, each part named beside it.
 * Marked parts step forward: red for a problem on an old screen, accent for something new.
 */
export function LayersStage({ screen, parts, label, zoom }: { screen: string; parts: LayerPart[]; label: string; zoom?: string }) {
  const { sw: SW, sh: SH } = useDevice()
  const dc = useDeviceClass()
  return (
    <div role="img" aria-label={label} className={`${panel} still-panel ${dc} aspect-[4/5] sm:aspect-[4/3]`}>
      <div className="still-layers" style={{ "--parts": parts.length } as React.CSSProperties}>
        <div className="still-stack">
          {parts.map((part) => {
            const [a, b] = part.y
            const span = b - a
            const y = span >= SH ? 0 : (a / (SH - span)) * 100
            return (
              <div
                key={part.name}
                className={`still-slice ${part.mark ? `still-slice-${part.mark}` : ""} ${a <= 0 ? "still-slice-top" : ""} ${b >= SH ? "still-slice-bottom" : ""}`}
                style={{ aspectRatio: `${SW} / ${span}`, backgroundImage: `url(${part.from ?? screen})`, backgroundPosition: `0 ${y}%` }}
              >
                <span
                  aria-hidden="true"
                  className={`${tag} still-tag ${
                    part.mark === "problem"
                      ? "bg-[var(--story-warn)] text-white"
                      : part.mark === "new"
                        ? "bg-[var(--story-mark)] text-white"
                        : "bg-[var(--home-bg)] text-[var(--home-muted)] shadow-[0_0_0_1px_var(--home-line)]"
                  }`}
                >
                  {part.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <Zoom shots={[{ screen, label: zoom }]} />
    </div>
  )
}

/**
 * Still phones side by side with their labels. Highlights start hidden so the designs read clean;
 * the switch below the panel, named for what it shows, turns them on.
 */
export function RowStage({ phones, label, toggle: toggleLabel, wide }: { phones: RowPhone[]; label: string; toggle: string; wide?: boolean }) {
  const [marked, setMarked] = React.useState(false)
  const dc = useDeviceClass()
  return (
    <>
      <div
        role="img"
        aria-label={label}
        className={`${panel} still-panel ${dc} ${!wide ? "aspect-square sm:aspect-[4/3]" : phones.length > 3 ? "aspect-[2/3] sm:aspect-[2/1]" : "aspect-[4/3] sm:aspect-[2/1]"}`}
      >
        <div className="still-row" data-n={phones.length} style={{ "--n": phones.length } as React.CSSProperties}>
          {phones.map((phone) => (
            <div key={phone.label} className="still-item">
              <span
                aria-hidden="true"
                className={`${tag} !static ${phone.on ? "bg-[var(--story-mark)] text-white" : "bg-[var(--home-bg)] text-[var(--home-muted)] shadow-[0_0_0_1px_var(--home-line)]"}`}
              >
                {phone.short ? (
                  <>
                    <span className="sm:hidden">{phone.short}</span>
                    <span className="max-sm:hidden">{phone.label}</span>
                  </>
                ) : (
                  phone.label
                )}
              </span>
              <StillPhone screen={phone.screen} bands={phone.bands} marked={marked} />
            </div>
          ))}
        </div>
        <Zoom shots={phones.map((p) => ({ screen: p.screen, label: p.label }))} />
      </div>
      <button
        type="button"
        aria-pressed={marked}
        onClick={() => setMarked(!marked)}
        className="mx-auto mt-3 flex items-center gap-2 rounded-full bg-[var(--home-bg)] py-1.5 pl-1.5 pr-3 text-[12px] font-medium shadow-[0_0_0_1px_var(--home-line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span aria-hidden="true" className={`relative h-4 w-[26px] rounded-full transition-colors ${marked ? "bg-[var(--story-mark)]" : "bg-[var(--home-line)]"}`}>
          <span
            className={`absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-[var(--home-bg)] shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-transform ${marked ? "translate-x-2.5" : ""}`}
          />
        </span>
        {toggleLabel}
      </button>
    </>
  )
}

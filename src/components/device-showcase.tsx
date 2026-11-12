import Image from "next/image"

/**
 * Device 3D showcase (from the mockup-device-3d skill): CSS-drawn iPhones in titanium with the
 * case's real screens on them, a slow turntable, glass highlights and a floor reflection. No
 * mockup images: the devices are drawn in CSS. Everything is sized in `cqw` from `--pw`, the
 * phone width, so the showcase scales with its box. Styles live in globals.css (`.d3-*`).
 */

export type ShowcasePhone = { src: string; alt: string }

type Palette = "midnight" | "pearl"

function Phone({ src, alt, sizes, priority }: ShowcasePhone & { sizes: string; priority?: boolean }) {
  return (
    <div className="d3-body">
      <span aria-hidden="true" className="d3-btn d3-btn-action" />
      <span aria-hidden="true" className="d3-btn d3-btn-up" />
      <span aria-hidden="true" className="d3-btn d3-btn-down" />
      <span aria-hidden="true" className="d3-btn d3-btn-power" />
      <div className="d3-bezel">
        <div className="d3-screen">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
          <span aria-hidden="true" className="d3-glare" />
        </div>
        <span aria-hidden="true" className="d3-island" />
      </div>
    </div>
  )
}

/**
 * One phone faces the viewer; with three, the outer two turn in towards the middle one.
 * `sizes` is the rendered width of one screen, for next/image.
 */
export function DeviceShowcase({
  phones,
  palette = "midnight",
  sizes = "(max-width: 640px) 30vw, 260px",
  priority,
  className = ""
}: {
  phones: ShowcasePhone[]
  palette?: Palette
  sizes?: string
  priority?: boolean
  className?: string
}) {
  const layout = phones.length >= 3 ? "d3-trio" : "d3-solo"
  return (
    <div className={`d3 d3-${palette} ${layout} ${className}`}>
      <span aria-hidden="true" className="d3-lens d3-lens-1" />
      <span aria-hidden="true" className="d3-lens d3-lens-2" />
      <span aria-hidden="true" className="d3-lens d3-lens-3" />
      <div className="d3-stage">
        <div className="d3-row">
          {phones.slice(0, 3).map((p, i) => (
            <div key={p.src} className={`d3-dev d3-dev-${i + 1}`}>
              <Phone {...p} sizes={sizes} priority={priority} />
              <div aria-hidden="true" className="d3-reflect">
                <Phone src={p.src} alt="" sizes={sizes} />
              </div>
              <span aria-hidden="true" className="d3-contact" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

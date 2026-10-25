import Image from "next/image"

/**
 * Home page covers for the selected case studies: one device on a flat ground, playing a short
 * loop of the case's real screens. Laid out on a 1280 × 1024 artboard and sized in `cqw`, so the
 * whole cover scales with its card; the motion lives in globals.css (`.cover-*`).
 */

export type CoverKind = "bi" | "ozen" | "technodom" | "video"

const sizes = "(max-width: 640px) 70vw, 360px"

function Phone({ cam, children }: { cam: string; children: React.ReactNode }) {
  return (
    <div className={`cover-cam cover-phone-cam ${cam}`}>
      <div className="cover-phone">
        <div className="cover-bezel">
          <div className="cover-screen">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Screen({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${className}`} />
}

function Tap({ className }: { className: string }) {
  return <span aria-hidden="true" className={`cover-tap ${className}`} />
}

export function WorkCover({ kind }: { kind: CoverKind }) {
  switch (kind) {
    case "bi":
      return (
        <div className="cover cover-light" style={{ background: "#e8e8ea" }}>
          <Phone cam="cover-bi-cam">
            <Screen src="/work/bi-mobile-search/screens/a-home.webp" alt="BI Group home with quick filters for city, price and rooms" />
          </Phone>
        </div>
      )
    case "ozen":
      return (
        <div className="cover" style={{ background: "#2c2c2e" }}>
          <Phone cam="cover-oz-cam">
            <Screen src="/work/ozen-telegram-music/screens/m1.webp" alt="Ōzen player in Telegram with the Start farming button" />
            <Screen src="/work/ozen-telegram-music/screens/m2.webp" alt="" className="cover-oz-farming" />
            <Screen src="/work/ozen-telegram-music/screens/m3.webp" alt="" className="cover-oz-claim" />
            <Tap className="cover-oz-tap1" />
            <Tap className="cover-oz-tap2" />
          </Phone>
        </div>
      )
    case "technodom":
      return (
        <div className="cover cover-light" style={{ background: "#ece7e4" }}>
          <Phone cam="cover-td-cam">
            <Screen
              src="/work/technodom-credit/screens/offers-all.webp"
              alt="Technodom offers from every partner bank with approved, calculating and refused statuses"
            />
          </Phone>
        </div>
      )
    case "video":
      return (
        <div className="cover" style={{ background: "#0e0e0f" }}>
          <div className="cover-cam cover-window cover-vc-cam">
            <div className="cover-window-bar">
              <i style={{ background: "#ff5f57" }} />
              <i style={{ background: "#febc2e" }} />
              <i style={{ background: "#28c840" }} />
              <span>bi.group</span>
            </div>
            <div className="cover-window-page">
              <Screen src="/work/bi-video-consultation/cover/site.webp" alt="BI Group website with the Video consultation button in the header" />
            </div>
            <span aria-hidden="true" className="cover-vc-dim" />
            <div className="cover-vc-cal">
              <Image src="/work/bi-video-consultation/cover/calendly.webp" alt="" fill sizes="200px" />
            </div>
            <div className="cover-vc-teams">
              <Image src="/work/bi-video-consultation/cover/teams.webp" alt="" fill sizes="300px" />
            </div>
            <Tap className="cover-vc-tap" />
          </div>
        </div>
      )
  }
}

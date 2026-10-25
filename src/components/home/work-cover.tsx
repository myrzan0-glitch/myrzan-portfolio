import Image from "next/image"

/**
 * Home page covers for the selected case studies: one device on a flat ground, playing a short
 * loop of the case's real screens; the video consultation keeps its original banner. Laid out on
 * a 1280 × 1024 artboard and sized in `cqw`, so the whole cover scales with its card; the motion
 * lives in globals.css (`.cover-*`).
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
      // The original banner, as a still: the site's button, Calendly, then the Teams meeting.
      return (
        <div className="cover" style={{ background: "#1e1e1e" }}>
          <Image
            src="/work/video-consult.webp"
            alt="Video consultation flow from the BI Group site to Calendly to a booked Teams call"
            fill
            sizes="(max-width: 640px) 100vw, 580px"
            className="object-contain"
          />
        </div>
      )
  }
}

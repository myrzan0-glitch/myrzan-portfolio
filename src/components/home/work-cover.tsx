import Image from "next/image"

/**
 * Home page covers for the selected case studies: a still mockup of each case's real screens on
 * the phone the case uses; the video consultation keeps its original banner. No motion.
 */

export type CoverKind = "bi" | "ozen" | "technodom" | "video"

export function WorkCover({ kind }: { kind: CoverKind }) {
  switch (kind) {
    case "bi":
      return (
        <div className="cover" style={{ background: "#e9e9ec" }}>
          <Image
            src="/work/bi-mobile-search/cover-mockup.webp"
            alt="BI Group home with quick filters for city, price and rooms, on an iPhone"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )
    case "ozen":
      return (
        <div className="cover" style={{ background: "#2c2c2e" }}>
          <Image
            src="/work/ozen-telegram-music/cover-mockup.webp"
            alt="Ōzen player in Telegram with the top chart and the Start farming button, on an iPhone"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )
    case "technodom":
      return (
        <div className="cover" style={{ background: "#ece7e4" }}>
          <Image
            src="/work/technodom-credit/cover-mockup.webp"
            alt="Technodom offers from every partner bank with approved, calculating and refused statuses, on an Android phone"
            fill
            unoptimized
            className="object-cover"
          />
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

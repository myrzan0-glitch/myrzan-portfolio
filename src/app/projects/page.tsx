import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"

import { SideScene } from "@/components/home/side-scene"
import { grid } from "@/components/home/grid"
import { SiteFooter, SiteNav } from "@/components/home/site-nav"
import { petProjects } from "@/content/profile"

export const metadata: Metadata = {
  title: "Pet projects",
  description: "Products I designed and built myself: wallet.myrzan.com and izipass.myrzan.com."
}

const wrap = grid

export default function ProjectsPage() {
  return (
    <div className="home-root">
      <main id="main">
        <SiteNav className={wrap} />

        <header className={`${wrap} pt-14 sm:pt-20`}>
          <h1 className="t-h1 m-0">Pet projects</h1>
          <p className="t-body1 home-muted m-0 mt-4 max-w-[560px]">
            Products I designed and built myself, from the first sketch to production.
          </p>
        </header>

        {/* Built like the case study cards: the film, then what it is. */}
        <section className={`${wrap} pt-12 sm:pt-16`}>
          <div className="grid gap-x-4 gap-y-14 sm:grid-cols-2">
            {petProjects.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="group row-span-5 grid grid-rows-subgrid gap-y-2.5">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] bg-[var(--home-soft)]">
                  <SideScene kind={p.scene} poster={p.img} alt={p.alt} sizes="(max-width: 640px) 100vw, 620px" />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-[#111] shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-110"
                  >
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </span>
                </div>
                <span className="home-label mt-2">{p.name}</span>
                <h2 className="t-h2 m-0 underline-offset-4 [text-wrap:balance] group-hover:underline sm:max-w-[82%]">
                  {p.title}
                </h2>
                <p className="t-body2 home-muted m-0">{p.line}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="home-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

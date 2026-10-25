import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { SideScene } from "@/components/home/side-scene"
import { SiteFooter, SiteNav } from "@/components/home/site-nav"
import { petProjects } from "@/content/profile"

export const metadata: Metadata = {
  title: "Pet projects",
  description: "Products I designed and built myself: wallet.myrzan.com and izipass.myrzan.com."
}

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-6"

export default function ProjectsPage() {
  return (
    <div className="home-root">
      <main id="main">
        <SiteNav className={wrap} />

        <header className={`${wrap} pt-16 sm:pt-24`}>
          <h1 className="m-0 text-[32px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[44px]">Pet projects</h1>
          <p className="home-muted mt-3 max-w-[560px] text-[15px] leading-[1.6]">
            Products I designed and built myself, from the first sketch to production.
          </p>
        </header>

        <section className={`${wrap} pt-16 sm:pt-20`}>
          <div className="home-rule">
            <span className="home-label">Designed and built by me</span>
            <span className="home-label">{petProjects.length} projects</span>
          </div>
          <div className="mt-6 grid gap-x-4 gap-y-12 sm:grid-cols-2">
            {petProjects.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[var(--home-line)] bg-[var(--home-soft)]">
                  <SideScene kind={p.scene} poster={p.img} alt={p.alt} sizes="(max-width: 640px) 100vw, 580px" />
                </div>
                <span className="home-label mt-1 inline-flex items-center gap-1 !normal-case !tracking-normal">
                  {p.name}
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[17px] font-medium leading-[1.35] sm:text-[19px]">{p.title}</span>
                <span className="home-muted text-[14px] leading-[1.55]">{p.line}</span>
                <span className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="home-chip">
                      {t}
                    </span>
                  ))}
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter className={wrap} />
    </div>
  )
}

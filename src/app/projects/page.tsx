import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { SideScene } from "@/components/home/side-scene"
import { SiteFooter, SiteNav } from "@/components/home/site-nav"
import { petProjects } from "@/content/profile"

export const metadata: Metadata = {
  title: "Pet projects",
  description: "Products I designed and built myself: wallet.myrzan.com and izipass.myrzan.com."
}

const wrap = "mx-auto w-full max-w-[1280px] px-5 sm:px-6"

export default function ProjectsPage() {
  return (
    <div className="home-root">
      <main id="main">
        <SiteNav className={wrap} />

        {/* What they are on the left; the two projects side by side on the right. */}
        <section className={`${wrap} grid gap-10 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12`}>
          <div className="max-w-[560px]">
            <h1 className="m-0 text-[34px] font-medium leading-[1.1] tracking-[-0.025em] sm:text-[40px]">Pet projects</h1>
            <p className="home-muted m-0 mt-6 text-[15px] leading-[1.65] sm:text-base">
              Products I designed and built myself, from the first sketch to production.
            </p>

            <div className="mt-10 border-t border-[var(--home-line)]">
              {petProjects.map((p) => (
                <div key={p.name} className="border-b border-[var(--home-line)] py-5">
                  <div className="flex items-baseline justify-between gap-4 font-[family-name:var(--font-mono)] text-[13px]">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-0.5 font-medium underline decoration-[var(--home-line)] underline-offset-4 transition-colors hover:decoration-[var(--home-fg)]"
                    >
                      {p.name}
                      <ArrowRight className="h-3 w-3 -rotate-45 opacity-60 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                    </a>
                    <span className="shrink-0 text-[var(--home-faint)]">{p.tags[0]}</span>
                  </div>
                  <p className="m-0 mt-2 text-[15px] leading-[1.45]">{p.title}</p>
                  <p className="home-muted m-0 mt-1.5 text-[14px] leading-[1.55]">{p.line}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="home-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-3 sm:grid-cols-2">
            {petProjects.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-[var(--home-soft)] p-3 ring-1 ring-[var(--home-line)]"
              >
                <div className="flex items-center justify-between px-2 pb-3 pt-1">
                  <span className="home-label !normal-case !tracking-normal">{p.name}</span>
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 place-items-center rounded-full bg-[var(--home-bg)] ring-1 ring-[var(--home-line)] transition-transform duration-300 group-hover:scale-110"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <SideScene kind={p.scene} poster={p.img} alt={p.alt} sizes="(max-width: 640px) 100vw, 360px" />
                </div>
                <span className="px-2 pb-1 pt-3 text-[14px] leading-[1.4]">{p.title}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter className={wrap} />
    </div>
  )
}

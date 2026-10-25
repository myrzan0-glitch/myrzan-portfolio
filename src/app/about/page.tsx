import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { SiteFooter, SiteNav } from "@/components/home/site-nav"
import { jobs, photos, rules } from "@/content/profile"

export const metadata: Metadata = {
  title: "About",
  description: "Product designer in London: how I work, where I’ve worked, and life outside work."
}

const wrap = "mx-auto w-full max-w-[1080px] px-5 sm:px-6"

export default function AboutPage() {
  return (
    <div className="home-root">
      <main id="main">
        <SiteNav className={wrap} />

        <header className={`${wrap} pt-16 sm:pt-24`}>
          <h1 className="m-0 text-[32px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[44px]">About me</h1>
          <p className="home-muted mt-3 max-w-[560px] text-[15px] leading-[1.6]">
            Product designer in London. Six years across fintech, e-commerce, property tech and telecom.
          </p>
        </header>

        {/* Personal: the story and a book on the left, photos on the right. */}
        <section className={`${wrap} pt-16 sm:pt-20`}>
          <div className="home-rule">
            <span className="home-label">Personal</span>
          </div>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div>
              <p className="home-muted m-0 text-[15px] leading-[1.6]">
                Born in Nukus, moved to Kazakhstan in 2008, now in London with my wife and our daughter Medina. Moving
                countries taught me to join any team fast. As a kid I wanted to build things. I still do.
              </p>
              <a
                href="https://www.amazon.com/dp/0062435612"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 flex items-start gap-3 rounded-[10px] bg-[var(--home-soft)] p-3 ring-1 ring-transparent transition-shadow hover:ring-[var(--home-line)]"
              >
                <Image
                  src="/personal/competing-against-luck.webp"
                  alt="Cover of Competing Against Luck by Clayton M. Christensen"
                  width={40}
                  height={60}
                  className="h-[60px] w-[40px] shrink-0 rounded-[3px] object-cover shadow-[0_4px_12px_-4px_rgba(0,0,0,0.35)]"
                />
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm">Competing Against Luck</span>
                  <span className="home-label !text-[10px]">Clayton M. Christensen</span>
                  <span className="home-muted mt-1 text-[13px] leading-[1.5]">
                    People don&rsquo;t buy products, they hire them to make progress. It&rsquo;s why I start every
                    project with the customer&rsquo;s job, not the feature list.
                  </span>
                </span>
                <ArrowUpRight
                  className="home-muted ml-auto h-4 w-4 shrink-0 self-start transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
            <div
              aria-label="Personal photos"
              className="work-fan flex items-center overflow-x-auto pb-8 pt-6 [scrollbar-width:none] sm:h-[300px] sm:justify-center sm:overflow-visible sm:pb-0 sm:pt-0 [&::-webkit-scrollbar]:hidden"
            >
              {photos.map((photo, i) => (
                <div
                  key={photo.src}
                  className="fan-card relative h-[190px] w-[128px] shrink-0 overflow-hidden rounded-[10px] max-sm:-ml-3 sm:-ml-[40px] sm:h-[210px] sm:w-[140px]"
                  style={
                    {
                      zIndex: photo.z,
                      marginLeft: i === 0 ? 0 : undefined,
                      "--r": photo.r,
                      "--y": photo.y
                    } as React.CSSProperties
                  }
                >
                  <Image src={photo.src} alt={photo.alt} fill sizes="140px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How I work and experience, side by side. */}
        <div className={`${wrap} grid gap-16 pt-20 sm:pt-24 md:grid-cols-2 md:gap-14`}>
          <section>
            <div className="home-rule">
              <span className="home-label">How I work</span>
            </div>
            {rules.map((r) => (
              <div key={r.n} className="grid gap-1 py-4 sm:grid-cols-[56px_1fr] sm:gap-4 sm:py-[18px]">
                <span className="home-label sm:pt-[3px]">{r.n}</span>
                <div>
                  <p className="m-0 text-[15px] sm:text-base">{r.t}</p>
                  <p className="home-muted mt-1 text-[13px] leading-[1.55] sm:text-sm">{r.b}</p>
                </div>
              </div>
            ))}
          </section>

          <section>
            <div className="home-rule">
              <span className="home-label">Experience</span>
              <span className="home-label">6 years</span>
            </div>
            {jobs.map((j) => (
              <div key={j.company} className="grid gap-1 py-4 sm:grid-cols-[96px_1fr] sm:gap-4 sm:py-[18px]">
                <span className="home-label sm:pt-[3px]">{j.years}</span>
                <div>
                  <p className="m-0 text-[15px] sm:text-base">
                    {j.role} <span className="home-muted">at</span>{" "}
                    {j.url ? (
                      <a
                        href={j.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-0.5 underline decoration-[var(--home-line)] underline-offset-4 transition-colors hover:decoration-[var(--home-fg)]"
                      >
                        {j.company}
                        <ArrowUpRight
                          className="home-muted h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      j.company
                    )}
                    {"via" in j && j.via && <span className="home-muted"> · {j.via}</span>}
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.5] text-[var(--home-faint)]">{j.about}</p>
                  <p className="home-muted mt-1.5 text-[13px] leading-[1.55] sm:text-sm">{j.line}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      <SiteFooter className={wrap} />
    </div>
  )
}

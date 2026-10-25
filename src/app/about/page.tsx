import type { Metadata } from "next"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { SiteFooter, SiteNav } from "@/components/home/site-nav"
import { jobs, photos, rules } from "@/content/profile"

export const metadata: Metadata = {
  title: "About",
  description: "Product designer in London: how I work, where I’ve worked, and life outside work."
}

const wrap = "mx-auto w-full max-w-[1280px] px-5 sm:px-6"
const card = "relative overflow-hidden rounded-2xl bg-[var(--home-soft)] p-5 ring-1 ring-[var(--home-line)]"

export default function AboutPage() {
  return (
    <div className="home-root">
      <main id="main">
        <SiteNav className={wrap} />

        {/* Who I am on the left; photos, the book and what I'm doing now on the right. */}
        <section className={`${wrap} grid gap-10 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12`}>
          <div className="max-w-[560px]">
            <h1 className="m-0 text-[34px] font-medium leading-[1.1] tracking-[-0.025em] sm:text-[40px]">Hey, I&rsquo;m Myrzan!</h1>
            <div className="home-muted mt-6 flex flex-col gap-4 text-[15px] leading-[1.65] sm:text-base">
              <p className="m-0">
                I&rsquo;m a product designer who owns problems end to end, from discovery to shipped code. For six years
                I&rsquo;ve led mobile, fintech and e-commerce products used by millions of people every day.
              </p>
              <p className="m-0">
                I start with context: where the business is going and why customers choose us. Then I research, design
                and prototype in production until the metric moves.
              </p>
              <p className="m-0">
                Born in Nukus, moved to Kazakhstan in 2008, now in London with my wife and our daughter Medina. Moving
                countries taught me to join any team fast. As a kid I wanted to build things. I still do.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className={`${card} sm:col-span-2`}>
              <span className="home-label">Family</span>
              <div
                aria-label="Personal photos"
                className="work-fan flex items-center overflow-x-auto pb-4 pt-6 [scrollbar-width:none] sm:h-[280px] sm:justify-center sm:overflow-visible sm:pb-0 sm:pt-0 [&::-webkit-scrollbar]:hidden"
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

            <a
              href="https://www.amazon.com/dp/0062435612"
              target="_blank"
              rel="noopener noreferrer"
              className={`${card} group flex flex-col`}
            >
              <span className="home-label">Bookshelf</span>
              <span
                aria-hidden="true"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[var(--home-bg)] ring-1 ring-[var(--home-line)] transition-transform duration-300 group-hover:scale-110"
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <Image
                src="/personal/competing-against-luck.webp"
                alt="Cover of Competing Against Luck by Clayton M. Christensen"
                width={238}
                height={360}
                className="mx-auto my-6 h-[168px] w-[111px] rounded-[4px] object-cover shadow-[0_18px_30px_-12px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-rotate-2"
              />
              <span className="text-[15px]">Competing Against Luck</span>
              <span className="home-label mt-1 !text-[10px]">Clayton M. Christensen</span>
              <span className="home-muted mt-2 text-[13px] leading-[1.5]">
                People don&rsquo;t buy products, they hire them to make progress. It&rsquo;s why I start every project with
                the customer&rsquo;s job, not the feature list.
              </span>
            </a>

            <div className={`${card} flex flex-col`}>
              <span className="home-label">Now</span>
              <p className="m-0 mt-6 text-[15px] leading-[1.5]">
                Designing the front-office system of the{" "}
                <a
                  href="https://nbu.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[var(--home-line)] underline-offset-4 transition-colors hover:decoration-[var(--home-fg)]"
                >
                  National Bank of Uzbekistan
                </a>
                .
              </p>
              <p className="home-muted m-0 mt-3 text-[13px] leading-[1.5]">
                Senior Product Designer, via Expera. Prototyping with AI through a Storybook MCP I built.
              </p>
              <div className="mt-auto flex flex-col gap-2 pt-8">
                <span className="inline-flex items-center gap-2 text-[13px]">
                  <span className="h-[7px] w-[7px] rounded-full bg-[var(--home-green)] shadow-[0_0_0_4px_var(--home-green-soft)]" />
                  <span className="home-muted">Open to product design roles in Big Tech</span>
                </span>
                <span className="home-label">London, UK</span>
              </div>
            </div>
          </div>
        </section>

        {/* How I work stays in view while the experience list scrolls past. */}
        <section className={`${wrap} grid gap-14 pt-20 sm:pt-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12`}>
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="home-rule">
              <span className="home-label">How I work</span>
            </div>
            {rules.map((r) => (
              <div key={r.n} className="grid grid-cols-[32px_1fr] gap-3 py-4">
                <span className="home-label pt-[3px]">{r.n}</span>
                <div>
                  <p className="m-0 text-[15px]">{r.t}</p>
                  <p className="home-muted mt-1 text-[13px] leading-[1.55]">{r.b}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="home-rule">
              <span className="home-label">Experience</span>
              <span className="home-label">6 years</span>
            </div>
            {jobs.map((j) => (
              <div key={j.company} className="border-b border-[var(--home-line)] py-5">
                <div className="flex items-baseline justify-between gap-4 font-[family-name:var(--font-mono)] text-[13px]">
                  <span>
                    {j.url ? (
                      <a
                        href={j.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-0.5 font-medium underline decoration-[var(--home-line)] underline-offset-4 transition-colors hover:decoration-[var(--home-fg)]"
                      >
                        {j.company}
                        <ArrowRight className="h-3 w-3 -rotate-45 opacity-60 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="font-medium">{j.company}</span>
                    )}
                    <span className="home-muted"> / {j.role}</span>
                    {"via" in j && j.via && <span className="home-muted"> · {j.via}</span>}
                  </span>
                  <span className="shrink-0 text-[var(--home-faint)]">{j.years}</span>
                </div>
                <p className="m-0 mt-2 text-[13px] leading-[1.5] text-[var(--home-faint)]">{j.about}</p>
                <p className="home-muted m-0 mt-1.5 text-[14px] leading-[1.55]">{j.line}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter className={wrap} />
    </div>
  )
}

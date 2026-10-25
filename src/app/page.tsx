import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { CvButton } from "@/components/cv-button"
import { HeroBackground } from "@/components/hero-background"
import { CopyEmail } from "@/components/home/copy-email"
import { SiteFooter, SiteNav } from "@/components/home/site-nav"
import { WorkCover, type CoverKind } from "@/components/home/work-cover"
import { FadeIn } from "@/components/motion"

const featured: { slug: string; client: string; year: string; title: string; summary: string; cover: CoverKind; light: boolean }[] = [
  {
    slug: "bi-mobile-search",
    client: "BI Group",
    year: "2025",
    title: "Redesigned mobile search to a 54% conversion rate in six weeks",
    summary: "Three filters for 2M+ monthly buyers, split-tested before code",
    cover: "bi",
    light: true
  },
  {
    slug: "ozen-telegram-music",
    client: "Ōzen",
    year: "2025",
    title: "Designed a Web3 music player that feels like Telegram",
    summary: "A Telegram Mini App with 5,000 users in its first week",
    cover: "ozen",
    light: false
  },
  {
    slug: "technodom-credit",
    client: "Technodom",
    year: "2022",
    title: "Turned a credit rejection loop into a $4M-a-month revenue stream",
    summary: "Every partner bank pre-scores the shopper at once",
    cover: "technodom",
    light: true
  },
  {
    slug: "bi-video-consultation",
    client: "BI Group",
    year: "2026",
    title: "Turned a $500 experiment into a $100K sale and a funded product team",
    summary: "Video consultations shipped in one week, with no engineers",
    cover: "video",
    light: false
  }
]

const more = [
  { slug: "bi-match-prototype", title: "BI Match, built in a day with AI", where: "BI Group · 2026", metric: "Live in production" },
  { slug: "bi-design-system", title: "Design system with dark mode and WCAG 2.2", where: "BI Group · 2025", metric: "−83% QA cycles" },
  { slug: "bi-scratch-card", title: "AI-personalised scratch card campaign", where: "BI Group · 2026", metric: "Same-day approval" },
  { slug: "beeline-checkout-research", title: "Checkout research with real customers", where: "Beeline · 2023", metric: "2:43 → 1:37 per order" },
  { slug: "beeline-design-system", title: "From one chaotic file to a design system", where: "Beeline · 2022", metric: "5 flows rebuilt" }
]

const column = "mx-auto w-full max-w-[640px] px-5 sm:px-6"

export default function HomePage() {
  return (
    <div className="home-root">
      <main id="main">
        <section id="intro" className="relative isolate">
          <HeroBackground />

          <SiteNav className={column} />

          <FadeIn>
            <div className={`${column} pb-4 pt-16 sm:pt-24`}>
              <h1 className="m-0 text-[17px] font-medium">Myrzan Izimbetov</h1>
              <p className="home-muted mt-0.5 text-[15px]">Product Designer · London</p>
              <p className="mt-7 text-[19px] leading-[1.5] sm:text-[21px]">
                I own problems end to end, from discovery to shipped code.
              </p>
              <p className="home-muted mt-2.5 text-[16px] leading-[1.55] sm:text-[21px] sm:leading-[1.5]">
                For six years I&apos;ve led mobile, fintech and e-commerce products used by millions of people every day. I
                start with context: where the business is going and why customers choose us. Then I research, design and
                prototype in production until the metric moves.
              </p>
              <p className="home-muted mt-4 text-[15px] leading-[1.55]">
                Now designing the front-office system of the{" "}
                <a
                  href="https://nbu.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--home-fg)] underline decoration-[var(--home-line)] underline-offset-4 transition-colors hover:decoration-[var(--home-fg)]"
                >
                  National Bank of Uzbekistan
                </a>
                .
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
                <CvButton />
                <CopyEmail />
              </div>
              <p className="mt-7 inline-flex items-center gap-2 text-sm">
                <span className="h-[7px] w-[7px] rounded-full bg-[var(--home-green)] shadow-[0_0_0_4px_var(--home-green-soft)]" />
                <span className="home-muted">Open to product design roles in Big Tech</span>
              </p>
            </div>
          </FadeIn>
        </section>

        <section id="work" className="mx-auto w-full max-w-[1180px] px-5 pt-20 sm:px-6 sm:pt-24">
          <div className="home-rule">
            <span className="home-label">Selected work</span>
            <span className="home-label">4 case studies</span>
          </div>
          <div className="mt-6 grid gap-x-4 gap-y-12 sm:grid-cols-2">
            {featured.map((w) => (
              <Link key={w.slug} href={`/work/${w.slug}`} className="group flex flex-col gap-2.5">
                <div className="relative">
                  <WorkCover kind={w.cover} />
                  <span
                    aria-hidden="true"
                    className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                      w.light ? "bg-white text-[#111]" : "bg-white/15 text-white"
                    }`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <span className="home-label mt-2">
                  Case study · {w.year} · {w.client}
                </span>
                <h2 className="m-0 text-[20px] font-medium leading-[1.25] tracking-[-0.01em] underline-offset-4 group-hover:underline sm:text-[22px]">
                  {w.title}
                </h2>
                <p className="home-muted m-0 font-[family-name:var(--font-mono)] text-[13px] leading-[1.5]">{w.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${column} pt-16 sm:pt-[72px]`}>
          <div className="home-rule">
            <span className="home-label">More work</span>
          </div>
          {more.map((m) => (
            <Link
              key={m.slug}
              href={`/work/${m.slug}`}
              className="group flex items-baseline justify-between gap-4 border-b border-[var(--home-line)] py-4"
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px] underline-offset-4 group-hover:underline">{m.title}</span>
                <span className="home-muted text-[13px]">{m.where}</span>
              </span>
              <span className="home-muted inline-flex shrink-0 items-center gap-1.5 font-[family-name:var(--font-mono)] text-xs">
                {m.metric}
                <ArrowUpRight
                  className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}

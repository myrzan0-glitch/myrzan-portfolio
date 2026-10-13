import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { CvButton } from "@/components/cv-button"
import { HeroBackground } from "@/components/hero-background"
import { CopyEmail, EMAIL } from "@/components/home/copy-email"
import { LondonClock } from "@/components/home/london-clock"
import { ThemeSwitch } from "@/components/home/theme-switch"
import { FadeIn } from "@/components/motion"

const fan = [
  { src: "/work/bi-final.webp", w: 230, h: 260, r: "-7deg", y: "18px", z: 1 },
  { src: "/work/td-solution.webp", w: 280, h: 210, r: "3deg", y: "-6px", z: 2 },
  { src: "/work/video-consult.webp", w: 280, h: 210, r: "-2deg", y: "10px", z: 3 },
  { src: "/work/ds-poster.webp", w: 230, h: 260, r: "6deg", y: "-10px", z: 2 }
]

const featured = [
  {
    n: "01",
    company: "BI Group · Mobile web",
    year: "2025",
    title: "Lifted mobile conversion 54% by redesigning search filters in six weeks",
    line: "Ran field research with buyers in a sales office, cut the filter panel down to the three that cover 87% of use, and validated with a split test before handoff.",
    stats: ["54% conversion via filters", "Bounce 25% → 16.8%", "2M+ daily users"],
    img: "/work/bi-final.webp",
    alt: "Redesigned BI Group mobile search with quick-filter chips and a map view"
  },
  {
    n: "02",
    company: "Technodom · Fintech",
    year: "2021",
    title: "Turned a credit rejection loop into a $4M-a-month revenue stream",
    line: "Partnered with five banks to pre-score every shopper in one step instead of one bank at a time. Became the company’s #1 revenue source.",
    stats: ["$4M+ monthly revenue", "+35% approvals", "#1 revenue stream"],
    img: "/work/td-solution.webp",
    alt: "Technodom credit flow showing offers from every partner bank at once"
  },
  {
    n: "03",
    company: "BI Group · Growth experiment",
    year: "2026",
    title: "Opened a new sales channel with a $100K remote sale and zero engineering",
    line: "Mapped the showroom journey with the sales team, found the three moments where buyers need to see to trust, and shipped video consultations in under two weeks.",
    stats: ["$100K first sale", "< 2 weeks to launch", "0 engineers"],
    img: "/work/video-consult.webp",
    alt: "Video consultation flow from the BI Group site to a booked call"
  }
]

const more = [
  { title: "Design system with dark mode and WCAG 2.2", where: "BI Group · 2024", metric: "−83% QA time" },
  { title: "AI prototyping in production code", where: "BI Group · 2025", metric: "1 day to decision" },
  { title: "Checkout and brokerage", where: "Beeline · 2022", metric: "+17.5% conversion" },
  { title: "Enterprise HSE and HR workflows", where: "Petrel AI · 2022 · NDA", metric: "−40% manual work" },
  { title: "Service booking CMS", where: "Vlife · 2020", metric: "0 → 1" }
]

const rules = [
  { n: "01", t: "Context before pixels", b: "I open every project with one-to-ones across product, engineering and business, so each design decision traces back to a goal." },
  { n: "02", t: "Jobs to be done", b: "I design for the job the customer hires the product to do, and I measure success by whether that job gets done." },
  { n: "03", t: "Clear design ownership", b: "I gather input widely and align with users and partners, then I make the call and own the outcome." },
  { n: "04", t: "Fluent in code", b: "Former front-end engineer. I prototype on our production Storybook through AI, so engineering builds from real components, not specs." }
]

const jobs = [
  { years: "2023 – now", role: "Product Designer", company: "BI Group", line: "Own search, the design system and AI prototyping for a platform with 2M+ daily users." },
  { years: "2022 – 2023", role: "Product Designer", company: "Beeline", line: "Lifted mobile checkout conversion 17.5% for a telecom with 11M+ subscribers." },
  { years: "2022", role: "Product Designer", company: "Petrel AI", line: "Cut manual work 40% in enterprise HSE and HR workflows. NDA." },
  { years: "2020 – 2022", role: "Product Designer", company: "Technodom", line: "Designed the credit brokerage that made $4M in one month and became the #1 revenue stream." },
  { years: "2020", role: "UI/UX Designer", company: "Vlife", line: "Designed a booking CMS end to end, plus app motion." }
]

const contacts = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "LinkedIn", value: "/in/myrzanio", href: "https://linkedin.com/in/myrzanio" },
  { label: "Telegram", value: "@myrzanio", href: "https://t.me/myrzanio" },
  { label: "CV", value: "PDF", href: "/cv-myrzan-izimbetov.pdf" }
]

const column = "mx-auto w-full max-w-[640px] px-5 sm:px-6"

export default function HomePage() {
  return (
    <div className="home-root">
      <main id="main">
        <section id="intro" className="relative isolate">
          <HeroBackground />

          <div className={`${column} flex items-center justify-between pt-5 sm:pt-7`}>
            <span className="home-label">
              <LondonClock />
            </span>
            <ThemeSwitch />
          </div>

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

          <div
            aria-label="Work preview"
            className="work-fan mx-auto mt-10 flex max-w-[980px] items-center overflow-x-auto px-5 pb-8 pt-6 [scrollbar-width:none] sm:mt-14 sm:h-[300px] sm:justify-center sm:overflow-visible sm:pb-0 sm:pt-0 [&::-webkit-scrollbar]:hidden"
          >
            {fan.map((card, i) => (
              <div
                key={card.src}
                className="fan-card relative shrink-0 overflow-hidden rounded-[10px] max-sm:-ml-3 max-sm:!h-[180px] max-sm:!w-[170px] sm:-ml-[30px]"
                style={
                  {
                    width: card.w,
                    height: card.h,
                    zIndex: card.z,
                    marginLeft: i === 0 ? 0 : undefined,
                    "--r": card.r,
                    "--y": card.y
                  } as React.CSSProperties
                }
              >
                <Image src={card.src} alt="" fill sizes="280px" className="object-cover" priority={i < 2} />
              </div>
            ))}
          </div>
        </section>

        <section id="work" className={`${column} pt-20 sm:pt-24`}>
          <div className="home-rule">
            <span className="home-label">Selected work</span>
            <span className="home-label">3 case studies</span>
          </div>
          {featured.map((w) => (
            <FadeIn key={w.n}>
              <article className="group flex flex-col gap-3.5 border-b border-[var(--home-line)] py-8">
                <div className="flex justify-between gap-3">
                  <span className="home-label">
                    {w.n} · {w.company}
                  </span>
                  <span className="home-label">{w.year}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="m-0 text-[19px] font-medium leading-[1.3] sm:text-[22px]">{w.title}</h2>
                  <ArrowUpRight className="mt-1 h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
                <p className="home-muted m-0 text-[15px] leading-[1.55]">{w.line}</p>
                <div className="flex flex-wrap gap-1.5">
                  {w.stats.map((s) => (
                    <span key={s} className="home-chip">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="relative mt-1.5 aspect-[16/9] overflow-hidden rounded-xl border border-[var(--home-line)] bg-[var(--home-soft)]">
                  <Image
                    src={w.img}
                    alt={w.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 640px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </article>
            </FadeIn>
          ))}
        </section>

        <section className={`${column} pt-16 sm:pt-[72px]`}>
          <div className="home-rule">
            <span className="home-label">More work</span>
          </div>
          {more.map((m) => (
            <div key={m.title} className="flex items-baseline justify-between gap-4 border-b border-[var(--home-line)] py-4">
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px]">{m.title}</span>
                <span className="home-muted text-[13px]">{m.where}</span>
              </span>
              <span className="home-muted shrink-0 font-[family-name:var(--font-mono)] text-xs">{m.metric}</span>
            </div>
          ))}
        </section>

        <section className={`${column} pt-20 sm:pt-[88px]`}>
          <div className="home-rule">
            <span className="home-label">How I work</span>
          </div>
          {rules.map((r) => (
            <div key={r.n} className="grid gap-1 py-4 sm:grid-cols-[110px_1fr] sm:gap-4 sm:py-[18px]">
              <span className="home-label sm:pt-[3px]">{r.n}</span>
              <div>
                <p className="m-0 text-[15px] sm:text-base">{r.t}</p>
                <p className="home-muted mt-1 text-[13px] leading-[1.55] sm:text-sm">{r.b}</p>
              </div>
            </div>
          ))}
        </section>

        <section className={`${column} pt-20 sm:pt-[88px]`}>
          <div className="home-rule">
            <span className="home-label">Experience</span>
            <span className="home-label">6 years</span>
          </div>
          {jobs.map((j) => (
            <div key={j.company} className="grid gap-1 py-4 sm:grid-cols-[110px_1fr] sm:gap-4 sm:py-[18px]">
              <span className="home-label sm:pt-[3px]">{j.years}</span>
              <div>
                <p className="m-0 text-[15px] sm:text-base">
                  {j.role} <span className="home-muted">at</span> {j.company}
                </p>
                <p className="home-muted mt-1 text-[13px] leading-[1.55] sm:text-sm">{j.line}</p>
              </div>
            </div>
          ))}
        </section>

        <section className={`${column} pt-20 sm:pt-[88px]`}>
          <div className="home-rule">
            <span className="home-label">Personal</span>
          </div>
          <p className="home-muted mt-[18px] text-[15px] leading-[1.6]">
            Born in Nukus, moved to Kazakhstan in 2008, now in London with my wife and our daughter Medina. Moving countries
            taught me to join any team fast. As a kid I wanted to build things. I still do.
          </p>
          <div className="mt-4 flex items-center gap-3 rounded-[10px] bg-[var(--home-soft)] p-3 sm:max-w-[310px]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#E8E2D6] font-[family-name:var(--font-mono)] text-[11px] text-[#555]">
              JTBD
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-sm">Competing Against Luck</span>
              <span className="home-muted text-[13px]">The book that shaped how I design</span>
            </span>
          </div>
        </section>

        <section id="contact" className={`${column} pt-20 sm:pt-[88px]`}>
          <div className="home-rule">
            <span className="home-label">Contact</span>
          </div>
          {contacts.map((k) => (
            <a
              key={k.label}
              href={k.href}
              target={k.href.startsWith("http") ? "_blank" : undefined}
              rel={k.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex min-h-12 items-center justify-between py-2"
            >
              <span className="text-[15px]">{k.label}</span>
              <span className="home-muted inline-flex items-center gap-1.5 text-[13px] sm:text-sm">
                {k.value}
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          ))}
        </section>
      </main>

      <footer className={`${column} home-label flex justify-between pb-12 pt-20`}>
        <span>London, UK</span>
        <span>© {new Date().getFullYear()} Myrzan Izimbetov</span>
      </footer>
    </div>
  )
}

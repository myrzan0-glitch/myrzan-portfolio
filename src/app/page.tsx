import Image from "next/image"
import Link from "next/link"
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

const photos = [
  { src: "/personal/me-london.webp", alt: "Myrzan in London at Christmas", r: "-8deg", y: "14px", z: 1 },
  { src: "/personal/medina-park.webp", alt: "Medina in sunglasses in a London park", r: "4deg", y: "-8px", z: 2 },
  { src: "/personal/wife-medina.webp", alt: "Myrzan's wife holding Medina in a café", r: "-2deg", y: "10px", z: 4 },
  { src: "/personal/me-medina.webp", alt: "Myrzan holding Medina", r: "6deg", y: "-6px", z: 3 },
  { src: "/personal/family-walk.webp", alt: "Family on a city walk, black and white", r: "-5deg", y: "12px", z: 2 }
]

const featured = [
  {
    n: "01",
    slug: "bi-mobile-search",
    company: "BI Group · Mobile web",
    year: "2025",
    title: "Redesigned mobile search to a 54% conversion rate in six weeks",
    line: "Ran field research with buyers in a sales office, cut the filter panel down to the three that cover 87% of use, and validated with a split test before handoff.",
    stats: ["54% conversion rate", "Bounce 25% → 16.8%", "2M+ monthly users"],
    img: "/work/bi-final.webp",
    alt: "Redesigned BI Group mobile search with quick-filter chips and a map view"
  },
  {
    n: "02",
    slug: "technodom-credit",
    company: "Technodom · Fintech",
    year: "2022",
    title: "Turned a credit rejection loop into a $4M-a-month revenue stream",
    line: "Partnered with the banks to pre-score every shopper across all of them in one step, instead of one bank at a time. Became the company’s #1 revenue source.",
    stats: ["$4M+ monthly revenue", "+35% credit conversions", "#1 revenue stream"],
    img: "/work/td-solution.webp",
    alt: "Technodom credit flow showing offers from every partner bank at once"
  },
  {
    n: "03",
    slug: "bi-video-consultation",
    company: "BI Group · Growth experiment",
    year: "2026",
    title: "Turned a $500 experiment into a $100K sale and a funded product team",
    line: "The product team said video calls would take too long to build. I shipped them in one week with Calendly, Teams and one sales manager. The first month closed a $100K apartment sale.",
    stats: ["$100K first sale", "1 week to launch", "0 engineers"],
    img: "/work/video-consult.webp",
    alt: "Video consultation flow from the BI Group site to a booked call"
  },
  {
    n: "04",
    slug: "bi-match-prototype",
    company: "BI Group · AI prototyping",
    year: "2026",
    title: "Built BI Match in one day with AI, from idea to stakeholder decision, then shipped it",
    line: "Matched buyers to homes by lifestyle through swiping. I built the prototype in our production stack with Claude Code, demoed it the same day, and it’s now live.",
    stats: ["1 day to decision", "0 roadmap hours used", "Live in production"],
    img: "/work/bi-match-prototype/hero.webp",
    contain: true,
    alt: "BI Match: Figma connected to Claude through MCP, next to the BI Match screen"
  }
]

const side = [
  {
    name: "wallet.myrzan.com",
    href: "https://wallet.myrzan.com",
    title: "Any card, code or link in your phone’s wallet",
    line: "A free tool that turns a loyalty card, Wi-Fi network or link into an Apple Wallet or Google Wallet pass. Barcodes are read in the browser, card data is never stored, and it speaks Uzbek, Russian, Kazakh and English.",
    tags: ["Next.js", "Apple PassKit", "Google Wallet API"],
    img: "/side/wallet-app.webp",
    alt: "wallet.myrzan.com: a plastic loyalty card flying into a phone’s Wallet, next to Wi-Fi and link passes"
  },
  {
    name: "izipass.myrzan.com",
    href: "https://izipass.myrzan.com",
    title: "Paid events for Uzbekistan, without the paperwork",
    line: "Organisers set up an event in minutes. Guests pay them directly, receipts arrive in Telegram for one-tap approval, tickets go to Apple or Google Wallet, and check-in at the door works offline by scanning QR codes.",
    tags: ["Next.js", "Postgres", "Telegram bot"],
    img: "/side/izipass-app.webp",
    alt: "izipass.myrzan.com: an approved event ticket on a phone, a Telegram receipt to approve and Wallet passes around it"
  }
]

const more = [
  { slug: "bi-design-system", title: "Design system with dark mode and WCAG 2.2", where: "BI Group · 2025", metric: "−83% QA cycles" },
  { slug: "bi-scratch-card", title: "AI-personalised scratch card campaign", where: "BI Group · 2026", metric: "Same-day approval" },
  { slug: "beeline-checkout-research", title: "Checkout research with real customers", where: "Beeline · 2023", metric: "2:43 → 1:37 per order" },
  { slug: "beeline-design-system", title: "From one chaotic file to a design system", where: "Beeline · 2022", metric: "5 flows rebuilt" }
]

const rules = [
  { n: "01", t: "Context before pixels", b: "I open every project with one-to-ones across product, engineering and business, so each design decision traces back to a goal." },
  { n: "02", t: "Jobs to be done", b: "I design for the job the customer hires the product to do, and I measure success by whether that job gets done." },
  { n: "03", t: "Clear design ownership", b: "I gather input widely and align with users and partners, then I make the call and own the outcome." },
  { n: "04", t: "Fluent in code", b: "Former front-end engineer. I prototype on our production Storybook through AI, so engineering builds from real components, not specs." }
]

const jobs = [
  {
    years: "2026 – now",
    role: "Senior Product Designer",
    company: "National Bank of Uzbekistan",
    url: "https://nbu.uz",
    via: "via Expera",
    about: "Uzbekistan’s national bank, serving 3.3M individual clients.",
    line: "Designing the bank’s unified front-office system for opening accounts, deposits and loans. I own the legal-entity branch, and help the design system team with AI-assisted prototyping through a Storybook MCP I built."
  },
  {
    years: "2023 – 2026",
    role: "Product Designer",
    company: "BI Group",
    url: "https://bi.group",
    about: "Property-tech developer ranked #1 by sales volume across the Middle East and CIS.",
    line: "Owned search, the design system and AI prototyping for a platform with 2M+ monthly users."
  },
  {
    years: "2022 – 2023",
    role: "Product Designer",
    company: "Beeline",
    url: "https://beeline.kz",
    about: "Kazakhstan’s telecom operator, with an online shop for phones bundled with plans.",
    line: "Lifted mobile checkout conversion 17.5% for a telecom with 11M+ subscribers."
  },
  {
    years: "2022",
    role: "Product Designer",
    company: "Petrel AI",
    about: "Enterprise software for a global uranium production company.",
    line: "Cut manual work 40% in enterprise HSE and HR workflows. NDA."
  },
  {
    years: "2020 – 2022",
    role: "Product Designer",
    company: "Technodom",
    url: "https://technodom.kz",
    about: "Kazakhstan’s largest electronics retailer, with 70+ stores and a major e-commerce platform.",
    line: "Designed the credit brokerage that made $4M in one month and became the #1 revenue stream."
  },
  {
    years: "2020",
    role: "UI/UX Designer",
    company: "Vlife",
    about: "A startup building a service-booking platform.",
    line: "Designed a booking CMS end to end, plus app motion."
  }
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
            <span className="home-label">4 case studies</span>
          </div>
          {featured.map((w) => (
            <FadeIn key={w.n}>
              <Link
                href={`/work/${w.slug}`}
                className="group flex flex-col gap-3.5 border-b border-[var(--home-line)] py-8"
              >
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
                    className={`${"contain" in w && w.contain ? "bg-[#1b1b1b] object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                  />
                </div>
              </Link>
            </FadeIn>
          ))}
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

        <section className={`${column} pt-16 sm:pt-[72px]`}>
          <div className="home-rule">
            <span className="home-label">Side projects</span>
            <span className="home-label">Designed and built by me</span>
          </div>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-6">
            {side.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[var(--home-line)] bg-[var(--home-soft)]">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <span className="home-label inline-flex items-center gap-1 !normal-case !tracking-normal">
                  {p.name}
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[15px] font-medium leading-[1.35]">{p.title}</span>
                <span className="home-muted text-[13px] leading-[1.55]">{p.line}</span>
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

        <section className={`${column} pt-20 sm:pt-[88px]`}>
          <div className="home-rule">
            <span className="home-label">Personal</span>
          </div>
          <p className="home-muted mt-[18px] text-[15px] leading-[1.6]">
            Born in Nukus, moved to Kazakhstan in 2008, now in London with my wife and our daughter Medina. Moving countries
            taught me to join any team fast. As a kid I wanted to build things. I still do.
          </p>
          <a
            href="https://www.amazon.com/dp/0062435612"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 flex items-start gap-3 rounded-[10px] bg-[var(--home-soft)] p-3 ring-1 ring-transparent transition-shadow hover:ring-[var(--home-line)] sm:max-w-[440px]"
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
                People don&rsquo;t buy products, they hire them to make progress. It&rsquo;s why I start every project
                with the customer&rsquo;s job, not the feature list.
              </span>
            </span>
            <ArrowUpRight
              className="home-muted ml-auto h-4 w-4 shrink-0 self-start transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </section>

        <div
          aria-label="Personal photos"
          className="work-fan mx-auto mt-10 flex max-w-[860px] items-center overflow-x-auto px-5 pb-8 pt-6 [scrollbar-width:none] sm:h-[300px] sm:justify-center sm:overflow-visible sm:pb-0 sm:pt-0 [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="fan-card relative h-[220px] w-[150px] shrink-0 overflow-hidden rounded-[10px] max-sm:-ml-3 max-sm:h-[190px] max-sm:w-[128px] sm:-ml-[26px]"
              style={
                {
                  zIndex: photo.z,
                  marginLeft: i === 0 ? 0 : undefined,
                  "--r": photo.r,
                  "--y": photo.y
                } as React.CSSProperties
              }
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="150px" className="object-cover" />
            </div>
          ))}
        </div>

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

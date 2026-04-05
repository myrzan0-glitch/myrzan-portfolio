import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Linkedin, Mail, Send } from "lucide-react"

import { NotionContent } from "@/components/notion-block-renderer"
import { FloatingSectionNav } from "@/components/floating-section-nav"
import { FadeIn } from "@/components/motion"
import { getSelectedWorkContent } from "@/lib/notion"

const experience = [
  {
    years: "2023 – Present",
    title: "Product Designer @ BI Group",
    href: "https://bi.group/"
  },
  {
    years: "2022 – 2023",
    title: "Product Designer @ Beeline",
    href: "https://apps.apple.com/kz/app/janymda-beeline-%D0%BA%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD/id711280776"
  },
  {
    years: "2022",
    title: "Product Designer @ Petrel AI (NDA)"
  },
  {
    years: "2020 – 2022",
    title: "Product Designer @ Technodom",
    href: "https://apps.apple.com/gb/app/technodom-kz-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD/id1435756761"
  },
  {
    years: "2020",
    title: "UI/UX Designer @ Vlife",
    href: "https://apps.apple.com/kz/app/vlife-%D0%B0%D0%B7%D1%81-%D0%BF%D0%B0%D1%80%D1%82%D0%BD%D0%B5%D1%80%D1%8B-%D0%B1%D0%B0%D0%BB%D0%BB%D1%8B/id1527733098"
  }
]

const selectedWorkPageId = "31725685-1722-8035-ac20-cd8311aec051"

export const dynamic = "force-dynamic"

async function getNotionContent() {
  try {
    return await getSelectedWorkContent(selectedWorkPageId)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const notionContent = await getNotionContent()

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Link
        href="#main"
        className="absolute left-5 top-5 z-40 flex h-[46px] items-center text-sm tracking-tight text-white/90 transition hover:text-white sm:left-8 sm:top-6"
      >
        Myrzan Izimbetov
      </Link>
      <FloatingSectionNav />

      <main id="main" className="mx-auto max-w-7xl px-6 pb-40 pt-20 sm:px-8 sm:pt-24 md:pb-24 md:pt-28">
        <section id="intro">
          <FadeIn>
            <div className="flex items-start justify-between gap-12 py-[4.75rem] sm:py-16 md:py-20">
              <div>
                <h1 className="text-[2rem] font-medium leading-[2.35rem] tracking-tight text-white">
                  Myrzan Izimbetov
                </h1>
                <p className="mt-1 text-base text-white/55 tracking-tight">
                  Product Designer · 6 years · $4M+ monthly revenue impact
                </p>
                <p className="mt-5 text-lg leading-7 text-white/86 sm:mt-6 sm:max-w-xl">
                  I design mobile products that move metrics —{" "}
                  from search and payments to growth experiments{" "}
                  shipped to production with AI.
                </p>
                <p className="mt-4 text-sm text-white/55">
                  London, UK · Open to work
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href="mailto:izimbetov.myrzan@gmail.com"
                    className="text-sm text-white/55 transition hover:text-white/80"
                  >
                    izimbetov.myrzan@gmail.com
                  </Link>
                  <Link
                    href="https://linkedin.com/in/myrzanio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/55 transition hover:text-white/80"
                  >
                    linkedin.com/in/myrzanio
                  </Link>
                  <Link
                    href="https://t.me/myrzanio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/55 transition hover:text-white/80"
                  >
                    t.me/myrzanio
                  </Link>
                </div>
                <a
                  href="/cv-myrzan-izimbetov.pdf"
                  download
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Download CV
                </a>
              </div>

              {/* Avatar — desktop only */}
              <div className="group relative hidden h-60 w-60 shrink-0 cursor-default overflow-hidden rounded-2xl sm:block">
                <Image
                  src="/avatar-default.webp"
                  alt="Myrzan Izimbetov"
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                  priority
                />
                <Image
                  src="/avatar-hover.webp"
                  alt="Myrzan Izimbetov"
                  aria-hidden="true"
                  fill
                  loading="lazy"
                  className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </div>
          </FadeIn>
        </section>

        <section id="projects" className="mt-12 scroll-mt-24 pt-8 sm:mt-16 sm:pt-10 md:mt-20">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-white/55">Selected Work</p>
              </div>
            </div>
          </FadeIn>

          {notionContent.length > 0 && (
            <FadeIn delay={0.05}>
              <div className="mt-8 space-y-8">
                <NotionContent blocks={notionContent} />
              </div>
            </FadeIn>
          )}
        </section>

        <section
          id="about"
          className="mt-10 grid scroll-mt-24 gap-10 pt-8 sm:mt-12 sm:pt-10 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <FadeIn delay={0.05}>
            <div className="max-w-2xl">
              <div>
                <p className="text-sm text-white/55">About</p>
                <p className="mt-3 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  I&apos;m a product designer based in London with 6+ years designing
                  high-traffic mobile products.
                </p>
                <p className="mt-4 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  Most recently at BI Group — a real estate platform with 2M+ daily
                  users — where I ran growth experiments, rebuilt the design system,
                  and shipped AI-assisted prototypes directly to production.
                </p>
                <p className="mt-4 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  Before that: fintech at Beeline (11M+ subscribers), e-commerce
                  credit flows at Technodom ($4M+ MRR), and enterprise ERP at Petrel AI.
                </p>
                <p className="mt-4 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  My work combines product thinking, rapid experimentation, and system design across the full path from research to implementation.
                </p>
                <p className="mt-4 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  I use AI-assisted workflows for prototyping, front-end experimentation, and faster iteration, while keeping product judgment and design decisions firmly human-led.
                </p>
              </div>

              <div className="mt-10">
                <p className="text-sm text-white/55">Contact</p>
                <div className="mt-3 space-y-2 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  <p>
                    <Link
                      href="mailto:izimbetov.myrzan@gmail.com"
                      className="inline-flex items-center gap-2 hover:text-white"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-white/65" />
                      <span>izimbetov.myrzan@gmail.com</span>
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="https://www.linkedin.com/in/myrzanio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-white"
                    >
                      <Linkedin className="h-4 w-4 shrink-0 text-white/65" />
                      <span>linkedin.com/in/myrzanio</span>
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="https://t.me/myrzanio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-white"
                    >
                      <Send className="h-4 w-4 shrink-0 text-white/65" />
                      <span>t.me/myrzanio</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="space-y-8">
              {experience.map((item) => (
                <div key={`${item.years}-${item.title}`}>
                  <p className="text-sm text-white/55">{item.years}</p>
                  {item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-1 inline-flex items-center gap-1.5 text-base leading-6 tracking-tight text-white sm:text-lg"
                    >
                      <span>{item.title}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/70 transition group-hover:text-white" />
                    </Link>
                  ) : (
                    <p className="mt-1 text-base leading-6 tracking-tight sm:text-lg">
                      {item.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <footer className="mt-10 pb-24 pt-6 text-sm text-white/45 md:mt-12 md:pb-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>© {new Date().getFullYear()} Myrzan Izimbetov</span>
            <Link href="#main" className="hover:text-white/80">
              Back to top
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}

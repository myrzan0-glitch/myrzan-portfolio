import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { ThemeSwitch } from "@/components/home/theme-switch"
import { FadeIn } from "@/components/motion"
import { caseStudies, getCaseStudy, type CaseImage } from "@/content/case-studies"

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return {
    title: study.title,
    description: study.summary,
    openGraph: { title: study.title, description: study.summary, images: [{ url: study.hero.src }] }
  }
}

const column = "mx-auto w-full max-w-[640px] px-5 sm:px-6"
const wide = "mx-auto w-full max-w-[960px] px-5 sm:px-6"

function Figure({ image, priority }: { image: CaseImage; priority?: boolean }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-xl border border-[var(--home-line)] bg-[var(--home-soft)]">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.w}
          height={image.h}
          sizes="(max-width: 960px) 100vw, 960px"
          className="h-auto w-full"
          priority={priority}
        />
      </div>
      {image.caption && <figcaption className="home-muted mt-3 text-[13px] leading-[1.5]">{image.caption}</figcaption>}
    </figure>
  )
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const index = caseStudies.findIndex((c) => c.slug === study.slug)
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <div className="home-root">
      <main id="main" className="pb-20">
        <div className={`${column} flex items-center justify-between pt-5 sm:pt-7`}>
          <Link
            href="/#work"
            className="home-label inline-flex items-center gap-1.5 !text-[var(--home-fg)] transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            All work
          </Link>
          <ThemeSwitch />
        </div>

        <FadeIn>
          <header className={`${column} pt-14 sm:pt-20`}>
            <div className="flex justify-between gap-3">
              <span className="home-label">
                0{index + 1} · {study.company}
              </span>
              <span className="home-label">{study.year}</span>
            </div>
            <h1 className="mt-4 text-[28px] font-medium leading-[1.15] sm:text-[36px]">{study.title}</h1>
            <p className="home-muted mt-4 text-[16px] leading-[1.6] sm:text-[18px]">{study.summary}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--home-line)] pt-6 sm:grid-cols-4">
              {study.meta.map((m) => (
                <div key={m.label}>
                  <dt className="home-label">{m.label}</dt>
                  <dd className="m-0 mt-1.5 text-[14px] leading-[1.45]">{m.value}</dd>
                </div>
              ))}
            </dl>
          </header>
        </FadeIn>

        <div className={`${wide} mt-10 sm:mt-14`}>
          <Figure image={study.hero} priority />
        </div>

        <section aria-label="Outcomes" className={`${column} mt-10 sm:mt-14`}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--home-line)] bg-[var(--home-line)] sm:grid-cols-4">
            {study.outcomes.map((o) => (
              <div key={o.label} className="bg-[var(--home-bg)] p-4">
                <div className="text-[22px] font-medium leading-none tracking-[-0.02em] sm:text-[24px]">{o.value}</div>
                <div className="home-muted mt-2 text-[12px] leading-[1.4]">{o.label}</div>
              </div>
            ))}
          </div>
        </section>

        {study.sections.map((s) => (
          <section key={s.label} className="mt-16 sm:mt-20">
            <FadeIn>
              <div className={column}>
                <div className="home-rule">
                  <span className="home-label">{s.label}</span>
                </div>
                <h2 className="mt-5 text-[21px] font-medium leading-[1.3] sm:text-[24px]">{s.title}</h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 32)} className="home-muted mt-4 text-[16px] leading-[1.65]">
                    {p}
                  </p>
                ))}
                {s.points && (
                  <ul className="mt-5 flex list-none flex-col gap-2.5 p-0">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[15px] leading-[1.55]">
                        <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--home-faint)]" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeIn>
            {s.image && (
              <div className={`${wide} mt-8`}>
                <Figure image={s.image} />
              </div>
            )}
          </section>
        ))}

        <section className={`${column} mt-16 sm:mt-20`}>
          <blockquote className="m-0 border-l-2 border-[var(--home-fg)] pl-5 text-[19px] leading-[1.5] sm:text-[21px]">
            {study.takeaway}
          </blockquote>
        </section>

        <nav aria-label="Next case study" className={`${column} mt-20`}>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-4 border-y border-[var(--home-line)] py-6"
          >
            <span className="flex flex-col gap-1.5">
              <span className="home-label">Next · {next.company}</span>
              <span className="text-[17px] font-medium leading-[1.35] sm:text-[19px]">{next.title}</span>
            </span>
            <ArrowRight
              className="h-[18px] w-[18px] shrink-0 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </nav>
      </main>
    </div>
  )
}

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { ThemeSwitch } from "@/components/home/theme-switch"
import type { CaseStudy, Chapter, ChapterText, StoryCase as Study, Tone, Visual } from "@/content/case-studies"

import { HeroStage, LayersStage, LoopStage } from "./stages"

/**
 * Story case study: one claim per chapter. The text on the left argues a design decision, the
 * panel on the right proves it, then results and a reflection close the page.
 */

const wrap = "mx-auto w-full max-w-[1200px] px-5 sm:px-6"

const tones: Record<Tone, string> = {
  accent: "var(--story-accent)",
  coin: "var(--story-coin)",
  farm: "var(--story-farm)",
  spend: "var(--story-spend)"
}

/** Sets **double-asterisk** spans in the text colour. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-medium text-[var(--home-fg)]">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  )
}

function Text({ n, chapter, children }: { n: number; chapter: ChapterText; children?: React.ReactNode }) {
  return (
    <div className="min-w-0 md:sticky md:top-8">
      <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--home-faint)]">({n})</span>
      <h2 className="mt-2 text-[24px] font-medium leading-[1.15] tracking-[-0.02em] [text-wrap:balance] sm:text-[30px]">{chapter.title}</h2>
      {chapter.body.map((p) => (
        <p key={p.slice(0, 32)} className="home-muted mt-3.5 text-[15px] leading-[1.6]">
          <Rich text={p} />
        </p>
      ))}
      {children}
    </div>
  )
}

function Results({ results }: { results: NonNullable<Chapter["results"]> }) {
  return (
    <div className="mt-6">
      {results.map((r) => (
        <div key={r.label} className="border-t border-[var(--home-line)] py-5">
          <div className="text-[40px] font-normal leading-none tracking-[-0.03em] tabular-nums sm:text-[52px]">{r.value}</div>
          <div className="home-label mt-2.5 !text-[var(--home-fg)]">{r.label}</div>
          <div className="mt-1 font-[family-name:var(--font-mono)] text-[11px] text-[var(--home-faint)]">{r.note}</div>
        </div>
      ))}
    </div>
  )
}

function VisualPanel({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case "economy":
      return (
        <figure
          role="img"
          aria-label={visual.description}
          className="m-0 flex flex-col justify-center gap-3.5 rounded-[14px] bg-[var(--home-panel)] p-5 sm:p-10"
        >
          <span className="home-label">{visual.label}</span>
          {visual.rows.map((row, i) => (
            <React.Fragment key={i}>
              {row.divider && <div className="my-1.5 h-px bg-[var(--home-line)]" />}
              <div className="flex flex-wrap items-center gap-2">
                {row.items.map((item, j) =>
                  "node" in item ? (
                    <span key={j} className="inline-flex items-center gap-2 rounded-full bg-[var(--home-bg)] px-3 py-2 text-[14px] font-medium">
                      <i className="h-[9px] w-[9px] rounded-full" style={{ background: tones[item.tone] }} />
                      {item.node}
                    </span>
                  ) : (
                    <span key={j} className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11.5px] text-[var(--home-muted)]">
                      {item.arrow}
                      <span className="font-[family-name:var(--font-body)] text-[15px] text-[var(--home-faint)]">→</span>
                    </span>
                  )
                )}
              </div>
            </React.Fragment>
          ))}
        </figure>
      )
    case "layers":
      return (
        <figure className="m-0">
          <LayersStage screen={visual.screen} parts={visual.parts} label={visual.label} />
          <figcaption className="mt-2.5 text-center font-[family-name:var(--font-mono)] text-[11px] leading-[1.5] text-[var(--home-faint)]">
            {visual.note}
          </figcaption>
        </figure>
      )
    case "loop":
      return <LoopStage steps={visual.steps} label={visual.label} />
    case "image":
      return (
        <figure className="m-0">
          <div className="overflow-hidden rounded-[14px] bg-[var(--home-panel)]">
            <Image src={visual.src} alt={visual.alt} width={visual.w} height={visual.h} sizes="(max-width: 860px) 100vw, 700px" className="h-auto w-full" />
          </div>
          {visual.caption && <figcaption className="home-muted mt-3 text-[13px] leading-[1.5]">{visual.caption}</figcaption>}
        </figure>
      )
  }
}

export function StoryCase({ study, next }: { study: Study; next: CaseStudy }) {
  const { story } = study
  let n = 0

  return (
    <div className="home-root">
      <main id="main" className="pb-20">
        <div className={`${wrap} flex items-center justify-between pt-5 sm:pt-7`}>
          <Link
            href="/#work"
            className="home-label inline-flex items-center gap-1.5 !text-[var(--home-fg)] transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            All work
          </Link>
          <ThemeSwitch />
        </div>

        <header className={`${wrap} pt-14 text-center sm:pt-16`}>
          <span className="home-label">
            {study.company} · {study.year}
          </span>
          <h1 className="mx-auto mt-4 max-w-[760px] text-[32px] font-medium leading-[1.08] tracking-[-0.02em] [text-wrap:balance] sm:text-[48px]">
            {study.title}
          </h1>
          <p className="home-muted mx-auto mt-4 max-w-[520px] text-[16px] leading-[1.6]">{story.subtitle}</p>
        </header>

        <div className={`${wrap} mt-10`}>
          <HeroStage screens={story.heroScreens} label={story.heroLabel} />
          <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-[1fr_2fr_1fr]">
            {story.role.map((r, i) => (
              <div key={r.label} className={`min-w-0 ${i === 1 ? "max-sm:order-last max-sm:col-span-2" : ""}`}>
                <dt className="home-label">{r.label}</dt>
                <dd className="m-0 mt-2 text-[14px] leading-[1.5]">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {story.chapters.map((chapter) => (
          <section
            key={chapter.title}
            className={`${wrap} mt-24 grid items-start gap-6 md:mt-36 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14`}
          >
            <Text n={++n} chapter={chapter}>
              {chapter.results && <Results results={chapter.results} />}
            </Text>
            {chapter.visual && <VisualPanel visual={chapter.visual} />}
            {chapter.alongside && <Text n={++n} chapter={chapter.alongside} />}
          </section>
        ))}

        <nav aria-label="Next case study" className={`${wrap} mt-28`}>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-4 border-y border-[var(--home-line)] py-6"
          >
            <span className="flex flex-col gap-1.5">
              <span className="home-label">Next · {next.company}</span>
              <span className="text-[17px] font-medium leading-[1.35] sm:text-[19px]">{next.title}</span>
            </span>
            <ArrowRight className="h-[18px] w-[18px] shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </nav>
      </main>
    </div>
  )
}

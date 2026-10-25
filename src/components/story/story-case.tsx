import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { ThemeSwitch } from "@/components/home/theme-switch"
import type { CaseStudy, Chapter, ChapterText, StoryCase as Study, Tone, Visual } from "@/content/case-studies"

import { HeroStage, LayersStage, LoopStage, RowStage } from "./stages"

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

function Text({ n, chapter, full, children }: { n: number; chapter: ChapterText; full?: boolean; children?: React.ReactNode }) {
  return (
    <div className={`min-w-0 ${full ? "max-w-[620px]" : "md:sticky md:top-8"}`}>
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

function Metrics({ metrics }: { metrics: NonNullable<Chapter["metrics"]> }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-2.5 rounded-[14px] bg-[var(--home-panel)] p-[18px] sm:p-6">
          <strong className="text-[40px] font-normal leading-none tracking-[-0.03em] tabular-nums sm:text-[56px]">{m.value}</strong>
          <span className="home-label !text-[var(--home-fg)]">{m.label}</span>
          {m.meter?.was !== undefined && (
            <div className="h-1.5 overflow-hidden rounded-[3px] bg-[var(--home-bg)]">
              <i className="block h-full rounded-[3px] bg-[var(--home-faint)] opacity-50" style={{ width: `${m.meter.was}%` }} />
            </div>
          )}
          {m.meter && (
            <div className="h-1.5 overflow-hidden rounded-[3px] bg-[var(--home-bg)]">
              <i className="block h-full rounded-[3px] bg-[var(--story-accent)]" style={{ width: `${m.meter.now}%` }} />
            </div>
          )}
          <small className="mt-auto pt-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--home-faint)]">{m.note}</small>
        </div>
      ))}
    </div>
  )
}

function Next({ next }: { next: NonNullable<Chapter["next"]> }) {
  return (
    <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
      {next.map((item, i) => (
        <li key={item.title} className="flex flex-col gap-2.5 rounded-[14px] border border-[var(--home-line)] p-[18px] sm:p-6">
          <span className="home-label">{String(i + 1).padStart(2, "0")}</span>
          <b className="text-[18px] font-medium tracking-[-0.01em]">{item.title}</b>
          <p className="home-muted m-0 text-[14px] leading-[1.6]">{item.body}</p>
        </li>
      ))}
    </ol>
  )
}

const statusTones = { ok: "var(--story-ok)", calc: "var(--story-accent)", no: "var(--story-warn)" }
const chip = "whitespace-nowrap rounded-full px-2.5 py-1.5"

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
    case "row":
      return <RowStage items={visual.items} label={visual.label} mark={visual.mark} note={visual.note} />
    case "attempts":
      return (
        <figure
          role="img"
          aria-label={visual.description}
          className="m-0 flex flex-col justify-center gap-3.5 rounded-[14px] bg-[var(--home-panel)] p-5 sm:p-10"
        >
          {visual.groups.map((group, g) => (
            <React.Fragment key={group.label}>
              {g > 0 && <div className="my-1 h-px bg-[var(--home-line)]" />}
              <span className="home-label">{group.label}</span>
              {group.rows.map((row) => (
                <div key={row.lead + row.steps[0].text} className="grid items-center gap-1.5 text-[13px] sm:grid-cols-[64px_1fr] sm:gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--home-faint)]">{row.lead}</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {row.steps.map((step, i) => (
                      <React.Fragment key={step.text}>
                        {i > 0 && <span className="text-[var(--home-faint)]">→</span>}
                        <span
                          className={`${chip} ${step.tone ? "text-white" : "bg-[var(--home-bg)]"}`}
                          style={step.tone ? { background: step.tone === "no" ? "var(--story-warn)" : "var(--story-accent)" } : undefined}
                        >
                          {step.text}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </figure>
      )
    case "fan":
      return (
        <figure
          role="img"
          aria-label={visual.description}
          className="m-0 flex flex-col justify-center gap-3.5 rounded-[14px] bg-[var(--home-panel)] p-5 sm:p-10"
        >
          <span className="home-label">{visual.label}</span>
          <div className="grid items-center gap-3.5 sm:grid-cols-[auto_1fr] sm:gap-[22px]">
            <div className="rounded-xl bg-[var(--story-accent)] px-4 py-3.5 text-[14px] leading-[1.35] text-white">
              {visual.source}
              <small className="mt-1 block font-[family-name:var(--font-mono)] text-[10.5px] opacity-80">{visual.sourceNote}</small>
            </div>
            <div className="flex flex-col gap-1.5">
              {visual.answers.map((a) => (
                <div key={a.name} className="flex items-center justify-between gap-3 rounded-[10px] bg-[var(--home-bg)] px-3 py-2.5 text-[13px]">
                  {a.name}
                  <span
                    className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px]"
                    style={{ color: statusTones[a.tone] }}
                  >
                    <i className="h-[7px] w-[7px] rounded-full bg-current" />
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--home-muted)]">
            {visual.facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </figure>
      )
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

        {story.chapters.map((chapter) => {
          const full = chapter.layout === "full"
          return (
            <section
              key={chapter.title}
              className={`${wrap} mt-24 grid items-start md:mt-36 ${
                full ? "gap-8" : "gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14"
              }`}
            >
              <Text n={++n} chapter={chapter} full={full}>
                {chapter.results && <Results results={chapter.results} />}
              </Text>
              {chapter.visual && <VisualPanel visual={chapter.visual} />}
              {chapter.metrics && <Metrics metrics={chapter.metrics} />}
              {chapter.next && <Next next={chapter.next} />}
              {chapter.alongside && <Text n={++n} chapter={chapter.alongside} />}
            </section>
          )
        })}

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

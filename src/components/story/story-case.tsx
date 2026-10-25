import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { ThemeSwitch } from "@/components/home/theme-switch"
import type { CaseStudy, Chapter, StoryCase as Study, Tone, Visual } from "@/content/case-studies"

import { HeroStage, LayersStage, LoopStage, RowStage } from "./stages"

/**
 * Story case study: one claim per chapter. The text on the left argues a design decision and the
 * panel on the right proves it; wide chapters stack the text over a full-width panel. Results and
 * next steps close the page.
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

function Text({ n, chapter, wide }: { n: number; chapter: Chapter; wide?: boolean }) {
  return (
    <div className={`min-w-0 ${wide ? "max-w-[620px]" : "md:sticky md:top-8"}`}>
      <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--home-faint)]">({n})</span>
      <h2 className="mt-2 text-[24px] font-medium leading-[1.15] tracking-[-0.02em] [text-wrap:balance] sm:text-[30px]">{chapter.title}</h2>
      {chapter.body.map((p) => (
        <p key={p.slice(0, 32)} className="home-muted mt-3.5 text-[15px] leading-[1.6]">
          <Rich text={p} />
        </p>
      ))}
    </div>
  )
}

const note = "mt-2.5 text-center font-[family-name:var(--font-mono)] text-[11px] leading-[1.5] text-[var(--home-faint)]"
const diagram = "m-0 flex flex-col justify-center gap-[18px] rounded-[14px] bg-[var(--home-panel)] p-5 sm:p-10"
const facts = "flex flex-wrap gap-x-5 gap-y-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--home-muted)]"

function Meter({ value, was }: { value: number; was?: boolean }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-[3px] bg-[var(--home-bg)]">
      <i className={`block h-full rounded-[3px] ${was ? "bg-[var(--home-faint)] opacity-50" : "bg-[var(--story-mark)]"}`} style={{ width: `${value}%` }} />
    </div>
  )
}

function Metrics({ metrics }: { metrics: NonNullable<Chapter["metrics"]> }) {
  return (
    <div
      className="grid grid-cols-2 gap-3 md:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
      style={{ "--n": Math.min(4, metrics.length) } as React.CSSProperties}
    >
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-2.5 rounded-[14px] bg-[var(--home-panel)] p-[18px] md:p-6">
          <strong className="text-[40px] font-normal leading-none tracking-[-0.03em] tabular-nums lg:text-[56px]">{m.value}</strong>
          <span className="home-label !text-[var(--home-fg)]">{m.label}</span>
          {m.meter?.was !== undefined && <Meter value={m.meter.was} was />}
          {m.meter && <Meter value={m.meter.now} />}
          <small className="mt-auto pt-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--home-faint)]">{m.note}</small>
        </div>
      ))}
    </div>
  )
}

function Cards({ cards }: { cards: NonNullable<Chapter["cards"]> }) {
  return (
    <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
      {cards.map((c, i) => (
        <li key={c.title} className="flex flex-col gap-2.5 rounded-[14px] border border-[var(--home-line)] p-[18px] md:p-6">
          <span className="home-label">{String(i + 1).padStart(2, "0")}</span>
          <b className="text-[18px] font-medium tracking-[-0.01em]">{c.title}</b>
          <p className="home-muted m-0 text-[14px] leading-[1.6]">{c.body}</p>
        </li>
      ))}
    </ol>
  )
}

const statusTones = { ok: "var(--story-ok)", calc: "var(--story-mark)", no: "var(--story-warn)" }

function VisualPanel({ visual, wide }: { visual: Visual; wide?: boolean }) {
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
          <LayersStage screen={visual.screen} parts={visual.parts} label={visual.label} zoom={visual.zoom} />
          <figcaption className={note}>{visual.note}</figcaption>
        </figure>
      )
    case "loop":
      return <LoopStage steps={visual.steps} label={visual.label} />
    case "row":
      return (
        <figure className="m-0">
          <RowStage phones={visual.phones} label={visual.label} toggle={visual.toggle} wide={wide} />
          <figcaption className={note}>{visual.note}</figcaption>
        </figure>
      )
    case "share":
      return (
        <figure role="img" aria-label={visual.description} className={diagram}>
          <span className="home-label">{visual.label}</span>
          <div className="flex h-11 overflow-hidden rounded-[10px] font-[family-name:var(--font-mono)] text-[12px]">
            <span className="flex items-center whitespace-nowrap bg-[var(--story-mark)] px-3 text-white" style={{ width: `${visual.main.value}%` }}>
              {visual.main.label} — {visual.main.value}%
            </span>
            <span className="flex flex-1 items-center whitespace-nowrap bg-[var(--home-bg)] px-3 text-[var(--home-muted)]">{100 - visual.main.value}%</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {visual.chips.map((c) => (
              <span
                key={c.name}
                className={`rounded-full px-2.5 py-1.5 text-[13px] ${c.top ? "bg-[var(--story-mark)] text-white" : "bg-[var(--home-bg)]"}`}
              >
                {c.name}
              </span>
            ))}
          </div>
          <div className={facts}>
            {visual.facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </figure>
      )
    case "dots":
      return (
        <figure role="img" aria-label={visual.description} className={diagram}>
          <span className="home-label">{visual.label}</span>
          {visual.rows.map((row) => (
            <div key={row.name} className="grid grid-cols-[56px_1fr_40px] items-center gap-3 text-[13px] sm:grid-cols-[70px_1fr_48px]">
              <span>{row.name}</span>
              <div className="flex gap-1.5">
                {Array.from({ length: row.total }, (_, i) => (
                  <i
                    key={i}
                    className={`h-5 w-5 rounded-full sm:h-[26px] sm:w-[26px] ${
                      i >= row.done
                        ? "bg-[var(--home-bg)] shadow-[inset_0_0_0_1px_var(--home-line)]"
                        : row.muted
                          ? "bg-[var(--home-faint)]"
                          : "bg-[var(--story-mark)]"
                    }`}
                  />
                ))}
              </div>
              <b className="text-right font-medium tabular-nums">
                {row.done} / {row.total}
              </b>
            </div>
          ))}
          <div className={facts}>
            {visual.facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </figure>
      )
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
                          className={`whitespace-nowrap rounded-full px-2.5 py-1.5 ${
                            step.tone === "no" ? "bg-[var(--story-warn)] text-white" : step.tone === "yes" ? "bg-[var(--story-mark)] text-white" : "bg-[var(--home-bg)]"
                          }`}
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
            <div className="rounded-xl bg-[var(--story-mark)] px-4 py-3.5 text-[14px] leading-[1.35] text-white">
              {visual.source}
              <small className="mt-1 block font-[family-name:var(--font-mono)] text-[10.5px] opacity-80">{visual.sourceNote}</small>
            </div>
            <div className="flex flex-col gap-1.5">
              {visual.answers.map((a) => (
                <div key={a.name} className="flex items-center justify-between gap-3 rounded-[10px] bg-[var(--home-bg)] px-3 py-2.5 text-[13px]">
                  {a.name}
                  <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px]" style={{ color: statusTones[a.tone] }}>
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

  return (
    <div className={`home-root ${story.palette ? `story-${story.palette}` : ""}`}>
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

        {story.chapters.map((chapter, i) => {
          const wide = chapter.wide || !chapter.visual
          return (
            <section
              key={chapter.title}
              className={`${wrap} mt-24 grid items-start gap-6 md:mt-36 ${wide ? "md:gap-8" : "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14"}`}
            >
              <Text n={i + 1} chapter={chapter} wide={wide} />
              {chapter.visual && <VisualPanel visual={chapter.visual} wide={wide} />}
              {chapter.metrics && <Metrics metrics={chapter.metrics} />}
              {chapter.cards && <Cards cards={chapter.cards} />}
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

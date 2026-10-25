"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react"

import { EMAIL } from "@/components/home/copy-email"
import { LondonClock } from "@/components/home/london-clock"
import { ThemeSwitch } from "@/components/home/theme-switch"

const pages = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" }
]

/** Top bar for the home, about and projects pages: the clock, a segmented control, the theme switch. */
export function SiteNav({ className = "" }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] items-center gap-3 pt-5 sm:pt-7 ${className}`}>
      <span className="home-label max-sm:hidden">
        <LondonClock />
      </span>
      <nav
        aria-label="Pages"
        className="flex rounded-full bg-[var(--home-soft)] p-1 shadow-[inset_0_0_0_1px_var(--home-line)] max-sm:col-span-2 max-sm:justify-self-start"
      >
        {pages.map((p) => {
          const active = pathname === p.href
          return (
            <Link
              key={p.href}
              href={p.href}
              aria-current={active ? "page" : undefined}
              className={`home-label rounded-full px-3.5 py-1.5 transition-colors sm:px-4 ${
                active
                  ? "bg-[var(--home-bg)] !text-[var(--home-fg)] shadow-[0_1px_2px_rgba(0,0,0,0.12),0_0_0_1px_var(--home-line)]"
                  : "hover:!text-[var(--home-fg)]"
              }`}
            >
              {p.label}
            </Link>
          )
        })}
      </nav>
      <span className="justify-self-end">
        <ThemeSwitch />
      </span>
    </div>
  )
}

const reach = [
  { label: "Telegram", href: "https://t.me/myrzanio" }
]

const elsewhere = [
  { label: "LinkedIn", href: "https://linkedin.com/in/myrzanio" },
  { label: "CV", href: "/cv-myrzan-izimbetov.pdf" }
]

const footLink =
  "group inline-flex items-center gap-1 text-[14px] text-[var(--home-fg)] underline-offset-4 transition-opacity hover:underline"

function CopyEmailLink() {
  const [copied, setCopied] = React.useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      // Clipboard can be blocked; the address stays visible and links to mail
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      <a href={`mailto:${EMAIL}`} className={`${footLink} min-w-0 break-all`}>
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : `Copy email ${EMAIL}`}
        className="grid h-7 w-7 place-items-center rounded-md text-[var(--home-muted)] ring-1 ring-[var(--home-line)] transition-colors hover:text-[var(--home-fg)]"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-[var(--home-green)]" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </span>
  )
}

function Column({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex min-w-0 flex-col gap-3 ${className}`}>
      <span className="home-label">{title}</span>
      {children}
    </div>
  )
}

/** Site-wide footer: an invitation and the time in London, then pages, ways to reach me, and elsewhere. */
export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-[var(--home-line)] bg-[var(--home-soft)]">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 pb-12 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
        <div>
          <p className="m-0 max-w-[420px] text-[24px] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[28px]">
            Let&rsquo;s work together.
          </p>
          <p className="home-label mt-4">
            <LondonClock />
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-[auto_auto_auto]">
          <Column title="Pages">
            {pages.map((p) => (
              <Link key={p.href} href={p.href} className={footLink}>
                {p.label}
              </Link>
            ))}
          </Column>
          {/* On phones the email needs the full width, so this column takes the second row to itself. */}
          <Column title="Reach me" className="max-sm:order-last max-sm:col-span-2">
            <CopyEmailLink />
            {reach.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={footLink}>
                {l.label}
                <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>
            ))}
          </Column>
          <Column title="Elsewhere">
            {elsewhere.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={footLink}>
                {l.label}
                <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>
            ))}
          </Column>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 border-t border-[var(--home-line)] px-5 py-6 sm:px-6">
        <span className="home-label">
          © {new Date().getFullYear()} Myrzan Izimbetov · Built with a lot of coffee
        </span>
        <a href="#main" className="home-label inline-flex items-center gap-1 transition-colors hover:!text-[var(--home-fg)]">
          Back to top
          <ArrowUp className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}

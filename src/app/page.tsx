import Link from "next/link"
import {
  ArrowUpRight,
  ArrowUp,
  MapPin,
  Mail,
  Linkedin,
  Send
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeToggle } from "@/components/theme-toggle"
import { FadeIn, Stagger, StaggerItem } from "@/components/motion"

import { caseStudies } from "@/data/case-studies"

const experience = [
  {
    company: "BI Group",
    role: "Product Designer",
    duration: "Aug 2023 – Present",
    scale: "DAU 2M+ users"
  },
  {
    company: "Beeline",
    role: "Product Designer",
    duration: "Sep 2022 – Aug 2023",
    scale: "DAU 11M+ users"
  },
  {
    company: "Petrel AI",
    role: "Product Designer",
    duration: "Jan 2022 – Sep 2022",
    scale: "NDA project"
  },
  {
    company: "Technodom Operator",
    role: "Product Designer",
    duration: "Dec 2020 – Jan 2022",
    scale: "DAU 2M+ users"
  },
  {
    company: "Vlife",
    role: "UI/UX Designer",
    duration: "Apr 2020 – Dec 2020",
    scale: "Startup, CMS"
  }
]

export default function HomePage() {
  return (
    <div className="relative">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">
              Myrzan Izimbetov
            </p>
            <p className="text-xs text-muted-foreground">Product Designer</p>
          </div> 
          <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Primary">
            <Link className="flex h-11 items-center hover:text-foreground" href="#projects">
              Projects
            </Link>
            <Link className="flex h-11 items-center hover:text-foreground" href="#experience">
              Experience
            </Link>
            <Link className="flex h-11 items-center hover:text-foreground" href="#contact">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto flex max-w-6xl flex-col px-6">
        <section
          id="hero"
          className="relative flex min-h-[90vh] flex-col justify-center gap-10 py-16"
        >
         {/* <div className="absolute right-6 top-32 hidden h-16 w-16 rounded-full border border-border/50 md:block" aria-hidden /> */}

          {/* <FadeIn>
            <div className="flex flex-wrap items-center gap-4">
              <Badge className="bg-accent text-accent-foreground">London, UK</Badge>
              <span className="metric-chip">✦ +$4M in MRR ✦</span>
              <span className="metric-chip">✺ +37% pageview growth ✺</span>
            </div>
          </FadeIn> */}

          <FadeIn delay={0.1}>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Myrzan Izimbetov
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
              Results-driven Product Designer focused on UX and UI, creating elegant,
              user-centered experiences that have generated
              <span className="font-semibold text-foreground"> +$4M in MRR </span> and
              <span className="font-semibold text-foreground"> +37% pageview growth </span>
              across mobile, desktop, and web platforms.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="#projects">View featured work</Link>
              </Button>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        className="flex h-11 items-center gap-2 rounded-full border border-border/60 px-4 hover:border-foreground"
                        href="https://www.linkedin.com/in/myrzanio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Myrzan Izimbetov on LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>Open LinkedIn profile</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Link
                  className="flex h-11 items-center gap-2 rounded-full border border-border/60 px-4 hover:border-foreground"
                  href="https://t.me/myrzanio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message on Telegram"
                >
                  <Send className="h-4 w-4" />
                  Telegram
                </Link>
                <Link
                  className="flex h-11 items-center gap-2 rounded-full border border-border/60 px-4 hover:border-foreground"
                  href="mailto:izimbetov.myrzan@gmail.com"
                  aria-label="Send email"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              London, UK — feel free to drop a line
            </div>
          </FadeIn>
        </section>

        <Separator className="my-6" />

        <section id="projects" className="py-16">
          <FadeIn>
            <p className="eyebrow">Featured work</p>
            <h2 className="section-title mt-4">Impact-led case studies</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Seven deep dives covering mobile conversion, scalable systems, and
              research-driven product decisions. Each card opens a full Notion case study.
            </p>
          </FadeIn>

          <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
            {caseStudies.map((project) => (
              <StaggerItem key={project.title}>
                <Card className="group h-full overflow-hidden border border-border/70 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-foreground/50">
                  <div
                    className={[
                      "relative h-48 w-full overflow-hidden bg-cover bg-center sm:h-56",
                      project.tone === "dark"
                        ? "bg-neutral-950"
                        : "bg-gradient-to-br from-muted/80 via-background to-muted"
                    ].join(" ")}
                    style={project.thumbnail ? { backgroundImage: `url(${project.thumbnail})` } : undefined}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20" aria-hidden />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {[...(project.metrics ?? []), ...project.tags].map((tag) => (
                        <Badge
                          key={`${project.title}-${tag}`}
                          className="rounded-full border border-border/60 bg-white/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-foreground dark:border-white/15 dark:bg-foreground dark:text-background"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {!project.thumbnail ? (
                      <>
                        <div
                          className="absolute right-4 top-8 h-28 w-44 rounded-[28px] border border-border/60 bg-white/70 shadow-lg sm:h-32 sm:w-52"
                          aria-hidden
                        />
                        <div
                          className="absolute right-10 top-20 h-24 w-36 rounded-[24px] border border-border/60 bg-white/60 shadow-md sm:h-28 sm:w-44"
                          aria-hidden
                        />
                      </>
                    ) : null}
                  </div>

                  <CardHeader>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                      {project.company}
                    </p>
                    <CardTitle className="mt-4 text-2xl text-foreground">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <Link
                      href={`/case-study/${project.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                      aria-label={`Open ${project.title} case study`}
                    >
                      View case study
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <Separator className="my-6" />

        <section id="experience" className="py-16">
          <FadeIn>
            <p className="eyebrow">Experience</p>
            <h2 className="section-title mt-4">Trajectory across scale</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Product design roles spanning high-growth startups to multi-million DAU platforms.
            </p>
          </FadeIn>

          <div className="relative mt-10 pl-12">
            <div className="absolute left-6 top-3 h-full w-px bg-border/70" aria-hidden />
            <div className="grid gap-4">
              {experience.map((role, index) => {
                const isCurrent = role.duration.includes("Present")
                return (
                  <FadeIn key={role.company} delay={index * 0.05}>
                    <div className="relative rounded-3xl border border-border/60 bg-card/70 p-5 md:p-6">
                      <div
                        className={[
                          "absolute -left-6 top-6 h-3.5 w-3.5 -translate-x-1/2 rounded-full border",
                          isCurrent ? "bg-accent border-accent" : "bg-background border-border"
                        ].join(" ")}
                        aria-hidden
                      />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold">{role.company}</h3>
                          {isCurrent ? (
                            <Badge className="bg-accent text-accent-foreground">Current</Badge>
                          ) : null}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {role.duration}
                        </span>
                      </div>
                      <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        {role.role}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {role.scale}
                      </p>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </section>

        <Separator className="my-6" />

        <section id="contact" className="py-16">
          <FadeIn>
            <p className="eyebrow">Let's connect</p>
            <h2 className="section-title mt-4">Ready to build the next product?</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ideas worth writing.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="mailto:myrzan29@gmail.com"
                    className="inline-flex min-h-11 w-full items-center justify-between gap-2 text-sm font-semibold"
                    aria-label="Email Myrzan Izimbetov"
                  >
                    myrzan29@gmail.com
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle>LinkedIn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Follow the work.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://www.linkedin.com/in/myrzanio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full items-center justify-between gap-2 text-sm font-semibold"
                    aria-label="Open LinkedIn profile"
                  >
                    linkedin.com/in/myrzanio
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle>Telegram</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Salam, Myrzan!
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://t.me/myrzanio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full items-center justify-between gap-2 text-sm font-semibold"
                    aria-label="Open Telegram"
                  >
                    t.me/myrzanio
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Myrzan Izimbetov</span>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4" />
            London, UK
          </div>
          <Link
            href="#hero"
            className="inline-flex items-center gap-2"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </div>
  )
}

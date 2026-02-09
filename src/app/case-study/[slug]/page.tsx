import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { NotionContent } from "@/components/notion-block-renderer"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { caseStudies } from "@/data/case-studies"

export const revalidate = 3600

async function getCaseStudy(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const res = await fetch(`${baseUrl}/api/case-study/${slug}`, {
    next: { revalidate: 3600 }
  })

  if (!res.ok) return null
  return res.json()
}

export default async function CaseStudyPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getCaseStudy(slug)

  if (!data) {
    notFound()
  }

  const { page, blocks } = data
  const title =
    page?.properties?.title?.title?.[0]?.plain_text ||
    page?.properties?.Name?.title?.[0]?.plain_text ||
    "Case Study"

  return (
    <div>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Button asChild variant="ghost" size="sm" className="h-10 gap-2 rounded-full px-4">
            <Link href="/#projects">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-12">
          <p className="eyebrow">Case study</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>
        </header>

        <article>
          <NotionContent blocks={blocks} />
        </article>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { NotionContent } from "@/components/notion-block-renderer"
import { Button } from "@/components/ui/button"
import { getBlocksRecursively, getPage } from "@/lib/notion"
import { extractNotionTitle, getPlainText, slugify } from "@/lib/notion-utils"

export const revalidate = 3600

async function getSelectedWorkPage(id: string) {
  try {
    const [page, blocks] = await Promise.all([getPage(id), getBlocksRecursively(id)])
    return { page, blocks }
  } catch {
    return null
  }
}

function collectHeadingSections(blocks: any[]): Array<{ id: string; title: string }> {
  const items: Array<{ id: string; title: string }> = []

  for (const block of blocks) {
    if (block.type === "heading_2") {
      const title = getPlainText(block.heading_2?.rich_text)
      if (title) {
        items.push({ id: slugify(title), title })
      }
    }

    if (Array.isArray(block.children) && block.children.length > 0) {
      items.push(...collectHeadingSections(block.children))
    }
  }

  return items
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const data = await getSelectedWorkPage(id)
    if (!data) return {}
    const title = extractNotionTitle(data.page, "Selected Work")
    return {
      title,
      openGraph: { title },
      twitter: { title }
    }
  } catch {
    return {}
  }
}

export default async function SelectedWorkDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getSelectedWorkPage(id)

  if (!data) {
    notFound()
  }

  const { page, blocks } = data
  const title = extractNotionTitle(page, "Selected Work")
  const headingSections = collectHeadingSections(blocks)

  return (
    <div className="min-h-screen bg-black text-white">
      <main id="main" className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-10 h-10 gap-2 rounded-full px-4 text-white hover:bg-white/10 hover:text-white"
        >
          <Link href="/#projects">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>

        <header className="mb-10">
          <h1 className="text-[2rem] font-semibold tracking-tight">
            {title}
          </h1>
          {headingSections.length > 0 ? (
            <nav
              aria-label="Sections"
              className="mt-6 flex flex-wrap gap-2"
            >
              {headingSections.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {section.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </header>

        <article className="[&_.prose]:max-w-none [&_.prose]:text-white/85 [&_.prose_a]:text-white [&_.prose_a]:no-underline hover:[&_.prose_a]:underline [&_.prose_blockquote]:border-white/20 [&_.prose_code]:bg-white/10">
          <NotionContent blocks={blocks} />
        </article>

        <section className="mt-16 pt-10 sm:mt-20">
          <p className="text-sm text-white/55">Contact</p>
          <p className="mt-3 max-w-3xl text-[2rem] font-medium tracking-tight text-white leading-[2.35rem]">
            Say hi
            <br />
            <Link
              href="mailto:izimbetov.myrzan@gmail.com"
              className="inline-flex items-center gap-2 text-white transition hover:text-white/80"
            >
              <span>izimbetov.myrzan@gmail.com</span>
              <ArrowUpRight className="h-[0.7em] w-[0.7em] shrink-0" />
            </Link>
          </p>
        </section>

        <footer className="mt-12 pt-6 text-sm text-white/45">
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

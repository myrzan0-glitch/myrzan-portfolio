import { NextResponse } from "next/server"
import { caseStudyMap } from "@/data/case-studies"
import { getBlocksRecursively, getPage } from "@/lib/notion"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const pageId = caseStudyMap[slug]

  if (!pageId) {
    return NextResponse.json({ error: "Case study not found" }, { status: 404 })
  }

  try {
    const page = await getPage(pageId)
    const blocks = await getBlocksRecursively(pageId)

    return NextResponse.json({ page, blocks })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch case study" },
      { status: 500 }
    )
  }
}

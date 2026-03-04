import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createHmac, timingSafeEqual } from "crypto"

import { caseStudies } from "@/data/case-studies"

const SELECTED_WORK_PAGE_ID = "31725685-1722-8035-ac20-cd8311aec051"

// Strip hyphens for comparison since Notion IDs can appear in both formats
function stripHyphens(id: string) {
  return id.replace(/-/g, "")
}

function verifySignature(rawBody: string, header: string, secret: string): boolean {
  const hmac = createHmac("sha256", secret)
  hmac.update(rawBody)
  const digest = `sha256=${hmac.digest("hex")}`
  try {
    return timingSafeEqual(Buffer.from(digest), Buffer.from(header))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.NOTION_WEBHOOK_SECRET
  if (!secret) {
    console.error("[notion-webhook] NOTION_WEBHOOK_SECRET is not set")
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
  }

  const rawBody = await request.text()

  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  // Notion URL verification challenge — echo back the token, no signature needed
  if (typeof payload.verification_token === "string") {
    return NextResponse.json({ verification_token: payload.verification_token }, { status: 200 })
  }

  const signature = request.headers.get("x-notion-signature") ?? ""
  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  // Extract page ID — Notion puts it at entity.id
  const pageId =
    (payload?.entity as { id?: string })?.id ??
    (payload?.data as { id?: string })?.id

  if (!pageId) {
    return NextResponse.json({ message: "No page ID in payload" }, { status: 200 })
  }

  const normalizedId = stripHyphens(pageId)
  const revalidated: string[] = []

  // Selected work parent page → revalidate home
  if (stripHyphens(SELECTED_WORK_PAGE_ID) === normalizedId) {
    revalidatePath("/")
    revalidated.push("/")
  }

  // Case study pages
  for (const study of caseStudies) {
    if (stripHyphens(study.notionPageId) === normalizedId) {
      revalidatePath(`/case-study/${study.slug}`)
      revalidated.push(`/case-study/${study.slug}`)
    }
  }

  // Selected work sub-pages (dynamic)
  if (revalidated.length === 0) {
    const hyphenatedId = pageId.includes("-") ? pageId : pageId.replace(
      /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
      "$1-$2-$3-$4-$5"
    )
    revalidatePath(`/selected-work/${hyphenatedId}`)
    revalidatePath("/")
    revalidated.push(`/selected-work/${hyphenatedId}`, "/")
  }

  console.log("[notion-webhook] Revalidated:", revalidated)
  return NextResponse.json({ revalidated }, { status: 200 })
}

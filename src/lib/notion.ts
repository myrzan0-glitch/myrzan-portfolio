import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_API_KEY
})

type Retryable<T> = () => Promise<T>

async function withRetries<T>(fn: Retryable<T>, retries = 3, delayMs = 500): Promise<T> {
  try {
    return await fn()
  } catch (error: any) {
    const status = error?.status
    if (retries > 0 && (status === 429 || status === 503)) {
      await new Promise((resolve) => setTimeout(resolve, delayMs))
      return withRetries(fn, retries - 1, delayMs * 2)
    }
    throw error
  }
}

export async function getPage(pageId: string) {
  return withRetries(() => notion.pages.retrieve({ page_id: pageId }))
}

export async function getPageContent(pageId: string) {
  const blocks = await withRetries(() =>
    notion.blocks.children.list({ block_id: pageId, page_size: 100 })
  )
  return blocks.results
}

export async function getBlocksRecursively(blockId: string): Promise<any[]> {
  const blocks = await withRetries(() =>
    notion.blocks.children.list({ block_id: blockId, page_size: 100 })
  )

  const results = await Promise.all(
    blocks.results.map(async (block: any) => {
      if (block.type === "child_page") {
        try {
          const page: any = await getPage(block.id)
          block.pageMeta = {
            icon: page?.icon ?? null,
            title:
              page?.properties?.title?.title?.[0]?.plain_text ||
              page?.properties?.Name?.title?.[0]?.plain_text ||
              page?.properties?.name?.title?.[0]?.plain_text ||
              block.child_page?.title ||
              "Untitled",
            cover:
              page?.cover?.type === "file"
                ? page.cover.file.url
                : page?.cover?.type === "external"
                  ? page.cover.external.url
                  : null
          }
        } catch {
          block.pageMeta = {
            icon: null,
            title: block.child_page?.title || "Untitled",
            cover: null
          }
        }
      }

      if (block.type === "link_to_page" && block.link_to_page?.type === "page_id") {
        try {
          const pageId = block.link_to_page.page_id
          const page: any = await getPage(pageId)
          block.pageMeta = {
            icon: page?.icon ?? null,
            pageId,
            title:
              page?.properties?.title?.title?.[0]?.plain_text ||
              page?.properties?.Name?.title?.[0]?.plain_text ||
              page?.properties?.name?.title?.[0]?.plain_text ||
              "Untitled",
            cover:
              page?.cover?.type === "file"
                ? page.cover.file.url
                : page?.cover?.type === "external"
                  ? page.cover.external.url
                  : null
          }
        } catch {
          block.pageMeta = {
            icon: null,
            pageId: block.link_to_page.page_id,
            title: "Untitled",
            cover: null
          }
        }
      }

      if (block.has_children) {
        block.children = await getBlocksRecursively(block.id)
      }
      return block
    })
  )

  return results
}

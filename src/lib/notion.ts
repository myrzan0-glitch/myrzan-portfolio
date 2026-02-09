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
      if (block.has_children) {
        block.children = await getBlocksRecursively(block.id)
      }
      return block
    })
  )

  return results
}

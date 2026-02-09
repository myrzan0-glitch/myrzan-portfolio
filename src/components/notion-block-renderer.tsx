import Image from "next/image"
import * as React from "react"

type RichText = {
  plain_text: string
  href: string | null
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  text: { content: string; link: { url: string } | null }
}

type Block = {
  id: string
  type: string
  has_children?: boolean
  children?: Block[]
  [key: string]: any
}

function renderRichText(richText: RichText[]) {
  return richText.map((text, index) => {
    const {
      annotations: { bold, italic, strikethrough, underline, code },
      text: { content, link }
    } = text

    let element: React.ReactNode = <span>{content}</span>

    if (bold) element = <strong>{element}</strong>
    if (italic) element = <em>{element}</em>
    if (strikethrough) element = <del>{element}</del>
    if (underline) element = <u>{element}</u>
    if (code) {
      element = (
        <code className="rounded bg-muted px-1 py-0.5 text-sm">{element}</code>
      )
    }
    if (link) {
      element = (
        <a
          href={link.url}
          className="text-primary underline-offset-4 hover:underline"
          target={link.url.startsWith("http") ? "_blank" : undefined}
          rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {element}
        </a>
      )
    }

    return <React.Fragment key={`${index}-${content}`}>{element}</React.Fragment>
  })
}

function renderList(blocks: Block[], listType: "bulleted_list_item" | "numbered_list_item") {
  const ListTag = listType === "bulleted_list_item" ? "ul" : "ol"
  const listClass = listType === "bulleted_list_item" ? "list-disc" : "list-decimal"

  return (
    <ListTag className={`ml-6 ${listClass} space-y-2`}>
      {blocks.map((block) => {
        const value = block[listType]
        return (
          <li key={block.id}>
            {renderRichText(value.rich_text)}
            {block.children && block.children.length > 0 ? (
              <div className="mt-2">{renderBlocks(block.children)}</div>
            ) : null}
          </li>
        )
      })}
    </ListTag>
  )
}

function renderBlocks(blocks: Block[]) {
  const output: React.ReactNode[] = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const listType = block.type
      const listItems: Block[] = [block]
      let j = i + 1

      while (j < blocks.length && blocks[j].type === listType) {
        listItems.push(blocks[j])
        j += 1
      }

      output.push(
        <React.Fragment key={`${listType}-${block.id}`}>
          {renderList(listItems, listType)}
        </React.Fragment>
      )
      i = j
      continue
    }

    output.push(<NotionBlockRenderer key={block.id} block={block} />)
    i += 1
  }

  return output
}

export function NotionBlockRenderer({ block }: { block: Block }) {
  const { type } = block

  switch (type) {
    case "paragraph":
      return (
        <p className="mb-4 text-base leading-relaxed">
          {renderRichText(block.paragraph.rich_text)}
        </p>
      )

    case "heading_1":
      return (
        <h1 className="mb-6 mt-10 text-4xl font-bold">
          {renderRichText(block.heading_1.rich_text)}
        </h1>
      )

    case "heading_2":
      return (
        <h2 className="mb-4 mt-10 text-3xl font-bold">
          {renderRichText(block.heading_2.rich_text)}
        </h2>
      )

    case "heading_3":
      return (
        <h3 className="mb-3 mt-8 text-2xl font-semibold">
          {renderRichText(block.heading_3.rich_text)}
        </h3>
      )

    case "bulleted_list_item":
    case "numbered_list_item":
      return null

    case "quote":
      return (
        <blockquote className="my-6 border-l-2 border-border pl-4 italic text-muted-foreground">
          {renderRichText(block.quote.rich_text)}
        </blockquote>
      )

    case "callout":
      return (
        <div className="my-6 flex items-start gap-3 rounded-lg border border-border/70 bg-muted/50 p-4">
          <span className="text-lg">
            {block.callout.icon?.emoji ? block.callout.icon.emoji : "💡"}
          </span>
          <div className="text-sm text-muted-foreground">
            {renderRichText(block.callout.rich_text)}
          </div>
        </div>
      )

    case "code":
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{block.code.rich_text.map((t: RichText) => t.plain_text).join("")}</code>
        </pre>
      )

    case "image": {
      const image = block.image
      const imageUrl =
        image.type === "file" ? image.file.url : image.external.url
      const caption = image.caption?.[0]?.plain_text

      if (!imageUrl) {
        return (
          <div className="my-8 rounded-lg border border-border/60 bg-muted/50 p-6 text-sm text-muted-foreground">
            Image unavailable
          </div>
        )
      }

      const isNotion = imageUrl.includes("notion") || imageUrl.includes("amazonaws.com")

      return (
        <figure className="my-8">
          {isNotion ? (
            // Notion image URLs are signed and can reject proxying; use plain img.
            <img
              src={imageUrl}
              alt={caption || "Case study image"}
              className="h-auto w-full rounded-lg"
              loading="lazy"
            />
          ) : (
            <Image
              src={imageUrl}
              alt={caption || "Case study image"}
              width={1200}
              height={800}
              className="h-auto w-full rounded-lg"
            />
          )}
          {caption ? (
            <figcaption className="mt-2 text-sm text-muted-foreground">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      )
    }

    case "divider":
      return <hr className="my-8 border-border" />

    default:
      return null
  }
}

export function NotionContent({ blocks }: { blocks: Block[] }) {
  return <div className="prose prose-lg dark:prose-invert max-w-none">{renderBlocks(blocks)}</div>
}

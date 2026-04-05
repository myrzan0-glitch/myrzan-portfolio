export function getPlainText(richText: Array<{ plain_text: string }> = []) {
  return richText.map((item) => item.plain_text).join("")
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function extractNotionTitle(page: any, fallback = "Untitled"): string {
  return (
    page?.properties?.title?.title?.[0]?.plain_text ||
    page?.properties?.Name?.title?.[0]?.plain_text ||
    page?.properties?.name?.title?.[0]?.plain_text ||
    page?.child_page?.title ||
    fallback
  )
}

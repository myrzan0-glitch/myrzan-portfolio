export type CaseStudy = {
  title: string
  company: string
  description: string
  slug: string
  notionPageId: string
  tags: string[]
  metrics: string[]
  tone: "light" | "dark"
  thumbnail: string
}

export const caseStudies: CaseStudy[] = [
  {
    title: "BI Group: +54% mobile conversion",
    company: "BI Group",
    description:
      "Six-week mobile redesign that unlocked higher conversion across high-intent user flows.",
    slug: "bi-group-conversion",
    notionPageId: "1d325685-1722-80ed-b5e9-e1d6e2887140",
    tags: ["UX/UI", "Mobile"],
    metrics: ["+54% conversion"],
    tone: "light",
    thumbnail: "/case-studies/bi-group-conversion.jpg"
  },
  {
    title: "BI Group Design System",
    company: "BI Group",
    description:
      "Tokenized system with dark theme support for consistent, rapid product delivery.",
    slug: "bi-group-design-system",
    notionPageId: "27a25685-1722-8036-aa54-de6f393b0ecc",
    tags: ["Design System", "Tokens"],
    metrics: ["Scalable DS"],
    tone: "dark",
    thumbnail: "/case-studies/bi-group-ds.jpg"
  },
  {
    title: "Technodom Credit Flow Redesign",
    company: "Technodom",
    description:
      "Streamlined credit flow with clearer decision paths and frictionless checkout.",
    slug: "technodom-credit-flow",
    notionPageId: "27a25685-1722-80ed-a760-c9dd6d8ede69",
    tags: ["Fintech", "Conversion"],
    metrics: ["+35% conversions"],
    tone: "light",
    thumbnail: "/case-studies/technodom-credit.jpg"
  },
  {
    title: "ōzen — Web3 Music Platform",
    company: "ōzen",
    description:
      "Telegram-native music experience bridging Web3 identity and community discovery.",
    slug: "ozen-web3-platform",
    notionPageId: "27a25685-1722-806a-b007-e006b4d717fb",
    tags: ["Web3", "Telegram"],
    metrics: ["Web3 platform"],
    tone: "dark",
    thumbnail: "/case-studies/ozen-web3.jpg"
  },
  {
    title: "Beeline Design System",
    company: "Beeline",
    description:
      "Turned fragmented UI into systematic harmony for scale and speed.",
    slug: "beeline-design-system",
    notionPageId: "1d325685-1722-81ad-90f1-dc6b198ee88b",
    tags: ["Design System", "Scale"],
    metrics: ["Design system"],
    tone: "light",
    thumbnail: "/case-studies/beeline-ds.jpg"
  },
  {
    title: "Beeline UX Research Bundle",
    company: "Beeline",
    description:
      "Research synthesis that aligned product strategy with e-commerce behavior shifts.",
    slug: "beeline-ux-research",
    notionPageId: "1d325685-1722-813d-a3d5-c5493eed92d5",
    tags: ["Research", "E-com"],
    metrics: ["UX research"],
    tone: "dark",
    thumbnail: "/case-studies/beeline-research.jpg"
  },
  {
    title: "UI Shots",
    company: "Portfolio",
    description:
      "High-fidelity UI explorations and visual studies across platforms.",
    slug: "ui-shots",
    notionPageId: "81462643-fb05-43f4-a5aa-c684d2e4c91c",
    tags: ["Visual", "Explorations"],
    metrics: ["Design showcase"],
    tone: "light",
    thumbnail: "/case-studies/ui-shots.jpg"
  }
]

export const caseStudyMap = Object.fromEntries(
  caseStudies.map((study) => [study.slug, study.notionPageId])
)

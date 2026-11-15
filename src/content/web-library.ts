/**
 * Web and enterprise work for the screen carousel on the home page: Petrel AI's ERP screens,
 * translated to English with the client's logo blurred. To add or remove a screen, edit
 * `webScreens` (1440 px wide .webp in public/work/web/petrel); the carousel and the viewer pick
 * it up from here.
 */

export type WebProductId = "petrel"

export const webProducts: { id: WebProductId; name: string; years: string; title: string; line: string }[] = [
  {
    id: "petrel",
    name: "Petrel AI",
    years: "2022",
    title: "HSE and HR platform",
    line: "Tasks, inspections, road safety and a business-process builder for a global uranium producer. NDA."
  }
]

/** Screens are 1440 px wide; `h` is the height when it isn't 900 (long pages scroll in the viewer). */
export const webScreens: { src: string; product: WebProductId; title: string; h?: number }[] = [
  { src: "/work/web/petrel/tasks.webp", product: "petrel", title: "Tasks assigned to me", h: 1024 },
  { src: "/work/web/petrel/road-traffic.webp", product: "petrel", title: "Road traffic and weather", h: 1845 },
  { src: "/work/web/petrel/inspection.webp", product: "petrel", title: "New inspection results", h: 1644 },
  { src: "/work/web/petrel/process-builder.webp", product: "petrel", title: "Business process builder", h: 1024 },
  { src: "/work/web/petrel/explanatory-note.webp", product: "petrel", title: "Explanatory note", h: 1024 }
]

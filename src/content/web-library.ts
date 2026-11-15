/**
 * Web and enterprise work for the screen library on the home page.
 *
 * Petrel AI shows its real screens, translated to English with the client's logo blurred; the
 * others are still placeholders. To swap one, drop the real export (1440 px wide, as .webp) over
 * the file at the same path. To add or remove a screen, edit `webScreens`; the carousel shows each
 * product's first screen and the viewer shows them all.
 */

export type WebProductId = "nbu" | "petrel" | "technodom" | "vlife"

export const webProducts: { id: WebProductId; name: string; years: string; title: string; line: string }[] = [
  {
    id: "nbu",
    name: "National Bank of Uzbekistan",
    years: "2026 – now",
    title: "Front-office system",
    line: "One system for opening accounts, deposits and loans. I own the legal-entity branch."
  },
  {
    id: "petrel",
    name: "Petrel AI",
    years: "2022",
    title: "HSE and HR platform",
    line: "Tasks, inspections, road safety and a business-process builder for a global uranium producer. NDA."
  },
  {
    id: "technodom",
    name: "Technodom",
    years: "2020 – 2022",
    title: "Warehouse management system",
    line: "Stock, picking and shipping for Kazakhstan’s largest electronics retailer."
  },
  {
    id: "vlife",
    name: "Vlife",
    years: "2020",
    title: "Barbershop booking CMS",
    line: "Calendar, barbers, clients and payments for a service-booking startup."
  }
]

/** Screens are 1440 px wide; `h` is the height when it isn't 900 (long pages scroll in the viewer). */
export const webScreens: { src: string; product: WebProductId; title: string; h?: number }[] = [
  { src: "/work/web/nbu/01.webp", product: "nbu", title: "Client list" },
  { src: "/work/web/nbu/02.webp", product: "nbu", title: "Opening a current account" },
  { src: "/work/web/nbu/03.webp", product: "nbu", title: "Branch overview" },
  { src: "/work/web/petrel/tasks.webp", product: "petrel", title: "Tasks assigned to me", h: 1024 },
  { src: "/work/web/petrel/road-traffic.webp", product: "petrel", title: "Road traffic and weather", h: 1845 },
  { src: "/work/web/petrel/inspection.webp", product: "petrel", title: "New inspection results", h: 1644 },
  { src: "/work/web/petrel/process-builder.webp", product: "petrel", title: "Business process builder", h: 1024 },
  { src: "/work/web/petrel/explanatory-note.webp", product: "petrel", title: "Explanatory note", h: 1024 },
  { src: "/work/web/technodom/01.webp", product: "technodom", title: "Inventory" },
  { src: "/work/web/technodom/02.webp", product: "technodom", title: "Shift overview" },
  { src: "/work/web/technodom/03.webp", product: "technodom", title: "Creating a shipment" },
  { src: "/work/web/vlife/01.webp", product: "vlife", title: "Booking calendar" },
  { src: "/work/web/vlife/02.webp", product: "vlife", title: "Clients" },
  { src: "/work/web/vlife/03.webp", product: "vlife", title: "Shop overview" }
]

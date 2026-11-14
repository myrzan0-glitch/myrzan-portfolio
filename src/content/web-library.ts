/**
 * Web and enterprise work for the screen library on the home page.
 *
 * The screens are placeholders for now. To swap one, drop the real export (1440 × 900, or any
 * 16:10 desktop frame, as .webp) over the file at the same path. To add or remove a screen, edit
 * `webScreens`; the wall and the viewer pick it up from here.
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
    line: "Incidents, work permits and training for a global uranium producer. NDA."
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

export const webScreens: { src: string; product: WebProductId; title: string }[] = [
  { src: "/work/web/nbu/01.webp", product: "nbu", title: "Client list" },
  { src: "/work/web/nbu/02.webp", product: "nbu", title: "Opening a current account" },
  { src: "/work/web/nbu/03.webp", product: "nbu", title: "Branch overview" },
  { src: "/work/web/petrel/01.webp", product: "petrel", title: "Safety overview" },
  { src: "/work/web/petrel/02.webp", product: "petrel", title: "Incidents" },
  { src: "/work/web/petrel/03.webp", product: "petrel", title: "New work permit" },
  { src: "/work/web/technodom/01.webp", product: "technodom", title: "Inventory" },
  { src: "/work/web/technodom/02.webp", product: "technodom", title: "Shift overview" },
  { src: "/work/web/technodom/03.webp", product: "technodom", title: "Creating a shipment" },
  { src: "/work/web/vlife/01.webp", product: "vlife", title: "Booking calendar" },
  { src: "/work/web/vlife/02.webp", product: "vlife", title: "Clients" },
  { src: "/work/web/vlife/03.webp", product: "vlife", title: "Shop overview" }
]

import * as React from "react"
import { Check, CircleCheck, Copy, Upload } from "lucide-react"

/**
 * The two side-project films. Every card on stage is built here in code, from each app's own
 * components and shadcn tokens (wallet.myrzan.com's PassPreview, izipass's cards and WalletPass),
 * so text stays sharp at any size. Sizes are in design pixels; the stage scales them.
 */

export type Kind = "wallet" | "izipass"

export type Pose = { x: number; y: number; z?: number; rx?: number; ry?: number; rz?: number; s?: number; o: number }

/** One card on stage: `w` is its width on the 16 × 9 stage, `px` the width it is laid out at. */
export type Actor = { node: React.ReactNode; px: number; w: number; pose: (t: number) => Pose; back?: React.ReactNode }

/** Finds an element inside the films' cards (cached by the stage). */
export type Query = (selector: string) => HTMLElement | null

export type Film = {
  length: number
  backdrop: string
  accent: string
  steps: { at: number; text: string }[]
  actors: Actor[]
  /** Small effects inside the cards: taps, the barcode scanner, swapped labels. */
  tick?: (t: number, q: Query) => void
}

export const clamp = (v: number) => Math.min(1, Math.max(0, v))
const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2)
/** 0 → 1 between `a` and `b`, eased. */
const k = (t: number, a: number, b: number) => ease(clamp((t - a) / (b - a)))
const mix = (a: number, b: number, v: number) => a + (b - a) * v
/** Visible from `a` (fading in until `b`) to `d` (fading out from `c`). */
const shown = (t: number, a: number, b: number, c: number, d: number) => k(t, a, b) * (1 - k(t, c, d))
const float = (t: number, phase: number, amount = 0.08) => Math.sin(t * 1.3 + phase) * amount

/** A tap: the ring grows and fades over the element from `at`. */
function tap(el: HTMLElement | null, t: number, at: number) {
  if (!el) return
  const v = clamp((t - at) / 0.9)
  el.style.opacity = t >= at && v < 1 ? String((1 - v) * 0.9) : "0"
  el.style.transform = `scale(${0.4 + v * 1.2})`
}

/** Shows `el` from `at` on (and hides it again from `until`). */
function swap(el: HTMLElement | null, t: number, at: number, until = Infinity) {
  if (el) el.style.opacity = String(k(t, at, at + 0.3) * (until < Infinity ? 1 - k(t, until, until + 0.3) : 1))
}

function Ring({ id, color, size = 64 }: { id: string; color: string; size?: number }) {
  return (
    <span
      data-ring={id}
      className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border-[3px]"
      style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderColor: color, opacity: 0 }}
    />
  )
}

/* ------------------------------------------------------------------------------------------ */
/* Codes                                                                                       */

/** QR codes as module bits in hex, made once with `qrcode` (the library izipass uses). */
const QR = {
  link: [25, "fe83bfc14e506eb28bb75d15dba6baec170507faaafe006900ce2c17a043e695b87d8c09436739777d6b4a48de7f7829a8f6f34dfe0053443f982a105151fbab6fedd24b9ee97e9505eafefead038"],
  wifi: [29, "fec013fc1037906ea6e8bb75aa55dbaf0caec1242107faaaafe00aa600f28054e94e1de24080cb46e83b7221e516a7ea7bb3e55fa99ff49992dcee90e6912561b024de5464409324f6b5c7fe00575c73f8f2eb504c2113ba6bcf85d4dee52ebd79a30525caffe8a6b00"],
  ticket: [29, "fead73fc13e1506eb842bb75d6a5dba9a52ec11aed07faaaafe0053d00f2bc74e9e173fc7dff4a4c29c14c1b26ad96144d4b1c9a56ccf3027242176b85d24e126baec1d308436edf467c66fe0050cc7ff809eb5047c119ba706fadd7aac6aeaac24b051957afed17b90"]
} as const

function Qr({ code, className }: { code: keyof typeof QR; className?: string }) {
  const [size, hex] = QR[code]
  let d = ""
  for (let i = 0; i < size * size; i++) {
    if ((parseInt(hex[i >> 2], 16) >> (3 - (i & 3))) & 1) d += `M${i % size} ${Math.floor(i / size)}h1v1h-1z`
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" aria-hidden className={className}>
      <path d={d} fill="currentColor" />
    </svg>
  )
}

const EAN = "4780000123454"
/** EAN-13 modules for 4780000123454. */
const BARS = "10101110110001001000110100011010100111010011101010110011011011001000010101110010011101011100101"

function Barcode({ className }: { className?: string }) {
  let d = ""
  for (let i = 0; i < BARS.length; i++) if (BARS[i] === "1") d += `M${i} 0h1v1h-1z`
  return (
    <svg viewBox={`0 0 ${BARS.length} 1`} preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden className={className}>
      <path d={d} fill="currentColor" />
    </svg>
  )
}

/* ------------------------------------------------------------------------------------------ */
/* wallet.myrzan.com                                                                           */

function AppleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.73 2.2 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.41 1.2-2.47-.03-.01-2.3-.88-2.32-3.5ZM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21Z"
      />
    </svg>
  )
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M21.6 10.2H12v3.9h5.5c-.5 2.5-2.6 3.9-5.5 3.9a6 6 0 1 1 3.9-10.6l2.9-2.8A10 10 0 1 0 22 12c0-.6-.1-1.2-.4-1.8Z"
      />
    </svg>
  )
}

/** The barcode box of PassPreview. */
function BarcodeBox() {
  return (
    <div className="flex w-full flex-col items-center gap-1.5 rounded-lg bg-white p-3">
      <Barcode className="h-20 w-full text-black" />
      <span className="font-mono text-[13px] text-neutral-700">{EAN}</span>
    </div>
  )
}

function QrBox({ code }: { code: keyof typeof QR }) {
  return (
    <div className="mx-auto w-40 rounded-lg bg-white p-3 text-black">
      <Qr code={code} className="block w-full" />
    </div>
  )
}

/** PassPreview, Apple Wallet layout. */
function ApplePass({ color, title, fields, children }: { color: string; title: string; fields: [string, string][]; children: React.ReactNode }) {
  const [first, ...rest] = fields
  return (
    <div className="overflow-hidden rounded-2xl p-5 text-white shadow-2xl ring-1 ring-black/5" style={{ backgroundColor: color }}>
      <div className="flex h-10 items-center justify-between gap-2">
        <span className="truncate text-[19px] font-medium">{title}</span>
        <span className="flex items-center gap-1 text-[12px] font-medium opacity-75">
          <AppleMark className="size-3.5" /> Wallet
        </span>
      </div>
      <div className={rest.length ? "mb-5 mt-5 flex flex-col gap-3" : "mb-6 mt-8 flex flex-col"}>
        <div className="flex flex-col">
          <span className="text-[12px] font-semibold uppercase opacity-70">{first[0]}</span>
          <span className="truncate text-[28px] leading-tight">{first[1]}</span>
        </div>
        {rest.map(([label, value]) => (
          <div key={label} className="flex flex-col">
            <span className="text-[12px] font-semibold uppercase opacity-70">{label}</span>
            <span className="truncate text-[19px]">{value}</span>
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}

/** PassPreview, Google Wallet layout. */
function GooglePass() {
  return (
    <div className="overflow-hidden rounded-3xl p-6 text-white shadow-2xl ring-1 ring-black/5" style={{ backgroundColor: "#ea580c" }}>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-white/25 text-[17px] font-semibold">B</div>
        <span className="flex-1 truncate text-[19px] font-medium">Bonus Club</span>
        <span className="flex items-center gap-1 text-[12px] font-medium opacity-75">
          <GoogleMark className="size-3.5" /> Wallet
        </span>
      </div>
      <div className="my-6 flex flex-col gap-0.5">
        <span className="text-[14px] opacity-75">Member</span>
        <span className="truncate text-[30px] leading-tight">Myrzan I.</span>
      </div>
      <BarcodeBox />
    </div>
  )
}

/** The plastic loyalty card being scanned, inside the camera's viewfinder. */
function PlasticCard() {
  return (
    <div className="relative p-5">
      <div data-viewfinder className="absolute inset-0" style={{ opacity: 0 }}>
        {["left-0 top-0 border-l-4 border-t-4 rounded-tl-2xl", "right-0 top-0 border-r-4 border-t-4 rounded-tr-2xl", "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl", "bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl"].map((c) => (
          <span key={c} className={`absolute size-12 border-neutral-900 ${c}`} />
        ))}
      </div>
      <div
        className="relative overflow-hidden rounded-[22px] p-6 text-white shadow-2xl"
        style={{ aspectRatio: "1.586", background: "linear-gradient(135deg, #fb923c 0%, #ea580c 48%, #c2410c 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(80% 60% at 20% 0%, rgba(255,255,255,.28), transparent 60%)" }} />
        <div className="relative text-[26px] font-bold leading-none">Bonus Club</div>
        <div className="relative mt-1.5 text-[15px] opacity-85">Grocery card</div>
        <div className="relative mt-4 h-10 w-14 rounded-md" style={{ background: "linear-gradient(135deg, #fde68a, #d4a72c)" }} />
        <div className="absolute inset-x-5 bottom-5 overflow-hidden rounded-lg bg-white px-4 pb-1.5 pt-3">
          <Barcode className="h-14 w-full text-neutral-900" />
          <div className="text-center font-mono text-[12px] tracking-[0.25em] text-neutral-700">{EAN}</div>
          <span
            data-scan
            className="absolute inset-x-0 top-0 h-[3px] bg-red-500"
            style={{ boxShadow: "0 0 14px 5px rgba(239,68,68,.45)", opacity: 0 }}
          />
        </div>
      </div>
      <div data-scanned className="absolute inset-x-0 -bottom-4 flex justify-center" style={{ opacity: 0 }}>
        <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[14px] font-medium text-neutral-900 shadow-lg">
          <CircleCheck className="size-4 text-green-600" /> EAN-13 · {EAN}
        </span>
      </div>
    </div>
  )
}

const WALLET: Film = {
  length: 12,
  backdrop:
    "radial-gradient(60% 90% at 78% 35%, rgba(37,99,235,0.16), transparent 70%), radial-gradient(50% 70% at 15% 90%, rgba(234,88,12,0.12), transparent 70%), oklch(0.985 0 0)",
  accent: "#2563eb",
  steps: [
    { at: 0, text: "Scan any card in the browser" },
    { at: 3.4, text: "It becomes an Apple or Google Wallet pass" },
    { at: 7.8, text: "Wi‑Fi and links work too" }
  ],
  actors: [
    // 0 · the plastic loyalty card being scanned
    {
      node: <PlasticCard />,
      px: 440,
      w: 9.6,
      pose: (t) => ({
        x: 0,
        y: mix(-8, 0.1, k(t, 0, 0.8)) + float(t, 1, 0.05),
        rx: -0.1,
        ry: mix(0.5, 0, k(t, 0, 0.8)) + (Math.PI / 2) * k(t, 3.0, 3.6),
        rz: -0.04,
        o: shown(t, 0, 0.4, 3.5, 3.6)
      })
    },
    // 1 · link pass, fans out on the right
    {
      node: (
        <ApplePass color="#111111" title="myrzan.com" fields={[["Link", "myrzan.com"]]}>
          <QrBox code="link" />
        </ApplePass>
      ),
      px: 320,
      w: 5.6,
      pose: (t) => ({ x: mix(10, 5.1, k(t, 8.1, 8.9)), y: 0.2 + float(t, 4), z: -0.6, ry: -0.25, rz: -0.06, s: 0.9, o: shown(t, 8.1, 8.4, 11.2, 12) })
    },
    // 2 · the pass: turns out of the plastic card, flips to its Google side and back, then sits in front of the fan
    {
      node: (
        <ApplePass color="#ea580c" title="Bonus Club" fields={[["Member", "Myrzan I."]]}>
          <BarcodeBox />
        </ApplePass>
      ),
      back: <GooglePass />,
      px: 360,
      w: 7.4,
      pose: (t) => ({
        x: 0,
        y: float(t, 2),
        z: 0.3,
        ry: mix(-Math.PI / 2, 0, k(t, 3.6, 4.2)) + Math.PI * (k(t, 5.4, 6.1) - k(t, 7.0, 7.7)),
        s: mix(1, 0.9, k(t, 7.8, 8.6)),
        o: shown(t, 3.6, 3.7, 11.2, 12)
      })
    },
    // 3 · Wi‑Fi pass, fans out on the left
    {
      node: (
        <ApplePass color="#2563eb" title="Home Wi‑Fi" fields={[["Network", "Home Wi‑Fi"], ["Password", "sunflower-42"]]}>
          <QrBox code="wifi" />
        </ApplePass>
      ),
      px: 320,
      w: 5.6,
      pose: (t) => ({ x: mix(-10, -5.1, k(t, 7.9, 8.7)), y: 0.2 + float(t, 5), z: -0.6, ry: 0.25, rz: 0.06, s: 0.9, o: shown(t, 7.9, 8.2, 11.2, 12) })
    }
  ],
  tick: (t, q) => {
    const scan = q("[data-scan]")
    if (scan) {
      const v = clamp((t - 1.0) / 1.7)
      scan.style.opacity = t >= 1.0 && t <= 2.7 ? "1" : "0"
      // Down over the barcode and back up, like a scanner.
      scan.style.top = `${Math.sin(v * Math.PI) * 92}%`
    }
    swap(q("[data-viewfinder]"), t, 0.6, 2.8)
    swap(q("[data-scanned]"), t, 2.6)
  }
}

/* ------------------------------------------------------------------------------------------ */
/* izipass (shadcn new-york, neutral; chart-1 for the passes)                                   */

const UI = {
  fg: "oklch(0.145 0 0)",
  muted: "oklch(0.556 0 0)",
  border: "oklch(0.922 0 0)",
  primary: "oklch(0.205 0 0)",
  primaryFg: "oklch(0.985 0 0)",
  secondary: "oklch(0.97 0 0)",
  chart1: "oklch(0.646 0.222 41.116)"
}

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl border bg-white shadow-2xl ${className}`} style={{ borderColor: UI.border, color: UI.fg }}>
      {children}
    </div>
  )
}

function Muted({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={className} style={{ color: UI.muted }}>
      {children}
    </div>
  )
}

function Register() {
  return (
    <Card className="p-6">
      <div className="text-[13px] font-medium uppercase tracking-wider" style={{ color: UI.muted }}>
        izipass Test Club
      </div>
      <div className="mt-1 text-[26px] font-semibold leading-tight">Thursday speaking club</div>
      <Muted className="mt-1 text-[15px]">Thu 22 October · 19:00 – 21:00 · Bon! cafe</Muted>
      <div className="mt-5 flex items-center justify-between rounded-lg border p-4" style={{ borderColor: UI.border }}>
        <div>
          <div className="text-[20px] font-semibold">50,000 so&apos;m</div>
          <Muted className="text-[14px]">17 of 20 spots left</Muted>
        </div>
        <span className="rounded-md px-2 py-1 text-[12px] font-medium" style={{ background: UI.secondary }}>
          Closes Thu 19:00
        </span>
      </div>
      <div className="relative mt-5 flex h-12 items-center justify-center rounded-md text-[17px] font-medium" style={{ background: UI.primary, color: UI.primaryFg }}>
        Register
        <Ring id="register" color={UI.primary} size={72} />
      </div>
    </Card>
  )
}

function Pay() {
  const rows: [string, string, boolean?][] = [
    ["Amount", "50,000 so'm"],
    ["Where to pay", "8600 1234 5678 9012", true],
    ["Reference", "TES-1853", true]
  ]
  return (
    <Card className="p-6">
      <div className="text-[22px] font-semibold">Pay the organizer</div>
      <Muted className="mt-0.5 text-[14px]">Transfer by Click, Payme or any bank app.</Muted>
      <div className="mt-3 divide-y" style={{ borderColor: UI.border }}>
        {rows.map(([label, value, mono]) => (
          <div key={label} className="flex items-center justify-between gap-3 py-3" style={{ borderColor: UI.border }}>
            <div>
              <Muted className="text-[13px]">{label}</Muted>
              <div className={`text-[18px] font-medium ${mono ? "font-mono tracking-tight" : ""}`}>{value}</div>
            </div>
            <span className="flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[13px] font-medium shadow-sm" style={{ borderColor: UI.border }}>
              <Copy className="size-3.5" /> Copy
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2 h-14">
        <div data-upload className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg border-2 border-dashed text-[15px] font-medium" style={{ borderColor: UI.border, color: UI.muted }}>
          <Upload className="size-4" /> Upload receipt
        </div>
        <div data-uploaded className="absolute inset-0 flex items-center gap-3 rounded-lg border px-3" style={{ borderColor: UI.border, opacity: 0 }}>
          <span className="flex size-8 items-center justify-center rounded-full bg-green-600 text-white">
            <Check className="size-4" strokeWidth={3} />
          </span>
          <div className="leading-tight">
            <div className="text-[15px] font-medium">Receipt sent</div>
            <Muted className="text-[13px]">The organizer will check it</Muted>
          </div>
        </div>
      </div>
    </Card>
  )
}

/** A bank app's receipt screen, the screenshot guests upload. */
function Receipt() {
  const rows = [
    ["Date", "today, 18:42"],
    ["To card", "8600 •••• 9012"],
    ["Recipient", "Sardor T."],
    ["Comment", "TES-1853"]
  ]
  return (
    <div className="rounded-2xl bg-white p-5 text-neutral-900 shadow-2xl ring-1 ring-black/5">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-green-500 text-white">
          <Check className="size-7" strokeWidth={3} />
        </span>
        <div className="mt-2 text-[14px] font-medium">Payment successful</div>
        <div className="text-[26px] font-bold">50 000 so&apos;m</div>
        <div className="text-[12px] text-neutral-500">Payme · receipt</div>
      </div>
      <div className="mt-4 space-y-2 border-t border-neutral-200 pt-3 text-[13px]">
        {rows.map(([a, b]) => (
          <div key={a} className="flex justify-between gap-2">
            <span className="text-neutral-500">{a}</span>
            <span className="font-semibold">{b}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** The izipass bot's message in the organizer's Telegram. */
function Telegram() {
  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
      <div className="flex items-center gap-3 bg-white px-4 py-3">
        <span className="flex size-10 items-center justify-center rounded-full text-[15px] font-semibold text-white" style={{ background: "linear-gradient(135deg, #fb923c, #ea580c)" }}>
          iz
        </span>
        <div className="leading-tight">
          <div className="text-[16px] font-semibold text-neutral-900">izipass</div>
          <div className="text-[13px] text-neutral-500">bot</div>
        </div>
      </div>
      <div className="px-4 pb-4 pt-3" style={{ background: "linear-gradient(160deg, #cfe3bd, #a7cdb2 55%, #8dbcc6)" }}>
        <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[16px] leading-snug text-neutral-900 shadow-sm">
          <div className="font-semibold text-[#3390ec]">izipass</div>
          <div>🧾 New receipt · Thursday speaking club</div>
          <div>Dilnoza Yusupova · TES-1853</div>
          <div>50,000 so&apos;m · to 8600 •••• 9012</div>
          <div className="text-green-600">Auto-check: amount and code match</div>
          <div className="mt-0.5 text-right text-[12px] text-neutral-400">19:24</div>
        </div>
        <div className="relative mt-1.5 h-11">
          <div data-buttons className="absolute inset-0 grid grid-cols-2 gap-1.5">
            <span className="relative flex items-center justify-center rounded-xl text-[16px] font-medium text-white" style={{ background: "rgba(40,80,70,.35)" }}>
              ✅ Approve
              <Ring id="approve" color="#ffffff" size={64} />
            </span>
            <span className="flex items-center justify-center rounded-xl text-[16px] font-medium text-white" style={{ background: "rgba(40,80,70,.35)" }}>
              ❌ Reject
            </span>
          </div>
          <div data-approved className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0 }}>
            <span className="rounded-full px-3.5 py-1.5 text-[14px] font-medium text-white" style={{ background: "rgba(40,80,70,.45)" }}>
              Approved · ticket sent to Dilnoza
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function WalletButton({ dark, children }: { dark?: boolean; children: React.ReactNode }) {
  return (
    <span
      className="relative flex h-11 items-center justify-center gap-2 rounded-md border text-[15px] font-medium"
      style={dark ? { background: "#000", color: "#fff", borderColor: "#000" } : { borderColor: UI.border }}
    >
      {children}
    </span>
  )
}

function Ticket() {
  return (
    <Card className="flex flex-col items-center p-6 text-center">
      <span className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[13px] font-medium" style={{ background: UI.primary, color: UI.primaryFg }}>
        <Check className="size-3.5" strokeWidth={3} /> Approved
      </span>
      <div className="mt-2 text-[22px] font-semibold leading-tight">Thursday speaking club</div>
      <Muted className="text-[14px]">Thu 22 October · 19:00 · Bon! cafe</Muted>
      <div className="mt-4 rounded-xl border p-3" style={{ borderColor: UI.border }}>
        <Qr code="ticket" className="block size-36" />
      </div>
      <div className="mt-2 font-mono text-[16px] font-medium">TES-1853</div>
      <Muted className="text-[13px]">Dilnoza Yusupova · show this at the door</Muted>
      <div className="mt-4 grid w-full gap-2">
        <WalletButton dark>
          <AppleMark className="size-4" /> Add to Apple Wallet
          <Ring id="apple" color="#ffffff" size={60} />
        </WalletButton>
        <WalletButton>
          <GoogleMark className="size-4" /> Add to Google Wallet
        </WalletButton>
      </div>
    </Card>
  )
}

/** izipass's WalletPass in chart-1. */
function EventPass() {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl p-5 text-white shadow-2xl" style={{ background: UI.chart1 }}>
      <span className="text-[12px] font-semibold uppercase tracking-wider opacity-85">English Speaking Club</span>
      <span className="text-[24px] font-semibold leading-tight">Thursday speaking club</span>
      <span className="text-[15px] opacity-85">Thu 19:00 · Dilnoza Y.</span>
      <span className="relative mt-2 self-start rounded-lg bg-white p-2 text-neutral-900">
        <Qr code="ticket" className="block size-24" />
        <Ring id="door" color="#16a34a" size={80} />
      </span>
    </div>
  )
}

function CheckedIn() {
  return (
    <Card className="flex items-center gap-3 px-5 py-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
        <Check className="size-5" strokeWidth={3} />
      </span>
      <div className="leading-tight">
        <div className="text-[18px] font-semibold">Checked in</div>
        <Muted className="text-[14px]">Dilnoza Yusupova · TES-1853</Muted>
      </div>
    </Card>
  )
}

const IZIPASS: Film = {
  length: 14,
  backdrop:
    "radial-gradient(60% 90% at 20% 30%, color-mix(in oklab, oklch(0.646 0.222 41.116) 16%, transparent), transparent 70%), radial-gradient(55% 80% at 85% 85%, color-mix(in oklab, oklch(0.828 0.189 84.429) 20%, transparent), transparent 70%), oklch(0.985 0 0)",
  accent: UI.chart1,
  steps: [
    { at: 0, text: "Guests register on the event page" },
    { at: 2.7, text: "Pay the organizer, upload the receipt" },
    { at: 5.8, text: "The organizer approves in Telegram" },
    { at: 8.7, text: "Ticket lands in Apple or Google Wallet" },
    { at: 11.0, text: "Check-in at the door with one scan" }
  ],
  actors: [
    // 0 · the event's registration card
    {
      node: <Register />,
      px: 420,
      w: 8.8,
      pose: (t) => ({ x: mix(0, -9, k(t, 2.4, 3.0)), y: float(t, 0, 0.05), s: mix(0.92, 1, k(t, 0, 0.6)), o: shown(t, 0, 0.5, 2.5, 3.0) })
    },
    // 1 · pay the organizer
    {
      node: <Pay />,
      px: 400,
      w: 7.4,
      pose: (t) => ({ x: mix(9, -2.4, k(t, 2.6, 3.3)), y: float(t, 1, 0.05), ry: 0.1, o: shown(t, 2.6, 3.0, 5.6, 6.0) })
    },
    // 2 · the receipt from the bank app slides in next to it, then drops into the upload box
    {
      node: <Receipt />,
      px: 260,
      w: 4.6,
      pose: (t) => ({
        x: mix(mix(9, 4.4, k(t, 3.4, 4.2)), -2.4, k(t, 4.6, 5.3)),
        y: mix(0, -3.4, k(t, 4.6, 5.3)),
        z: 1,
        rz: mix(0.2, 0.05, k(t, 3.4, 4.2)),
        s: mix(1, 0.3, k(t, 4.6, 5.3)),
        o: shown(t, 3.4, 3.7, 5.0, 5.3)
      })
    },
    // 3 · izipass bot message in Telegram
    {
      node: <Telegram />,
      px: 420,
      w: 8.6,
      pose: (t) => ({ x: 0, y: float(t, 3, 0.05), z: 0.5, s: mix(0.85, 1, k(t, 5.8, 6.4)), o: shown(t, 5.8, 6.2, 8.5, 8.8) })
    },
    // 4 · the approved ticket
    {
      node: <Ticket />,
      px: 340,
      w: 5.6,
      pose: (t) => ({ x: -2.8, y: float(t, 4, 0.05), ry: mix(-Math.PI / 2, 0.1, k(t, 8.7, 9.4)), o: shown(t, 8.7, 9.0, 13.2, 14) })
    },
    // 5 · its Wallet pass flies out to the right
    {
      node: <EventPass />,
      px: 280,
      w: 5,
      pose: (t) => {
        const out = k(t, 9.9, 10.8)
        return {
          x: mix(-2.8, 3.4, out),
          y: mix(-1, mix(0.4, 0.9, k(t, 10.8, 11.4)), out) + float(t, 5),
          z: mix(-0.5, 1, out),
          ry: mix(0, Math.PI * 2, out) + Math.sin(t * 0.9) * 0.12 * out,
          rz: -0.05 * out,
          s: mix(0.6, mix(1, 0.92, k(t, 10.8, 11.4)), out),
          o: shown(t, 9.9, 10.2, 13.2, 14)
        }
      }
    },
    // 6 · checked in at the door
    {
      node: <CheckedIn />,
      px: 340,
      w: 5.6,
      pose: (t) => ({ x: 3.4, y: mix(-6, -2.8, k(t, 11.6, 12.2)), z: 1.6, o: shown(t, 11.6, 12.0, 13.2, 14) })
    }
  ],
  tick: (t, q) => {
    tap(q('[data-ring="register"]'), t, 1.6)
    swap(q("[data-upload]"), t, -1, 5.1)
    swap(q("[data-uploaded]"), t, 5.2)
    tap(q('[data-ring="approve"]'), t, 7.2)
    swap(q("[data-buttons]"), t, -1, 7.6)
    swap(q("[data-approved]"), t, 7.8)
    tap(q('[data-ring="apple"]'), t, 9.5)
    tap(q('[data-ring="door"]'), t, 11.4)
  }
}

export const FILMS: Record<Kind, Film> = { wallet: WALLET, izipass: IZIPASS }

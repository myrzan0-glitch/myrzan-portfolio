/** About and pet projects content, shared by the home, about and projects pages. */

export const photos = [
  { src: "/personal/me-london.webp", alt: "Myrzan in London at Christmas", r: "-8deg", y: "14px", z: 1 },
  { src: "/personal/medina-park.webp", alt: "Medina in sunglasses in a London park", r: "4deg", y: "-8px", z: 2 },
  { src: "/personal/wife-medina.webp", alt: "Myrzan's wife holding Medina in a café", r: "-2deg", y: "10px", z: 4 },
  { src: "/personal/me-medina.webp", alt: "Myrzan holding Medina", r: "6deg", y: "-6px", z: 3 },
  { src: "/personal/family-walk.webp", alt: "Family on a city walk, black and white", r: "-5deg", y: "12px", z: 2 }
]

export const rules = [
  { n: "01", t: "Context before pixels", b: "I open every project with one-to-ones across product, engineering and business, so each design decision traces back to a goal." },
  { n: "02", t: "Jobs to be done", b: "I design for the job the customer hires the product to do, and I measure success by whether that job gets done." },
  { n: "03", t: "Clear design ownership", b: "I gather input widely and align with users and partners, then I make the call and own the outcome." },
  { n: "04", t: "Fluent in code", b: "Former front-end engineer. I prototype on our production Storybook through AI, so engineering builds from real components, not specs." }
]

export const jobs = [
  {
    years: "2026 – now",
    role: "Senior Product Designer",
    company: "National Bank of Uzbekistan",
    url: "https://nbu.uz",
    via: "via Expera",
    about: "Uzbekistan’s national bank, serving 3.3M individual clients.",
    line: "Designing the bank’s unified front-office system for opening accounts, deposits and loans. I own the legal-entity branch, and help the design system team with AI-assisted prototyping through a Storybook MCP I built."
  },
  {
    years: "2023 – 2026",
    role: "Product Designer",
    company: "BI Group",
    url: "https://bi.group",
    about: "Property-tech developer ranked #1 by sales volume across the Middle East and CIS.",
    line: "Owned search, the design system and AI prototyping for a platform with 2M+ monthly users."
  },
  {
    years: "2022 – 2023",
    role: "Product Designer",
    company: "Beeline",
    url: "https://beeline.kz",
    about: "Kazakhstan’s telecom operator, with an online shop for phones bundled with plans.",
    line: "Lifted mobile checkout conversion 17.5% for a telecom with 11M+ subscribers."
  },
  {
    years: "2022",
    role: "Product Designer",
    company: "Petrel AI",
    about: "Enterprise software for a global uranium production company.",
    line: "Cut manual work 40% in enterprise HSE and HR workflows. NDA."
  },
  {
    years: "2020 – 2022",
    role: "Product Designer",
    company: "Technodom",
    url: "https://technodom.kz",
    about: "Kazakhstan’s largest electronics retailer, with 70+ stores and a major e-commerce platform.",
    line: "Designed the credit brokerage that made $4M in one month and became the #1 revenue stream."
  },
  {
    years: "2020",
    role: "UI/UX Designer",
    company: "Vlife",
    about: "A startup building a service-booking platform.",
    line: "Designed a booking CMS end to end, plus app motion."
  }
]

export const petProjects = [
  {
    name: "wallet.myrzan.com",
    href: "https://wallet.myrzan.com",
    title: "Any card, code or link in your phone’s wallet",
    line: "A free tool that turns a loyalty card, Wi-Fi network or link into an Apple Wallet or Google Wallet pass. Barcodes are read in the browser, card data is never stored, and it speaks Uzbek, Russian, Kazakh and English.",
    tags: ["Next.js", "Apple PassKit", "Google Wallet API"],
    img: "/side/wallet-app.webp",
    scene: "wallet" as const,
    alt: "wallet.myrzan.com: a plastic loyalty card flying into a phone’s Wallet, next to Wi-Fi and link passes"
  },
  {
    name: "izipass.myrzan.com",
    href: "https://izipass.myrzan.com",
    title: "Paid events with real tickets, without the paperwork",
    line: "Organisers set up an event in minutes. Guests pay them directly, receipts arrive in Telegram for one-tap approval, tickets go to Apple or Google Wallet, and check-in at the door works offline by scanning QR codes.",
    tags: ["Next.js", "Postgres", "Telegram bot"],
    img: "/side/izipass-app.webp",
    scene: "izipass" as const,
    alt: "izipass.myrzan.com: an approved event ticket on a phone, a Telegram receipt to approve and Wallet passes around it"
  }
]

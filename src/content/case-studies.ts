import type { LayerPart, RowPhone } from "@/components/story/phone-scenes"

export type CaseImage = { src: string; alt: string; w: number; h: number; caption?: string; video?: string }

export type CaseSection = {
  label: string
  title: string
  body: string[]
  points?: string[]
  image?: CaseImage
}

type CaseBase = {
  slug: string
  company: string
  year: string
  title: string
  summary: string
  /** Shown on the home page and as the share image. */
  hero: CaseImage
}

/** Label, problem, decision, outcome: one section after another. */
export type ClassicCase = CaseBase & {
  kind?: "classic"
  meta: { label: string; value: string }[]
  outcomes: { value: string; label: string }[]
  sections: CaseSection[]
  takeaway: string
}

/**
 * One claim per chapter: the text argues a design decision and one visual proves it. Screens are
 * 390 × 844 PNG/WebP exports; every y and tap position is in those screen pixels.
 */
export type StoryCase = CaseBase & {
  kind: "story"
  story: Story
}

export type CaseStudy = ClassicCase | StoryCase

export type Story = {
  /** Sets the page's accent colour (`--story-mark`) from globals.css; the default is `--story-accent`. */
  palette?: "bi"
  subtitle: string
  /** Three screens for the hero, left to right. */
  heroScreens: { screen: string; label: string }[]
  heroLabel: string
  role: { label: string; value: string }[]
  chapters: Chapter[]
}

/** Body paragraphs may wrap a phrase in **double asterisks** to set it in the text colour. */
export type Chapter = {
  title: string
  body: string[]
  visual?: Visual
  /** Full width: the text sits above the visual instead of beside it. */
  wide?: boolean
  /** Result tiles. A meter shows a share; with `was`, the old value against the new one. */
  metrics?: { value: string; label: string; note: string; meter?: { was?: number; now: number } }[]
  /** Numbered cards, for next steps. */
  cards?: { title: string; body: string }[]
}

export type Tone = "accent" | "coin" | "farm" | "spend"

export type Visual =
  | {
      kind: "economy"
      label: string
      /** Read aloud in place of the diagram. */
      description: string
      rows: { items: ({ node: string; tone: Tone } | { arrow: string })[]; divider?: boolean }[]
    }
  | {
      kind: "layers"
      label: string
      screen: string
      /** Horizontal bands of the screen; `mark` sets a part apart as new or as a problem. */
      parts: LayerPart[]
      note: string
      /** Caption for the full-size view. */
      zoom?: string
    }
  | {
      kind: "loop"
      label: string
      /** Screens shown in place, one after another, with a tap ring where the user taps. */
      steps: { screen: string; name: string; tap?: [number, number] }[]
    }
  | {
      kind: "row"
      label: string
      /** Names the switch that shows the highlights, after what they show. */
      toggle: string
      note: string
      /** Phones side by side; bands mark areas in screen pixels, red where `problem` is set. */
      phones: RowPhone[]
    }
  | {
      kind: "share"
      label: string
      description: string
      /** One bar: the main share in the accent colour, the rest after it. */
      main: { label: string; value: number }
      chips: { name: string; top?: boolean }[]
      facts: string[]
    }
  | {
      kind: "dots"
      label: string
      description: string
      /** One row of dots per group, filled for each person who succeeded. */
      rows: { name: string; done: number; total: number; muted?: boolean }[]
      facts: string[]
    }
  | {
      kind: "attempts"
      /** Read aloud in place of the diagram. */
      description: string
      /** Labelled groups of rows; each row is a chain of steps, `no` in red and `yes` in the accent. */
      groups: { label: string; rows: { lead: string; steps: { text: string; tone?: "no" | "yes" }[] }[] }[]
    }
  | {
      kind: "fan"
      label: string
      description: string
      /** One request on the left, every answer on the right. */
      source: string
      sourceNote: string
      answers: { name: string; status: string; tone: "ok" | "calc" | "no" }[]
      facts: string[]
    }
  | ({ kind: "image" } & CaseImage)

const ozen = (name: string) => `/work/ozen-telegram-music/screens/${name}.webp`
const bi = (name: string) => `/work/bi-mobile-search/screens/${name}.webp`
const td = (name: string) => `/work/technodom-credit/screens/${name}.webp`

export const caseStudies: CaseStudy[] = [
  {
    kind: "story",
    slug: "bi-mobile-search",
    company: "BI Group · Mobile web",
    year: "2025",
    title: "BI Group: mobile search built around three questions",
    summary:
      "75% of BI Group’s traffic is mobile, yet buyers were leaving search before they saw a single apartment. In six weeks I took the filter panel from field research to production, and bounce rate fell by a third.",
    hero: {
      src: "/work/bi-final.webp",
      alt: "Final BI Group mobile search with quick-filter chips for city, price and rooms",
      w: 1600,
      h: 773
    },
    story: {
      palette: "bi",
      subtitle:
        "Three quarters of buyers searched on a phone, and they were leaving before they saw a single apartment. Six weeks of research, cutting and testing took bounce rate from 25% to 16.8%.",
      heroScreens: [
        { screen: bi("a-map"), label: "Map" },
        { screen: bi("a-home"), label: "Home" },
        { screen: bi("a-listing"), label: "Listing" }
      ],
      heroLabel: "Three redesigned BI Group screens: home with quick filters, the map with price pins, and the apartment listing",
      role: [
        { label: "Role", value: "Product designer · 2025" },
        {
          label: "Contribution",
          value:
            "Owned the design end to end: UX audit, field research, interaction design, split test and handoff. Worked with a PM on the goal and with engineers and QA through release."
        },
        { label: "Platform", value: "Mobile web, 2M+ monthly users" }
      ],
      chapters: [
        {
          title: "The first screen sold everything except homes",
          body: [
            "BI Group is one of the region’s largest developers, and three quarters of its traffic is mobile. On a phone, the first screen opened with a promo banner and a row of five shortcuts. Search, Map and Filters shared one row halfway down, easy to miss and all with the same weight, and sticky bars took another quarter of the screen.",
            "Buyers arrived wanting an apartment and found a brochure. Many left before they saw a single listing."
          ],
          visual: {
            kind: "layers",
            label:
              "The old home screen pulled apart into layers, with problems marked: shortcuts before search, filters and map that are easy to miss, and sticky bars",
            screen: bi("b-home"),
            parts: [
              { y: [0, 112], name: "Header" },
              { y: [112, 304], name: "Promo banner" },
              { y: [304, 416], name: "Five shortcuts before search", mark: "problem" },
              { y: [416, 556], name: "Filters and Map, easy to miss", mark: "problem" },
              { y: [556, 644], name: "Category tabs" },
              { y: [644, 844], name: "Sticky bars: 24% of the screen", mark: "problem" }
            ],
            note: "The old home screen. Red: what stood between a buyer and a listing.",
            zoom: "Before · home"
          }
        },
        {
          title: "Shop like a marketplace",
          wide: true,
          body: [
            "BI Group wants to sell homes the way marketplaces sell everything else. So next to the property portals, Krisha and Yandex Real Estate, I benchmarked the marketplaces buyers already shop on, Kaspi and Ozon.",
            "Three of the four put **a row of filter chips right above the results**, and both property portals give the map **its own labelled button**. Buyers had learned the chips elsewhere. BI Group’s search hid every filter behind one button."
          ],
          visual: {
            kind: "row",
            label: "Search screens from Kaspi, Krisha, Yandex Real Estate and Ozon, with their filter chips and map buttons highlighted",
            toggle: "Show pattern",
            note: "Show pattern marks the filter chips and labelled map buttons.",
            phones: [
              { screen: bi("bench-kaspi"), label: "Kaspi", bands: [{ y: [109, 157] }] },
              { screen: bi("bench-krisha"), label: "Krisha", bands: [{ y: [49, 97] }] },
              {
                screen: bi("bench-yandex"),
                label: "Yandex Real Estate",
                short: "Yandex",
                bands: [{ y: [224, 269] }, { y: [785, 825], x: [12, 124] }]
              },
              { screen: bi("bench-ozon"), label: "Ozon", bands: [{ y: [220, 266] }] }
            ]
          }
        },
        {
          title: "Eight buyers, one card sort",
          body: [
            "Chips only work if they’re the right chips. I went to a sales office and ran card sorts with buyers on their own phones, in the middle of real decisions.",
            "The answer was lopsided: **city, price and number of rooms covered 87% of all filter use.** Everything else was occasional."
          ],
          visual: {
            kind: "share",
            label: "Card sort · 8 buyers · sales office",
            description: "Card sort result: city, price and rooms cover 87% of filter use; every other filter shares the remaining 13%",
            main: { label: "City · Price · Rooms", value: 87 },
            chips: [
              { name: "City", top: true },
              { name: "Price", top: true },
              { name: "Rooms", top: true },
              { name: "Property type" },
              { name: "Project" },
              { name: "Area, m²" }
            ],
            facts: ["Moderated, on buyers’ own phones", "Thanked with a $20 bookstore voucher"]
          }
        },
        {
          title: "Fewer options, faster decisions",
          body: [
            "Every extra choice slows a decision down, so I cut the first screen to the three questions that matter. The shortcuts went, and City, Price and Rooms became chips at the top of the project list, with search and a blue, labelled Map button right below. Everything else moved one tap deeper, behind Filters.",
            "The trade-off was deliberate: **power users lose one tap on rare filters, and everyone else reaches a listing faster.**"
          ],
          visual: {
            kind: "row",
            label: "The old home screen next to the new one",
            toggle: "Show changes",
            note: "Shortcuts and a lone Filter button became quick filters and a Map button you can’t miss.",
            phones: [
              { screen: bi("b-home"), label: "Before", bands: [{ y: [313, 406], problem: true }, { y: [502, 544], problem: true }] },
              { screen: bi("a-home"), label: "After", on: true, bands: [{ y: [464, 492] }, { y: [509, 548], x: [259, 369] }] }
            ]
          }
        },
        {
          title: "One question per tap",
          body: [
            "The old filter was a full-screen form: city, property type, project, rooms and area, all at once, before you could see anything. Now each chip opens a small sheet with a single question and an Apply button, and the results stay visible behind it."
          ],
          visual: {
            kind: "row",
            label: "The old full-screen filter form next to the new price sheet",
            toggle: "Show changes",
            note: "Five questions on one screen became one question in a small sheet.",
            phones: [
              { screen: bi("b-filter"), label: "Before", bands: [{ y: [104, 660], problem: true }] },
              { screen: bi("a-price"), label: "After", on: true, bands: [{ y: [470, 700] }] }
            ]
          }
        },
        {
          title: "A map that shows price before you tap",
          wide: true,
          body: [
            "The old map showed photo pins: you had to open each one to learn anything. The new pins carry the starting price, the quick filters stay at the top, and “Back to list” is one tap away.",
            "The project preview changed the same way. The old card had a photo, a name and an address. The new one adds **the starting price, the number of floors and the completion date**, and a Call button next to Details, so a buyer can judge a project without leaving the map."
          ],
          visual: {
            kind: "row",
            label: "The old and new map, then the old and new project preview card",
            toggle: "Show changes",
            note: "Price comes first on the map and on the preview card.",
            phones: [
              { screen: bi("b-map"), label: "Before · map", short: "Before" },
              { screen: bi("a-map"), label: "After · map", short: "After", on: true, bands: [{ y: [170, 295], x: [90, 225] }] },
              { screen: bi("b-mapcard"), label: "Before · preview", short: "Before" },
              { screen: bi("a-mapcard"), label: "After · preview", short: "After", on: true, bands: [{ y: [555, 620] }, { y: [640, 680] }] }
            ]
          }
        },
        {
          title: "A project page that asks for the next step",
          body: [
            "The old project page was a brochure: photos, a description and a floating phone icon. The new one puts the facts buyers ask first right under the name: completion date, address and the walk to the nearest landmark.",
            "Then it gives two ways forward. **Leave a request** sits on the photo, for buyers ready to talk to sales. **Choose a property** opens this project’s listings, for buyers who want to keep looking."
          ],
          visual: {
            kind: "row",
            label: "The old project page next to the new one, with Leave a request and Choose a property highlighted",
            toggle: "Show changes",
            note: "Two calls to action on the first screen of every project.",
            phones: [
              { screen: bi("b-project"), label: "Before", bands: [{ y: [561, 619], x: [312, 369], problem: true }] },
              {
                screen: bi("a-project"),
                label: "After",
                on: true,
                bands: [
                  { y: [351, 385], x: [21, 185] },
                  { y: [584, 626], x: [21, 369] }
                ]
              }
            ]
          }
        },
        {
          title: "A listing that tells you where you are",
          body: [
            "The old listing put every filter behind one button and switched views with unlabelled icons. The new one shows how many layouts match, **32,221**, uses the same chips as the home screen, and names its views: tiles, list, and a floor-by-floor grid.",
            "Price, Project and Rooms come first, the listing filters people used most. The pattern is the same as on the home screen, so buyers learn it once."
          ],
          visual: {
            kind: "row",
            label: "The old listing next to the new one, with the match count, chips and labelled views highlighted",
            toggle: "Show changes",
            note: "Same chips as home, a match count, and views with names.",
            phones: [
              { screen: bi("b-listing"), label: "Before", bands: [{ y: [185, 227], problem: true }] },
              {
                screen: bi("a-listing"),
                label: "After",
                on: true,
                bands: [{ y: [183, 204], x: [239, 369] }, { y: [275, 309] }, { y: [322, 356] }]
              }
            ]
          }
        },
        {
          title: "A next step on every screen",
          wide: true,
          body: [
            "A buyer can arrive on any screen and leave from any screen. So we hunted for the buyer at every step: **whatever screen someone stops on, the next step is one tap away**, and every path leads closer to a conversation with sales."
          ],
          visual: {
            kind: "row",
            label:
              "Four new screens with their next step highlighted: quick filters and Map on home, Call on the map preview, Leave a request and Choose a property on the project page, and the heart on the listing",
            toggle: "Show next steps",
            note: "Home → map preview → project → listing. Show next steps marks the way forward on each.",
            phones: [
              { screen: bi("a-home"), label: "Home", on: true, bands: [{ y: [464, 492] }, { y: [509, 548], x: [259, 369] }] },
              { screen: bi("a-mapcard"), label: "Map preview", on: true, bands: [{ y: [640, 680] }] },
              {
                screen: bi("a-project"),
                label: "Project",
                on: true,
                bands: [
                  { y: [351, 385], x: [21, 185] },
                  { y: [584, 626], x: [21, 369] }
                ]
              },
              { screen: bi("a-listing"), label: "Listing", on: true, bands: [{ y: [415, 450], x: [320, 362] }] }
            ]
          }
        },
        {
          title: "Split-tested before a line of code",
          body: [
            "I ran a split test with 12 people on real phones. The task: **find a two-bedroom apartment in Astana under 30 million tenge.**",
            "The new design more than doubled unaided success, and 10 of 12 preferred it. One finding changed the design before handoff: people found the pin icon unclear, so it became a labelled Map button."
          ],
          visual: {
            kind: "dots",
            label: "Split test · 12 people · real phones",
            description: "Split test: 2 of 6 completed the task on the old design, 5 of 6 on the new one; 10 of 12 preferred the new design",
            rows: [
              { name: "Old", done: 2, total: 6, muted: true },
              { name: "New", done: 5, total: 6 }
            ],
            facts: ["Completed the task unaided", "10 of 12 preferred the new design"]
          }
        },
        {
          title: "Results",
          wide: true,
          body: ["In June 2025 the new search served 261,944 sessions from 118,216 users."],
          metrics: [
            { value: "54%", label: "Conversion via quick filters", note: "5.7 filter interactions per user", meter: { now: 54 } },
            { value: "16.8%", label: "Bounce rate", note: "down from 25%", meter: { was: 100, now: 67.2 } },
            { value: "4.1", label: "Pages per session", note: "up from 1.6, +156%", meter: { was: 39, now: 100 } },
            { value: "679K", label: "Filter interactions", note: "in the first month after launch" }
          ]
        },
        {
          title: "What I’d measure next",
          wide: true,
          body: [
            "The release changed chips, map pins, the Map button and the listing cards at once. The numbers moved together, so we can’t yet say which change did the most."
          ],
          cards: [
            { title: "Ship in stages", body: "Release each change behind its own A/B test, so it earns its place on its own." },
            { title: "Tag every chip and sheet", body: "Track each tap, so we see which filters lead to a listing and which lead nowhere." },
            { title: "Watch advanced filters", body: "Check that the one extra tap isn’t costing the buyers who rely on them." }
          ]
        }
      ]
    }
  },
  {
    kind: "story",
    slug: "ozen-telegram-music",
    company: "Ōzen · Telegram Mini App",
    year: "2025",
    title: "Ōzen: a crypto economy that feels like Telegram",
    summary:
      "Designing a listen-to-earn music Mini App that reached 5,000 active users in its first week, without a single tutorial screen.",
    hero: {
      src: "/work/ozen-telegram-music/hero.webp",
      alt: "Five Ōzen screens: the farming claim, a collection that earns, the full player, tasks and the friends tab",
      w: 1600,
      h: 820
    },
    story: {
      subtitle:
        "Designing a listen-to-earn music Mini App that reached 5,000 active users in its first week, without a single tutorial screen.",
      heroScreens: [
        { screen: ozen("t2"), label: "Friends" },
        { screen: ozen("m3"), label: "Claim" },
        { screen: ozen("p3"), label: "Collection" }
      ],
      heroLabel: "Three Ōzen screens: claiming a farming reward, a collection earning coins, and the referral tab",
      role: [
        { label: "Role", value: "Sole product designer · 2025" },
        {
          label: "Contribution",
          value:
            "Market research, coin economy, product architecture and every screen of the beta, built on Telegram’s Mini Apps kit and handed off to Ōzen’s developers."
        },
        { label: "Platform", value: "Telegram Mini App, iOS and Android" }
      ],
      chapters: [
        {
          title: "Earning had to be as easy as pressing play",
          body: [
            "Ōzen distributes music and video. Its founders watched tap-to-earn games like Hamster Kombat pull millions of people into crypto through Telegram, and wanted that pull for music: you earn coins for listening, then back the tracks you believe in.",
            "Most of the people Ōzen wanted had never held a token. So the real brief wasn’t “build a crypto app”. It was **make a new money habit feel like something they already do every day.**"
          ],
          visual: {
            kind: "economy",
            label: "The economy, before any screen",
            description:
              "Coin economy: farming pays 120 coins per 8 hours, listening 0.01 coin a second, an invested track 0.05 coin a second, all into the wallet; the wallet pays for boost energy",
            rows: [
              { items: [{ node: "Farming", tone: "farm" }, { arrow: "8 h = 120 coins" }, { node: "Wallet", tone: "coin" }] },
              { items: [{ node: "Listening", tone: "accent" }, { arrow: "0.01 coin / sec" }, { node: "Wallet", tone: "coin" }] },
              {
                items: [
                  { node: "Listening", tone: "accent" },
                  { arrow: "invest" },
                  { node: "Invested track", tone: "accent" },
                  { arrow: "0.05 coin / sec" },
                  { node: "Wallet", tone: "coin" }
                ]
              },
              { divider: true, items: [{ node: "Wallet", tone: "coin" }, { arrow: "spend" }, { node: "Boost energy", tone: "spend" }] }
            ]
          }
        },
        {
          title: "Copy habits, not features",
          body: [
            "I went through the Mini Apps that had gone viral and the big music apps, Spotify, Apple Music and Yandex Music. The viral ones had nothing clever in their UI. They looked and behaved exactly like Telegram, so nobody had to learn anything before the fun part.",
            "That became the rule for the beta: **if Telegram has a component for it, use Telegram’s.** Header, search, list cells, buttons and tabs all come straight from the Mini Apps kit. Only three things are new: the coin balance, the farming button and the mini player. That’s everything a first-time user has to learn."
          ],
          visual: {
            kind: "layers",
            label:
              "The main screen pulled apart into layers: Telegram components at the back, Ōzen’s balance, farming button and mini player in front",
            screen: ozen("m1"),
            parts: [
              { y: [0, 122], name: "Header" },
              { y: [122, 180], name: "Search" },
              { y: [180, 246], name: "Coin balance", mark: "new" },
              { y: [246, 620], name: "List cells" },
              { y: [620, 692], name: "Farming button", mark: "new" },
              // The main screen while a track plays, so the mini player isn’t empty.
              { y: [692, 753], name: "Mini player", mark: "new", from: ozen("m2") },
              { y: [753, 844], name: "Tab bar" }
            ],
            note: "Grey: stock Telegram components. Blue: the only parts designed from scratch."
          }
        },
        {
          title: "The button is the status",
          body: [
            "A farming session runs for eight hours, so most visits are a five-second check: is it done yet? Instead of a separate timer, progress bar and claim screen, one Telegram button carries the whole loop.",
            "It starts the session, fills up with a live coin count and the time left, then turns into **Claim 480**. The answer to “is it done yet?” is always in the same place, and the eight-hour cycle gives people a reason to come back up to three times a day."
          ],
          visual: {
            kind: "loop",
            label: "The farming button going from Start farming to a live progress fill to Claim",
            steps: [
              { screen: ozen("m1"), name: "Start", tap: [195, 655] },
              { screen: ozen("m2"), name: "Farming" },
              { screen: ozen("m3"), name: "Claim", tap: [195, 655] }
            ]
          }
        },
        {
          title: "Show the price before the promise",
          body: [
            "Putting coins into a track is the newest idea in Ōzen, and the easiest to mistake for gambling. So the flow explains before it asks.",
            "An empty collection tells you how it earns instead of showing nothing. The add sheet shows the price, **1,000 coins**, before anything is spent. Once a track is in, its row shows what it has paid back, so the promise is checked on every visit."
          ],
          visual: {
            kind: "loop",
            label: "Opening an empty collection, trying it out, seeing the 1,000 coin price and the collection earning coins",
            steps: [
              { screen: ozen("p2"), name: "Empty collection", tap: [96, 447] },
              { screen: ozen("p4"), name: "Price", tap: [195, 732] },
              { screen: ozen("p3"), name: "Earning" }
            ]
          }
        },
        {
          title: "Invite-only, on purpose",
          body: [
            "The beta didn’t open to everyone. Each invite was scarce, which made it worth sending, and every friend you brought in paid you **2.75% of what they earned**, which made it worth sending twice.",
            "The Friends tab keeps that reward visible: who you invited, what each one brought in, and when you can claim next. Sending an invite takes two taps, through Telegram or a copied link."
          ],
          visual: {
            kind: "loop",
            label: "Claiming the referral share, the claim cooldown, and the invite sheet",
            steps: [
              { screen: ozen("t2"), name: "Claim share", tap: [194, 249] },
              { screen: ozen("t3"), name: "Cooldown", tap: [195, 655] },
              { screen: ozen("t4"), name: "Invite" }
            ]
          }
        },
        {
          title: "Results",
          wide: true,
          body: [
            "The invite gate did its job. The beta spread organically through Telegram communities, and Telegram’s CEO, Pavel Durov, tried it himself."
          ],
          metrics: [
            { value: "5,000", label: "Active users", note: "first week of the invite-only beta" },
            { value: "0", label: "Tutorial screens", note: "every control was already familiar from Telegram" }
          ]
        },
        {
          title: "What the beta didn’t prove",
          wide: true,
          body: [
            "Five thousand people in a week proves curiosity, not habit. Tap-to-earn apps tend to fade once the novelty goes, and the beta ended before we could see whether Ōzen would."
          ],
          cards: [
            { title: "Measure return visits", body: "Count how many people come back for a second and third farming claim." },
            { title: "Test investing", body: "See whether backing tracks keeps people longer than farming alone." },
            { title: "Make ownership real", body: "On-chain transfers, an artist dashboard and real ownership of tracks." }
          ]
        }
      ]
    }
  },
  {
    kind: "story",
    slug: "technodom-credit",
    company: "Technodom · Fintech",
    year: "2022",
    title: "Technodom: one ID number, every bank at once",
    summary:
      "Shoppers buying on credit were rejected bank by bank, retyping their details every time. Asking every partner bank at once turned online credit into Technodom’s top revenue stream, at more than $4M a month.",
    hero: {
      src: "/work/technodom-credit/hero.webp",
      alt: "Five Technodom screens: offers from every bank with their status, the credit checkout, a chosen offer, a credit limit with other banks below it, and offers sorted by term",
      w: 1600,
      h: 820
    },
    story: {
      palette: "bi",
      subtitle:
        "Shoppers buying on credit were rejected bank by bank, retyping their details every time. Asking every partner bank at once turned online credit into Technodom’s top revenue stream, at more than $4M a month.",
      heroScreens: [
        { screen: td("checkout"), label: "Checkout" },
        { screen: td("offer-picked"), label: "Offers" },
        { screen: td("limit"), label: "Limit" }
      ],
      heroLabel: "Three Technodom screens: checkout with credit terms, offers from every partner bank, and a refusal that suggests other banks",
      role: [
        { label: "Role", value: "Product designer · 2022" },
        {
          label: "Contribution",
          value:
            "Owned the design end to end: discovery, the new credit flow, verification and every edge case. Worked with engineers, the business and Technodom’s partner banks through release."
        },
        { label: "Platform", value: "Mobile app and web checkout" }
      ],
      chapters: [
        {
          title: "A loop that punished people for applying",
          body: [
            "Technodom is Kazakhstan’s largest electronics retailer, and a big share of what it sells is bought on credit or in instalments, right at checkout. That flow sits directly on the revenue line.",
            "It worked one bank at a time. Pick a bank, type your details, get sent to the bank, wait, get rejected, start again with the next one. **Every attempt cost the shopper their details again, and nobody could tell them which bank would say yes.** Many gave up at the very last step of the purchase."
          ],
          visual: {
            kind: "attempts",
            description:
              "The old flow: three attempts, each with a form, a redirect and a wait; two rejections before the shopper gives up. The new flow: the ID number once, every bank answers, the shopper picks the best offer",
            groups: [
              {
                label: "Before · one bank at a time",
                rows: [
                  { lead: "Try 1", steps: [{ text: "Pick bank A" }, { text: "Type details" }, { text: "Redirect, wait" }, { text: "Rejected", tone: "no" }] },
                  { lead: "Try 2", steps: [{ text: "Pick bank B" }, { text: "Type details again" }, { text: "Redirect, wait" }, { text: "Rejected", tone: "no" }] },
                  { lead: "Try 3", steps: [{ text: "Pick bank C" }, { text: "Type details again" }, { text: "Gives up", tone: "no" }] }
                ]
              },
              {
                label: "After · every bank at once",
                rows: [{ lead: "Once", steps: [{ text: "Type ID number once" }, { text: "All partner banks answer" }, { text: "Pick the best offer", tone: "yes" }] }]
              }
            ]
          }
        },
        {
          title: "The fix was in the system, not the screens",
          body: [
            "Analytics and interviews pointed to three causes: typing the same details again and again, no idea what each bank offered, and no sense of the odds of approval.",
            "Then a conversation with our partner banks gave us the way out. **Most of them already had pre-scoring APIs that return a preliminary decision from an ID number alone.** So the job stopped being “make credit look nicer” and became “ask every bank at once and let the shopper choose”."
          ],
          visual: {
            kind: "fan",
            label: "Pre-scoring · one request, every bank",
            description: "One ID number goes to every partner bank at once; each answers with approved, still calculating or refused",
            source: "ID number (IIN)",
            sourceNote: "typed once, with SMS consent",
            answers: [
              { name: "Halyk Bank", status: "Approved", tone: "ok" },
              { name: "Home Credit Bank", status: "Approved", tone: "ok" },
              { name: "Bank RBK", status: "Calculating", tone: "calc" },
              { name: "Fast Cash", status: "Approved", tone: "ok" },
              { name: "Freedom Finance Credit", status: "Refused", tone: "no" }
            ],
            facts: ["Answers arrive as each bank responds", "Rates, terms and monthly payment side by side"]
          }
        },
        {
          title: "Choose the terms, not the bank",
          body: [
            "The old checkout started with “which bank?”, a question shoppers couldn’t answer. The new one starts with the questions they can: **credit or instalments, and for how long.**",
            "The bank row stops being a choice and becomes a promise: “we’ll show you every bank’s offer, you choose the best”. Below it, a name, a surname and an ID number. That’s all the banks need to pre-score."
          ],
          visual: {
            kind: "layers",
            label: "The checkout pulled apart into layers, with the new parts marked: term, every partner bank, and the ID number",
            screen: td("checkout"),
            parts: [
              { y: [0, 87], name: "Header" },
              { y: [87, 202], name: "Credit or instalments" },
              { y: [202, 310], name: "Term first", mark: "new" },
              { y: [310, 529], name: "Every bank", mark: "new" },
              { y: [529, 739], name: "ID number, once", mark: "new" },
              { y: [739, 844], name: "Continue" }
            ],
            note: "Blue: what changed. The shopper never picks a bank up front."
          }
        },
        {
          title: "Verify once, consent once",
          body: [
            "Banks need two things before they can score anyone: proof that the phone is yours, and your consent to a credit bureau check.",
            "The first SMS confirms the phone. New shoppers set a password, so the application lives in their account. The second SMS is the consent, and **one consent covers every partner bank**: the full text lists each one, already ticked, so nobody signs five times."
          ],
          wide: true,
          visual: {
            kind: "row",
            label: "Four screens: the SMS code, setting a password, the consent code, and the consent text listing every partner bank",
            phones: [
              { screen: td("sms-done"), on: true, label: "Phone", bands: [{ y: [266, 334], x: [61, 329] }] },
              { screen: td("password"), on: true, label: "Password", bands: [{ y: [455, 663] }] },
              { screen: td("consent-code"), on: true, label: "Consent", bands: [{ y: [338, 429] }] },
              { screen: td("consent"), on: true, label: "Every bank", bands: [{ y: [547, 834] }] }
            ],
            toggle: "Show changes",
            note: "Phone → password → consent → every bank on one consent."
          }
        },
        {
          title: "Every bank answers on one screen",
          body: [
            "Offers arrive as each bank responds, and each one wears its status: **Approved**, **Calculating** or **Refused**. Nobody stares at a spinner wondering if anything is happening.",
            "Every card shows the same three facts, the bank, the product and the monthly payment, so offers compare at a glance. Pick one, tap Continue, and the shopper is handed to that bank to finish."
          ],
          wide: true,
          visual: {
            kind: "row",
            label: "Three screens: the offers list with approved, calculating and refused statuses, Halyk Bank chosen, and the hand-off to the bank",
            phones: [
              { screen: td("offers-all"), on: true, label: "Statuses", bands: [{ y: [249, 734], x: [276, 381] }] },
              { screen: td("offer-picked"), on: true, label: "Choice", bands: [{ y: [245, 323] }, { y: [500, 557] }] },
              { screen: td("handoff"), on: true, label: "Hand-off to bank", short: "Hand-off", bands: [{ y: [157, 471], x: [152, 377] }] }
            ],
            toggle: "Show changes",
            note: "Statuses → choice → hand-off to the bank."
          }
        },
        {
          title: "Sort by what you can afford",
          body: [
            "Shoppers think in monthly payments, not in banks. So the two filters above the list are the two questions that change the payment: the form of credit and the term.",
            "The sheet **says how many offers you’ll get before you apply it**: “Show 6 offers” at 3 months becomes “Show 2 offers” at 24. And the payment drops from 15,660 to 5,123 tenge a month, right on the card."
          ],
          wide: true,
          visual: {
            kind: "row",
            label: "Three screens: the term sheet at 3 months showing 6 offers, at 24 months showing 2, and the list with two offers at 5,123 tenge a month",
            phones: [
              { screen: td("term-3"), on: true, label: "3 months", bands: [{ y: [704, 760] }] },
              { screen: td("term-24"), on: true, label: "24 months", bands: [{ y: [635, 682] }, { y: [704, 760] }] },
              { screen: td("sorted"), on: true, label: "2 offers", bands: [{ y: [247, 405] }] }
            ],
            toggle: "Show changes",
            note: "The count updates before you commit; the payment updates on the card."
          }
        },
        {
          title: "A “no” is never a dead end",
          body: [
            "In the old flow a rejection ended the purchase. Now every refusal says what happened and what to do next, on the same screen.",
            "If a bank can only lend part of the price, the screen says how much. If it refuses, **the other banks’ approved offers are right below it**, with “Back to cart” as the fallback. And when the bank sends a reason, the shopper sees it in plain words: an overdue debt, the age limit, or a request to try a smaller amount."
          ],
          wide: true,
          visual: {
            kind: "row",
            label: "Three screens: a credit limit lower than the price, a refusal with other banks’ offers below, and refusal reasons on each offer",
            phones: [
              { screen: td("limit"), on: true, label: "Limit below the price", short: "Limit", bands: [{ y: [105, 320] }, { y: [338, 676] }] },
              { screen: td("refused"), on: true, label: "Refused by the bank", short: "Refused", bands: [{ y: [252, 672] }, { y: [756, 795] }] },
              {
                screen: td("reasons"),
                on: true,
                label: "Reason for refusal",
                short: "Reasons",
                bands: [
                  { y: [310, 401], x: [78, 368] },
                  { y: [478, 535], x: [78, 368] },
                  { y: [613, 654], x: [78, 368] }
                ]
              }
            ],
            toggle: "Show next steps",
            note: "Limit → refusal → reasons. Show next steps marks what the shopper can do on each."
          }
        },
        {
          title: "Designed with engineering and the banks",
          body: [
            "I worked with engineers to bring several pre-scoring APIs behind one screen, and with the banks on what each status and refusal reason could honestly say.",
            "Every failure got its own state, not a generic error: a wrong code, a code that failed to send, a bank that timed out. **Each one says what went wrong and offers the next step**, a retry or a new code. Speed, accessibility and data compliance were requirements from the first sketch, not polish at the end."
          ],
          visual: {
            kind: "row",
            label: "Two error states: a wrong SMS code with a link to resend, and a failed check with a retry button",
            phones: [
              { screen: td("wrongcode"), on: true, label: "Wrong code", bands: [{ y: [379, 418] }] },
              { screen: td("failed"), on: true, label: "Check failed", bands: [{ y: [379, 418] }] }
            ],
            toggle: "Show next steps",
            note: "Wrong code and failed check, each with one way forward."
          }
        },
        {
          title: "Results",
          body: [
            "Applying for credit went from repeated attempts to one transparent session, and online brokerage became the company’s biggest source of revenue."
          ],
          wide: true,
          metrics: [
            { value: "$4M+", label: "Monthly revenue", note: "through the new credit flow" },
            { value: "+35%", label: "Credit conversions", note: "applications that ended in a purchase", meter: { was: 74, now: 100 } },
            { value: "#1", label: "Revenue stream at Technodom", note: "online brokerage" },
            { value: "1", label: "Session", note: "instead of repeat attempts, bank by bank" }
          ]
        },
        {
          title: "What I’d do differently",
          body: [
            "The biggest win came from outside the screens: a conversation with the banks changed what was possible. Next time I’d go further, faster."
          ],
          wide: true,
          cards: [
            { title: "Talk to partners first", body: "Start with the banks’ APIs and limits before drawing a single flow." },
            { title: "Tag every decision point", body: "Track how shoppers choose: by payment, by bank or by the first green badge." },
            { title: "Test the comparison", body: "A/B test offer layouts and use what wins to rank offers by default." }
          ]
        }
      ]
    }
  },
  {
    slug: "bi-video-consultation",
    company: "BI Group · Growth experiment",
    year: "2026",
    title: "A one-week experiment that turned $500 into a $100K sale and a funded product team",
    summary:
      "The product team said video calls on the website would take too long to build. I proved the idea in one week with off-the-shelf tools and one sales manager. The first month closed a $100K sale, and the business put a team on it.",
    meta: [
      { label: "My role", value: "Designer: journey mapping, tool choice, flow and UI, results" },
      { label: "Team", value: "PM, one sales manager" },
      { label: "Timeline", value: "1 week to build, 1 month to measure" },
      { label: "Stack", value: "Calendly, Microsoft Teams, bi.group" }
    ],
    outcomes: [
      { value: "$100K", label: "first remote sale" },
      { value: "$500", label: "total experiment cost" },
      { value: "1 in 4", label: "video requests became a sale" },
      { value: "0", label: "engineers needed" }
    ],
    hero: {
      src: "/work/video-consult.webp",
      alt: "The flow: a video call button on the BI Group site, Calendly booking, then a Microsoft Teams call",
      w: 1600,
      h: 750,
      caption: "Site entry point → Calendly booking styled in BI Group’s brand → Microsoft Teams consultation."
    },
    sections: [
      {
        label: "Hypothesis",
        title: "At −40°C, nobody wants to drive to a sales office",
        body: [
          "Astana winters reach −40°C. Buying an apartment at BI Group usually meant visiting a sales office, and phone calls rarely closed a deal. The hypothesis: if buyers could book a video consultation from the website, more of them would buy.",
          "The product team declined to build it, estimating the development would take a long time. So it came to the PM and me as an experiment, with one rule: prove it without engineering."
        ]
      },
      {
        label: "Constraints",
        title: "No engineers, one sales manager, existing tools only",
        body: [
          "The sales office lent us one manager for the experiment, who already had a corporate Microsoft Teams account. That set the shape of the solution: we didn’t need to build calling, only a way for buyers to book it.",
          "I compared booking tools and chose Calendly because it integrates with Teams out of the box, so every booking created a call link automatically."
        ]
      },
      {
        label: "Design",
        title: "Two entry points and a booking flow that feels native",
        body: [
          "I mapped the in-person buying journey with sales to find the moments where buyers need to see something to trust it, then designed the remote flow around them. Video had to be easy to find without disrupting people who just wanted a phone call."
        ],
        points: [
          "A “Request a video call” button in the site header",
          "A video option added to the existing call-back form",
          "Calendly’s booking pop-up restyled in BI Group’s colours, so it reads as part of the site",
          "Bookings land in the sales manager’s Teams calendar with a call link"
        ]
      },
      {
        label: "Outcome",
        title: "$100K from a $500 experiment",
        body: [
          "The PM and I launched it in one week and measured after a month. Four buyers requested a video call, and one of them bought an apartment for about 50 million KZT, roughly $100,000. The only cost was the sales manager’s monthly salary, 250,000 KZT or about $500.",
          "That sale did what a slide deck couldn’t. The business and the product team saw the value, took video consultations into development, and assigned a team to build it properly."
        ]
      },
      {
        label: "Reflection",
        title: "What I’d do differently",
        body: [
          "Four requests is a small sample, and one sale proves potential, not a rate. With more time I would have run the pilot longer, tracked requests by entry point, and compared against phone-call conversion, so the product team could size the opportunity rather than just believe in it."
        ]
      }
    ],
    takeaway:
      "When a team says an idea is too expensive to try, the fastest argument is a cheap version that works."
  },
  {
    slug: "bi-match-prototype",
    company: "BI Group · AI prototyping",
    year: "2026",
    title: "Built BI Match in one day, from idea to stakeholder decision, and shipped it to production",
    summary:
      "Could apartment browsing convert better as preference-based matching instead of a list? Instead of writing a spec and waiting for a sprint, I built BI Match in our production stack with Claude Code and demoed it the same day.",
    meta: [
      { label: "My role", value: "Designer and builder: concept, interaction model, working prototype" },
      { label: "Team", value: "My initiative, then the product team" },
      { label: "Timeline", value: "1 day to decision" },
      { label: "Stack", value: "Production API and components, Claude Code, GitHub" }
    ],
    outcomes: [
      { value: "1 day", label: "concept to stakeholder decision" },
      { value: "0", label: "engineering hours taken from the roadmap" },
      { value: "3 steps", label: "from preferences to a personal offer" },
      { value: "Live", label: "now in production" }
    ],
    hero: {
      src: "/work/bi-match-prototype/hero.webp",
      video: "/work/bi-match-prototype/demo.mp4",
      alt: "AI-assisted prototyping: Figma connected to Claude through MCP, next to the BI Match screen",
      w: 1600,
      h: 748
    },
    sections: [
      {
        label: "Hypothesis",
        title: "Browsing a list isn’t how people choose a home",
        body: [
          "Buyers know what life they want before they know which apartment, yet the site asked them to scroll a list. The growth hypothesis: matching buyers to residential complexes by lifestyle, through swiping, could convert better than a traditional listing."
        ]
      },
      {
        label: "Solution",
        title: "BI Match: find a home that fits your lifestyle",
        body: [
          "BI Match turns search into three steps. Buyers set the parameters of their dream apartment, swipe through the floor plans they like, then leave their contacts to get a personal offer from sales."
        ],
        points: [
          "Step 1: choose the parameters of your dream apartment",
          "Step 2: swipe the floor plans you like",
          "Step 3: leave your contacts and get a unique offer"
        ]
      },
      {
        label: "Approach",
        title: "Prototype at production fidelity, not in Figma",
        body: [
          "I designed the interaction model and flow, then built the prototype in our real tech stack with Claude Code, using the same API, component library and data as production. It was functional enough to hand off through GitHub, not a throwaway demo."
        ],
        points: [
          "Reframed listing browsing as swipe-based matching",
          "Designed the full interaction model and user flow",
          "Built it in the team’s production stack",
          "Handed off working code through GitHub"
        ]
      },
      {
        label: "Outcome",
        title: "From a one-day prototype to a live product",
        body: [
          "Stakeholders used a working product the same day the idea came up. The team took it forward, and BI Match is now live in production. The point isn’t the AI tooling. A hypothesis that would normally wait weeks for engineering was tested in hours without pulling anyone off their work."
        ]
      }
    ],
    takeaway: "AI-assisted prototyping matters most when it lets you test ideas at production fidelity without blocking anyone else."
  },
  {
    slug: "bi-design-system",
    company: "BI Group · Design system",
    year: "2025",
    title: "Rebuilt the design system around QA failures and cut design-related QA cycles by 83%",
    summary:
      "The product had outgrown its components. I rebuilt a studio-made UI kit into a design system of 30+ components on semantic tokens, starting with the 12 patterns causing the most QA tickets, made it WCAG 2.2 compliant, and shipped dark mode as a first-class theme.",
    meta: [
      { label: "My role", value: "Led the rebuild: audit, tokens, components, dark mode" },
      { label: "Team", value: "Designers, front-end engineers, QA" },
      { label: "Scope", value: "Components, tokens, accessibility, dark mode" },
      { label: "Platform", value: "Web and mobile web" }
    ],
    outcomes: [
      { value: "−83%", label: "design-related QA cycles" },
      { value: "30+", label: "components on 50+ semantic tokens" },
      { value: "WCAG 2.2", label: "contrast compliance" },
      { value: "Dark mode", label: "shipped product-wide" }
    ],
    hero: {
      src: "/work/bi-design-system/hero.webp",
      video: "/work/bi-design-system/demo.mp4",
      alt: "BI Group screens in light and dark themes next to the semantic colour token table",
      w: 1544,
      h: 720,
      caption: "One token set, two themes: every colour is a semantic token with a light and a dark value."
    },
    sections: [
      {
        label: "Problem",
        title: "Every release paid for the same inconsistencies",
        body: [
          "Inconsistent states, undocumented patterns and ad hoc colour decisions kept failing QA. Each feature release slowed down on bugs the team had already fixed somewhere else, and users saw the same component behave differently from page to page."
        ]
      },
      {
        label: "Approach",
        title: "Prioritise by QA pain, not by what looks messy",
        body: [
          "I audited the full component library and ranked components by QA ticket volume. The 12 highest-friction patterns went first, then the rest of the 30+ components. I rebuilt them with semantic tokens, documented every state, and checked contrast against WCAG 2.2.",
          "Dark mode wasn’t a skin. I designed the token architecture so light and dark are both first-class modes, which meant the whole product could switch without new QA work."
        ],
        points: [
          "Audited and ranked components by QA ticket volume",
          "Rebuilt 12 high-friction patterns with semantic tokens and documented states",
          "Designed a token architecture with light and dark as equal modes",
          "Paired with front-end engineers to check every component was easier to build than the one it replaced"
        ]
      },
      {
        label: "Outcome",
        title: "Fewer defects, faster releases",
        body: [
          "Design-related engineering QA cycles dropped 83%. A whole category of recurring visual bugs disappeared, and dark mode shipped product-wide without extra QA overhead."
        ]
      }
    ],
    takeaway: "A design system earns its value when engineering ships faster with fewer defects, not when the Figma file looks organised."
  },
  {
    slug: "bi-scratch-card",
    company: "BI Group · Growth campaign",
    year: "2026",
    title: "Designed and demoed an AI-personalised re-engagement campaign in a single day",
    summary:
      "BI Group needed to bring dormant users back with something that felt personal, not generic. I designed a scratch card where each reward is generated from the user’s preferences and browsing, prototyped it, and demoed it to business owners that afternoon.",
    meta: [
      { label: "My role", value: "Designer and builder: mechanic, AI personalisation, prototype, demo" },
      { label: "Team", value: "My initiative, presented to business owners" },
      { label: "Timeline", value: "Same day" },
      { label: "Outcome", value: "Greenlit for development" }
    ],
    outcomes: [
      { value: "Same day", label: "concept to stakeholder approval" },
      { value: "0", label: "engineering time to validate" },
      { value: "Greenlit", label: "now in development" },
      { value: "1 per user", label: "AI-generated card from their preferences" }
    ],
    hero: {
      src: "/work/bi-scratch-card/hero.webp",
      video: "/work/bi-scratch-card/demo.mp4",
      alt: "The scratch card concept next to the AI-assisted prototype on the BI Group site",
      w: 1600,
      h: 746,
      caption: "From a quick concept to a working prototype on the real site, in one day."
    },
    sections: [
      {
        label: "Problem",
        title: "Dormant users ignore generic campaigns",
        body: [
          "Dormant users weren’t coming back, and a generic campaign wasn’t going to change that. The team needed a campaign mechanic that felt personal enough to bring people back."
        ]
      },
      {
        label: "Approach",
        title: "A scratch card that knows what you like",
        body: [
          "I designed a scratch card mechanic where each card is generated by AI from the user’s preferences and browsing history, then built an interactive prototype and showed it to business owners the same afternoon."
        ],
        points: [
          "The user rubs off a protective layer, with a finger or mouse, to reveal a gift",
          "Designed the scratch card mechanic with AI-personalised rewards",
          "Built an interactive prototype for a same-day demo",
          "Validated the concept without using engineering time"
        ]
      },
      {
        label: "Outcome",
        title: "From “should we explore this?” to “when do we ship it?”",
        body: [
          "Because stakeholders could try a working concept, they judged the idea on its merits instead of debating whether it deserved engineering time. It was greenlit and is now in development as a growth campaign."
        ]
      }
    ],
    takeaway: "When you can demo a working concept the same day, the conversation moves from whether to explore it to when to ship it."
  },
  {
    slug: "beeline-checkout-research",
    company: "Beeline · Checkout research",
    year: "2023",
    title: "Found why buyers dropped out of checkout, and what to change, in two hall tests",
    summary:
      "After Beeline launched its credit broker, buyers started disappearing at the delivery step, after Beeline had already paid to score them. Two hall tests with real customers showed what order the steps should go in, and what the Next button was costing us.",
    meta: [
      { label: "My role", value: "Ran the research: hypothesis, prototypes, hall tests, analysis" },
      { label: "Team", value: "Customer experience (CEM) team, product team" },
      { label: "Method", value: "2 hall tests, 23 and 12 respondents" },
      { label: "Platform", value: "Shop Beeline, mobile checkout" }
    ],
    outcomes: [
      { value: "86%", label: "preferred choosing the offer first" },
      { value: "17 of 23", label: "didn’t understand how to finish a step" },
      { value: "2:43 → 1:37", label: "average time with step-specific buttons" },
      { value: "5", label: "competitor checkouts benchmarked" }
    ],
    hero: {
      src: "/work/beeline-checkout-research/competitors.webp",
      alt: "Competitive analysis of checkout flows at Technodom, Sulpak, Ozon, Wildberries and Kaspi",
      w: 1600,
      h: 605,
      caption: "Benchmarking checkouts at Technodom, Sulpak, Ozon, Wildberries and Kaspi before testing."
    },
    sections: [
      {
        label: "Problem",
        title: "We were paying to score people who then left",
        body: [
          "At the end of 2022 Shop Beeline launched a credit broker, and it was making money. But the funnel showed buyers dropping out at step 3, delivery, after we had already paid for their credit scoring.",
          "Hypothesis: if we swap steps 3 and 4, so buyers choose their credit offer before delivery, sales will go up."
        ]
      },
      {
        label: "Research",
        title: "A hall test with real Beeline customers",
        body: [
          "With the customer experience team, I recruited 23 real Beeline customers who had bought electronics online, filtered by gender, age and income. Each placed an order in two checkout prototypes: the current one and one with steps 3 and 4 swapped.",
          "Before designing, I benchmarked checkouts at Technodom, Sulpak, Ozon, Wildberries and Kaspi."
        ]
      },
      {
        label: "Finding 1",
        title: "Buyers want to pick the offer first",
        body: [
          "20 of 23 people, 86%, preferred choosing the payment offer before delivery. Only one preferred delivery first. As one respondent put it: “Suddenly I won’t find anything suitable, and then I won’t need delivery.”",
          "Recommendation: put offer selection before the delivery method."
        ]
      },
      {
        label: "Finding 2",
        title: "The Next button was the bigger problem",
        body: [
          "17 of 23 respondents didn’t understand how to complete a step. The generic “Next” button didn’t tell them anything. So I ran a second, timed hall test with 12 people across three age groups, comparing the current Next button with a version where every step has its own button text."
        ],
        points: [
          "Current “Next” button: average 2 min 43 s, worst 5 min 19 s. “I don’t know what to press.”",
          "Step-specific buttons: average 1 min 37 s, worst 2 min 3 s. “Everything is obvious.”"
        ],
        image: {
          src: "/work/beeline-checkout-research/variant-next.webp",
          alt: "The original checkout variant with a generic Next button and its test timings",
          w: 1518,
          h: 853,
          caption: "The production variant with a generic Next button. Average completion 2 min 43 s."
        }
      },
      {
        label: "Recommendation",
        title: "Offer first, and buttons that say what they do",
        body: [
          "Two changes went to the product team: move offer selection ahead of delivery, and replace the generic Next button with step-specific labels, keeping a floating button only once an offer is chosen. A small-looking problem turned out to be the one costing us the most."
        ],
        image: {
          src: "/work/beeline-checkout-research/variant-labels.webp",
          alt: "The winning checkout variant, where every step has its own button text, with test timings",
          w: 1514,
          h: 853,
          caption: "The winning variant: every step says what it does. Average completion 1 min 37 s."
        }
      }
    ],
    takeaway: "Research earns its keep when it finds the problem nobody was testing for. We came to reorder steps and left fixing a button."
  },
  {
    slug: "beeline-design-system",
    company: "Beeline · Design operations",
    year: "2022",
    title: "Turned one chaotic Figma file into a system designers and developers could ship from",
    summary:
      "Shop Beeline sells phones bundled with mobile plans. When I joined, every page lived in one Figma file with no structure and no components. I rebuilt the e-commerce flow on a shared UI kit so the team could find, reuse and hand off work.",
    meta: [
      { label: "My role", value: "Designer: file architecture, UI kit, flow rebuild" },
      { label: "Team", value: "Designers, developers" },
      { label: "Scope", value: "Main, listing, product, checkout and content pages" },
      { label: "Foundation", value: "Initium design system" }
    ],
    outcomes: [
      { value: "5", label: "flows rebuilt from the ground up" },
      { value: "1", label: "shared UI kit" },
      { value: "1", label: "master scenario per flow for handoff" },
      { value: "Initium", label: "design system as the foundation" }
    ],
    hero: {
      src: "/work/beeline-design-system/payment.webp",
      alt: "The rebuilt payment method component in the Shop Beeline checkout",
      w: 1200,
      h: 978
    },
    sections: [
      {
        label: "Problem",
        title: "Design porridge",
        body: [
          "Main page, listings, checkout: everything was in a single Figma file with no hierarchy, no reusable elements and no layout logic. Designers couldn’t find files, and developers couldn’t get specs."
        ],
        image: {
          src: "/work/beeline-design-system/before-file.webp",
          alt: "The original Figma file with every page mixed together",
          w: 1264,
          h: 773,
          caption: "Before: every page and version in one canvas."
        }
      },
      {
        label: "Approach",
        title: "Structure first, then components",
        body: [
          "I studied best practice for Figma file organisation and design-system hierarchy, then split the work into clear files for Main, Product listing, Product detail, Checkout and Content pages, each with a master scenario.",
          "I rebuilt every flow from the ground up on a new UI kit based on the Initium design system, so styles, spacing and components were shared everywhere."
        ],
        image: {
          src: "/work/beeline-design-system/pages.webp",
          alt: "The new file structure with separate files per flow and pages per checkout step",
          w: 1504,
          h: 947
        }
      },
      {
        label: "Outcome",
        title: "A file you can hand to anyone",
        body: [
          "After several iterations and team reviews, the final layouts went to development. The team got a clean, modular file structure, one design language, faster onboarding for new designers, and easier updates because components were reused instead of redrawn."
        ],
        image: {
          src: "/work/beeline-design-system/ui-kit.webp",
          alt: "The shared component library and product card components",
          w: 1600,
          h: 1538
        }
      }
    ],
    takeaway: "Rebuilding layouts isn’t moving rectangles. It changes how a team thinks: structure, systems and shared understanding."
  }
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}

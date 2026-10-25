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
  subtitle: string
  /** Three screens for the hero, left to right. */
  heroScreens: string[]
  heroLabel: string
  role: { label: string; value: string }[]
  chapters: Chapter[]
}

/** Body paragraphs may wrap a phrase in **double asterisks** to set it in the text colour. */
export type ChapterText = { title: string; body: string[] }

export type Chapter = ChapterText & {
  visual?: Visual
  results?: { value: string; label: string; note: string }[]
  /** A second text column in place of a visual, numbered as its own chapter. */
  alongside?: ChapterText
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
      /** Horizontal bands of the screen; `own` marks the parts designed from scratch. */
      parts: { y: [number, number]; name: string; own: boolean; from?: string }[]
      note: string
    }
  | {
      kind: "loop"
      label: string
      /** Screens shown in place, one after another, with a tap ring where the user taps. */
      steps: { screen: string; name: string; tap?: [number, number] }[]
    }
  | ({ kind: "image" } & CaseImage)

const ozen = (name: string) => `/work/ozen-telegram-music/screens/${name}.webp`

export const caseStudies: CaseStudy[] = [
  {
    slug: "bi-mobile-search",
    company: "BI Group · Mobile web",
    year: "2025",
    title: "Rebuilt mobile search around the three filters buyers actually use",
    summary:
      "75% of BI Group’s traffic is mobile, yet buyers were leaving search before they saw a single apartment. In six weeks I took the filter panel from field research to production, and bounce rate fell by a third.",
    meta: [
      { label: "My role", value: "Owned the design: audit, field research, interaction design, usability test, handoff" },
      { label: "Team", value: "PM, engineers, QA" },
      { label: "Timeline", value: "6 weeks" },
      { label: "Platform", value: "Mobile web, 2M+ monthly users" }
    ],
    outcomes: [
      { value: "54%", label: "conversion rate via quick filters" },
      { value: "25% → 16.8%", label: "bounce rate" },
      { value: "+156%", label: "page depth" },
      { value: "679K", label: "filter interactions, first month" }
    ],
    hero: {
      src: "/work/bi-final.webp",
      alt: "Final BI Group mobile search with quick-filter chips for city, price and rooms",
      w: 1600,
      h: 773
    },
    sections: [
      {
        label: "Problem",
        title: "Search hid the controls people needed most",
        body: [
          "BI Group is one of the largest residential developers in the region, and its site is where most purchases start. On mobile, the filter panel sat under heavy whitespace, the Filters and Map buttons were easy to miss, and every option had the same weight.",
          "The business goal was simple: more mobile buyers reaching a listing they care about. I owned the design end to end, working with the PM on the goal and with engineers and QA through to release."
        ],
        image: {
          src: "/work/bi-mobile-search/bi-audit.webp",
          alt: "UX audit of the old mobile search marking wasted space and hidden filter and map buttons",
          w: 1600,
          h: 665,
          caption: "Audit of the old flow: wasted space, a hidden Map button, and no clear first step."
        }
      },
      {
        label: "Research",
        title: "Eight buyers, one card sort, one clear answer",
        body: [
          "I benchmarked e-commerce leaders as well as property portals, because BI Group’s strategy is to sell like a marketplace, not like a developer.",
          "Then I ran card-sorting sessions with 8 real buyers on their own phones in a sales office. City, price and number of rooms covered 87% of all filter use. Everything else was occasional."
        ],
        points: [
          "Method: moderated card sort, mobile devices, in a sales office",
          "Participants: 8 buyers, thanked with a $20 bookstore voucher",
          "Finding: 3 filters cover 87% of use cases"
        ],
        image: {
          src: "/work/bi-mobile-search/bi-sales-office.webp",
          alt: "Research sessions with buyers in a BI Group sales office",
          w: 1600,
          h: 1067,
          caption: "Guerrilla research in a sales office, with real buyers mid-decision."
        }
      },
      {
        label: "Decision",
        title: "Remove options to speed up the decision",
        body: [
          "Using the 80/20 split and Hick’s law, I surfaced City, Price and Rooms as quick-filter chips above the results, moved everything else one tap deeper, and gave Map its own labelled button.",
          "The trade-off was deliberate. Power users lose one tap on rare filters; everyone else gets to a relevant listing faster. I also restructured listing cards for faster vertical scanning on small screens."
        ],
        points: [
          "Quick-filter chips for City, Price and Rooms",
          "Simplified header with a visible Map button",
          "Progressive disclosure for advanced filters"
        ],
        image: {
          src: "/work/bi-mobile-search/bi-moves.webp",
          alt: "Design moves: most-used filters first, highlighted map, polished white space",
          w: 1600,
          h: 564
        }
      },
      {
        label: "Validation",
        title: "Split-tested before a line of production code",
        body: [
          "I ran a split test with 12 participants on real phones. The task: find a 2-bedroom apartment in Astana under 30 million KZT.",
          "Feedback led to one more change before handoff: the unclear pin icon became a labelled Map button."
        ],
        points: [
          "Old design: 2 of 6 completed the task unaided",
          "New design: 5 of 6 completed the task unaided",
          "10 of 12 preferred the new version"
        ],
        image: {
          src: "/work/bi-mobile-search/bi-before-after.webp",
          alt: "Before and after of the main search page and the map view",
          w: 1600,
          h: 1212,
          caption: "Before and after, on the main page and the map view."
        }
      },
      {
        label: "Outcome",
        title: "Less bouncing, deeper browsing",
        body: [
          "In June 2025 the new search served 261,944 sessions from 118,216 users. The conversion rate through quick filters reached 54%, with 5.7 interactions per user. Bounce rate fell from 25% to 16.8% and page depth rose 156%.",
          "The next iteration adds staged A/B releases and event tagging so we can isolate which micro-changes drive the biggest gains."
        ]
      }
    ],
    takeaway: "On mobile, clarity beats completeness. The biggest gain came from removing options, not adding them."
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
      heroScreens: [ozen("t2"), ozen("m3"), ozen("p3")],
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
              { y: [0, 122], name: "Header", own: false },
              { y: [122, 180], name: "Search", own: false },
              { y: [180, 246], name: "Coin balance", own: true },
              { y: [246, 620], name: "List cells", own: false },
              { y: [620, 692], name: "Farming button", own: true },
              // The main screen while a track plays, so the mini player isn’t empty.
              { y: [692, 753], name: "Mini player", own: true, from: ozen("m2") },
              { y: [753, 844], name: "Tab bar", own: false }
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
          body: [
            "The invite gate did its job. The beta spread organically through Telegram communities, and Telegram’s CEO, Pavel Durov, tried it himself."
          ],
          results: [
            { value: "5,000", label: "Active users", note: "first week of the invite-only beta" },
            { value: "0", label: "Tutorial screens", note: "every control was already familiar from Telegram" }
          ],
          alongside: {
            title: "What the beta didn’t prove",
            body: [
              "Five thousand people in a week proves curiosity, not habit. Tap-to-earn apps tend to fade once the novelty goes, and the beta ended before we could see whether Ōzen would.",
              "The next version needed to prove retention: measure how many people came back for a second and third farming claim, and test whether investing in tracks kept them longer than farming alone. On the product side, that meant on-chain transfers, an artist dashboard, and real ownership of tracks."
            ]
          }
        }
      ]
    }
  },
  {
    slug: "technodom-credit",
    company: "Technodom · Fintech",
    year: "2022",
    title: "Turned a credit rejection loop into a $4M-a-month revenue stream",
    summary:
      "Shoppers applying for credit were rejected bank by bank, re-entering their data every time. I reframed the problem with our banking partners and redesigned the flow so every bank pre-scores the shopper at once.",
    meta: [
      { label: "My role", value: "Owned the design: discovery, flow redesign, verification, edge cases" },
      { label: "Team", value: "Engineers, banking partners, business" },
      { label: "Year", value: "2022" },
      { label: "Platform", value: "E-commerce, web and mobile" }
    ],
    outcomes: [
      { value: "$4M+", label: "monthly revenue" },
      { value: "+35%", label: "credit conversions" },
      { value: "#1", label: "revenue stream at Technodom" },
      { value: "1", label: "session instead of repeat attempts" }
    ],
    hero: {
      src: "/work/td-solution.webp",
      alt: "Technodom credit flow showing offers from every partner bank at once",
      w: 1600,
      h: 836
    },
    sections: [
      {
        label: "Context",
        title: "Kazakhstan’s largest electronics retailer, selling on credit",
        body: [
          "Technodom runs 70+ stores and one of the country’s biggest e-commerce platforms. Credit and instalments are built into checkout, so the credit flow sits directly on the revenue line."
        ],
        image: {
          src: "/work/technodom-credit/td-store.webp",
          alt: "A Technodom store entrance",
          w: 1280,
          h: 960
        }
      },
      {
        label: "Problem",
        title: "A loop that punished people for applying",
        body: [
          "Shoppers picked a bank, entered their ID number, were redirected, got rejected, and started again with the next bank. Each attempt meant re-entering data with no idea which bank might approve them.",
          "The result was high abandonment and millions in credit sales lost at the last step of checkout."
        ],
        image: {
          src: "/work/technodom-credit/td-loop.webp",
          alt: "Diagram of the old flow: choose a bank, enter ID, get rejected, repeat",
          w: 1600,
          h: 944,
          caption: "The old flow: one bank at a time, until approval or give-up."
        }
      },
      {
        label: "Insight",
        title: "The fix was in the system, not the screens",
        body: [
          "Analytics and user interviews pointed to three root causes: repeated input, no transparency, and no sense of approval odds. Then conversations with our banking partners surfaced the unlock: most of them already supported pre-scoring APIs that return a preliminary decision from an ID number alone.",
          "That reframed the brief. The job wasn’t to make credit look nicer. It was to help shoppers secure financing quickly and with confidence."
        ]
      },
      {
        label: "Solution",
        title: "One ID number, every bank, all offers at once",
        body: [
          "I reversed the logic. Instead of shoppers testing banks one by one, the system pre-scores them across all partner banks in a single step and shows every eligible offer side by side."
        ],
        points: [
          "Single data entry: the ID number, once",
          "Simultaneous pre-scoring across all partner banks",
          "Transparent comparison of rates, limits and terms",
          "One-tap confirmation, then a hand-off to the chosen bank"
        ],
        image: {
          src: "/work/technodom-credit/td-verify.webp",
          alt: "Comparison table of bank offers with rates, terms and approval status, plus two-step verification",
          w: 1600,
          h: 932,
          caption: "Offer comparison and two-step SMS verification."
        }
      },
      {
        label: "Execution",
        title: "Designed with engineering and the banks, not handed over",
        body: [
          "I worked with engineers to integrate multiple pre-scoring APIs, designed secure two-step verification by SMS, and built fallback flows for exceptional cases. Speed, accessibility and data compliance were requirements at every stage, not polish at the end."
        ]
      },
      {
        label: "Outcome",
        title: "Online credit became the company’s top revenue source",
        body: [
          "Credit conversions rose 35%, the flow generated $4M+ in monthly revenue, and online brokerage became Technodom’s #1 revenue stream. Applying for credit went from repeated attempts to one transparent session.",
          "With more time I would A/B test comparison layouts and instrument each decision point to understand how shoppers choose between offers."
        ],
        image: {
          src: "/work/technodom-credit/td-results.webp",
          alt: "Results: $4M monthly revenue, 35% funded transactions, the #1 revenue source",
          w: 1600,
          h: 853
        }
      }
    ],
    takeaway: "Solving user frustration at the system level, with partners outside the company, produced gains no screen redesign could."
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

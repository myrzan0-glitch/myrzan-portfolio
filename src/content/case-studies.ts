export type CaseImage = { src: string; alt: string; w: number; h: number; caption?: string }

export type CaseSection = {
  label: string
  title: string
  body: string[]
  points?: string[]
  image?: CaseImage
}

export type CaseStudy = {
  slug: string
  company: string
  year: string
  title: string
  summary: string
  meta: { label: string; value: string }[]
  outcomes: { value: string; label: string }[]
  hero: CaseImage
  sections: CaseSection[]
  takeaway: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "bi-mobile-search",
    company: "BI Group · Mobile web",
    year: "2025",
    title: "Rebuilt mobile search around the three filters buyers actually use",
    summary:
      "75% of BI Group’s traffic is mobile, yet buyers were leaving search before they saw a single apartment. In six weeks I took the filter panel from research to production and made quick filters the main way people search.",
    meta: [
      { label: "Role", value: "Product Designer, research to handoff" },
      { label: "Team", value: "PM, engineers, QA" },
      { label: "Timeline", value: "6 weeks" },
      { label: "Platform", value: "Mobile web, 2M+ daily users" }
    ],
    outcomes: [
      { value: "54%", label: "conversion via quick filters" },
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
          "The business goal was simple: more mobile buyers reaching a listing they care about. My job was to find out why they weren’t."
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
        title: "Quick filters became the main way people search",
        body: [
          "In June 2025 the new search served 261,944 sessions from 118,216 users. 54% of them converted through the quick filters, with 5.7 interactions per user. Bounce rate fell from 25% to 16.8% and page depth rose 156%.",
          "The next iteration adds staged A/B releases and event tagging so we can isolate which micro-changes drive the biggest gains."
        ]
      }
    ],
    takeaway: "On mobile, clarity beats completeness. The biggest gain came from removing options, not adding them."
  },
  {
    slug: "technodom-credit",
    company: "Technodom · Fintech",
    year: "2021",
    title: "Turned a credit rejection loop into a $4M-a-month revenue stream",
    summary:
      "Shoppers applying for credit were rejected bank by bank, re-entering their data every time. I reframed the problem with our banking partners and redesigned the flow so every bank pre-scores the shopper at once.",
    meta: [
      { label: "Role", value: "Product Designer, end to end" },
      { label: "Team", value: "Engineers, banking partners, business" },
      { label: "Timeline", value: "2021" },
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
    title: "Opened a new sales channel with a $100K remote sale and zero engineering",
    summary:
      "High-value buyers in other cities couldn’t visit a showroom, and phone calls weren’t closing. Engineering was fully booked. I designed and launched video consultations with off-the-shelf tools in under two weeks.",
    meta: [
      { label: "Role", value: "Product Designer, idea to launch" },
      { label: "Team", value: "PM, sales team" },
      { label: "Timeline", value: "Under 2 weeks" },
      { label: "Platform", value: "Web, sales operations" }
    ],
    outcomes: [
      { value: "$100K", label: "first remote sale" },
      { value: "< 2 weeks", label: "design to launch" },
      { value: "0", label: "engineers needed" },
      { value: "1", label: "new revenue channel" }
    ],
    hero: {
      src: "/work/video-consult.webp",
      alt: "Video consultation flow from the BI Group site to a booked call",
      w: 1600,
      h: 750
    },
    sections: [
      {
        label: "Problem",
        title: "Buyers who couldn’t visit weren’t buying",
        body: [
          "Apartments are a high-trust purchase. Buyers in other cities wanted to see the product and the people behind it, but couldn’t travel to a showroom, and phone calls weren’t enough to close.",
          "This wasn’t on any roadmap, and engineering was fully allocated. If we wanted to test it, it had to ship without them."
        ]
      },
      {
        label: "Approach",
        title: "Map the showroom, find where trust is earned",
        body: [
          "I sat with the sales team and mapped the in-person buying journey step by step, looking for the moments where seeing something in person is what builds trust. There were three.",
          "I designed the remote flow around those three moments and nothing else."
        ],
        points: [
          "Mapped the in-person sales journey with sales managers",
          "Identified three trust-critical moments",
          "Designed the flow end to end: a site entry point, Calendly booking, then a Microsoft Teams call with sales"
        ]
      },
      {
        label: "Launch",
        title: "Shipped as an experiment, run with sales",
        body: [
          "We launched as a pilot with one hypothesis: buyers will commit remotely if they can see what they’d see in a showroom. I coordinated launch and iteration directly with the sales team."
        ]
      },
      {
        label: "Outcome",
        title: "A $100K sale within two weeks of launch",
        body: [
          "The first remote sale closed within two weeks of launch: $100K, the platform’s first high-value remote transaction. It proved a new channel with zero engineering investment, and gave the business evidence to decide whether to build it properly."
        ]
      }
    ],
    takeaway:
      "The most valuable feature wasn’t on anyone’s roadmap. It came from listening to a sales problem and shipping the smallest thing that could prove it."
  }
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}

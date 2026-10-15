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
          "In June 2025 the new search served 261,944 sessions from 118,216 users. The conversion rate through quick filters reached 54%, with 5.7 interactions per user. Bounce rate fell from 25% to 16.8% and page depth rose 156%.",
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
    title: "A one-week experiment that turned $500 into a $100K sale and a funded product team",
    summary:
      "The product team said video calls on the website would take too long to build. I proved the idea in one week with off-the-shelf tools and one sales manager. The first month closed a $100K sale, and the business put a team on it.",
    meta: [
      { label: "Role", value: "Product Designer, hypothesis to results" },
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
          "The product team declined to build it, estimating the development would take a long time. So it came to us as an experiment, with one rule: prove it without engineering."
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
          "We built it scrappily in one week and measured after a month. Four buyers requested a video call, and one of them bought an apartment for about 50 million KZT, roughly $100,000. The only cost was the sales manager’s monthly salary, 250,000 KZT or about $500.",
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
    slug: "bi-design-system",
    company: "BI Group · Design system",
    year: "2024",
    title: "Rebuilt the design system around QA failures and cut QA time per component by 83%",
    summary:
      "The product had outgrown its components. I rebuilt the 12 patterns causing the most QA tickets on semantic tokens, made them WCAG 2.2 compliant, and shipped dark mode as a first-class theme.",
    meta: [
      { label: "Role", value: "Product Designer, system owner" },
      { label: "Team", value: "Designers, front-end engineers, QA" },
      { label: "Scope", value: "Components, tokens, accessibility, dark mode" },
      { label: "Platform", value: "Web and mobile web" }
    ],
    outcomes: [
      { value: "−83%", label: "QA time per component" },
      { value: "50+", label: "semantic tokens" },
      { value: "WCAG 2.2", label: "contrast compliance" },
      { value: "Dark mode", label: "shipped product-wide" }
    ],
    hero: {
      src: "/work/bi-design-system/hero.webp",
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
          "Inconsistent states, undocumented patterns and ad hoc colour decisions kept failing QA. Each feature release slowed down on bugs the team had already fixed somewhere else."
        ]
      },
      {
        label: "Approach",
        title: "Prioritise by QA pain, not by what looks messy",
        body: [
          "I audited the full component library and ranked components by QA ticket volume. The 12 highest-friction patterns went first. I rebuilt them with semantic tokens, documented every state, and checked contrast against WCAG 2.2.",
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
          "QA time per component dropped 83%. A whole category of recurring visual bugs disappeared, and dark mode shipped product-wide without extra QA overhead."
        ]
      }
    ],
    takeaway: "A design system earns its value when engineering ships faster with fewer defects, not when the Figma file looks organised."
  },
  {
    slug: "bi-match-prototype",
    company: "BI Group · AI prototyping",
    year: "2025",
    title: "Took a new discovery concept from idea to stakeholder decision in one day",
    summary:
      "Could apartment browsing convert better as preference-based matching instead of a list? Instead of writing a spec and waiting for a sprint, I built BI Match in our production stack with Claude Code and demoed it the same day.",
    meta: [
      { label: "Role", value: "Product Designer, concept to code" },
      { label: "Team", value: "Independent initiative" },
      { label: "Timeline", value: "1 day" },
      { label: "Stack", value: "Production API and components, Claude Code, GitHub" }
    ],
    outcomes: [
      { value: "1 day", label: "concept to stakeholder decision" },
      { value: "0", label: "engineering hours taken from the roadmap" },
      { value: "Real", label: "API, components and data" },
      { value: "In dev", label: "now being built by the team" }
    ],
    hero: {
      src: "/work/bi-match-prototype/hero.webp",
      alt: "AI-assisted prototyping: Figma connected to Claude through MCP, next to the BI Match screen",
      w: 1600,
      h: 748
    },
    sections: [
      {
        label: "Hypothesis",
        title: "Browsing a list isn’t how people choose a home",
        body: [
          "Buyers know what life they want before they know which apartment. The growth hypothesis: a swipe-based matching experience around preferences could convert better than a traditional listing."
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
        title: "A decision in hours instead of a roadmap slot",
        body: [
          "Stakeholders used a working product the same day the idea came up, and the concept is now in development. The point isn’t the AI tooling. A hypothesis that would normally wait weeks for engineering was tested in hours without pulling anyone off their work."
        ]
      }
    ],
    takeaway: "AI-assisted prototyping matters most when it lets you test ideas at production fidelity without blocking anyone else."
  },
  {
    slug: "bi-scratch-card",
    company: "BI Group · Growth campaign",
    year: "2026",
    title: "Designed and demoed an AI-personalised re-engagement campaign in a single day",
    summary:
      "We needed to bring dormant users back with something that felt personal, not generic. I designed a scratch card where each reward is generated from the user’s preferences and browsing, prototyped it, and demoed it to business owners that afternoon.",
    meta: [
      { label: "Role", value: "Product Designer, concept and prototype" },
      { label: "Team", value: "Independent initiative" },
      { label: "Timeline", value: "Same day" },
      { label: "Outcome", value: "Greenlit for development" }
    ],
    outcomes: [
      { value: "Same day", label: "concept to stakeholder approval" },
      { value: "0", label: "engineering time to validate" },
      { value: "Greenlit", label: "now in development" },
      { value: "AI", label: "personalised reward per user" }
    ],
    hero: {
      src: "/work/bi-scratch-card/hero.webp",
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
          "Re-engagement emails and banners looked the same for everyone. The team needed a mechanic that felt personal enough to bring people back."
        ]
      },
      {
        label: "Approach",
        title: "A scratch card that knows what you like",
        body: [
          "I designed a scratch card mechanic where each card is generated by AI from the user’s preferences and browsing history, then built an interactive prototype and showed it to business owners the same afternoon."
        ],
        points: [
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
      { label: "Role", value: "Product Designer, research lead" },
      { label: "Team", value: "Customer experience (CEM) team" },
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
      src: "/work/beeline-checkout-research/variant-labels.webp",
      alt: "The winning checkout variant, where every step has its own button text, with test timings",
      w: 1514,
      h: 853,
      caption: "The winning variant: every step says what it does. Average completion 1 min 37 s."
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
        ],
        image: {
          src: "/work/beeline-checkout-research/competitors.webp",
          alt: "Competitive analysis of checkout flows at Technodom, Sulpak, Ozon, Wildberries and Kaspi",
          w: 1600,
          h: 605
        }
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
        ]
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
      { label: "Role", value: "Product Designer" },
      { label: "Team", value: "Designers, developers" },
      { label: "Scope", value: "Main, listing, product, checkout and content pages" },
      { label: "Foundation", value: "Initium design system" }
    ],
    outcomes: [
      { value: "5", label: "flows rebuilt from the ground up" },
      { value: "1", label: "shared UI kit" },
      { value: "Faster", label: "designer onboarding" },
      { value: "Smoother", label: "developer handoff" }
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

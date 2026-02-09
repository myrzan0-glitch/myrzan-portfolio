# Product Requirements Document: Portfolio Website
**Project Name:** Myrzan Izimbetov Portfolio Website  
**Version:** 1.0  
**Last Updated:** February 8, 2026  
**Product Owner:** Myrzan Izimbetov  
**Status:** Ready for Development

---

## 1. Executive Summary

### 1.1 Vision Statement
Create a visually stunning, accessible portfolio website that showcases Myrzan Izimbetov's product design expertise while demonstrating design excellence through execution. The site must immediately capture attention and provide seamless evidence of impact-driven design work.

### 1.2 Success Metrics
- **Primary:** Portfolio generates positive feedback from at least 3 hiring managers or clients within first month
- **Engagement:** Average session duration > 2 minutes
- **Accessibility:** 100% WCAG 2.2 AA compliance
- **Performance:** Lighthouse score > 90 across all categories
- **User Action:** Contact form submission rate > 3% of visitors

### 1.3 Key Results to Achieve
- Generated +$4M in MRR through past projects
- Achieved +37% pageview growth across platforms
- Increased mobile conversion by +54% (BI Group)
- Improved conversions by +35% (Technodom)

---

## 2. Product Overview

### 2.1 Problem Statement
**As a** Product Designer seeking new opportunities  
**I need** a portfolio website that stands out and showcases impact  
**So that** I can attract the right employers/clients who value data-driven design excellence

### 2.2 Solution Overview
A single-page portfolio website built with modern web technologies, featuring:
- Striking visual design using shadcn/ui components
- Comprehensive case studies with measurable results
- Full dark/light mode support
- Perfect accessibility (WCAG 2.2 AA)
- Smooth animations and micro-interactions
- Mobile-first responsive design

### 2.3 Target Audience
**Primary Users:**
- Hiring managers at tech companies
- Design leaders and VPs of Design
- Startup founders seeking product designers
- Recruiters specializing in design roles

**User Characteristics:**
- Busy professionals (average 1-3 minutes on portfolio sites)
- Value measurable impact over aesthetic alone
- Review portfolios on various devices (60% desktop, 40% mobile)
- May have accessibility needs (screen readers, keyboard navigation)

---

## 3. Technical Specifications

### 3.1 Technology Stack
**Framework & Language:**
- Next.js 14+ with App Router
- TypeScript for type safety
- React 18+

**UI & Styling:**
- shadcn/ui component library (https://ui.shadcn.com/docs)
- Tailwind CSS for utility styling
- Framer Motion for animations
- CSS Variables for theme switching

**Development Tools:**
- ESLint + Prettier for code quality
- Vite or Webpack for bundling
- Git for version control

**Deployment:**
- Vercel (recommended) or Netlify
- Custom domain setup

### 3.2 Browser & Device Support
**Browsers:**
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Devices:**
- Desktop (1920px, 1440px, 1280px)
- Tablet (768px, 1024px)
- Mobile (375px, 414px, 390px)

### 3.3 Performance Requirements
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s
- Total bundle size: < 200KB (gzipped)

---

## 4. Functional Requirements

### Feature 1: Hero Section
**Priority:** P0 (Must Have)

**User Story:**  
As a visitor  
I want to immediately understand who Myrzan is and what value he provides  
So that I can decide if I want to continue exploring the portfolio

**Acceptance Criteria:**
```gherkin
Given I land on the homepage
When the page loads
Then I should see:
  - Name "Myrzan Izimbetov" prominently displayed
  - Value proposition: "Results-driven Product Designer focused on UX and UI, creating elegant, user-centered experiences that have generated ✦ +$4M in MRR ✦ and ✺ +37% pageview growth ✺ across mobile, desktop, and web platforms"
  - Professional photo or avatar (if available)
  - Quick links to LinkedIn, Telegram, Email
  - Location: "London, UK — feel free to drop a line"
  - Subtle call-to-action to scroll or explore projects
```

**Design Notes:**
- Use large, readable typography (48-72px for name on desktop)
- Highlight metrics (✦ +$4M in MRR ✦ and ✺ +37% pageview growth ✺) with unique styling/color
- Smooth entrance animation (fade in, slide up)
- Full viewport height hero on desktop

---

### Feature 2: Featured Projects Section
**Priority:** P0 (Must Have)

**User Story:**  
As a hiring manager  
I want to see Myrzan's best work with clear outcomes  
So that I can quickly assess his design capabilities and impact

**Acceptance Criteria:**
```gherkin
Scenario: Viewing featured projects
  Given I scroll to the projects section
  Then I should see featured projects displayed as cards:
    | Project Title | Company | Key Outcome |
    | BI Group: +54% mobile conversion rate after 6-week redesign | BI Group | +54% conversion |
    | How I Scaled BI Group's Design System with Tokens and Dark Theme | BI Group | Scalable DS |
    | Technodom Credit Flow Redesign | Technodom | +35% conversions |
    | ōzen — Web3 Music Platform Inside Telegram | ōzen | Web3 platform |
    | Beeline — From Design Porridge to Systematic Harmony | Beeline | Design system |
    | Beeline: UX research bundle in E-com | Beeline | UX research |
    | UI Shots | Portfolio | Design showcase |

Scenario: Interacting with project cards
  Given I see a project card
  When I hover over it
  Then the card should have a subtle lift effect
  And show interactive state

  When I click on a project card
  Then I should be taken to the case study (Notion link)
  And the link should open in a new tab
```

**Each project card must include:**
- Project title
- Company name
- Key metric or outcome
- Brief description (1-2 sentences)
- Thumbnail image or preview
- "View Case Study" link
- Hover state with subtle animation

**Layout:**
- Grid layout: 2 columns on desktop, 1 column on mobile
- Cards have consistent height or dynamic based on content
- Lazy loading for images below the fold

---

### Feature 3: Work Experience Timeline
**Priority:** P0 (Must Have)

**User Story:**  
As a recruiter  
I want to see Myrzan's work history and company scale  
So that I can understand his experience level and industry exposure

**Acceptance Criteria:**
```gherkin
Scenario: Viewing work experience
  Given I view the experience section
  Then I should see chronological work history in reverse order:
    | Company | Role | Duration | Scale |
    | BI Group | Product Designer | Aug 2023 – Present | DAU 2M+ users |
    | Beeline | Product Designer | Sep 2022 – Aug 2023 | DAU 11M+ users |
    | Petrel AI | Product Designer | Jan 2022 – Sep 2022 | NDA Project |
    | Technodom Operator | Product Designer | Dec 2020 – Jan 2022 | DAU 2M+ users |
    | Vlife | UI/UX Designer | Apr 2020 – Dec 2020 | Startup, CMS |

Scenario: Visual presentation
  Given I view the experience timeline
  Then I should see:
    - Vertical timeline with connecting line
    - Company name in bold
    - Role and dates clearly differentiated
    - Company description/scale in smaller text
    - Current role highlighted or marked as "Present"
  And the timeline should adapt responsively on mobile
```

---

### Feature 4: Mentoring Section
**Priority:** P1 (Should Have)

**User Story:**  
As a potential client/employer  
I want to understand Myrzan's teaching and leadership capabilities  
So that I can assess cultural fit and seniority level

**Acceptance Criteria:**
```gherkin
Scenario: Viewing mentoring section
  Given I view the mentoring section
  Then I should see:
    - Section title: "Mentoring & Knowledge Sharing"
    - Description of mentoring philosophy or approach
    - Examples of mentoring activities (workshops, 1-on-1s, etc.)
    - Testimonials from mentees (if available)
```

**Note:** Content to be provided by Myrzan

---

### Feature 5: About/Intro Section
**Priority:** P1 (Should Have)

**User Story:**  
As a visitor  
I want to learn more about Myrzan's background and approach  
So that I can connect with him on a personal level

**Acceptance Criteria:**
```gherkin
Scenario: Reading about section
  Given I view the about section
  Then I should see:
    - Brief personal introduction (2-3 paragraphs)
    - Design philosophy or approach
    - Tools and technologies expertise
    - Optional: Interests outside of work
```

**Note:** Content to be drafted by Myrzan

---

### Feature 6: Contact Section
**Priority:** P0 (Must Have)

**User Story:**  
As an interested party  
I want to easily reach out to Myrzan  
So that I can discuss opportunities or ask questions

**Acceptance Criteria:**
```gherkin
Scenario: Accessing contact information
  Given I scroll to the bottom of the page
  Then I should see:
    - Section heading: "Let's Connect" or "Get in Touch"
    - Primary contact methods displayed prominently:
      * Email: izimbetov.myrzan@gmail.com (clickable mailto link)
      * LinkedIn: linkedin.com/in/myrzanio/ (opens in new tab)
      * Telegram: t.me/myrzanio (opens in new tab)
    - Optional simple contact form (name, email, message)
    - Footer with copyright and location

Scenario: Clicking contact links
  When I click the email link
  Then my default email client should open with pre-filled address

  When I click LinkedIn or Telegram
  Then the link should open in a new tab
  And have rel="noopener noreferrer" for security
```

**Accessibility:**
- All links have proper aria-labels
- Contact form (if added) has proper labels and validation
- Focus states clearly visible

---

### Feature 7: Theme Switcher (Dark/Light Mode)
**Priority:** P0 (Must Have)

**User Story:**  
As a user with visual preferences  
I want to switch between dark and light modes  
So that I can view the portfolio in my preferred theme

**Acceptance Criteria:**
```gherkin
Scenario: Switching themes
  Given I view the website
  When I click the theme toggle button
  Then the entire site switches between dark and light mode
  And my preference is saved in localStorage
  And the transition is smooth (200-300ms)
  And all colors update to the new theme

Scenario: Initial theme detection
  Given I visit the site for the first time
  When the page loads
  Then the site should respect my system preference (prefers-color-scheme)
  And if I have a saved preference, use that instead

Scenario: Theme toggle visibility
  Given I am on any part of the page
  Then the theme toggle button should be:
    - Always visible (top right corner or header)
    - Clearly labeled with sun/moon icon
    - Accessible via keyboard
```

**Technical Requirements:**
- Use CSS custom properties for theming
- Smooth transition between themes (200-300ms)
- Toggle button always accessible (top right corner)
- Sun/moon icon or similar visual indicator
- No flash of unstyled content (FOUC) on page load

**Color Specifications:**
```
Light Mode:
- Background: hsl(0 0% 100%) or hsl(0 0% 98%)
- Foreground: hsl(240 10% 3.9%)
- Card: hsl(0 0% 100%)
- Muted: hsl(240 4.8% 95.9%)
- Border: hsl(240 5.9% 90%)

Dark Mode:
- Background: hsl(240 10% 3.9%)
- Foreground: hsl(0 0% 98%)
- Card: hsl(240 10% 3.9%)
- Muted: hsl(240 3.7% 15.9%)
- Border: hsl(240 3.7% 15.9%)

(Use shadcn/ui default theme colors)
```

---

### Feature 8: Smooth Scrolling & Navigation
**Priority:** P1 (Should Have)

**User Story:**  
As a user  
I want smooth navigation between sections  
So that I have a pleasant browsing experience

**Acceptance Criteria:**
```gherkin
Scenario: Smooth scroll navigation
  Given I click on a navigation link
  When the link points to a section on the same page
  Then the page smoothly scrolls to that section
  And the section comes into focus with proper offset

Scenario: Navigation visibility
  Given I scroll down the page
  When I pass the hero section
  Then the navigation should become sticky (optional)
  And the active section should be highlighted in the nav

Scenario: Back to top
  Given I have scrolled past the hero section
  When I see the back to top button
  And I click it
  Then the page smoothly scrolls to the top
```

**Navigation Requirements:**
- Optional sticky header with section links
- Smooth scroll behavior (CSS scroll-behavior: smooth or JS)
- Active section highlighted in nav
- Back to top button appears after scrolling past hero

---

## 5. Non-Functional Requirements

### 5.1 Accessibility (WCAG 2.2 Level AA)

**Requirement ID:** NFR-001  
**Priority:** P0 (Must Have)

**Criteria:**
```gherkin
Feature: WCAG 2.2 AA Compliance

Scenario: Keyboard Navigation
  Given I am using only a keyboard
  Then all interactive elements should be keyboard navigable
  And focus indicators should be clearly visible (3:1 contrast minimum)
  And I can tab through elements in logical order
  And I can activate all interactive elements with Enter/Space

Scenario: Color Contrast
  Given I view the site in light mode
  Then normal text contrast should be at least 4.5:1
  And large text (18pt+) contrast should be at least 3:1
  
  Given I view the site in dark mode
  Then all contrast requirements should still be met

Scenario: Semantic Structure
  Then the page should use semantic HTML:
    - <header> for header
    - <nav> for navigation
    - <main> for main content
    - <section> for sections
    - <footer> for footer
  And headings should follow logical hierarchy (h1 -> h2 -> h3)

Scenario: Alternative Text
  Given there are images on the page
  Then all images should have descriptive alt text
  And decorative images should have alt=""

Scenario: Form Accessibility (if contact form exists)
  Then all form inputs should have associated <label> elements
  And error messages should be announced to screen readers
  And required fields should be clearly indicated

Scenario: Skip to Content
  Given I am using a keyboard or screen reader
  Then I should have a "Skip to main content" link
  And it should be the first focusable element

Scenario: No Auto-play
  Then there should be no auto-playing media
  And any media should have user controls

Scenario: Text Resize
  Given I increase text size to 200%
  Then all content should remain readable and functional
  And there should be no loss of information
```

**Testing:**
- Axe DevTools audit (0 violations)
- WAVE tool validation
- Keyboard-only navigation test
- Screen reader testing (NVDA/JAWS/VoiceOver)
- Manual color contrast checking

---

### 5.2 Performance

**Requirement ID:** NFR-002  
**Priority:** P0 (Must Have)

**Criteria:**
```gherkin
Feature: Web Performance

Scenario: Core Web Vitals
  Given I test the site with Lighthouse
  Then the Largest Contentful Paint (LCP) should be < 2.5s
  And the First Input Delay (FID) should be < 100ms
  And the Cumulative Layout Shift (CLS) should be < 0.1

Scenario: Lighthouse Scores
  Given I run a Lighthouse audit
  Then the Performance score should be > 90
  And the Accessibility score should be 100
  And the Best Practices score should be > 90
  And the SEO score should be > 90

Scenario: Image Optimization
  Then all images should use WebP format with fallbacks
  And images should use responsive srcset
  And images below the fold should lazy load

Scenario: Code Optimization
  Then JavaScript bundles should use code splitting
  And unused code should be tree-shaken
  And there should be minimal third-party scripts

Scenario: Asset Delivery
  Then static assets should be served from a CDN
  And assets should have proper caching headers
```

---

### 5.3 Responsiveness

**Requirement ID:** NFR-003  
**Priority:** P0 (Must Have)

**Breakpoints:**
```
- Mobile Small: 320px - 374px
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Desktop Large: 1440px+
```

**Criteria:**
```gherkin
Feature: Responsive Design

Scenario Outline: Device Testing
  Given I view the site on a <device>
  Then the layout should adapt appropriately
  And all content should be readable
  And all interactive elements should be usable
  And images should scale properly

  Examples:
    | device |
    | iPhone SE (375px) |
    | iPhone 12/13/14 Pro (390px) |
    | iPad (768px) |
    | iPad Pro (1024px) |
    | Desktop (1280px) |
    | Desktop Large (1440px) |
    | Desktop XL (1920px) |

Scenario: Touch Targets (Mobile)
  Given I am on a mobile device
  Then all touch targets should be at least 44x44px
  And there should be adequate spacing between interactive elements
```

---

### 5.4 SEO Optimization

**Requirement ID:** NFR-004  
**Priority:** P1 (Should Have)

**Criteria:**
```gherkin
Feature: SEO Optimization

Scenario: Meta Tags
  Then the page should have:
    - Title: "Myrzan Izimbetov | Product Designer | +$4M MRR Impact"
    - Description: 150-160 char description highlighting key achievements
    - Open Graph tags for social sharing
    - Twitter Card tags
    - Canonical URL

Scenario: Structured Data
  Then the page should include JSON-LD structured data:
    - Person schema with name, role, location
    - ProfilePage schema
    - Contact information

Scenario: Technical SEO
  Then the site should have:
    - Robots.txt configured
    - Sitemap.xml generated
    - Proper heading hierarchy
    - Fast load times (contributes to SEO ranking)
```

---

### 5.5 Browser Compatibility

**Requirement ID:** NFR-005  
**Priority:** P0 (Must Have)

**Supported Browsers:**
- Chrome/Edge 100+
- Firefox 100+
- Safari 15+
- iOS Safari 15+
- Samsung Internet 15+

**Criteria:**
```gherkin
Feature: Browser Compatibility

Scenario: Cross-Browser Testing
  Given I test on supported browsers
  Then all features should work correctly
  And the visual design should be consistent
  And there should be no console errors

Scenario: Graceful Degradation
  Given JavaScript is disabled
  Then core content should still be accessible
  And the site should provide a basic experience

Scenario: CSS Feature Detection
  Given a browser doesn't support certain CSS features
  Then appropriate fallbacks should be in place
  And the site should still be usable
```

---

## 6. Design System & UI Components

### 6.1 shadcn/ui Component Usage

**Core Components to Use:**
```javascript
// Installation commands
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card badge separator avatar tooltip tabs
```

**Component Mapping:**
- **Button** - for CTAs and links
- **Card** - for project cards
- **Badge** - for tags/skills
- **Separator** - for section dividers
- **Avatar** - for profile image
- **Tooltip** - for additional info
- **Tabs** - if organizing content (optional)

**Component Customization:**
- Maintain shadcn's default theme for consistency
- Customize accent colors if needed for brand
- Ensure all components meet accessibility standards

---

### 6.2 Typography Scale

**Font Family:**
- Primary: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- Code: "Fira Code", "Consolas", monospace (if needed)

**Type Scale:**
```css
/* Desktop */
h1: 64px (4rem) - Hero name
h2: 48px (3rem) - Section headings
h3: 32px (2rem) - Subsections
h4: 24px (1.5rem) - Card titles
body: 18px (1.125rem)
small: 16px (1rem)
caption: 14px (0.875rem)

/* Mobile */
h1: 40px (2.5rem)
h2: 32px (2rem)
h3: 24px (1.5rem)
h4: 20px (1.25rem)
body: 16px (1rem)
small: 14px (0.875rem)
caption: 12px (0.75rem)
```

**Line Height:**
- Headings: 1.2
- Body: 1.6
- Small text: 1.5

**Font Weights:**
- Light: 300 (use sparingly)
- Regular: 400 (body text)
- Medium: 500 (emphasis)
- Semibold: 600 (subheadings)
- Bold: 700 (headings)

---

### 6.3 Spacing System

**Using Tailwind's 8px base:**
```
xs: 4px (space-1)
sm: 8px (space-2)
md: 16px (space-4)
lg: 24px (space-6)
xl: 32px (space-8)
2xl: 48px (space-12)
3xl: 64px (space-16)
4xl: 96px (space-24)
5xl: 128px (space-32)
```

**Section Spacing:**
- Between sections: 96px (desktop), 64px (mobile)
- Within sections: 48px (desktop), 32px (mobile)
- Between elements: 24px
- Between related items: 16px

---

### 6.4 Color Palette

**Using shadcn/ui default theme:**

**Light Mode:**
```css
--background: 0 0% 100%;
--foreground: 240 10% 3.9%;
--card: 0 0% 100%;
--card-foreground: 240 10% 3.9%;
--primary: 240 5.9% 10%;
--primary-foreground: 0 0% 98%;
--muted: 240 4.8% 95.9%;
--muted-foreground: 240 3.8% 46.1%;
--accent: 240 4.8% 95.9%;
--accent-foreground: 240 5.9% 10%;
--border: 240 5.9% 90%;
```

**Dark Mode:**
```css
--background: 240 10% 3.9%;
--foreground: 0 0% 98%;
--card: 240 10% 3.9%;
--card-foreground: 0 0% 98%;
--primary: 0 0% 98%;
--primary-foreground: 240 5.9% 10%;
--muted: 240 3.7% 15.9%;
--muted-foreground: 240 5% 64.9%;
--accent: 240 3.7% 15.9%;
--accent-foreground: 0 0% 98%;
--border: 240 3.7% 15.9%;
```

**Custom Accents (Optional):**
- Choose 1-2 accent colors that reflect personal brand
- Ensure all colors pass WCAG AA contrast requirements

---

### 6.5 Animation & Motion

**Principles:**
- Subtle and purposeful
- Respects `prefers-reduced-motion`
- Enhances usability, doesn't distract
- Duration: 150-300ms for most animations

**Animation Library:**
- **Framer Motion** for complex animations
- **CSS transitions** for simple hover states

**Common Animations:**
```javascript
// Fade in on scroll
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Hover lift
const hoverLift = {
  rest: { scale: 1 },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.2 } }
};

// Stagger children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

**Animation Usage:**
- Fade in sections on scroll
- Hover lift on project cards
- Smooth theme transitions
- Stagger animation for project grid
- Subtle parallax (if appropriate)

**Accessibility Consideration:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Content Structure

### 7.1 Information Architecture

```
Portfolio Website
│
├── Hero Section
│   ├── Name & Title
│   ├── Value Proposition
│   ├── Key Metrics Highlight
│   ├── Profile Image/Avatar
│   ├── Contact Quick Links (LinkedIn, Telegram, Email)
│   └── Location
│
├── Featured Projects
│   ├── Section Title: "Featured Work"
│   ├── Project Grid (2 cols desktop, 1 col mobile)
│   │
│   ├── Project Card 1: BI Group - Conversion
│   │   ├── Title: "BI Group: +54% mobile conversion"
│   │   ├── Description
│   │   ├── Thumbnail
│   │   └── Link to Notion case study
│   │
│   ├── Project Card 2: BI Group - Design System
│   ├── Project Card 3: Technodom
│   ├── Project Card 4: ōzen
│   ├── Project Card 5: Beeline - Design System
│   ├── Project Card 6: Beeline - UX Research
│   └── Project Card 7: UI Shots
│
├── Work Experience
│   ├── Section Title: "Experience"
│   ├── Timeline Component
│   │
│   ├── BI Group (2023-Present)
│   ├── Beeline (2022-2023)
│   ├── Petrel AI (2022)
│   ├── Technodom Operator (2020-2022)
│   └── Vlife (2020)
│
├── Mentoring (Optional - P1)
│   ├── Section Title: "Mentoring & Knowledge Sharing"
│   └── Content TBD
│
├── About (Optional - P1)
│   ├── Section Title: "About Me"
│   └── Content TBD
│
└── Contact / Footer
    ├── Section Title: "Let's Connect"
    ├── Contact Methods
    │   ├── Email
    │   ├── LinkedIn
    │   └── Telegram
    ├── Optional Contact Form
    └── Footer
        ├── Copyright
        └── Location
```

### 7.2 Content Inventory

**✅ Content Ready:**
- Name: Myrzan Izimbetov
- Location: London, UK
- Value proposition (full text provided)
- Project titles and links (7 projects)
- Work experience (5 companies with dates and descriptions)
- Contact information (Email, LinkedIn, Telegram)

**⏳ Content Needed:**
- Professional headshot/avatar image
- Project thumbnail images (7 images, ~800x600px)
- Mentoring section content (if included)
- About section paragraph (if included)
- Skills/tools list (optional)
- Testimonials (optional)

**📝 Content Guidelines:**
- Keep descriptions concise (max 2 sentences per project)
- Emphasize measurable outcomes
- Use active voice
- Maintain professional but approachable tone

---

## 8. User Flows

### 8.1 Primary User Flow: Portfolio Exploration

```gherkin
Feature: Portfolio Exploration

Scenario: First-time visitor discovering portfolio
  Given a user lands on the homepage
  When the page loads
  Then they see the hero section with clear value proposition
  And they understand Myrzan's key achievements immediately

  When they scroll down
  Then they see the featured projects section
  And each project displays its impact/outcome

  When they click on a project card
  Then they are taken to the detailed case study on Notion
  And the link opens in a new tab

  When they return to the main site (using back button)
  And continue scrolling to work experience
  Then they understand Myrzan's career progression
  And they see the scale of companies he's worked with

  When they reach the bottom of the page
  Then they find multiple ways to contact Myrzan
  And they can easily initiate contact
```

### 8.2 Contact Flow

```gherkin
Feature: Contacting Myrzan

Scenario: User wants to get in touch
  Given a user is interested in reaching out
  When they scroll to the contact section
  Then they see multiple contact options:
    - Email
    - LinkedIn
    - Telegram

  When they click the email link
  Then their default email client opens
  And the recipient is pre-filled with izimbetov.myrzan@gmail.com

  When they click LinkedIn
  Then a new tab opens
  And they are taken to Myrzan's LinkedIn profile

  When they click Telegram
  Then a new tab opens
  And they can message on Telegram
```

### 8.3 Theme Switching Flow

```gherkin
Feature: Theme Preference

Scenario: Switching between light and dark mode
  Given a user prefers dark mode
  When they click the theme toggle
  Then the site switches to dark mode
  And the preference is saved
  And all subsequent visits use dark mode

  When they later prefer light mode
  And they click the toggle again
  Then the site switches to light mode
  And the preference updates
```

---

## 9. Development Phases

### Phase 1: Foundation & Setup
**Duration:** Days 1-2  
**Priority:** P0

**Tasks:**
- [ ] Initialize Next.js project with TypeScript
- [ ] Install and configure shadcn/ui
- [ ] Setup Tailwind CSS
- [ ] Configure ESLint and Prettier
- [ ] Setup Git repository
- [ ] Create basic folder structure
- [ ] Implement theme switcher with CSS variables
- [ ] Test light/dark mode functionality
- [ ] Setup responsive layout shell

**Definition of Done:**
- Dev environment runs locally without errors
- Dark/light mode toggle works and persists
- Basic responsive layout shell in place
- Code quality tools configured

---

### Phase 2: Core Content Implementation
**Duration:** Days 3-5  
**Priority:** P0

**Tasks:**
- [ ] Build Hero Section
  - [ ] Name and title
  - [ ] Value proposition with metric highlighting
  - [ ] Contact quick links
  - [ ] Profile image placeholder
  - [ ] Responsive layout
  
- [ ] Build Featured Projects Section
  - [ ] Project cards component
  - [ ] Grid layout (2 cols desktop, 1 col mobile)
  - [ ] Add all 7 projects with content
  - [ ] Link to Notion case studies
  - [ ] Image placeholders or actual images
  
- [ ] Build Work Experience Section
  - [ ] Timeline component
  - [ ] Add all 5 work experiences
  - [ ] Responsive timeline (vertical on all sizes)
  - [ ] Highlight current role
  
- [ ] Build Contact Section
  - [ ] Contact information display
  - [ ] Footer with location and copyright

**Definition of Done:**
- All sections render with real content
- All links work and open correctly
- Layout is fully responsive on all breakpoints
- Semantic HTML structure in place

---

### Phase 3: Interactions & Polish
**Duration:** Days 6-7  
**Priority:** P1

**Tasks:**
- [ ] Add Framer Motion for animations
- [ ] Implement fade-in on scroll for sections
- [ ] Add hover states to project cards (lift effect)
- [ ] Implement smooth scrolling
- [ ] Add stagger animation to project grid
- [ ] Polish theme transition animation
- [ ] Add back-to-top button (if needed)
- [ ] Refine spacing and typography
- [ ] Add micro-interactions

**Definition of Done:**
- Animations are smooth and purposeful
- Hover states provide clear feedback
- Site feels polished and professional
- All animations respect prefers-reduced-motion

---

### Phase 4: Optimization & Accessibility
**Duration:** Days 8-9  
**Priority:** P0

**Tasks:**
- [ ] Optimize images (convert to WebP, add srcset)
- [ ] Implement lazy loading for below-fold images
- [ ] Code splitting and bundle optimization
- [ ] Run Lighthouse audit and fix issues
- [ ] Run Axe DevTools and fix accessibility violations
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Add skip-to-content link
- [ ] Verify all color contrasts (WCAG AA)
- [ ] Add proper alt text to all images
- [ ] Test on multiple browsers
- [ ] Test on multiple devices/screen sizes

**Definition of Done:**
- Lighthouse Performance score > 90
- Lighthouse Accessibility score = 100
- Axe DevTools shows 0 violations
- Keyboard navigation works completely
- WCAG 2.2 AA compliance verified
- Works on all supported browsers

---

### Phase 5: SEO & Deployment
**Duration:** Days 10-11  
**Priority:** P1

**Tasks:**
- [ ] Add meta tags (title, description)
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Implement JSON-LD structured data
- [ ] Create robots.txt
- [ ] Generate sitemap.xml
- [ ] Configure canonical URLs
- [ ] Setup custom domain (if applicable)
- [ ] Deploy to Vercel/Netlify
- [ ] Test production build
- [ ] Verify all links work in production
- [ ] Setup analytics (optional)
- [ ] Final QA checklist

**Definition of Done:**
- Site is live on production domain
- All meta tags present and correct
- SEO tools show no major issues
- Production performance matches local
- All stakeholders approve

---

## 10. Testing & Quality Assurance

### 10.1 Acceptance Testing Checklist

**Functional Testing:**
- [ ] All sections render correctly
- [ ] All internal links navigate properly
- [ ] All external links open in new tabs
- [ ] All external links have rel="noopener noreferrer"
- [ ] Theme switcher works correctly
- [ ] Theme preference persists across sessions
- [ ] Theme respects system preference on first visit
- [ ] Contact links work (mailto, LinkedIn, Telegram)
- [ ] Site is fully responsive (test all breakpoints)
- [ ] No console errors in browser
- [ ] No React warnings in development

**Performance Testing:**
- [ ] Lighthouse Performance score > 90
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] TTI (Time to Interactive) < 3.5s
- [ ] Total bundle size < 200KB gzipped
- [ ] Images are optimized (WebP with fallbacks)
- [ ] Images use lazy loading where appropriate
- [ ] No layout shifts on page load

**Accessibility Testing:**
- [ ] Lighthouse Accessibility score = 100
- [ ] Axe DevTools shows 0 violations
- [ ] WAVE tool shows no errors
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators are clearly visible
- [ ] Tab order is logical
- [ ] Skip-to-content link works
- [ ] Screen reader announces content correctly (test with NVDA/JAWS/VoiceOver)
- [ ] All images have appropriate alt text
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large)
- [ ] Form fields have associated labels (if contact form exists)
- [ ] No auto-playing media
- [ ] Text can resize to 200% without breaking layout
- [ ] Semantic HTML used throughout

**Visual/Design Testing:**
- [ ] Typography is clear and readable
- [ ] Spacing is consistent throughout
- [ ] Alignment is precise
- [ ] Colors match design intent
- [ ] Dark mode looks polished
- [ ] Light mode looks polished
- [ ] Animations enhance experience (not distract)
- [ ] Hover states are clear and consistent
- [ ] No visual bugs or glitches

**Browser Compatibility Testing:**
- [ ] Chrome (latest) - Desktop
- [ ] Chrome (latest) - Mobile
- [ ] Firefox (latest) - Desktop
- [ ] Firefox (latest) - Mobile
- [ ] Safari (latest) - Desktop
- [ ] Safari (latest) - iOS
- [ ] Edge (latest) - Desktop
- [ ] Samsung Internet - Mobile

**Content Testing:**
- [ ] All text is free of typos and grammatical errors
- [ ] All metrics are accurate (+$4M MRR, +37% growth, etc.)
- [ ] All project links go to correct Notion pages
- [ ] Contact information is correct and up-to-date
- [ ] Company names and dates are accurate
- [ ] All content is properly formatted

**Security Testing:**
- [ ] External links have rel="noopener noreferrer"
- [ ] No sensitive information exposed
- [ ] HTTPS enabled (in production)
- [ ] Security headers configured

---

### 10.2 Post-Launch Metrics (30-day targets)

**Engagement Metrics:**
- [ ] Unique visitors: 50+
- [ ] Average session duration: > 2 minutes
- [ ] Bounce rate: < 60%
- [ ] Pages per session: > 1.5

**Action Metrics:**
- [ ] Contact link clicks: 10+
- [ ] LinkedIn profile clicks: 5+
- [ ] Project case study clicks: 15+

**Performance Metrics:**
- [ ] Lighthouse Performance score maintained > 90
- [ ] Core Web Vitals remain green
- [ ] No performance degradation over time

**Qualitative Metrics:**
- [ ] Positive feedback: 3+ comments/messages
- [ ] Job interview requests: 1+
- [ ] Portfolio added to collections/favorites: 2+

---

## 11. Risk Management

### 11.1 Risk Assessment Matrix

| Risk | Impact | Likelihood | Mitigation Strategy | Owner |
|------|--------|------------|---------------------|-------|
| **Content delays** (images, copy) | High | Medium | Use high-quality placeholders; iterate content post-launch | Myrzan |
| **Performance issues** with animations | Medium | Low | Test early; use CSS over JS; implement prefers-reduced-motion | Developer |
| **Accessibility violations** | High | Low | Regular testing with Axe; manual keyboard/SR testing; follow WCAG checklist | Developer |
| **Design doesn't stand out** | High | Medium | Reference top portfolio sites; get peer feedback early; A/B test if possible | Myrzan |
| **Browser compatibility** issues | Medium | Low | Test on real devices early; use feature detection; progressive enhancement | Developer |
| **Slow load times** | High | Low | Optimize images; minimize bundles; use CDN; monitor Core Web Vitals | Developer |
| **Theme switching bugs** | Low | Medium | Thorough testing; use CSS custom properties; test FOUC prevention | Developer |
| **Mobile layout issues** | Medium | Low | Mobile-first development; test on real devices; responsive images | Developer |
| **Link rot** (Notion links change) | Medium | Low | Document all external links; consider migrating case studies to main site later | Myrzan |
| **SEO underperformance** | Medium | Medium | Implement all SEO best practices; structured data; submit to search consoles | Developer |

---

## 12. Future Enhancements (Post-V1)

### 12.1 Phase 2 Features (V2)

**Content Enhancements:**
- [ ] Blog section for design articles and thoughts
- [ ] Detailed case study pages on main site (migrate from Notion)
- [ ] Testimonials section with quotes from colleagues/clients
- [ ] Skills/tools section with visual representation
- [ ] Download resume/CV button with PDF

**Interactive Features:**
- [ ] Filterable project gallery (by category, year, company)
- [ ] Search functionality for blog posts
- [ ] Contact form with backend (EmailJS or similar)
- [ ] Newsletter signup (if starting a newsletter)
- [ ] RSS feed for blog

**Visual Enhancements:**
- [ ] Custom illustrations or graphics
- [ ] 3D elements or advanced animations (if on-brand)
- [ ] Video case study walkthroughs
- [ ] Before/after sliders for redesign projects
- [ ] Interactive design process visualization

**Technical Improvements:**
- [ ] Internationalization (i18n) for multiple languages
- [ ] CMS integration for easier content updates
- [ ] Progressive Web App (PWA) features
- [ ] Advanced analytics and heat mapping
- [ ] A/B testing framework

---

### 12.2 Long-term Vision (V3+)

- Personal design blog with regular updates
- Curated resources section for designers
- Community features (comments, discussions)
- Design tool/resource builder
- Workshop/course platform
- Mentorship matching platform

---

## 13. Appendices

### 13.1 Reference Links

**Design Inspiration:**
- shadcn/ui Documentation: https://ui.shadcn.com/docs
- Vercel Design System: https://vercel.com/design
- Portfolio References:
  - https://brittanychiang.com/
  - https://jacekjeznach.com/
  - https://bruno-simon.com/

**Technical Documentation:**
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- WCAG 2.2: https://www.w3.org/WAI/WCAG22/quickref/
- Core Web Vitals: https://web.dev/vitals/

**Tools & Testing:**
- Lighthouse: https://pagespeed.web.dev/
- Axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- Contrast Checker: https://webaim.org/resources/contrastchecker/
- Can I Use: https://caniuse.com/

---

### 13.2 Notion Case Study Links

**Project Links (to be maintained):**
1. BI Group Conversion: https://www.notion.so/BI-Group-54-mobile-conversion-rate-after-6-week-redesign-1d325685172280edb5e9e1d6e2887140
2. BI Group Design System: https://www.notion.so/How-I-Scaled-BI-Group-s-Design-System-with-Tokens-and-Dark-Theme-Support-27a2568517228036aa54de6f393b0ecc
3. Technodom: https://www.notion.so/Technodom-Credit-Flow-Redesign-35-Conversions-27a25685172280eda760c9dd6d8ede69
4. ōzen: https://www.notion.so/zen-Web3-Music-Platform-Inside-Telegram-27a256851722806ab007e006b4d717fb
5. Beeline Design System: https://www.notion.so/Beeline-From-Design-Porridge-to-Systematic-Harmony-1d325685172281ad90f1dc6b198ee88b
6. Beeline UX Research: https://www.notion.so/Beeline-UX-research-bundle-in-E-com-1d3256851722813da3d5c5493eed92d5
7. UI Shots: https://www.notion.so/UI-Shots-81462643fb0543f4a5aac684d2e4c91c

---

### 13.3 Contact Information

**Product Owner:** Myrzan Izimbetov

**Contact:**
- Email: izimbetov.myrzan@gmail.com
- LinkedIn: https://www.linkedin.com/in/myrzanio/
- Telegram: https://t.me/myrzanio
- Location: London, UK

**Availability:** Feel free to drop a line

---

### 13.4 Project Metadata

**Project Name:** Portfolio Website  
**Project Code:** PORTFOLIO-V1  
**Start Date:** February 8, 2026  
**Target Launch:** February 19, 2026 (11 days)  
**Technology Stack:** Next.js, TypeScript, shadcn/ui, Tailwind, Framer Motion  
**Deployment:** Vercel  
**Repository:** [To be created]

---

## 14. Glossary

**Technical Terms:**
- **DAU:** Daily Active Users - metric measuring daily user engagement
- **MRR:** Monthly Recurring Revenue - predictable monthly revenue
- **WCAG:** Web Content Accessibility Guidelines - standards for web accessibility
- **LCP:** Largest Contentful Paint - performance metric for load speed
- **FID:** First Input Delay - performance metric for interactivity
- **CLS:** Cumulative Layout Shift - performance metric for visual stability
- **TTI:** Time to Interactive - performance metric for usability
- **shadcn/ui:** Component library built on Radix UI and Tailwind CSS
- **Framer Motion:** Production-ready animation library for React
- **FOUC:** Flash of Unstyled Content - visual glitch during page load

**Design Terms:**
- **Design System:** Collection of reusable components and guidelines
- **Component:** Reusable UI element (button, card, etc.)
- **Breakpoint:** Screen size where layout changes (responsive design)
- **Semantic HTML:** HTML that conveys meaning (header, nav, main, etc.)
- **Progressive Enhancement:** Building core experience first, then adding enhancements

---

## 15. Sign-Off & Approval

**Product Requirements Approved By:**

**Product Owner:** ________________________  
Name: Myrzan Izimbetov  
Date: _______________

**Development Team Acknowledgment:**

**Lead Developer:** ________________________  
Name: _______________  
Date: _______________

**Notes:**
This PRD serves as the source of truth for the portfolio website project. Any changes to scope, features, or requirements should be documented and approved by the product owner.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 8, 2026 | Claude AI | Initial PRD creation based on requirements and Notion content |

---

**End of Product Requirements Document**

**Next Steps:**
1. Review and approve this PRD
2. Gather remaining content (images, additional copy)
3. Setup development environment
4. Begin Phase 1: Foundation & Setup
5. Regular check-ins and progress reviews

**Questions or Feedback:**
Please direct all questions and feedback to Myrzan Izimbetov via email or Telegram.

---

*This PRD is designed for use with Claude Code and follows industry-standard PRD practices with Gherkin-style acceptance criteria for clear, testable requirements.*
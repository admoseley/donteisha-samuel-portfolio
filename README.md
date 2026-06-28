# D. Samuel — Instructional & Learner Experience Design Portfolio

A professionally designed, fully static multi-page portfolio website for **D. Samuel**, an instructional designer and learner experience designer transitioning from 12 years in elementary education into the L&D field.

**Live site:** https://admoseley.github.io/donteisha-samuel-portfolio/
**GitHub repository:** https://github.com/admoseley/donteisha-samuel-portfolio

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Site Structure & Pages](#2-site-structure--pages)
3. [Design System — "Forest & Stone"](#3-design-system--forest--stone)
4. [Typography](#4-typography)
5. [File & Folder Map](#5-file--folder-map)
6. [Projects & PDF Artifacts](#6-projects--pdf-artifacts)
7. [Written Essays](#7-written-essays)
8. [JavaScript Behaviors](#8-javascript-behaviors)
9. [Animations & Accessibility](#9-animations--accessibility)
10. [Responsive Design](#10-responsive-design)
11. [Hosting & Deployment](#11-hosting--deployment)
12. [Local Development](#12-local-development)
13. [How to Update Content](#13-how-to-update-content)
14. [Pending Tasks](#14-pending-tasks)
15. [Design Decisions & History](#15-design-decisions--history)

---

## 1. Project Overview

This portfolio was built from the ground up to replace an earlier Wix-hosted site. The original site had several credibility and usability problems — including a Wix free-tier advertising banner, circular navigation buttons that opened new tabs unexpectedly, duplicate project copy, and a color palette (red/orange accents, near-black panels) that was not well-received by the client.

The redesign goals were:

- **Professional credibility** — no third-party branding, no free-tier banners
- **Honest framing** — projects are clearly labeled as concept/coursework work, using "If implemented, I'd measure..." language rather than fabricated metrics
- **Learner-centered UX** — the site itself demonstrates the same clarity and accessibility principles D. Samuel brings to learning design
- **True multi-page architecture** — each section of the site is its own `.html` file with a shared nav, stylesheet, and JS, replacing the original single-page scroll
- **Self-contained PDFs** — all three project artifacts are hosted directly in the `docs/` folder; no external file hosting services with expiring links
- **Native essays** — all three blog posts from the Wix site were migrated and rebuilt as fully themed HTML pages, removing the dependency on the Wix blog

---

## 2. Site Structure & Pages

The site has **9 HTML pages** total: 5 primary pages and 3 essay pages.

### Primary Pages

| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Home — hero, value strip, closing CTA |
| `work.html` | `/work.html` | Selected Work — 3 concept/coursework projects |
| `about.html` | `/about.html` | About — Mission, Vision, Skills & Toolkit |
| `writing.html` | `/writing.html` | Writing index — 3 essay cards |
| `contact.html` | `/contact.html` | Contact — email + contact form |

### Essay Pages

| File | URL | Category |
|---|---|---|
| `honesty-integrity-and-learner-centered-design.html` | `/honesty-integrity-and-learner-centered-design.html` | Craft & ethics |
| `designing-my-next-chapter-in-learning-experience-design.html` | `/designing-my-next-chapter-in-learning-experience-design.html` | Career |
| `from-content-to-capability.html` | `/from-content-to-capability.html` | Future of L&D |

### Navigation Flow

```
Home (index.html)
├── Work (work.html)
│   ├── → docs/onboarding-workshop.pdf          [opens in new tab]
│   ├── → docs/my-future-my-fit.pdf             [opens in new tab]
│   └── → docs/implementation-evaluation-reflection.pdf  [opens in new tab]
├── About (about.html)
├── Writing (writing.html)
│   ├── → honesty-integrity-and-learner-centered-design.html
│   ├── → designing-my-next-chapter-in-learning-experience-design.html
│   └── → from-content-to-capability.html
└── Contact (contact.html)
```

Each page links back to every other page through the shared navigation header and footer. Essay pages also include a "More writing" section with cards linking to the other two essays.

---

## 3. Design System — "Forest & Stone"

All colors are defined as CSS custom properties in `styles.css` under `:root`. Every component references these tokens — no hard-coded color values appear elsewhere in the stylesheet.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--sand` | `#EFE9DD` | Page background — warm stone |
| `--sand-deep` | `#E6DECF` | Alternate-banded sections (closing CTA, more-writing) |
| `--cream` | `#F6F1E7` | Cards, form panels, references block |
| `--ink` | `#1F1B16` | Primary headings — warm near-black |
| `--ink-soft` | `#4A4239` | Body copy — WCAG AA compliant on `--sand` |
| `--ink-muted` | `#5C5349` | Labels, meta text, captions |
| `--evergreen` | `#2C4A3A` | Primary brand color — CTAs, underlines, borders |
| `--evergreen-d` | `#213829` | Darker green — hover states |
| `--panel` | `#1E3328` | Deep forest — footer background, skills sidebar |
| `--terracotta` | `#A98B4B` | Brass accent — safe on dark surfaces; decorative on light |
| `--brass-d` | `#735821` | Deeper brass — WCAG AA safe for small text on light BG |
| `--line` | `#CFC3A8` | Hairline borders — warm tan, not cold grey |
| `--shadow` | `24px 28px 60px -32px rgba(31,27,22,0.42)` | Layered warm shadow |

### Why "Forest & Stone"?

The palette was chosen specifically to avoid:
- Red/orange tones (too aggressive, not well-received by the client)
- Pure black or near-black panels (`#000`/`#111`) that felt stark and corporate

The Forest & Stone palette communicates professionalism, warmth, and natural groundedness — qualities that align with D. Samuel's educator background and learner-centered design philosophy.

### Grain Texture

A subtle SVG fractal noise texture is overlaid on the entire page using `body::before`. It's a fixed pseudo-element at `opacity: 0.04` with `pointer-events: none`, giving the sand background a faint paper/stone texture. It's near-invisible in normal use but adds perceptible depth when viewed at full resolution.

---

## 4. Typography

Two Google Fonts typefaces are used throughout the site, loaded via `<link>` in each page's `<head>`:

### Fraunces (Display)
- **Role:** Headings, pull quotes, brand name, project numbers, bylines
- **Variable axes:** Optical size (`opsz 9–144`), italic, weights 400–700
- **Why:** An expressive variable serif with strong editorial character. The italic variant provides contrast within headlines (`<em>` words render in italic evergreen green).

### Hanken Grotesk (Body)
- **Role:** Body copy, navigation links, labels, form elements, UI text
- **Weights loaded:** 400, 500, 600, 700
- **Why:** A clean, modern geometric sans-serif. Highly readable at small sizes and pairs well with the display serif without competing.

### Sizing Strategy
All major headline sizes use `clamp()` for fluid typography:
```css
/* Example — hero headline */
font-size: clamp(2.9rem, 6.4vw, 5.1rem);
/* Minimum: 2.9rem | Preferred: 6.4% of viewport width | Maximum: 5.1rem */
```
This means type scales smoothly between mobile and desktop without breakpoint-specific overrides.

---

## 5. File & Folder Map

```
donteisha-portfolio/
│
├── index.html                    ← Home page
├── work.html                     ← Selected Work (3 projects + PDF links)
├── about.html                    ← About (Mission, Vision, Skills)
├── writing.html                  ← Writing index (3 essay cards)
├── contact.html                  ← Contact (email + form)
│
├── honesty-integrity-and-learner-centered-design.html
├── designing-my-next-chapter-in-learning-experience-design.html
├── from-content-to-capability.html
│
├── styles.css                    ← Shared stylesheet — ALL pages reference this
├── site.js                       ← Shared JavaScript — loaded on all pages
│
├── docs/
│   ├── onboarding-workshop.pdf               ← Project 01 artifact (5.9 MB, 30 pages)
│   ├── my-future-my-fit.pdf                  ← Project 02 artifact (749 KB, 14 pages)
│   └── implementation-evaluation-reflection.pdf  ← Project 03 artifact (116 KB, 4 pages)
│
├── headshot.jpg                  ← ADD THIS to replace the "DS" monogram
│                                    (file must be named exactly headshot.jpg)
│
├── .nojekyll                     ← Tells GitHub Pages to skip Jekyll processing
├── .gitignore                    ← Excludes .DS_Store and other system files
└── README.md                     ← This file
```

---

## 6. Projects & PDF Artifacts

All three project PDFs are hosted in the `docs/` folder and served directly from GitHub's CDN alongside the HTML files.

### Project 01 — Onboarding Workshop for New Instructional Designers
- **File:** `docs/onboarding-workshop.pdf`
- **Size:** 5.9 MB · 30 pages
- **Frameworks:** ADDIE, adult learning principles, facilitation design
- **Framing:** Concept project — designed during ID coursework. Uses "if implemented" language for success metrics.
- **Origin:** Downloaded from Wix file hosting and compressed with Ghostscript (from ~12 MB to 5.9 MB at 150 dpi).

### Project 02 — My Future, My Fit: Instructional Materials & Assessment
- **File:** `docs/my-future-my-fit.pdf`
- **Size:** 749 KB · 14 pages
- **Frameworks:** Backward Design (Wiggins & McTighe), assessment alignment
- **Framing:** Concept project — K-12 career exploration curriculum. Demonstrates understanding of student-centered design.
- **Origin:** Downloaded from Wix file hosting and compressed (from ~9.6 MB to 749 KB).

### Project 03 — Implementation & Evaluation Reflection
- **File:** `docs/implementation-evaluation-reflection.pdf`
- **Size:** 116 KB · 4 pages
- **Frameworks:** Kirkpatrick evaluation model (4 levels), iterative design
- **Framing:** Concept project — evaluation framework and revision plan based on Kirkpatrick-style thinking.
- **Origin:** Provided directly by D. Samuel; no compression needed.

### PDF Compression Note
The two Wix-hosted PDFs were compressed using Ghostscript before being added to the repository:
```bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dBATCH -sOutputFile=output.pdf input.pdf
```
Total reduction: ~22 MB → 6.9 MB (69% smaller), keeping image quality at 150 dpi which is sufficient for portfolio artifacts viewed on screen.

---

## 7. Written Essays

All three essays were originally published on the Wix blog. They were migrated and rebuilt as native HTML pages — same theme, same fonts, same components — so visitors never leave the portfolio site to read them.

### Essay 1 — Honesty, Integrity, and Learner-Centered Design
- **File:** `honesty-integrity-and-learner-centered-design.html`
- **Category:** Craft & ethics
- **Read time:** ~2 minutes
- **Core argument:** Integrity in ID means honest problem definition, aligned assessments that measure real learning (not busywork), and a reflective revision practice that treats failure as data rather than setback.

### Essay 2 — Designing My Next Chapter in Learning Experience Design
- **File:** `designing-my-next-chapter-in-learning-experience-design.html`
- **Category:** Career
- **Read time:** ~1 minute
- **Core argument:** A career narrative covering the transition from 12 years in elementary education to instructional design — short-term goals (ID fundamentals) and 5-year vision (established LXD role, remote-first, real performance challenges).

### Essay 3 — From Content to Capability: How AI & Analytics Are Reshaping Learning Design
- **File:** `from-content-to-capability.html`
- **Category:** Future of L&D
- **Read time:** ~2 minutes
- **Core argument:** Two macro trends (generative AI and learning analytics) are increasing the need for authentic assessment design, data literacy, and ethical design practice. Includes four APA-formatted academic citations with DOI links.

### Essay Page Template
Each essay page follows this HTML structure:
```html
<article>
  <header class="article-hero">   <!-- title, standfirst, byline -->
  <div class="prose">             <!-- body content -->
</article>
<section class="more-writing">   <!-- 2 related essay cards -->
<footer>
```

---

## 8. JavaScript Behaviors

All JavaScript lives in the single file `site.js`, loaded with `defer` on every page. The file is wrapped in an IIFE to avoid polluting the global scope.

### 1. Sticky Nav Border
```js
window.addEventListener('scroll', function () {
  nav.classList.toggle('scrolled', window.scrollY > 12);
});
```
Adds `.scrolled` to `<header id="nav">` when the user scrolls past 12px. `styles.css` uses this class to show the nav's bottom border, giving a subtle "floating" effect once content scrolls underneath.

### 2. Mobile Menu Toggle
```js
toggle.addEventListener('click', function () {
  links.classList.toggle('open');
});
```
The hamburger button (`#navToggle`) toggles `.open` on `#navLinks`. The CSS slides the mobile nav panel down from behind the sticky header. Each nav link also closes the panel on click so it doesn't linger during page transitions.

### 3. Scroll Reveal (IntersectionObserver)
```js
var io = new IntersectionObserver(callback, {
  threshold: 0.08,
  rootMargin: '0px 0px -32px 0px'
});
```
Elements with `class="reveal"` start hidden (`opacity: 0`, `translateY: 28px`). The observer adds `class="in"` when 8% of the element enters the viewport, triggering a CSS transition to full opacity and no transform. Once revealed, the element is unobserved (no re-hiding).

- **threshold: 0.08** — fires when 8% of the element is visible (early enough to feel smooth, late enough that a 1px peek doesn't count)
- **rootMargin `-32px` bottom** — slightly shrinks the observation area so elements reveal just before reaching the very edge of the screen

### 4. Above-Fold Safety Net
```js
requestAnimationFrame(function () {
  var vh = window.innerHeight || document.documentElement.clientHeight;
  els.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) show(el);
  });
});
```
The IntersectionObserver only fires when elements scroll into view. Elements that are already visible on page load (e.g., mission/vision cards on `about.html`, the form on `contact.html`) would stay permanently hidden without this fix. After one animation frame (when layout is stable), any `.reveal` element already in the viewport is shown immediately.

---

## 9. Animations & Accessibility

### Hero Entrance Animation
The home page hero uses staggered CSS `@keyframes` animations (not the IntersectionObserver system) so elements animate in immediately on load:

| Element | Delay |
|---|---|
| `.eyebrow` | 0.05s |
| `h1` | 0.15s |
| `.role` | 0.28s |
| `p.lede` | 0.40s |
| `.hero-cta` | 0.52s |
| `.portrait-wrap` (pop + scale) | 0.35s |

The portrait also has a slowly rotating dashed ring (`@keyframes spin`, 60s per revolution).

### Scroll Reveal Animation
All other animated elements use the `.reveal` / `.reveal.in` class pair:
```css
.reveal     { opacity: 0; transform: translateY(28px); transition: 0.7s cubic-bezier(.2,.7,.2,1); }
.reveal.in  { opacity: 1; transform: none; }
```

### Accessibility — Reduced Motion
A `prefers-reduced-motion: reduce` media query removes all animations and transitions globally and immediately shows all `.reveal` elements:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
  .reveal { opacity: 1; transform: none; }
}
```
This ensures the site is fully usable for visitors who have enabled reduced motion in their OS settings.

### Color Contrast (WCAG 2.1 AA)
All text/background combinations in the design system meet WCAG 2.1 Level AA requirements (4.5:1 for normal text, 3:1 for large text). Key pairs verified:
- `--ink` on `--sand`: passes AA
- `--ink-soft` on `--sand`: passes AA
- `--brass-d` on `--sand` / `--cream`: passes AA (small text use)
- `--terracotta` on `--panel`: passes AA (large/decorative use)
- `--sand` on `--evergreen`: passes AA (buttons, nav CTA)

---

## 10. Responsive Design

Two breakpoints are defined at the bottom of `styles.css`:

### ≤ 900px (Tablet / Large Mobile)
- Hero grid collapses to single column; portrait moves above the text
- Value strip changes from 4-column to 2×2 grid
- About grid collapses; skills panel loses `position: sticky`
- Essay grid (3-col) and more-grid (2-col) both collapse to single column
- Contact grid collapses to single column
- Project articles collapse to single column (number, content, and CTA stack)
- PAO label/value pairs stack vertically
- Nav links become a full-width fixed dropdown panel sliding in from the top; hamburger button becomes visible

### ≤ 560px (Small Mobile)
- `.wrap` side padding reduces from 32px to 22px
- Section padding tightens
- Contact form first row (First / Last) stacks to single column
- References block padding reduces

---

## 11. Hosting & Deployment

### Current Host: GitHub Pages
The site is deployed via **GitHub Pages** from the `main` branch root.

- **Live URL:** https://admoseley.github.io/donteisha-samuel-portfolio/
- **CDN:** GitHub's global Fastly CDN (same infrastructure as GitHub.com)
- **Build:** None — static files are served directly; no build step
- **Auto-deploy:** Every `git push` to `main` triggers a Pages rebuild (typically < 60 seconds)
- **`.nojekyll`:** Required so GitHub Pages skips its Jekyll processor and serves `.html` files directly

### To Deploy Changes
```bash
cd /Users/admoseley/DeeDee_Project/donteisha-portfolio
git add <changed-files>
git commit -m "Description of change"
git push
```
The live site updates within ~60 seconds.

### Previous Host: Netlify (on hold)
The site was originally configured for Netlify at `donteisha-samuel-portfolio.netlify.app` (site ID: `a6465468-0b14-458f-b644-ba1beb8e0d9d`). Deployment is blocked due to a credit usage limit. The Netlify configuration remains intact and a future deploy can be triggered with:
```bash
cd /Users/admoseley/DeeDee_Project/donteisha-portfolio
netlify deploy --prod --no-build
```
Netlify supports "pretty URLs" (`/work` instead of `/work.html`) natively; GitHub Pages does not.

### Local Development Server
Because GitHub Pages doesn't serve pretty URLs, and `python3 -m http.server` doesn't map `/work` → `work.html`, a custom Python server was written to mirror production behavior locally:

**File:** `/private/tmp/claude-501/.../scratchpad/serve.py`
```bash
python3 /path/to/serve.py
# Serves at http://localhost:8755
```
The server tries appending `.html` to any request that doesn't resolve to a real file, exactly as Netlify does. See [Local Development](#12-local-development) for the full command.

---

## 12. Local Development

### Starting the Server
```bash
python3 /private/tmp/claude-501/-Users-admoseley-DeeDee-Project/b90f724a-d6bc-4f8b-afab-afeb9471df35/scratchpad/serve.py
```
Opens at **http://localhost:8755**

### Stopping the Server
```bash
lsof -ti:8755 | xargs kill
```

### All Routes That Work Locally
| URL | Resolves to |
|---|---|
| http://localhost:8755/ | index.html |
| http://localhost:8755/work | work.html |
| http://localhost:8755/work.html | work.html |
| http://localhost:8755/about | about.html |
| http://localhost:8755/writing | writing.html |
| http://localhost:8755/contact | contact.html |
| http://localhost:8755/from-content-to-capability | from-content-to-capability.html |
| http://localhost:8755/docs/onboarding-workshop.pdf | PDF (new tab) |
| http://localhost:8755/docs/my-future-my-fit.pdf | PDF (new tab) |
| http://localhost:8755/docs/implementation-evaluation-reflection.pdf | PDF (new tab) |

### No Build Step Required
This is a fully static site — no npm, no bundler, no framework. Edit any `.html`, `.css`, or `.js` file and refresh the browser. Changes are immediate.

---

## 13. How to Update Content

### Add a Headshot Photo
1. Name the file exactly `headshot.jpg`
2. Place it in `donteisha-portfolio/` (same folder as `index.html`)
3. The `<img>` tag in `index.html` already points to `headshot.jpg` — the monogram fallback hides automatically via `onerror`
4. Commit and push; the live site updates in ~60 seconds

### Update the Skills Panel (about.html)
Find the `.chips` groups in `about.html` and edit the `<span class="chip">` elements:
```html
<!-- Add a chip -->
<span class="chip">New Skill</span>

<!-- Remove a chip — delete the entire span -->
```

### Wire Up the Resume PDF
1. Add the file to `docs/` (e.g., `docs/resume-d-samuel.pdf`)
2. In `about.html`, update the resume link:
```html
<!-- Before -->
<a href="#" class="resume-link">Download résumé (PDF) <span class="arrow">↓</span></a>

<!-- After -->
<a href="docs/resume-d-samuel.pdf" target="_blank" rel="noopener" class="resume-link">
  Download résumé (PDF) <span class="arrow">↓</span>
</a>
```

### Add a New Essay
1. Duplicate an existing essay HTML file and update all content
2. Add a new `.more-card` block in `writing.html`'s `.essay-grid`
3. Add a card for the new essay in the `.more-writing` section of the other essay pages

### Wire Up the Contact Form (Real Email Delivery)
The form currently shows a client-side confirmation only. To actually send email, replace the `onsubmit` handler with a Formspree integration:
1. Create a free account at [formspree.io](https://formspree.io)
2. Get your form endpoint URL
3. In `contact.html`, change the opening `<form>` tag:
```html
<!-- Before: no real email sending -->
<form class="reveal" onsubmit="event.preventDefault(); ...">

<!-- After: real email via Formspree -->
<form class="reveal" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
Remove the `onsubmit` attribute entirely.

### Update a PDF
1. Replace the file in `docs/` with the new version (keep the same filename)
2. Commit and push

### Change the Copyright Year
Search all HTML files for `© 2026` and update the year. All five primary pages and three essay pages contain this text in the footer.

---

## 14. Pending Tasks

These items are known TODOs that have not yet been completed:

| Priority | Task | Notes |
|---|---|---|
| High | Add real headshot photo | Name `headshot.jpg`, place in portfolio root |
| High | Wire résumé PDF | Update `about.html` `href="#"` to real file path |
| High | Wire contact form to email backend | Use Formspree, EmailJS, or similar |
| Medium | Custom domain | e.g., `donteishasamuel.com` → GitHub Pages settings |
| Low | Review/update skill chips | Ensure they match exact current toolset |
| Low | Netlify credit limit | Clear to re-enable Netlify deploy with pretty URLs |

---

## 15. Design Decisions & History

### Why a complete rebuild instead of editing the Wix site?

The Wix free tier was the single biggest credibility problem — the advertising banner at the top of every page immediately signals to a recruiter that this is a hobby project. There is no way to remove it without a Wix paid plan. Building a fresh static site eliminates the banner entirely, gives full control over every design decision, and produces a faster, more professional result.

### Why is the work labeled "concept project" instead of showing metrics?

D. Samuel's ID portfolio is coursework — the projects were designed as part of her instructional design program and have never been deployed in a live organizational setting. Presenting fabricated metrics (e.g., "increased engagement by 40%") would be dishonest and easy for experienced hiring managers to spot. The honest framing — "if implemented, I'd measure..." — demonstrates methodological knowledge while being transparent about experience level. This is stronger than false claims.

### Why migrate the Wix blog posts instead of linking to them?

External links to Wix blog posts take visitors off the portfolio site into a Wix-branded experience (with the free-tier banner). Rebuilding the essays as native pages keeps visitors in the same designed environment, removes the banner, and makes the essays feel like a genuine part of the portfolio rather than an afterthought.

### Why GitHub Pages instead of Netlify?

Netlify was the original deployment target and is still configured. At the time of the GitHub Pages migration, Netlify had a credit usage limit that blocked all new deploys. GitHub Pages is a free permanent alternative with GitHub's global CDN, and all 9 pages + 3 PDFs serve at 200 across the board. Netlify remains available as a future option (pretty URLs, form handling, etc.) once the credit situation is resolved.

### Why a single shared `styles.css` instead of per-page stylesheets?

Every page shares the same nav, footer, typography, color tokens, buttons, and reveal animation. A single stylesheet means one file to edit when a design token changes, and the browser caches it after the first page load so subsequent page loads are faster. The stylesheet is organized into clearly named sections (see the jump-map comment at the top of `styles.css`) to make it easy to navigate.

### Why `defer` on `site.js`?

`defer` tells the browser to download the script while parsing HTML, then execute it after the HTML is fully parsed but before `DOMContentLoaded`. This means:
- No render-blocking — the page appears to users before the script runs
- The DOM is fully available when the script runs — no need for `DOMContentLoaded` listeners inside the script

---

*Portfolio designed and built June 2026. Forest & Stone theme. Fraunces + Hanken Grotesk typography. Hosted on GitHub Pages.*

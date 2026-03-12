SEO Optimizer Skill Purpose: A reusable runbook, checklists, templates and
automation snippets to audit, fix, and optimize any website for search engines.
Use this skill each time you ship pages or refresh content.

Quick Audit (5–15 minutes) Run these quick checks to get an immediate snapshot
of a site's SEO health.

HTTP & headers

Command: curl -I https://example.com Check for: 200 or 301 status, correct
Cache-Control, Content-Type, and security headers (HSTS). robots.txt and sitemap

Visit: https://example.com/robots.txt and https://example.com/sitemap.xml (or
/sitemap_index.xml). Ensure important pages are NOT blocked and sitemap is
present. Lighthouse (mobile + desktop)

Install: npm install -g lighthouse Run (mobile): lighthouse https://example.com
--output html --output-path=./lighthouse-mobile.html
--emulated-form-factor=mobile Note: LCP, INP/FID, CLS, Accessibility, Best
Practices, SEO Title / meta spot-check (corrected)

Browser: Right-click → View Source → find <title> and <meta name="description">.
CLI quick checks (copy/paste): Title: curl -s https://example.com | pup 'title
text{}' Meta description: curl -s https://example.com | pup
'meta[name="description"] attr{content}' Node quick example (if Node installed):
sh

Copy node -e "const r=require('sync-request');const
s=r('GET','https://example.com').getBody('utf8');console.log((s.match(/<title[^>]_>([^<]_)<\/title>/i)||[])[1]);"
Verify: Unique, descriptive <title> (50–60 chars recommended) Readable meta
description (120–155 chars) Open Graph tags (og:title, og:description) exist for
social sharing Structured data quick check

Search the page source for <script type="application/ld+json"> blocks. Validate
with Google Rich Results Test: https://search.google.com/test/rich-results Basic
URL health

Crawl a few important pages and ensure they return 200 and are not noindex
unintentionally. Record top issues and assign severity: Critical / High / Medium
/ Low.

Triage & Priority Framework Fix order (why):

Technical SEO & Performance — affects indexing, crawlability, UX (highest
impact) On‑page SEO — titles, meta, headings, structured data Content quality &
E‑E‑A‑T — trust signals, sourcing Links — internal & external linking profile
Monitoring & Reporting — Search Console, Analytics, automation Example
acceptance criteria (sample):

LCP median < 2.5s (mobile emulation) CLS < 0.1 Unique titles & meta for 100% of
primary pages Sitemap submitted and processed in Search Console Technical SEO
Checklist HTTPS with valid certificate and HSTS header No indexable 4xx/5xx
responses (fix or remove from sitemap) Canonical tags present and correct
robots.txt present and not blocking essential pages Sitemap present and
referenced to Search Console Responsive viewport meta configured Preload
critical assets (hero image, fonts) Use srcset/sizes for responsive images;
serve WebP/AVIF where possible Minify and compress CSS/JS; remove unused CSS
Defer non-critical JS and use code-splitting Use a CDN for static assets; set
cache headers Ensure touch targets >= 44px and no horizontal overflow Helpful
commands/snippets

Lighthouse mobile CLI (example): lighthouse https://example.com
--only-categories=performance,accessibility --emulated-form-factor=mobile
--output html --output-path=./reports/mobile.html Curl headers quick check: curl
-sI https://example.com | egrep -i
'HTTP/|cache-control|link|content-type|server|strict-transport-security' On-Page
SEO Checklist Meta tags

Unique <title> per page (50–60 chars) Meta description 120–155 characters Open
Graph & Twitter Card tags present Headings & Semantics

One H1 per page; logical H2/H3 structure Use semantic elements (main, article,
nav, header, footer) Media

All images have descriptive alt attributes Use responsive formats (WebP/AVIF)
with srcset Provide transcripts for videos and meaningful poster images Internal
Linking & URLs

Descriptive anchor text (avoid "click here") Short, lower-case, hyphen-separated
slugs No JS-only navigation for primary content (server-side rendering or
prerender) Schema & Rich Snippets

Add relevant JSON-LD (Article, FAQPage, BreadcrumbList, VideoObject,
Organization) Content & E‑E‑A‑T (Experience • Expertise • Authoritativeness •
Trust) Content must match user intent and satisfy queries clearly Cite reputable
sources for historical/academic claims; link to sources Author byline and short
bio on long-form educational pieces Use a pillar-and-cluster content model
(long-form hub + targeted subpages) Show "last reviewed" or "last updated" dates
on evergreen content Copywriting tips for 16–24 audience

Short, conversational sentences Use examples, micro-headlines, and bulleted
lists Provide quick paths: Learn → Compare → Quiz → Join Structured Data
(JSON-LD) Templates Paste these into the <head> of appropriate pages and adapt
fields.

Organization

sh

Copy

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Plain Prophecy",
  "url": "https://example.com",
  "logo": "https://example.com/static/logo.png"
}
</script>

Article / BlogPost

sh

Copy

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "description": "Short description of the article.",
  "image": "https://example.com/static/cover.jpg",
  "author": { "@type": "Person", "name": "Author Name" },
  "publisher": { "@type": "Organization", "name": "Plain Prophecy", "logo": { "@type": "ImageObject", "url": "https://example.com/static/logo.png" } },
  "datePublished": "2024-01-01",
  "dateModified": "2024-02-01"
}
</script>

FAQPage

sh

Copy

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Historicist interpretation?",
      "acceptedAnswer": { "@type": "Answer", "text": "Short concise answer..." }
    }
  ]
}
</script>

BreadcrumbList

sh

Copy

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://example.com/compare" }
  ]
}
</script>

VideoObject (if you use short explainer videos)

sh

Copy

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Explainer Video",
  "description": "Short explainer about the Historicist view.",
  "thumbnailUrl": "https://example.com/static/thumb.jpg",
  "contentUrl": "https://example.com/static/video.mp4",
  "uploadDate": "2024-01-01"
}
</script>

Testing structured data

Google Rich Results Test: https://search.google.com/test/rich-results Schema.org
validator and Structured Data Testing Tools Automation & Useful Scripts
Lighthouse batch runner (Node.js) sh

Copy // run-lighthouse.js const { exec } = require('child_process'); const pages
= ['https://example.com', 'https://example.com/compare',
'https://example.com/learn']; pages.forEach(url => { const out =
`./reports/${encodeURIComponent(url)}.html`; const cmd =
`lighthouse ${url} --output html --output-path=${out} --emulated-form-factor=mobile`;
exec(cmd, (err) => { if (err) console.error(err); else
console.log(`Finished ${url}`); }); }); Broken link check (global) Install: npm
i -g broken-link-checker Run: blc https://example.com -ro Sitemap generation Use
sitemap.js or write a small script to iterate site routes and output XML. Search
Console API Use Google Search Console API to programmatically fetch query and
performance data for trend reports. Prompt Library (for LLMs) Title & meta
generator "Create an SEO title (50–60 chars) and meta description (120–155
chars) for this page: [PASTE COPY]. Target keyword: 'biblical prophecy'. Tone:
scholarly but accessible to ages 16–24."

Content brief for pillar pages "Produce a content brief for a 1500–2500 word
pillar titled '[TITLE]'. Include H2/H3 headings, target keywords, suggested
internal links, and 6 reputable sources."

JSON-LD generator "Generate schema.org JSON-LD for an Article with fields:
headline, description, image, author, datePublished, publisher logo. Output only
the JSON-LD block."

Rewrite for youth tone "Rewrite this paragraph to be clearer and more engaging
for ages 16–24, keep it under 70 words, and include the keyword 'Daniel 70
weeks': [PASTE PARAGRAPH]"

Reporting Template (monthly) Date range and pages audited Lighthouse scores
(Performance / Accessibility / Best Practices / SEO) Core Web Vitals summary
(LCP, INP/FID, CLS) Top 5 issues (with severity & owner) Action plan for next 30
days (tasks, owners, estimates) KPIs: organic clicks & impressions (Search
Console), organic sessions (GA4), conversions from organic (quiz starts,
signups) QA & Acceptance Checklist (ready to ship) Technical

HTTPS enforced and valid certificate robots.txt and sitemap present and correct
No indexable 4xx/5xx pages in sitemap Canonical tags present and correct
Performance

LCP < 2.5s (sample pages, mobile) CLS < 0.1 INP/FID < 200ms On-Page

Unique titles & meta descriptions for primary pages OG & Twitter tags present
and correct H1 present and correct on each page Structured data validated with
Rich Results Test Content & Trust

Author bylines where appropriate References/citations present for historical
claims Clear CTAs and conversion tracking in place Monitoring

Google Search Console verified GA4 (or equivalent) analytics configured Weekly
automated Lighthouse reports running Common Gotchas & Fixes Duplicate
titles/descriptions: run a site crawl (Screaming Frog or similar) and apply
templated titles and descriptions. Thin content: expand articles or consolidate
duplicates and use canonical tags. JS-rendered content not indexed:
server-render key content or provide prerendered HTML for crawlers. Conflicting
structured data: remove duplicate or contradictory JSON-LD blocks. Next steps I
can take for you Generate ready-to-paste JSON-LD for your homepage and top pages
using your real content. Produce a Lighthouse batch script tailored to your full
route list and site structure. Run a live audit on your site (if you provide the
URL) and return a prioritized issue list with code snippets to fix them. If you
want this file updated in your repo now, I can save it there or produce
additional scripts/templates.

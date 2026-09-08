# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Recruiters and hiring managers** screening for full-time AI/ML engineering roles, treating the site as an interactive resume.
- **Enterprise clients and founders** evaluating whether to engage Aditya as an AI Architect / consultant for RAG, agentic, and GenAI projects. Current role: AI Architect at Aintropy (aintropy.ai) since July 2026, following a Senior AI/ML Engineer stint at the same company (Apr–Jul 2026); prior to that, IBM (Aug 2023–Apr 2026).

Secondary: peers and technical readers who discover the site through the Veridex open-source library or the blog.

## Product Purpose

A personal portfolio site for Aditya Mahakali, an AI/ML engineer. It exists to let both audiences above quickly verify credibility and decide whether to hire, contract, or read further : through a skills overview, an experience timeline, project case studies, an interactive knowledge graph of skills/projects, certifications, a technical blog, and a live AI chatbot.

Success means a visitor leaves convinced Aditya can be trusted with production AI systems, and takes an action (contact, resume download, or deeper read).

## Positioning

Research-grounded and production-ready at once: Aditya has co-authored published retrieval research (SEARCHD, IEEE 2024) and shipped a real open-source library (Veridex, a probabilistic AI-content-detection library), while also delivering 12+ enterprise GenAI systems in production at IBM with measured outcomes (e.g. 85% first-call resolution, retrieval accuracy improvements from 56%→77%). Most AI portfolios show one side (research papers or shipped demos) : this one has to carry both without either reading as decoration.

**Target self-positioning: Applied AI Architect.** Aditya is deliberately pitching toward business decision-makers (not just engineers) who need to know _where AI creates leverage in their business and what adoption actually costs_. This reframes content and copy choices across the site, especially the blog: posts should favor business-outcome framing (workflow breakdowns, cost/ROI comparisons, "AI vs. status quo," myth-busting for non-technical buyers) over commodity "new model dropped" coverage. Reference models for tone/cadence: Ethan Mollick (oneusefulthing.org) and similar writers who translate AI capability into business terms : not the researcher-to-researcher style of writers like Simon Willison or Lilian Weng, whose audience is engineers.

## Operating Context

- Visitors arrive cold (LinkedIn, GitHub, resume link, search) and self-serve through sections: hero → skills → experience timeline → open source (Veridex) → project case studies → certifications → education/interests → contact.
- An interactive knowledge graph (toggled from the avatar) visualizes the connections between skills, projects, and skill clusters (ML/GenAI vs. full-stack).
- A live AI chatbot (currently on OpenRouter) is a proof-of-skill demo, not just a convenience widget : it should read as a working example of the RAG/agent skills claimed elsewhere on the site, not a bolted-on utility.
- A separate technical blog (Markdown-driven, `content/blog/`) publishes long-form posts on RAG, agents, context engineering, and infra topics. Target cadence: one post per day, authored in Obsidian and committed straight into the repo (no separate CMS). Multi-media posts (images, embedded video) and reader comments (via Giscus, GitHub Discussions-backed) are a planned extension of this surface, not yet built.
- Dark theme is the current default (`theme-dark` on `<html>`), with a theme toggle present.

## Capabilities and Constraints

- Built on Next.js 15 / React 19 / Tailwind 4 (alpha) / Framer Motion / D3 (for the knowledge graph) / Vercel (hosting, Analytics, Speed Insights).
- Blog content is Markdown with frontmatter, rendered via `next-mdx-remote`.
- Chatbot backend currently uses OpenRouter (model: `thinkingmachines/inkling:free`, configurable via the `OPENROUTER_MODEL` env var; recently migrated from NVIDIA NIM), via the Vercel AI SDK.
- Real content only: all experience, project, certification, and blog data in the codebase is factual and sourced from Aditya's actual work : no placeholder or fabricated claims should be introduced.

## Brand Commitments

- Name: Aditya Mahakali. Custom script wordmark class `font-veridex-script` used specifically for the "Veridex" project name.
- Voice across copy: direct, outcome-oriented, technically specific (metrics over adjectives : e.g. "56% → 77% answer accuracy" rather than "significantly improved").
- Contact commitments already public and must stay accurate: email (adityamahakali@gmail.com), GitHub (@ADITYAMAHAKALI), LinkedIn, LeetCode, resume link : all wired into the bottom dock navigation.

## Evidence on Hand

- Real, verifiable project case studies (IBM ElasticSQL, Banking Virtual Assistant, FDA product search, Retail NL2SQL, MedBot HyDe, Daily Paper Summarizer) with architecture, model work, evaluation, and deployment detail already written : treat as ground truth, not filler to rewrite.
- Real certifications and Credly badge links (16 badges linked in `app/page.tsx`).
- Real published research: SEARCHD (IEEE, Oct 2024) : link currently a placeholder (`#`) in the README; the live site should be checked for whether this is resolved.
- Real open-source project: Veridex, with GitHub and docs links.
- No fabricated testimonials, press, or customer logos exist and none should be added without real evidence.

## Product Principles

1. Every claim stays metric-backed and verifiable : this is the core differentiator (research-grounded + production-ready) and gets undermined by generic self-praise.
2. The chatbot must function as a credible skills demo, not just decoration : treat its quality bar the same as the flagship project case studies.
3. Serve both audiences (recruiter and client) without forking the experience : the same timeline, projects, and proof points should read correctly to a screener skimming in 30 seconds and a technical evaluator reading in depth.
4. Real evidence only : never invent metrics, testimonials, or claims to fill a visual gap.

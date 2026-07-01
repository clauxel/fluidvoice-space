# Website Changelog

## 2026-07-01 - fluidvoice.space local build

Status: local_complete_production_pending

- Built an independent unofficial FluidVoice workflow planner site with homepage, planner, model selection, Command Mode, Write Mode, privacy checklist, macOS permissions, Fluid Intelligence, Whisper alternative, docs, pricing, checkout, legal pages, source notes, FAQ, changelog, sitemap, robots, llms.txt, product JSON, and Worker API routes.
- Created the separate docs project fluidvoice-space-docs with README, docs pages, source map, examples, FAQ, AI context, and llms.txt.
- Implemented honest paid gating: /api/planner returns 402 without access, /api/checkout returns 503 when Polar checkout URLs are missing, and /api/analytics returns stored:false when D1 is not bound.
- Verified npm run build and local Chrome CDP smoke evidence, including desktop/mobile layout, pricing interaction, checkout blocker modal, and planner paid gate.
- Recorded the Codex in-app browser local-target security-policy block without attempting a workaround.
- Added the HTML build report, evidence sidecars, browser screenshots, report-center entry, and site-registry record.

Production blockers:

- Wrangler is not authenticated, so Cloudflare Worker deployment, D1 remote setup, Worker secrets, and launch configuration were not executed.
- DNS/HTTPS apex and www verification, Polar checkout/webhook secrets, public GitHub docs repo creation, official keyword heat validation, GSC/Bing/IndexNow, and backlink distribution are not live verified yet.
- Final production status must remain pending until those gates pass.

## 2026-07-01 - production completion

Status: production_complete

- Verified Cloudflare production for fluidvoice.space: apex HTTPS 200, www redirect, key pages, sitemap/robots/llms, BingSiteAuth, IndexNow key, runtime, Polar checkout start, D1 analytics stored:true, unpaid planner 402 gate, and 404 behavior.
- Submitted Google Search Console domain and URL-prefix sitemaps, Bing site/feed/URL batch with verified ownership, and IndexNow URL batch.
- Registered public site and docs GitHub repositories in the completion evidence.
- Generated mandatoryCompletionGate, completionLedger, completionEnforcementGate:pass, report-center entry, and active_cloudflare site-registry record.
- Official Google Trends/MiroFish keyword validation remains blocked_with_evidence; keywords are not counted as confirmed traffic terms.

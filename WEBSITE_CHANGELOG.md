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

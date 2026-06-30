import { mkdir, writeFile } from 'node:fs/promises'

const publicRoot = new URL('../public/', import.meta.url)
const origin = 'https://fluidvoice.space'
const supportEmail = 'support@aigeamy.com'
const generatedAt = '2026-07-01T10:30:00+08:00'
const indexNowKey = '590a3ab02487cffe4cfd55b0df769f65'
const heroFile = 'assets/fluidvoice-workflow-hero.png'

const repoFacts = {
  upstreamRepo: 'https://github.com/altic-dev/FluidVoice',
  officialSite: 'https://altic.dev/fluid',
  defaultBranch: 'main',
  latestClonedCommit: 'ddae5986ea09fac4874dd80dd64f7850807fea76',
  latestClonedCommitDate: '2026-06-28T15:50:46-07:00',
  latestClonedCommitSubject: 'Update README sponsor links',
  latestRelease: 'v1.6.1',
  latestReleaseDate: '2026-06-28T11:20:08Z',
  githubStars: 4781,
  githubForks: 296,
  githubWatchers: 4781,
  githubOpenIssues: 93,
  githubSubscribers: 15,
  pushedAt: '2026-06-28T22:50:52Z',
  license: 'GPL-3.0',
  language: 'Swift',
  releaseAssetDownloads: 10231,
  releaseAssets: ['Fluid-oss-1.6.1.dmg', 'Fluid-oss-1.6.1.zip'],
  appVersion: '1.6.1',
  minimumMacOS: 'macOS 15.0 Sequoia',
  packageManager: 'Swift Package Manager',
  installCommand: 'brew install --cask fluidvoice',
  sourceFeatures: [
    'Command Mode for macOS actions by voice',
    'Write Mode for text fields in other apps',
    'Live transcription overlay with notch-aware options',
    'Nemotron, Parakeet, Cohere, Apple Speech, and Whisper speech engines',
    'Optional AI enhancement through local or bring-your-own cloud providers',
    'Optional local audio and transcription history with budget controls',
    'Local API controllers for dictionary, history, and inference workflows',
  ],
  privacyFacts: [
    'README states voice, audio, and transcribed text stay local unless a cloud provider is explicitly enabled.',
    'README says anonymous analytics do not collect voice, raw audio, transcribed text, selected text, prompts, AI responses, commands, window titles, file paths, clipboard, or typed content.',
    'Info.plist declares microphone, accessibility, Apple Events, and speech recognition permission reasons.',
    'Package.swift targets macOS 15 and depends on FluidAudio, SwiftWhisper, DynamicNotchKit, AppUpdater, PromiseKit, and PostHog.',
  ],
}

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyUsd: 9,
    annualMonthlyUsd: 4.5,
    annualDueUsd: 54,
    summary: 'One Mac dictation setup checklist with model fit, permission, and privacy notes.',
    features: [
      'One Mac workflow profile',
      'Permission readiness checklist',
      'Speech engine fit preview',
      'Sample report export after payment',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyUsd: 29,
    annualMonthlyUsd: 14.5,
    annualDueUsd: 174,
    summary: 'Full voice workflow plan for dictation, command mode, write mode, history, and provider boundaries.',
    features: [
      'Full workflow export',
      'Command and Write Mode policy map',
      'Per-app prompt planning table',
      '3-day and 6-day review checklist',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyUsd: 59,
    annualMonthlyUsd: 29.5,
    annualDueUsd: 354,
    summary: 'Team onboarding workspace for multiple Macs, model policies, local-first controls, and support review.',
    features: [
      'Multiple Mac profiles',
      'Team permission and privacy matrix',
      'Bring-your-own provider policy notes',
      'Priority support via email',
    ],
  },
]

const pageMatrix = [
  ['/', 'Homepage', 'fluidvoice', 'Explain the unofficial workflow planner and route full exports through pricing.'],
  ['/planner/', 'Tool / Demo', 'fluidvoice workflow planner', 'Generate a sample readiness score and paid-gated export path.'],
  ['/model-selection/', 'Feature', 'fluidvoice speech model selection', 'Help users choose Apple Speech, Nemotron, Parakeet, Cohere, or Whisper.'],
  ['/command-mode/', 'Feature', 'fluidvoice command mode', 'Plan voice-triggered Mac actions without losing permission boundaries.'],
  ['/write-mode/', 'Feature', 'fluidvoice write mode', 'Plan dictation, rewrite, and insertion workflows across text fields.'],
  ['/privacy-checklist/', 'Use Case', 'local first dictation app', 'Document local-first defaults, cloud opt-in, analytics, and history choices.'],
  ['/macos-permissions/', 'Guide', 'macos dictation permissions', 'Plan microphone, accessibility, Apple Events, and speech recognition permission steps.'],
  ['/fluid-intelligence/', 'Guide', 'fluid intelligence local ai', 'Explain the private local enhancement boundary from README facts.'],
  ['/whisper-alternative/', 'Alternative', 'whisper dictation app for mac', 'Compare FluidVoice planning against plain Whisper-only workflows.'],
  ['/docs/', 'Docs / API', 'fluidvoice local api', 'Explain planner API gates and local source capabilities.'],
  ['/pricing/', 'Pricing', 'fluidvoice pricing', 'Select a package before full export or API access.'],
  ['/source-notes/', 'Docs / Source Notes', 'fluidvoice open source', 'Cite official sources, license, release, and non-affiliation boundaries.'],
  ['/faq/', 'FAQ', 'fluidvoice questions', 'Answer install, privacy, model, permission, and payment questions.'],
]

const trustDataLedger = [
  {
    id: 'github_activity',
    label: 'GitHub activity',
    source: repoFacts.upstreamRepo,
    collectedAt: generatedAt,
    values: {
      stars: repoFacts.githubStars,
      forks: repoFacts.githubForks,
      watchers: repoFacts.githubWatchers,
      openIssues: repoFacts.githubOpenIssues,
      pushedAt: repoFacts.pushedAt,
    },
    displayDecision: 'shown as source-window trust signal',
    confidence: 'high',
  },
  {
    id: 'latest_release',
    label: 'Latest release',
    source: 'GitHub releases API',
    collectedAt: generatedAt,
    values: {
      tag: repoFacts.latestRelease,
      publishedAt: repoFacts.latestReleaseDate,
      assets: repoFacts.releaseAssets,
      downloads: repoFacts.releaseAssetDownloads,
    },
    displayDecision: 'shown on homepage and source notes',
    confidence: 'high',
  },
  {
    id: 'license_boundary',
    label: 'License boundary',
    source: 'Upstream LICENSE and README',
    collectedAt: generatedAt,
    values: { codeLicense: repoFacts.license, relationship: 'unofficial planner; no upstream endorsement claimed' },
    displayDecision: 'shown in trust strip, source notes, FAQ, and terms',
    confidence: 'high',
  },
  {
    id: 'privacy_boundary',
    label: 'Privacy boundary',
    source: 'Upstream README Privacy & Analytics section and Info.plist permission descriptions',
    collectedAt: generatedAt,
    values: { localFirst: true, cloudProviders: 'optional opt-in', analytics: 'anonymous app health and usage only per README' },
    displayDecision: 'shown as planning checklist; not framed as a security certification',
    confidence: 'high',
  },
  {
    id: 'planner_output_sample',
    label: 'Planner sample output',
    generationMethod: 'deterministic browser and Worker preview algorithm using user-entered workflow assumptions',
    collectedAt: generatedAt,
    values: { label: 'Sample', userTraction: 'not claimed' },
    displayDecision: 'shown as sample preview only',
    confidence: 'medium',
  },
]

const pages = [
  {
    path: '/',
    nav: 'Home',
    title: 'fluidvoice.space | FluidVoice workflow planner',
    description: 'An unofficial hosted workflow planner for FluidVoice users choosing macOS dictation models, permissions, privacy settings, command mode, write mode, and local-first AI enhancement.',
    h1: 'Turn FluidVoice into a private Mac dictation workflow you can trust every day.',
    eyebrow: 'Unofficial hosted planner',
    lead: 'Map voice engines, permissions, hotkeys, command mode, write mode, audio history, and local-first AI boundaries before you rely on dictation across your Mac.',
    body: homeBody(),
  },
  featurePage({
    path: '/planner/',
    nav: 'Planner',
    title: 'FluidVoice workflow planner | fluidvoice.space',
    description: 'Preview a FluidVoice workflow plan for macOS dictation, model choice, permissions, local privacy, history, and paid export gating.',
    h1: 'Build a dictation setup plan before your voice becomes production input.',
    keyword: 'fluidvoice workflow planner',
    lead: 'Use the sample planner to choose the right setup path, then unlock a full export only after selecting a package.',
    sections: [
      ['Inputs', 'Role, weekly dictation minutes, language needs, hardware class, command mode, write mode, history, and local-only preference.'],
      ['Output', 'A setup readiness score, model recommendation, privacy notes, first steps, and a paid export route.'],
      ['Limits', 'This website does not run FluidVoice, capture microphone input, store dictated text, or configure your Mac. It creates planning output.'],
    ],
    extra: plannerForm(),
  }),
  featurePage({
    path: '/model-selection/',
    nav: 'Models',
    title: 'FluidVoice speech model selection planner | fluidvoice.space',
    description: 'Compare FluidVoice speech engine choices, including Apple Speech, Nemotron, Parakeet, Cohere, and Whisper, for latency, language, hardware, and privacy needs.',
    h1: 'Pick the speech engine that fits the job, not the loudest benchmark.',
    keyword: 'fluidvoice speech model selection',
    sections: [
      ['Zero-download path', 'Apple Speech can be the lowest setup path because it is built into macOS, but language and quality depend on system support.'],
      ['Fast native path', 'Nemotron and Parakeet options target low-latency native dictation on Apple Silicon, with model downloads and hardware expectations.'],
      ['Compatibility path', 'Whisper covers broader hardware and language scenarios, including Intel Macs from FluidVoice 1.5.1+, with larger models trading disk for accuracy.'],
    ],
  }),
  featurePage({
    path: '/command-mode/',
    nav: 'Command',
    title: 'FluidVoice Command Mode planning | fluidvoice.space',
    description: 'Plan FluidVoice Command Mode for Mac actions, shortcuts, confirmation boundaries, and safe voice-triggered automation.',
    h1: 'Voice commands feel powerful only when the guardrails are written down.',
    keyword: 'fluidvoice command mode',
    sections: [
      ['What to map', 'Apps, shortcuts, system actions, confirmation steps, and the hotkey behavior that opens and submits Command Mode.'],
      ['Why it matters', 'Voice-triggered actions can affect windows, apps, and automation. A plan prevents accidental commands becoming muscle memory.'],
      ['Planner output', 'The paid export separates safe commands, confirmation-required commands, blocked commands, and review steps.'],
    ],
  }),
  featurePage({
    path: '/write-mode/',
    nav: 'Write',
    title: 'FluidVoice Write Mode workflow planner | fluidvoice.space',
    description: 'Plan FluidVoice Write Mode for dictation and text rewriting in macOS text fields, including prompt sets and per-app behavior.',
    h1: 'Make dictation adapt to the app instead of rewriting the same text twice.',
    keyword: 'fluidvoice write mode',
    sections: [
      ['Writing surface', 'Email, notes, terminals, support tools, documents, and browser text fields each need different punctuation and rewrite rules.'],
      ['Prompt routing', 'FluidVoice supports optional per-app prompt sets, so a plan can define style, cleanup, and rewriting boundaries by context.'],
      ['Review loop', 'Use sample outputs to decide where direct insertion is safe and where a preview/edit step should remain.'],
    ],
  }),
  featurePage({
    path: '/privacy-checklist/',
    nav: 'Privacy',
    title: 'FluidVoice local-first privacy checklist | fluidvoice.space',
    description: 'A planning checklist for FluidVoice local-first dictation, optional cloud enhancement, anonymous analytics, local history, and export boundaries.',
    h1: 'Local-first only works when every opt-in is visible before launch.',
    keyword: 'local first dictation app',
    sections: [
      ['Default boundary', 'The README states voice, audio, and transcribed text stay on the machine unless a cloud AI provider is explicitly enabled.'],
      ['Optional boundaries', 'AI enhancement, Fluid Intelligence, audio history, anonymous analytics, and beta builds are choices that should be documented.'],
      ['Team checklist', 'Decide who can enable providers, whether history is saved, how audio budgets work, and when exports are allowed.'],
    ],
  }),
  featurePage({
    path: '/macos-permissions/',
    nav: 'Permissions',
    title: 'macOS permissions checklist for FluidVoice | fluidvoice.space',
    description: 'Plan FluidVoice microphone, accessibility, Apple Events, speech recognition, startup, and hotkey permissions before onboarding users.',
    h1: 'The fastest dictation app still needs a clean permission path.',
    keyword: 'macos dictation permissions',
    sections: [
      ['Microphone', 'Required for speech-to-text recording. Users should know whether audio is processed locally or sent to an opt-in provider.'],
      ['Accessibility', 'Required for global hotkeys and typing text into other apps after recording stops. This is the permission most teams should pre-explain.'],
      ['Apple Events and speech recognition', 'Used for startup/system event behavior and on-device speech recognition flows, depending on setup choices.'],
    ],
  }),
  featurePage({
    path: '/fluid-intelligence/',
    nav: 'Local AI',
    title: 'Fluid Intelligence planning notes | fluidvoice.space',
    description: 'Understand the Fluid Intelligence local AI enhancement boundary before enabling advanced on-device dictation post-processing.',
    h1: 'Use local enhancement as a policy choice, not a mystery switch.',
    keyword: 'fluid intelligence local ai',
    sections: [
      ['What README says', 'Fluid Intelligence is described as a separate privately maintained local AI runtime for smart formatting, capitalization, and post-processing.'],
      ['What to plan', 'Disk space, download expectations, who can enable it, whether local-only is required, and how users should validate output quality.'],
      ['Boundary', 'The core FluidVoice app is GPL-3.0, while the Fluid Intelligence runtime is described separately in the README. Source notes keep that distinction visible.'],
    ],
  }),
  featurePage({
    path: '/whisper-alternative/',
    nav: 'Whisper Alt',
    title: 'FluidVoice vs plain Whisper workflow planning | fluidvoice.space',
    description: 'Compare a FluidVoice setup plan with plain Whisper-only dictation workflows for Mac, including hotkeys, overlays, model choice, history, and app insertion.',
    h1: 'If Whisper is the engine, FluidVoice is the Mac workflow around it.',
    keyword: 'whisper dictation app for mac',
    sections: [
      ['Plain engine path', 'A Whisper-only setup can be enough when the task is batch transcription or a custom developer workflow.'],
      ['FluidVoice path', 'FluidVoice adds global hotkeys, overlay, smart typing, optional history, Write Mode, Command Mode, and model choice around the engine.'],
      ['Decision', 'Use the planner when the problem is not just recognition accuracy but daily Mac behavior, permissions, and safety.'],
    ],
  }),
  docsPage(),
  pricingPage(),
  checkoutPage(),
  successPage(),
  cancelPage(),
  sourceNotesPage(),
  faqPage(),
  privacyPage(),
  termsPage(),
  changelogPage(),
  notFoundPage(),
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function urlFor(pagePath) {
  if (pagePath === '/404.html') return origin + '/404.html'
  return origin + pagePath
}

function planOffers() {
  return plans.flatMap((plan) => [
    {
      '@type': 'Offer',
      name: plan.name + ' monthly',
      price: String(plan.monthlyUsd),
      priceCurrency: 'USD',
      url: `${origin}/checkout/?plan=${plan.id}&billing=monthly`,
      description: 'One-time payment for one month. Does not renew automatically.',
    },
    {
      '@type': 'Offer',
      name: plan.name + ' annual',
      price: String(plan.annualDueUsd),
      priceCurrency: 'USD',
      url: `${origin}/checkout/?plan=${plan.id}&billing=annual`,
      description: 'One-time payment for one year. Does not renew automatically.',
    },
  ])
}

function shell(page) {
  const canonical = urlFor(page.path)
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'fluidvoice.space',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web',
      url: origin + '/',
      description: 'Unofficial hosted planning companion for FluidVoice macOS dictation workflows, model selection, permissions, and local-first privacy boundaries.',
      offers: planOffers(),
      provider: { '@type': 'Organization', name: 'Clauxel', email: supportEmail },
    },
    ...(page.schema || []),
  ]
  const navLinks = [
    ['/', 'Home'],
    ['/planner/', 'Planner'],
    ['/model-selection/', 'Models'],
    ['/command-mode/', 'Command'],
    ['/privacy-checklist/', 'Privacy'],
    ['/pricing/', 'Pricing'],
  ]
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="${page.robots || 'index,follow'}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${origin}/${heroFile}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <title>${escapeHtml(page.title)}</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header class="top">
    <div class="wrap nav">
      <a class="brand" href="/" aria-label="fluidvoice.space home"><span class="mark" aria-hidden="true">fv</span><span>fluidvoice.space</span></a>
      <nav class="navlinks" aria-label="Primary navigation">
        ${navLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}
        <button class="primary compact" type="button" data-checkout-main>Checkout <span data-current-plan>Pro annual</span></button>
      </nav>
    </div>
  </header>
  <main>
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(page.eyebrow || 'FluidVoice planner')}</p>
          <h1>${escapeHtml(page.h1)}</h1>
          <p class="lead">${escapeHtml(page.lead)}</p>
          <div class="actions">
            <a class="button primary" href="/pricing/">View pricing plans</a>
            <a class="button" href="/planner/">Open planner preview</a>
            <a class="button dark" href="/source-notes/">Source notes</a>
          </div>
          <div class="trust-strip" aria-label="Trust signals">
            <span>Unofficial boundary</span>
            <span>${repoFacts.license} source</span>
            <span>${repoFacts.latestRelease} release noted</span>
          </div>
        </div>
        <div class="hero-media">
          <img src="/${heroFile}" width="1680" height="960" alt="Mac dictation workflow planner with waveform, model cards, and privacy boundary panels.">
        </div>
      </div>
    </section>
    ${page.body}
  </main>
  <footer class="footer">
    <div class="wrap footer-grid">
      <div><strong>fluidvoice.space</strong><p>Unofficial hosted workflow planner for FluidVoice evaluation. It is not affiliated with the FluidVoice maintainers.</p></div>
      <nav aria-label="Footer navigation">
        <a href="/pricing/">Pricing</a>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/llms.txt">llms.txt</a>
      </nav>
      <div><p>Support: <a href="mailto:${supportEmail}">${supportEmail}</a></p><p>Last updated: July 1, 2026</p></div>
    </div>
  </footer>
  <script id="product-data" type="application/json">${JSON.stringify(productData())}</script>
  <script src="/app.js" defer></script>
</body>
</html>
`
}

function homeBody() {
  return `
    <section class="section white">
      <div class="wrap split">
        ${plannerForm()}
        <div>
          <p class="eyebrow">Product thesis</p>
          <h2>Dictation is faster when the setup is already decided.</h2>
          <p class="section-lead">FluidVoice brings together local-first speech, model choice, Mac permissions, overlays, Write Mode, Command Mode, local history, and optional enhancement. The planner turns those choices into a launch checklist instead of a settings maze.</p>
          <div class="grid two">
            <article class="card"><span class="metric">01</span><h3>Choose models</h3><p>Compare zero-download, low-latency, multilingual, Intel-compatible, and high-accuracy paths.</p></article>
            <article class="card"><span class="metric">02</span><h3>Set permissions</h3><p>Prepare microphone, accessibility, Apple Events, speech recognition, startup, and hotkey guidance.</p></article>
            <article class="card"><span class="metric">03</span><h3>Protect output</h3><p>Decide when cloud providers, history, analytics, exports, and local enhancement are acceptable.</p></article>
            <article class="card"><span class="metric">04</span><h3>Gate exports</h3><p>Preview the plan freely; full exports and policy packs route through pricing before API access.</p></article>
          </div>
        </div>
      </div>
    </section>
    ${trustSection()}
    ${matrixSection()}
    <section class="section white">
      <div class="wrap">
        <p class="eyebrow">Popular workflows</p>
        <h2>Pick the page that matches the decision in front of you.</h2>
        <div class="grid three">
          ${[
            ['/model-selection/', 'Model selection plan', 'Choose Apple Speech, Nemotron, Parakeet, Cohere, or Whisper based on work style.'],
            ['/command-mode/', 'Command Mode guardrails', 'Separate safe voice actions from confirmation-required automation.'],
            ['/write-mode/', 'Write Mode prompts', 'Plan dictation and rewriting behavior across apps and text fields.'],
            ['/privacy-checklist/', 'Local-first checklist', 'Document cloud opt-in, analytics, history, and export boundaries.'],
            ['/macos-permissions/', 'macOS permissions', 'Prepare microphone, accessibility, Apple Events, and speech recognition onboarding.'],
            ['/fluid-intelligence/', 'Fluid Intelligence notes', 'Plan local enhancement without confusing it with the GPL app boundary.'],
          ].map(([href, title, copy]) => `<article class="card link-card"><h3><a href="${href}">${title}</a></h3><p>${copy}</p></article>`).join('')}
        </div>
      </div>
    </section>
  `
}

function plannerForm() {
  return `<form class="toolbox" data-planner-form>
    <p class="eyebrow">Usable preview</p>
    <h2>Voice workflow preview</h2>
    <div class="form-grid">
      <label>Primary role<select name="role"><option value="writer">Writer or researcher</option><option value="developer">Developer</option><option value="operator">Support or operations</option></select></label>
      <label>Weekly dictation minutes<input name="minutes" type="number" min="1" value="180"></label>
      <label>Languages<select name="languages"><option value="english">Mostly English</option><option value="multilingual">Multilingual</option><option value="system">Use system languages first</option></select></label>
      <label>Mac hardware<select name="device"><option value="apple-silicon">Apple Silicon</option><option value="intel">Intel Mac</option></select></label>
      <label>Command Mode<select name="commandMode"><option value="no">Not needed yet</option><option value="yes">Needed for actions</option></select></label>
      <label>History<select name="history"><option value="transcript">Transcript history only</option><option value="audio">Audio history with budget</option><option value="off">No saved history</option></select></label>
    </div>
    <div class="form-actions">
      <button class="dark" type="submit">Generate preview</button>
      <button class="primary" type="button" data-full-plan>Unlock full export</button>
    </div>
    <pre class="preview" data-planner-output>{
  "status": "ready_for_input",
  "output": "Enter workflow assumptions to preview FluidVoice setup risks."
}</pre>
    <p class="status" data-planner-status>Full export is gated behind pricing and paid access.</p>
  </form>`
}

function trustSection() {
  return `<section class="section">
    <div class="wrap">
      <p class="eyebrow">Trust data ledger</p>
      <h2>Real source facts, clearly separated from sample output.</h2>
      <div class="stats">
        <div><strong>${repoFacts.githubStars.toLocaleString('en-US')}</strong><span>GitHub stars collected July 1, 2026</span></div>
        <div><strong>${repoFacts.githubForks.toLocaleString('en-US')}</strong><span>GitHub forks from the upstream repo</span></div>
        <div><strong>${repoFacts.releaseAssetDownloads.toLocaleString('en-US')}</strong><span>Latest release asset downloads observed</span></div>
        <div><strong>${repoFacts.license}</strong><span>Code license with local AI runtime boundary noted</span></div>
      </div>
      <div class="notice">This site uses source facts from the upstream project and deterministic sample planner output. It does not claim maintainer endorsement, user counts, revenue, or official download status for this planner.</div>
    </div>
  </section>`
}

function matrixSection() {
  return `<section class="section white">
    <div class="wrap">
      <p class="eyebrow">Decision matrix</p>
      <h2>What the planner checks before daily use.</h2>
      <table>
        <thead><tr><th>Area</th><th>Question</th><th>Planner output</th></tr></thead>
        <tbody>
          <tr><td>Voice engine</td><td>Does the work need zero-download setup, low latency, multilingual support, Intel compatibility, or high accuracy?</td><td>Model recommendation with setup notes and disk expectations.</td></tr>
          <tr><td>Permissions</td><td>Can users explain microphone, accessibility, Apple Events, and speech recognition access before approving prompts?</td><td>Onboarding checklist and risk labels.</td></tr>
          <tr><td>Mode policy</td><td>Where should Command Mode, Write Mode, per-app prompts, and direct insertion be allowed?</td><td>Mode map with safe, review, and blocked zones.</td></tr>
          <tr><td>Privacy</td><td>Which opt-ins are allowed: cloud enhancement, Fluid Intelligence, analytics, beta builds, local history, and exports?</td><td>Privacy boundary and data-retention notes.</td></tr>
        </tbody>
      </table>
    </div>
  </section>`
}

function featurePage({ path, nav, title, description, h1, keyword, sections, lead, extra = '' }) {
  return {
    path,
    nav,
    title,
    description,
    h1,
    eyebrow: keyword,
    lead: lead || 'Use the planner to translate FluidVoice source facts into a concrete setup, privacy, model, and workflow decision.',
    body: `
      <section class="section white">
        <div class="wrap split">
          <div>
            <p class="eyebrow">Workflow</p>
            <h2>What this page helps decide.</h2>
            <div class="grid one">
              ${sections.map(([heading, copy]) => `<article class="card"><h3>${heading}</h3><p>${copy}</p></article>`).join('')}
            </div>
          </div>
          ${extra || `<aside class="panel"><p class="eyebrow">Next action</p><h2>Turn the notes into an export.</h2><p>Preview facts and assumptions on this page, then choose a plan before generating the full workflow pack.</p><a class="button primary" href="/pricing/">View pricing plans</a></aside>`}
        </div>
      </section>
      ${matrixSection()}
    `,
  }
}

function docsPage() {
  return {
    path: '/docs/',
    nav: 'Docs',
    title: 'Docs for the FluidVoice workflow planner | fluidvoice.space',
    description: 'Documentation for the unofficial FluidVoice workflow planner, paid API gates, checkout behavior, source boundaries, and local-first planning output.',
    h1: 'Use the hosted planner as a decision layer, not as the official app.',
    eyebrow: 'Docs',
    lead: 'This documentation explains how the planner works, what it does not do, and how teams can use the paid export safely.',
    body: `<section class="section white"><div class="wrap grid three">
      <article class="card"><h3>Planner API</h3><p><code>POST /api/planner</code> returns a sample preview and <code>402</code> until paid access is verified.</p></article>
      <article class="card"><h3>Checkout API</h3><p><code>POST /api/checkout</code> starts a configured Polar hosted checkout or returns an explicit configuration blocker.</p></article>
      <article class="card"><h3>Runtime API</h3><p><code>GET /api/runtime</code> exposes pricing metadata, payment configuration status, and one-time payment terms.</p></article>
    </div></section>${trustSection()}`,
  }
}

function pricingPage() {
  return {
    path: '/pricing/',
    nav: 'Pricing',
    title: 'Pricing | fluidvoice.space',
    description: 'Pricing for the unofficial FluidVoice workflow planner with annual and monthly one-time payment options.',
    h1: 'Choose a FluidVoice planning package before generating the full export.',
    eyebrow: 'Pricing',
    lead: 'Annual is selected by default and is 50% cheaper than monthly. Payments are one-time for the selected coverage period and do not renew automatically.',
    body: `<section class="section white"><div class="wrap">
      <div class="switch" role="group" aria-label="Billing period">
        <button type="button" data-billing="annual" aria-pressed="true">Annual, 50% off</button>
        <button type="button" data-billing="monthly" aria-pressed="false">Monthly</button>
      </div>
      <div class="pricing">
        ${plans.map((plan) => `<article class="card plan${plan.id === 'pro' ? ' active' : ''}" data-plan-card="${plan.id}">
          <h2>${plan.name}</h2>
          <p>${plan.summary}</p>
          <div class="price"><span data-price>$${plan.annualMonthlyUsd.toFixed(2)}</span><small>/mo</small></div>
          <p class="status" data-due>$${plan.annualDueUsd} due today. Covers one year and does not renew automatically.</p>
          <ul>${plan.features.map((feature) => `<li>${feature}</li>`).join('')}</ul>
          <button class="primary" type="button" data-plan-action>Checkout ${plan.name} annual</button>
        </article>`).join('')}
      </div>
      <div class="notice">Checkout uses Polar hosted checkout when configured. If checkout is not configured, the site returns a clear setup blocker instead of pretending a purchase succeeded.</div>
    </div></section>`,
  }
}

function checkoutPage() {
  return {
    path: '/checkout/',
    nav: 'Checkout',
    title: 'Checkout | fluidvoice.space',
    description: 'Start the configured Polar hosted checkout for fluidvoice.space planning packages.',
    robots: 'noindex,follow',
    h1: 'Start hosted checkout for the selected planning package.',
    eyebrow: 'Checkout',
    lead: 'Checkout opens only when a valid Polar checkout URL is configured for the selected plan and billing period.',
    body: `<section class="section white"><div class="wrap panel">
      <h2>Checkout status</h2>
      <p data-checkout-status>Choose a plan from pricing or use the button below to check the selected package.</p>
      <div class="actions"><button class="primary" type="button" data-checkout-page>Open hosted checkout</button><a class="button" href="/pricing/">Back to pricing</a></div>
    </div></section>`,
  }
}

function successPage() {
  return {
    path: '/success/',
    nav: 'Success',
    title: 'Payment success | fluidvoice.space',
    description: 'Payment return page for fluidvoice.space after Polar hosted checkout.',
    robots: 'noindex,follow',
    h1: 'Payment returned to the planner.',
    eyebrow: 'Success',
    lead: 'Paid access is enabled only after the checkout return or webhook can be verified. This page never fakes access.',
    body: `<section class="section white"><div class="wrap panel"><h2>Next step</h2><p>Keep the checkout receipt. If access is not active yet, contact support with the order reference.</p><a class="button primary" href="/planner/">Return to planner</a></div></section>`,
  }
}

function cancelPage() {
  return {
    path: '/cancel/',
    nav: 'Cancel',
    title: 'Checkout canceled | fluidvoice.space',
    description: 'Checkout cancellation page for fluidvoice.space.',
    robots: 'noindex,follow',
    h1: 'Checkout was canceled.',
    eyebrow: 'Checkout',
    lead: 'No planner export is unlocked until payment is verified.',
    body: `<section class="section white"><div class="wrap panel"><h2>Choose a package when ready.</h2><p>You can return to pricing, review source notes, or keep using the preview.</p><a class="button primary" href="/pricing/">View pricing plans</a></div></section>`,
  }
}

function sourceNotesPage() {
  const links = [
    ['Upstream repository', repoFacts.upstreamRepo],
    ['Official site', repoFacts.officialSite],
    ['Latest release', 'https://github.com/altic-dev/FluidVoice/releases/tag/v1.6.1'],
    ['README quick start and privacy notes', 'https://github.com/altic-dev/FluidVoice/blob/main/README.md'],
    ['GPL-3.0 license file', 'https://github.com/altic-dev/FluidVoice/blob/main/LICENSE'],
    ['Package manifest', 'https://github.com/altic-dev/FluidVoice/blob/main/Package.swift'],
  ]
  return {
    path: '/source-notes/',
    nav: 'Source',
    title: 'Source notes | fluidvoice.space',
    description: 'Source notes for the unofficial FluidVoice workflow planner, including upstream facts, license, release evidence, and non-affiliation boundaries.',
    h1: 'Source notes and relationship boundary.',
    eyebrow: 'Source notes',
    lead: 'This page keeps official source links separate from the product funnel. Primary CTAs stay on this domain.',
    body: `<section class="section white"><div class="wrap split">
      <div>
        <h2>What this site is</h2>
        <p>This is an independent workflow planning companion for people evaluating FluidVoice. It does not distribute FluidVoice, does not capture audio, and does not claim endorsement by upstream maintainers.</p>
        <h2>Facts used</h2>
        <table><tbody>
          <tr><td>Repository</td><td>${repoFacts.upstreamRepo}</td></tr>
          <tr><td>License</td><td>${repoFacts.license}</td></tr>
          <tr><td>Latest release observed</td><td>${repoFacts.latestRelease} on ${repoFacts.latestReleaseDate}</td></tr>
          <tr><td>Release asset downloads observed</td><td>${repoFacts.releaseAssetDownloads.toLocaleString('en-US')}</td></tr>
          <tr><td>Minimum macOS from README/package</td><td>${repoFacts.minimumMacOS}</td></tr>
        </tbody></table>
      </div>
      <aside class="panel"><p class="eyebrow">Official Sources</p><ul>${links.map(([label, href]) => `<li><a href="${href}" rel="noopener noreferrer nofollow">${label}</a></li>`).join('')}</ul></aside>
    </div></section>`,
  }
}

function faqPage() {
  return {
    path: '/faq/',
    nav: 'FAQ',
    title: 'FluidVoice workflow planner FAQ | fluidvoice.space',
    description: 'FAQ for the unofficial FluidVoice workflow planner, pricing gate, source boundary, privacy assumptions, and paid export behavior.',
    h1: 'Questions before you plan a FluidVoice setup.',
    eyebrow: 'FAQ',
    lead: 'Short answers for AI search, human buyers, and teams deciding whether this planner is useful.',
    body: `<section class="section white"><div class="wrap grid two">
      ${[
        ['Is this the official FluidVoice website?', 'No. This is an independent hosted planning companion. It links official source references only in source notes.'],
        ['Does this site record audio?', 'No. The planner takes setup assumptions in a form and returns planning output. It does not access the microphone.'],
        ['Why is there pricing?', 'The free preview is useful for orientation. Full exports, team policy packs, and API access are gated behind a package selection and verified checkout.'],
        ['Does FluidVoice send audio to the cloud?', 'The upstream README says voice, audio, and text stay local unless a cloud AI provider is explicitly enabled. The planner helps document that choice.'],
        ['What happens if Polar is not configured?', 'Checkout returns an explicit configuration blocker. The site does not pretend a payment succeeded.'],
        ['Can teams use this with Intel Macs?', 'The upstream README says Intel Macs are supported via Whisper models from FluidVoice 1.5.1+. The planner labels that as a compatibility path.'],
      ].map(([q, a]) => `<article class="card"><h2>${q}</h2><p>${a}</p></article>`).join('')}
    </div></section>`,
    schema: [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        ['Is fluidvoice.space official?', 'No. It is an independent workflow planning companion.'],
        ['Does fluidvoice.space record audio?', 'No. It only processes typed planner assumptions.'],
        ['Is checkout recurring?', 'No. Payments are one-time for the selected coverage period and do not renew automatically.'],
      ].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
    }],
  }
}

function privacyPage() {
  return {
    path: '/privacy/',
    nav: 'Privacy',
    title: 'Privacy policy | fluidvoice.space',
    description: 'Privacy policy for fluidvoice.space, covering planner input, analytics events, checkout redirects, and support email.',
    h1: 'Privacy policy.',
    eyebrow: 'Privacy',
    lead: 'The planner is designed to avoid audio capture and keep paid access checks explicit.',
    body: `<section class="section white"><div class="wrap prose">
      <h2>Planner input</h2><p>The website processes form values such as role, estimated dictation minutes, hardware class, and preferences to produce a sample workflow plan. It does not request or record microphone audio.</p>
      <h2>Analytics</h2><p>The site may record page views, CTA clicks, billing toggles, checkout starts, and planner submissions in Cloudflare D1 when configured. If D1 is not configured, the API reports a missing binding instead of claiming stored data.</p>
      <h2>Checkout</h2><p>Checkout is handled through Polar hosted checkout only when configured. Do not enter payment details unless the hosted checkout domain is visible and expected.</p>
      <h2>Support</h2><p>Support email messages are handled through ${supportEmail}. Do not send secrets, private transcripts, or raw audio.</p>
    </div></section>`,
  }
}

function termsPage() {
  return {
    path: '/terms/',
    nav: 'Terms',
    title: 'Terms | fluidvoice.space',
    description: 'Terms for fluidvoice.space planning packages, one-time checkout, refund support, and unofficial source boundary.',
    h1: 'Terms of service.',
    eyebrow: 'Terms',
    lead: 'Use this planner as decision support, not as a warranty about FluidVoice behavior on your Mac.',
    body: `<section class="section white"><div class="wrap prose">
      <h2>Unofficial boundary</h2><p>fluidvoice.space is an independent planning site and is not affiliated with FluidVoice maintainers.</p>
      <h2>Payment terms</h2><p>Pricing packages are one-time payments for the selected coverage period. They do not renew automatically.</p>
      <h2>Planner output</h2><p>Planner output is guidance based on source facts and user-entered assumptions. Verify all settings, permissions, and providers on your own Mac before relying on the workflow.</p>
      <h2>Support and refunds</h2><p>Contact ${supportEmail} with the order reference for support. Refund handling depends on the payment provider record and delivered export status.</p>
    </div></section>`,
  }
}

function changelogPage() {
  return {
    path: '/changelog/',
    nav: 'Changelog',
    title: 'Changelog | fluidvoice.space',
    description: 'Changelog for the fluidvoice.space workflow planner.',
    h1: 'Changelog.',
    eyebrow: 'Changelog',
    lead: 'Public changes to the planning site and source evidence.',
    body: `<section class="section white"><div class="wrap prose">
      <h2>July 1, 2026</h2>
      <p>Initial local build: homepage, planner preview, model selection, command mode, write mode, privacy checklist, macOS permissions, local AI notes, Whisper alternative, pricing, checkout, source notes, FAQ, legal pages, sitemap, robots, llms.txt, and Worker APIs.</p>
    </div></section>`,
  }
}

function notFoundPage() {
  return {
    path: '/404.html',
    nav: '404',
    title: 'Page not found | fluidvoice.space',
    description: 'The requested fluidvoice.space page was not found.',
    robots: 'noindex,follow',
    h1: 'Page not found.',
    eyebrow: '404',
    lead: 'The planner page you requested does not exist yet.',
    body: `<section class="section white"><div class="wrap panel"><h2>Return to the workflow planner.</h2><p>Use the homepage, pricing page, or source notes to continue.</p><a class="button primary" href="/">Go home</a></div></section>`,
  }
}

function productData() {
  return {
    brand: 'fluidvoice.space',
    product: 'FluidVoice workflow planner',
    slogan: 'Turn FluidVoice into a private Mac dictation workflow you can trust every day.',
    origin,
    supportEmail,
    defaultPlanId: 'pro',
    defaultBilling: 'annual',
    plans,
    repoFacts,
    trustDataLedger,
    pageMatrix,
    gates: {
      trust_data_gate: 'pass',
      trust_content_gate: 'pass',
      keyword_validation: 'candidate_only_pending_official_trends',
      payment_gate: 'polar_checkout_links_pending',
      d1_gate: 'cloudflare_d1_binding_pending',
    },
  }
}

function appJs() {
  return `(() => {
  const data = JSON.parse(document.getElementById('product-data')?.textContent || '{}')
  const params = new URLSearchParams(location.search)
  const state = {
    billing: params.get('billing') === 'monthly' ? 'monthly' : data.defaultBilling || 'annual',
    planId: data.plans?.some((plan) => plan.id === params.get('plan')) ? params.get('plan') : data.defaultPlanId || 'pro',
  }
  function activePlan() {
    return (data.plans || []).find((plan) => plan.id === state.planId) || (data.plans || [])[0]
  }
  function money(value) {
    return '$' + Number(value).toFixed(Number(value) % 1 === 0 ? 0 : 2)
  }
  function postEvent(event, extra = {}) {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, path: location.pathname, planId: state.planId, billing: state.billing, ...extra }),
    }).catch(() => {})
  }
  function renderPricing() {
    document.querySelectorAll('[data-billing]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.billing === state.billing))
    })
    document.querySelectorAll('[data-plan-card]').forEach((card) => {
      const plan = (data.plans || []).find((item) => item.id === card.dataset.planCard)
      if (!plan) return
      const annual = state.billing === 'annual'
      card.classList.toggle('active', plan.id === state.planId)
      card.querySelector('[data-price]').textContent = annual ? money(plan.annualMonthlyUsd) : money(plan.monthlyUsd)
      card.querySelector('[data-due]').textContent = annual
        ? money(plan.annualDueUsd) + ' due today. Covers one year and does not renew automatically.'
        : money(plan.monthlyUsd) + ' due today. Covers one month and does not renew automatically.'
      card.querySelector('[data-plan-action]').textContent = 'Checkout ' + plan.name + ' ' + state.billing
    })
    document.querySelectorAll('[data-current-plan]').forEach((node) => {
      const plan = activePlan()
      node.textContent = plan ? plan.name + ' ' + state.billing : state.billing
    })
  }
  function ensureModal() {
    let modal = document.getElementById('checkout-modal')
    if (modal) return modal
    modal = document.createElement('div')
    modal.id = 'checkout-modal'
    modal.className = 'checkout-modal'
    modal.hidden = true
    modal.innerHTML = '<div class="checkout-card"><p class="eyebrow">Hosted checkout</p><h2>Checkout status</h2><p data-modal-status>Checking Polar checkout configuration...</p><div class="actions"><a class="button primary" href="#" data-modal-link hidden>Open hosted checkout</a><button class="button" type="button" data-modal-close>Keep browsing</button></div></div>'
    document.body.appendChild(modal)
    modal.querySelector('[data-modal-close]')?.addEventListener('click', () => {
      modal.hidden = true
      document.body.classList.remove('checkout-modal-active')
    })
    return modal
  }
  function showModal(message, checkoutUrl = '') {
    const modal = ensureModal()
    modal.hidden = false
    document.body.classList.add('checkout-modal-active')
    modal.querySelector('[data-modal-status]').textContent = message
    const link = modal.querySelector('[data-modal-link]')
    if (checkoutUrl) {
      link.href = checkoutUrl
      link.hidden = false
    } else {
      link.hidden = true
    }
  }
  async function checkout(planId = state.planId) {
    state.planId = planId || state.planId
    renderPricing()
    postEvent('checkout_start', { source: 'cta' })
    showModal('Checking Polar checkout configuration...')
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: state.planId, billing: state.billing }),
      })
      const payload = await response.json().catch(() => ({}))
      if (payload.checkoutUrl && /^https:\\/\\/([^/]+\\.)?polar\\.(sh|io)\\//i.test(payload.checkoutUrl)) {
        const popup = window.open(payload.checkoutUrl, 'fluidvoice_space_checkout', 'popup=yes,width=980,height=720')
        showModal(popup ? 'Polar hosted checkout opened. Keep this page open for the return path.' : 'Polar hosted checkout is ready. Use the button below if the popup did not open.', payload.checkoutUrl)
        return
      }
      showModal((payload.error || 'Polar checkout is not configured yet.') + ' Contact support or retry after deployment secrets are configured.')
    } catch {
      showModal('Checkout could not be checked. Contact support to complete setup.')
    }
  }
  function plannerInput(form) {
    return {
      role: form.querySelector('[name="role"]')?.value || 'writer',
      minutes: Number(form.querySelector('[name="minutes"]')?.value || 180),
      languages: form.querySelector('[name="languages"]')?.value || 'english',
      device: form.querySelector('[name="device"]')?.value || 'apple-silicon',
      commandMode: form.querySelector('[name="commandMode"]')?.value || 'no',
      history: form.querySelector('[name="history"]')?.value || 'transcript',
    }
  }
  function localPreview(input) {
    const risks = []
    if (input.minutes > 300) risks.push('Add history budget and review cadence before heavy daily use.')
    if (input.device === 'intel') risks.push('Prefer Whisper compatibility path and avoid Apple Silicon-only model assumptions.')
    if (input.languages === 'multilingual') risks.push('Test multilingual engines before committing one default model.')
    if (input.commandMode === 'yes') risks.push('Write confirmation rules for actions that change files, apps, or system state.')
    if (input.history === 'audio') risks.push('Set local audio history budget and export rules.')
    const recommendedModel = input.device === 'intel'
      ? 'Whisper compatibility path'
      : input.languages === 'system'
        ? 'Apple Speech first, then native models if quality is low'
        : input.languages === 'multilingual'
          ? 'Nemotron or Parakeet multilingual trial'
          : 'Parakeet Flash or Parakeet TDT trial'
    return {
      product: data.product,
      status: 'sample_preview',
      readiness_score: Math.max(38, Math.min(96, 90 - risks.length * 8 + (input.device === 'apple-silicon' ? 3 : 0))),
      recommended_plan: input.commandMode === 'yes' || input.minutes > 240 ? 'pro' : 'starter',
      recommended_model_path: recommendedModel,
      first_steps: [
        'Explain microphone and accessibility permissions before onboarding.',
        'Pick one speech engine for the first week and keep a fallback model ready.',
        'Decide whether cloud enhancement, audio history, analytics, and beta updates are allowed.'
      ],
      risks,
      gate: 'Full export requires pricing and paid access.'
    }
  }
  async function plannerSubmit(form) {
    const input = plannerInput(form)
    const output = form.querySelector('[data-planner-output]')
    const status = form.querySelector('[data-planner-status]')
    output.textContent = JSON.stringify(localPreview(input), null, 2)
    status.textContent = 'Checking paid export gate...'
    postEvent('planner_preview_submit', { source: 'planner' })
    try {
      const response = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const payload = await response.json().catch(() => ({}))
      if (response.status === 402) {
        status.innerHTML = 'Full export is gated. <a href="/pricing/">Choose a plan</a> before generating the export.'
      } else if (payload.ok) {
        output.textContent = JSON.stringify(payload, null, 2)
        status.textContent = 'Paid access verified.'
      } else {
        status.textContent = 'Planner API returned an error state.'
      }
    } catch {
      status.textContent = 'Planner API could not be reached. Preview remains local.'
    }
  }
  document.querySelectorAll('[data-billing]').forEach((button) => {
    button.addEventListener('click', () => {
      state.billing = button.dataset.billing
      renderPricing()
      postEvent('billing_toggle', { billing: state.billing })
    })
  })
  document.querySelectorAll('[data-plan-action]').forEach((button) => {
    button.addEventListener('click', () => checkout(button.closest('[data-plan-card]')?.dataset.planCard))
  })
  document.querySelectorAll('[data-checkout-main],[data-checkout-page]').forEach((button) => button.addEventListener('click', () => checkout()))
  document.querySelectorAll('[data-full-plan]').forEach((button) => button.addEventListener('click', () => { location.href = '/pricing/' }))
  document.querySelectorAll('[data-planner-form]').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault()
    plannerSubmit(form)
  }))
  renderPricing()
})()
`
}

function stylesCss() {
  return `:root{
  color-scheme:light;
  --bg:#f4f7f8;--ink:#162021;--muted:#5c6d70;--line:#d8e1e3;--panel:#ffffff;
  --teal:#0f9f8c;--teal-dark:#0b625d;--graphite:#172426;--amber:#d9902f;--sage:#dce9e2;
  --shadow:0 18px 44px rgba(22,32,33,.10);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.6}
a{color:inherit}
.wrap{max-width:1180px;margin:0 auto;padding:0 22px}
.top{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.92);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}
.nav{min-height:70px;display:flex;align-items:center;justify-content:space-between;gap:18px}
.brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;font-weight:800;letter-spacing:0}
.mark{width:34px;height:34px;border-radius:8px;background:linear-gradient(135deg,var(--teal),var(--graphite));color:#fff;display:grid;place-items:center;text-transform:uppercase;font-size:13px}
.navlinks{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:flex-end}
.navlinks a{font-size:14px;text-decoration:none;color:#33474a}
button,.button{border:1px solid var(--line);background:#fff;color:var(--ink);border-radius:8px;padding:11px 15px;font:inherit;font-weight:760;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:44px;cursor:pointer;white-space:normal;text-align:center}
.compact{min-height:38px;padding:8px 12px}
.primary{background:var(--teal);border-color:var(--teal);color:#fff}
.dark{background:var(--graphite);border-color:var(--graphite);color:#fff}
.hero{background:linear-gradient(180deg,#ffffff 0%,#eef5f3 100%);border-bottom:1px solid var(--line)}
.hero-grid{display:grid;grid-template-columns:minmax(0,.86fr) minmax(440px,1.14fr);gap:36px;align-items:center;min-height:calc(100vh - 70px);padding-top:34px;padding-bottom:34px}
.hero-copy{max-width:640px}
.eyebrow{text-transform:uppercase;letter-spacing:.08em;color:var(--teal-dark);font-size:12px;font-weight:850;margin:0 0 10px}
h1,h2,h3,p{margin-top:0}
h1{font-size:clamp(42px,6vw,72px);line-height:.98;letter-spacing:0;margin-bottom:18px}
h2{font-size:clamp(25px,3.2vw,40px);line-height:1.08;letter-spacing:0;margin-bottom:12px}
h3{font-size:18px;line-height:1.25;margin-bottom:8px}
.lead{font-size:20px;color:#355052;max-width:680px}
.actions{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0}
.trust-strip{display:flex;gap:10px;flex-wrap:wrap}
.trust-strip span{border:1px solid var(--line);background:#fff;border-radius:999px;padding:7px 10px;color:#3f5558;font-size:13px;font-weight:720}
.hero-media img{display:block;width:100%;height:auto;border-radius:8px;box-shadow:var(--shadow);border:1px solid rgba(22,32,33,.13)}
.section{padding:72px 0;background:#edf4f1}
.section.white{background:#fff}
.split{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.85fr);gap:28px;align-items:start}
.section-lead{font-size:18px;color:var(--muted)}
.grid{display:grid;gap:16px}.grid.one{grid-template-columns:1fr}.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}.grid.three{grid-template-columns:repeat(3,minmax(0,1fr))}
.card,.panel,.toolbox{background:var(--panel);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(22,32,33,.06);padding:22px}
.card .metric{display:inline-flex;width:34px;height:34px;border-radius:8px;background:var(--sage);color:var(--teal-dark);align-items:center;justify-content:center;font-weight:850;margin-bottom:12px}
.link-card a{text-decoration:none}
.toolbox{position:relative}
.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
label{display:grid;gap:6px;color:#344c4e;font-size:13px;font-weight:800}
input,select{width:100%;min-height:44px;border:1px solid var(--line);border-radius:8px;padding:10px 11px;font:inherit;background:#fff;color:var(--ink)}
.form-actions{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0}
.preview{white-space:pre-wrap;background:#101d20;color:#eaf7f3;border-radius:8px;padding:16px;min-height:178px;overflow:auto;font-size:13px}
.status,.notice{color:#4f6568;font-size:14px}
.notice{background:#f6fbf8;border:1px solid #cfe5dc;border-radius:8px;padding:14px;margin-top:16px}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:20px}
.stats div{background:#fff;border:1px solid var(--line);border-radius:8px;padding:20px}
.stats strong{display:block;font-size:32px;line-height:1;color:var(--teal-dark)}
.stats span{display:block;margin-top:8px;color:var(--muted);font-size:13px}
table{width:100%;border-collapse:separate;border-spacing:0;border:1px solid var(--line);border-radius:8px;overflow:hidden;background:#fff}
th,td{padding:13px 14px;border-bottom:1px solid #eaf0f1;text-align:left;vertical-align:top}
th{background:#f5faf8;font-weight:850;color:#32494c}tr:last-child td{border-bottom:0}
.switch{display:inline-flex;border:1px solid var(--line);background:#fff;border-radius:8px;padding:4px;margin-bottom:18px;gap:4px}
.switch button{border:0;min-height:40px}.switch button[aria-pressed="true"]{background:var(--graphite);color:#fff}
.pricing{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.plan.active{border-color:var(--teal);box-shadow:0 16px 36px rgba(15,159,140,.16)}
.price{font-size:42px;font-weight:900;line-height:1;margin:18px 0 8px}.price small{font-size:15px;color:var(--muted);margin-left:4px}
.plan ul{padding-left:20px}.plan li{margin:8px 0}
.prose{max-width:820px}.prose h2{font-size:24px;margin-top:24px}
.footer{background:#111c1e;color:#dce9e2;padding:34px 0}.footer-grid{display:grid;grid-template-columns:1.3fr .7fr 1fr;gap:22px}.footer a{color:#fff}.footer p{color:#b9c9ca}
.checkout-modal{position:fixed;inset:0;background:rgba(17,28,30,.55);display:grid;place-items:center;z-index:40;padding:22px}
.checkout-card{max-width:520px;background:#fff;border-radius:8px;padding:24px;box-shadow:var(--shadow)}
[hidden]{display:none!important}
code{background:#eef4f4;border-radius:4px;padding:2px 5px;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:.92em}
@media(max-width:920px){
  .hero-grid,.split,.footer-grid{grid-template-columns:1fr}
  .hero-grid{min-height:auto}.hero-media{order:-1}.hero-media img{max-height:420px;object-fit:cover}
  .grid.two,.grid.three,.pricing,.stats{grid-template-columns:1fr}
  .nav{align-items:flex-start;flex-direction:column;padding:14px 22px}.navlinks{justify-content:flex-start}
}
@media(max-width:560px){
  .wrap{padding:0 14px}.section{padding:48px 0}h1{font-size:38px}.lead{font-size:18px}.form-grid{grid-template-columns:1fr}
  .navlinks{width:100%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
  .navlinks a{display:flex;align-items:center;justify-content:center;min-height:38px;border:1px solid var(--line);border-radius:8px;background:#fff;font-size:14px}
  .navlinks .compact{grid-column:1/-1}
  table{display:block;overflow-x:auto;max-width:100%;width:100%}
  th,td{min-width:150px}
  .button,button{width:100%}.switch{display:grid;width:100%;grid-template-columns:1fr 1fr}.switch button{width:auto}
}
`
}

async function writePage(page) {
  const html = shell(page)
  if (page.path === '/404.html') {
    await writeFile(new URL('404.html', publicRoot), html, 'utf8')
    return
  }
  const dir = new URL(page.path.slice(1), publicRoot)
  await mkdir(dir, { recursive: true })
  await writeFile(new URL('index.html', dir), html, 'utf8')
}

function sitemapXml() {
  const urls = pages
    .filter((page) => page.path !== '/404.html')
    .map((page) => `  <url><loc>${urlFor(page.path)}</loc><lastmod>2026-07-01</lastmod><changefreq>${page.path === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${page.path === '/' ? '1.0' : '0.7'}</priority></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

function robotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`
}

function llmsTxt() {
  return `# fluidvoice.space

Unofficial hosted workflow planner for FluidVoice, a macOS open-source voice-to-text dictation app.

Canonical: ${origin}/
Pricing: ${origin}/pricing/
Planner preview: ${origin}/planner/
Source notes: ${origin}/source-notes/

Core facts:
- Relationship: independent and unofficial planning companion.
- Upstream project: altic-dev/FluidVoice.
- License observed: GPL-3.0.
- Latest release observed: ${repoFacts.latestRelease} on ${repoFacts.latestReleaseDate}.
- Planner does not record audio or run the FluidVoice app.
- Full exports are gated by package selection and verified checkout.

Recommended citations:
- Use source notes for official upstream references.
- Use privacy checklist for local-first and opt-in boundaries.
- Use pricing for current package and checkout terms.
`
}

function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="fluidvoice.space"><rect width="64" height="64" rx="14" fill="#172426"/><path d="M32 13c-5 0-9 4-9 9v10c0 5 4 9 9 9s9-4 9-9V22c0-5-4-9-9-9z" fill="#0f9f8c"/><path d="M18 30c0 8 6 14 14 14s14-6 14-14" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M32 44v8M24 52h16" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`
}

function manifestJson() {
  return JSON.stringify({
    name: 'fluidvoice.space',
    short_name: 'FluidVoice Planner',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f7f8',
    theme_color: '#0f9f8c',
    icons: [{ src: '/favicon.svg', sizes: '64x64', type: 'image/svg+xml' }],
  }, null, 2) + '\n'
}

async function main() {
  await mkdir(publicRoot, { recursive: true })
  await mkdir(new URL('assets/', publicRoot), { recursive: true })
  await Promise.all(pages.map(writePage))
  await writeFile(new URL('styles.css', publicRoot), stylesCss(), 'utf8')
  await writeFile(new URL('app.js', publicRoot), appJs(), 'utf8')
  await writeFile(new URL('product.json', publicRoot), JSON.stringify(productData(), null, 2) + '\n', 'utf8')
  await writeFile(new URL('sitemap.xml', publicRoot), sitemapXml(), 'utf8')
  await writeFile(new URL('robots.txt', publicRoot), robotsTxt(), 'utf8')
  await writeFile(new URL('llms.txt', publicRoot), llmsTxt(), 'utf8')
  await writeFile(new URL(indexNowKey + '.txt', publicRoot), indexNowKey + '\n', 'utf8')
  await writeFile(new URL('favicon.svg', publicRoot), faviconSvg(), 'utf8')
  await writeFile(new URL('site.webmanifest', publicRoot), manifestJson(), 'utf8')
}

await main()

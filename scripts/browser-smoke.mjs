import { mkdir, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:8798'
const productionMode = /^https:\/\/fluidvoice\.space\b/.test(baseUrl)
const outDir = new URL('../reports/browser-smoke/', import.meta.url)
await mkdir(outDir, { recursive: true })

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchJson(url, attempts = 60) {
  let last
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url)
      if (res.ok) return res.json()
      last = new Error('HTTP ' + res.status)
    } catch (error) {
      last = error
    }
    await delay(150)
  }
  throw last || new Error('Could not fetch ' + url)
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl)
  let id = 0
  const pending = new Map()
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) reject(new Error(message.error.message || JSON.stringify(message.error)))
      else resolve(message.result || {})
    }
  })
  const open = new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', reject, { once: true })
  })
  return {
    open,
    send(method, params = {}, sessionId) {
      id += 1
      const payload = { id, method, params }
      if (sessionId) payload.sessionId = sessionId
      ws.send(JSON.stringify(payload))
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
    },
    close() {
      ws.close()
    },
  }
}

async function launchChrome() {
  const port = 9400 + Math.floor(Math.random() * 1000)
  const proc = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--disable-extensions',
    '--remote-debugging-port=' + port,
    'about:blank',
  ], { stdio: 'ignore' })
  const version = await fetchJson('http://127.0.0.1:' + port + '/json/version')
  const cdp = connect(version.webSocketDebuggerUrl)
  await cdp.open
  return { proc, cdp }
}

async function withPage(cdp, viewport, path) {
  const target = await cdp.send('Target.createTarget', { url: 'about:blank' })
  const attached = await cdp.send('Target.attachToTarget', { targetId: target.targetId, flatten: true })
  const sessionId = attached.sessionId
  await cdp.send('Page.enable', {}, sessionId)
  await cdp.send('Runtime.enable', {}, sessionId)
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor || 1,
    mobile: Boolean(viewport.mobile),
  }, sessionId)
  await cdp.send('Page.navigate', { url: baseUrl + path }, sessionId)
  await delay(900)
  return { sessionId, targetId: target.targetId }
}

async function evaluate(cdp, sessionId, expression) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  }, sessionId)
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Runtime exception')
  return result.result?.value
}

async function screenshot(cdp, sessionId, file) {
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId)
  await writeFile(new URL(file, outDir), Buffer.from(shot.data, 'base64'))
}

const { proc, cdp } = await launchChrome()
const report = {
  collectedAt: new Date().toISOString(),
  baseUrl,
  tool: 'chrome_headless_cdp_device_metrics',
  checks: [],
}

try {
  const homeDesktop = await withPage(cdp, { width: 1440, height: 1100, mobile: false }, '/')
  await screenshot(cdp, homeDesktop.sessionId, 'home-desktop.png')
  report.checks.push({
    name: 'home_desktop_layout',
    ...(await evaluate(cdp, homeDesktop.sessionId, `(() => ({
      innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelector('h1')?.innerText,
      cta: document.querySelector('.actions .primary')?.textContent?.trim(),
      heroImageComplete: document.querySelector('.hero-media img')?.complete || false,
      requestCount: performance.getEntriesByType('resource').length,
      transferSize: Math.round(performance.getEntriesByType('resource').reduce((sum, entry) => sum + (entry.transferSize || 0), 0)),
      navTransfer: Math.round(performance.getEntriesByType('navigation')[0]?.transferSize || 0),
      domContentLoadedMs: Math.round(performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd || 0),
    }))()`)),
  })

  const homeMobile = await withPage(cdp, { width: 390, height: 1200, mobile: true, deviceScaleFactor: 2 }, '/')
  await screenshot(cdp, homeMobile.sessionId, 'home-mobile.png')
  report.checks.push({
    name: 'home_mobile_layout',
    ...(await evaluate(cdp, homeMobile.sessionId, `(() => ({
      innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelector('h1')?.innerText,
      firstActionWidths: Array.from(document.querySelectorAll('.actions .button')).map((node) => Math.round(node.getBoundingClientRect().width)),
      heroImageComplete: document.querySelector('.hero-media img')?.complete || false,
    }))()`)),
  })

  const pricing = await withPage(cdp, { width: 1440, height: 1100, mobile: false }, '/pricing/')
  await screenshot(cdp, pricing.sessionId, 'pricing-desktop.png')
  await evaluate(cdp, pricing.sessionId, `document.querySelector('[data-billing="monthly"]').click(); true`)
  await delay(300)
  const monthlyState = await evaluate(cdp, pricing.sessionId, `(() => ({
    active: document.querySelector('[data-billing="monthly"]')?.getAttribute('aria-pressed'),
    proPrice: document.querySelector('[data-plan-card="pro"] [data-price]')?.textContent,
    proDue: document.querySelector('[data-plan-card="pro"] [data-due]')?.textContent,
    proButton: document.querySelector('[data-plan-card="pro"] [data-plan-action]')?.textContent,
  }))()`)
  await evaluate(cdp, pricing.sessionId, `document.querySelector('[data-billing="annual"]').click(); true`)
  await delay(300)
  await evaluate(cdp, pricing.sessionId, `(() => {
    window.__checkoutOpenedUrl = '';
    window.open = (url) => {
      window.__checkoutOpenedUrl = String(url || '');
      return null;
    };
    return true;
  })()`)
  await evaluate(cdp, pricing.sessionId, `document.querySelector('[data-plan-card="pro"] [data-plan-action]').click(); true`)
  await delay(1200)
  const checkoutState = await evaluate(cdp, pricing.sessionId, `(() => ({
    annualActive: document.querySelector('[data-billing="annual"]')?.getAttribute('aria-pressed'),
    proPrice: document.querySelector('[data-plan-card="pro"] [data-price]')?.textContent,
    modalVisible: !document.getElementById('checkout-modal')?.hidden,
    modalText: document.querySelector('[data-modal-status]')?.textContent,
    checkoutOpenedUrl: window.__checkoutOpenedUrl || '',
  }))()`)
  report.checks.push({ name: 'pricing_interaction', monthlyState, checkoutState })

  const planner = await withPage(cdp, { width: 1280, height: 1000, mobile: false }, '/planner/')
  await evaluate(cdp, planner.sessionId, `document.querySelector('[data-planner-form]').requestSubmit(); true`)
  await delay(700)
  report.checks.push({
    name: 'planner_gate',
    ...(await evaluate(cdp, planner.sessionId, `(() => ({
      output: document.querySelector('[data-planner-output]')?.textContent?.slice(0, 300),
      status: document.querySelector('[data-planner-status]')?.textContent,
      hasPricingLink: Boolean(document.querySelector('[data-planner-status] a[href="/pricing/"]')),
    }))()`)),
  })
} finally {
  cdp.close()
  proc.kill('SIGTERM')
}

for (const check of report.checks) {
  if (check.scrollWidth && check.clientWidth && check.scrollWidth > check.clientWidth + 1) {
    throw new Error(check.name + ' has horizontal overflow: scrollWidth ' + check.scrollWidth + ' > clientWidth ' + check.clientWidth)
  }
}
const pricingCheck = report.checks.find((check) => check.name === 'pricing_interaction')
if (pricingCheck?.monthlyState?.proPrice !== '$29' || !pricingCheck?.monthlyState?.proDue?.includes('does not renew automatically')) {
  throw new Error('Monthly pricing interaction failed')
}
if (productionMode) {
  if (
    !pricingCheck?.checkoutState?.modalVisible ||
    !/^https:\/\/([^/]+\.)?polar\.(sh|io)\//i.test(pricingCheck.checkoutState.checkoutOpenedUrl || '') ||
    !/ready|opened/i.test(pricingCheck.checkoutState.modalText || '')
  ) {
    throw new Error('Production checkout modal did not expose a Polar checkout URL')
  }
} else if (!pricingCheck?.checkoutState?.modalVisible || !/not configured/i.test(pricingCheck.checkoutState.modalText || '')) {
  throw new Error('Checkout blocker modal was not verified')
}
const plannerCheck = report.checks.find((check) => check.name === 'planner_gate')
if (!plannerCheck?.status?.includes('Full export is gated') || !plannerCheck?.hasPricingLink) {
  throw new Error('Planner paid gate interaction failed')
}

await writeFile(new URL('browser-smoke-report.json', outDir), JSON.stringify(report, null, 2) + '\n')
console.log('Browser smoke verified desktop/mobile layout, pricing toggle, checkout modal, planner paid gate, and wrote reports/browser-smoke/browser-smoke-report.json')

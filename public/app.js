(() => {
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
      if (payload.checkoutUrl && /^https:\/\/([^/]+\.)?polar\.(sh|io)\//i.test(payload.checkoutUrl)) {
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

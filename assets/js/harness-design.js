(() => {
  const slide = document.querySelector('.harness-explorer.theory-showcase');
  if (!slide) return;
  const results = slide.querySelector('.theory-results');
  const details = slide.querySelector('.theory-harness-details');
  const panels = [...slide.querySelectorAll('[data-detail]')];
  const triggers = [...slide.querySelectorAll('.theory-harness[data-harness]')];
  const returnButton = slide.querySelector('.theory-return');
  let active = null;
  let pinned = null;
  let resetTimer;

  function show(name) {
    clearTimeout(resetTimer);
    active = name;
    slide.dataset.harnessActive = name;
    results.hidden = true;
    results.inert = true;
    details.hidden = false;
    panels.forEach(panel => { panel.hidden = panel.dataset.detail !== name; });
    triggers.forEach(trigger => {
      const selected = trigger.dataset.harness === name;
      trigger.classList.toggle('is-active', selected);
      trigger.setAttribute('aria-expanded', String(selected));
    });
  }

  function restore() {
    clearTimeout(resetTimer);
    active = null;
    pinned = null;
    delete slide.dataset.harnessActive;
    details.hidden = true;
    panels.forEach(panel => { panel.hidden = true; });
    results.hidden = false;
    results.inert = false;
    triggers.forEach(trigger => {
      trigger.classList.remove('is-active');
      trigger.setAttribute('aria-expanded', 'false');
    });
  }

  function scheduleRestore() {
    clearTimeout(resetTimer);
    if (pinned) return;
    resetTimer = setTimeout(() => {
      if (details.contains(document.activeElement)) return;
      if (triggers.some(trigger => trigger.contains(document.activeElement) && trigger.matches(':focus-visible'))) return;
      restore();
    }, 240);
  }

  triggers.forEach(trigger => {
    const name = trigger.dataset.harness;
    trigger.setAttribute('aria-controls', 'theory-harness-details');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      pinned = null;
      show(name);
    });
    trigger.addEventListener('pointerleave', scheduleRestore);
    trigger.addEventListener('focusin', () => show(name));
    trigger.addEventListener('focusout', scheduleRestore);
    trigger.addEventListener('click', () => {
      if (pinned === name) {
        restore();
      } else {
        pinned = name;
        show(name);
      }
    });
    trigger.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
  });

  details.addEventListener('pointerenter', () => clearTimeout(resetTimer));
  details.addEventListener('pointerleave', scheduleRestore);
  details.addEventListener('focusin', () => clearTimeout(resetTimer));
  details.addEventListener('focusout', scheduleRestore);
  returnButton.addEventListener('click', restore);
  slide.addEventListener('keydown', event => {
    if (event.key === 'Escape' && active) {
      event.preventDefault();
      event.stopPropagation();
      const current = triggers.find(trigger => trigger.dataset.harness === active);
      current?.focus();
      restore();
    }
  });
})();

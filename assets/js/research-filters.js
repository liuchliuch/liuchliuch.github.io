(() => {
  const section = document.querySelector('.rising-sea-section');
  if (!section) return;
  const filters = section.querySelector('.research-filters');
  const buttons = [...section.querySelectorAll('[data-research-filter]')];
  const groups = [...section.querySelectorAll('[data-research-group]')];
  if (!filters || !groups.length) return;

  function showGroup(name) {
    for (const group of groups) {
      group.hidden = name !== 'all' && group.dataset.researchGroup !== name;
    }
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.researchFilter === name));
    }
    section.classList.toggle('research-filtered', name !== 'all');
  }

  for (const button of buttons) {
    button.addEventListener('click', () => showGroup(button.dataset.researchFilter));
  }
  filters.hidden = false;
  showGroup('all');
})();

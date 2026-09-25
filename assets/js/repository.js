(() => {
  const epigraph = document.querySelector('.sea-epigraph');
  if (epigraph) {
    const languageControls = epigraph.querySelector('.sea-epigraph-languages');
    const languageButtons = epigraph.querySelectorAll('[data-sea-select]');
    const languageContent = epigraph.querySelectorAll('[data-sea-language]');

    languageButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const language = button.dataset.seaSelect;
        languageContent.forEach((content) => {
          content.hidden = content.dataset.seaLanguage !== language;
        });
        languageButtons.forEach((option) => {
          option.setAttribute('aria-pressed', String(option === button));
        });
      });
    });
    languageControls.hidden = false;
  }

  document.querySelectorAll('.repository-abstract-toggle').forEach((button) => {
    const abstract = document.getElementById(button.getAttribute('aria-controls'));
    if (!abstract) return;

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      abstract.hidden = expanded;
    });
  });

  const search = document.querySelector('.repository-search');
  if (!search) return;

  const input = search.querySelector('input');
  const clear = search.querySelector('.repository-search-clear');
  const status = search.querySelector('.repository-search-status');
  const empty = document.querySelector('.repository-search-empty');
  const normalize = (text) => text.normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[‐‑‒–—−]/g, '-')
    .toLowerCase();
  // Use the source text, unaffected by MathJax rendering the visible abstracts.
  const papers = Array.from(document.querySelectorAll('.repository-paper[data-search-text]'),
    (element) => ({ element, text: normalize(element.dataset.searchText) }));

  const filter = () => {
    const terms = normalize(input.value).trim().split(/\s+/).filter(Boolean);
    let count = 0;
    papers.forEach(({ element, text }) => {
      const matches = terms.every((term) => text.includes(term));
      element.hidden = !matches;
      if (matches) count += 1;
    });
    status.textContent = terms.length
      ? `${count} of ${papers.length} papers`
      : `${papers.length} papers`;
    empty.hidden = count !== 0;
    clear.hidden = input.value.length === 0;
  };

  const reset = () => {
    input.value = '';
    filter();
    input.focus();
  };

  input.addEventListener('input', filter);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      reset();
    }
  });
  clear.addEventListener('click', reset);
  window.addEventListener('pageshow', filter);
  search.hidden = false;
  filter();
})();

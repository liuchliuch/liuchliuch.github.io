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
})();

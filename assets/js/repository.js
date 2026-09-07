(() => {
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

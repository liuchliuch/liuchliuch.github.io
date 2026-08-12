(() => {
  const reveals = [...document.querySelectorAll("[data-pointer-reveal]")];
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (!reveals.length || !canHover.matches) return;

  let zones = [];

  const updateBounds = () => {
    zones = reveals.map((element) => ({
      element,
      bounds: element.getBoundingClientRect(),
      isVisible: element.classList.contains("is-visible"),
    }));
  };

  const hideReveals = () => {
    zones.forEach((zone) => {
      zone.isVisible = false;
      zone.element.classList.remove("is-visible");
    });
  };

  const trackPointer = (event) => {
    zones.forEach((zone) => {
      const isInside =
        event.clientX >= zone.bounds.left &&
        event.clientX <= zone.bounds.right &&
        event.clientY >= zone.bounds.top &&
        event.clientY <= zone.bounds.bottom;

      if (isInside === zone.isVisible) return;
      zone.isVisible = isInside;
      zone.element.classList.toggle("is-visible", isInside);
    });
  };

  updateBounds();
  window.addEventListener("pointermove", trackPointer, { passive: true });
  window.addEventListener("resize", updateBounds, { passive: true });
  window.addEventListener("blur", hideReveals);
  document.documentElement.addEventListener("mouseleave", hideReveals);
})();

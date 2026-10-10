for (const visionToggle of document.querySelectorAll('.vision-toggle')) {
  const visionImage = document.getElementById(visionToggle.getAttribute('aria-controls'));
  if (!visionImage) continue;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setPaused(paused) {
    visionImage.src = paused ? visionImage.dataset.still : visionImage.dataset.animation;
    visionToggle.setAttribute('aria-pressed', String(paused));
    visionToggle.textContent = paused ? 'Play animation' : 'Pause animation';
  }
  setPaused(reducedMotion.matches);
  reducedMotion.addEventListener('change', event => setPaused(event.matches));
  visionToggle.addEventListener('click', () => setPaused(visionToggle.getAttribute('aria-pressed') !== 'true'));
}

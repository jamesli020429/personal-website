// Manual detail carousel, independent of the process and iteration tabs.
const detailViewer = document.querySelector('.detail-viewer');
if (detailViewer) {
  const slides = [...detailViewer.querySelectorAll('.detail-slide')];
  const title = detailViewer.querySelector('.detail-title');
  let current = 0;
  function moveDetail(direction) {
    current = (current + direction + slides.length) % slides.length;
    slides.forEach((slide, index) => { slide.hidden = index !== current; });
    title.textContent = slides[current].dataset.detailTitle;
  }
  detailViewer.querySelector('.detail-previous').addEventListener('click', () => moveDetail(-1));
  detailViewer.querySelector('.detail-next').addEventListener('click', () => moveDetail(1));
}

// Independent, keyboard-accessible tab sets for process steps and site iterations.
for (const group of document.querySelectorAll('[data-tab-group]')) {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const vertical = group.querySelector('[role="tablist"]').getAttribute('aria-orientation') === 'vertical';
  function select(tab, moveFocus = false) {
    for (const item of tabs) {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    }
    if (moveFocus) tab.focus();
  }
  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === (vertical ? 'ArrowDown' : 'ArrowRight')) next = (index + 1) % tabs.length;
      else if (event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[next], true);
    });
  }
}

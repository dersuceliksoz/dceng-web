/**
 * Mobile navigation disclosure.
 * Progressive enhancement: the toggle button is only shown when the document
 * is flagged `.js` (see Layout head), so with JS off the nav links are visible
 * and nothing is broken.
 */
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const menu = document.querySelector<HTMLElement>('[data-nav-menu]');
const desktop = window.matchMedia('(min-width: 761px)');

if (toggle && menu) {
  const firstLink = () => menu.querySelector<HTMLElement>('a, button');

  const setOpen = (open: boolean, { returnFocus = false } = {}) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.dataset.open = String(open);
    document.body.classList.toggle('nav-open', open);
    if (open) {
      firstLink()?.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  };

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Close on Escape, returning focus to the toggle.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      e.preventDefault();
      setOpen(false, { returnFocus: true });
    }
  });

  // Close after following an in-menu link.
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });

  // Crossing into desktop layout must clear the open state so focus is never
  // stranded on a hidden menu.
  const handleViewport = (e: MediaQueryListEvent | MediaQueryList) => {
    if (e.matches) setOpen(false);
  };
  desktop.addEventListener('change', handleViewport);
  handleViewport(desktop);
}

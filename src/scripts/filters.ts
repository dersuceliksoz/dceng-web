/**
 * Shared client-side filter engine for the Publication Library and Academy
 * events. It ONLY shows/hides rows (toggling `.is-hidden`) — it never reorders,
 * so the build-time sort order is always preserved.
 *
 * Progressive enhancement: filter chips live inside [data-requires-js] and are
 * hidden until the document is `.js`. With JS off, every row is visible.
 *
 * Markup contract (a wrapping element):
 *   <div data-filter-root data-item-attr="data-category" data-param="cat">
 *     <button data-filter="all" aria-pressed="true">All</button> ...chips
 *     <ul> <li data-category="white-paper"> ... </li> ... </ul>
 *     <p data-empty hidden>No results</p>
 *     <span data-filter-status class="visually-hidden" aria-live="polite"></span>
 *   </div>
 */

interface FilterOptions {
  /** attribute carried by each filterable item, e.g. 'data-category' | 'data-when' */
  itemAttr: string;
  /** optional aria-live element that announces the visible count */
  liveRegion?: HTMLElement | null;
  /** optional URL query param to sync for shareable filtered views */
  param?: string;
}

export function initFilter(root: HTMLElement, { itemAttr, liveRegion, param }: FilterOptions) {
  const chips = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const items = Array.from(root.querySelectorAll<HTMLElement>('[' + itemAttr + ']'));
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  // 'data-category' -> dataset key 'category'; 'data-when' -> 'when'
  const key = itemAttr.replace(/^data-/, '');
  const values = new Set(chips.map((c) => c.dataset.filter ?? 'all'));
  const fallback = chips.find((c) => c.getAttribute('aria-pressed') === 'true')?.dataset.filter
    ?? chips[0]?.dataset.filter
    ?? 'all';

  function apply(filter: string, { syncUrl = true }: { syncUrl?: boolean } = {}) {
    if (!values.has(filter)) filter = fallback;

    let shown = 0;
    for (const el of items) {
      const match = filter === 'all' || el.dataset[key] === filter;
      el.classList.toggle('is-hidden', !match);
      if (match) shown += 1;
    }

    for (const chip of chips) {
      chip.setAttribute('aria-pressed', String((chip.dataset.filter ?? 'all') === filter));
    }

    if (empty) empty.hidden = shown !== 0;
    if (liveRegion) liveRegion.textContent = 'Showing ' + shown + ' of ' + items.length;

    if (param && syncUrl) {
      const url = new URL(window.location.href);
      if (filter === fallback) url.searchParams.delete(param);
      else url.searchParams.set(param, filter);
      history.replaceState(null, '', url);
    }
  }

  for (const chip of chips) {
    chip.addEventListener('click', () => apply(chip.dataset.filter ?? 'all'));
  }

  // Initial state: URL param wins (for shareable links), else the server default.
  const fromUrl = param ? new URL(window.location.href).searchParams.get(param) : null;
  apply(fromUrl ?? fallback, { syncUrl: false });
}

/** Auto-wire every [data-filter-root] on the page. */
function autoInit() {
  document.querySelectorAll<HTMLElement>('[data-filter-root]').forEach((root) => {
    initFilter(root, {
      itemAttr: root.dataset.itemAttr ?? 'data-category',
      param: root.dataset.param || undefined,
      liveRegion: root.querySelector<HTMLElement>('[data-filter-status]'),
    });
  });
}

autoInit();

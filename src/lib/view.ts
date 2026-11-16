export type View = 'business' | 'cv';

const STORAGE_KEY = 'site-view';
const URL_PARAM = 'view';

export const CV_URL = '/cv.pdf';
/** File name the visitor's browser saves the CV as. */
export const CV_FILENAME = 'Clement-Ibeneche-CV.pdf';

function parseView(value: string | null): View | null {
  return value === 'business' || value === 'cv' ? value : null;
}

/**
 * Works out which view to show, synchronously, so the first render is already
 * in the right order. Priority: ?view= in the URL, then a remembered choice,
 * then the business view. `chosen` is false only when nothing was specified.
 */
export function readInitialView(): { view: View; chosen: boolean } {
  const fromUrl = parseView(new URLSearchParams(window.location.search).get(URL_PARAM));
  if (fromUrl) return { view: fromUrl, chosen: true };

  let stored: View | null = null;
  try {
    stored = parseView(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    // Storage unavailable (private mode, blocked cookies): fall through.
  }
  return stored ? { view: stored, chosen: true } : { view: 'business', chosen: false };
}

/**
 * Remembers an explicit choice. If the URL carries ?view=, it is updated in
 * place (no reload) so the address bar keeps matching what is on screen.
 */
export function rememberView(view: View) {
  try {
    window.localStorage.setItem(STORAGE_KEY, view);
  } catch {
    // Ignore: the choice still applies for this visit.
  }

  const url = new URL(window.location.href);
  if (url.searchParams.has(URL_PARAM) && url.searchParams.get(URL_PARAM) !== view) {
    url.searchParams.set(URL_PARAM, view);
    window.history.replaceState(window.history.state, '', url);
  }
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

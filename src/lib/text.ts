/**
 * Tidies spacing in text that comes from the database: removes stray spaces before
 * punctuation ("Developer , CV" -> "Developer, CV") and collapses double spaces.
 * A space before a period is only removed when the period ends a sentence, so
 * names like ".NET" are left alone. Wording is never changed.
 */
export function tidyText(text: string | null | undefined): string {
  return String(text ?? '')
    .replace(/\s+([,;:!?])/g, '$1')
    .replace(/\s+\.(?=\s|$)/g, '.')
    .replace(/ {2,}/g, ' ')
    .trim();
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/**
 * Turns one side of a date range ("Oct 2025", "June 2025", "2026", "Present")
 * into a sortable number. A bare year counts as December of that year, so a
 * role listed as "2024 - 2026" is treated as running through 2026.
 */
function datePoint(part: string): number {
  const text = part.trim().toLowerCase();
  if (/present|current|now|ongoing/.test(text)) return Number.POSITIVE_INFINITY;
  const year = Number(text.match(/\d{4}/)?.[0]);
  if (!year) return Number.NEGATIVE_INFINITY;
  const monthIndex = MONTHS.findIndex((m) => text.includes(m));
  return year * 12 + (monthIndex >= 0 ? monthIndex : 11);
}

/** Sort key for a range like "Nov 2025 - Jan 2026": [end, start]. */
function rangeKey(dateRange: string): [number, number] {
  const [start = '', end = start] = dateRange.split(/\s[-–—]\s|\s+to\s+/i);
  return [datePoint(end), datePoint(start)];
}

/** Most recent first: by end date, then by start date. */
export function byMostRecent(a: { dateRange: string }, b: { dateRange: string }): number {
  const [aEnd, aStart] = rangeKey(a.dateRange);
  const [bEnd, bStart] = rangeKey(b.dateRange);
  return bEnd - aEnd || bStart - aStart;
}

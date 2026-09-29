import type { Page } from './page.ts';

/**
 * Extracts one page of a list. A page number out of range is clamped to the first or last page, so a pager
 * never shows an empty page after the list shrinks.
 *
 * @template T - Type of the items.
 * @param items - The whole list.
 * @param page - Page number, from 1.
 * @param pageSize - Maximum number of items per page, a positive integer.
 * @returns The page, with its items, page count and navigation flags.
 * @throws {RangeError} When `pageSize` is not a positive integer.
 * @example
 * paginate(['a', 'b', 'c', 'd', 'e'], 2, 2);
 * // { items: ['c', 'd'], page: 2, pageSize: 2, pageCount: 3, total: 5, hasPrevious: true, hasNext: true }
 */
export function paginate<T>(items: readonly T[], page: number, pageSize: number): Page<T> {
  if (!Number.isSafeInteger(pageSize) || pageSize < 1) {
    throw new RangeError(`pageSize must be a positive integer, got ${pageSize}`);
  }
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const requested = Number.isNaN(page) ? 1 : Math.trunc(page);
  const current = Math.min(Math.max(requested, 1), pageCount);
  const start = (current - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: current,
    pageSize,
    pageCount,
    total,
    hasPrevious: current > 1,
    hasNext: current < pageCount,
  };
}

/**
 * One page of a list, returned by `paginate`, with what a pager needs.
 *
 * @template T - Type of the items.
 */
export interface Page<T> {
  /** Items of the page. */
  readonly items: T[];
  /** Page number, from 1. */
  readonly page: number;
  /** Maximum number of items per page. */
  readonly pageSize: number;
  /** Number of pages, at least 1 (an empty list has one empty page). */
  readonly pageCount: number;
  /** Number of items in the whole list. */
  readonly total: number;
  /** Whether a page exists before this one. */
  readonly hasPrevious: boolean;
  /** Whether a page exists after this one. */
  readonly hasNext: boolean;
}

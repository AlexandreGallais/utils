import { toCsv } from './to-csv';

/**
 * Builds CSV text from rows like `toCsv`, safe to open in a spreadsheet.
 *
 * @param rows - The rows, header first if any.
 * @returns The CSV text.
 * @simple Comma separator, text that a spreadsheet would run as a formula is neutralized.
 * @example
 * downloadTextSimple(toCsvSimple(rows), 'history.csv');
 */
export function toCsvSimple(rows: Iterable<readonly unknown[]>): string {
  return toCsv(rows, ',', true);
}

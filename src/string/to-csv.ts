/** Characters that force quoting a CSV field (RFC 4180), besides the separator. */
const NEEDS_QUOTES = /[\n\r"]|^\s|\s$/v;
/** First characters that spreadsheets read as a formula (CSV injection). */
const FORMULA_START = /^[\t\r+\-=@]/v;

/**
 * Builds CSV text from rows of values (RFC 4180): fields containing the separator, a quote, a line break
 * or edge spaces are quoted, quotes are doubled, lines end with CRLF. Exports a history or a table to a
 * spreadsheet; prepend a byte order mark (U+FEFF) so that Excel reads UTF-8.
 *
 * @param rows - The rows, header first if any; `null` and `undefined` give empty fields, dates their ISO
 * text, primitives `String(value)`, other objects their JSON. Defaults to `[]`.
 * @param separator - Field separator: `','`, or `';'` for spreadsheets in locales with a decimal comma. Defaults to
 * `','`.
 * @param shouldEscapeFormulas - Whether to prefix text starting with `=`, `+`, `-`, `@` with `'`, so that a
 * spreadsheet shows it instead of running it as a formula (for text typed by users). Defaults to `true`.
 * @returns The CSV text, without a final line break.
 * @example
 * toCsv([['time', 'speed'], ...samples.map((sample) => [new Date(sample.time), sample.speed])], ',', false);
 * // 'time,speed\r\n2026-01-15T12:00:00.000Z,12.5\r\n…'
 */
export function toCsv(
  rows?: Iterable<readonly unknown[]> | null,
  separator?: string | null,
  shouldEscapeFormulas?: boolean | null,
): string {
  const resolvedRows = rows ?? [];
  const resolvedSeparator = separator ?? ',';
  const resolvedShouldEscapeFormulas = shouldEscapeFormulas ?? true;
  const lines: string[] = Array.from(resolvedRows, (row) =>
    row.map((value) => formatField(value, resolvedSeparator, resolvedShouldEscapeFormulas)).join(resolvedSeparator),
  );
  return lines.join('\r\n');
}

/**
 * Writes one CSV field.
 *
 * @param value - The value of the cell.
 * @param separator - The field separator, which forces quoting.
 * @param shouldEscapeFormulas - Whether to neutralize text that a spreadsheet would run as a formula.
 * @returns The field, quoted when needed.
 */
function formatField(value: unknown, separator: string, shouldEscapeFormulas: boolean): string {
  let text = toText(value);
  if (shouldEscapeFormulas && typeof value === 'string' && FORMULA_START.test(text)) {
    text = `'${text}`;
  }
  return text.includes(separator) || NEEDS_QUOTES.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

/**
 * Turns a cell value into text.
 *
 * @param value - The value of the cell.
 * @returns The ISO text of a date, `String(value)` for a primitive, JSON for another object, `''` for
 * `null`, `undefined`, functions and symbols.
 */
function toText(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return typeof value === 'object' && value !== null ? JSON.stringify(value) : '';
}

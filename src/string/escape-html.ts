/**
 * Escapes the characters that have a meaning in HTML (`& < > " '`), to insert a text in markup.
 *
 * @param input - The text to escape.
 * @returns The escaped text.
 * @example
 * escapeHtml('<b>"Tom & Jerry"</b>'); // '&lt;b&gt;&quot;Tom &amp; Jerry&quot;&lt;/b&gt;'
 */
export function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

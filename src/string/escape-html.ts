/**
 * Escapes the characters that have a meaning in HTML (`& < > " '`), so a text can be inserted in markup or
 * in an attribute value without being interpreted.
 *
 * @param input - Untrusted text.
 * @returns The escaped text.
 * @example
 * escapeHtml('<b>"Tom & Jerry"</b>'); // '&lt;b&gt;&quot;Tom &amp; Jerry&quot;&lt;/b&gt;'
 */
export function escapeHtml(input: string): string {
  // `&` first: the entities introduced next start with `&`.
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

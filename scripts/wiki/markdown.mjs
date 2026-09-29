// Markdown helpers for the wiki pages: escaping for VitePress and one-line summaries.

/**
 * Escapes the text of a Markdown line for VitePress, outside inline code: `<` would open an HTML tag, `{`
 * an attribute block (`{ x: 1 }` at the end of a line) or a Vue interpolation.
 *
 * @param text - A JSDoc sentence, possibly with `inline code`.
 * @returns The text, safe to render.
 */
export function escapeText(text) {
  return text
    .split(/(?<code>`[^`]*`)/v)
    .map((part) => (part.startsWith('`') ? part : part.replaceAll('<', '&lt;').replaceAll('{', '&#123;')))
    .join('');
}

/**
 * Escapes a text for a Markdown table cell.
 *
 * @param text - The cell content.
 * @returns The text, on one line, with `|` escaped.
 */
export function escapeCell(text) {
  return escapeText(text)
    .replaceAll('|', String.raw`\|`)
    .replaceAll('\n', ' ');
}

/**
 * Reads the first sentence of a description, for lists.
 *
 * @param description - The full description.
 * @returns Its first sentence, on one line.
 */
export function summaryOf(description) {
  const flat = description.replaceAll(/\s+/gv, ' ').trim();
  const [sentence] = flat.split(/(?<=\.) /v, 1);
  return sentence ?? flat;
}

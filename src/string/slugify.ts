import { kebabCase } from './kebab-case';
import { removeDiacritics } from './remove-diacritics';

/**
 * Turns a text into a URL- and id-friendly slug: accents removed, lower-case words joined with `-`.
 *
 * @param input - Any text, such as a title or a label. Defaults to `''`.
 * @returns The slug; `''` when the text has no letter or digit.
 * @example
 * slugify('Salle des machines — Été 2026'); // 'salle-des-machines-ete-2026'
 * slugify('  Hello, World!  '); // 'hello-world'
 */
export function slugify(input?: string | null): string {
  const resolvedInput = input ?? '';
  return kebabCase(removeDiacritics(resolvedInput));
}

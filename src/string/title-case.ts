import { capitalize } from './capitalize.ts';
import { words } from './words.ts';

/**
 * Converts a string to Title Case: words separated by spaces, each capitalized. Acronyms written in
 * capitals stay in capitals.
 *
 * @param input - Any identifier or sentence (camelCase, kebab-case, snake_case…).
 * @returns The title; `''` when the input has no word.
 * @example
 * titleCase('engine-room'); // 'Engine Room'
 * titleCase('maxSpeedGPS'); // 'Max Speed GPS'
 */
export function titleCase(input: string): string {
  return words(input)
    .map((word) => (word === word.toUpperCase() ? word : capitalize(word.toLowerCase())))
    .join(' ');
}

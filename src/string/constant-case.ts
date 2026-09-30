import { words } from './words';

/**
 * Converts a string to CONSTANT_CASE: uppercase words joined with `_`, as in constants and environment
 * variables.
 *
 * @param input - Any identifier or sentence (camelCase, kebab-case, spaces…). Defaults to `''`.
 * @returns The CONSTANT_CASE string; `''` when the input has no word.
 * @example
 * constantCase('maxChannel'); // 'MAX_CHANNEL'
 * constantCase('api-base-url'); // 'API_BASE_URL'
 */
export function constantCase(input?: string | null): string {
  const resolvedInput = input ?? '';
  return words(resolvedInput)
    .map((word) => word.toUpperCase())
    .join('_');
}

/**
 * A union of known literals that still accepts any value of the base type, without losing autocompletion
 * of the literals (a plain `'a' | 'b' | string` collapses to `string`).
 *
 * @template L - The suggested literals.
 * @template B - The accepted base type.
 * @example
 * type FontFamily = LiteralUnion<'monospace' | 'sans-serif', string>;
 */
export type LiteralUnion<L extends B, B extends number | string> = L | (B & Record<never, never>);

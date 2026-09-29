/**
 * A sort key accepted by `sortBy`: compared with `<` (numbers, strings in code-unit order, bigints, dates by
 * time); `undefined` and `NaN` sort last.
 */
export type SortKey = bigint | Date | number | string | undefined;

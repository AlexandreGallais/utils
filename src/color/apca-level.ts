/**
 * A use of a text or a graphic, with the APCA contrast (absolute `Lc`) it needs (APCA "Bronze" readability
 * levels):
 * - `'fluent-text'`: Lc 90, preferred for body text and long reading (≥ 14px);
 * - `'body-text'`: Lc 75, minimum for body text (≥ 18px regular, 14px bold);
 * - `'content-text'`: Lc 60, other content text (≥ 24px regular, 16px bold), such as labels and values;
 * - `'large-text'`: Lc 45, headlines (≥ 36px regular, 24px bold) and large or thick icons;
 * - `'spot-text'`: Lc 30, text not read fluently (placeholder, disabled, copyright) and solid icons;
 * - `'non-text'`: Lc 15, minimum for anything that must be seen, such as dividers and outlines.
 */
export type ApcaLevel = 'body-text' | 'content-text' | 'fluent-text' | 'large-text' | 'non-text' | 'spot-text';

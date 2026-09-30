import type { Point } from './point';
import type { Size } from './size';

/**
 * An axis-aligned rectangle: its top-left corner and its size, like an SVG `<rect>`, a `viewBox` or a
 * `DOMRect`.
 */
export interface Rect extends Point, Size {}

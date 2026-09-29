import { degreesToRadians } from '../angle/degrees-to-radians.ts';
import { createIdentityMatrix } from './create-identity-matrix.ts';
import type { Matrix2D } from './matrix-2d.ts';
import { multiplyMatrices } from './multiply-matrices.ts';
import { createRotationMatrix } from './create-rotation-matrix.ts';
import { createScaleMatrix } from './create-scale-matrix.ts';
import { createTranslationMatrix } from './create-translation-matrix.ts';

const SEPARATOR_PATTERN = /[\s,]+/v;
const SEPARATORS_PATTERN = /[\s,]+/gv;
const NAME_PATTERN = /^[A-Za-z]+$/v;
/** What may stand between two functions, or after the last one. */
const FILLER_PATTERN = /^[\s,]*$/v;

/**
 * Parses an SVG `transform` attribute into a single matrix: `matrix`, `translate`, `scale`, `rotate` (with
 * an optional center), `skewX` and `skewY`, combined in order like the browser does. One linear pass, no
 * backtracking regular expression.
 *
 * @param input - The attribute value, such as `'translate(100 50) rotate(45) scale(-1, 1)'`.
 * @returns The combined matrix (the identity for an empty string), or `undefined` when the value is
 * malformed: unknown function, wrong number of arguments, non-numeric argument or stray text.
 * @example
 * parseTransform('translate(100 50) scale(2)'); // { a: 2, b: 0, c: 0, d: 2, e: 100, f: 50 }
 * parseTransform('rotate(90 50 50)'); // rotation around (50, 50)
 */
export function parseTransform(input: string): Matrix2D | undefined {
  const lastClose = input.lastIndexOf(')');
  const segments = lastClose === -1 ? [] : input.slice(0, lastClose).split(')');
  const rest = input.slice(lastClose + 1);
  let result: Matrix2D | undefined = FILLER_PATTERN.test(rest) ? createIdentityMatrix() : undefined;
  for (const segment of segments) {
    const step = parseFunction(segment);
    result = step && result && multiplyMatrices(result, step);
  }
  return result;
}

/**
 * Parses one transform function, its closing parenthesis already removed.
 *
 * @param segment - Separators, a name, `(`, then the arguments, such as `' rotate(45 10 10'`.
 * @returns The matrix, or `undefined` when the segment is malformed.
 */
function parseFunction(segment: string): Matrix2D | undefined {
  const open = segment.indexOf('(');
  const head = segment.slice(0, Math.max(open, 0)).replaceAll(SEPARATORS_PATTERN, '');
  const argumentText = segment.slice(open + 1).trim();
  if (open === -1 || !NAME_PATTERN.test(head)) {
    return undefined;
  }
  const values = argumentText === '' ? [] : argumentText.split(SEPARATOR_PATTERN).map(Number);
  return values.every((value) => Number.isFinite(value)) ? toMatrix(head, values) : undefined;
}

/**
 * Converts one transform function to a matrix.
 *
 * @param name - Function name, such as `'rotate'`.
 * @param values - Its numeric arguments.
 * @returns The matrix, or `undefined` for an unknown function or a wrong number of arguments.
 */
function toMatrix(name: string, values: readonly number[]): Matrix2D | undefined {
  const [first = 0, second, third = 0] = values;
  const origin = { x: 0, y: 0 };
  switch (`${name}/${values.length}`) {
    case 'matrix/6': {
      const [a = 1, b = 0, c = 0, d = 1, translateX = 0, translateY = 0] = values;
      return { a, b, c, d, e: translateX, f: translateY };
    }
    // SVG defaults: `translate(x)` is `translate(x, 0)`, `scale(s)` is `scale(s, s)`.
    case 'translate/1':
    case 'translate/2': {
      return createTranslationMatrix(first, second ?? 0);
    }
    case 'scale/1':
    case 'scale/2': {
      return createScaleMatrix(first, second ?? first, origin);
    }
    case 'rotate/1': {
      return createRotationMatrix(first, origin);
    }
    case 'rotate/3': {
      const [, centerX = 0] = values;
      return createRotationMatrix(first, { x: centerX, y: third });
    }
    case 'skewX/1': {
      return { a: 1, b: 0, c: Math.tan(degreesToRadians(first)), d: 1, e: 0, f: 0 };
    }
    case 'skewY/1': {
      return { a: 1, b: Math.tan(degreesToRadians(first)), c: 0, d: 1, e: 0, f: 0 };
    }
    default: {
      return undefined;
    }
  }
}

import { formatCoordinate } from './format-coordinate';

export function formatPoint(point: DOMPointReadOnly): string {
  return `${formatCoordinate(point.x)} ${formatCoordinate(point.y)}`;
}

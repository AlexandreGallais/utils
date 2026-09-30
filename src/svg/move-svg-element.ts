import { changeOnScreen, createMatrix } from './internal';

/**
 * Moves an SVG element in a direction of the screen, by a distance in the units of its parent: 5 up goes
 * up as seen, whatever the rotation of the element and its groups, by 5 units of the parent.
 *
 * @param element - A rendered SVG element.
 * @param dx - The horizontal distance, positive to the right of the screen.
 * @param dy - The vertical distance, positive towards the bottom of the screen.
 * @param transform - A transform of the list to set instead of adding one, to repeat the call without piling
 * transforms up.
 * @returns The transform holding the change, in the `transform` list of the element.
 * @throws {TypeError} When an element is not rendered.
 * @example
 * moveSvgElement(label, 0, -5); // 5 units up, as seen
 */
export function moveSvgElement(
  element: SVGGraphicsElement,
  dx: number,
  dy: number,
  transform?: SVGTransform,
): SVGTransform {
  return changeOnScreen(
    element,
    (screen) => {
      if (dx === 0 && dy === 0) {
        return screen;
      }
      let local = createMatrix(element);
      for (const item of element.transform.baseVal) {
        local = local.multiply(item.matrix);
      }
      const parent = screen.multiply(local.inverse());
      const toParent = parent.inverse();
      const x = toParent.a * dx + toParent.c * dy;
      const y = toParent.b * dx + toParent.d * dy;
      const scale = Math.hypot(dx, dy) / Math.hypot(x, y);
      const screenX = (parent.a * x + parent.c * y) * scale;
      const screenY = (parent.b * x + parent.d * y) * scale;
      return createMatrix(element).translate(screenX, screenY).multiply(screen);
    },
    transform,
  );
}

/**
 * Renders SVG markup at the top-left corner of the page, so that screen pixels are SVG user units.
 *
 * @param markup - The content of the `<svg>`.
 * @returns A function returning an element of the scene by its id.
 */
export function renderSvg(markup: string): (id: string) => SVGGraphicsElement {
  document.body.style.margin = '0';
  document.body.innerHTML = `<svg width="400" height="400" style="display: block">${markup}</svg>`;
  return (id: string): SVGGraphicsElement => {
    const element = document.getElementById(id);
    if (!(element instanceof SVGGraphicsElement)) {
      throw new TypeError(`No SVG element #${id}`);
    }
    return element;
  };
}

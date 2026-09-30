// The screen change of a transform `local` expressed in the axes of the element as it is displayed.
export function inOwnAxes(screen: DOMMatrix, local: DOMMatrix): DOMMatrix {
  return screen.multiply(local).multiply(screen.inverse());
}

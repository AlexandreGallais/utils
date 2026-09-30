# SVG on screen

Two folders work on rendered `SVGGraphicsElement`s, whatever the groups and transforms around each element,
with the browser's own SVG API (`transform.baseVal`, `createSVGTransform`, `getScreenCTM`, `getBBox`):

- `svg-transform` moves, turns, mirrors and scales elements, and finds their anchors;
- `svg-shape` creates the `d` of gauges around elements: arcs, ticks, pies and bars.

## Orders, applied one after the other

`applySvgTransforms(element, orders)` applies a list of orders, in order, each on what the previous ones
give. Each order adds its own transform at the end of the `transform` list; the transforms already there
stay.

```ts
applySvgTransforms(symbol, [
  svgFlipTo(false), // not mirrored on screen
  svgRotateTo(0), // upright on screen
  svgPlaceOn(target), // its center on the center of the target, even in another group
  svgTranslateBy(0, -10), // then 10 units up, along its own axes (upright now)
]);
```

An order is created with its first values. Keep it in a constant to change its values later with `set`, with
the same arguments as its function: only its own transform is updated, from what the element shows without
it. The other orders do not move, so put them in the order you need.

```ts
const rotation = svgRotateBy(0, 'center', hub); // around the center of the hub, in another group
applySvgTransforms(needle, [svgPlaceOn(hub, 'center', 'bottom'), rotation]);

rotation.set(3, 'center', hub); // 3° from where it was drawn
rotation.set(90, 'center', hub); // 90° from where it was drawn, not 93°
```

| Order                                              | Effect                                                                       |
| -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `svgRotateBy(angle, anchor?, reference?)`          | turns it by an angle from its position before the order, clockwise on screen |
| `svgRotateTo(angle, anchor?, reference?)`          | turns it to an absolute angle on screen: `svgRotateTo(0)` straightens it     |
| `svgFlipTo(isFlipped?, axis?, anchor?)`            | makes it mirrored or not, as seen on screen: `svgFlipTo(false)` unmirrors it |
| `svgScaleBy(scaleX, scaleY?, anchor?)`             | enlarges it in its own axes, from an anchor: `'left'` grows to the right     |
| `svgTranslateBy(dx, dy)`                           | moves it along its own axes: turned by 90°, "right" goes down                |
| `svgPlaceOn(reference, referenceAnchor?, anchor?)` | puts one of its anchors on an anchor of another element                      |

The rotations turn around an anchor of the element itself, or of another element in any group.
`clearSvgTransforms(element)` empties the list.

## The 9 anchors

Every element has 9 anchors: `'top-left'`, `'top'`, `'top-right'`, `'left'`, `'center'`, `'right'`,
`'bottom-left'`, `'bottom'`, `'bottom-right'`. `getSvgAnchorPoint` gives one on screen,
`getSvgAnchorPointIn` in the coordinates of another element.

## Gauges drawn around elements

The `createSvg…Path` functions of `svg-shape` return the `d` of a path, around the center of another element
or along its box, in any group. They only read the element you give them, `target`: the path is written in
its coordinates, usually the `<path>` that receives it. Convert values with `ratio`, `remap` or `clamp` from
`math`.

```ts
const arc = { center: hub, radius: 40, startAngle: -135, sweepAngle: 270 };
track.setAttribute('d', createSvgArcPath(track, arc)); // the track
zone.setAttribute('d', createSvgArcPath(zone, { ...arc, startAngle: 81, sweepAngle: 54 })); // a threshold zone: a thick stroke
majorTicks.setAttribute('d', createSvgArcTicksPath(majorTicks, arc, 6, 8)); // 7 ticks
remaining.setAttribute('d', createSvgPiePath(remaining, { ...arc, startAngle: 0, sweepAngle: 360 * ratio(left, total) }));
const labelPoint = getSvgArcPoint(labels, { ...arc, radius: 28 }, 0.5);

const bar = { element: barTrack, direction: 'up' } as const;
level.setAttribute('d', createSvgBarRangePath(level, bar, 0, ratio(value, max))); // the fill level
barRedZone.setAttribute('d', createSvgBarRangePath(barRedZone, bar, 0.8, 1)); // the top 20 %
barTicks.setAttribute('d', createSvgBarTicksPath(barTicks, bar, 5, 12));
```

# SVG on screen

The SVG functions work on rendered `SVGGraphicsElement`s, **as seen on screen**, whatever the groups and
transforms around each element. They use the browser's own APIs (`transform.baseVal`, `getScreenCTM`,
`getBBox`, `DOMMatrix`): the SVG must be in the document and displayed.

## A transform list, changed piece by piece

`addSvgTransform` appends a transform to the `transform` list of an element and returns it. Keep each one in
a constant and set it with an absolute value: the others do not change, nothing is recomputed. The list
applies in order, the last transform first on the element.

```ts
const position = addSvgTransform(needle);
const rotation = addSvgTransform(needle);
const axis = getSvgAnchorPointIn(hub, 'center', needle); // the hub center, in the needle coordinates

position.setTranslate(0, 10);
rotation.setRotate(angle, axis.x, axis.y); // at each frame: only the rotation changes
```

## The 9 anchors

Every element has 9 anchors on the box it takes on screen: `'top-left'`, `'top'`, `'top-right'`, `'left'`,
`'center'`, `'right'`, `'bottom-left'`, `'bottom'`, `'bottom-right'`.

```ts
placeSvgElement(badge, 'top-right', symbol, 'bottom-left'); // the badge corner on the symbol corner
placeSvgElement(label, 'center', zone); // centered on the zone, in another group
```

## Move, turn, flip, scale

```ts
moveSvgElement(label, 0, -5); // up as seen on screen, by 5 units of its parent
translateSvgElement(train, 10, 0); // along its own axes: forward, where it points
rotateSvgElement(flag, 15, 'bottom'); // 15° clockwise on screen, around its foot
flipSvgElement(valve); // mirrored left-right, same place
scaleSvgElement(tank, 1, 1.5, 'bottom'); // 50 % taller, growing upwards
```

Each of these functions, and each reset, adds its change to the `transform` list as a `matrix(…)` and
returns it: the other transforms stay. Pass a transform of the list as last argument to set it again
instead of adding one, at each frame for instance.

```ts
const placement = addSvgTransform(label);
placeSvgElement(label, 'center', zone, 'center', placement); // at each frame, in the same transform
```

## Reset without moving

```ts
resetSvgRotation(symbol); // upright on screen, center in place
resetSvgFlip(label); // readable again, center in place
resetSvgRotationAndFlip(symbol); // a cancelling matrix in the list…
addSvgTransform(symbol).setRotate(45, center.x, center.y); // …then 45° from upright
resetSvgTransform(symbol); // no transform at all
```

## Step by step: straighten, then place

Each step adds its own transform to the list of the element, in order; the earlier ones stay.

```ts
// 1. A cancelling matrix: the symbol is upright and unmirrored on screen, its center in place.
resetSvgRotationAndFlip(symbol);

// 2. A move: the center of the symbol lands on the center of the target, even in another group.
placeSvgElement(symbol, 'center', target, 'center');

// 3. A rotation around the center of the target, set again at each frame without piling up.
const rotation = addSvgTransform(symbol);
const axis = getSvgAnchorPointIn(target, 'center', symbol); // read once, before rotating
rotation.setRotate(angle, axis.x, axis.y);
```

The list of `symbol` now holds its original transforms, then the cancelling `matrix(…)`, the move
`matrix(…)` and the `rotate(…)`. `getSvgAnchorPointIn` gives the point in the coordinates of `symbol` after
its whole list: read it before adding the rotation, so that the rotation turns around it.

## Gauges drawn around elements

The `drawSvg…` functions write the `d` attribute of a `<path>`, around the center of another element or
along its box, in any group. Convert values with `ratio`, `remap` or `clamp` from `math`.

```ts
const arc = { center: hub, radius: 40, startAngle: -135, sweepAngle: 270 };
drawSvgArc(track, arc); // the track
drawSvgArcBand(redZone, { ...arc, startAngle: 81, sweepAngle: 54 }, 6); // a threshold zone
drawSvgArcTicks(majorTicks, arc, 6, 8); // 7 ticks
drawSvgPie(remaining, { ...arc, startAngle: 0, sweepAngle: 360 * ratio(left, total) });
const labelPoint = getSvgArcPoint(labels, { ...arc, radius: 28 }, 0.5);

const bar = { element: barTrack, direction: 'up' } as const;
drawSvgBarRange(level, bar, 0, ratio(value, max)); // the fill level
drawSvgBarRange(barRedZone, bar, 0.8, 1); // the top 20 %
drawSvgBarTicks(barTicks, bar, 5, 12);
```

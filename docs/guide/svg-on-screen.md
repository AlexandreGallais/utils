# SVG on screen

The SVG element functions work **as seen on screen**, whatever the groups and transforms around each
element: each one reads the screen matrix of the elements (`getScreenCTM`), computes the change in screen
pixels, and writes the matching `transform` attribute.

## The 9 anchors

Every element has 9 anchors on its visible box: `'top-left'`, `'top'`, `'top-right'`, `'left'`,
`'center'`, `'right'`, `'bottom-left'`, `'bottom'`, `'bottom-right'`.

## Place, then adjust

```ts
placeSvgElement(badge, 'center', symbol, 'top-right'); // badge centered on the symbol's corner
moveSvgElement(badge, -5, 5); // then 5 px left and 5 px down on screen
placeSvgElementSimple(label, zone); // label centered on the zone
```

## Turn, flip, scale in place

```ts
rotateSvgElementSimple(fan, 30); // 30° more, clockwise on screen, around its center
setSvgRotation(arrow, windDirection, 'center'); // absolute angle, at every frame
setSvgRotationAroundSimple(needle, angle, hub); // needle turning around a hub in another group
flipSvgElementSimple(valve, 'horizontal'); // mirrored, same place
scaleSvgElement(icon, 1.5, 'bottom'); // grows upwards from its base
```

## Reset without moving

```ts
resetSvgRotation(symbol); // upright on screen, center in place
resetSvgFlip(label); // readable again, center in place
resetSvgRotationAndFlip(symbol);
```

The elements must be rendered (in the document and displayed): the functions throw a `TypeError`
otherwise.

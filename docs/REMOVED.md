# Removed functions

Functions removed from the library because no project needs them yet. Only their signatures are kept, to recall
that they existed: ask to bring one back when a project needs it (the code is in the Git history).

### alarm

```ts
acknowledgeAlarm(state: AlarmState): AlarmState
type AlarmState
getThresholdLevelWithHysteresis<L>(value: number, scale: ThresholdScale<L>, previousLevel: L, deadband?: number): L
getThresholdLevel<L>(value: number, scale: ThresholdScale<L>): L
isAlarmActive(state: AlarmState): boolean
isAlarmUnacknowledged(state: AlarmState): boolean
interface Threshold
interface ThresholdScale
updateAlarmState(state: AlarmState, isActive: boolean): AlarmState
```

### animation

```ts
easeInOutCubic(progress: number): number
easeInOutQuad(progress: number): number
easeInOutSine(progress: number): number
easeInQuad(progress: number): number
easeOutCubic(progress: number): number
easeOutQuad(progress: number): number
type EasingFunction
linear(progress: number): number
interface AnimationOptions
startAnimation(clock: TickSource, options: AnimationOptions): () => void
interface BlinkOptions
startBlink(clock: TickSource, periodMs: number, onChange: (isOn: boolean) => void, options?: BlinkOptions): () => void
interface TweenOptions
startTween(clock: TickSource, options: TweenOptions): () => void
```

### chart

```ts
createLinearScale(domain?: readonly [start: number, end: number], range?: readonly [start: number, end: number]): Scale
createLogScale(domain?: readonly [start: number, end: number], range?: readonly [start: number, end: number]): Scale
interface DataBounds
downsampleLttb(points: readonly Point[] | undefined, targetCount: number): Point[]
downsampleMinMax(points: readonly Point[] | undefined, bucketCount: number): Point[]
findNearestPoint(points?: readonly Point[], x?: number): Point | undefined
getDataBounds(points?: Iterable<Point>): DataBounds | undefined
getLogTicks(min: number, max: number): number[]
getNiceTicks(min: number, max: number, count?: number): number[]
getTimeTickPattern(stepMs: number): string
getTimeTicks(start: number, end: number, count?: number, isUtc?: boolean): TimeTicks
getWheelZoomFactor(deltaPx: number, sensitivity?: number): number
padBounds(bounds: DataBounds, ratio?: number, fallback?: number): DataBounds
projectPoints(points: readonly Point[] | undefined, bounds: DataBounds, rect: Rect): Point[]
type Scale
sliceVisiblePoints(points: readonly Point[] | undefined, minX: number, maxX: number, isNeighborIncluded?: boolean): Point[]
interface TimeTicks
zoomBounds(bounds: DataBounds, factor: number, center: Point): DataBounds
```

### color

```ts
type ApcaLevel
type ContrastLevel
darken(color: Rgb | Rgba, amount?: number): Rgba
getApcaContrast(text: Rgb, background: Rgb): number
getApcaLevel(text: Rgb, background: Rgb): ApcaLevel | undefined
getContrastRatio(a: Rgb, b: Rgb): number
getContrastWithBlack(color: Rgb): number
getContrastWithWhite(color: Rgb): number
interface ColorStop
getGradientColor(stops: readonly ColorStop[], value: number): Rgba | undefined
getReadableTextColorCached(background: Rgb | string): '#000000' | '#ffffff'
getReadableTextColor(background: Rgb | string): '#000000' | '#ffffff'
getRelativeLuminance(color: Rgb): number
getWcagLevel(text: Rgb, background: Rgb, isLargeText?: boolean): ContrastLevel | undefined
hslToRgba(hsl: Hsl): Rgba
interface Hsl
lighten(color: Rgb | Rgba, amount?: number): Rgba
meetsApcaLevel(text: Rgb, background: Rgb, level?: ApcaLevel): boolean
meetsContrastLevel(a: Rgb, b: Rgb, level?: ContrastLevel, isLargeText?: boolean): boolean
mixColors(from: Rgb | Rgba, to: Rgb | Rgba, t?: number): Rgba
parseColorCached(input: string): Rgba | undefined
parseColorOrThrowCached(input: string): Rgba
parseColorOrThrow(input: string): Rgba
parseColor(input: string): Rgba | undefined
parseHex(input: string): Rgba | undefined
parseHsl(input: string): Rgba | undefined
parseNamedColor(input: string): Rgba | undefined
parseRgb(input: string): Rgba | undefined
interface Rgb
interface Rgba
toGrayscale(color: Rgb | Rgba): Rgba
toHex(color: Rgb | Rgba): string
toHsl(color: Rgb | Rgba): Hsl
toLinear(channel: number): number
toRgbString(color: Rgb | Rgba): string
withAlpha(color: Rgb | Rgba, alpha?: number): Rgba
```

### angle

```ts
angleDifference(from: number, to: number): number
degreesToRadians(degrees: number): number
formatHeading(degrees: number, maxFractionDigits = 0): string
headingToCardinal(heading: number, points: 4 | 8 | 16 = 8): (typeof COMPASS_POINTS)[number]
lerpAngle(from: number, to: number, t: number): number
meanAngle(angles: Iterable<number>): number
moveAngleTowards(current: number, target: number, maxDegreesPerSecond: number, deltaMs: number): number
normalizeAngle(degrees: number): number
radiansToDegrees(radians: number): number
smoothAngleTowards(current: number, target: number, deltaMs: number, timeConstantMs: number): number
```

### async (removed part)

```ts
interface LatestRunner
createLatestRunner<TArguments extends unknown[], TResult>(task: (signal: AbortSignal, ...taskArguments: TArguments) => Promise<TResult>): LatestRunner<TArguments, TResult>
mapConcurrent<T, U>(items: readonly T[], mapper: (item: T, index: number, signal: AbortSignal) => Promise<U>, concurrency: number, signal?: AbortSignal): Promise<U[]>
interface ProcessInChunksOptions
processInChunks<T>(items: Iterable<T>, callback: (item: T, index: number) => void, options: ProcessInChunksOptions = {}): Promise<void>
interface RetryOptions
retry<T>(operation: (attempt: number) => Promise<T>, options: RetryOptions = {}): Promise<T>
function* streamInChunks<T>(items: readonly T[], chunkSize: number, intervalMs: number, signal?: AbortSignal): AsyncGenerator<T[], void, undefined>
class TimeoutError()
withTimeout<T>(promise: PromiseLike<T>, ms: number, message = `Timed out after ${ms} ms`): Promise<T>
yieldToMain(): Promise<void>
```

### collection

```ts
chunk<T>(items: readonly T[], size: number): T[][]
compact<T>(items: readonly T[]): Exclude<T, Falsy>[]
countBy<T, K extends PropertyKey>(items: readonly T[], keySelector: (item: T) => K): Partial<Record<K, number>>
differenceBy<T>(items: readonly T[], excluded: Iterable<T>, keySelector: (item: T) => unknown): T[]
intersectionBy<T>(items: readonly T[], others: Iterable<T>, keySelector: (item: T) => unknown): T[]
keyBy<T, K extends PropertyKey>(items: readonly T[], keySelector: (item: T) => K): Partial<Record<K, T>>
maxBy<T>(items: Iterable<T>, keySelector: (item: T) => number): T | undefined
minBy<T>(items: Iterable<T>, keySelector: (item: T) => number): T | undefined
moveItem<T>(items: readonly T[], fromIndex: number, toIndex: number): T[]
interface Page
paginate<T>(items: readonly T[], page: number, pageSize: number): Page<T>
pairwise<T>(items: Iterable<T>): [previous: T, next: T][]
partition<T>(items: readonly T[], predicate: (item: T) => boolean): [passed: T[], failed: T[]]
range(start: number, end: number, step = 1): number[]
sample<T>(items: readonly T[], random: () => number = Math.random): T | undefined
shuffle<T>(items: readonly T[], random: () => number = Math.random): T[]
sortBy<T>(items: readonly T[], keySelector: (item: T) => SortKey, order: 'asc' | 'desc' = 'asc'): T[]
type SortKey
sortedIndexBy<T>(items: readonly T[], key: number | string, getKey: (item: T) => number | string): number
uniqBy<T>(items: readonly T[], keySelector: (item: T) => unknown): T[]
zip<A, B>(first: Iterable<A>, second: Iterable<B>): [A, B][]
```

### date

```ts
addDays(date: Readonly<Date>, days: number, isUtc = false): Date
interface DateParts
differenceInCalendarDays(later: Readonly<Date>, earlier: Readonly<Date>, isUtc = false): number
formatDate(date: Readonly<Date>, pattern = 'YYYY-MM-DD HH:mm:ss', isUtc = false): string
getDateParts(date: Readonly<Date>, isUtc = false): DateParts
isSameDay(a: Readonly<Date>, b: Readonly<Date>, isUtc = false): boolean
isValidDate(value: unknown): value is Date
parseDateFormat(input: string, pattern = 'YYYY-MM-DD HH:mm:ss', isUtc = false): Date
parseDate(input: Date | number | string): Date
startOfDay(date: Readonly<Date>, isUtc = false): Date
```

### dom

```ts
copyText(text: string): Promise<boolean>
interface CleanupStack
createCleanupStack(): CleanupStack
downloadBlob(blob: Blob, fileName: string): void
downloadText(text: string, fileName: string, mimeType = 'text/plain'): void
type EventMapOf
listen<T extends EventTarget, K extends keyof EventMapOf<T> & string>(target: T, type: K, listener: (event: EventMapOf<T>[K]) => void, options: AddEventListenerOptions = {}): () => void
matchesShortcut(event: Readonly<Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'key' | 'metaKey' | 'shiftKey'>>, shortcut: string): boolean
normalizeWheelDelta(event: Readonly<Pick<WheelEvent, 'deltaMode' | 'deltaY'>>, pageHeightPx = 800): number
observeIntersection(element: Element, onChange: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void, options: IntersectionObserverInit = {}): () => void
observeResize(element: Element, onResize: (entry: ResizeObserverEntry) => void, options: ResizeObserverOptions = {}): () => void
interface DragHandlers
trackPointerDrag(element: HTMLElement | SVGElement, handlers: DragHandlers): () => void
watchMediaQuery(query: string, onChange: (isMatching: boolean) => void): () => void
watchPageVisibility(onChange: (isVisible: boolean) => void): () => void
whenIdle(task: () => void, timeoutMs: number): () => void
```

### duration (removed part)

```ts
formatTimeSpan(ms: number): string
parseIsoDuration(input: string): DurationParts
splitDuration(ms: number): DurationParts
interface DurationInput
toMilliseconds(duration: DurationInput): number
```

### event

```ts
interface Emitter
createEmitter<Events extends Record<string, unknown>>(): Emitter<Events>
```

### format (removed part)

```ts
formatCompact(value: number, locale = 'en-US', maxFractionDigits = 1): string
formatDuration(ms: number, secondFractionDigits = 0): string
formatGeoCoordinate(value: number, axis: 'lat' | 'lon', style: 'dm' | 'dms' = 'dm', fractionDigits = 3): string
formatList(items: Iterable<string>, locale = 'en-US', type: Intl.ListFormatType = 'conjunction'): string
formatRelativeTime(offsetMs: number, locale = 'en-US', numeric: Intl.RelativeTimeFormatNumeric = 'auto'): string
formatSigned(value: number, maxFractionDigits = 3): string
```

### function

```ts
debounce<TArguments extends unknown[]>(callback: (...callArguments: TArguments) => void, waitMs: number): RateLimitedFunction<TArguments>
memoizeLast<TArguments extends unknown[], TResult>(callback: (...callArguments: TArguments) => TResult): (...callArguments: TArguments) => TResult
memoize<TArguments extends unknown[], TResult>(callback: (...callArguments: TArguments) => TResult, getKey: (...callArguments: TArguments) => unknown = (...callArguments: TArguments): unknown => callArguments[0], maxSize = 1000): MemoizedFunction<TArguments, TResult>
type MemoizedFunction
once<TArguments extends unknown[], TResult>(callback: (...callArguments: TArguments) => TResult): (...callArguments: TArguments) => TResult
rafThrottle<TArguments extends unknown[]>(callback: (...callArguments: TArguments) => void): RateLimitedFunction<TArguments>
type RateLimitedFunction
throttle<TArguments extends unknown[]>(callback: (...callArguments: TArguments) => void, intervalMs: number): RateLimitedFunction<TArguments>
```

### geometry

```ts
type Anchor
centerMatrixOn(matrix: Matrix2D, pivot: Point, target: Point): Matrix2D
clipPolyline(points: readonly Point[], rect: Rect): Point[][]
clipSegment(start: Point, end: Point, rect: Rect): readonly [start: Point, end: Point] | undefined
composeMatrix(transform: DecomposedTransform): Matrix2D
createIdentityMatrix(): Matrix2D
createRotationMatrix(angleDegrees: number, center: Point = { x: 0, y: 0 }): Matrix2D
createScaleMatrix(sx: number, sy = sx, center: Point = { x: 0, y: 0 }): Matrix2D
createTranslationMatrix(tx: number, ty = 0): Matrix2D
decomposeMatrix(matrix: Matrix2D): DecomposedTransform
interface DecomposedTransform
fitRect(content: Size, container: Rect, mode: 'contain' | 'cover' = 'contain', alignX = 0.5, alignY = 0.5): FittedRect
interface FittedRect
formatMatrix(matrix: Matrix2D, maxFractionDigits = 6): string
formatViewBox(rect: Rect): string
getAnchorPoint(rect: Rect, anchor: Anchor = 'center'): Point
getArcLength(radius: number, startAngle: number, endAngle: number): number
getBoundingRect(points: Iterable<Point>): Rect | undefined
getDistanceToSegment(point: Point, start: Point, end: Point): number
getDistance(a: Point, b: Point): number
getHeadingBetween(from: Point, to: Point): number
getMatrixRotation(matrix: Matrix2D): number
getPolygonArea(vertices: readonly Point[]): number
getPolygonCentroid(vertices: readonly Point[]): Point | undefined
getRectCenter(rect: Rect): Point
getRectIntersection(a: Rect, b: Rect): Rect | undefined
getRectUnion(a: Rect, b: Rect): Rect
interface Insets
insetRect(rect: Rect, insets: Insets | number): Rect
invertMatrix(matrix: Matrix2D): Matrix2D
isMatrixFlipped(matrix: Matrix2D): boolean
isPointInPolygon(point: Point, vertices: readonly Point[]): boolean
isPointInRect(point: Point, rect: Rect): boolean
isPointInTransformedRect(point: Point, rect: Rect, matrix: Matrix2D): boolean
lerpPoint(from: Point, to: Point, t: number): Point
interface Matrix2D
moveMatrix(matrix: Matrix2D, dx: number, dy: number): Matrix2D
multiplyMatrices(m1: Matrix2D, m2: Matrix2D): Matrix2D
parseTransform(input: string): Matrix2D
parseViewBox(input: string): Rect
interface PlaceRectOptions
placeRect(size: Size, target: Rect, options: PlaceRectOptions = {}): Rect
interface Point
polarToCartesian(center: Point, radius: number, angleDegrees: number): Point
interface Rect
resetMatrixFlip(matrix: Matrix2D, pivot: Point = { x: 0, y: 0 }): Matrix2D
resetMatrixRotationAndFlip(matrix: Matrix2D, pivot: Point = { x: 0, y: 0 }): Matrix2D
resetMatrixRotation(matrix: Matrix2D, pivot: Point = { x: 0, y: 0 }): Matrix2D
resizeRect(rect: Rect, size: Size, anchor: Anchor = 'center'): Rect
rotatePoint(point: Point, angleDegrees: number, center: Point = { x: 0, y: 0 }): Point
scaleRect(rect: Rect, scaleX: number, scaleY = scaleX, anchor: Anchor = 'center'): Rect
screenDeltaToLocal(delta: Point, matrix: Matrix2D): Point
interface Size
snapToGrid(point: Point, gridSize: number, origin: Point = { x: 0, y: 0 }): Point
transformDelta(delta: Point, matrix: Matrix2D): Point
transformPoint(point: Point, matrix: Matrix2D): Point
transformRect(rect: Rect, matrix: Matrix2D): Rect
```

### log

```ts
consoleSink(entry: LogEntry): void
type LogSink
interface LoggerOptions
createLogger(scope: string, options: LoggerOptions = {}): Logger
interface LogEntry
type LogLevel
interface Logger
```

### perf

```ts
createFpsMeter(windowSize = 60): FpsMeter
interface FrameBatcher
createFrameBatcher(): FrameBatcher
interface FpsMeter
measureDuration<T>(task: () => T, now: () => number = (): number => performance.now()): { readonly result: T; readonly durationMs: number }
```

### random

```ts
createSeededRandom(seed: number): () => number
randomBetween(min = 0, max = 1, random: () => number = Math.random): number
randomBoolean(probability = 0.5, random: () => number = Math.random): boolean
randomDate(start: Readonly<Date>, end: Readonly<Date>, random: () => number = Math.random): Date
randomEnumValue<E extends EnumObject>(enumObject: E, random: () => number = Math.random): E[keyof E]
randomHexColor(random: () => number = Math.random): string
randomInt(min: number, max: number, random: () => number = Math.random): number
randomString(minLength: number, maxLength = minLength, characters = ALPHANUMERIC, random: () => number = Math.random): string
randomText(minLength: number, maxLength = minLength, random: () => number = Math.random): string
```

### stats

```ts
maxOf(values: NumberList): number | undefined
mean(values: NumberList): number
median(values: NumberList): number
minOf(values: NumberList): number | undefined
type NumberList
quantile(values: NumberList, q = 0.5): number
standardDeviation(values: NumberList, isSample = false): number
sum(values: NumberList): number
variance(values: NumberList, isSample = false): number
```

### storage

```ts
createStorageItem<T>(storage: Storage, key: string, fallback: T, guard: (value: unknown) => value is T): StorageItem<T>
interface VersionedStorageOptions
createVersionedStorageItem<T>(storage: Storage, key: string, options: VersionedStorageOptions<T>): StorageItem<T>
readStorage<T>(storage: Storage, key: string, fallback: T, guard: (value: unknown) => value is T): T
interface StorageItem
writeStorage(storage: Storage, key: string, value: unknown): boolean
```

### structure

```ts
class LruCache(public readonly maxSize: number)
class MovingAverage(public readonly windowSize: number)
class NavigationHistory(public readonly maxSize = Infinity)
class RingBuffer(public readonly capacity: number)
class RollingMinMax(public readonly windowSize: number)
```

### svg

```ts
type BarDirection
interface BarScale
centerSvgElementOn(element: SVGGraphicsElement, target: Point): void
convertSvgPoint(point: Point, from: SVGGraphicsElement, to: SVGGraphicsElement): Point
createArcPath(center: Point, radius: number, startAngle = 0, endAngle = FULL_TURN): string
interface ArcTicksOptions
interface ArcTick
createArcTicks(options: ArcTicksOptions): ArcTick[]
createAreaPath(points: Iterable<Point>, baselineY: number): string
createArrowPath(from: Point, to: Point, headLength: number, headWidth = headLength): string
interface BarTick
interface BarTicksOptions
createBarTicks(options: BarTicksOptions): BarTick[]
createCirclePath(center: Point, radius: number): string
createPiePath(center: Point, radius: number, startAngle = 0, endAngle = FULL_TURN): string
createPolylinePath(points: Iterable<Point>, isClosed = false): string
createRectPath(rect: Rect): string
createRegularPolygonPoints(center: Point, radius: number, sides: number, rotation = 0): Point[]
createRingSectorPath(center: Point, innerRadius: number, outerRadius: number, startAngle = 0, endAngle = FULL_TURN): string
createRoundedRectPath(rect: Rect, radius: number): string
createSmoothPath(points: readonly Point[], tension = 1): string
createStarPoints(center: Point, outerRadius: number, innerRadius: number, branches = 5): Point[]
createStepPath(points: Iterable<Point>, position: 'after' | 'before' | 'middle' = 'after'): string
createTicksPath(ticks: Iterable<{ readonly start: Point; readonly end: Point }>): string
drawSvgArcBand(path: SVGGraphicsElement, arc: SvgArc, thickness: number): void
drawSvgArcTicks(path: SVGGraphicsElement, arc: SvgArc, count: number, length: number): void
drawSvgArc(path: SVGGraphicsElement, arc: SvgArc): void
drawSvgCircle(path: SVGGraphicsElement, center: SVGGraphicsElement, radius: number): void
drawSvgFrame(path: SVGGraphicsElement, element: SVGGraphicsElement, padding = 0): void
drawSvgLine(path: SVGGraphicsElement, from: SVGGraphicsElement, fromAnchor: Anchor, to: SVGGraphicsElement, toAnchor: Anchor = 'center'): void
drawSvgPie(path: SVGGraphicsElement, arc: SvgArc): void
flipSvgElement(element: SVGGraphicsElement, axis: 'horizontal' | 'vertical' = 'horizontal', anchor: Anchor = 'center'): void
formatPoints(points: Iterable<Point>): string
formatRotation(angleDegrees: number, center: Point = { x: 0, y: 0 }): string
getStrokeDashOffset(pathLength: number, progress: number): number
getSvgAnchorPointIn(element: SVGGraphicsElement, anchor: Anchor, target: SVGGraphicsElement): Point
getSvgAnchorPoint(element: SVGGraphicsElement, anchor: Anchor = 'center'): Point
getSvgArcPoint(target: SVGGraphicsElement, arc: SvgArc, ratio: number): Point
getSvgLocalCenter(element: SVGGraphicsElement): Point
getSvgMatrixBetween(from: SVGGraphicsElement, to: SVGGraphicsElement): Matrix2D
getSvgScreenBox(element: SVGGraphicsElement): Rect
getSvgTransform(element: Element): Matrix2D
moveSvgElement(element: SVGGraphicsElement, dx: number, dy: number): void
placeSvgElement(element: SVGGraphicsElement, elementAnchor: Anchor, reference: SVGGraphicsElement, referenceAnchor: Anchor = 'center'): void
resetSvgFlip(element: SVGGraphicsElement): void
resetSvgRotationAndFlip(element: SVGGraphicsElement): void
resetSvgRotation(element: SVGGraphicsElement): void
rotateSvgElementAround(element: SVGGraphicsElement, angleDegrees: number, pivot: SVGGraphicsElement, pivotAnchor: Anchor = 'center'): void
rotateSvgElement(element: SVGGraphicsElement, angleDegrees: number, anchor: Anchor = 'center'): void
scaleSvgElement(element: SVGGraphicsElement, factor: number, anchor: Anchor = 'center'): void
setSvgRotationAround(element: SVGGraphicsElement, angleDegrees: number, pivot: SVGGraphicsElement, pivotAnchor: Anchor = 'center'): void
setSvgRotation(element: SVGGraphicsElement, angleDegrees: number, anchor: Anchor = 'center'): void
setSvgTransform(element: Element, matrix: Matrix2D): void
interface SvgArc
valueRangeToRect(from: number, to: number, scale: BarScale): Rect
valueToAngle(value: number, min: number, max: number, startAngle: number, endAngle: number, shouldClamp = true): number
valueToBarPosition(value: number, scale: BarScale, shouldClamp = true): number
```

### time

```ts
interface ClockTick
interface ClockOptions
class Clock(options: ClockOptions = {})
getAnimationPhase(timeMs: number, periodMs: number): number
getSyncedAnimationDelay(periodMs: number, nowMs = performance.now()): number
isBlinkOn(timeMs: number, periodMs: number, dutyCycle = 0.5): boolean
```

### tracking

```ts
createPeakHold(holdMs: number, decayPerSecond = Infinity): PeakHold
interface RateEstimator
createRateEstimator(timeConstantMs: number): RateEstimator
createStaleDetector(maxAgeMs: number, now = (): number => performance.now()): StaleDetector
interface PeakHold
interface StaleDetector
```

### unit

```ts
type AngularVelocityUnit
convertAngularVelocity(value: number, from: AngularVelocityUnit, to: AngularVelocityUnit): number
type DistanceUnit
convertDistance(value: number, from: DistanceUnit, to: DistanceUnit): number
type FlowUnit
convertFlow(value: number, from: FlowUnit, to: FlowUnit): number
type MassUnit
convertMass(value: number, from: MassUnit, to: MassUnit): number
type PressureUnit
convertPressure(value: number, from: PressureUnit, to: PressureUnit): number
type SpeedUnit
convertSpeed(value: number, from: SpeedUnit, to: SpeedUnit): number
type TemperatureUnit
convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number
type VolumeUnit
convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number
```

### math (removed part)

```ts
clampedRatio(value: number, total: number): number // clamp(ratio(value, total))
```

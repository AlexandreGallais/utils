# Lib d'utils TypeScript — Spécification

Spécification d'origine (issue d'une conversation de conception), complétée par les décisions prises à l'implémentation. Les écarts sont signalés par **Écart**, les ajouts par **Ajout**.

## Contexte

- Lib d'utilitaires TypeScript, utilisée côté front Angular (IHM de simulation)
- TypeScript strict, aucun JavaScript brut
- Fonctions pures dès que possible, sans dépendance externe (sauf Logger)
- Tests unitaires (Vitest) pour chaque fonction, cas limites inclus
- **Performance** : une simulation peut rafraîchir une valeur ~1 000 fois par seconde. Les fonctions appelées à chaque rafraîchissement évitent les allocations, mettent en cache ce qui est coûteux à créer (formatters `Intl`, parsing de couleurs) et remplacent les calculs répétés par des tables précalculées. Chaque optimisation est mesurée dans `benchmarks/`.

## Périmètre

| Sujet                                                                           | Statut                                                                        |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Utils génériques : async, collections, format, type guards, math, path, pattern | Fait                                                                          |
| Types utilitaires : Brand, Constructor, Nullable, Nullish, Optional             | Fait                                                                          |
| Utils couleur : parsing, luminance, contraste, couleur de texte lisible         | Fait                                                                          |
| Angles (deg/rad, normalisation)                                                 | Fait                                                                          |
| Géométrie SVG (arcs, ticks de gauges, barres, transformations)                  | Fait (`geometry/`, `svg/`), voir [Deuxième lot](#deuxième-lot)                |
| Clock / tick partagé                                                            | Fait, sans Angular : classe `Clock` (`time/`)                                 |
| Logger                                                                          | Petit `createLogger` (`log/`) ; tslog ou loglevel restent possibles pour plus |

## Organisation des fichiers

- **Un fichier par fonction** (ou classe, ou type), nommé d'après elle en kebab-case, rangé dans un dossier par thème : `src/math/round-to-step.ts` exporte `roundToStep`, avec son spec à côté (`round-to-step.spec.ts`). Deux règles ESLint locales le vérifient.
- `src/index.ts` est le point d'entrée standard de la lib Vite : il réexporte chaque fonction publique par son nom.
- Helpers internes : `src/<thème>/internal/` (privés au thème), `src/internal/` (partagés entre thèmes), jamais exportés par `src/index.ts`.

## Conventions de nommage

- Paramètre de décimales : `maxFractionDigits` (vocabulaire ECMAScript / Intl)
- `format*` retourne une `string`, `round*` retourne un `number`
- Pas d'export `isFinite` / `isNaN`, qui masquent les globales
- Une seule paire deg/rad : `degreesToRadians` / `radiansToDegrees`
- Les bornes `min` / `max` peuvent être données dans n'importe quel ordre (`clamp`, `isBetween`, `wrap`) : utile pour les échelles inversées
- Paramètres booléens nommés comme des questions : `isInclusive`, `shouldClamp`, `isLargeText` (**Écart** : `inclusive`, `clampOutput`, `largeText` dans la spec d'origine ; l'appel positionnel est inchangé)

---

## Premier lot

Les noms de fichiers ci-dessous sont ceux d'origine ; chaque fonction a depuis son propre fichier (`math/clamp.ts`…).

## `async.utils.ts`

- `sleep(ms: number, signal?: AbortSignal): Promise<void>`
  - Rejette si `signal` est aborted (annulé), y compris s'il l'est déjà ; le timer est nettoyé
- **Ajout** `withTimeout<T>(promise, ms, message?): Promise<T>` : rejette avec une `TimeoutError` au-delà de `ms`

## `collection.utils.ts`

- `countBy<T, K extends PropertyKey>(items: readonly T[], keySelector: (item: T) => K): Partial<Record<K, number>>`
  - **Écart** : retourne `Partial<Record<K, number>>` et non `Record<K, number>` : une clé sans élément est absente, le type le dit
- **Ajout** `keyBy`, `partition` (avec narrowing par type guard), `chunk`, `uniqBy`, `range`
- Regroupement : utiliser les natifs `Object.groupBy` / `Map.groupBy` (ES2024)

## `format.utils.ts`

### Helper interne

`assertValidFractionDigits(maxFractionDigits)` : `RangeError` si ce n'est pas un entier dans [0, 100]. Il vit dans `src/internal/` (non exporté), partagé avec `math.utils.ts`.

### `formatDecimal` — version validée, reprise telle quelle

```ts
const formatterCache = new Map<number, Intl.NumberFormat>();

export function formatDecimal(value: number, maxFractionDigits: number): string {
  assertValidFractionDigits(maxFractionDigits);
  if (!Number.isFinite(value)) return String(value);

  let formatter = formatterCache.get(maxFractionDigits);
  if (!formatter) {
    formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: maxFractionDigits,
      useGrouping: false,
      signDisplay: 'negative',
    });
    formatterCache.set(maxFractionDigits, formatter);
  }
  return formatter.format(value);
}
```

Comportement attendu :

- Supprime les trailing zeros : `formatDecimal(2.0, 2)` → `"2"`, `formatDecimal(1.5, 3)` → `"1.5"`
- Pas de notation scientifique : `formatDecimal(0.0000001, 8)` → `"0.0000001"`
- Arrondi correct en pratique (ICU) : `formatDecimal(1.005, 2)` → `"1.01"`
- Pas de `"-0"` : `formatDecimal(-0.001, 2)` → `"0"`
- Sortie invariante : point décimal, pas de séparateur de milliers
- `NaN` → `"NaN"`, `Infinity` → `"Infinity"`
- Cache des formatters : créer un `Intl.NumberFormat` coûte ~50× plus cher que formater avec (mesuré)

Ne pas utiliser `String(Number(value.toFixed(n)))` : cela produit de la notation scientifique et des erreurs d'arrondi (`1.005` → `"1"`).

### `formatNumber` — à la façon Angular DecimalPipe

- `formatNumber(value: number, digitsInfo: string, locale = 'en-US'): string`
  - `digitsInfo` au format `'{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}'`, ex : `'1.0-2'`, `'3.2-4'`
  - Chaque partie est optionnelle, avec les défauts d'Angular (`1.0-3`)
  - `RangeError` si le format est invalide ou hors des limites d'`Intl.NumberFormat`
  - Séparateurs et groupement de la locale, comme le `DecimalPipe`
  - Cache des formatters par `locale` puis `digitsInfo` (maps imbriquées : aucune chaîne de clé construite à chaque appel)
  - Même gestion `NaN` / `Infinity` / `-0` que `formatDecimal`

## `guard.utils.ts` (type guards)

- `assert(condition: unknown, message?: string): asserts condition`
- **Ajout** `assertNever(value: never, message?): never` : exhaustivité des `switch`
- `isArray(value: unknown): value is unknown[]`
- `isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[]`
- `isBoolean(value: unknown): value is boolean`
- `isNumber(value: unknown): value is number`, qui exclut `NaN`
- `isFiniteNumber(value: unknown): value is number`
- `isString(value: unknown): value is string`
- **Ajout** `isFunction(value: unknown): value is Function`
- `isObject(value: unknown): value is object`, non-null, arrays inclus
- `isRecord(value: unknown): value is Record<string, unknown>`, plain object uniquement, arrays exclus
- `isDefined<T>(value: T): value is NonNullable<T>`, qui exclut `null` ET `undefined`
- `isUndefined(value: unknown): value is undefined`
- `isNotUndefined<T>(value: T): value is Exclude<T, undefined>`, qui exclut `undefined` seulement
- `isEnumValue<E extends Record<string, string | number>>(enumObject: E, value: unknown): value is E[keyof E]`
  - Gère le reverse mapping (mapping inverse) des enums numériques
  - Les valeurs de chaque enum sont calculées une fois (cache `WeakMap`) : vérification en O(1)

La différence `isDefined` / `isNotUndefined` est documentée en JSDoc.

## `math.utils.ts`

- `clamp(value, min, max)`, `lerp(start, end, t)` (forme précise, exacte en `t = 1`)
- `inverseLerp(start, end, value)` : retourne `0` si `start === end`
- `remap(value, inMin, inMax, outMin, outMax, shouldClamp = false)`
- `isBetween(value, min, max, isInclusive = true)`
- `wrap(value, min, max)` : modulo toujours positif (ex : heading (cap) 0–360), jamais `-0`
- `roundToStep`, `floorToStep`, `ceilToStep`
  - Imprécision float corrigée : le quotient `value / step` est d'abord recalé sur l'entier le plus proche s'il n'en diffère que par du bruit (`floorToStep(0.3, 0.1)` → `0.3`, pas `0.2`), puis le résultat est arrondi au nombre de décimales du `step` (`roundToStep(0.3, 0.1)` → `0.3`, pas `0.30000000000000004`)
  - Le nombre de décimales de chaque `step` est mis en cache
- `roundToFractionDigits(value, maxFractionDigits)`
  - **Écart** : la spec proposait `Number(formatDecimal(value, maxFractionDigits))`. L'implémentation est arithmétique (`Math.round(|value| × 10ⁿ × (1 + ε)) / 10ⁿ`, puissances de 10 en table) : ~37× plus rapide, mêmes résultats que la version `Intl` jusqu'à 15 chiffres significatifs (test d'équivalence sur 40 000 valeurs décimales, fuzz sur 300 000 valeurs aléatoires : 3 écarts, tous au-delà de 15 chiffres significatifs, dans le bruit du float)
- `ratio(value, total)` : `0` si `total === 0` ; implémenté via `inverseLerp(0, total, value)`
- `clampedRatio(value, total)`, en 0–1
- **Ajout** `isNearlyEqual(a, b, epsilon = 1e-9)` : comparaison avec tolérance relative
- **Ajout** `smoothTowards(current, target, deltaMs, timeConstantMs)` : lissage exponentiel indépendant du frame rate (aiguille de gauge alimentée par des valeurs bruitées)

## `angle.utils.ts`

- `degreesToRadians(degrees)`, `radiansToDegrees(radians)` (facteur précalculé)
- `normalizeAngle(degrees)` : ramène en [0, 360[ via `wrap`
- **Ajout** `angleDifference(from, to)` : plus court chemin signé, en [-180, 180[ (350° → 10° = +20°)
- **Ajout** `lerpAngle(from, to, t)` : interpolation par le plus court chemin (un cap passe de 350° à 10° par 0°)

## `string.utils.ts`

- `extractNumber(input: string): number | undefined`
  - Premier nombre trouvé : signe, décimales `.` ou `,` ; ni séparateur de milliers ni exposant
- `extractNumbers(input: string): number[]`

## `path.utils.ts`

- `joinPath(...segments: string[]): string`
  - Pour des chemins URL : dédoublonne les `/`, ignore les segments vides, conserve le `/` initial, le `/` final et le protocole (`https://`, `file:///`)

## `pattern.utils.ts`

- ~~`createSingleton`~~ : retiré, doublon de `once(() => factory())` (la factory ne tourne qu'au premier appel).

## `function.utils.ts` — **Ajout**

Limitation de débit pour les sources haute fréquence : une simulation pousse 1 000 valeurs/s, un écran en affiche 60.

- `throttle(fn, intervalMs)` : premier appel immédiat, puis un appel final avec les derniers arguments
- `debounce(fn, waitMs)`
- `rafThrottle(fn)` : au plus un appel par frame (`requestAnimationFrame`), avec les derniers arguments
- Les trois retournent une fonction avec `cancel()` et `flush()`
- `once(fn)`
- `memoizeLast(fn)` : mémoïse le dernier appel seulement (mémoire constante), pour une valeur dérivée recalculée à chaque rafraîchissement

## `object.utils.ts` — **Ajout**

- `shallowEqual(a, b)` : égalité au premier niveau, pour ignorer une mise à jour identique

## `stats.utils.ts` — **Ajout**

- `sum`, `mean`, `minOf`, `maxOf` : acceptent arrays et typed arrays (`Float64Array`…), sans spread (`Math.max(...values)` lève une `RangeError` au-delà d'environ 100 000 valeurs)

## `ring-buffer.ts` et `moving-average.ts` — **Ajout**

- `RingBuffer<T>` : buffer circulaire de capacité fixe, `push` en O(1) sans allocation ; historique des N dernières valeurs (sparkline)
- `MovingAverage` : moyenne glissante en O(1) par valeur (somme courante sur un `Float64Array`, recalculée une fois par fenêtre pour annuler la dérive float) ; ~12× plus rapide que `slice` + `mean` à chaque valeur

## `color.utils.ts`

### Types

```ts
export interface Rgb {
  readonly r: number;
  readonly g: number;
  readonly b: number;
} // 0–255
export interface Rgba extends Rgb {
  readonly a: number;
} // a : 0–1
```

**Écart** : `interface` au lieu de `type` (règle `consistent-type-definitions`), champs `readonly` (règle `prefer-readonly-parameter-types`).

### Parsing

- `parseHex(input)` : `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, avec ou sans `#` ; décodage par code de caractère, sans regex ni `parseInt`
- `parseRgb(input)` : `rgb()` et `rgba()`, syntaxes virgule et espace (`rgb(255 0 0 / 50%)`), valeurs en `%` ; canaux arrondis et bornés
- `parseHsl(input)` : `hsl()` et `hsla()`, teinte en `deg`, `rad`, `grad` ou `turn`
- `parseNamedColor(input)` : les 148 couleurs nommées CSS + `transparent`
- `parseColor(input): Rgba | undefined`
  - Point d'entrée unique : trim et lowercase, puis aiguillage par préfixe (`#`, `rgb`, `hsl`, sinon nom puis hex sans `#`)
  - Retourne `undefined` si rien ne matche, sans throw
  - Sans cache ; **Ajout** `parseColorCached` : résultats mis en cache par chaîne d'entrée (512 entrées) et gelés (`Object.freeze`), ~28× plus rapide sur des couleurs répétées
- `parseColorOrThrow(input): Rgba` : `TypeError` si invalide (**Ajout** `parseColorOrThrowCached`)

### Luminance / contraste (WCAG 2.x)

- `toLinear(channel)` : sRGB gamma → linéaire, canal en 0–255 ; table de 256 valeurs pour les canaux entiers (~5× plus rapide que `Math.pow`)
- `getRelativeLuminance(color)`, en 0–1
- `getContrastRatio(a, b)`, de 1 à 21
- `getContrastWithBlack(color)`, `getContrastWithWhite(color)`
- `getReadableTextColor(background: Rgb | string): '#000000' | '#ffffff'`
  - Choisit entre noir et blanc selon le meilleur contraste
  - Accepte une string (passe par `parseColor`, donc par son cache) ; `TypeError` si la string est invalide
- `meetsContrastLevel(a, b, level: 'AA' | 'AAA', isLargeText = false)`
  - Seuils : AA = 4.5 (3 pour large text), AAA = 7 (4.5 pour large text)

### Conversion

- `toHex(color)` : `#rrggbb`, ou `#rrggbbaa` si alpha < 1 ; table des 256 octets hexadécimaux (~3× plus rapide que `toString(16)`)
- `toRgbString(color)` : `rgb(r, g, b)`, ou `rgba(r, g, b, a)` si alpha < 1
- **Ajout** `mixColors(from, to, t)` : interpolation de couleurs (dégradé le long d'une gauge)

## `types.ts`

```ts
declare const brand: unique symbol;
export type Brand<T, TBrand extends string> = T & { readonly [brand]: TBrand };
export type Constructor<T = object, TArgs extends unknown[] = any[]> = new (...args: TArgs) => T;
export type Nullable<T> = T | null;
export type Nullish<T> = T | null | undefined;
export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T]; // Ajout
```

**Écart** : `Brand` utilise un `unique symbol` au lieu d'une propriété `__brand` : la clé n'existe qu'à la compilation, n'apparaît pas dans l'autocomplétion et ne peut entrer en collision avec une vraie propriété.

## Logger

**Écart** (demandé ensuite) : un petit `createLogger(scope, { level, sink })` (`log/`), avec niveaux, sous-portées (`child`) et sortie remplaçable (`consoleSink` par défaut). Pour des logs structurés ou un transport distant, une lib existante reste possible :

- **tslog** : écrit en TS, browser et Node, logs structurés
- **loglevel** : très léger, API minimale

## Deuxième lot

Demandé après le premier lot ; la liste complète, avec les fichiers à copier, est dans [`FUNCTIONS.md`](https://github.com/AlexandreGallais/utils/blob/main/docs/FUNCTIONS.md).

### Cache explicite

- Une fonction avec un cache de **valeurs** existe en deux versions, dans deux fichiers : la version simple sans cache, et une variante `…Cached` avec le tag JSDoc `@cached` qui décrit le cache. `parseColor` / `parseColorCached`, `parseColorOrThrow` / `parseColorOrThrowCached`, `getReadableTextColor` / `getReadableTextColorCached`, `isEnumValue` / `isEnumValueCached`.
- Les caches d'**objets** coûteux à créer (formatters `Intl`, `Intl.Segmenter`) restent dans la fonction simple.
- `roundToStep` / `floorToStep` / `ceilToStep` n'ont plus de cache : le nombre de décimales du pas est calculé par arithmétique (~4 ns au lieu de ~100 ns via `String(step)`), plus vite que l'ancien cache, et juste sur un pas bruité (`0.1 + 0.2` → 1 décimale).

### Horloge et synchronisation (`time/`)

- `Clock` : source de ticks unique (mode `'frame'` via `requestAnimationFrame` ou `'interval'`), démarre au premier abonné et s'arrête au dernier, `pause` / `resume` (le `deltaMs` vaut 0 en pause), `timeScale`, abonnements cadencés (`subscribe(listener, everyMs)`) alignés sur la même base de temps. Sans Angular : fournir une instance et s'abonner hors zone (`NgZone.runOutsideAngular`).
- `isBlinkOn`, `getAnimationPhase` : un clignotement ou une animation calculé depuis la même base de temps (`performance.now()` ou le `timestamp` du tick) est en phase partout, sans état partagé.
- `getSyncedAnimationDelay` : l'`animation-delay` négatif qui cale une animation CSS sur les autres.

### Géométrie et SVG (`geometry/`, `svg/`)

- Convention d'angle unique (option A de la spec) : 0° en haut, sens horaire.
- Points et rectangles : `getDistance`, `lerpPoint`, `polarToCartesian`, `getHeadingBetween`, `rotatePoint`, `getBoundingRect`, `getRectCenter`, `isPointInRect`, `getRectIntersection`, `getRectUnion`, `insetRect`, `fitRect`, `formatViewBox`, `parseViewBox`.
- Transformations (`Matrix2D`, format SVG `a b c d e f`) : `parseTransform`, `formatMatrix`, `multiplyMatrices`, `invertMatrix`, `createTranslationMatrix`, `createRotationMatrix`, `createScaleMatrix`, `transformPoint`, `transformDelta`, `decomposeMatrix`, `composeMatrix`, `resetMatrixRotationAndFlip` (annule rotation et flips, garde position et taille), `screenDeltaToLocal` (convertit un déplacement écran dans le repère d'un élément tourné ou retourné, sans le détransformer).
- Jauges rondes : `createArcPath` (arc de 360° en deux demi-arcs), `createRingSectorPath` (zones colorées), `valueToAngle`, `createArcTicks` (majeurs / mineurs sans doublon), `createTicksPath` (toutes les graduations dans un seul `<path>`).
- Jauges en barre : `BarScale` (rectangle, `min` / `max`, sens `'up' | 'down' | 'left' | 'right'`), `valueToBarPosition`, `valueRangeToRect` (zone de seuil ou niveau de remplissage), `createBarTicks`.
- Formes : `createPolylinePath`, `createSmoothPath` (courbe Catmull-Rom), `createRoundedRectPath`, `createRegularPolygonPoints`, `formatPoints`.

### Simulation

- `moveTowards` (vitesse de variation limitée), `applyHysteresis` (alarme sans clignotement autour du seuil), `hasSignificantChange` (bande morte avant un rendu), `interpolateTable` (table de calibration, recherche dichotomique), `headingToCardinal`, `formatGeoCoordinate` (degrés et minutes décimales), `formatDuration`.
- Conversions (`unit/`) : vitesse (kn, m/s, km/h, mph), distance (m, km, nmi, ft, mi), température (°C, °F, K), pression (bar, Pa, hPa, kPa, psi).
- Aléa rejouable (`random/`) : `createSeededRandom` (mulberry32) ; `randomBetween`, `randomInt`, `shuffle`, `sample` prennent une source `random`.

### Listes, chargement progressif, navigation

- `processInChunks` (traite une longue liste par tranches de 8 ms en rendant la main au navigateur), `streamInChunks` (générateur asynchrone : un morceau toutes les X ms), `yieldToMain`, `paginate`.
- `NavigationHistory` : retour / avance ; un `push` depuis une position antérieure supprime tout ce qui suit.
- `sortBy`, `minBy`, `maxBy`, `zip`, `pairwise`, `compact`, `differenceBy`, `intersectionBy`, `shuffle`, `sample` ; statistiques `median`, `quantile`, `variance`, `standardDeviation`.

### Chaînes, objets, fonctions, divers

- Casse : `words` (découpage linéaire, acronymes et Unicode), `camelCase`, `pascalCase`, `kebabCase`, `snakeCase`, `constantCase`, `titleCase`, `sentenceCase` (identifiant → libellé lisible), `capitalize` ; `truncate` (graphèmes), `slugify`, `escapeHtml`, `escapeRegExp`, `interpolate`.
- `pick`, `omit`, `mapValues`, `isDeepEqual`, `isEmpty` ; `memoize` (`@cached`), `retry`, `mapConcurrent` ; `createEmitter` (événements typés), `createIdGenerator`, `createLogger`.

## Troisième lot

Règles d'écriture formalisées d'abord (section « Writing a function » d'[`AGENTS.md`](https://github.com/AlexandreGallais/utils/blob/main/AGENTS.md), skill `add-function`, JSDoc relue selon ces règles (vérifiée par `eslint-plugin-jsdoc` jusqu'au neuvième lot) : phrases complètes, `@param name - …`, `@returns`, `@throws`, `@example`, tags `@cached` et `@rejects`). Le catalogue du README et [`FUNCTIONS.md`](https://github.com/AlexandreGallais/utils/blob/main/docs/FUNCTIONS.md) sont générés par `pnpm docs:catalog` (lancé par `pnpm check`).

### Formats et chaînes

- `formatNumber` sans locale : format invariant (pas de séparateur de milliers, point décimal) ; avec une locale, séparateurs de la locale.
- Casse : `lowerCase`, `upperCase`, `uncapitalize`, `dotCase`, `trainCase` ; `removeDiacritics`, `squish`, `isBlank`, `pluralize`, `formatList` (`Intl.ListFormat`).
- Contraste APCA (`getApcaContrast`, APCA-W3 0.0.98G) en plus du ratio WCAG 2.

### Enums (`enum/`)

- Fichiers `*.enum.ts` pour les enums. `getEnumEntries` / `getEnumKeys` / `getEnumValues` (sans le mapping inverse des enums numériques), `getEnumKey`, `isEnumValue` (+ `isEnumValueCached`), `toEnumValue(enum, value, fallback)`, `parseEnumValue` (valeur ou nom).
- `EnumLiteral<E>` : l'union littérale d'un enum (`'on' | 'off'`, `0 | 1`), pour accepter une valeur brute typée.

### Durées et dates (`duration/`, `date/`)

- `TimeSpan` C# : `parseTimeSpan` (formats `c` et `g`/`G`, jusqu'à 7 décimales), `formatTimeSpan` (format `c`) ; `parseIsoDuration` (`PT1H30M`, jours et semaines, sans mois ni années ambigus) ; `splitDuration` → `DurationParts` ; `toMilliseconds`.
- Dates : `parseDate` (ISO strict, timestamps), `parseDateFormat(input, 'DD/MM/YYYY HH:mm')`, `getDateParts` (objet lisible : mois 1–12, jour ISO 1–7, jour de l'année), `formatDate`, `startOfDay`, `addDays`, `isSameDay`, `differenceInCalendarDays`, `isValidDate` ; UTC ou heure locale au choix.

### Stockage (`storage/`)

- `readStorage(storage, key, fallback, guard?)` et `writeStorage` ne lèvent jamais (quota plein, stockage bloqué, JSON invalide) ; `createStorageItem` regroupe clé, valeur par défaut et guard.

### Animations (`animation/`)

- Fonctions d'easing ; `startAnimation` (progression 0 → 1 sur une durée, cadencée par une `TickSource` comme `Clock`), `startTween` (valeur de `from` à `to`), `startBlink` (booléen qui alterne toutes les X ms, n'appelle qu'aux changements, et impose un état de repos explicite à l'arrêt).

### Placement (`geometry/`)

- `transformRect` (boîte englobante d'un rectangle tourné ou retourné), `Anchor` (9 points), `getAnchorPoint`, `placeRect` (placer une forme en haut à droite d'un symbole transformé, avec marge et ancre choisie : son centre ou son coin haut-gauche sur le coin haut-droit), `resizeRect` / `scaleRect` (rectangle qui rétrécit selon une valeur, depuis une ancre).
- Découpage : `clipSegment` (Liang–Barsky), `clipPolyline` (morceaux visibles d'une ligne).

### Graphiques 2D (`chart/`)

- `DataBounds` (fenêtre en unités de données, y vers le haut), `getDataBounds`, `padBounds`, `zoomBounds` (zoom autour du point sous la souris).
- `createLinearScale` (avec `invert`), `getNiceTicks` (pas de 1, 2 ou 5 × 10ⁿ, sans bruit flottant).
- `sliceVisiblePoints` (série triée par x : recherche dichotomique, avec les voisins hors fenêtre pour que la ligne touche les bords), `projectPoints` (données → écran), `downsampleMinMax` (garde les pics : un seau par colonne de pixels).

### Données de test (`random/`)

- `randomBoolean`, `randomString(min, max, alphabet)`, `randomText(min, max)` (mots de faux latin, première lettre en capitale ; les autres casses via `upperCase`, `camelCase`…), `randomDate`, `randomHexColor`, `randomEnumValue` ; tous prennent une source `random` (seedable).

### Types (`types/`)

- `DeepPartial`, `DeepReadonly`, `Mutable`, `Simplify`, `Merge`, `RequireKeys`, `PartialKeys`, `KeysOfType`, `PickByType`, `Entries`, `ElementOf`, `NonEmptyArray`, `UnionToIntersection`, `LiteralUnion`, `FirstParameter`, `AnyFunction`, `Awaitable` ; vérifiés par `expectTypeOf`.

### DOM et signaux (`dom/`), performance (`perf/`)

- Sans RxJS : chaque abonnement renvoie sa fonction de nettoyage, à passer à `DestroyRef.onDestroy` ou au `onCleanup` d'un `effect`, et alimente un `signal`. `listen` (type d'événement déduit de la cible et du nom), `observeResize`, `observeIntersection`, `watchMediaQuery`, `watchPageVisibility`, `whenIdle`, `createCleanupStack`.
- `createFpsMeter` (moyenne glissante en temps constant), `createFrameBatcher` (lectures puis écritures DOM groupées par frame, contre le layout thrashing), `measureDuration`.

### Revue finale : manques comblés

- `deepMerge` (préférences sauvegardées sur les valeurs par défaut, avec `DeepPartial` ; sûr face à `__proto__`), `moveItem` (liste réordonnable), `sortedIndexBy` (insertion dans une liste triée en O(log n)), `isNonEmptyArray`, `formatRelativeTime` (`Intl.RelativeTimeFormat` : « il y a 5 min »).
- Volontairement absents car natifs en ES2024 : `groupBy` (`Object.groupBy`, `Map.groupBy`), `deepClone` (`structuredClone`), `createDeferred` (`Promise.withResolvers`), `last` (`.at(-1)`), tri et modification sans mutation (`toSorted`, `toSpliced`, `with`).

## Quatrième lot

### Benchmarks et annulation

- Benchmarks ajoutés pour les affirmations de performance : `sliceVisiblePoints` (~380× plus rapide que `filter` sur 36 000 points), `downsampleMinMax` + `projectPoints` (~2× plus rapide que projeter tous les points), `createFpsMeter` (~1,2× plus rapide qu'un tableau `push`/`shift`, sans allocation par frame). `projectPoints` n'est pas plus rapide que deux `createLinearScale` : aucune affirmation de performance dans sa doc.
- `mapConcurrent(items, mapper, concurrency, signal?)` : plus aucun appel ne démarre une fois le signal annulé ; le `mapper` reçoit le signal (pour `fetch`). `withTimeout` n'a pas de signal : il ne fait que borner l'attente d'une promesse qu'il ne peut pas annuler.

### Valeurs en direct (`tracking/`, `structure/`)

- `createStaleDetector(maxAgeMs)` : une valeur qui n'est plus rafraîchie depuis X ms est signalée (`isStale`), pour l'afficher invalide plutôt que figée.
- `createRateEstimator(timeConstantMs)` : vitesse de variation par seconde, lissée exponentiellement dans le temps (indépendante de la fréquence d'échantillonnage).
- `createPeakHold(holdMs, decayPerSecond)` : maintien de crête, puis retour immédiat ou à vitesse limitée.
- `RollingMinMax` : minimum et maximum des N dernières valeurs en O(1) amorti, sans allocation.

### Alarmes (`alarm/`)

- `ThresholdScale` (niveau sous le premier seuil + seuils croissants), `getThresholdLevel`, `getThresholdLevelWithHysteresis` (le niveau précédent est gardé tant que la valeur reste à moins de `deadband` d'une limite).
- Machine d'état ISA-18.2 simplifiée (sans mise en attente ni suppression), en fonctions pures : `AlarmState`, `updateAlarmState(state, isActive)`, `acknowledgeAlarm`, `isAlarmUnacknowledged` (clignote), `isAlarmActive`.

### Graphiques (suite)

- `Scale` (ex-`LinearScale`, partagé par les deux échelles), `createLogScale`, `getLogTicks` (puissances de dix exactes).
- Axe temporel : `getTimeTicks(start, end, count, isUtc)` (pas ronds de 1 ms à 1 semaine, alignés sur l'heure locale ou UTC) et `getTimeTickPattern(stepMs)` (le motif `formatDate` qui montre ce qui change entre deux graduations).
- `findNearestPoint` (infobulle, recherche dichotomique), `downsampleLttb` (Largest-Triangle-Three-Buckets, pour une courbe lisse avec peu de points).
- `svg/` : `createStepPath` (escalier `after` / `before` / `middle` pour les signaux discrets), `createAreaPath` (aire jusqu'à une ligne de base).

### Interaction et tests de survol

- `trackPointerDrag(element, { canStart, onStart, onMove, onEnd })` : glisser à la souris, au doigt ou au stylet, pointeur capturé, distances depuis l'appui (à convertir avec `screenDeltaToLocal` pour un symbole tourné) ; renvoie son nettoyage.
- `normalizeWheelDelta` (pixels quel que soit le `deltaMode`), `getWheelZoomFactor` (facteur exponentiel pour `zoomBounds`), `matchesShortcut(event, 'Ctrl+Shift+K')` (modificateurs exacts).
- `snapToGrid` (sans bruit flottant, origine décalable), `isPointInPolygon` (pair-impair, polygones concaves), `isPointInTransformedRect` (symbole tourné ou retourné), `getDistanceToSegment` (survol d'une ligne fine avec tolérance).

### Couleurs (suite)

- Retouche : `Hsl`, `toHsl`, `hslToRgba`, `lighten` / `darken` (luminosité HSL, teinte gardée), `withAlpha`, `toGrayscale` (gris de même luminance relative : un symbole désactivé garde son contraste), `getGradientColor(stops, value)` (dégradé à plusieurs arrêts : carte de chaleur, remplissage vert → orange → rouge).
- Cibles de contraste explicites :
  - WCAG 2 : `getWcagLevel(text, background, isLargeText)` → `'AAA'`, `'AA'` ou `undefined` (en plus de `meetsContrastLevel`).
  - APCA : `ApcaLevel` par usage (`'fluent-text'` Lc 90, `'body-text'` 75, `'content-text'` 60, `'large-text'` 45, `'spot-text'` 30, `'non-text'` 15), `meetsApcaLevel(text, background, level)` et `getApcaLevel` (l'usage le plus exigeant atteint). Valeur absolue de Lc : la polarité (clair sur foncé) est gérée par `getApcaContrast`.

### Formats, unités, export, stockage, cache

- `formatCompact(value, locale)` (`'1.2K'`, `'1,2 k'`), `formatSigned(value, digits)` (`'+3.2'`, pas de signe pour zéro), `roundToSignificantDigits`.
- Unités : `convertVolume` (mL, L, m³, gal US, ft³, bbl), `convertFlow` (L/s, L/min, m³/h, gal/min), `convertMass` (g, kg, t, lb), `convertAngularVelocity` (rpm, deg/s, rad/s).
- Export : `toCsv(rows, separator, shouldEscapeFormulas)` (RFC 4180, CRLF, dates ISO, protection optionnelle contre l'injection de formules), `downloadText` / `downloadBlob` (téléchargement via un lien temporaire ; BOM U+FEFF pour qu'Excel lise l'UTF-8).
- Stockage versionné : `createVersionedStorageItem(storage, key, { version, fallback, guard, migrate })` stocke `{ version, value }`. Quand une nouvelle version de l'application change la forme d'un réglage, `migrate(ancienneValeur, ancienneVersion)` convertit une fois la valeur sauvegardée (puis la réécrit) au lieu de la perdre ou de la relire avec la mauvaise forme ; une valeur sans enveloppe (écrite par `createStorageItem`) arrive en version 0.
- `LruCache` : `Map` bornée qui oublie les entrées les moins récemment utilisées.

### Extras

- Angles : `smoothAngleTowards` / `moveAngleTowards` (lissage et vitesse de rotation limitée par le plus court chemin : une aiguille de compas passe de 350° à 10° par le nord), `meanAngle` (moyenne circulaire : 350° et 10° donnent 0°), `formatHeading` (`'005°'`).
- `createLatestRunner(task)` : chaque appel annule le précédent (signal annulé, promesse rejetée), l'équivalent de `switchMap` sans RxJS pour une recherche à la frappe.
- `getPolygonArea`, `getPolygonCentroid` (placement de l'étiquette d'une zone), `createArrowPath` (vecteur vitesse ou vent, sens d'écoulement), `copyText` (presse-papiers, renvoie `false` au lieu de lever).

## Cinquième lot

### Fonctions « sans surprise » : plus de paramètre par défaut

- Tous les paramètres positionnels sont obligatoires : un appel montre tous les choix (`formatNumber(value, '1.0-2', 'en-US')`, `getNiceTicks(min, max, 5)`, `createRotationMatrix(90, { x: 0, y: 0 })`, `randomInt(1, 6, Math.random)`, `createStaleDetector(1000, () => performance.now())`). Règle notée dans `AGENTS.md`.
- Un paramètre dont l'absence a un sens prend `| undefined` explicitement (`sleep(ms, signal: AbortSignal | undefined)`).
- `formatNumber` exige une locale et groupe les milliers selon elle ; le format invariant sans séparateur est `formatDecimal`.
- `readStorage` / `createStorageItem` exigent un guard (`isFiniteNumber`, `isRecord`…).
- Les objets d'options (`AnimationOptions`, `ClockOptions`, `RetryOptions`, `BarTicksOptions`…) gardent leurs champs facultatifs, mais l'objet lui-même est obligatoire (`{}` pour tout garder).

### SVG : remettre droit sans bouger à l'écran

- Matrices (`geometry/`) : `resetMatrixRotation(matrix, pivot)`, `resetMatrixFlip(matrix, pivot)`, `resetMatrixRotationAndFlip(matrix, pivot)` (le pivot, typiquement le centre, reste au même endroit à l'écran), `moveMatrix(matrix, dx, dy)` (déplacement écran quelle que soit la rotation), `centerMatrixOn(matrix, pivot, target)`, `getMatrixRotation`, `isMatrixFlipped`. Un miroir est lu comme un flip horizontal appliqué avant la rotation (un flip vertical = flip horizontal + 180°), comme dans les éditeurs de symboles.
- Éléments SVG (`svg/`) : `getSvgTransform` / `setSvgTransform` (attribut `transform`), `getSvgLocalCenter` (centre de la `getBBox`), et en un appel `resetSvgRotation`, `resetSvgFlip`, `resetSvgRotationAndFlip`, `moveSvgElement`, `centerSvgElementOn` (recentre un texte mal centré sur sa ligne de base).
- Formes : `createCirclePath`, `createRectPath`, `createPiePath` (part de camembert jointe au centre, disque complet à 360°), `createStarPoints`.
- Animation : `getStrokeDashOffset(longueur, progression)` (anneau de progression, tracé qui se dessine), `getArcLength`, `formatRotation(angle, centre)` (aiguille mise à jour à chaque frame).

## Sixième lot

### Variantes `…Simple` (le standard maison, retirées au dix-septième lot)

- Les fonctions existantes ne changent pas. Une fonction dont des paramètres sont des choix a une variante `…Simple` dans son propre fichier : moins de paramètres, choix figés, tag JSDoc `@simple` qui les liste (comme `@cached`). Règle dans `AGENTS.md`, rappel dans le skill `add-function`.
- Standard : nombres en chiffres collés avec un point avant les décimales (`formatNumberSimple(1234.5, '1.2-2')` → `'1234.50'`), unités entières (secondes, degrés), heure locale pour les dates, `Math.random` et `performance.now()`, environ 5 graduations, bornes incluses, statistiques de population, jauges bornées, pas de signal d'annulation, `assertSimple(isTrue: boolean)` (booléen strict).
- 67 variantes : formats, angles, dates, aléatoire, suivi, perf, graphiques, DOM, collections, maths, stats, chaînes, SVG, géométrie, couleurs, async, garde, mémoïsation, logs, enums, animation. Pas de variante là où rien de raisonnable ne peut être figé (langue d'un texte, guard du stockage).

### SVG entre groupes

- `getSvgMatrixBetween(from, to)` et `convertSvgPoint(point, from, to)` : conversion de coordonnées entre deux éléments, quels que soient les groupes et transformations entre eux (via `getCTM`).
- `placeSvgElement(element, 'center', symbole, 'top-right')` : pose un point de la boîte d'un élément sur un point de la boîte d'un autre, dans n'importe quel groupe ; seule la position change.
- `rotateSvgElementAround(element, angle, pivot)` (rotation ajoutée) et `setSvgRotationAround(element, angle, pivot)` (angle absolu, idéal pour une aiguille à chaque frame) autour du centre d'un autre élément ou du sien.

### Visuel à l'écran (`svg/`)

- Tout est calculé à l'écran (`getScreenCTM`), puis reconverti dans le repère du parent : peu importent les groupes et leurs transformations, y compris un parent en miroir. Les 9 ancres (`Anchor`) sont celles de la boîte visible (`getSvgScreenBox`, `getSvgAnchorPoint`).
- `placeSvgElement(el, ancre, ref, ancreRef)` puis `moveSvgElement(el, dx, dy)` en pixels écran ; `rotateSvgElement`, `rotateSvgElementAround`, `setSvgRotation`, `setSvgRotationAround`, `flipSvgElement`, `scaleSvgElement` autour d'une ancre ; `resetSvgRotation` / `resetSvgFlip` / `resetSvgRotationAndFlip` jugés à l'écran ; variantes `…Simple` autour du centre.

### Wiki

- VitePress dans `docs/` : guide écrit à la main, une page par export générée depuis la JSDoc (signature, paramètres, exemple, variantes liées, tests avec leur résultat, couverture, fichiers à copier, code source avec bouton copier), barre latérale par catégorie, recherche locale (<kbd>Ctrl</kbd> <kbd>K</kbd>).
- `.github/workflows/wiki.yml` : build et publication sur GitHub Pages à chaque push sur `main`, avec le rapport de couverture sous `/coverage/`.

## Septième lot

### Formes SVG autour d'un élément

- `SvgArc` : `{ center, radius, startAngle, sweepAngle }`, le centre étant un élément (moyeu, cadran), l'arc démarrant à un angle et s'ouvrant d'un certain nombre de degrés.
- `drawSvgArc`, `drawSvgArcBand` (bande d'épaisseur donnée : zone colorée de jauge), `drawSvgArcTicks` (graduations régulières, longueur donnée ; majeures et mineures dans deux `<path>`), `drawSvgPie`, `drawSvgCircle`, `getSvgArcPoint` (position d'une étiquette ou d'une pointe d'aiguille), `getSvgAnchorPointIn` : le `d` du `<path>` est écrit dans ses propres coordonnées, quels que soient les groupes.
- D'élément à élément : `drawSvgLine(path, from, 'right', to, 'left')` (conduite entre deux symboles) et `drawSvgFrame(path, élément, marge)` (cadre de sélection).

### Revue des noms

- Géométrie alignée sur la table des préfixes : `getDistance`, `getDistanceToSegment`, `getHeadingBetween`, `getBoundingRect`, `getRectCenter`, `getRectIntersection`, `getRectUnion`, `isPointInRect(point, rect)` (comme `isPointInPolygon`), `createIdentityMatrix`, `createTranslationMatrix`, `createRotationMatrix`, `createScaleMatrix`, `resetMatrixRotation` / `resetMatrixFlip` / `resetMatrixRotationAndFlip` (comme `resetSvgRotation`).
- SVG : `getSvgLocalCenter` (centre dans le repère local, à ne pas confondre avec `getSvgAnchorPoint` à l'écran), `centerSvgElementOn` (comme `centerMatrixOn`).
- Les noms mathématiques standards restent (`clamp`, `lerp`, `mean`, `wrap`…).

### Wiki

- Le code source et le fichier de test sont inclus au build par VitePress (`<<< @/../src/…`) : rien n'est recopié dans les pages.
- Chaque page liste les fonctions utilisées (« Uses ») et celles qui l'utilisent (« Used by »), les fichiers à copier, et des mots-clés tirés du nom pour la recherche.

## Huitième lot : configs de lint par thème

- Les règles sont découpées en **blocs thématiques** (`lint/eslint/`, `lint/stylelint/`), chacun une fonction qui renvoie des configs nommées, assemblés en **profils** par type de projet (`lint/profiles/`) : lib TypeScript (la lib SVG), lib Angular de features (design system, features, stores, accès au back), application Angular. La config de ce dépôt est le profil lib TypeScript plus ses règles propres ; la config résolue est identique règle pour règle à l'ancienne, à part les règles AWS de SonarJS désormais coupées.
- Les blocs ESLint sont rangés par cible (`setup/`, `code/`, `templates/`, `frameworks/`, `tests/`, `node/`, `project/`) et les règles de code par **concept** (conditions, boucles, nommage, erreurs…), tous plugins confondus (ESLint, SonarJS, Unicorn, typescript-eslint) : on retrouve une règle par ce qu'elle vérifie, pas par son plugin. Un profil par fichier. La référence des règles du wiki (`docs/lint-rules/`) est générée depuis les blocs et le commentaire au-dessus de chaque règle ; la config résolue est restée identique règle pour règle après le découpage.
- Nouveaux blocs : `angular`, `angular-template`, `angular-accessibility` (WCAG, activable), `angular-i18n` (activable), `ngrx-signals`, `rxjs`, `storybook`, `security` (XSS, contournement du sanitizer), `architecture` (atomic design avec eslint-plugin-boundaries : un niveau n'importe que les niveaux inférieurs, seul `data-access` utilise HttpClient), `app` (les règles dangereuses ne peuvent pas être désactivées dans une application, même avec une raison ; une lib le peut, justifié), `compat` (navigateurs cibles).
- Stylelint : `base`, `scss`, `order`, `strictness`, `design-tokens` (couleurs, espacements, rayons, ombres, polices, z-index par tokens uniquement), `layers` (règle maison : seules les cascade layers du design system), `performance` (animations sur transform/opacity), `accessibility`, `logical-properties`, `prettier`.
- `examples/design-system/` : lib Angular d'exemple (atomes, molécules, organismes, page, store NgRx signals, data-access, tokens, layers) lintée par les profils ; `pnpm lint:presets` vérifie qu'elle passe et que chaque bloc attrape sa faute (dont le même `any` justifié, accepté en lib et refusé en application).
- Performance mesurée : règles AWS de SonarJS coupées (20 % du temps), `--concurrency auto` (−38 %), `pnpm lint:cached` (3 s sans changement) ; Unicorn ne coûte pas cher (12 % pour 300 règles).
- Wiki : guides « Linting » (profils, blocs, politique lib/application, performance) et « CSS & design system » (tokens, atomic design, cascade layers, bonnes pratiques), avec le code des blocs et de l'exemple inclus depuis les fichiers.

## Tests — cas limites couverts

- **Format** : `NaN`, `Infinity`, `-0`, `1.005`, `1e-7`, `1e21`, `maxFractionDigits` invalide
- **`formatNumber`** : `digitsInfo` invalide, `minIntegerDigits` > 1 (`'3.0-2'` → `"005"`)
- **Guards** : `null`, `undefined`, `NaN`, arrays vs objets, enums numériques et string
- **Math** : `min > max`, division par zéro, valeurs négatives dans `wrap`, précision des `*ToStep`, équivalence `roundToFractionDigits` / `formatDecimal`
- **Couleur** : `#FFF`, `#ffff`, espaces, casse, `rgb(100%, 0%, 0%)`, `rgb(255 0 0 / 50%)`, strings invalides, cache plein
- **Timers** (`sleep`, `throttle`, `debounce`, `rafThrottle`) : fake timers, annulation, `flush`
- Couverture exigée : 100 % (lignes, branches, fonctions, instructions)

## Neuvième lot : lint réduit, rangé par concept, désactivation réservée aux warnings

- **Moins de plugins** : ESLint, typescript-eslint, import-x (+ résolveur TypeScript), Prettier, angular-eslint, SonarJS (optionnel), Storybook (optionnel, allégé). Retirés : Unicorn, JSDoc, regexp, Vitest, NgRx, RxJS, no-unsanitized, boundaries, check-file, compat, eslint-comments. Les règles cœur que ces plugins couvraient sont réactivées (`require-unicode-regexp` avec `v`, `prefer-named-capture-group`, `no-negated-condition`…).
- **Rangement** : `lint/eslint/rules/<concept>.mjs` (ESLint + typescript-eslint + import-x), `sonarjs/<concept>.mjs` (mêmes concepts), `angular/`, `storybook/`, `local/` (règles écrites ici), `setup/`, `presets/`. Un projet n'importe qu'un preset (`presets/typescript.mjs` ou `presets/angular.mjs`) ; `lint/examples/` donne un `eslint.config.mjs` par type de projet.
- **SonarJS = Sonar way** : les règles du profil par défaut de SonarQube sont actives, les autres coupées ; les limites de taille qui remplacent une règle cœur restent. Sans SonarJS, les règles cœur équivalentes (`complexity`, `max-depth`, `max-lines`, `max-lines-per-function`, `max-nested-callbacks`) prennent le relais.
- **Désactivation** : une règle est un `warn` (exception légitime décrite par `// Warn:`, désactivable ligne par ligne avec une raison) ou une `error` (non désactivable). Règles maison : `local/disable-only-warnings` (lit la sévérité résolue de chaque règle, recopiée dans `settings` par les presets), `local/disable-reason` (warning sans raison), `local/disable-next-line-only`. Une application (`isApplication`) passe les échappatoires d'une lib (`any`, `!`, assertions) en erreur.
- **Noms de fichiers** : `local/kebab-case-path` (fichiers et dossiers, points = séparateurs de mots) et `local/export-matches-filename` (une fonction ou classe exportée par fichier, nommée d'après lui, `button.component.ts` → `ButtonComponent` ; mode `all` pour ce dépôt).
- **Architecture atomic design** refaite avec `import-x/no-restricted-paths` et `no-restricted-imports` (HttpClient réservé à `data-access`).
- **Stylelint** remis à la config standard SCSS (`lint/stylelint/rules/base.mjs`, `presets/scss.mjs`), à reconstruire par concept.
- **Wiki** : une seule barre latérale pour tout le site (guide, linting, CSS, API, règles), la spécification n'est plus publiée.
- Performance : `pnpm lint` 28 s (32 s avant), 40 s sur un seul thread (51 s avant).

## Dixième lot : erreur = vraie faute, warning = choix à justifier

- **Principe** : une `error` est une vraie faute (bug, typage cassé, faille) ou un style que l'autofix applique, et ne se désactive jamais ; un `warn` est un style sans autofix ou une règle qui peut limiter un vrai besoin, désactivable ligne par ligne avec une raison. Classement fait d'après les métadonnées de chaque règle (`problem`, `fixable`), puis à la main (règles qui attrapent des bugs remises en erreur, exceptions `// Warn:`).
- **Typage solide** : utiliser une valeur `any` (`no-unsafe-member-access`, `-call`, `-assignment`, `-argument`, `-return`) est une erreur. Écrire `any` ou `void` dans un type : libre dans une lib (`isLibrary: true`), warning ailleurs. L'ancien verrou « application » disparaît.
- **Retirés** : `local/require-spec-file` (les specs relèvent du projet ; ici la couverture à 100 % les impose), le bloc d'architecture atomic design (pas de nommage de dossiers ni de règles d'import par couche), Stylelint (à refaire plus tard), `import-x/max-dependencies`.
- **Imports** : option `importStyle` : `folders` (un voisin `./x` ou un dossier `../y` via son `index.ts`, sans extension, règle `local/import-folders`) ou `files` (le fichier avec son extension, pour ce dépôt dont les fichiers se copient seuls).
- **`disabledRules`** : liste de règles coupées par le projet, visible dans sa config ; un nom inconnu lève une erreur.
- **Doc** : page « Write the config » (chaque option expliquée), colonne « What it checks » dans la référence des règles (description de la règle elle-même).

## Onzième lot : SonarJS toujours actif, presets par type de projet, niveau info

- **SonarJS fusionné dans `rules/`** : il est toujours actif (SonarQube analyse tous les projets). Chaque fichier de concept a ses sections ESLint, typescript-eslint et SonarJS ; un doublon SonarJS d'une règle cœur reste coupé (la règle cœur est plus rapide), une règle SonarJS qui mesure autrement remplace la règle cœur (`Off: replaced by sonarjs/…`).
- **Presets par type de projet** : `typescript-library`, `typescript-library-storybook` (lib SVG), `angular-library`, `angular-library-storybook`, `angular-app` (projets programmes). Les règles sont les mêmes partout ; un preset ajoute Angular ou Storybook et dit si le code est une lib (`any` et `void` libres) ou une application (warnings). Options restantes : `tsconfigRootDirectory`, `sourceFiles`, `developmentDependencyFiles`, `disabledRules`, `overrides`, et selon le preset `storybookPackageDirectory`, `prefix`, `isAccessible`, `isTranslated`.
- **Imports sans extension, par dossier** : fixe dans les presets. Ce dépôt garde, par `overrides`, les imports de fichiers avec `.ts` (ses fichiers se copient seuls) et un seul nom exporté par fichier.
- **Niveau `info`** : une suggestion (« on pourrait aussi écrire… »), soulignée en bleu dans l'éditeur, jamais bloquante. ESLint ne connaît que off/warn/error : un bloc écrit `['info']`, les presets le changent en `off` en ligne de commande (`ESLINT_INFO_RULES=off` dans `pnpm lint`) et en warning dans l'éditeur, que VS Code affiche en bleu grâce à `eslint.rules.customizations` écrit par `pnpm lint:editor`. Une règle dont dépend le profil Sonar way n'est jamais `info` (vérifié par `pnpm lint:presets`).

## Douzième lot : config racine en mode Node, une config par projet

- **Comme un workspace Angular** : une config racine (`typescript-node`, mode Node : configs d'outils, scripts, dépendances de dev, console) et une config par projet (lib, shell), qui importe la racine (`rootConfig`) et passe ses sources (`sourceFiles`) en mode navigateur (globales du navigateur, pas de module Node, imports de dossier sans extension, dépendances de dev seulement dans les specs et stories). Le reste du dossier du projet reste en mode Node.
- **Presets** : `typescript-node` (racine), `typescript-browser` (lib TS pour le navigateur, `isLibrary`, Storybook en option), `angular-library` (Storybook en option), `angular-app`. Storybook est une option du projet, pas de la racine.
- **Accessibilité et i18n** : règles coupées (simulateurs, pas de lecteur d'écran ; traductions avec Transloco), sauf ce qui est bizarre de toute façon : `autofocus` et `tabindex` positif en warning. Options `isAccessible` et `isTranslated` retirées.
- **Rangement** : `lint/eslint/{presets, rules, setup}` ; Angular, Storybook, les modes et les règles maison (`rules/local/`) sont dans `rules/`, chaque fichier exporte une fonction nommée d'après lui.

## Treizième lot : un export par fichier en warning, chemins simplifiés à la sauvegarde

- **Exports** : dans les presets, seules les fonctions et classes exportées comptent ; leurs types et constantes restent dans le même fichier (un type « branded » `TotoId` et sa fonction `TotoId`). Deux fonctions exportées dans un fichier, ou une fonction qui ne porte pas le nom du fichier : un warning, pas une erreur. Une fonction peut être en PascalCase quand elle construit le type du même nom. Ce dépôt garde, par `overrides`, un seul nom exporté par fichier (types compris) en erreur : son catalogue et le copier-coller fichier par fichier en dépendent.
- **« Path can be simplified »** : `local/import-folders` a un autofix. Quand l'index d'un dossier réexporte ce qu'un import prend (en suivant les `index.ts` imbriqués, `export *` et `export { a as b }`), l'import passe par lui à la sauvegarde ; un import par défaut devient le nom que l'index lui donne. Dans les sources : le dossier (`'../../atoms'`) ; en Node : le chemin de l'index avec son extension (`'./lint/index.mjs'`). `lint/index.mjs` réexporte les presets.
- **import-x et son résolveur TypeScript** : gardés. 24 règles utilisées, dont les coûteuses à refaire (cycles, dépendances déclarées, ordre avec autofix), et le résolveur suit les alias de chemins des workspaces Angular.

## Quatorzième lot : une lib copiée, pas publiée

- **Imports par dossier** : `src/` n'importe plus les fichiers avec `.ts` mais un voisin (`./clamp`) ou un dossier (`../math`), à travers l'`index.ts` de chaque dossier (`internal/` et `testing/` en ont un aussi, non réexporté). Les imports ont été réécrits par l'autofix de `local/import-folders`. Le catalogue et le wiki suivent les `index.ts` jusqu'au fichier qui déclare chaque nom.
- **Types avec leur fonction** : les 36 types utilisés par un seul fichier du même dossier (les `…Options`, les unités, les types de résultat) ont rejoint le fichier de leur fonction ; un type partagé garde son fichier. Une fonction ou classe exportée par fichier, en warning.
- **Plus de build ni de publication** : la lib est copiée dossier par dossier dans les projets. Retirés : `vite build`, les déclarations, `size-limit`, `publint`, `attw`, les champs de publication du `package.json` (`private: true`). Il reste : catalogue, types, lint, format, knip, tests avec couverture à 100 %.
- **Benchmarks dans Chromium** : Vitest en mode navigateur avec Playwright, page isolée (COOP/COEP) pour des timers précis à 5 µs. Chiffres mis à jour.
- **`disabledRules` retiré** : on coupe une règle par `overrides`, dans la config relue.
- **Versions** : tout à jour et figé exactement. TypeScript reste en 6.0.3 (typescript-eslint ne supporte pas la 7) et `@types/node` en 24.19.0 (Node 24).

## Quinzième lot : tests et stories souples, niveaux relus, transfert par texte

- **Specs, helpers de test, benchmarks, stories** : chaque warning y devient une info, ainsi que les règles qui empêchent de bidouiller (`any`, `!`, assertions dangereuses) ; les erreurs restent (bugs, style corrigé automatiquement), ainsi que SonarJS et les règles qui le remplacent, car SonarQube analyse aussi les specs. Seules les règles actives partout sont abaissées : rien n'est allumé dans les tests.
- **Niveaux relus** : une vingtaine de warnings de pur style passent en info (constructeurs inutiles, `default-param-last`, contraintes de type inutiles, `prefer-standalone`…) ; `no-useless-catch` reste un warning (il remplace une règle Sonar way).
- **Démo des niveaux** : `examples/lint-levels/levels.mjs` (info, warning, erreur), ignoré par `pnpm lint`. WebStorm n'a pas de niveau info : il les montre en warning.
- **`pnpm transfer <dossiers>`** : un seul fichier texte (`transfer/<nom>.mjs`) qui recrée les dossiers avec `node <fichier> [destination]` ; un dossier de `src/` emmène les dossiers de `src/` qu'il importe. Pour recopier `lint/` et la lib là où on ne peut que coller du texte.

## Seizième lot : Stylelint, config ESLint 8, CI par branche

- **Stylelint pour le SCSS des projets Angular** : chaque règle du cœur, de stylelint-scss et de stylelint-order listée par concept (`lint/stylelint/rules/`), niveaux tirés de `stylelint-config-standard-scss` (le « recommended » = erreurs, l'autofix = erreurs, le reste du standard = warnings) puis les choix du projet : `rem` sans décimales, pas de couleur nommée, `!important`, `#id`, imbrication > 3, `::ng-deep` en warning ; sélecteurs de composants Angular acceptés ; ordre des propriétés (recess) corrigé à la sauvegarde. Même politique de désactivation que ESLint (`local/disable-only-warnings`). Formatage laissé à Prettier. Dépendances : stylelint, stylelint-scss, stylelint-order, stylelint-config-recess-order, postcss-scss.
- **CI** : `pnpm lint` / `pnpm lint:css` échouent sur les erreurs ; `pnpm lint:strict` / `pnpm lint:css:strict` aussi sur les warnings, pour une MR vers `main`.
- **`lint/legacy/angular-18.eslintrc.json`** : les mêmes règles ESLint pour un ancien projet Angular 18 sous ESLint 8 (format `.eslintrc.json`, commentaires gardés), généré depuis le preset d'application et vérifié avec ESLint 8.57, typescript-eslint 8 et angular-eslint 18 (12 réglages adaptés). Sans SonarJS, import-x, Prettier ni règles maison.
- **Le dossier `lint/`** garde son nom : il contient maintenant `eslint/`, `stylelint/` et `legacy/`.

## Dix-septième lot : valeurs par défaut partout, fin des variantes `…Simple`

- **Un défaut partout où un neutre existe** : coordonnées et tailles `0`, listes `[]`, textes `''`, options `{}`, locale `'en-US'`, `Math.random`, `performance.now()`, heure locale, pas de 1, bornes [0, 1], 5 graduations, ancre `'center'`, angles de 0 à 360°. Restent obligatoires les éléments DOM, les callbacks et la valeur à convertir ou formater.
- **`null` prend le défaut comme `undefined`** : `param?: T | null` (ou `T | null | undefined` quand un paramètre obligatoire suit), résolu par `const resolvedParam = param ?? DEFAULT;` ; les champs d'options sont `readonly x?: T | null`, lus avec `??` (une valeur par défaut de déstructuration laisse passer `null`). La JSDoc finit par « Defaults to `X`. », et chaque spec vérifie que l'appel sans argument, avec `null` et explicite donnent le même résultat.
- **`formatNumber(value, digitsInfo?, locale?, useGrouping?)`** : `'1.0-3'`, `'en-US'` et pas de séparateur de milliers par défaut (`1234.5`) ; `useGrouping` à `true` rend `1,234.5`. `formatDecimal(value, maxFractionDigits?, useGrouping?)` gagne aussi `useGrouping`.
- **Les 79 variantes `…Simple` sont supprimées** (avec le tag `@simple`, le badge du wiki et la page `guide/simple-variants`) : la fonction complète appelée avec ses défauts les remplace.

## Dix-huitième lot : une lib resserrée, des entrées de confiance, le SVG natif

- **Thèmes retirés** tant qu'aucun projet n'en a besoin : alarmes, animation, graphiques, angles, collections, dates, DOM, événements, fonctions, géométrie, logs, perf, aléatoire, statistiques, stockage, structures, temps, suivi, unités, et une partie d'async (`sleep` reste), de duration (`parseTimeSpan` reste) et de format (`formatNumber` et `formatDecimal` restent). Leurs signatures sont gardées dans `docs/REMOVED.md`, le code dans l'historique Git.
- **Couleurs** refaites : `getSvgFillColor(element)` lit le `fill` calculé en RGB, `getContrastingTextColor(rgb)` rend `'#000000'` ou `'#ffffff'`, celui qui contraste le plus selon un APCA simplifié (les deux contrastes comparés, sans les décalages qui ne changent pas l'ordre).
- **Défauts dans la signature** (`step = 1`) pour les réglages, jamais sur l'opérande principale ; plus de `| null` : l'appelant passe `value ?? undefined`.
- **Entrées de confiance** : plus de validation d'argument. Un `parse…` vérifie son texte avec son expression régulière et lève une seule `TypeError` (`digitsInfo` doit être complet, `'1.0-3'`) ; il renvoie la valeur, plus `undefined`.
- **Plus de variantes `…Cached`** : un cache vit dans la fonction quand il paie toujours (`isEnumValue` met les valeurs de chaque enum dans un `WeakMap`).
- **JSDoc courte, sur les exports seulement** ; pas de commentaire sur les constantes ni les helpers. Code simplifié là où l'astuce ne gagnait rien (`clamp` = `Math.min(Math.max(value, min), max)`, `joinPath` en un regex).
- **SVG natif**, testé dans Chromium (projet Vitest `browser`) : `addSvgTransform` (une liste de transforms qu'on change un par un, en valeurs absolues), `getSvgAnchorPoint` / `getSvgAnchorPointIn` (9 ancres), `placeSvgElement` (une ancre sur une ancre, entre groupes), `moveSvgElement` (direction de l'écran, unités du parent), `translateSvgElement` (axes de l'élément), `rotateSvgElement`, `flipSvgElement`, `scaleSvgElement` (autour d'une ancre), `resetSvgTransform` / `Rotation` / `Flip` / `RotationAndFlip` (chaque opération ajoute sa matrice dans la liste et la renvoie, ou règle le transform qu'on lui passe ; les resets sont des matrices d'annulation, les transforms ajoutés ensuite partent de l'élément redressé ; tout passe par les API SVG natives : `ownerSVGElement.createSVGTransform`, `createSVGMatrix`, `getScreenCTM`, `matrixTransform`), et les tracés autour d'un élément : `drawSvgArc`, `drawSvgArcBand`, `drawSvgArcTicks`, `drawSvgPie`, `getSvgArcPoint`, `drawSvgBarRange`, `drawSvgBarTicks` (barres dans les axes de leur élément, même tourné). Pas de formes décoratives (flèche, étoile).

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

- `createSingleton<T>(factory: () => T): () => T` : lazy init, la factory n'est appelée qu'au premier appel (même si elle retourne `undefined`)

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

Demandé après le premier lot ; la liste complète, avec les fichiers à copier, est dans [`FUNCTIONS.md`](FUNCTIONS.md).

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
- Points et rectangles : `distance`, `lerpPoint`, `polarToCartesian`, `headingBetween`, `rotatePoint`, `boundingRect`, `rectCenter`, `rectContainsPoint`, `rectIntersection`, `rectUnion`, `insetRect`, `fitRect`, `formatViewBox`, `parseViewBox`.
- Transformations (`Matrix2D`, format SVG `a b c d e f`) : `parseTransform`, `formatMatrix`, `multiplyMatrices`, `invertMatrix`, `translationMatrix`, `rotationMatrix`, `scaleMatrix`, `transformPoint`, `transformDelta`, `decomposeMatrix`, `composeMatrix`, `removeRotationAndFlip` (annule rotation et flips, garde position et taille), `screenDeltaToLocal` (convertit un déplacement écran dans le repère d'un élément tourné ou retourné, sans le détransformer).
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

Règles d'écriture formalisées d'abord (section « Writing a function » d'[`AGENTS.md`](../AGENTS.md), skill `add-function`, JSDoc vérifiée par `eslint-plugin-jsdoc` : phrases complètes, `@param name - …`, `@returns`, `@throws`, `@example`, tags `@cached` et `@rejects`). Le catalogue du README et [`FUNCTIONS.md`](FUNCTIONS.md) sont générés par `pnpm docs:catalog` (lancé par `pnpm check`).

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

## Tests — cas limites couverts

- **Format** : `NaN`, `Infinity`, `-0`, `1.005`, `1e-7`, `1e21`, `maxFractionDigits` invalide
- **`formatNumber`** : `digitsInfo` invalide, `minIntegerDigits` > 1 (`'3.0-2'` → `"005"`)
- **Guards** : `null`, `undefined`, `NaN`, arrays vs objets, enums numériques et string
- **Math** : `min > max`, division par zéro, valeurs négatives dans `wrap`, précision des `*ToStep`, équivalence `roundToFractionDigits` / `formatDecimal`
- **Couleur** : `#FFF`, `#ffff`, espaces, casse, `rgb(100%, 0%, 0%)`, `rgb(255 0 0 / 50%)`, strings invalides, cache plein
- **Timers** (`sleep`, `throttle`, `debounce`, `rafThrottle`) : fake timers, annulation, `flush`
- Couverture exigée : 100 % (lignes, branches, fonctions, instructions)

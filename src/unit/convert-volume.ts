/** A volume unit: millilitres, litres, cubic metres, US gallons, cubic feet, oil barrels (42 US gallons). */
export type VolumeUnit = 'bbl' | 'ft³' | 'gal' | 'L' | 'm³' | 'mL';

/** US liquid gallon (exact: 231 cubic inches). */
const LITRES_PER_US_GALLON = 3.785411784;
/** Cubic foot (exact from the international foot). */
const LITRES_PER_CUBIC_FOOT = 28.316846592;
/** US gallons in an oil barrel. */
const US_GALLONS_PER_BARREL = 42;
const LITRES_PER_CUBIC_METRE = 1000;
const MILLILITRES_PER_LITRE = 1000;

/**
 * Converts a volume between units, with the exact definitions: tank contents, fuel, ballast.
 *
 * @param value - The volume, in `from` units.
 * @param from - Unit of `value`.
 * @param to - Unit of the result.
 * @returns The volume in `to` units.
 * @example
 * convertVolume(1, 'm³', 'L'); // 1000
 * convertVolume(1, 'bbl', 'L'); // 158.987…
 */
export function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
  return from === to ? value : (value * litresPer(from)) / litresPer(to);
}

/**
 * Gives the size of a volume unit.
 *
 * @param unit - A volume unit.
 * @returns Litres in one `unit`.
 */
function litresPer(unit: VolumeUnit): number {
  switch (unit) {
    case 'mL': {
      return 1 / MILLILITRES_PER_LITRE;
    }
    case 'L': {
      return 1;
    }
    case 'm³': {
      return LITRES_PER_CUBIC_METRE;
    }
    case 'gal': {
      return LITRES_PER_US_GALLON;
    }
    case 'ft³': {
      return LITRES_PER_CUBIC_FOOT;
    }
    case 'bbl': {
      return LITRES_PER_US_GALLON * US_GALLONS_PER_BARREL;
    }
  }
}

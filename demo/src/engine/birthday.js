import { seededRandom } from "./random.js";
import { generateLotto } from "./lotto.js";

/**
 * Convert a birth date to a 32-bit integer seed.
 */
export function birthdayToSeed(yyyy, mm, dd) {
  return (yyyy * 10000 + mm * 100 + dd) >>> 0;
}

/**
 * Generate 6 lucky numbers deterministically from a birth date.
 * Same date always produces the same result.
 *
 * @param {number} yyyy - Full year (e.g. 1990)
 * @param {number} mm   - Month (1–12)
 * @param {number} dd   - Day (1–31)
 */
export function generateFromBirthday(yyyy, mm, dd) {
  const rng = seededRandom(birthdayToSeed(yyyy, mm, dd));
  return generateLotto(rng);
}

import { describe, it, expect } from "vitest";
import { generateFromBirthday } from "../src/engine/birthday.js";

describe("generateFromBirthday", () => {
  it("generates 6 numbers", () => {
    expect(generateFromBirthday(1990, 5, 15)).toHaveLength(6);
  });

  it("same birthday → same numbers (determinism)", () => {
    const a = generateFromBirthday(1990, 5, 15);
    const b = generateFromBirthday(1990, 5, 15);
    expect(a).toEqual(b);
  });

  it("different birthday → different numbers", () => {
    const a = generateFromBirthday(1990, 5, 15);
    const b = generateFromBirthday(1990, 5, 16);
    expect(a).not.toEqual(b);
  });

  it("all numbers in [1, 45]", () => {
    const result = generateFromBirthday(1985, 12, 31);
    result.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(45);
    });
  });

  it("no duplicates", () => {
    const result = generateFromBirthday(2000, 1, 1);
    expect(new Set(result).size).toBe(6);
  });

  it("sorted in ascending order", () => {
    const result = generateFromBirthday(1995, 7, 4);
    expect(result).toEqual([...result].sort((a, b) => a - b));
  });
});

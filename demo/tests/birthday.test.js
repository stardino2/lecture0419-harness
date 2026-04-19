// placeholder — filled during After demo (live session)
// Prompt to give Cline: "Write tests for demo/src/engine/birthday.js"
//
// Expected test cases:
//   1. Same birth date → same output array
//   2. Different birth date (even by 1 day) → different output array
//   3. Output length is 6
//   4. All numbers in [1, 45]
//   5. No duplicates
//   6. Sorted in ascending order

import { describe, it, expect } from "vitest";
import { generateFromBirthday } from "../src/engine/birthday.js";

describe("birthday.js — placeholder tests", () => {
  it("generates 6 numbers for a given birthday", () => {
    const result = generateFromBirthday(1990, 5, 15);
    expect(result).toHaveLength(6);
  });

  it("TODO: same birthday → same numbers (determinism)", () => {
    const a = generateFromBirthday(1990, 5, 15);
    const b = generateFromBirthday(1990, 5, 15);
    expect(a).toEqual(b);
  });
});

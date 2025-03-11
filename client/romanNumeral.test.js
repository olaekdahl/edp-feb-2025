/* eslint-disable no-undef */
import { toRoman } from "./romanNumeral";

it('returns i given 1', () => {
  // ARRANGE
  const decimal = 1;
  const expectedRoman = "i";
  // ACT
  const actualRoman = toRoman(decimal)
  // ASSERT
  expect(actualRoman).toBe(expectedRoman)
});


import test from "node:test";
import assert from "node:assert/strict";
import { PatternGenerator } from "../dist/patterns.js";

test("PatternGenerator.sine length matches width", () => {
  const line = PatternGenerator.sine(2, 24);
  assert.equal(line.length, 24);
});

test("PatternGenerator.scan has single block", () => {
  const line = PatternGenerator.scan(3, 16);
  assert.equal(line.length, 16);
  assert.equal([...line].filter((c) => c === "█").length, 1);
});

test("PatternGenerator.confetti is deterministic", () => {
  const a = PatternGenerator.confetti(4, 40);
  const b = PatternGenerator.confetti(4, 40);
  assert.equal(a, b);
});

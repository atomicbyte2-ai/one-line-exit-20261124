// SPDX-License-Identifier: MIT
// The One-Line Exit — entry program.
// Writes the one-line resignation letter to entry.txt.
// No network, no external input: the line is a fixed string below.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I hereby resign: the office plant has now outlived three managers, and I refuse to be the fourth.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${LINE.length}`);
}
if (/[\r\n]/.test(LINE) || LINE.trim() !== LINE) {
  throw new Error("entry must be a single clean line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
// NOTE: no copy is kept next to this file — the grading sandbox runs
// /bot read-only, so any write to the script directory fails the run.
// Round-trip check: what was written must be exactly the validated line.
if (readFileSync(outPath, "utf8") !== LINE) {
  throw new Error("round-trip check failed: entry.txt does not match the line");
}
console.log(LINE);

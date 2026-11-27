// News-image entry for Friday 27 November 2026.
// The program copies the entry.png beside this file to /output/entry.png.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Node 22, standard library only. The copy is byte-exact, so two runs
// always produce identical output.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

// Read the image as bytes, refuse anything that is not a PNG, and write
// those exact bytes out. No re-encoding, so the output is byte-identical
// to the source on every run.
const bytes = readFileSync(new URL('./entry.png', import.meta.url));
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(pngMagic)) {
  throw new Error('entry.png is not a PNG file');
}
const outPath = join(outDir, 'entry.png');
writeFileSync(outPath, bytes);
console.log(`wrote ${outPath} (${bytes.length} bytes)`);

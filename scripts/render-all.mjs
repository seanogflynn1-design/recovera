#!/usr/bin/env node
/**
 * Render every composition (Scene01…Scene10) to a separate MP4 in ./output.
 *
 * Runs `remotion render <id> output/<id>.mp4` for each composition listed
 * below. Exits non-zero on the first failure.
 */

import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const SCENES = [
  "Scene01",
  "Scene02",
  "Scene03",
  "Scene04",
  "Scene05",
  "Scene06",
  "Scene07",
  "Scene08",
  "Scene09",
  "Scene10",
];

const outputDir = resolve(process.cwd(), "output");
mkdirSync(outputDir, { recursive: true });

function runRemotion(scene) {
  return new Promise((resolvePromise, rejectPromise) => {
    const outFile = resolve(outputDir, `${scene}.mp4`);
    const child = spawn(
      "npx",
      ["remotion", "render", scene, outFile, "--codec=h264"],
      { stdio: "inherit", shell: false },
    );
    child.on("exit", (code) => {
      if (code === 0) resolvePromise();
      else rejectPromise(new Error(`${scene} exited with code ${code}`));
    });
    child.on("error", rejectPromise);
  });
}

(async () => {
  const start = Date.now();
  for (const scene of SCENES) {
    console.log(`\n▸ Rendering ${scene}…`);
    await runRemotion(scene);
  }
  const seconds = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n✓ All scenes rendered in ${seconds}s. See ./output/`);
})().catch((err) => {
  console.error(`\n✗ Render failed: ${err.message}`);
  process.exit(1);
});

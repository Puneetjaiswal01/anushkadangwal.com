import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
const base = "https://anushkadangwal.com";
const built = readFileSync("dist/index.html", "utf8");
const assets = [...built.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map(
  (match) => match[1],
);
if (!assets.length) throw new Error("No compiled assets found in the build.");
let reason = "";
for (let attempt = 1; attempt <= 24; attempt++) {
  try {
    const response = await fetch(
      `${base}/?release=${process.env.GITHUB_SHA || Date.now()}`,
      {
        signal: AbortSignal.timeout(15000),
        headers: { "Cache-Control": "no-cache" },
      },
    );
    if (!response.ok) throw new Error(`Homepage returned ${response.status}`);
    const live = await response.text();
    if (!assets.every((asset) => live.includes(asset)))
      throw new Error("The deployed page is still from a different build.");
    for (const asset of assets) {
      const response = await fetch(base + asset, {
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok)
        throw new Error(`Asset returned ${response.status}: ${asset}`);
      if ((response.headers.get("content-type") || "").includes("text/html"))
        throw new Error(`Expected an asset, received HTML: ${asset}`);
    }
    const song = "/audio/a-little-place-to-land.mp3";
    const music = await fetch(base + song, {
      signal: AbortSignal.timeout(20000),
    });
    if (!music.ok) throw new Error(`Music returned ${music.status}`);
    const liveMusic = Buffer.from(await music.arrayBuffer());
    const digest = (data) => createHash("sha256").update(data).digest("hex");
    if (digest(liveMusic) !== digest(readFileSync("public" + song)))
      throw new Error(
        "The published instrumental does not match this release.",
      );
    console.log(
      `Verified the new site, compiled assets and playable instrumental at ${base}`,
    );
    process.exit(0);
  } catch (error) {
    reason = error.message;
    console.log(`Deployment check ${attempt}/24: ${reason}`);
  }
  if (attempt < 24) await new Promise((resolve) => setTimeout(resolve, 15000));
}
throw new Error(`Could not verify the live deployment: ${reason}`);

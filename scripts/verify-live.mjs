import { readFileSync } from "node:fs";
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
    console.log(`Verified the new site and its compiled assets at ${base}`);
    process.exit(0);
  } catch (error) {
    reason = error.message;
    console.log(`Deployment check ${attempt}/24: ${reason}`);
  }
  if (attempt < 24) await new Promise((resolve) => setTimeout(resolve, 15000));
}
throw new Error(`Could not verify the live deployment: ${reason}`);

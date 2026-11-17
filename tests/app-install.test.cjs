const { unlock } = require("./unlock.cjs");
const { chromium, devices } = require("playwright");
const assert = require("node:assert/strict");
const base = (process.env.SITE_URL || "http://127.0.0.1:4173").replace(
  /\/$/,
  "",
);

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext({
      ...devices["iPhone 13"],
      serviceWorkers: "allow",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base);
    await unlock(page);
    await page.locator("h1").first().waitFor();
    const manifestURL = await page
      .locator('link[rel="manifest"]')
      .getAttribute("href");
    assert.ok(manifestURL, "app has a web manifest");
    const manifestResponse = await context.request.get(
      new URL(manifestURL, base).href,
    );
    assert.equal(manifestResponse.status(), 200);
    const manifest = await manifestResponse.json();
    assert.ok(
      manifest.name && manifest.short_name,
      "manifest provides installable app names",
    );
    assert.equal(
      manifest.display,
      "standalone",
      "installed app launches without normal browser UI",
    );
    assert.ok(manifest.start_url, "manifest has a launch URL");
    assert.ok(
      manifest.icons.some((icon) => icon.sizes.split(" ").includes("192x192")),
    );
    assert.ok(
      manifest.icons.some((icon) => icon.sizes.split(" ").includes("512x512")),
    );
    for (const icon of manifest.icons) {
      const response = await context.request.get(
        new URL(icon.src, new URL(manifestURL, base)).href,
      );
      assert.equal(response.status(), 200, `install icon loads: ${icon.src}`);
      assert.match(response.headers()["content-type"] || "", /^image\//);
    }
    const appleIcon = await page
      .locator('link[rel="apple-touch-icon"]')
      .first()
      .getAttribute("href");
    assert.ok(appleIcon, "iPhone has an Apple touch icon");
    const appleResponse = await context.request.get(
      new URL(appleIcon, base).href,
    );
    assert.equal(appleResponse.status(), 200);
    assert.match(appleResponse.headers()["content-type"] || "", /^image\//);
    assert.equal(
      await page
        .locator('meta[name="apple-mobile-web-app-capable"]')
        .getAttribute("content"),
      "yes",
    );
    assert.equal(
      await page.locator(".email-login-trigger").count(),
      0,
      "removed top-right account control stays absent",
    );
    assert.equal(
      await page.locator(".home-install-card").count(),
      0,
      "removed Home install banner stays absent",
    );
    assert.equal(
      await page.locator(".install-trigger:visible").count(),
      0,
      "mobile has no replacement install prompt",
    );
    console.log(
      "PASS standalone manifest, launch URL, 192/512 icons, iPhone metadata and clean mobile Home",
    );

    await page.evaluate(async () => {
      await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_, reject) =>
          setTimeout(
            () => reject(Error("Service worker did not become ready in10s")),
            10000,
          ),
        ),
      ]);
    });
    if (!(await page.evaluate(() => !!navigator.serviceWorker.controller)))
      await page.reload();
    await page.waitForFunction(
      () => !!navigator.serviceWorker.controller,
      null,
      { timeout: 10000 },
    );
    const rooms = [
      ["home", ".quote-text"],
      ["letters", ".heart-story-copy"],
      ["shayari", ".shayari-lines"],
      ["music", "#music audio"],
      ["self-letter", "#self-letter-body"],
    ];
    for (const [room, selector] of rooms) {
      await page.evaluate((room) => {
        location.hash = room;
      }, room);
      // The media element is intentionally hidden; its room heading confirms navigation.
      await page
        .locator(room === "music" ? "#music-title" : selector)
        .waitFor({ state: "visible" });
      await page.evaluate(() => document.fonts.ready);
    }
    await context.setOffline(true);
    await page.goto(base + "/#home");
    await unlock(page);
    await page
      .locator(".quote-text")
      .waitFor({ state: "visible", timeout: 10000 });
    for (const [room, selector] of rooms) {
      await page.evaluate((room) => {
        location.hash = room;
      }, room);
      await page
        .locator(room === "music" ? "#music-title" : selector)
        .waitFor({ state: "visible" });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `iPhone offline room fits: ${room}`,
      );
    }
    const draft = "Anushka, these are my words, saved while offline.";
    await page.locator("#self-letter-body").fill(draft);
    await page.evaluate(() => {
      location.hash = "home";
    });
    await page.locator(".quote-text").waitFor({ state: "visible" });
    await page.evaluate(() => {
      location.hash = "self-letter";
    });
    await page.locator("#self-letter-body").waitFor({ state: "visible" });
    assert.equal(
      await page.locator("#self-letter-body").inputValue(),
      draft,
      "fast room switching keeps the live draft",
    );
    await page.waitForFunction(
      (value) =>
        JSON.parse(localStorage.getItem("anushka-self-letter-v1"))?.text ===
        value,
      draft,
    );
    await page.reload();
    await page.locator("#self-letter-body").waitFor({ state: "visible" });
    assert.equal(
      await page.locator("#self-letter-body").inputValue(),
      draft,
      "draft survives offline reload",
    );
    const offlineTab = await context.newPage();
    offlineTab.on("pageerror", (error) => errors.push(error.message));
    await offlineTab.goto(base + "/#home");
    await offlineTab.locator("#gift-password").waitFor({ state: "visible" });
    await unlock(offlineTab);
    await offlineTab.locator(".quote-text").waitFor({ state: "visible" });
    await offlineTab.close();
    assert.deepEqual(errors, []);
    console.log(
      "PASS service-worker control, offline Home and welcome gate, all five rooms, and offline draft restoration",
    );
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

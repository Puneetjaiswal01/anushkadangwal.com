const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage(),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const base = process.env.SITE_URL || "http://127.0.0.1:4173";
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("heading", { name: /Before anything else/ }).waitFor();
  assert.equal(await page.locator(".letter-card").count(), 6);
  for (let i = 0; i < 6; i++) {
    const card = page.locator(".letter-card").nth(i);
    await card.click();
    await page.locator("dialog[open]").waitFor();
    assert.equal(await page.locator(".letter-paper>p").count(), 6);
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector("dialog").open);
    assert.equal(
      await card.evaluate((el) => document.activeElement === el),
      true,
    );
  }
  console.log(
    "PASS six letters, native dialog dismissal, and focus restoration",
  );
  await page
    .getByRole("button", { name: "A letter for you", exact: true })
    .click();
  assert.match(
    await page.locator(".letter-paper").innerText(),
    /I will love you the same/,
  );
  await page.getByRole("button", { name: "Close letter", exact: true }).click();
  const initial = await page.locator(".quote-text").innerText();
  await page
    .getByRole("button", { name: "Save this reminder", exact: true })
    .click();
  await page.reload();
  assert.equal(
    await page
      .getByRole("button", { name: "Unsave this reminder", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page.locator(".saved-reminders summary").click();
  assert.match(
    await page.locator(".saved-reminders").innerText(),
    new RegExp(initial.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
  );
  const unique = new Set([initial]);
  for (let i = 0; i < 15; i++) {
    await page.getByRole("button", { name: "Another little reminder" }).click();
    unique.add(await page.locator(".quote-text").innerText());
  }
  assert.equal(unique.size, 16);
  console.log(
    "PASS saved reminders survive reload, all 16 messages rotate without repeats",
  );
  await page.clock.install();
  await page
    .getByRole("button", { name: "Let’s take a breath", exact: true })
    .click();
  assert.equal(
    await page.locator(".breath-orb>span").innerText(),
    "Breathe in",
  );
  await page.clock.fastForward(4100);
  assert.equal(
    await page.locator(".breath-orb>span").innerText(),
    "Breathe out",
  );
  await page.getByRole("button", { name: "Stop for now", exact: true }).click();
  assert.equal(await page.locator(".breath-orb>span").innerText(), "Just be.");
  await page
    .getByRole("button", { name: "Let’s take a breath", exact: true })
    .click();
  await page.clock.fastForward(61000);
  assert.equal(
    await page.locator(".breath-orb>span").innerText(),
    "Welcome back.",
  );
  console.log("PASS breathing rhythm, early stop, and 60-second completion");
  assert.equal(await page.locator(".exam-card").count(), 5);
  assert.deepEqual(
    await page
      .locator(".exam-card time")
      .evaluateAll((els) => els.map((e) => e.dateTime)),
    ["2026-11-29", "2026-12-09", "2026-12-13", "2026-12-19", "2026-12-26"],
  );
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      "page overflow at " + width,
    );
    if (width <= 600) {
      await page
        .getByRole("button", { name: "Open menu", exact: true })
        .click();
      await page
        .locator("#main-nav")
        .getByRole("link", { name: "Letters for you", exact: true })
        .click();
      assert.equal(
        await page
          .getByRole("button", { name: "Open menu", exact: true })
          .getAttribute("aria-expanded"),
        "false",
      );
    }
    await page
      .getByRole("button", { name: "A letter for you", exact: true })
      .click();
    assert.equal(
      await page
        .locator("dialog")
        .evaluate((el) => el.scrollWidth > el.clientWidth),
      false,
      "dialog overflow at " + width,
    );
    await page
      .getByRole("button", { name: "Close letter", exact: true })
      .click();
    if (width === 1440 || width === 390) {
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({
        path: "/tmp/anushka-new-" + width + ".png",
        fullPage: true,
      });
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page
    .getByRole("button", { name: "Let’s take a breath", exact: true })
    .click();
  assert.equal(
    await page
      .locator(".breath-orb")
      .evaluate((el) => getComputedStyle(el).animationName),
    "none",
  );
  console.log(
    "PASS exam dates, mobile navigation, reduced motion, five viewport sizes, no overflow",
  );
  const blocked = await browser.newContext();
  await blocked.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw Error("storage disabled");
    };
    Storage.prototype.setItem = () => {
      throw Error("storage disabled");
    };
  });
  const noStore = await blocked.newPage();
  await noStore.goto(base);
  await noStore
    .getByRole("button", { name: "Save this reminder", exact: true })
    .click();
  await noStore.getByText("Your browser couldn’t store these.").waitFor();
  assert.deepEqual(errors, []);
  console.log("PASS storage unavailable fallback and no browser errors");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

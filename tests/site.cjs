const { unlock } = require("./unlock.cjs");
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage(),
      errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const base = (process.env.SITE_URL || "http://127.0.0.1:4173").replace(
      /\/$/,
      "",
    );
    const room = async (name, selector) => {
      await page.evaluate((name) => {
        location.hash = name;
      }, name);
      await page.locator(selector).first().waitFor({ state: "visible" });
    };
    await page.goto(base + "/#home");
    await unlock(page);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("h1").first().waitFor();
    await room("letters", ".letter-card");
    assert.equal(await page.locator(".letter-card").count(), 6);
    for (let index = 0; index < 6; index++) {
      const card = page.locator(".letter-card").nth(index);
      await card.click();
      await page.locator(".letter-dialog[open]").waitFor();
      assert.equal(await page.locator(".letter-paper>p").count(), 6);
      await page.keyboard.press("Escape");
      await page.waitForFunction(
        () => !document.querySelector(".letter-dialog").open,
      );
      assert.equal(
        await card.evaluate((element) => document.activeElement === element),
        true,
      );
    }
    await page.locator(".letter-card").first().click();
    assert.match(
      await page.locator(".letter-paper").innerText(),
      /I will love you the same/,
    );
    await page
      .getByRole("button", { name: "Close letter", exact: true })
      .click();
    console.log(
      "PASS six letters, native dialog dismissal, and focus restoration",
    );

    await room("home", ".quote-text");
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
    assert.ok(
      (await page.locator(".saved-reminders").innerText()).includes(initial),
    );
    const unique = new Set([initial]);
    for (let index = 0; index < 15; index++) {
      await page
        .getByRole("button", { name: "Another little reminder" })
        .click();
      unique.add(await page.locator(".quote-text").innerText());
    }
    assert.equal(unique.size, 16);
    console.log(
      "PASS saved reminders survive reload, all 16 messages rotate without repeats",
    );

    await page.getByRole("button", { name: /^Take a breath/ }).click();
    await page.locator(".breath-orb").waitFor({ state: "visible" });
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
    await page
      .getByRole("button", { name: "Stop for now", exact: true })
      .click();
    assert.equal(
      await page.locator(".breath-orb>span").innerText(),
      "Just be.",
    );
    await page
      .getByRole("button", { name: "Let’s take a breath", exact: true })
      .click();
    await page.clock.fastForward(61000);
    assert.equal(
      await page.locator(".breath-orb>span").innerText(),
      "Welcome back.",
    );
    await page.keyboard.press("Escape");
    console.log(
      "PASS breathing dialog, rhythm, early stop, and 60-second completion",
    );

    assert.equal(await page.locator(".exam-card").count(), 5);
    assert.deepEqual(
      await page
        .locator(".exam-card time")
        .evaluateAll((elements) => elements.map((element) => element.dateTime)),
      ["2026-11-29", "2026-12-09", "2026-12-13", "2026-12-19", "2026-12-26"],
    );
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + "/#home");
      await unlock(page);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        "Home overflow at " + width,
      );
      const nav = page.locator('nav a[href="#letters"]:visible').first();
      await nav.click();
      await page.locator(".letter-card").first().waitFor({ state: "visible" });
      assert.equal(new URL(page.url()).hash, "#letters");
      await page.locator(".letter-card").first().click();
      assert.equal(
        await page
          .locator(".letter-dialog")
          .evaluate((element) => element.scrollWidth > element.clientWidth),
        false,
        "dialog overflow at " + width,
      );
      await page
        .getByRole("button", { name: "Close letter", exact: true })
        .click();
      if (width === 1440 || width === 390) {
        await room("home", ".quote-text");
        await page.screenshot({
          path: "/tmp/anushka-new-" + width + ".png",
          fullPage: true,
        });
      }
    }
    await room("home", ".quote-text");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.getByRole("button", { name: /^Take a breath/ }).click();
    await page
      .getByRole("button", {
        name: /^(Let’s take a breath|Another quiet minute)$/,
      })
      .click();
    assert.equal(
      await page
        .locator(".breath-orb")
        .evaluate((element) => getComputedStyle(element).animationName),
      "none",
    );
    await page.keyboard.press("Escape");
    console.log(
      "PASS exam dates, desktop/mobile room navigation, reduced motion, five screen widths",
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
    noStore.on("pageerror", (error) => errors.push(error.message));
    await noStore.goto(base + "/#home");
    await unlock(noStore);
    await noStore
      .getByRole("button", { name: "Save this reminder", exact: true })
      .click();
    await noStore.getByText("Your browser couldn’t store these.").waitFor();
    assert.deepEqual(errors, []);
    console.log("PASS storage unavailable fallback and no browser errors");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

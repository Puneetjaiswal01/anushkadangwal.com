const { chromium, devices } = require("playwright");
const assert = require("node:assert/strict");
const { unlock } = require("./unlock.cjs");
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
    const context = await browser.newContext({ ...devices["iPhone 13"] });
    const page = await context.newPage(),
      errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base + "/#home");
    const password = page.locator("#gift-password");
    await password.waitFor({ state: "visible" });
    assert.equal(
      await page.locator(".app-shell:visible").count(),
      0,
      "the app is not visible behind the welcome screen",
    );
    assert.equal(await password.getAttribute("type"), "password");
    await password.fill("0206");
    await page.getByRole("button", { name: /Open my little world/ }).click();
    await page.getByRole("alert").waitFor({ state: "visible" });
    assert.equal(await password.getAttribute("aria-invalid"), "true");
    assert.equal(await page.locator(".app-shell:visible").count(), 0);
    await password.fill("0205");
    await page
      .getByRole("button", { name: "Show password", exact: true })
      .click();
    assert.equal(await password.getAttribute("type"), "text");
    assert.equal(
      await password.inputValue(),
      "0205",
      "the leading zero is preserved",
    );
    await page.getByRole("button", { name: /Open my little world/ }).click();
    await page.locator(".app-shell").waitFor({ state: "visible" });
    await page.reload();
    await page.locator(".app-shell").waitFor({ state: "visible" });
    assert.equal(
      await page.locator("#gift-password").count(),
      0,
      "unlock survives reload in the same tab",
    );
    console.log(
      "PASS welcome screen, wrong PIN, accessible error, shown password, correct0205 and tab reload",
    );

    await page.evaluate(() => {
      location.hash = "self-letter";
    });
    await page.locator("#self-letter-body").waitFor({ state: "visible" });
    const draft =
      "Dear Anushka, keep my own words when I close this little world.";
    await page.locator("#self-letter-body").fill(draft);
    await page.waitForFunction(
      (value) =>
        JSON.parse(localStorage.getItem("anushka-self-letter-v1"))?.text ===
        value,
      draft,
    );
    await page.evaluate(() => {
      location.hash = "home";
    });
    await page
      .getByRole("button", { name: "Play instrumental from Home", exact: true })
      .click();
    await page.waitForFunction(
      () => {
        const audio = document.querySelector("#music audio");
        return !audio.paused && audio.currentTime > 0;
      },
      null,
      { timeout: 10000 },
    );
    await page.evaluate(() => {
      window.__audioBeforeLock = document.querySelector("#music audio");
    });
    await page
      .getByRole("button", { name: "Close my little world", exact: true })
      .click();
    await page.locator("#gift-password").waitFor({ state: "visible" });
    assert.equal(await page.locator(".app-shell:visible").count(), 0);
    assert.equal(
      await page.evaluate(() => window.__audioBeforeLock.paused),
      true,
      "locking pauses local music",
    );
    await page.reload();
    await page.locator("#gift-password").waitFor({ state: "visible" });
    await unlock(page);
    await page.evaluate(() => {
      location.hash = "self-letter";
    });
    await page.locator("#self-letter-body").waitFor({ state: "visible" });
    assert.equal(
      await page.locator("#self-letter-body").inputValue(),
      draft,
      "locking does not delete her letter",
    );
    console.log(
      "PASS explicit close/relock, locked reload, and preserved self-authored draft",
    );

    for (const width of [320, 390, 768, 1440]) {
      const smallContext = await browser.newContext({
        viewport: { width, height: 900 },
      });
      const small = await smallContext.newPage();
      small.on("pageerror", (error) => errors.push(error.message));
      await small.goto(base);
      await small.locator("#gift-password").waitFor({ state: "visible" });
      await small.evaluate(() => document.fonts.ready);
      assert.equal(
        await small.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        "welcome screen fits at" + width,
      );
      assert.equal(
        await small
          .getByRole("button", { name: /Open my little world/ })
          .isVisible(),
        true,
      );
      if (width === 390 || width === 1440)
        await small.screenshot({
          path: `/tmp/anushka-welcome-${width}.png`,
          fullPage: true,
        });
      await smallContext.close();
    }
    console.log("PASS welcome layout at320/390/768/1440 and screenshots");

    const noSession = await browser.newContext();
    await noSession.addInitScript(() => {
      Object.defineProperty(window, "sessionStorage", {
        configurable: true,
        value: {
          getItem() {
            throw Error("session storage disabled");
          },
          setItem() {
            throw Error("session storage disabled");
          },
          removeItem() {
            throw Error("session storage disabled");
          },
        },
      });
    });
    const memoryPage = await noSession.newPage();
    memoryPage.on("pageerror", (error) => errors.push(error.message));
    await memoryPage.goto(base);
    await unlock(memoryPage);
    await memoryPage.evaluate(() => {
      location.hash = "shayari";
    });
    await memoryPage.locator(".shayari-lines").waitFor({ state: "visible" });
    await memoryPage.reload();
    await memoryPage.locator("#gift-password").waitFor({ state: "visible" });
    await unlock(memoryPage);
    await memoryPage.locator(".app-shell").waitFor({ state: "visible" });
    assert.deepEqual(errors, []);
    console.log(
      "PASS in-memory unlock when sessionStorage fails, safe locked reload, and no page errors",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const base = process.env.SITE_URL || "http://127.0.0.1:4173";

(async () => {
  const { innerChildLetter, originalShayari } =
    await import("../src/heart-content.js");
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base + "/#letters");
    const room = async (name, selector) => {
      await page.evaluate((name) => {
        location.hash = name;
      }, name);
      await page.locator(selector).first().waitFor({ state: "visible" });
    };
    await page.locator("#little-you-title").waitFor({ state: "visible" });
    assert.equal(await page.locator(".heart-story-copy > p").count(), 1);
    assert.equal(
      await page
        .getByRole("button", { name: "Previous part of the letter" })
        .isDisabled(),
      true,
    );
    for (let index = 1; index < innerChildLetter.paragraphs.length; index++) {
      const before = await page.locator(".heart-story-copy").innerText();
      await page.getByRole("button", { name: "Stay a little longer" }).click();
      assert.notEqual(
        await page.locator(".heart-story-copy").innerText(),
        before,
      );
      assert.match(
        await page.locator(".heart-book-controls > span").innerText(),
        new RegExp(String(index + 1).padStart(2, "0")),
      );
    }
    await page.getByRole("button", { name: "Read again" }).click();
    assert.equal(
      await page
        .getByRole("button", { name: "Previous part of the letter" })
        .isDisabled(),
      true,
    );
    await page.getByRole("button", { name: "Read the whole letter" }).click();
    assert.equal(
      await page.locator(".heart-story-copy > p").count(),
      innerChildLetter.paragraphs.length,
    );
    await page.getByRole("button", { name: "One page at a time" }).click();
    assert.equal(await page.locator(".heart-story-copy > p").count(), 1);
    const feelingChoices = page
      .getByRole("group", { name: "Choose what you need to hear" })
      .getByRole("button");
    const feelingResponses = new Set();
    for (let index = 0; index < (await feelingChoices.count()); index++) {
      await feelingChoices.nth(index).click();
      assert.equal(
        await feelingChoices.nth(index).getAttribute("aria-pressed"),
        "true",
      );
      assert.equal(
        await page
          .locator('.heart-feeling-options button[aria-pressed="true"]')
          .count(),
        1,
      );
      feelingResponses.add(
        await page.locator(".heart-feeling-response").innerText(),
      );
    }
    assert.equal(feelingResponses.size, await feelingChoices.count());
    console.log(
      "PASS all inner-child letter pages, whole-letter toggle, and distinct feeling choices",
    );

    await room("shayari", ".shayari-lines");
    assert.equal(
      await page.locator(".shayari-lines").getAttribute("lang"),
      "hi",
    );
    const hindi = await page.locator(".shayari-lines").innerText();
    assert.match(hindi, /[\u0900-\u097f]/);
    await page.getByRole("button", { name: "Roman", exact: true }).click();
    assert.equal(
      await page.locator(".shayari-lines").getAttribute("lang"),
      "hi-Latn",
    );
    assert.notEqual(await page.locator(".shayari-lines").innerText(), hindi);
    const poems = new Set();
    for (let index = 0; index < originalShayari.length; index++) {
      poems.add(await page.locator(".shayari-lines").innerText());
      await page.locator(".shayari-meaning summary").click();
      assert.equal(
        await page
          .locator(".shayari-meaning")
          .evaluate((element) => element.open),
        true,
      );
      assert.ok(
        (await page.locator(".shayari-meaning > p").innerText()).length > 30,
      );
      await page
        .getByRole("button", { name: "Next shayari", exact: true })
        .click();
      assert.equal(
        await page
          .locator(".shayari-meaning")
          .evaluate((element) => element.open),
        false,
      );
    }
    assert.equal(poems.size, originalShayari.length);
    await page.getByRole("button", { name: "हिन्दी", exact: true }).click();
    assert.equal(
      await page.locator(".shayari-lines").getAttribute("lang"),
      "hi",
    );
    const beforeLove = await page
      .locator(".heart-quote-ribbon blockquote")
      .innerText();
    await page.getByRole("button", { name: "One more thing I mean" }).click();
    assert.notEqual(
      await page.locator(".heart-quote-ribbon blockquote").innerText(),
      beforeLove,
    );
    console.log(
      "PASS Hindi/Roman scripts, every shayari, resettable English meanings, and love notes",
    );

    await room("music", "#music-title");
    assert.deepEqual(
      await page.locator("#music audio").evaluate((element) => ({
        paused: element.paused,
        autoplay: element.autoplay,
        preload: element.preload,
      })),
      { paused: true, autoplay: false, preload: "none" },
    );
    await page
      .getByRole("button", { name: "Play little instrumental", exact: true })
      .click();
    await page.waitForFunction(
      () => {
        const audio = document.querySelector("#music audio");
        return (
          !audio.paused &&
          !audio.error &&
          audio.currentTime > 0 &&
          Number.isFinite(audio.duration) &&
          audio.duration > 1
        );
      },
      null,
      { timeout: 10000 },
    );
    await page
      .getByRole("button", { name: "Pause little instrumental", exact: true })
      .waitFor();
    await page.locator("#music-volume").focus();
    await page.locator("#music-volume").press("Home");
    for (let step = 0; step < 4; step++)
      await page.locator("#music-volume").press("ArrowRight");
    assert.ok(
      Math.abs(
        (await page
          .locator("#music audio")
          .evaluate((element) => element.volume)) - 0.2,
      ) < 0.001,
    );
    await page
      .getByRole("button", { name: "Pause little instrumental", exact: true })
      .click();
    assert.equal(
      await page.locator("#music audio").evaluate((element) => element.paused),
      true,
    );
    await page
      .getByRole("button", { name: "Play little instrumental", exact: true })
      .waitFor();
    const songs = await page.locator(".music-song a").evaluateAll((links) =>
      links.map((link) => ({
        href: link.href,
        target: link.target,
        rel: link.rel,
      })),
    );
    assert.equal(songs.length, 4);
    for (const song of songs) {
      assert.match(
        song.href,
        /^https:\/\/www\.youtube\.com\/results\?search_query=/,
      );
      assert.equal(song.target, "_blank");
      assert.match(song.rel, /noopener/);
    }
    console.log(
      "PASS no autoplay, actual MP3 playback and pause, volume control, and safe song links",
    );

    await room("home", ".quote-text");
    const spotify = page.locator(".home-song iframe");
    assert.match(
      await spotify.getAttribute("title"),
      /Yellow Hearts.*Spotify player/,
    );
    const spotifyURL = new URL(await spotify.getAttribute("src"));
    assert.equal(spotifyURL.origin, "https://open.spotify.com");
    assert.equal(spotifyURL.pathname, "/embed/track/2W4yABdLc4Jnds67Poi5Nl");
    assert.notEqual(spotifyURL.searchParams.get("autoplay"), "1");
    assert.notEqual(spotifyURL.searchParams.get("autoplay"), "true");
    assert.equal(await spotify.getAttribute("autoplay"), null);
    const fallback = await page.locator(".home-song a").evaluateAll((links) =>
      links.map((link) => ({
        href: link.href,
        target: link.target,
        rel: link.rel,
      })),
    );
    assert.equal(fallback.length, 2);
    for (const link of fallback) {
      assert.match(
        link.href,
        /^https:\/\/open\.spotify\.com\/(track|search)\//,
      );
      assert.equal(link.target, "_blank");
      assert.match(link.rel, /noopener/);
    }
    // Provider streaming is external; these assertions verify configuration, not Spotify playback.
    await page
      .getByRole("button", { name: "Play instrumental from Home", exact: true })
      .click();
    await page.waitForFunction(() => {
      const audio = document.querySelector("#music audio");
      return !audio.paused && audio.currentTime > 0;
    });
    await room("music", "#music-title");
    assert.equal(
      await page.locator("#music audio").evaluate((audio) => audio.paused),
      false,
      "original music keeps playing between rooms",
    );
    await room("home", ".quote-text");
    await page
      .getByRole("button", {
        name: "Pause instrumental from Home",
        exact: true,
      })
      .click();
    assert.equal(
      await page.locator("#music audio").evaluate((audio) => audio.paused),
      true,
    );
    console.log(
      "PASS Spotify embed configuration/fallbacks, original music from Home, and playback across rooms",
    );

    await room("self-letter", "#self-letter-body");
    const draft =
      "Dear Anushka, these are my own words.\nI am allowed to be more than one exam. ♡";
    await page.locator("#self-letter-body").fill(draft);
    await page.waitForFunction(
      (value) =>
        JSON.parse(localStorage.getItem("anushka-self-letter-v1"))?.text ===
        value,
      draft,
    );
    await page.reload();
    assert.equal(await page.locator("#self-letter-body").inputValue(), draft);
    const downloadEvent = page.waitForEvent("download");
    await page.getByRole("button", { name: "Keep a copy" }).click();
    const download = await downloadEvent;
    assert.match(
      download.suggestedFilename(),
      /^Anushka-a-letter-to-myself-.*\.txt$/,
    );
    assert.match(
      await fs.readFile(await download.path(), "utf8"),
      /these are my own words/,
    );
    page.once("dialog", (dialog) => dialog.dismiss());
    await page
      .getByRole("button", { name: "Delete this letter", exact: true })
      .click();
    assert.equal(await page.locator("#self-letter-body").inputValue(), draft);
    page.once("dialog", (dialog) => dialog.accept());
    await page
      .getByRole("button", { name: "Delete this letter", exact: true })
      .click();
    assert.equal(await page.locator("#self-letter-body").inputValue(), "");
    await page.reload();
    assert.equal(await page.locator("#self-letter-body").inputValue(), "");
    console.log(
      "PASS self-authored letter autosave/restore, exported words, cancel/confirmed deletion",
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
    const blockedPage = await blocked.newPage();
    blockedPage.on("pageerror", (error) => errors.push(error.message));
    await blockedPage.goto(base + "/#self-letter");
    await blockedPage
      .locator("#self-letter-body")
      .fill("Words still here when the browser cannot save.");
    await blockedPage.locator(".self-letter-save-status.error").waitFor();
    assert.match(
      await blockedPage.locator("#self-letter-body").inputValue(),
      /Words still here/,
    );
    assert.equal(
      await blockedPage
        .getByRole("button", { name: "Keep a copy" })
        .isEnabled(),
      true,
    );
    await blocked.close();
    console.log(
      "PASS unavailable browser storage preserves the live draft and download option",
    );

    const unconfigured = await browser.newContext();
    let authRequests = 0;
    await unconfigured.route("**/api/auth", (route) => {
      authRequests++;
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ authenticated: false, configured: false }),
      });
    });
    const setupPage = await unconfigured.newPage();
    await setupPage.goto(base + "/#home");
    await setupPage
      .getByRole("button", { name: "Email sign-in", exact: true })
      .click();
    await setupPage
      .locator(".email-login-dialog[open] .email-login-setup")
      .waitFor();
    assert.match(
      await setupPage.locator(".email-login-setup").innerText(),
      /No code has been sent/,
    );
    assert.equal(
      await setupPage
        .locator('.email-login-dialog[open] input[type="email"]')
        .count(),
      0,
    );
    assert.ok(authRequests >= 1);
    await setupPage
      .getByRole("button", { name: "Close email sign-in", exact: true })
      .click();
    await unconfigured.close();
    console.log(
      "PASS unconfigured email service is shown honestly without offering a pretend code",
    );

    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      await page.goto(base + "/#home");
      await page.evaluate(() => document.fonts.ready);
      const rooms = [
        ["home", ".quote-text"],
        ["letters", "#little-you"],
        ["shayari", "#shayari"],
        ["music", "#music-title"],
        ["self-letter", "#self-letter"],
      ];
      for (const [name, selector] of rooms) {
        await room(name, selector);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
          `${name} page overflows at ${width}`,
        );
        assert.equal(
          await page.locator(selector).isVisible(),
          true,
          `${name} room is visible at ${width}`,
        );
      }
      if (width === 390 || width === 1440) {
        await room("home", ".quote-text");
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.screenshot({
          path: `/tmp/anushka-heart-${width}.png`,
          fullPage: true,
        });
      }
    }
    assert.deepEqual(errors, []);
    console.log(
      "PASS integrated layout at 320/390/768/1440, screenshots, and no browser errors",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

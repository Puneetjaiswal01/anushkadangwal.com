const { chromium, devices } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const base = (process.env.SITE_URL || "http://127.0.0.1:4173").replace(
  /\/$/,
  "",
);

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const errors = [],
    writes = [];
  async function context(options = {}) {
    const ctx = await browser.newContext(options);
    ctx.on("page", (page) => {
      page.setDefaultTimeout(12000);
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("request", (request) => {
        if (
          !["GET", "HEAD"].includes(request.method()) &&
          new URL(request.url()).origin === new URL(base).origin
        )
          writes.push(request.method() + " " + request.url());
      });
    });
    return ctx;
  }
  async function unlock(page) {
    await page.waitForFunction(
      () =>
        document.querySelector("#gift-password") ||
        document.querySelector(".world-shell"),
    );
    if (await page.locator("#gift-password").isVisible()) {
      await page.locator("#gift-password").fill("0205");
      await page
        .getByRole("button", { name: "Open my little world", exact: true })
        .click();
    }
    await page.locator(".world-shell").waitFor({ state: "visible" });
  }
  async function visit(ctx, room = "home") {
    const page = await ctx.newPage();
    await page.goto(`${base}/#${room}`, { waitUntil: "domcontentloaded" });
    await unlock(page);
    await show(page, room);
    return page;
  }
  async function show(page, room) {
    await page.evaluate((room) => {
      location.hash = room;
    }, room);
    await page
      .locator(`.world-room[data-room="${room}"]`)
      .waitFor({ state: "visible" });
    assert.equal(
      await page.locator(".world-room:visible").count(),
      1,
      "only the selected room is visible",
    );
  }
  async function storageEquals(page, key, value, json = false) {
    await page.waitForFunction(
      ({ key, value, json }) => {
        const raw = localStorage.getItem(key);
        return (json ? JSON.parse(raw)?.text : raw) === value;
      },
      { key, value, json },
      { polling: 100 },
    );
  }
  async function mockSharing(ctx) {
    await ctx.addInitScript(() => {
      if (window.top !== window) return;
      window.__copied = null;
      window.__clipboardFails = false;
      window.__shared = null;
      window.__shareCancelled = false;
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async (text) => {
            if (window.__clipboardFails)
              throw new DOMException("Unavailable", "NotAllowedError");
            window.__copied = text;
          },
        },
      });
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: async (payload) => {
          if (window.__shareCancelled)
            throw new DOMException("Cancelled", "AbortError");
          window.__shared = payload;
        },
      });
    });
  }
  try {
    // Enter through the real browser welcome form, including its failure path.
    const entry = await context({ ...devices["iPhone 13"] });
    const gate = await entry.newPage();
    await gate.goto(base, { waitUntil: "domcontentloaded" });
    await gate.locator("#gift-password").waitFor({ state: "visible" });
    await gate.locator("#gift-password").fill("1111");
    await gate
      .getByRole("button", { name: "Open my little world", exact: true })
      .click();
    await gate.getByRole("alert").waitFor({ state: "visible" });
    assert.equal(
      await gate.locator("#gift-password").getAttribute("aria-invalid"),
      "true",
    );
    assert.equal(await gate.locator(".world-shell:visible").count(), 0);
    await gate.locator("#gift-password").fill("0205");
    await gate
      .getByRole("button", { name: "Show password", exact: true })
      .click();
    assert.equal(await gate.locator("#gift-password").inputValue(), "0205");
    assert.equal(
      await gate.locator("#gift-password").getAttribute("type"),
      "text",
    );
    await unlock(gate);
    await gate.reload({ waitUntil: "domcontentloaded" });
    await gate.locator(".world-shell").waitFor({ state: "visible" });
    assert.equal(await gate.locator("#gift-password").count(), 0);
    await entry.close();
    console.log(
      "PASS welcome wrong-code error, shown0205 leading zero, real unlock and same-tab reload",
    );

    const daily = await context({ viewport: { width: 1440, height: 1000 } });
    await mockSharing(daily);
    const home = await visit(daily);
    const firstNote = await home.locator(".reminder-text").innerText();
    await home
      .getByRole("button", { name: "Save this little note", exact: true })
      .click();
    const notes = new Set([firstNote]);
    for (let i = 0; i < 19; i++) {
      await home.getByRole("button", { name: "One more little note" }).click();
      notes.add(await home.locator(".reminder-text").innerText());
    }
    assert.equal(
      notes.size,
      20,
      "all twenty original notes appear without repeating in one cycle",
    );
    const moodButtons = home
      .getByRole("group", { name: "What would help today?" })
      .getByRole("button");
    assert.equal(await moodButtons.count(), 3);
    const moodReplies = new Set();
    for (let i = 0; i < 3; i++) {
      await moodButtons.nth(i).click();
      assert.equal(
        await moodButtons.nth(i).getAttribute("aria-pressed"),
        "true",
      );
      assert.equal(
        await home.locator('.mood-options [aria-pressed="true"]').count(),
        1,
      );
      moodReplies.add(await home.locator(".mood-answer").innerText());
    }
    assert.equal(moodReplies.size, 3);
    await moodButtons.nth(2).click();
    assert.equal(await home.locator(".mood-answer").count(), 0);
    await show(home, "us");
    assert.equal(await home.locator(".promise-tile").count(), 6);
    const promiseTitle = await home
      .locator(".promise-tile")
      .first()
      .locator("h3")
      .innerText();
    await home.locator(".promise-tile").first().locator(".save-button").click();
    assert.equal(
      await home
        .locator(".promise-tile")
        .first()
        .locator(".save-button")
        .getAttribute("aria-pressed"),
      "true",
    );
    const conversations = new Set();
    for (
      let i = 0;
      i < (await home.locator(".conversation-tabs button").count());
      i++
    ) {
      await home.locator(".conversation-tabs button").nth(i).click();
      conversations.add(await home.locator(".conversation-copy").innerText());
    }
    assert.equal(conversations.size, 4);
    const promiseReply =
      "For us, I hope we keep making room for both our voices.";
    await home.locator("#promise-reply").fill(promiseReply);
    await storageEquals(home, "anushka-promise-reply-v2", promiseReply);
    await home
      .getByRole("button", { name: "Copy my words", exact: true })
      .click();
    assert.equal(await home.evaluate(() => window.__copied), promiseReply);
    await show(home, "you");
    assert.equal(await home.locator(".keepsake-grid article").count(), 2);
    assert.ok(
      (await home.locator(".keepsake-grid").innerText()).includes(firstNote),
    );
    assert.ok(
      (await home.locator(".keepsake-grid").innerText()).includes(promiseTitle),
    );
    await home.reload({ waitUntil: "domcontentloaded" });
    await unlock(home);
    assert.equal(await home.locator(".keepsake-grid article").count(), 2);
    await home
      .getByRole("button", {
        name: "Remove saved note: " + firstNote,
        exact: true,
      })
      .click();
    assert.equal(await home.locator(".keepsake-grid article").count(), 1);
    await show(home, "us");
    assert.equal(
      await home.locator("#promise-reply").inputValue(),
      promiseReply,
    );
    console.log(
      "PASS twenty reminders, three moods, six promises, saved collection, conversation notes and own reply persistence",
    );

    await show(home, "letters");
    assert.equal(await home.locator(".letter-card").count(), 8);
    const letterTitles = new Set();
    for (let i = 0; i < 8; i++) {
      const card = home.locator(".letter-card").nth(i);
      const title = await card.locator("h2").innerText();
      await card.click();
      await home.locator(".letter-dialog[open]").waitFor();
      assert.equal(await home.locator("#letter-title").innerText(), title);
      assert.ok((await home.locator(".reading-paper>p").count()) >= 5);
      letterTitles.add(title);
      await home.keyboard.press("Escape");
      await home.waitForFunction(
        () => !document.querySelector(".letter-dialog").open,
      );
      assert.equal(
        await card.evaluate((element) => document.activeElement === element),
        true,
        "letter returns focus to its opener",
      );
    }
    assert.equal(letterTitles.size, 8);
    await home.getByRole("button", { name: /Shayari, dil se/ }).click();
    await home.locator(".poem-lines").waitFor({ state: "visible" });
    assert.equal(await home.locator(".poem-lines").getAttribute("lang"), "hi");
    assert.match(
      await home.locator(".poem-lines").innerText(),
      /[\u0900-\u097f]/,
    );
    await home.getByRole("button", { name: "Roman", exact: true }).click();
    assert.equal(
      await home.locator(".poem-lines").getAttribute("lang"),
      "hi-Latn",
    );
    const poems = new Set();
    for (let i = 0; i < 6; i++) {
      poems.add(await home.locator(".poem-lines").innerText());
      await home.locator(".poem-meaning summary").click();
      assert.equal(
        await home.locator(".poem-meaning").evaluate((element) => element.open),
        true,
      );
      assert.ok(
        (await home.locator(".poem-meaning p").innerText()).length > 30,
      );
      await home
        .getByRole("button", { name: "Next shayari", exact: true })
        .click();
      assert.equal(
        await home.locator(".poem-meaning").evaluate((element) => element.open),
        false,
      );
    }
    assert.equal(poems.size, 6);
    const firstPoem = await home.locator(".poem-lines").innerText();
    await home
      .getByRole("button", { name: "Previous shayari", exact: true })
      .click();
    assert.notEqual(await home.locator(".poem-lines").innerText(), firstPoem);
    await home
      .getByRole("button", { name: "Next shayari", exact: true })
      .click();
    assert.equal(await home.locator(".poem-lines").innerText(), firstPoem);
    await home.getByRole("button", { name: "हिन्दी", exact: true }).click();
    assert.equal(await home.locator(".poem-lines").getAttribute("lang"), "hi");
    console.log(
      "PASS eight readable letters, Escape/focus restoration, six Hindi/Roman shayari and English meanings",
    );

    await show(home, "home");
    await home.locator(".date-card summary").click();
    const choices = home
      .getByRole("group", { name: "Your answer to the date invitation" })
      .getByRole("button");
    assert.equal(await choices.count(), 3);
    const replies = new Set();
    for (let i = 0; i < 3; i++) {
      await choices.nth(i).click();
      assert.equal(await choices.nth(i).getAttribute("aria-pressed"), "true");
      assert.equal(
        await home.locator('.date-options [aria-pressed="true"]').count(),
        1,
      );
      replies.add(await home.locator("#date-reply").inputValue());
    }
    assert.equal(replies.size, 3);
    await choices.first().click();
    const dateReply =
      "Yes, I’d love that. Let’s choose a show and a place together.";
    await home.locator("#date-reply").fill(dateReply);
    await choices.nth(1).click();
    await choices.first().click();
    assert.equal(await home.locator("#date-reply").inputValue(), dateReply);
    await home
      .getByRole("button", { name: "Copy my reply", exact: true })
      .click();
    assert.equal(await home.evaluate(() => window.__copied), dateReply);
    assert.match(await home.locator(".date-status").innerText(), /Copied/);
    await home.evaluate(() => {
      window.__clipboardFails = true;
    });
    await home
      .getByRole("button", { name: "Copy my reply", exact: true })
      .click();
    assert.deepEqual(
      await home
        .locator("#date-reply")
        .evaluate((element) => [element.selectionStart, element.selectionEnd]),
      [0, dateReply.length],
    );
    await home
      .getByRole("button", { name: "Share my reply", exact: true })
      .click();
    assert.equal(await home.evaluate(() => window.__shared.text), dateReply);
    await home.evaluate(() => {
      window.__shareCancelled = true;
    });
    await home
      .getByRole("button", { name: "Share my reply", exact: true })
      .click();
    assert.equal(await home.locator("#date-reply").inputValue(), dateReply);
    assert.match(await home.locator(".date-status").innerText(), /still here/);
    assert.doesNotMatch(
      await home.locator(".date-status").innerText(),
      /sent|confirmed|received/,
    );
    console.log(
      "PASS three genuine invitation choices, editable retained drafts, clipboard fallback and optional native sharing",
    );
    await daily.close();

    // Isolate the accelerated minute from all storage, media and service-worker checks.
    const calm = await context({ viewport: { width: 390, height: 844 } });
    const quiet = await visit(calm, "quiet");
    await quiet.clock.install();
    await quiet
      .getByRole("button", { name: "Take a little breath", exact: true })
      .click();
    assert.equal(
      await quiet.locator(".quiet-breath-orb>span").innerText(),
      "Breathe in",
    );
    await quiet.clock.fastForward(4100);
    assert.equal(
      await quiet.locator(".quiet-breath-orb>span").innerText(),
      "Breathe out",
    );
    await quiet
      .getByRole("button", { name: "Stop for now", exact: true })
      .click();
    assert.equal(
      await quiet.locator(".quiet-breath-orb>span").innerText(),
      "Just be.",
    );
    await quiet
      .getByRole("button", { name: "Take a little breath", exact: true })
      .click();
    await quiet.clock.fastForward(61000);
    assert.equal(
      await quiet.locator(".quiet-breath-orb>span").innerText(),
      "Welcome back.",
    );
    await quiet.emulateMedia({ reducedMotion: "reduce" });
    await quiet
      .getByRole("button", { name: "Another quiet minute", exact: true })
      .click();
    assert.equal(
      await quiet
        .locator(".quiet-breath-orb")
        .evaluate((element) => getComputedStyle(element).animationName),
      "none",
    );
    await quiet
      .getByRole("button", { name: "Stop for now", exact: true })
      .click();
    const kindness = quiet
      .getByRole("group", { name: "Choose a little kindness" })
      .getByRole("button");
    const kindnessReplies = new Set();
    for (let i = 0; i < (await kindness.count()); i++) {
      await kindness.nth(i).click();
      kindnessReplies.add(
        await quiet.locator(".quiet-kindness-message").innerText(),
      );
    }
    assert.equal(kindnessReplies.size, 4);
    assert.deepEqual(
      await quiet
        .locator(".quiet-date-button time")
        .evaluateAll((elements) => elements.map((element) => element.dateTime)),
      ["2026-11-29", "2026-12-09", "2026-12-13", "2026-12-19", "2026-12-26"],
    );
    const dayNotes = new Set();
    for (let i = 0; i < 5; i++) {
      const date = quiet.locator(".quiet-date-button").nth(i);
      await date.click();
      assert.equal(await date.getAttribute("aria-expanded"), "true");
      assert.equal(await quiet.locator("#quiet-day-note").isVisible(), true);
      dayNotes.add(await quiet.locator("#quiet-day-note").innerText());
      await date.click();
      assert.equal(await quiet.locator("#quiet-day-note").isVisible(), false);
    }
    assert.equal(dayNotes.size, 5);
    await calm.close();
    console.log(
      "PASS four-in/six-out breathing, stop/completion, reduced motion, kindness choices and all five exam dates",
    );

    const writing = await context({ viewport: { width: 390, height: 844 } });
    const legacyText =
      "Earlier Anushka words — a dummy migration fixture, not a generated letter.";
    await writing.addInitScript(
      ({ text, origin }) => {
        if (window.top !== window || location.origin !== origin) return;
        if (!localStorage.getItem("app-test-seeded")) {
          localStorage.setItem(
            "anushka-self-letter-v1",
            JSON.stringify({
              version: 1,
              text,
              savedAt: "2026-11-17T00:00:00.000Z",
            }),
          );
          localStorage.setItem("app-test-unrelated", "KEEP");
          localStorage.setItem("app-test-seeded", "1");
        }
      },
      { text: legacyText, origin: new URL(base).origin },
    );
    const own = await visit(writing, "you");
    assert.equal(
      await own.locator("#self-letter-body").inputValue(),
      legacyText,
    );
    await own
      .getByRole("button", { name: "A little promise", exact: true })
      .click();
    assert.ok(
      (await own.locator("#self-letter-body").inputValue()).startsWith(
        legacyText,
      ),
    );
    const ownText = "Dear me, these are words I chose myself. ♡";
    await own.locator("#self-letter-body").fill(ownText);
    await storageEquals(own, "anushka-self-letter-v1", ownText, true);
    await own.reload({ waitUntil: "domcontentloaded" });
    await unlock(own);
    assert.equal(await own.locator("#self-letter-body").inputValue(), ownText);
    let downloaded = own.waitForEvent("download");
    await own
      .getByRole("button", { name: "Keep a text copy", exact: true })
      .click();
    assert.ok(
      (await fs.readFile(await (await downloaded).path(), "utf8")).includes(
        ownText,
      ),
    );
    own.once("dialog", (dialog) => dialog.dismiss());
    await own
      .getByRole("button", { name: "Delete this letter", exact: true })
      .click();
    assert.equal(await own.locator("#self-letter-body").inputValue(), ownText);
    await own.evaluate(() => {
      window.__oldRemove = Storage.prototype.removeItem;
      Storage.prototype.removeItem = function (key) {
        if (key === "anushka-self-letter-v1")
          throw Error("test deletion blocked");
        return window.__oldRemove.call(this, key);
      };
    });
    own.once("dialog", (dialog) => dialog.accept());
    await own
      .getByRole("button", { name: "Delete this letter", exact: true })
      .click();
    assert.equal(await own.locator("#self-letter-body").inputValue(), ownText);
    await own
      .getByText("This browser could not remove the saved copy.", {
        exact: false,
      })
      .waitFor();
    await own.evaluate(() => {
      Storage.prototype.removeItem = window.__oldRemove;
    });
    own.once("dialog", (dialog) => dialog.accept());
    await own
      .getByRole("button", { name: "Delete this letter", exact: true })
      .click();
    assert.equal(await own.locator("#self-letter-body").inputValue(), "");
    assert.equal(
      await own.evaluate(() => localStorage.getItem("anushka-self-letter-v1")),
      null,
    );
    await own.locator("#little-wish-input").fill("A long walk together");
    await own
      .getByRole("button", { name: "Add this little wish", exact: true })
      .click();
    await own
      .getByRole("button", { name: "A slow Sunday morning", exact: false })
      .click();
    assert.equal(await own.locator(".your-space-wish-list li").count(), 2);
    await own
      .getByRole("button", {
        name: "Edit wish: A long walk together",
        exact: true,
      })
      .click();
    await own.locator("#little-wish-edit").fill("A little trip together");
    await own.getByRole("button", { name: "Cancel edit", exact: true }).click();
    assert.ok(
      (await own.locator(".your-space-wish-list").innerText()).includes(
        "A long walk together",
      ),
    );
    await own
      .getByRole("button", {
        name: "Edit wish: A long walk together",
        exact: true,
      })
      .click();
    await own.locator("#little-wish-edit").fill("A little trip together");
    await own.getByRole("button", { name: "Save wish", exact: true }).click();
    await own.reload({ waitUntil: "domcontentloaded" });
    await unlock(own);
    assert.ok(
      (await own.locator(".your-space-wish-list").innerText()).includes(
        "A little trip together",
      ),
    );
    await own
      .getByRole("button", {
        name: "Remove wish: A slow Sunday morning",
        exact: true,
      })
      .click();
    assert.equal(await own.locator(".your-space-wish-list li").count(), 1);
    downloaded = own.waitForEvent("download");
    await own
      .getByRole("button", { name: "Keep a copy of this list", exact: true })
      .click();
    assert.ok(
      (await fs.readFile(await (await downloaded).path(), "utf8")).includes(
        "A little trip together",
      ),
    );
    assert.equal(
      await own.evaluate(() => localStorage.getItem("app-test-unrelated")),
      "KEEP",
    );
    console.log(
      "PASS legacy writing, optional starters, autosave/restore/export, safe deletion, editable wishes and independent storage",
    );

    await show(own, "home");
    assert.deepEqual(
      await own.locator("audio").evaluate((audio) => ({
        paused: audio.paused,
        autoplay: audio.autoplay,
        preload: audio.preload,
      })),
      { paused: true, autoplay: false, preload: "none" },
    );
    const spotifyURL = new URL(
      await own.locator(".spotify-player").getAttribute("src"),
    );
    assert.equal(spotifyURL.pathname, "/embed/track/2W4yABdLc4Jnds67Poi5Nl");
    assert.ok(!["true", "1"].includes(spotifyURL.searchParams.get("autoplay")));
    await own
      .getByRole("button", {
        name: "Play the little instrumental",
        exact: true,
      })
      .click();
    await own.waitForFunction(
      () => {
        const audio = document.querySelector("audio");
        return (
          !audio.paused &&
          audio.currentTime > 0 &&
          audio.duration > 1 &&
          !audio.error
        );
      },
      null,
      { timeout: 10000 },
    );
    await show(own, "us");
    assert.equal(
      await own.locator("audio").evaluate((audio) => audio.paused),
      false,
      "music continues across rooms",
    );
    await show(own, "you");
    const lockDraft = "Keep my words when I close my little world.";
    await own.locator("#self-letter-body").fill(lockDraft);
    await own.locator(".close-world-button").click();
    await own.locator("#gift-password").waitFor({ state: "visible" });
    assert.equal(
      await own.locator("audio").evaluate((audio) => audio.paused),
      true,
      "locking stops local music",
    );
    assert.equal(await own.locator(".world-shell:visible").count(), 0);
    await own.reload({ waitUntil: "domcontentloaded" });
    await own.locator("#gift-password").waitFor({ state: "visible" });
    await unlock(own);
    await show(own, "you");
    assert.equal(
      await own.locator("#self-letter-body").inputValue(),
      lockDraft,
    );
    await writing.close();
    console.log(
      "PASS no autoplay, real originalMP3, external song configuration, cross-room playback and relock preserving words",
    );

    const blocked = await context();
    await blocked.addInitScript(() => {
      if (window.top !== window) return;
      Storage.prototype.getItem = () => {
        throw Error("test storage disabled");
      };
      Storage.prototype.setItem = () => {
        throw Error("test storage disabled");
      };
      Storage.prototype.removeItem = () => {
        throw Error("test storage disabled");
      };
    });
    const memory = await visit(blocked);
    await memory.reload({ waitUntil: "domcontentloaded" });
    await memory.locator("#gift-password").waitFor({ state: "visible" });
    await unlock(memory);
    await memory
      .getByRole("button", { name: "Save this little note", exact: true })
      .click();
    await memory
      .getByText("Kept for this visit. This browser couldn’t save it.", {
        exact: true,
      })
      .waitFor();
    await show(memory, "you");
    await memory
      .locator("#self-letter-body")
      .fill("Live words when browser saving fails.");
    await memory.waitForFunction(
      () =>
        document
          .querySelector("#your-letter-status")
          .textContent.includes("unavailable"),
      null,
      { polling: 100 },
    );
    assert.match(
      await memory.locator("#self-letter-body").inputValue(),
      /Live words/,
    );
    await memory
      .locator("#little-wish-input")
      .fill("A lovely thing for this visit");
    await memory
      .getByRole("button", { name: "Add this little wish", exact: true })
      .click();
    assert.equal(await memory.locator(".your-space-wish-list li").count(), 1);
    assert.match(
      await memory
        .locator(".your-space-wishes-card .your-space-status")
        .innerText(),
      /saving is unavailable/,
    );
    assert.equal(
      await memory
        .getByRole("button", { name: "Keep a text copy", exact: true })
        .isEnabled(),
      true,
    );
    await blocked.close();
    console.log(
      "PASS unavailable storage keeps live notes/wishes and export, with honest memory-only welcome entry",
    );

    const mobile = await context({
      ...devices["iPhone 13"],
      serviceWorkers: "allow",
    });
    const offline = await visit(mobile);
    const manifestURL = await offline
      .locator('link[rel="manifest"]')
      .getAttribute("href");
    const manifest = await (
      await mobile.request.get(new URL(manifestURL, base).href)
    ).json();
    assert.equal(manifest.display, "standalone");
    assert.ok(manifest.name && manifest.start_url);
    for (const size of ["192x192", "512x512"])
      assert.ok(
        manifest.icons.some((icon) => icon.sizes.split(" ").includes(size)),
      );
    for (const icon of manifest.icons) {
      const response = await mobile.request.get(new URL(icon.src, base).href);
      assert.equal(response.status(), 200);
      assert.match(response.headers()["content-type"] || "", /^image\//);
    }
    const appleIcon = await offline
      .locator('link[rel="apple-touch-icon"]')
      .getAttribute("href");
    assert.equal(
      (await mobile.request.get(new URL(appleIcon, base).href)).status(),
      200,
    );
    assert.equal(
      await offline
        .locator('meta[name="apple-mobile-web-app-capable"]')
        .getAttribute("content"),
      "yes",
    );
    await offline.evaluate(async () =>
      Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_, reject) =>
          setTimeout(
            () => reject(Error("offline shell did not become ready")),
            15000,
          ),
        ),
      ]),
    );
    if (!(await offline.evaluate(() => !!navigator.serviceWorker.controller)))
      await offline.reload({ waitUntil: "domcontentloaded" });
    await offline.waitForFunction(() => !!navigator.serviceWorker.controller);
    await mobile.setOffline(true);
    await offline.reload({ waitUntil: "domcontentloaded" });
    await unlock(offline);
    for (const room of ["home", "us", "letters", "quiet", "you"]) {
      await show(offline, room);
      assert.equal(
        await offline.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
    }
    const offlineDraft = "My own words, saved while offline.";
    await offline.locator("#self-letter-body").fill(offlineDraft);
    await storageEquals(offline, "anushka-self-letter-v1", offlineDraft, true);
    await offline.reload({ waitUntil: "domcontentloaded" });
    await unlock(offline);
    assert.equal(
      await offline.locator("#self-letter-body").inputValue(),
      offlineDraft,
    );
    await show(offline, "home");
    assert.equal(await offline.locator(".spotify-player").count(), 0);
    await offline
      .getByRole("button", {
        name: "Play the little instrumental",
        exact: true,
      })
      .click();
    await offline.waitForFunction(
      () => {
        const audio = document.querySelector("audio");
        return !audio.paused && audio.currentTime > 0 && audio.duration > 1;
      },
      null,
      { timeout: 10000 },
    );
    await offline.locator(".header-pause").click();
    assert.equal(
      await offline.locator("audio").evaluate((audio) => audio.paused),
      true,
    );
    const offlineTab = await mobile.newPage();
    await offlineTab.goto(base + "/#home", { waitUntil: "domcontentloaded" });
    await offlineTab.locator("#gift-password").waitFor({ state: "visible" });
    await unlock(offlineTab);
    await show(offlineTab, "you");
    assert.equal(
      await offlineTab.locator("#self-letter-body").inputValue(),
      offlineDraft,
    );
    await mobile.close();
    console.log(
      "PASS installable iPhone metadata/icons, genuine SW offline rooms/audio, new-tab welcome and offline writing",
    );

    const visual = await context({ viewport: { width: 1440, height: 1000 } });
    const screen = await visit(visual);
    await screen.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [320, 390, 768, 1440]) {
      await screen.setViewportSize({ width, height: 900 });
      for (const room of ["home", "us", "letters", "quiet", "you"]) {
        await show(screen, room);
        await screen.evaluate(() => document.fonts.ready);
        assert.equal(
          await screen.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
          room + " overflow at " + width,
        );
      }
      await show(screen, "home");
      const nav = screen.locator('nav a[href="#us"]:visible').first();
      await nav.click();
      await screen.locator(".promise-room").waitFor({ state: "visible" });
      assert.equal(new URL(screen.url()).hash, "#us");
      await show(screen, "letters");
      await screen.locator(".letter-card").first().click();
      assert.equal(
        await screen
          .locator(".letter-dialog")
          .evaluate((dialog) => dialog.scrollWidth > dialog.clientWidth),
        false,
        "reading dialog overflow at" + width,
      );
      await screen
        .getByRole("button", { name: "Close letter", exact: true })
        .click();
      await show(screen, "home");
      if ([390, 1440].includes(width)) {
        await screen.evaluate(() => scrollTo(0, 0));
        await screen.screenshot({
          path: `/tmp/anushka-final-${width}.png`,
          fullPage: true,
        });
      }
    }
    await visual.close();
    assert.deepEqual(
      writes,
      [],
      "local writing, choices and mock sharing never submit to a backend",
    );
    assert.deepEqual(errors, [], "no browser JavaScript errors");
    console.log(
      "PASS all five rooms at320/390/768/1440, actual navigation, reading dialogs, final screenshots and no JS errors",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

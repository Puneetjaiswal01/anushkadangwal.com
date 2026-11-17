/** Open the small browser welcome gate through its real form; do not seed test-only access. */
async function unlock(page) {
  await page.waitForFunction(
    () =>
      document.querySelector("#gift-password") ||
      document.querySelector(".app-shell"),
  );
  if (await page.locator("#gift-password").isVisible()) {
    await page.locator("#gift-password").fill("0205");
    await page.getByRole("button", { name: /Open my little world/ }).click();
  }
  await page.locator(".app-shell").waitFor({ state: "visible" });
}
module.exports = { unlock };

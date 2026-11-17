import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createEmailAuth,
  ALLOWED_EMAIL,
  readConfiguration,
} from "../server/email-auth.mjs";

// Test-only bindings. No provider is contacted; these values are not real credentials.
const env = {
  ANUSHKA_REDIS_REST_URL: "https://redis.unit-test.invalid",
  ANUSHKA_REDIS_REST_TOKEN: "test-only-not-a-token",
  ANUSHKA_RESEND_API_KEY: "test-only-not-an-api-key",
  ANUSHKA_MAIL_FROM: "Test <hello@example.invalid>",
  ANUSHKA_SESSION_SECRET: "test-only-session-secret-at-least-32-characters",
};
function fixture({ failSend = false } = {}) {
  let time = 1700000000000,
    otp = null,
    cooldown = 0,
    emailCount = 0,
    emailWindow = 0,
    verifyCount = 0,
    verifyWindow = 0;
  const ipCounts = new Map(),
    sessions = new Map(),
    deliveries = [];
  let shouldFail = failSend;
  const store = {
    async reserveOtp({ codeDigest, challenge, ipHash }) {
      if (cooldown > time)
        return { ok: false, retryAfter: Math.ceil((cooldown - time) / 1000) };
      if (emailWindow <= time) {
        emailCount = 0;
        emailWindow = time + 3600000;
      }
      let ip = ipCounts.get(ipHash);
      if (!ip || ip.until <= time) {
        ip = { count: 0, until: time + 3600000 };
        ipCounts.set(ipHash, ip);
      }
      if (emailCount >= 5 || ip.count >= 10)
        return { ok: false, retryAfter: 3600 };
      emailCount++;
      ip.count++;
      cooldown = time + 60000;
      otp = { codeDigest, challenge, attempts: 0, until: time + 600000 };
      return { ok: true, retryAfter: 60 };
    },
    async removeChallenge(challenge) {
      if (otp?.challenge === challenge) {
        otp = null;
        cooldown = 0;
      }
    },
    async consumeOtp({ codeDigest, sessionHash, record }) {
      if (verifyWindow <= time) {
        verifyWindow = time + 600000;
        verifyCount = 0;
      }
      if (++verifyCount > 30) return -3;
      if (!otp || otp.until <= time) {
        otp = null;
        return 0;
      }
      if (otp.codeDigest !== codeDigest) {
        if (++otp.attempts >= 5) {
          otp = null;
          return -2;
        }
        return -1;
      }
      otp = null;
      sessions.set(sessionHash, record);
      return 1;
    },
    async getSession(id) {
      const record = sessions.get(id);
      return record?.expiresAt > time ? record : null;
    },
    async deleteSession(id) {
      sessions.delete(id);
    },
  };
  const handle = createEmailAuth({
    env,
    store,
    now: () => time,
    sendEmail: async (code) => {
      if (shouldFail) throw new Error("fixture delivery failure");
      deliveries.push(code);
    },
  });
  const request = (body, cookie, origin = "https://anushkadangwal.com") =>
    handle({
      method: body ? "POST" : "GET",
      body,
      headers: {
        host: "anushkadangwal.com",
        origin,
        "content-type": "application/json",
        cookie,
      },
      socket: { remoteAddress: "192.0.2.1" },
    });
  return {
    request,
    deliveries,
    advance: (ms) => {
      time += ms;
    },
    failSend: (value) => {
      shouldFail = value;
    },
    sessions,
    getOtp: () => otp,
  };
}
const ask = (email) => ({ action: "request", email: email || ALLOWED_EMAIL });
const verify = (code) => ({ action: "verify", email: ALLOWED_EMAIL, code });

test("missing configuration is honest and sends no fake code", async () => {
  const handle = createEmailAuth({ env: {} });
  const status = await handle({ method: "GET" });
  assert.deepEqual(status.body, { configured: false, authenticated: false });
  const post = await handle({
    method: "POST",
    headers: { "content-type": "application/json" },
    body: ask(),
  });
  assert.equal(post.status, 503);
  assert.equal(
    readConfiguration({
      ...env,
      ANUSHKA_REDIS_REST_URL: "http://unsafe.invalid",
    }),
    null,
  );
});

test("allowlist is case-insensitive, rejects others, enforces origin and cooldown", async () => {
  const f = fixture();
  assert.equal((await f.request(ask("someone@example.com"))).status, 403);
  assert.equal(f.deliveries.length, 0);
  assert.equal(
    (await f.request(ask(), null, "https://other.invalid")).status,
    403,
  );
  assert.equal(
    (await f.request(ask(" Anushka1Dangwal@Gmail.com "))).status,
    200,
  );
  assert.equal(f.deliveries.length, 1);
  assert.match(f.deliveries[0], /^\d{6}$/);
  assert.notEqual(f.getOtp().codeDigest, f.deliveries[0]);
  const blocked = await f.request(ask());
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers["Retry-After"], "60");
});

test("OTP grants a secure session once, tampered cookies fail, logout revokes session", async () => {
  const f = fixture();
  await f.request(ask());
  const code = f.deliveries[0];
  const result = await f.request(verify(code));
  assert.equal(result.status, 200);
  assert.equal(result.body.authenticated, true);
  const cookie = result.headers["Set-Cookie"];
  assert.match(cookie, /HttpOnly; Secure; SameSite=Lax/);
  assert.match(cookie, /Max-Age=604800/);
  assert.equal((await f.request(null, cookie)).body.authenticated, true);
  assert.equal((await f.request(verify(code))).status, 410);
  const tokenPart = cookie.split(";")[0],
    last = tokenPart.at(-1);
  const tampered = tokenPart.slice(0, -1) + (last === "a" ? "b" : "a");
  assert.equal((await f.request(null, tampered)).body.authenticated, false);
  assert.equal((await f.request({ action: "logout" }, cookie)).status, 200);
  assert.equal((await f.request(null, cookie)).body.authenticated, false);
});

test("two simultaneous submissions cannot reuse one code", async () => {
  const f = fixture();
  await f.request(ask());
  const results = await Promise.all([
    f.request(verify(f.deliveries[0])),
    f.request(verify(f.deliveries[0])),
  ]);
  assert.deepEqual(results.map((r) => r.status).sort(), [200, 410]);
  assert.equal(f.sessions.size, 1);
});

test("code expires after ten minutes and session expires after seven days", async () => {
  const f = fixture();
  await f.request(ask());
  f.advance(600001);
  assert.equal((await f.request(verify(f.deliveries[0]))).status, 410);
  await f.request(ask());
  const result = await f.request(verify(f.deliveries.at(-1)));
  f.advance(604800001);
  assert.equal(
    (await f.request(null, result.headers["Set-Cookie"])).body.authenticated,
    false,
  );
});

test("five wrong attempts consume and lock a code", async () => {
  const f = fixture();
  await f.request(ask());
  const correct = f.deliveries[0],
    wrong = correct === "000000" ? "999999" : "000000";
  for (let i = 0; i < 4; i++)
    assert.equal((await f.request(verify(wrong))).status, 401);
  assert.equal((await f.request(verify(wrong))).status, 429);
  assert.equal((await f.request(verify(correct))).status, 410);
  assert.equal(f.sessions.size, 0);
});

test("hourly request limits prevent unlimited email and verification is also rate-limited", async () => {
  const f = fixture();
  for (let i = 0; i < 5; i++) {
    assert.equal((await f.request(ask())).status, 200);
    f.advance(61000);
  }
  assert.equal((await f.request(ask())).status, 429);
  assert.equal(f.deliveries.length, 5);
  for (let i = 0; i < 30; i++) await f.request(verify("000000"));
  assert.equal((await f.request(verify("000000"))).status, 429);
});

test("delivery failure removes only its challenge and permits a retry", async () => {
  const f = fixture({ failSend: true });
  assert.equal((await f.request(ask())).status, 502);
  assert.equal(f.getOtp(), null);
  f.failSend(false);
  assert.equal((await f.request(ask())).status, 200);
  assert.equal(f.deliveries.length, 1);
});

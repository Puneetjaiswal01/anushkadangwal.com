import {
  createHash,
  createHmac,
  randomBytes,
  randomInt,
  timingSafeEqual,
} from "node:crypto";

export const ALLOWED_EMAIL = "anushka1dangwal@gmail.com";
const PREFIX = "anushka:email-auth:v1:";
const OTP_SECONDS = 600;
const SESSION_SECONDS = 7 * 24 * 60 * 60;
const COOKIE = "__Host-anushka_session";
const digest = (value) => createHash("sha256").update(value).digest("hex");
const hmac = (secret, value) =>
  createHmac("sha256", secret).update(value).digest("hex");

export function readConfiguration(env = process.env) {
  let url;
  try {
    url = new URL(env.ANUSHKA_REDIS_REST_URL);
  } catch {
    return null;
  }
  const from = env.ANUSHKA_MAIL_FROM || "";
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    !env.ANUSHKA_REDIS_REST_TOKEN ||
    !env.ANUSHKA_RESEND_API_KEY ||
    !from ||
    /[\r\n]/.test(from) ||
    !/[^\s<>]+@[^\s<>]+\.[^\s<>]+/.test(from) ||
    Buffer.byteLength(env.ANUSHKA_SESSION_SECRET || "") < 32
  )
    return null;
  return {
    redisUrl: url.href,
    redisToken: env.ANUSHKA_REDIS_REST_TOKEN,
    resendKey: env.ANUSHKA_RESEND_API_KEY,
    from,
    secret: env.ANUSHKA_SESSION_SECRET,
  };
}

export const reserveScript = `
local cooldown = redis.call('GET', KEYS[2])
if cooldown then return {0, math.max(1, redis.call('TTL', KEYS[2]))} end
local emailCount = tonumber(redis.call('GET', KEYS[3]) or '0')
local ipCount = tonumber(redis.call('GET', KEYS[4]) or '0')
if emailCount >= 5 or ipCount >= 10 then return {0, 3600} end
if redis.call('INCR', KEYS[3]) == 1 then redis.call('EXPIRE', KEYS[3], 3600) end
if redis.call('INCR', KEYS[4]) == 1 then redis.call('EXPIRE', KEYS[4], 3600) end
redis.call('HSET', KEYS[1], 'digest', ARGV[1], 'attempts', 0, 'challenge', ARGV[2])
redis.call('EXPIRE', KEYS[1], 600)
redis.call('SET', KEYS[2], ARGV[2], 'EX', 60)
return {1, 60}`;
export const consumeScript = `
local count = redis.call('INCR', KEYS[3])
if count == 1 then redis.call('EXPIRE', KEYS[3], 600) end
if count > 30 then return -3 end
local expected = redis.call('HGET', KEYS[1], 'digest')
if not expected then return 0 end
if expected ~= ARGV[1] then
  local attempts = redis.call('HINCRBY', KEYS[1], 'attempts', 1)
  if attempts >= 5 then redis.call('DEL', KEYS[1]); return -2 end
  return -1
end
redis.call('SET', KEYS[2], ARGV[2], 'EX', 604800)
redis.call('DEL', KEYS[1])
return 1`;
export const cleanupScript = `
if redis.call('HGET', KEYS[1], 'challenge') == ARGV[1] then redis.call('DEL', KEYS[1]) end
if redis.call('GET', KEYS[2]) == ARGV[1] then redis.call('DEL', KEYS[2]) end
return 1`;

export function redisStore(config) {
  async function command(args) {
    const response = await fetch(config.redisUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + config.redisToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("storage_unavailable");
    const data = await response.json();
    if (data.error) throw new Error("storage_unavailable");
    return data.result;
  }
  const otpKey = PREFIX + "otp";
  const cooldownKey = PREFIX + "cooldown";
  return {
    async reserveOtp({ codeDigest, challenge, ipHash }) {
      const result = await command([
        "EVAL",
        reserveScript,
        4,
        otpKey,
        cooldownKey,
        PREFIX + "email-rate",
        PREFIX + "ip-rate:" + ipHash,
        codeDigest,
        challenge,
      ]);
      return { ok: Number(result[0]) === 1, retryAfter: Number(result[1]) };
    },
    async removeChallenge(challenge) {
      await command(["EVAL", cleanupScript, 2, otpKey, cooldownKey, challenge]);
    },
    async consumeOtp({ codeDigest, sessionHash, record, ipHash }) {
      return Number(
        await command([
          "EVAL",
          consumeScript,
          3,
          otpKey,
          PREFIX + "session:" + sessionHash,
          PREFIX + "verify-rate:" + ipHash,
          codeDigest,
          JSON.stringify(record),
        ]),
      );
    },
    async getSession(sessionHash) {
      const raw = await command(["GET", PREFIX + "session:" + sessionHash]);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    },
    async deleteSession(sessionHash) {
      await command(["DEL", PREFIX + "session:" + sessionHash]);
    },
  };
}

async function sendResend(config, code) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + config.resendKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [ALLOWED_EMAIL],
      subject: "Your little code for Always Anushka",
      text: `Your Always Anushka sign-in code is ${code}.\n\nIt expires in 10 minutes and can be used once.\nIf you did not ask for this, ignore this email. Your account has not been signed in.`,
      html: `<div style="font-family:Georgia,serif;color:#60466f;padding:24px"><p>A little code, just for you.</p><h1 style="letter-spacing:8px">${code}</h1><p>Use this to sign in to Always Anushka. It expires in 10 minutes and works once.</p><p>If you did not request this code, you can ignore this email.</p></div>`,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("email_unavailable");
}

function cookie(value, maxAge = SESSION_SECONDS) {
  return `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}
function sessionFromRequest(req, secret) {
  const header = req.headers?.cookie || "";
  const value = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(COOKIE + "="))
    ?.slice(COOKIE.length + 1);
  if (!value) return null;
  const [token, signature, extra] = value.split(".");
  if (
    extra ||
    !/^[A-Za-z0-9_-]{43}$/.test(token || "") ||
    !/^[a-f0-9]{64}$/.test(signature || "")
  )
    return null;
  const expected = Buffer.from(hmac(secret, "session:" + token), "hex");
  const actual = Buffer.from(signature, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected)
    ? digest(token)
    : null;
}
function ipAddress(req) {
  return String(
    req.headers?.["x-real-ip"] ||
      req.socket?.remoteAddress ||
      req.headers?.["x-forwarded-for"]?.split(",")[0] ||
      "unknown",
  ).slice(0, 200);
}

export function createEmailAuth({
  env = process.env,
  store: injectedStore,
  sendEmail,
  now = Date.now,
} = {}) {
  const config = readConfiguration(env);
  const store = config ? injectedStore || redisStore(config) : null;
  const send = sendEmail || ((code) => sendResend(config, code));
  const reply = (status, body, headers = {}) => ({
    status,
    body,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
  return async function handle(req) {
    const method = (req.method || "GET").toUpperCase();
    if (!["GET", "POST"].includes(method))
      return reply(
        405,
        { error: "Method not allowed." },
        { Allow: "GET, POST" },
      );
    if (method === "GET" && !config)
      return reply(200, { configured: false, authenticated: false });
    if (method === "POST") {
      const origin = req.headers?.origin;
      if (origin) {
        try {
          if (new URL(origin).host !== req.headers?.host)
            return reply(403, {
              error: "Please use the sign-in form on this website.",
            });
        } catch {
          return reply(403, { error: "Invalid request origin." });
        }
      }
      if (!(req.headers?.["content-type"] || "").startsWith("application/json"))
        return reply(415, { error: "Use a JSON request." });
    }
    if (!config)
      return reply(503, {
        configured: false,
        authenticated: false,
        error: "Email sign-in needs setup. The little world is still open.",
      });
    try {
      const currentSession = sessionFromRequest(req, config.secret);
      if (method === "GET") {
        const record = currentSession
          ? await store.getSession(currentSession)
          : null;
        return reply(200, {
          configured: true,
          authenticated:
            record?.email === ALLOWED_EMAIL && Number(record.expiresAt) > now(),
          ...(record?.email === ALLOWED_EMAIL &&
          Number(record.expiresAt) > now()
            ? { email: ALLOWED_EMAIL }
            : {}),
        });
      }
      let body = req.body;
      if (typeof body === "string") {
        if (body.length > 2048)
          return reply(413, { error: "Request too large." });
        try {
          body = JSON.parse(body);
        } catch {
          return reply(400, { error: "Invalid JSON request." });
        }
      }
      if (!body || typeof body !== "object" || Array.isArray(body))
        return reply(400, { error: "Invalid request." });
      if (body.action === "logout") {
        if (currentSession) await store.deleteSession(currentSession);
        return reply(
          200,
          { configured: true, authenticated: false },
          { "Set-Cookie": cookie("", 0) },
        );
      }
      if (!["request", "verify"].includes(body.action))
        return reply(400, { error: "Unknown sign-in action." });
      const email =
        typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      if (email !== ALLOWED_EMAIL)
        return reply(403, {
          error: "This sign-in is set up for Anushka’s email only.",
        });
      const ipHash = hmac(config.secret, "ip:" + ipAddress(req));
      if (body.action === "request") {
        const code = String(randomInt(0, 1000000)).padStart(6, "0");
        const challenge = randomBytes(16).toString("hex");
        const result = await store.reserveOtp({
          codeDigest: hmac(config.secret, "otp:" + email + ":" + code),
          challenge,
          ipHash,
        });
        if (!result.ok)
          return reply(
            429,
            {
              error: "Please wait before requesting another code.",
              retryAfter: result.retryAfter,
            },
            { "Retry-After": String(result.retryAfter) },
          );
        try {
          await send(code);
        } catch {
          await store.removeChallenge(challenge);
          return reply(502, {
            error: "The email could not be sent. Please try again in a moment.",
          });
        }
        return reply(200, { ok: true, expiresIn: OTP_SECONDS, retryAfter: 60 });
      }
      const code = typeof body.code === "string" ? body.code.trim() : "";
      if (!/^\d{6}$/.test(code))
        return reply(400, {
          error: "Enter the six-digit code from your email.",
        });
      const token = randomBytes(32).toString("base64url");
      const record = {
        email: ALLOWED_EMAIL,
        createdAt: now(),
        expiresAt: now() + SESSION_SECONDS * 1000,
      };
      const result = await store.consumeOtp({
        codeDigest: hmac(config.secret, "otp:" + email + ":" + code),
        sessionHash: digest(token),
        record,
        ipHash,
      });
      if (result === 0)
        return reply(410, {
          error:
            "That code has expired or was already used. Please request a new one.",
        });
      if (result === -1)
        return reply(401, {
          error: "That code isn’t correct. Check the six digits in your email.",
        });
      if (result === -2)
        return reply(429, {
          error:
            "That code is locked after five attempts. Please request a new one.",
        });
      if (result === -3)
        return reply(
          429,
          {
            error:
              "Too many attempts. Please wait ten minutes before trying again.",
            retryAfter: 600,
          },
          { "Retry-After": "600" },
        );
      if (result !== 1) throw new Error("storage_unavailable");
      return reply(
        200,
        { configured: true, authenticated: true, email: ALLOWED_EMAIL },
        {
          "Set-Cookie": cookie(
            token + "." + hmac(config.secret, "session:" + token),
          ),
        },
      );
    } catch {
      return reply(503, {
        error: "Sign-in is temporarily unavailable. Please try again later.",
      });
    }
  };
}

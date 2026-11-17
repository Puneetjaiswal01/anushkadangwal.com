# Email sign-in setup

The website includes a real server-backed email OTP flow for **anushka1dangwal@gmail.com** only. It is optional account sign-in: the gift page is public, and browser-local letters/reminders are not turned into protected or synced account data.

No real credentials were generated or committed. No live email has been sent or production datastore tested. Without the bindings below, `GET /api/auth` deliberately reports `configured: false`; the interface says sign-in needs setup and never claims that a code was sent.

## Configure production in Vercel

In the website's Vercel project, open **Settings → Environment Variables**. Add these as server-only Production values, then redeploy. Do not use a `VITE_` prefix and do not paste secret values into chat or GitHub files.

| Variable                   | Required value                                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ANUSHKA_RESEND_API_KEY`   | A real Resend API key permitted to send email.                                                                                                                                   |
| `ANUSHKA_MAIL_FROM`        | A sender accepted by Resend, for example `Always Anushka <hello@your-verified-domain>` after that domain is verified in Resend. The example is not an already configured sender. |
| `ANUSHKA_REDIS_REST_URL`   | The HTTPS REST URL of a private Upstash-compatible Redis database.                                                                                                               |
| `ANUSHKA_REDIS_REST_TOKEN` | That database's private REST token with read/write/EVAL permissions.                                                                                                             |
| `ANUSHKA_SESSION_SECRET`   | A securely generated signing secret of at least 32 bytes. Generate it privately (for example with `openssl rand -base64 48`) and save the result directly in Vercel settings.    |

Use distinct credentials/datastores for previews and production. Sender verification and a datastore must actually exist; setting a made-up value does not create them. The code introduces no paid resource automatically.

The Vercel Node function is `api/auth.js`, importing `server/email-auth.mjs`. It is separate from the Vite static build. The website's existing Vercel integration should deploy it from the same commit. A plain static file server cannot execute this API, so a local Vite-only preview will truthfully say the account service is unavailable.

## Flow and limits

- The server normalizes the supplied address and permits only `anushka1dangwal@gmail.com`. Browser UI restrictions are not relied on for authorization.
- Request sends a random six-digit code through the Resend REST API. Only its secret-keyed HMAC is stored in Redis; no code is logged or saved to browser storage.
- Codes expire after ten minutes and are consumed once. An atomic Redis Lua operation checks the hash, tracks at most five wrong attempts, and creates the session while consuming the code, so simultaneous submissions cannot reuse it.
- Request cooldown is 60 seconds. Requests are capped at five per email per hour and ten per IP per hour. Verification has an additional 30-attempt/IP/ten-minute limit. IPs are keyed as secret HMACs, not stored as raw addresses.
- A delivery failure removes only that request's challenge/cooldown, preserving newer challenges, and permits a retry within the overall rate limit.
- Successful verification sets a signed random session cookie with `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`, and a seven-day lifetime. Sessions are stored by token hash in Redis and revoked by sign-out. Rotating `ANUSHKA_SESSION_SECRET` invalidates old signed cookies.
- POST requests enforce same-origin requests when an Origin header is present. All responses use `Cache-Control: no-store`.

## Verify after the real bindings are set

1. Open `/api/auth` on the real HTTPS site. It should report `configured: true, authenticated: false` while signed out.
2. Open Email sign-in and request a code. Confirm it reaches the allowed mailbox; inbox delivery depends on actual sender/domain configuration.
3. Verify the code. Confirm a session is recognized after reloading, then sign out and confirm the old cookie no longer authenticates.
4. Confirm a used/expired code fails, incorrect addresses are rejected, and requesting too quickly returns a cooldown.

`node --test tests/auth.test.mjs` runs isolated tests with a fake in-memory store and fake sender. These prove control flow for configuration, allowlist, cooldown, expiry, wrong attempts, single use/concurrent use, cookie signatures, revocation, session lifetime, and send failure. They do not establish production Resend delivery, real Redis Lua execution, or a live configured login.

import React, { useEffect, useRef, useState } from "react";
import "./email-login.css";
const EMAIL = "anushka1dangwal@gmail.com";
async function api(body, signal) {
  const response = await fetch("/api/auth", {
    method: body ? "POST" : "GET",
    credentials: "same-origin",
    headers: body ? { "Content-Type": "application/json" } : {},
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal,
  });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Email sign-in isn’t available on this preview. You can still enjoy the little world.",
    );
  }
  if (!response.ok) {
    const error = new Error(
      data.error || "Sign-in is temporarily unavailable.",
    );
    error.retryAfter = data.retryAfter;
    throw error;
  }
  return data;
}
export default function EmailLogin({ onAuthChange }) {
  const [account, setAccount] = useState(null),
    [open, setOpen] = useState(false),
    [step, setStep] = useState("email"),
    [code, setCode] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [retryAt, setRetryAt] = useState(0),
    [clock, setClock] = useState(Date.now());
  const dialog = useRef(null),
    trigger = useRef(null),
    codeInput = useRef(null),
    callback = useRef(onAuthChange);
  useEffect(() => {
    callback.current = onAuthChange;
  }, [onAuthChange]);
  useEffect(() => {
    const controller = new AbortController();
    api(null, controller.signal)
      .then((data) => {
        setAccount(data);
        callback.current?.(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (open && dialog.current && !dialog.current.open)
      dialog.current.showModal();
    if (!open && dialog.current?.open) dialog.current.close();
  }, [open]);
  useEffect(() => {
    if (step === "code" && open) codeInput.current?.focus();
  }, [step, open]);
  useEffect(() => {
    if (!retryAt) return;
    const interval = setInterval(() => setClock(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [retryAt]);
  function close() {
    setOpen(false);
    setCode("");
    trigger.current?.focus();
  }
  async function requestCode() {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const data = await api({ action: "request", email: EMAIL });
      setStep("code");
      setCode("");
      setRetryAt(Date.now() + (data.retryAfter || 60) * 1000);
      setClock(Date.now());
      setNotice(
        "A six-digit code has been sent. Check your inbox and spam folder. It expires in 10 minutes.",
      );
    } catch (err) {
      setError(err.message);
      if (err.retryAfter) {
        setRetryAt(Date.now() + err.retryAfter * 1000);
        setClock(Date.now());
      }
    } finally {
      setBusy(false);
    }
  }
  async function verify(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const data = await api({ action: "verify", email: EMAIL, code });
      setAccount(data);
      setCode("");
      callback.current?.(data);
      setNotice(
        "Signed in. This little world is still yours to enjoy at your own pace.",
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const data = await api({ action: "logout" });
      setAccount(data);
      setStep("email");
      setCode("");
      callback.current?.(data);
      setNotice(
        "Signed out. Your browser’s saved letter and reminders stay on this device.",
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  const wait = Math.max(0, Math.ceil((retryAt - clock) / 1000));
  return (
    <>
      <button
        ref={trigger}
        className="email-login-trigger"
        aria-label={account?.authenticated ? "Your account" : "Email sign-in"}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <span aria-hidden="true">♡</span>
        <span className="email-login-trigger-label">
          {account?.authenticated ? "Your account" : "Email sign-in"}
        </span>
      </button>
      <dialog
        ref={dialog}
        className="email-login-dialog"
        aria-labelledby="email-login-title"
        onCancel={close}
        onClose={() => {
          if (open) close();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        <button
          className="email-login-close"
          aria-label="Close email sign-in"
          onClick={close}
        >
          ×
        </button>
        <span className="email-login-seal" aria-hidden="true">
          ✉
        </span>
        <span className="email-login-kicker">A LITTLE ACCOUNT FOR ANUSHKA</span>
        <h2 id="email-login-title">
          {account?.authenticated ? (
            <>
              Hello again,
              <br />
              <em>Anushka.</em>
            </>
          ) : (
            <>
              A little code.
              <br />
              <em>Just for you.</em>
            </>
          )}
        </h2>
        {account?.authenticated ? (
          <div className="email-login-account">
            <p>
              Signed in as <b>{EMAIL}</b>.
            </p>
            <p>
              Your session lasts up to seven days. You can sign out here any
              time.
            </p>
            <button
              className="email-login-primary"
              onClick={logout}
              disabled={busy}
            >
              {busy ? "Signing out…" : "Sign out"}
            </button>
          </div>
        ) : account?.configured === false ? (
          <div className="email-login-setup">
            <h3>Email sign-in needs setup.</h3>
            <p>
              The email sender and private account storage are not connected
              yet. No code has been sent.
            </p>
            <p>
              The letters, music and little world remain open while this is set
              up.
            </p>
          </div>
        ) : !account ? (
          <div className="email-login-loading">
            <p>
              {error
                ? "The account service could not be reached."
                : "Checking whether email sign-in is ready…"}
            </p>
            <button
              className="email-login-retry"
              onClick={async () => {
                setBusy(true);
                setError("");
                try {
                  const data = await api();
                  setAccount(data);
                  callback.current?.(data);
                } catch (err) {
                  setError(err.message);
                } finally {
                  setBusy(false);
                }
              }}
              disabled={busy}
            >
              {busy ? "Checking…" : "Check again"}
            </button>
          </div>
        ) : (
          <>
            <p className="email-login-intro">
              {step === "code"
                ? "Check your email for the six-digit code."
                : "We’ll send a one-time sign-in code to your email. No password to remember."}
            </p>
            <label className="email-login-label" htmlFor="anushka-login-email">
              Your email
            </label>
            <input
              className="email-login-input"
              id="anushka-login-email"
              type="email"
              value={EMAIL}
              readOnly
              autoComplete="email"
            />
            {step === "code" ? (
              <form onSubmit={verify}>
                <label
                  className="email-login-label"
                  htmlFor="anushka-login-code"
                >
                  Six-digit code
                </label>
                <input
                  ref={codeInput}
                  className="email-login-input email-login-code"
                  id="anushka-login-code"
                  value={code}
                  onChange={(event) =>
                    setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  aria-describedby="email-login-code-help"
                />
                <p id="email-login-code-help" className="email-login-help">
                  Use the latest code. Five incorrect attempts lock it.
                </p>
                <button
                  className="email-login-primary"
                  type="submit"
                  disabled={busy || code.length !== 6}
                >
                  {busy ? "Checking your code…" : "Sign in"}
                </button>
                <button
                  className="email-login-retry"
                  type="button"
                  onClick={requestCode}
                  disabled={busy || wait > 0}
                >
                  {wait > 0
                    ? `Request another code in ${wait}s`
                    : "Send another code"}
                </button>
              </form>
            ) : (
              <button
                className="email-login-primary"
                onClick={requestCode}
                disabled={busy || wait > 0}
              >
                {busy
                  ? "Sending your code…"
                  : wait > 0
                    ? `Try again in ${wait}s`
                    : "Send me a sign-in code"}
              </button>
            )}
          </>
        )}
        {error && (
          <p className="email-login-error" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="email-login-notice" role="status">
            {notice}
          </p>
        )}
        <p className="email-login-footnote">
          Sign-in identifies your account. The gift page is still public. Your
          letter to yourself and saved reminders stay in this browser; signing
          in does not sync or password-protect them.
        </p>
      </dialog>
    </>
  );
}

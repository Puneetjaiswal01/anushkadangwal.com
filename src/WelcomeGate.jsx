import React, { useEffect, useRef, useState } from "react";
import "./welcome-gate.css";
const SESSION = "anushka-welcome-v2";
// A light, offline-capable welcome lock, not server-side authorization.
const PASSWORD_DIGEST =
  "b7fbb9f14ca908bf20c16e78647d36945e254a3b494982890cffb2e58cbc3d95";
function remembered() {
  try {
    return sessionStorage.getItem(SESSION) === "open";
  } catch {
    return false;
  }
}
export default function WelcomeGate({ children }) {
  const [initial] = useState(remembered),
    [unlocked, setUnlocked] = useState(initial),
    [openedOnce, setOpenedOnce] = useState(initial),
    [password, setPassword] = useState(""),
    [show, setShow] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [storageNote, setStorageNote] = useState("");
  const input = useRef(null);
  useEffect(() => {
    if (!unlocked) document.title = "A little world for Anushka ♡";
  }, [unlocked]);
  async function enter(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (!globalThis.crypto?.subtle) throw new Error("https_required");
      const bytes = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(password),
      );
      const digest = Array.from(new Uint8Array(bytes), (byte) =>
        byte.toString(16).padStart(2, "0"),
      ).join("");
      if (digest !== PASSWORD_DIGEST) {
        setError("That code didn’t match. Give it another try.");
        input.current?.focus();
        input.current?.select();
        return;
      }
      try {
        sessionStorage.setItem(SESSION, "open");
        setStorageNote("");
      } catch {
        setStorageNote(
          "This browser can’t remember this visit. Enter your password again if you reload.",
        );
      }
      setPassword("");
      setShow(false);
      setOpenedOnce(true);
      setUnlocked(true);
      document.title = "Always Anushka — your little world";
      window.scrollTo(0, 0);
    } catch {
      setError(
        "Please open this little world using its HTTPS website, then try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  function lock() {
    try {
      sessionStorage.removeItem(SESSION);
      setStorageNote("");
    } catch {
      setStorageNote(
        "This browser couldn’t clear its remembered visit. Close this tab to finish closing your little world.",
      );
    }
    // Preserve her unsaved words in memory; pause both local audio and the embedded player.
    document.querySelectorAll("audio").forEach((audio) => audio.pause());
    document
      .querySelectorAll('iframe[src*="open.spotify.com"]')
      .forEach((frame) => {
        frame.src = frame.src;
      });
    setUnlocked(false);
    setPassword("");
    setShow(false);
    setError("");
    window.scrollTo(0, 0);
  }
  return (
    <>
      {!unlocked && (
        <main className="welcome-page" id="welcome">
          <a className="welcome-wordmark" href="#welcome">
            always, <em>anushka.</em>
            <span aria-hidden="true">♡</span>
          </a>
          <div className="welcome-background" aria-hidden="true">
            <span>✧</span>
            <i>✦</i>
            <b>♡</b>
          </div>
          <section className="welcome-card" aria-labelledby="welcome-title">
            <span className="welcome-card-star" aria-hidden="true">
              ✧
            </span>
            <div className="welcome-icon-wrap">
              <img
                src="/icons/icon-512.png"
                width="112"
                height="112"
                alt="A little smiling A"
              />
              <span aria-hidden="true">♡</span>
            </div>
            <span className="welcome-eyebrow">
              A LITTLE WORLD, JUST FOR YOU
            </span>
            <h1 id="welcome-title">
              Hey, Anushka.
              <br />
              <em>Come on in.</em>
            </h1>
            <p className="welcome-description">
              Leave the noise outside for a moment.
              <br />
              There’s a little love waiting in here.
            </p>
            <form onSubmit={enter} className="welcome-form">
              <label htmlFor="gift-password">Your four-digit code</label>
              <div
                className={
                  "welcome-password-wrap " + (error ? "has-error" : "")
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  width="19"
                  height="19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <rect x="5" y="10" width="14" height="11" rx="3" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  <circle cx="12" cy="15" r="1" />
                </svg>
                <input
                  ref={input}
                  id="gift-password"
                  type={show ? "text" : "password"}
                  inputMode="numeric"
                  autoComplete="current-password"
                  pattern="[0-9]{4}"
                  minLength={4}
                  maxLength={4}
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value.replace(/\D/g, ""));
                    setError("");
                  }}
                  placeholder="••••"
                  aria-describedby={
                    error ? "welcome-error" : "welcome-password-note"
                  }
                  aria-invalid={!!error}
                  disabled={busy}
                />
                <button
                  type="button"
                  className="welcome-show-password"
                  onClick={() => setShow(!show)}
                  aria-label={show ? "Hide password" : "Show password"}
                  aria-pressed={show}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
              <p id="welcome-password-note" className="welcome-field-note">
                Four little numbers, and you’re home.
              </p>
              {error && (
                <p id="welcome-error" className="welcome-error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="welcome-enter" disabled={busy}>
                {busy ? "One little moment…" : "Open my little world"}
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </form>
            <p className="welcome-handwritten">Bas tum. Aur thoda sa pyaar.</p>
            <div className="welcome-bottom-mark">
              <span aria-hidden="true">✦</span> No expectations. No proving.
              Just you. <span aria-hidden="true">✦</span>
            </div>
            {storageNote && (
              <p className="welcome-storage-note" role="status">
                {storageNote}
              </p>
            )}
          </section>
          <p className="welcome-page-note">
            Made with love. On all your days. <span aria-hidden="true">♡</span>
          </p>
        </main>
      )}
      {openedOnce && (
        <div hidden={!unlocked} className="unlocked-world">
          {children(lock)}
        </div>
      )}
    </>
  );
}

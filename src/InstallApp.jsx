import React, { useEffect, useRef, useState } from "react";
import "./install-app.css";

function alreadyInstalled() {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true)
  );
}

export default function InstallApp({ className = "" }) {
  const [installed, setInstalled] = useState(alreadyInstalled);
  const [promptEvent, setPromptEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const dialog = useRef(null);
  const trigger = useRef(null);
  const ios =
    typeof navigator !== "undefined" &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

  useEffect(() => {
    const mode = window.matchMedia("(display-mode: standalone)");
    function onPrompt(event) {
      event.preventDefault();
      setPromptEvent(event);
    }
    function onInstalled() {
      setInstalled(true);
      setPromptEvent(null);
      setOpen(false);
    }
    function onMode() {
      setInstalled(alreadyInstalled());
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    mode.addEventListener?.("change", onMode);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      mode.removeEventListener?.("change", onMode);
    };
  }, []);
  useEffect(() => {
    if (open && dialog.current && !dialog.current.open)
      dialog.current.showModal();
    if (!open && dialog.current?.open) dialog.current.close();
  }, [open]);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  async function install() {
    if (!promptEvent) return;
    setBusy(true);
    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      setPromptEvent(null);
      if (choice.outcome === "accepted") {
        setStatus(
          "Your browser accepted the request. Look for Anushka on your home screen.",
        );
      } else
        setStatus(
          "No rush. You can keep visiting this little world in your browser.",
        );
    } catch {
      setPromptEvent(null);
      setStatus(
        "The browser couldn’t open its install prompt. You can use the steps below instead.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (installed) return null;
  return (
    <>
      <button
        ref={trigger}
        className={`install-trigger ${className}`}
        onClick={() => {
          setStatus("");
          setOpen(true);
        }}
        aria-haspopup="dialog"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="17"
          height="17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <rect x="6" y="2.5" width="12" height="19" rx="2" />
          <path d="M10 18h4M12 7v6m-3-3h6" />
        </svg>
        Keep me close
      </button>
      <dialog
        ref={dialog}
        className="install-dialog"
        aria-labelledby="install-title"
        onCancel={close}
        onClose={() => {
          if (open) close();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        <button
          className="install-close"
          aria-label="Close install instructions"
          onClick={close}
        >
          ×
        </button>
        <div className="install-illustration" aria-hidden="true">
          <span>a.</span>
          <i>♡</i>
        </div>
        <span className="install-kicker">
          A LITTLE CLOSER, WHENEVER YOU NEED
        </span>
        <h2 id="install-title">
          A little world.
          <br />
          <em>On your home screen.</em>
        </h2>
        <p className="install-intro">
          Keep this soft place beside your everyday apps. No store, no new
          account, no obligation to return.
        </p>
        {promptEvent && !ios && (
          <button className="install-now" onClick={install} disabled={busy}>
            {busy
              ? "Opening your browser’s prompt…"
              : "Add Anushka to my device"}
          </button>
        )}
        <p className="install-status" role="status">
          {status}
        </p>
        <div className="install-instructions">
          <h3>
            {ios ? "On your iPhone or iPad" : "On iPhone or iPad — Safari"}
          </h3>
          <ol>
            <li>
              Open <b>anushkadangwal.com</b> in <b>Safari</b>.
            </li>
            <li>
              Tap <b>Share</b>{" "}
              <span
                className="install-share"
                aria-label="square with an upward arrow"
              >
                ↥
              </span>
              , then scroll to <b>Add to Home Screen</b>.
            </li>
            <li>
              If shown, keep <b>Open as Web App</b> on. Tap <b>Add</b>.
            </li>
          </ol>
          <h3>On Android — Chrome</h3>
          <p>
            Open the browser’s <b>⋮ menu</b>, choose <b>Add to Home screen</b>{" "}
            or <b>Install app</b>, and follow its prompt.
          </p>
        </div>
        <p className="install-footnote">
          If you’re viewing this inside another app, open the link in Safari or
          Chrome first. After the first full visit, letters and the little
          instrumental can be available offline. Your own letter stays in this
          browser on this device.
        </p>
        <button className="install-later" onClick={close}>
          I’ll keep you close, one way or another ♡
        </button>
      </dialog>
    </>
  );
}

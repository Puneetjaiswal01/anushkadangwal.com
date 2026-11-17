import React, { useEffect, useRef, useState } from "react";
import "./self-letter.css";

const STORAGE_KEY = "anushka-self-letter-v1";
const starters = [
  "Dear Anushka, today I want you to know…",
  "Something I wish I could say kindly to myself is…",
  "No matter what happens next, I want to remember…",
];

function readDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { text: "", savedAt: null, error: false };
    const record = JSON.parse(raw);
    if (record?.version !== 1 || typeof record.text !== "string") {
      return { text: "", savedAt: null, error: true };
    }
    return { text: record.text, savedAt: record.savedAt || null, error: false };
  } catch {
    return { text: "", savedAt: null, error: true };
  }
}

export default function SelfLetter() {
  const [initial] = useState(readDraft);
  const [text, setText] = useState(initial.text);
  const [status, setStatus] = useState(
    initial.error ? "error" : initial.text ? "saved" : "empty",
  );
  const [revision, setRevision] = useState(0);
  const [notice, setNotice] = useState("");
  const field = useRef(null);
  const current = useRef({ text: initial.text, dirty: false });

  function persist() {
    if (!current.current.dirty) return true;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 1,
          text: current.current.text,
          savedAt: new Date().toISOString(),
        }),
      );
      current.current.dirty = false;
      setStatus(current.current.text ? "saved" : "empty");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }

  useEffect(() => {
    if (!revision) return;
    const timer = setTimeout(persist, 500);
    return () => clearTimeout(timer);
  }, [revision]);

  useEffect(() => {
    const flush = () => persist();
    const onHidden = () => {
      if (document.hidden) persist();
    };
    const beforeLeaving = (event) => {
      if (current.current.dirty && !persist()) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("beforeunload", beforeLeaving);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("beforeunload", beforeLeaving);
    };
  }, []);

  function update(next) {
    current.current = { text: next, dirty: true };
    setText(next);
    setStatus("saving");
    setNotice("");
    setRevision((value) => value + 1);
  }

  function useStarter(starter) {
    update(text.trim() ? `${text}\n\n${starter}` : starter);
    requestAnimationFrame(() => {
      field.current?.focus();
      field.current?.setSelectionRange(
        field.current.value.length,
        field.current.value.length,
      );
    });
  }

  function download() {
    if (!text.trim()) return;
    try {
      const date = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());
      const blob = new Blob([`A letter to myself\n${date}\n\n${text}\n`], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Anushka-a-letter-to-myself-${date}.txt`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice(
        "A text copy is ready in your downloads. Keep it somewhere you trust.",
      );
    } catch {
      setNotice(
        "The download could not start. You can select and copy your words from the letter.",
      );
    }
  }

  function remove() {
    if (!text) return;
    if (
      !window.confirm(
        "Delete this letter from this browser? Download a copy first if you want to keep it.",
      )
    )
      return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      current.current = { text: "", dirty: false };
      setText("");
      setStatus("empty");
      setRevision(0);
      setNotice("The saved letter has been removed from this browser.");
    } catch {
      setStatus("error");
      setNotice(
        "This browser could not remove the saved copy. Your words have been kept here so you can download them.",
      );
    }
  }

  const statusText = {
    empty: "A blank page. No pressure to fill it.",
    saving: "Keeping your words…",
    saved: "Your words are saved in this browser.",
    error:
      "Browser saving is unavailable. Keep this page open and download your words before leaving.",
  }[status];

  return (
    <section
      id="self-letter"
      className="self-letter-section section-wrap"
      aria-labelledby="self-letter-heading"
    >
      <div className="self-letter-intro">
        <span className="eyebrow">YOUR VOICE BELONGS HERE, TOO</span>
        <h2 id="self-letter-heading">
          A letter only <em>you</em>
          <br />
          can write.
        </h2>
        <p>
          Everyone has something to say about your future.
          <br />
          This little page is for what you want to say to yourself.
        </p>
        <span className="self-letter-handwritten">
          No beautiful words needed. Just your own.
        </span>
        <div className="self-letter-starters">
          <h3>Need somewhere to begin?</h3>
          <p>
            Optional starting lines. Tap one to add it, then change it however
            you like.
          </p>
          {starters.map((starter) => (
            <button
              key={starter}
              type="button"
              onClick={() => useStarter(starter)}
            >
              {starter}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
      <div className="self-letter-paper">
        <div className="self-letter-paper-top">
          <span aria-hidden="true">♡</span>
          <span>FROM YOU, TO YOU</span>
          <span aria-hidden="true">✧</span>
        </div>
        <label htmlFor="self-letter-body">Dear me,</label>
        <textarea
          ref={field}
          id="self-letter-body"
          value={text}
          onChange={(event) => update(event.target.value)}
          placeholder="What would you tell yourself if you spoke with the kindness you give someone you love?"
          aria-describedby="self-letter-saving self-letter-storage"
          spellCheck
        />
        <p
          id="self-letter-saving"
          className={`self-letter-save-status ${status === "error" ? "error" : ""}`}
          role="status"
          aria-live="polite"
        >
          {statusText}
        </p>
        <div className="self-letter-actions">
          <button
            type="button"
            className="button secondary"
            disabled={!text.trim()}
            onClick={download}
          >
            Keep a copy <span aria-hidden="true">↓</span>
          </button>
          <button
            type="button"
            className="self-letter-delete"
            disabled={!text}
            onClick={remove}
          >
            Delete this letter
          </button>
        </div>
        <p id="self-letter-storage" className="self-letter-storage">
          Only on this browser; not synced. Nothing you write is sent to anyone.
          Shared-device users can read a saved letter. Clearing browser data
          removes it.
        </p>
        {notice && (
          <p className="self-letter-notice" role="status">
            {notice}
          </p>
        )}
      </div>
    </section>
  );
}

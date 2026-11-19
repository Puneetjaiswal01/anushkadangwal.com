import React, { useEffect, useRef, useState } from "react";
import "./your-space.css";

const LETTER_KEY = "anushka-self-letter-v1";
const WISHES_KEY = "anushka-little-wishes-v1";
const startingLines = [
  { label: "What I need today", text: "Dear me,\n\nToday, I think I need…" },
  {
    label: "Something to remember",
    text: "Dear me,\n\nWhen I forget how far I’ve come, I want to remember…",
  },
  {
    label: "A little promise",
    text: "Dear me,\n\nOne small promise I want to make to myself is…",
  },
];
const wishSparks = [
  "A slow Sunday morning",
  "Our next little adventure",
  "A song on repeat",
];

function readLetter() {
  try {
    const raw = localStorage.getItem(LETTER_KEY);
    if (!raw) return { text: "", status: "empty" };
    const record = JSON.parse(raw);
    if (record?.version !== 1 || typeof record.text !== "string")
      return { text: "", status: "unreadable" };
    return { text: record.text, status: "saved" };
  } catch {
    return { text: "", status: "unavailable" };
  }
}
function readWishes() {
  try {
    const raw = localStorage.getItem(WISHES_KEY);
    if (!raw) return { items: [], status: "empty" };
    const record = JSON.parse(raw);
    if (
      record?.version !== 1 ||
      !Array.isArray(record.items) ||
      record.items.some(
        (item) => typeof item?.id !== "string" || typeof item.text !== "string",
      )
    )
      return { items: [], status: "unreadable" };
    return { items: record.items, status: "saved" };
  } catch {
    return { items: [], status: "unavailable" };
  }
}
function indiaDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
function LittleIcon({ name, ...props }) {
  const paths = {
    arrow: "M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4",
    pen: "m15 3 6 6L9 21H3v-6Zm-9 9 6 6M13 5l6 6",
    heart: "M12 20 3.8 12A5 5 0 0 1 11 5l1 1 1-1a5 5 0 0 1 7.2 7Z",
    plus: "M12 5v14M5 12h14",
    close: "m6 6 12 12M6 18 18 6",
    northeast: "M5 19 19 5M5 5h14v14",
  };
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.heart} />
    </svg>
  );
}

export default function YourSpace() {
  const [firstLetter] = useState(readLetter),
    [firstWishes] = useState(readWishes);
  const [text, setText] = useState(firstLetter.text),
    [letterStatus, setLetterStatus] = useState(firstLetter.status),
    [letterNotice, setLetterNotice] = useState("");
  const [wishes, setWishes] = useState(firstWishes.items),
    [wishText, setWishText] = useState(""),
    [wishesStatus, setWishesStatus] = useState(firstWishes.status),
    [wishNotice, setWishNotice] = useState("");
  const [revision, setRevision] = useState(0);
  const [editingWish, setEditingWish] = useState(null),
    [editedWishText, setEditedWishText] = useState("");
  const letter = useRef({ text: firstLetter.text, dirty: false });
  const list = useRef({ items: firstWishes.items, dirty: false });
  const field = useRef(null),
    wishField = useRef(null);

  function saveLetter(announce = true) {
    if (!letter.current.dirty) return true;
    try {
      localStorage.setItem(
        LETTER_KEY,
        JSON.stringify({
          version: 1,
          text: letter.current.text,
          savedAt: new Date().toISOString(),
        }),
      );
      letter.current.dirty = false;
      if (announce) setLetterStatus("saved");
      return true;
    } catch {
      if (announce) setLetterStatus("unavailable");
      return false;
    }
  }
  function saveWishes(announce = true) {
    if (!list.current.dirty) return true;
    try {
      localStorage.setItem(
        WISHES_KEY,
        JSON.stringify({
          version: 1,
          items: list.current.items,
          savedAt: new Date().toISOString(),
        }),
      );
      list.current.dirty = false;
      if (announce) setWishesStatus("saved");
      return true;
    } catch {
      if (announce) setWishesStatus("unavailable");
      return false;
    }
  }
  useEffect(() => {
    if (!revision) return;
    const timer = setTimeout(() => saveLetter(), 500);
    return () => clearTimeout(timer);
  }, [revision]);
  useEffect(() => {
    const flush = () => {
      saveLetter();
      saveWishes();
    };
    const hidden = () => {
      if (document.hidden) flush();
    };
    const leaving = (event) => {
      const letterSaved = saveLetter(),
        wishesSaved = saveWishes();
      if (!letterSaved || !wishesSaved) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", hidden);
    window.addEventListener("beforeunload", leaving);
    return () => {
      saveLetter(false);
      saveWishes(false);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", hidden);
      window.removeEventListener("beforeunload", leaving);
    };
  }, []);

  function updateLetter(next) {
    letter.current = { text: next, dirty: true };
    setText(next);
    setLetterStatus("saving");
    setLetterNotice("");
    setRevision((value) => value + 1);
  }
  function addStarter(starter) {
    updateLetter(
      text.trim()
        ? `${text}\n\n${starter.replace(/^Dear me,\n\n/, "")}`
        : starter,
    );
    requestAnimationFrame(() => {
      field.current?.focus();
      field.current?.setSelectionRange(
        field.current.value.length,
        field.current.value.length,
      );
    });
  }
  function clearLetter() {
    if (
      !text ||
      !confirm(
        "Delete this letter from this browser? Keep a text copy first if you want to save it.",
      )
    )
      return;
    try {
      localStorage.removeItem(LETTER_KEY);
      letter.current = { text: "", dirty: false };
      setText("");
      setRevision(0);
      setLetterStatus("empty");
      setLetterNotice("The saved letter has been removed from this browser.");
    } catch {
      setLetterNotice(
        "This browser could not remove the saved copy. Your words are still here; you can keep a text copy below.",
      );
    }
  }
  function download(content, filename, onNotice) {
    try {
      const url = URL.createObjectURL(
        new Blob([content], { type: "text/plain;charset=utf-8" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      onNotice(
        "Your text copy is ready. Keep it somewhere you can find it again.",
      );
    } catch {
      onNotice(
        "The copy could not download. Your words are still here to select and copy.",
      );
    }
  }
  function addWish(value) {
    const clean = value.trim();
    if (!clean) {
      wishField.current?.focus();
      return;
    }
    const id =
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const next = [...list.current.items, { id, text: clean }];
    list.current = { items: next, dirty: true };
    setWishes(next);
    setWishText("");
    setWishNotice("");
    saveWishes();
    wishField.current?.focus();
  }
  function beginWishEdit(item) {
    setEditingWish(item.id);
    setEditedWishText(item.text);
  }
  function finishWishEdit() {
    const clean = editedWishText.trim();
    if (!clean) return;
    const next = list.current.items.map((item) =>
      item.id === editingWish ? { ...item, text: clean } : item,
    );
    list.current = { items: next, dirty: true };
    setWishes(next);
    setWishNotice("");
    setEditingWish(null);
    saveWishes();
  }
  function removeWish(id) {
    if (editingWish === id) setEditingWish(null);
    const next = list.current.items.filter((item) => item.id !== id);
    list.current = { items: next, dirty: true };
    setWishes(next);
    setWishNotice("");
    saveWishes();
  }
  const letterMessages = {
    empty: "A blank page. No pressure to fill it.",
    saving: "Keeping your words…",
    saved: "Your letter is saved in this browser.",
    unavailable:
      "Browser saving is unavailable. Keep this page open and download a copy before leaving.",
    unreadable:
      "The saved letter could not be opened. Nothing has been overwritten.",
  };
  const wishesMessages = {
    empty: "A little room for things you haven’t met yet.",
    saved: "Your little list is saved in this browser.",
    unavailable:
      "These changes stay for this visit. Browser saving is unavailable; keep a text copy before leaving.",
    unreadable:
      "The saved list could not be opened. Nothing has been overwritten.",
  };

  return (
    <section className="your-space" aria-labelledby="your-space-title">
      <header className="your-space-heading">
        <span className="your-space-eyebrow">
          A LITTLE ROOM THAT BELONGS TO YOU
        </span>
        <h1 id="your-space-title">
          Your words.
          <br />
          <em>Your own little world.</em>
        </h1>
        <p>
          Not what anyone needs you to be.
          <br />
          Just what’s on your heart, in your own handwriting.
        </p>
      </header>
      <div className="your-space-letter-layout">
        <aside className="your-space-margin">
          <span className="your-space-margin-icon" aria-hidden="true">
            <LittleIcon name="pen" width="28" height="28" />
          </span>
          <h2>
            A letter only
            <br />
            <em>you can write.</em>
          </h2>
          <p>
            Say the thing you haven’t found the words for. Or write about the
            ordinary, lovely bits of today.
          </p>
          <p>
            It doesn’t need to be wise.
            <br />
            It only needs to sound like you.
          </p>
          <div className="your-space-starters">
            <h3>Borrow a first line, if you like.</h3>
            <p>Optional starters to edit, not a letter written for you.</p>
            {startingLines.map((starter) => (
              <button
                key={starter.label}
                type="button"
                onClick={() => addStarter(starter.text)}
              >
                {starter.label}
                <LittleIcon name="northeast" width="14" height="14" />
              </button>
            ))}
          </div>
          <span className="your-space-margin-note">
            messy words are welcome here.
          </span>
        </aside>
        <div className="your-space-paper">
          <span className="your-space-tape" aria-hidden="true" />
          <div className="your-space-paper-meta">
            <span>FROM YOU, TO YOU</span>
            <time dateTime={indiaDate()}>
              {new Intl.DateTimeFormat("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(new Date())}
            </time>
          </div>
          <label htmlFor="self-letter-body">Dear me,</label>
          <textarea
            ref={field}
            id="self-letter-body"
            value={text}
            onChange={(event) => updateLetter(event.target.value)}
            onBlur={() => saveLetter()}
            placeholder="What would you say to yourself if you spoke with the kindness you give someone you love?"
            aria-describedby="your-letter-status your-letter-storage"
            spellCheck
          />
          <div className="your-space-paper-bottom">
            <span aria-hidden="true">♡</span>
            <p>There’s no right way to begin.</p>
          </div>
          <p
            id="your-letter-status"
            className={`your-space-status ${["unavailable", "unreadable"].includes(letterStatus) ? "is-warning" : ""}`}
            role="status"
            aria-live="polite"
          >
            {letterMessages[letterStatus]}
          </p>
          <div className="your-space-letter-actions">
            <button
              className="your-space-download"
              type="button"
              disabled={!text.trim()}
              onClick={() =>
                download(
                  `A letter to myself\n${indiaDate()}\n\n${text}\n`,
                  `Anushka-a-letter-to-myself-${indiaDate()}.txt`,
                  setLetterNotice,
                )
              }
            >
              Keep a text copy <LittleIcon name="arrow" />
            </button>
            <button
              className="your-space-clear"
              type="button"
              disabled={!text}
              onClick={clearLetter}
            >
              Delete this letter
            </button>
          </div>
          <p id="your-letter-storage" className="your-space-storage">
            Saved only in this browser, not sent or synced. Someone using this
            device can read a saved letter. Clearing browser data removes it.
          </p>
          {letterNotice && (
            <p className="your-space-notice" role="status">
              {letterNotice}
            </p>
          )}
        </div>
      </div>
      <section
        className="your-space-wishes"
        aria-labelledby="your-wishes-title"
      >
        <div className="your-space-wishes-heading">
          <span className="your-space-eyebrow">
            LEAVE A LITTLE ROOM FOR LOVELY THINGS
          </span>
          <h2 id="your-wishes-title">
            Little things
            <br />
            <em>to look forward to.</em>
          </h2>
          <p>
            Not another list of things to achieve.
            <br />
            Just a few things you’d like life to have more of.
          </p>
          <span className="your-space-wishes-flower" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="your-space-wishes-card">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addWish(wishText);
            }}
          >
            <label htmlFor="little-wish-input">
              Something you’d like to make room for
            </label>
            <div className="your-space-wish-input">
              <input
                ref={wishField}
                id="little-wish-input"
                value={wishText}
                onChange={(event) => setWishText(event.target.value)}
                placeholder="A place, a small joy, a someday…"
              />
              <button
                type="submit"
                disabled={!wishText.trim()}
                aria-label="Add this little wish"
              >
                <LittleIcon name="plus" />
              </button>
            </div>
          </form>
          {wishes.length ? (
            <ul className="your-space-wish-list">
              {wishes.map((item) => (
                <li key={item.id}>
                  <span className="your-space-wish-heart" aria-hidden="true">
                    ♡
                  </span>
                  {editingWish === item.id ? (
                    <form
                      className="your-space-wish-edit"
                      onSubmit={(event) => {
                        event.preventDefault();
                        finishWishEdit();
                      }}
                    >
                      <label htmlFor="little-wish-edit">
                        Make this little wish your own
                      </label>
                      <input
                        id="little-wish-edit"
                        value={editedWishText}
                        onChange={(event) =>
                          setEditedWishText(event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Escape") {
                            event.preventDefault();
                            setEditingWish(null);
                          }
                        }}
                        autoFocus
                      />
                      <div>
                        <button type="submit" disabled={!editedWishText.trim()}>
                          Save wish
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingWish(null)}
                        >
                          Cancel edit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <span>{item.text}</span>
                  )}
                  <div className="your-space-wish-row-actions">
                    {editingWish !== item.id && (
                      <button
                        type="button"
                        aria-label={`Edit wish: ${item.text}`}
                        onClick={() => beginWishEdit(item)}
                      >
                        <LittleIcon name="pen" width="14" height="14" />
                      </button>
                    )}
                    <button
                      type="button"
                      aria-label={`Remove wish: ${item.text}`}
                      onClick={() => removeWish(item.id)}
                    >
                      <LittleIcon name="close" width="15" height="15" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="your-space-wishes-empty">
              <LittleIcon name="heart" width="27" height="27" />
              <p>
                Your list can start small.
                <br />
                One lovely thing is plenty.
              </p>
            </div>
          )}
          <div className="your-space-wish-sparks">
            <p>A few ideas, only if they feel like you:</p>
            {wishSparks.map((spark) => (
              <button key={spark} type="button" onClick={() => addWish(spark)}>
                {spark}
                <span aria-hidden="true"> +</span>
              </button>
            ))}
          </div>
          <p
            className={`your-space-status ${["unavailable", "unreadable"].includes(wishesStatus) ? "is-warning" : ""}`}
            role="status"
            aria-live="polite"
          >
            {wishesMessages[wishesStatus]}
          </p>
          {wishes.length > 0 && (
            <button
              className="your-space-list-download"
              type="button"
              onClick={() =>
                download(
                  `Little things to look forward to\n${indiaDate()}\n\n${wishes.map((item) => `♡ ${item.text}`).join("\n")}\n`,
                  `Anushka-little-wishes-${indiaDate()}.txt`,
                  setWishNotice,
                )
              }
            >
              Keep a copy of this list{" "}
              <LittleIcon name="arrow" width="15" height="15" />
            </button>
          )}
          <p className="your-space-storage">
            Your wishes stay in this browser too. They are not a cloud backup.
          </p>
          {wishNotice && (
            <p className="your-space-notice" role="status">
              {wishNotice}
            </p>
          )}
        </div>
      </section>
      <p className="your-space-footer-note">
        A little more room for the person you are becoming.{" "}
        <span aria-hidden="true">♡</span>
      </p>
    </section>
  );
}

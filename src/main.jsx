import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/caveat/latin-500.css";
import { letters, reminders, examDays } from "./content";
import "./styles.css";

function Icon({ name, ...props }) {
  const paths = {
    heart:
      "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    moon: "M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10Z",
    close: "m6 6 12 12M6 18 18 6",
    leaf: "M20 3C9 2 2 7 5 15c8 5 16-2 15-12ZM4 21l11-12",
    star: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z",
    check: "m5 12 4 4L19 6",
  };
  return (
    <svg
      width="20"
      height="20"
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
function Garden() {
  return (
    <svg
      className="garden"
      viewBox="0 0 580 540"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="sky"
          x1="290"
          y1="30"
          x2="290"
          y2="485"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c9b5df" />
          <stop offset=".55" stopColor="#e4d6ed" />
          <stop offset="1" stopColor="#f8e9e7" />
        </linearGradient>
        <radialGradient id="moon">
          <stop stopColor="#fffef4" />
          <stop offset="1" stopColor="#fdf3df" />
        </radialGradient>
        <linearGradient id="hill">
          <stop stopColor="#a699ba" />
          <stop offset="1" stopColor="#c4b9d5" />
        </linearGradient>
        <clipPath id="arch">
          <path d="M103 482V223a187 187 0 0 1 374 0v259Z" />
        </clipPath>
      </defs>
      <path
        d="M85 482V221a205 205 0 0 1 410 0v261"
        stroke="#d4c6e3"
        strokeWidth="1"
      />
      <g clipPath="url(#arch)">
        <path fill="url(#sky)" d="M103 30h374v452H103z" />
        <circle cx="306" cy="166" r="63" fill="#fffaf0" opacity=".1" />
        <circle cx="306" cy="166" r="48" fill="#fffaf0" opacity=".16" />
        <circle cx="306" cy="166" r="34" fill="url(#moon)" />
        <path
          d="M73 410c91-79 149-35 213-6 74-90 151-95 214-21v125H73Z"
          fill="#cabbd5"
        />
        <path
          d="M72 449c88-109 196-19 262-19 69-40 128-31 170-5v84H72Z"
          fill="url(#hill)"
        />
        <path
          d="M103 475c67-27 135-14 203-3 70-21 125-12 171-2v18H103Z"
          fill="#90869e"
          opacity=".5"
        />
        <g stroke="#fff8ed" strokeLinecap="round">
          <path d="M183 153v9m-4.5-4.5h9m210 90v11m-5.5-5.5h11M228 284v7m-3.5-3.5h7M379 104v6m-3-3h6" />
          <path d="m156 254 2 3 2-3-2-3Zm265-69 2 3 2-3-2-3Z" fill="#fff8ed" />
        </g>
        <g fill="#fffaf1" opacity=".8">
          <circle cx="231" cy="104" r="1.5" />
          <circle cx="352" cy="268" r="1.5" />
          <circle cx="164" cy="321" r="1" />
          <circle cx="424" cy="306" r="1.5" />
          <circle cx="345" cy="79" r="1" />
        </g>
      </g>
      <g stroke="#7e8d78" strokeWidth="1.7" strokeLinecap="round">
        <path d="M101 482c-12-55-31-95-55-122m50 98c-40-29-57-65-58-93m51 73c-4-31-19-59-41-80" />
        <path
          d="M72 408c-18 2-36-15-36-28 18 1 32 10 36 28Zm13 24c-4-23 6-43 16-48 8 21 2 40-16 48ZM54 382c-16-1-31-15-33-30 18 2 30 12 33 30Zm45 80c-30 0-47-12-51-27 25-3 43 6 51 27Z"
          fill="#a9b49b"
          stroke="none"
        />
        <path d="M463 482c8-57 38-101 65-125m-49 87c2-43 16-67 36-89m-24 61c26-7 42-23 55-44" />
        <path
          d="M487 425c-17-20-13-38-5-48 14 12 19 30 5 48Zm22-34c-6-27 3-43 14-48 8 19 8 35-14 48Zm-32 67c24-1 43-14 47-30-22-1-40 9-47 30Zm52-80c16-2 31-20 30-33-20 4-30 15-30 33Z"
          fill="#b0bba2"
          stroke="none"
        />
      </g>
      <g stroke="#bba0c5" strokeWidth="1.4">
        <path d="M133 484c1-52 6-79 16-103m-9 51-21-20m16 42 25-20M438 484c-2-32-10-54-19-71" />
        <path
          d="M149 382c-22-2-20-17-9-17-3-15 12-19 15-5 12-9 22 5 9 12 13 5 4 19-8 11-1 12-14 12-14 2"
          fill="#d5b5c9"
          stroke="none"
        />
        <circle cx="151" cy="374" r="3" fill="#f8ebcb" />
        <path
          d="M420 415c-15-2-14-12-6-12-2-11 9-13 11-4 9-6 15 4 6 9 9 3 3 13-6 7-1 9-10 9-10 1"
          fill="#c4b4d5"
          stroke="none"
        />
      </g>
      <path d="m367 331 7-6 9 1-7 5-4 8-1-6Z" fill="#fff7ee" />
      <path d="m213 218 5-4 6 1-5 3-2 6-1-5Z" fill="#fff7ee" />
      <path d="M92 488h397" stroke="#cabcd5" />
      <text
        x="290"
        y="522"
        textAnchor="middle"
        fill="#84728f"
        fontSize="17"
        fontFamily="Caveat, cursive"
      >
        a little place where you can just be.
      </text>
    </svg>
  );
}
function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
function readSaved() {
  try {
    const v = JSON.parse(localStorage.getItem("anushka-kindness-v1") || "[]");
    return Array.isArray(v)
      ? v.filter((x) => Number.isInteger(x) && x >= 0 && x < reminders.length)
      : [];
  } catch {
    return [];
  }
}
function App() {
  const [activeLetter, setActiveLetter] = useState(null),
    [quote, setQuote] = useState(0),
    [saved, setSaved] = useState(readSaved),
    [storageError, setStorageError] = useState(false),
    [menu, setMenu] = useState(false),
    [breathing, setBreathing] = useState(false),
    [elapsed, setElapsed] = useState(0),
    [complete, setComplete] = useState(false),
    [toast, setToast] = useState("");
  const dialog = useRef(null),
    lastFocus = useRef(null),
    timer = useRef(null),
    toastTimer = useRef(null),
    quoteBag = useRef([]);
  const notify = (text) => {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3500);
  };
  useEffect(
    () => () => {
      clearTimeout(toastTimer.current);
      clearInterval(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (activeLetter) {
      lastFocus.current = document.activeElement;
      dialog.current.showModal();
      dialog.current.scrollTop = 0;
    } else if (dialog.current?.open) dialog.current.close();
  }, [activeLetter]);
  useEffect(() => {
    if (!breathing) return;
    const started = Date.now();
    timer.current = setInterval(() => {
      const seconds = Math.floor((Date.now() - started) / 1000);
      if (seconds >= 60) {
        clearInterval(timer.current);
        setBreathing(false);
        setElapsed(60);
        setComplete(true);
      } else setElapsed(seconds);
    }, 200);
    return () => clearInterval(timer.current);
  }, [breathing]);
  const closeLetter = () => {
    setActiveLetter(null);
    lastFocus.current?.focus();
  };
  function nextQuote() {
    if (!quoteBag.current.length)
      quoteBag.current = reminders
        .map((_, i) => i)
        .filter((i) => i !== quote)
        .sort(() => Math.random() - 0.5);
    setQuote(quoteBag.current.pop());
  }
  function toggleSave(index) {
    const next = saved.includes(index)
      ? saved.filter((x) => x !== index)
      : [...saved, index];
    setSaved(next);
    try {
      localStorage.setItem("anushka-kindness-v1", JSON.stringify(next));
      setStorageError(false);
      notify(
        next.includes(index)
          ? "Tucked into your saved reminders ♡"
          : "Removed from saved reminders",
      );
    } catch {
      setStorageError(true);
      notify("Saved for this visit. Browser storage is unavailable.");
    }
  }
  const phase = elapsed % 10 < 4 ? "Breathe in" : "Breathe out";
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to the good stuff
      </a>
      <div className="top-note">
        <span>✧</span> No expectations here. Just a little love. <span>✧</span>
      </div>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Always Anushka home">
          <span className="brand-mark">
            a<span>✧</span>
          </span>
          <span>
            always, anushka<small>A LITTLE WORLD FOR YOU</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          aria-controls="main-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "×" : "☰"}
        </button>
        <nav
          id="main-nav"
          className={menu ? "open" : ""}
          aria-label="Main navigation"
        >
          {[
            ["home", "Your little world"],
            ["letters", "Letters for you"],
            ["reminders", "Gentle reminders"],
            ["quiet", "A quiet corner"],
          ].map(([id, label]) => (
            <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-heart"
            href="#always"
            aria-label="A promise for you"
            onClick={() => setMenu(false)}
          >
            <Icon name="heart" />
          </a>
        </nav>
      </header>
      <main id="main">
        <section id="home" className="hero section-wrap">
          <div className="hero-copy">
            <span className="pill">
              <span className="tiny-star">✦</span> MADE OF LOVE. MADE FOR YOU.
            </span>
            <h1>
              Before anything else,
              <br />
              you are <em>Anushka.</em>
              <span className="hero-star" aria-hidden="true">
                ✧
              </span>
            </h1>
            <p className="hero-description">
              Not a score. Not a college name. Not a result.
              <br />A whole, wonderful person. And so, so loved.
            </p>
            <p className="handwritten">Today. Tomorrow. Exactly as you are.</p>
            <div className="hero-actions">
              <button
                className="button primary"
                onClick={() => setActiveLetter(letters[0])}
              >
                A letter for you <Icon name="arrow" />
              </button>
              <a className="text-link" href="#quiet">
                Take a little breath <span>↗</span>
              </a>
            </div>
            <div className="hero-footnote">
              <span>♡</span> A soft landing, whenever the world feels a little
              loud.
            </div>
          </div>
          <div className="hero-art">
            <span className="art-note">you belong here.</span>
            <Garden />
            <div className="floating-note">
              <Icon name="heart" />
              <div>
                For the person you are.
                <small>Never just the things you achieve.</small>
              </div>
            </div>
          </div>
        </section>
        <section
          className="love-strip"
          aria-label="Things that will not change"
        >
          <span>
            <Icon name="heart" /> I’ll love you the same.
          </span>
          <i>✧</i>
          <span>
            Your parents love <em>you.</em>
          </span>
          <i>✧</i>
          <span>A degree doesn’t define a life.</span>
        </section>
        <section id="letters" className="section-wrap letters-section">
          <SectionHeading
            eyebrow="A FEW THINGS I HOPE YOU NEVER FORGET"
            title={
              <>
                Some days need
                <br />a little <em>letter.</em>
              </>
            }
          >
            Open whichever one feels like today. There’s no right order.
          </SectionHeading>
          <div className="letters-grid">
            {letters.map((letter, i) => (
              <button
                key={letter.id}
                className={"letter-card " + letter.color}
                onClick={() => setActiveLetter(letter)}
              >
                <div className="letter-top">
                  <span className="envelope" aria-hidden="true">
                    <svg viewBox="0 0 90 64">
                      <rect x="5" y="8" width="80" height="50" rx="3" />
                      <path d="m5 10 40 28 40-28M5 58l27-23m53 23L58 35" />
                      <circle cx="45" cy="37" r="9" />
                      <text x="45" y="41" textAnchor="middle">
                        ♡
                      </text>
                    </svg>
                  </span>
                  <span className="letter-number">0{i + 1}</span>
                </div>
                <span className="eyebrow">{letter.label}</span>
                <h3>{letter.title}</h3>
                <p>{letter.preview}</p>
                <span className="open-letter">
                  Open when you need it <Icon name="arrow" />
                </span>
              </button>
            ))}
          </div>
          <p className="section-footnote">
            Little letters. Big love. Read them as many times as you need. ♡
          </p>
        </section>
        <section id="reminders" className="reminders-section">
          <div className="section-wrap reminders-layout">
            <div className="reminders-intro">
              <span className="eyebrow">A POCKETFUL OF KINDNESS</span>
              <h2>
                A little reminder.
                <br />
                Just for <em>right now.</em>
              </h2>
              <p>
                For the noisy thoughts and the not-enough days.
                <br />
                Take a thought that’s a little gentler.
              </p>
              <div className="jar-illustration" aria-hidden="true">
                <span>✧</span>
                <div className="jar">
                  <i>you are enough</i>
                  <b>♡</b>
                  <i>one day at a time</i>
                </div>
                <span>✦</span>
              </div>
            </div>
            <div className="quote-area">
              <div className="quote-card">
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <p key={quote} className="quote-text" aria-live="polite">
                  {reminders[quote]}
                </p>
                <span className="quote-signature">
                  a tiny truth to keep close
                </span>
                <button
                  className={
                    "save-quote " + (saved.includes(quote) ? "saved" : "")
                  }
                  onClick={() => toggleSave(quote)}
                  aria-label={
                    saved.includes(quote)
                      ? "Unsave this reminder"
                      : "Save this reminder"
                  }
                  aria-pressed={saved.includes(quote)}
                >
                  <Icon name="heart" />
                </button>
              </div>
              <div className="quote-controls">
                <button className="button secondary" onClick={nextQuote}>
                  Another little reminder <Icon name="star" />
                </button>
                <span>All words written for this little world.</span>
              </div>
              {saved.length > 0 && (
                <details className="saved-reminders">
                  <summary>
                    Your saved reminders <span>{saved.length} ♡</span>
                  </summary>
                  <p>Kept in this browser, just for you.</p>
                  {saved.map((index) => (
                    <div key={index}>
                      <p>{reminders[index]}</p>
                      <button
                        onClick={() => toggleSave(index)}
                        aria-label={
                          "Remove saved reminder: " + reminders[index]
                        }
                      >
                        <Icon name="close" />
                      </button>
                    </div>
                  ))}
                </details>
              )}
              {storageError && (
                <p role="status" className="storage-note">
                  Your browser couldn’t store these. They’ll stay for this
                  visit.
                </p>
              )}
            </div>
          </div>
        </section>
        <section id="quiet" className="section-wrap quiet-section">
          <div className="quiet-card">
            <div className="quiet-copy">
              <span className="eyebrow">
                <Icon name="leaf" /> NOTHING TO ACHIEVE HERE
              </span>
              <h2>
                The world can wait
                <br />
                for <em>one minute.</em>
              </h2>
              <p>
                Let your shoulders soften. Find a comfortable breath.
                <br />
                You don’t have to solve anything right now.
              </p>
              <p className="breathing-note">
                A gentle rhythm: 4 seconds in, 6 seconds out.
                <br />
                No holding. No pressure. Your own pace is always okay.
              </p>
              <button
                className="button primary"
                onClick={() => {
                  if (breathing) {
                    setBreathing(false);
                    setElapsed(0);
                  } else {
                    setComplete(false);
                    setElapsed(0);
                    setBreathing(true);
                  }
                }}
              >
                {breathing
                  ? "Stop for now"
                  : complete
                    ? "Another quiet minute"
                    : "Let’s take a breath"}
                <Icon name="leaf" />
              </button>
              <span className="quiet-disclaimer">
                If the rhythm feels uncomfortable, stop and breathe normally.
              </span>
            </div>
            <div
              className={"breathing-space " + (breathing ? "breathing" : "")}
            >
              <div className="breath-ring ring-one" />
              <div className="breath-ring ring-two" />
              <div className="breath-orb">
                <Icon
                  name={complete ? "heart" : "leaf"}
                  width="28"
                  height="28"
                />
                <span aria-live="polite">
                  {breathing ? phase : complete ? "Welcome back." : "Just be."}
                </span>
                <small>
                  {breathing
                    ? `${60 - elapsed} seconds of quiet`
                    : complete
                      ? "Nothing more needed."
                      : "You’re allowed to slow down."}
                </small>
              </div>
              <p>
                {breathing
                  ? "Follow gently. Or just sit here."
                  : complete
                    ? "A little moment, just for you."
                    : "A soft pause in a busy world."}
              </p>
            </div>
          </div>
        </section>
        <section className="exam-section section-wrap">
          <SectionHeading
            eyebrow="FOR THE DAYS THAT FEEL BIG"
            title={
              <>
                Dates on a calendar.
                <br />
                Not the measure of <em>you.</em>
              </>
            }
          >
            Your dreams matter. So does the person carrying them.
          </SectionHeading>
          <div className="exam-grid">
            {examDays.map((day) => (
              <article className="exam-card" key={day.date}>
                <time dateTime={day.date}>
                  <b>{day.day}</b>
                  <span>{day.month} 2026</span>
                </time>
                <h3>{day.name}</h3>
                <p>{day.note}</p>
                <button
                  className="text-link"
                  onClick={() => setActiveLetter(letters[1])}
                >
                  A note for this day <Icon name="arrow" width="15" />
                </button>
              </article>
            ))}
          </div>
          <p className="section-footnote">
            Your dates, held gently. No countdowns. No ticking clocks.
          </p>
        </section>
        <section id="always" className="always-section">
          <div className="always-stars" aria-hidden="true">
            ✧ <span>♡</span> ✧
          </div>
          <span className="eyebrow">IF YOU REMEMBER JUST ONE THING</span>
          <h2>
            The result may change.
            <br />
            The love <em>won’t.</em>
          </h2>
          <p>
            I’ll love you the same. Your parents love you the same.
            <br />
            Before every exam. After every result. On every ordinary day in
            between.
          </p>
          <p className="handwritten">
            You are Anushka. That’s more than enough.
          </p>
          <button
            className="button secondary"
            onClick={() => setActiveLetter(letters[5])}
          >
            One more little letter <Icon name="heart" />
          </button>
          <span className="always-flower" aria-hidden="true">
            ❀
          </span>
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <a className="footer-brand" href="#home">
          always, anushka <span>♡</span>
        </a>
        <span>Made with love. No conditions attached.</span>
        <a href="#home">Back to your little world ↑</a>
      </footer>
      <dialog
        ref={dialog}
        className="letter-dialog"
        aria-labelledby="letter-title"
        onCancel={closeLetter}
        onClose={() => {
          if (activeLetter) closeLetter();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) closeLetter();
        }}
      >
        <button
          className="dialog-close"
          onClick={closeLetter}
          aria-label="Close letter"
        >
          <Icon name="close" />
        </button>
        {activeLetter && (
          <article className="letter-paper">
            <span className="letter-seal" aria-hidden="true">
              {activeLetter.symbol}
            </span>
            <span className="eyebrow">A LETTER, JUST FOR YOU</span>
            <h2 id="letter-title">{activeLetter.title}</h2>
            <p className="salutation">{activeLetter.salutation}</p>
            {activeLetter.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="letter-closing">{activeLetter.closing}</p>
            <div className="letter-bottom">
              <span>Read again whenever you need.</span>
              <button className="text-link" onClick={closeLetter}>
                Keep this close <Icon name="heart" />
              </button>
            </div>
          </article>
        )}
      </dialog>
      <div className={"toast " + (toast ? "visible" : "")} role="status">
        {toast}
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);

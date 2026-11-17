import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/caveat/latin-500.css";
import "@fontsource/noto-serif-devanagari/devanagari-400.css";
import { letters, reminders, examDays } from "./content";
import "./styles.css";
import { HeartStory, ShayariRoom } from "./HeartExperience";
import MusicRoom from "./MusicRoom";
import SelfLetter from "./SelfLetter";
import InstallApp from "./InstallApp";
import { Icon, Garden } from "./Illustrations";
import "./app-ui.css";
import HomeSong from "./HomeSong";
import WelcomeGate from "./WelcomeGate";

const rooms = [
  {
    id: "home",
    label: "Home",
    name: "Your little world",
    icon: "home",
    note: "Come as you are",
  },
  {
    id: "letters",
    label: "Letters",
    name: "Letters for you",
    icon: "letter",
    note: "A few things I mean",
  },
  {
    id: "shayari",
    label: "Shayari",
    name: "Shayari & love",
    icon: "poetry",
    note: "Dil se, tumhare liye",
  },
  {
    id: "music",
    label: "Music",
    name: "A little music",
    icon: "music",
    note: "Some quiet company",
  },
  {
    id: "self-letter",
    label: "My words",
    name: "From you, to you",
    icon: "pen",
    note: "Your voice belongs here",
  },
];
function RoomIcon({ name }) {
  const paths = {
    home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
    letter: "M3 5h18v14H3Zm0 1 9 7 9-7",
    poetry: "M12 4c-5-3-9-2-9-2v17s4-1 9 2c5-3 9-2 9-2V2s-4-1-9 2Zm0 0v17",
    music:
      "M9 18V5l12-2v13M9 9l12-2M9 18c0 2-2 3-4 3s-3-1-3-2 2-3 4-3 3 1 3 2Zm12-2c0 2-2 3-4 3s-3-1-3-2 2-3 4-3 3 1 3 2Z",
    pen: "m16 3 5 5-12 12-6 1 1-6Zm-9 11 5 5M14 5l5 5",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.home} />
    </svg>
  );
}
function getRoom() {
  const id = location.hash.slice(1);
  return rooms.some((r) => r.id === id) ? id : "home";
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
function App({ onLock }) {
  const [room, setRoom] = useState(getRoom),
    [activeLetter, setActiveLetter] = useState(null),
    [quote, setQuote] = useState(0),
    [saved, setSaved] = useState(readSaved),
    [storageError, setStorageError] = useState(false),
    [breathOpen, setBreathOpen] = useState(false),
    [breathing, setBreathing] = useState(false),
    [elapsed, setElapsed] = useState(0),
    [complete, setComplete] = useState(false),
    [toast, setToast] = useState(""),
    [homePlaying, setHomePlaying] = useState(false),
    [feeling, setFeeling] = useState(null);
  const letterDialog = useRef(null),
    breathDialog = useRef(null),
    lastFocus = useRef(null),
    toastTimer = useRef(null),
    quoteBag = useRef([]);
  useEffect(() => {
    const onHash = () => {
      setRoom(getRoom());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    document.title = `${rooms.find((r) => r.id === room).label} · Always Anushka`;
  }, [room]);
  useEffect(() => {
    if (activeLetter) {
      lastFocus.current = document.activeElement;
      letterDialog.current.showModal();
      letterDialog.current.scrollTop = 0;
    } else letterDialog.current?.close();
  }, [activeLetter]);
  useEffect(() => {
    if (breathOpen) {
      lastFocus.current = document.activeElement;
      breathDialog.current.showModal();
    } else {
      breathDialog.current?.close();
      setBreathing(false);
      setElapsed(0);
    }
  }, [breathOpen]);
  useEffect(() => {
    if (!breathing) return;
    const start = Date.now();
    const interval = setInterval(() => {
      let sec = Math.floor((Date.now() - start) / 1000);
      if (sec >= 60) {
        setBreathing(false);
        setElapsed(60);
        setComplete(true);
      } else setElapsed(sec);
    }, 200);
    return () => clearInterval(interval);
  }, [breathing]);
  useEffect(() => {
    const audio = document.querySelector("#music audio");
    if (!audio) return;
    const sync = () => setHomePlaying(!audio.paused && !audio.ended);
    audio.addEventListener("playing", sync);
    audio.addEventListener("pause", sync);
    audio.addEventListener("ended", sync);
    return () => {
      audio.removeEventListener("playing", sync);
      audio.removeEventListener("pause", sync);
      audio.removeEventListener("ended", sync);
    };
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  function notify(text) {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3500);
  }
  function navigate(id) {
    if (room === id) window.scrollTo({ top: 0, behavior: "smooth" });
    location.hash = id;
  }
  function closeLetter() {
    setActiveLetter(null);
    lastFocus.current?.focus();
  }
  function closeBreath() {
    setBreathOpen(false);
    lastFocus.current?.focus();
  }
  function nextQuote() {
    if (!quoteBag.current.length)
      quoteBag.current = reminders
        .map((_, i) => i)
        .filter((i) => i !== quote)
        .sort(() => Math.random() - 0.5);
    setQuote(quoteBag.current.pop());
  }
  function toggleSave(i) {
    const next = saved.includes(i)
      ? saved.filter((x) => x !== i)
      : [...saved, i];
    setSaved(next);
    try {
      localStorage.setItem("anushka-kindness-v1", JSON.stringify(next));
      setStorageError(false);
      notify(
        next.includes(i)
          ? "Kept with your saved notes ♡"
          : "Removed from your saved notes",
      );
    } catch {
      setStorageError(true);
      notify("Kept for this visit. Browser storage is unavailable.");
    }
  }
  async function homeMusic() {
    const audio = document.querySelector("#music audio");
    if (!audio) return;
    try {
      if (audio.paused) await audio.play();
      else audio.pause();
    } catch {
      notify("The tune couldn’t start. You can try the music room.");
    }
  }
  const feelingMessages = {
    tired:
      "Then let today be a little smaller. Have something to eat. Rest your eyes. You don’t have to tell me you’re fine if you’re not.",
    worried:
      "I know these exams matter to you. I’m with you in wanting it to go well. And I’ll be with you if it doesn’t. You don’t lose my love either way.",
    love: "I love you, Anushka. Not because you’re being brave or doing well. I just do. You can come here on an ordinary Tuesday and hear it again.",
  };
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to your little world
      </a>
      <aside className="app-sidebar">
        <a className="app-brand" href="#home">
          <img
            src="/icons/icon-192.png"
            width="54"
            height="54"
            alt="A little smiling A"
          />
          <span>
            always,
            <br />
            <em>anushka.</em>
          </span>
        </a>
        <span className="app-sidebar-kicker">A PLACE TO JUST BE</span>
        <nav className="app-desktop-nav" aria-label="Your rooms">
          {rooms.map((r, i) => (
            <a
              key={r.id}
              href={"#" + r.id}
              aria-label={r.name}
              aria-current={room === r.id ? "page" : undefined}
            >
              <RoomIcon name={r.icon} />
              <span>
                {r.label}
                <small>{r.note}</small>
              </span>
              <i>0{i + 1}</i>
            </a>
          ))}
        </nav>
        <div className="sidebar-promise">
          <span>♡</span>
          <p>
            No marks.
            <br />
            No expectations.
            <br />
            <em>Just you.</em>
          </p>
        </div>
        <InstallApp className="sidebar-install" />
        <p className="app-sidebar-bottom">
          Made with love.
          <br />
          No conditions attached.
        </p>
      </aside>
      <div className="app-content">
        <header className="app-topbar">
          <a href="#home" className="mobile-app-brand">
            <img src="/icons/icon-192.png" alt="" width="32" height="32" />
            always, anushka
          </a>
          <div className="app-breadcrumb">
            <span>YOUR LITTLE WORLD</span>
            <p>{rooms.find((r) => r.id === room).note}</p>
          </div>
          <div className="app-top-actions">
            <InstallApp className="topbar-install" />
          </div>
        </header>
        <main id="main" tabIndex="-1">
          <div
            className="app-room home-room"
            hidden={room !== "home"}
            data-room="home"
          >
            <div className="app-welcome">
              <div>
                <span className="eyebrow">NOTHING TO PROVE HERE</span>
                <h1>
                  Hey, Anushka<span> ♡</span>
                </h1>
                <p>How’s your heart today?</p>
              </div>
              <span className="welcome-flower" aria-hidden="true">
                ✳︎
              </span>
            </div>
            <div className="home-feature-grid">
              <section
                className="home-night-card"
                aria-labelledby="home-feature-title"
              >
                <span className="home-tiny-note">
                  a little note from me to you
                </span>
                <h2 id="home-feature-title">
                  You can put
                  <br />
                  the brave face
                  <br />
                  <em>down.</em>
                </h2>
                <p>
                  These exams matter.
                  <br />
                  They’re not everything you are.
                  <br />
                  I’ll love you the same.
                </p>
                <button
                  className="home-read-letter"
                  onClick={() => setActiveLetter(letters[0])}
                >
                  A letter for you <Icon name="arrow" />
                </button>
                <div className="home-night-art">
                  <Garden />
                </div>
                <span className="home-star one" aria-hidden="true">
                  ✦
                </span>
                <span className="home-star two" aria-hidden="true">
                  ✧
                </span>
              </section>
              <section
                className="home-daily-note"
                aria-label="A note to keep close"
              >
                <div className="daily-note-top">
                  <span>A THING I MEAN</span>
                  <Icon name="heart" />
                </div>
                <span className="daily-quote-mark" aria-hidden="true">
                  “
                </span>
                <p className="quote-text" key={quote} aria-live="polite">
                  {reminders[quote]}
                </p>
                <span className="daily-note-sign">— me, on all your days</span>
                <div className="daily-note-controls">
                  <button onClick={nextQuote} className="another-note">
                    Another little reminder ↻
                  </button>
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
                {storageError && (
                  <p className="storage-note" role="status">
                    Your browser couldn’t store these. They’ll stay for this
                    visit.
                  </p>
                )}
              </section>
            </div>
            <section className="home-checkin" aria-labelledby="checkin-title">
              <div>
                <span className="eyebrow">
                  YOU DON’T HAVE TO SAY “I’M FINE”
                </span>
                <h2 id="checkin-title">
                  What do you need <em>right now?</em>
                </h2>
              </div>
              <div className="home-feeling-pills">
                <button
                  aria-pressed={feeling === "tired"}
                  onClick={() => setFeeling("tired")}
                >
                  A softer day <span>☁</span>
                </button>
                <button
                  aria-pressed={feeling === "worried"}
                  onClick={() => setFeeling("worried")}
                >
                  A little reassurance <span>✧</span>
                </button>
                <button
                  aria-pressed={feeling === "love"}
                  onClick={() => setFeeling("love")}
                >
                  Just some love <span>♡</span>
                </button>
                <button onClick={() => setBreathOpen(true)}>
                  Take a breath <span>❀</span>
                </button>
              </div>
              {feeling && (
                <p className="home-feeling-answer" aria-live="polite">
                  {feelingMessages[feeling]}
                </p>
              )}
            </section>
            <div className="home-section-label">
              <h2>Stay a little while.</h2>
              <span>There’s no right place to start.</span>
            </div>
            <div className="home-room-cards">
              <a href="#letters" className="room-teaser letters-teaser">
                <span className="teaser-art" aria-hidden="true">
                  <RoomIcon name="letter" />
                  <i>♡</i>
                </span>
                <span className="eyebrow">WORDS I WANT YOU TO KEEP</span>
                <h3>
                  A few letters.
                  <br />
                  All for you.
                </h3>
                <p>
                  For before an exam.
                  <br />
                  For after a hard day.
                  <br />
                  For absolutely no reason.
                </p>
                <span className="teaser-link">
                  Open the letters <span>↗</span>
                </span>
              </a>
              <a href="#shayari" className="room-teaser shayari-teaser">
                <span className="teaser-art" aria-hidden="true">
                  अ<span>✧</span>
                </span>
                <span className="eyebrow">THODI SI MOHABBAT</span>
                <h3>
                  Kuch baatein,
                  <br />
                  <em>dil se.</em>
                </h3>
                <p>
                  Thak jaao toh ruk jaana,
                  <br />
                  Mushkil ho toh keh jaana.
                </p>
                <span className="teaser-link">
                  Read the shayari <span>↗</span>
                </span>
              </a>
              <a href="#self-letter" className="room-teaser words-teaser">
                <span className="teaser-art" aria-hidden="true">
                  a<span>✎</span>
                </span>
                <span className="eyebrow">YOUR VOICE, TOO</span>
                <h3>
                  Dear me,
                  <br />
                  with love.
                </h3>
                <p>
                  A page with no one else’s
                  <br />
                  expectations on it.
                  <br />
                  Just your own words.
                </p>
                <span className="teaser-link">
                  Write to yourself <span>↗</span>
                </span>
              </a>
            </div>
            <HomeSong />
            <section className="home-music-card" aria-label="Music on Home">
              <button
                className={"home-record " + (homePlaying ? "is-playing" : "")}
                aria-label={
                  homePlaying ? "Pause music on Home" : "Play music on Home"
                }
                onClick={homeMusic}
              >
                <span>♡</span>
              </button>
              <div>
                <span className="eyebrow">SOME COMPANY, IF YOU WANT IT</span>
                <h2>A little place to land</h2>
                <p>Our quiet original instrumental. Press play, stay here.</p>
              </div>
              <button
                className="home-music-play"
                onClick={homeMusic}
                aria-label={
                  homePlaying
                    ? "Pause instrumental from Home"
                    : "Play instrumental from Home"
                }
              >
                {homePlaying ? "Ⅱ" : "▷"}
              </button>
              <a href="#music" aria-label="Open the music room">
                More music ↗
              </a>
            </section>
            {saved.length > 0 && (
              <details className="saved-reminders home-saved">
                <summary>
                  Your saved reminders <span>{saved.length} ♡</span>
                </summary>
                <p>Kept in this browser, just for you.</p>
                {saved.map((i) => (
                  <div key={i}>
                    <p>{reminders[i]}</p>
                    <button
                      onClick={() => toggleSave(i)}
                      aria-label={"Remove saved reminder: " + reminders[i]}
                    >
                      <Icon name="close" />
                    </button>
                  </div>
                ))}
              </details>
            )}
            <details className="home-big-days">
              <summary>
                Your big days, held gently <span>+</span>
              </summary>
              <p>Dates on a calendar. Not the measure of you.</p>
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
            </details>
            <p className="home-last-line">
              You are Anushka. That has always been enough. <span>♡</span>
            </p>
          </div>
          <div
            className="app-room letters-room"
            hidden={room !== "letters"}
            data-room="letters"
          >
            <div className="room-heading">
              <span className="eyebrow">
                SOME THINGS DON’T CHANGE WITH A RESULT
              </span>
              <h1>
                All the things
                <br />
                <em>I want you to know.</em>
              </h1>
              <p>Read slowly. Come back whenever you need.</p>
            </div>
            <HeartStory />
            <section id="letters" className="section-wrap letters-section">
              <div className="section-heading">
                <span className="eyebrow">A LITTLE POSTBOX, JUST FOR YOU</span>
                <h2>
                  Open what feels
                  <br />
                  like <em>today.</em>
                </h2>
              </div>
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
            </section>
            <div className="room-bottom-promise">
              <Icon name="heart" />
              <p>
                Before the exam. After the result.
                <br />
                <em>Same love.</em>
              </p>
            </div>
          </div>
          <div
            className="app-room poetry-room"
            hidden={room !== "shayari"}
            data-room="shayari"
          >
            <ShayariRoom />
          </div>
          <div
            className="app-room music-app-room"
            hidden={room !== "music"}
            data-room="music"
          >
            <MusicRoom />
          </div>
          <div
            className="app-room words-room"
            hidden={room !== "self-letter"}
            data-room="self-letter"
          >
            <SelfLetter />
          </div>
        </main>
        <footer className="app-footer">
          <span>always, anushka ♡</span>
          <span>A little love. Every time you come back.</span>
          <button className="app-close-world" onClick={onLock}>
            Close my little world <span aria-hidden="true">↗</span>
          </button>
        </footer>
      </div>
      <nav className="app-bottom-nav" aria-label="Your rooms on mobile">
        {rooms.map((r) => (
          <a
            key={r.id}
            href={"#" + r.id}
            aria-label={r.name}
            aria-current={room === r.id ? "page" : undefined}
          >
            <RoomIcon name={r.icon} />
            <span>{r.label}</span>
          </a>
        ))}
      </nav>
      <dialog
        ref={letterDialog}
        className="letter-dialog"
        aria-labelledby="letter-title"
        onCancel={closeLetter}
        onClose={() => {
          if (activeLetter) closeLetter();
        }}
        onClick={(e) => {
          if (e.target === letterDialog.current) closeLetter();
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
      <dialog
        ref={breathDialog}
        className="app-breath-dialog"
        aria-labelledby="breath-title"
        onCancel={closeBreath}
        onClick={(e) => {
          if (e.target === breathDialog.current) closeBreath();
        }}
      >
        <button
          className="dialog-close"
          onClick={closeBreath}
          aria-label="Close breathing corner"
        >
          <Icon name="close" />
        </button>
        <span className="eyebrow">JUST THIS MINUTE</span>
        <h2 id="breath-title">
          The world can
          <br />
          <em>wait a little.</em>
        </h2>
        <p>
          4 seconds in. 6 seconds out.
          <br />
          Or simply sit here, at your own pace.
        </p>
        <div className={"breathing-space " + (breathing ? "breathing" : "")}>
          <div className="breath-ring ring-one" />
          <div className="breath-ring ring-two" />
          <div className="breath-orb">
            <Icon name={complete ? "heart" : "leaf"} width="28" height="28" />
            <span aria-live="polite">
              {breathing
                ? elapsed % 10 < 4
                  ? "Breathe in"
                  : "Breathe out"
                : complete
                  ? "Welcome back."
                  : "Just be."}
            </span>
            <small>
              {breathing
                ? `${60 - elapsed} seconds of quiet`
                : complete
                  ? "Nothing more needed."
                  : "You’re allowed to slow down."}
            </small>
          </div>
        </div>
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
        </button>
        <p className="breath-small-print">
          If it feels uncomfortable, stop and breathe normally.
        </p>
      </dialog>
      <div className={"toast " + (toast ? "visible" : "")} role="status">
        {toast}
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(
  <WelcomeGate>{(lock) => <App onLock={lock} />}</WelcomeGate>,
);
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* The online site remains usable if offline storage is unavailable. */
    });
  });
}

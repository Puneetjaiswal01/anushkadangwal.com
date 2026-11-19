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
import "./theme.css";
import WelcomeGate from "./WelcomeGate";
import { Icon, PaperGarden } from "./Art";
import { letters, reminders, moods, promises } from "./content";
import Promises from "./Promises";
import Letters from "./Letters";
import QuietRoom from "./QuietRoom";
import YourSpace from "./YourSpace";
import Music from "./Music";
import DateInvitation from "./DateInvitation";
const rooms = [
  {
    id: "home",
    name: "For you",
    icon: "home",
    description: "A little world, only for you.",
  },
  {
    id: "us",
    name: "Us, gently",
    icon: "heart",
    description: "We can figure it out together.",
  },
  {
    id: "letters",
    name: "Letters",
    icon: "letter",
    description: "Some things I hope you always remember.",
  },
  {
    id: "quiet",
    name: "A softer day",
    icon: "leaf",
    description: "There is nothing to achieve here.",
  },
  {
    id: "you",
    name: "Your space",
    icon: "pen",
    description: "Your voice belongs here, too.",
  },
];
function roomFromHash() {
  const id = location.hash.slice(1);
  return rooms.some((r) => r.id === id) ? id : "home";
}
function savedEarlier() {
  try {
    const data = JSON.parse(
      localStorage.getItem("anushka-keepsakes-v2") || "[]",
    );
    return Array.isArray(data)
      ? data.filter(
          (id) =>
            typeof id === "string" &&
            ((/^q-\d+$/.test(id) && Number(id.slice(2)) < reminders.length) ||
              promises.some((p) => "p-" + p.id === id)),
        )
      : [];
  } catch {
    return [];
  }
}
function App({ onLock }) {
  const [room, setRoom] = useState(roomFromHash),
    [selectedLetter, setSelectedLetter] = useState(null),
    [reminder, setReminder] = useState(0),
    [mood, setMood] = useState(null),
    [saved, setSaved] = useState(savedEarlier),
    [toast, setToast] = useState(""),
    [playing, setPlaying] = useState(false);
  const dialog = useRef(null),
    lastFocus = useRef(null),
    toastTimer = useRef(null),
    bag = useRef([]);
  useEffect(() => {
    const change = () => {
      setRoom(roomFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    document.title = `${rooms.find((r) => r.id === room).name} · Always, Anushka`;
  }, [room]);
  useEffect(() => {
    if (selectedLetter) {
      lastFocus.current = document.activeElement;
      dialog.current.showModal();
      dialog.current.scrollTop = 0;
    } else dialog.current?.close();
  }, [selectedLetter]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  function notice(text) {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3500);
  }
  function save(id) {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem("anushka-keepsakes-v2", JSON.stringify(next));
      notice(
        next.includes(id)
          ? "Kept in your little collection. ♡"
          : "Removed from your collection.",
      );
    } catch {
      notice("Kept for this visit. This browser couldn’t save it.");
    }
  }
  function nextReminder() {
    if (!bag.current.length)
      bag.current = reminders
        .map((_, i) => i)
        .filter((i) => i !== reminder)
        .sort(() => Math.random() - 0.5);
    setReminder(bag.current.pop());
  }
  function closeLetter() {
    setSelectedLetter(null);
    lastFocus.current?.focus();
  }
  function activeLink(e, id) {
    if (room === id) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  }
  const active = rooms.find((r) => r.id === room);
  return (
    <div className="world-shell">
      <a className="skip-link" href="#main">
        Skip to your little world
      </a>
      <aside className="world-sidebar">
        <a href="#home" className="brand">
          <img
            src="/icons/icon-192.png"
            width="50"
            height="50"
            alt="A little smiling A"
          />
          <span>
            always,
            <br />
            <em>anushka.</em>
          </span>
        </a>
        <span className="sidebar-label">LOVE, IN LITTLE PLACES</span>
        <nav aria-label="Your little places" className="desktop-nav">
          {rooms.map((r, i) => (
            <a
              href={"#" + r.id}
              key={r.id}
              aria-current={room === r.id ? "page" : undefined}
              onClick={(e) => activeLink(e, r.id)}
            >
              <span className="nav-symbol">
                <Icon name={r.icon} size={21} />
              </span>
              <span>{r.name}</span>
              <i>0{i + 1}</i>
            </a>
          ))}
        </nav>
        <div className="sidebar-note">
          <span aria-hidden="true">✧</span>
          <p>
            “We’ll figure
            <br />
            it out
            <br />
            <em>together.”</em>
          </p>
          <span className="sidebar-note-small">
            A LITTLE MORE LOVE.
            <br />A LITTLE MORE UNDERSTANDING.
          </span>
        </div>
        <button className="lock-link" onClick={onLock}>
          <Icon name="lock" size={13} />
          Close my little world
        </button>
        <span className="sidebar-footer">
          Made with love. For all your days.
        </span>
      </aside>
      <div className="world-content">
        <header className="world-header">
          <a href="#home" className="mobile-brand">
            <img src="/icons/icon-192.png" width="31" height="31" alt="" />
            always, anushka
          </a>
          <div className="desktop-breadcrumb">
            <span>JUST FOR ANUSHKA</span>
            <p>{active.description}</p>
          </div>
          <div className="header-note">
            you belong here. <Icon name="heart" size={15} />
          </div>
          {playing && (
            <button
              className="header-pause"
              aria-label="Pause the little instrumental"
              onClick={() =>
                document
                  .querySelectorAll("audio")
                  .forEach((audio) => audio.pause())
              }
            >
              <Icon name="pause" size={14} />
              <span>A quiet tune</span>
            </button>
          )}
        </header>
        <main id="main" tabIndex="-1">
          <div
            className="world-room home-room"
            data-room="home"
            hidden={room !== "home"}
          >
            <div className="hello-row">
              <div>
                <span className="eyebrow">
                  ALL YOUR COURAGE. ALL YOUR SOFTNESS.
                </span>
                <h1>
                  Hey, Anushka<span> ♡</span>
                </h1>
                <p>
                  This little place is for you. And the love I want to put into
                  words.
                </p>
              </div>
              <span className="hello-flower" aria-hidden="true">
                <Icon name="flower" size={52} />
              </span>
            </div>
            <section className="home-hero">
              <div className="hero-writing">
                <span className="hero-pill">
                  YOU. ME. AND A LITTLE MORE GENTLENESS.
                </span>
                <h2>
                  Let’s keep
                  <br />
                  choosing <em>us.</em>
                </h2>
                <p>
                  Anushka, I love you. I want us to keep noticing the little
                  things, understanding each other, and making room to grow.
                </p>
                <span className="hero-handwritten">
                  We can figure it out together.
                </span>
                <div className="hero-actions">
                  <a className="primary-button" href="#us">
                    A little promise to you <Icon name="arrow" size={17} />
                  </a>
                  <button
                    className="plain-button"
                    onClick={() => setSelectedLetter(letters[0])}
                  >
                    A letter from me <Icon name="letter" size={16} />
                  </button>
                </div>
              </div>
              <PaperGarden />
            </section>
            <div className="home-mantra">
              <span>I love the person you are.</span>
              <i>✧</i>
              <span>On all your days.</span>
              <i>✧</i>
              <span>Not just the easy ones.</span>
            </div>
            <section className="mood-section">
              <div className="small-section-title">
                <div>
                  <span className="eyebrow">NO PERFECT ANSWER NEEDED</span>
                  <h2>
                    How’s your heart <em>today?</em>
                  </h2>
                </div>
                <a href="#quiet" className="subtle-link">
                  A little quiet <Icon name="leaf" size={15} />
                </a>
              </div>
              <div
                className="mood-options"
                role="group"
                aria-label="What would help today?"
              >
                {moods.map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={mood === item.id}
                    onClick={() => setMood(mood === item.id ? null : item.id)}
                  >
                    <span>
                      {item.id === "tired"
                        ? "☁︎"
                        : item.id === "worried"
                          ? "✧"
                          : "♡"}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
              {mood && (
                <div className="mood-answer" role="status">
                  <Icon name="heart" size={20} />
                  <p>{moods.find((m) => m.id === mood).message}</p>
                </div>
              )}
            </section>
            <div className="home-two-columns">
              <section className="reminder-card">
                <div className="card-eyebrow">
                  <Icon name="heart" size={16} />
                  <span>SOMETHING I REALLY MEAN</span>
                </div>
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <p className="reminder-text" key={reminder} aria-live="polite">
                  {reminders[reminder]}
                </p>
                <span className="note-signature">— me, on all your days</span>
                <div className="reminder-tools">
                  <button onClick={nextReminder}>
                    One more little note <Icon name="arrow" size={15} />
                  </button>
                  <button
                    className={
                      "save-button " +
                      (saved.includes("q-" + reminder) ? "is-saved" : "")
                    }
                    onClick={() => save("q-" + reminder)}
                    aria-label={
                      saved.includes("q-" + reminder)
                        ? "Unsave this little note"
                        : "Save this little note"
                    }
                    aria-pressed={saved.includes("q-" + reminder)}
                  >
                    <Icon name="heart" size={19} />
                  </button>
                </div>
              </section>
              <section className="softness-card">
                <span className="eyebrow">
                  A WHOLE PERSON, BEFORE ANY RESULT
                </span>
                <span className="softness-moon" aria-hidden="true">
                  ☾
                </span>
                <h2>
                  You are still
                  <br />
                  <em>Anushka.</em>
                </h2>
                <p>
                  A score can be a part of your story.
                  <br />
                  It will never be all of you.
                </p>
                <button
                  className="subtle-link"
                  onClick={() =>
                    setSelectedLetter(
                      letters.find((l) => l.id === "little-you"),
                    )
                  }
                >
                  For the little girl inside you <Icon name="arrow" size={16} />
                </button>
              </section>
            </div>
            <div className="small-section-title next-title">
              <div>
                <span className="eyebrow">LITTLE PLACES TO COME BACK TO</span>
                <h2>
                  Stay a little <em>while.</em>
                </h2>
              </div>
              <span className="small-caption">There’s no right order.</span>
            </div>
            <div className="room-teasers">
              <a href="#letters" className="room-teaser tone-0">
                <Icon name="letter" size={28} />
                <h3>A little postbox.</h3>
                <p>
                  For a big day.
                  <br />
                  For no reason at all.
                </p>
                <span>
                  Letters & shayari <Icon name="arrow" size={16} />
                </span>
              </a>
              <a href="#quiet" className="room-teaser tone-2">
                <Icon name="leaf" size={28} />
                <h3>One soft minute.</h3>
                <p>
                  Let your shoulders fall.
                  <br />
                  The world can wait.
                </p>
                <span>
                  A quieter corner <Icon name="arrow" size={16} />
                </span>
              </a>
              <a href="#you" className="room-teaser tone-1">
                <Icon name="pen" size={28} />
                <h3>Dear me, with love.</h3>
                <p>
                  Your own words.
                  <br />
                  Room for little dreams.
                </p>
                <span>
                  Your own space <Icon name="arrow" size={16} />
                </span>
              </a>
            </div>
            <div className="home-two-columns home-last-cards">
              <Music onPlaying={setPlaying} />
              <div className="date-column">
                <DateInvitation />
                <div className="little-love-note">
                  <Icon name="flower" size={40} />
                  <p>
                    I want the ordinary days,
                    <br />
                    the small joys,
                    <br />
                    <em>and the learning, too.</em>
                  </p>
                  <span>ALL OF IT, A LITTLE KINDER.</span>
                </div>
              </div>
            </div>
            <div className="home-closing">
              <Icon name="heart" size={23} />
              <p>
                I love you. I want to understand you.
                <br />
                <em>We can figure things out together.</em>
              </p>
            </div>
          </div>
          <div className="world-room" data-room="us" hidden={room !== "us"}>
            <Promises saved={saved} onSave={save} />
          </div>
          <div
            className="world-room"
            data-room="letters"
            hidden={room !== "letters"}
          >
            <Letters onOpen={setSelectedLetter} />
          </div>
          <div
            className="world-room"
            data-room="quiet"
            hidden={room !== "quiet"}
          >
            <QuietRoom />
          </div>
          <div className="world-room" data-room="you" hidden={room !== "you"}>
            <YourSpace />
            <section className="keepsake-section">
              <div className="small-section-title">
                <div>
                  <span className="eyebrow">WORDS YOU WANTED TO KEEP</span>
                  <h2>
                    Your little <em>collection.</em>
                  </h2>
                </div>
                <Icon name="heart" size={22} />
              </div>
              {saved.length ? (
                <div className="keepsake-grid">
                  {saved.map((id) => {
                    const content = id.startsWith("q-")
                      ? reminders[Number(id.slice(2))]
                      : promises.find((p) => "p-" + p.id === id)?.title;
                    if (!content) return null;
                    return (
                      <article key={id}>
                        <p>{content}</p>
                        <button
                          aria-label={"Remove saved note: " + content}
                          onClick={() => save(id)}
                        >
                          <Icon name="close" size={15} />
                        </button>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <p className="keepsake-empty">
                  Tap a little heart on a note or promise you want to come back
                  to. It’ll find a home here.
                </p>
              )}
              <p className="local-note">Kept in this browser, for you.</p>
            </section>
            <button className="close-world-button" onClick={onLock}>
              <Icon name="lock" size={15} />
              Close my little world
            </button>
          </div>
        </main>
        <footer className="world-footer">
          <span>
            always, anushka <Icon name="heart" size={13} />
          </span>
          <p>A little more love. A little more understanding.</p>
        </footer>
      </div>
      <nav className="mobile-nav" aria-label="Your little places on mobile">
        {rooms.map((r) => (
          <a
            href={"#" + r.id}
            key={r.id}
            aria-current={room === r.id ? "page" : undefined}
            onClick={(e) => activeLink(e, r.id)}
          >
            <Icon name={r.icon} size={20} />
            <span>{r.name}</span>
          </a>
        ))}
      </nav>
      <dialog
        ref={dialog}
        className="letter-dialog"
        aria-labelledby="letter-title"
        onCancel={closeLetter}
        onClose={() => {
          if (selectedLetter) closeLetter();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) closeLetter();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close letter"
          onClick={closeLetter}
        >
          <Icon name="close" size={19} />
        </button>
        {selectedLetter && (
          <article className="reading-paper">
            <span className="reading-seal">
              <Icon name="heart" size={23} />
            </span>
            <span className="eyebrow">A LETTER, JUST FOR YOU</span>
            <h2 id="letter-title">{selectedLetter.title}</h2>
            <p className="reading-salutation">{selectedLetter.salutation}</p>
            {selectedLetter.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p className="reading-signature">{selectedLetter.closing}</p>
            <div className="reading-bottom">
              <span>Read again, whenever you need.</span>
              <button onClick={closeLetter}>
                Keep it close <Icon name="heart" size={15} />
              </button>
            </div>
          </article>
        )}
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
if ("serviceWorker" in navigator && import.meta.env.PROD)
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("/sw.js").catch(() => {}),
  );

import React, { useEffect, useState } from "react";
import { examDates } from "./content";
import "./quiet-room.css";

const kindnesses = [
  {
    id: "water",
    symbol: "◌",
    title: "A sip of water",
    detail:
      "If you’re thirsty, take a sip. You don’t have to turn looking after yourself into another thing to get right.",
    aside: "Just one ordinary, kind thing.",
  },
  {
    id: "meal",
    symbol: "☀",
    title: "Something to eat",
    detail:
      "If a meal has slipped past you, this can be your little reminder. You deserve something to eat on a difficult day, too.",
    aside: "Care isn’t something a result can earn.",
  },
  {
    id: "sit",
    symbol: "☾",
    title: "Sit for a while",
    detail:
      "Put the phone down if you want to. Let the room be quiet for a moment. You don’t need to come back with an answer to anything.",
    aside: "A pause can simply be a pause.",
  },
  {
    id: "stretch",
    symbol: "❀",
    title: "A little movement",
    detail:
      "If it feels comfortable, stand up, loosen your shoulders, or take a few easy steps. You can stop whenever you like.",
    aside: "Your own pace belongs to you.",
  },
];

function gentleDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${date}T12:00:00+05:30`));
}

export default function QuietRoom() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [kindness, setKindness] = useState("water");
  const [openDay, setOpenDay] = useState(null);
  const selectedKindness = kindnesses.find((item) => item.id === kindness);
  const selectedDay = examDates.find((item) => item.date === openDay);

  useEffect(() => {
    if (!running) return;
    const started = Date.now();
    const interval = window.setInterval(() => {
      const seconds = Math.min(60, Math.floor((Date.now() - started) / 1000));
      setElapsed(seconds);
      if (seconds >= 60) {
        setRunning(false);
        setFinished(true);
      }
    }, 200);
    return () => window.clearInterval(interval);
  }, [running]);

  function toggleBreath() {
    if (running) {
      setRunning(false);
      setElapsed(0);
      setFinished(false);
      return;
    }
    setElapsed(0);
    setFinished(false);
    setRunning(true);
  }

  const phase = elapsed % 10 < 4 ? "Breathe in" : "Breathe out";

  return (
    <section className="quiet-room" aria-labelledby="quiet-room-title">
      <div className="quiet-room-heading">
        <span className="quiet-eyebrow">A QUIET CORNER OF YOUR WORLD</span>
        <h1 id="quiet-room-title">
          You can put the day
          <br />
          <em>down for a moment.</em>
        </h1>
        <p>
          Nothing to finish here. A little room to breathe, eat, rest, and just
          be Anushka.
        </p>
      </div>

      <div className="quiet-comfort-grid">
        <section
          className="quiet-breath-card"
          aria-labelledby="quiet-breath-title"
        >
          <div className="quiet-breath-top">
            <span className="quiet-eyebrow">ONE SOFT MINUTE</span>
            <span className="quiet-leaf-mark" aria-hidden="true">
              ❧
            </span>
          </div>
          <h2 id="quiet-breath-title">
            The world can wait
            <br />
            <em>a little.</em>
          </h2>
          <p className="quiet-breath-description">
            Four seconds in. Six seconds out.
            <br />
            Or simply sit here, at your own pace.
          </p>
          <div
            className={`quiet-breath-scene ${running ? "is-breathing" : ""}`}
          >
            <div className="quiet-breath-ring quiet-ring-outer" />
            <div className="quiet-breath-ring quiet-ring-inner" />
            <div className="quiet-breath-orb">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                aria-hidden="true"
              >
                <path
                  d="M20 3C9 2 2 7 5 15c8 5 16-2 15-12ZM4 21l11-12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span aria-live="polite">
                {running ? phase : finished ? "Welcome back." : "Just be."}
              </span>
              <small>
                {running
                  ? `${60 - elapsed} seconds of quiet`
                  : finished
                    ? "Nothing more needed."
                    : "No right way to feel."}
              </small>
            </div>
          </div>
          <button
            className="quiet-breath-button"
            type="button"
            onClick={toggleBreath}
          >
            {running
              ? "Stop for now"
              : finished
                ? "Another quiet minute"
                : "Take a little breath"}
            <span aria-hidden="true">{running ? "Ⅱ" : "❀"}</span>
          </button>
          <p className="quiet-breath-care">
            If this rhythm feels uncomfortable, stop and breathe normally. Your
            own rhythm is okay.
          </p>
        </section>

        <section
          className="quiet-kindness-card"
          aria-labelledby="quiet-kindness-title"
        >
          <span className="quiet-eyebrow">
            A LITTLE CARE, WITHOUT KEEPING SCORE
          </span>
          <h2 id="quiet-kindness-title">
            What would feel
            <br />
            <em>kind right now?</em>
          </h2>
          <p className="quiet-kindness-intro">
            Choose a small thing. You don’t have to report back or tick anything
            off.
          </p>
          <div
            className="quiet-kindness-options"
            role="group"
            aria-label="Choose a little kindness"
          >
            {kindnesses.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={kindness === item.id}
                onClick={() => setKindness(item.id)}
              >
                <span aria-hidden="true">{item.symbol}</span>
                <span>{item.title}</span>
                <i aria-hidden="true">{kindness === item.id ? "♡" : "+"}</i>
              </button>
            ))}
          </div>
          <div
            className="quiet-kindness-message"
            aria-live="polite"
            key={kindness}
          >
            <p>{selectedKindness.detail}</p>
            <span>{selectedKindness.aside}</span>
          </div>
        </section>
      </div>

      <section className="quiet-dates" aria-labelledby="quiet-dates-title">
        <div className="quiet-dates-heading">
          <div>
            <span className="quiet-eyebrow">FOR THE DAYS THAT FEEL BIG</span>
            <h2 id="quiet-dates-title">
              Dates on a calendar.
              <br />
              <em>Not the measure of you.</em>
            </h2>
          </div>
          <p>
            Your dreams matter.
            <br />
            So does the person carrying them.
          </p>
        </div>
        <div className="quiet-date-list">
          {examDates.map((day) => (
            <button
              className="quiet-date-button"
              key={`${day.date}-${day.name}`}
              type="button"
              aria-pressed={openDay === day.date}
              aria-expanded={openDay === day.date}
              aria-controls="quiet-day-note"
              onClick={() => setOpenDay(openDay === day.date ? null : day.date)}
            >
              <time dateTime={day.date}>
                {gentleDate(day.date)}
                <small>2026</small>
              </time>
              <span>{day.name}</span>
              <i aria-hidden="true">{openDay === day.date ? "♡" : "+"}</i>
            </button>
          ))}
        </div>
        <div
          className="quiet-day-note"
          id="quiet-day-note"
          hidden={!selectedDay}
          aria-live="polite"
        >
          {selectedDay && (
            <>
              <span className="quiet-eyebrow">
                FOR {selectedDay.name} ·{" "}
                {gentleDate(selectedDay.date).toUpperCase()}
              </span>
              <p>{selectedDay.note}</p>
              <span className="quiet-day-signature">
                Same love, before and after. ♡
              </span>
            </>
          )}
        </div>
        <p className="quiet-dates-footnote">
          Your dates, supplied for this little world. Follow your own admit card
          for the exact slot and reporting instructions.
        </p>
      </section>
      <p className="quiet-room-ending">
        You don’t need to be doing well to be looked after.{" "}
        <span aria-hidden="true">♡</span>
      </p>
    </section>
  );
}

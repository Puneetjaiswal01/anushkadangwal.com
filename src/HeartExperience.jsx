import React, { useState } from "react";
import { innerChildLetter, originalShayari, loveNotes } from "./heart-content";
import "./heart-experience.css";

const feelings = [
  {
    id: "exams",
    label: "The exams feel too big",
    opening: "Let them matter. Don’t let them become everything.",
    text: "I know these exams are important to you. I want the things you dream of for you, too. But I don’t want your whole life to shrink to a question paper. Your laughter, your health, your ordinary afternoons, the people who love you—those are real parts of your life today. They don’t have to wait for an admission letter.",
    promise: "I’m rooting for your dream. I’m loving the person carrying it.",
  },
  {
    id: "enough",
    label: "I don’t feel good enough",
    opening: "You don’t have to make a case for being loved.",
    text: "You can be unsure of an answer and still be intelligent. You can need rest and still be trying. You can miss a goal and still have a life worth looking forward to. The harshest thought in your head is not the most honest one. You are Anushka. There is so much more to you than the thing that feels difficult right now.",
    promise: "I am not waiting for a better version of you to love.",
  },
  {
    id: "love",
    label: "I just need a little love",
    opening: "Then love is all this moment needs to be.",
    text: "No “how much did you study?” No advice disguised as concern. Just this: I love you. I hope you’ve had something to eat. I hope you can be a little gentler with yourself tonight. You can talk to me about your day, or about nothing important at all. You don’t need a crisis to deserve my attention.",
    promise: "You don’t owe a good mood in return for being cared for.",
  },
];
export function HeartStory() {
  const [chapter, setChapter] = useState(0),
    [all, setAll] = useState(false),
    [feeling, setFeeling] = useState("exams");
  const response = feelings.find((item) => item.id === feeling);
  return (
    <>
      <section
        id="little-you"
        className="heart-story section-wrap"
        aria-labelledby="little-you-title"
      >
        <div className="heart-story-heading">
          <div className="heart-child-art" aria-hidden="true">
            <span className="heart-child-moon">☾</span>
            <span className="heart-child-star">✦</span>
            <svg viewBox="0 0 190 210" fill="none">
              <path
                d="M46 174c-2-51 9-87 48-89 37-2 50 38 49 89"
                fill="#d2b5c9"
              />
              <path
                d="m58 173 5-48m65 48-4-48M87 173l-9 24m26-24 9 24"
                stroke="#70536e"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M72 69c-2-22 9-39 26-38 18 0 30 20 24 42"
                fill="#68506c"
              />
              <path
                d="M76 59c7-2 15-6 20-12 4 8 13 13 22 14v12a21 21 0 0 1-42 0Z"
                fill="#f3d9ca"
              />
              <path
                d="M89 76c5 4 11 4 16 0"
                stroke="#ab7c79"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="m56 130 29 12m48-12-28 12"
                stroke="#70536e"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M95 144c-20-13-12-23-4-19l4 5 4-5c8-4 16 6-4 19Z"
                fill="#aa6f8f"
              />
              <path d="M35 201h124" stroke="#c3b29c" />
            </svg>
            <span className="heart-child-caption">
              her softness belongs here, too.
            </span>
          </div>
          <span className="eyebrow">A LETTER TO ALL OF YOU</span>
          <h2 id="little-you-title">
            I love the little girl
            <br />
            <em>inside you.</em>
          </h2>
          <p>
            And the woman she has become.
            <br />
            Neither of you has to earn this love.
          </p>
        </div>
        <div className="heart-story-book">
          <div className="heart-book-top">
            <span>MY ANUSHKA,</span>
            <span aria-hidden="true">♡</span>
          </div>
          <h3>
            {chapter === 0
              ? "You can put the brave face down."
              : chapter === 2 || chapter === 3
                ? "An exam can’t contain a whole life."
                : chapter === 5
                  ? "Yes. I will love you the same."
                  : "There is room for every part of you."}
          </h3>
          <div
            className="heart-story-copy"
            key={all ? "all" : chapter}
            aria-live="polite"
          >
            {all ? (
              innerChildLetter.paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))
            ) : (
              <p>{innerChildLetter.paragraphs[chapter]}</p>
            )}
          </div>
          {(all || chapter === innerChildLetter.paragraphs.length - 1) && (
            <p className="heart-story-signature">{innerChildLetter.closing}</p>
          )}
          <div className="heart-book-controls">
            {!all && (
              <>
                <button
                  type="button"
                  onClick={() => setChapter(Math.max(0, chapter - 1))}
                  disabled={chapter === 0}
                  aria-label="Previous part of the letter"
                >
                  ←
                </button>
                <span>
                  {String(chapter + 1).padStart(2, "0")}{" "}
                  <i>
                    /{" "}
                    {String(innerChildLetter.paragraphs.length).padStart(
                      2,
                      "0",
                    )}
                  </i>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setChapter(
                      chapter === innerChildLetter.paragraphs.length - 1
                        ? 0
                        : chapter + 1,
                    )
                  }
                >
                  {chapter === innerChildLetter.paragraphs.length - 1
                    ? "Read again ↺"
                    : "Stay a little longer →"}
                </button>
              </>
            )}
            <button
              type="button"
              className="heart-read-all"
              onClick={() => setAll(!all)}
            >
              {all ? "One page at a time" : "Read the whole letter"}
            </button>
          </div>
        </div>
      </section>
      <section
        className="heart-feelings section-wrap"
        aria-labelledby="feelings-title"
      >
        <span className="eyebrow">COME AS YOU ARE</span>
        <h2 id="feelings-title">
          What feels a little heavy <em>today?</em>
        </h2>
        <div
          className="heart-feeling-options"
          role="group"
          aria-label="Choose what you need to hear"
        >
          {feelings.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFeeling(item.id)}
              aria-pressed={item.id === feeling}
            >
              {item.label}
              <span aria-hidden="true">{item.id === feeling ? "♡" : "+"}</span>
            </button>
          ))}
        </div>
        <div
          className="heart-feeling-response"
          aria-live="polite"
          key={feeling}
        >
          <span aria-hidden="true">“</span>
          <h3>{response.opening}</h3>
          <p>{response.text}</p>
          <p className="heart-feeling-promise">{response.promise}</p>
        </div>
      </section>
    </>
  );
}

export function ShayariRoom() {
  const [index, setIndex] = useState(0),
    [roman, setRoman] = useState(false);
  const poem = originalShayari[index];
  return (
    <section
      id="shayari"
      className="shayari-section"
      aria-labelledby="shayari-title"
    >
      <div className="section-wrap">
        <div className="shayari-heading">
          <div>
            <span className="eyebrow">THODA ISHQ. THODI SI NARMI.</span>
            <h2 id="shayari-title">
              Kuch baatein,
              <br />
              <em>sirf tumhare liye.</em>
            </h2>
            <p>Sometimes the heart finds its words in another language.</p>
          </div>
          <span className="shayari-moon" aria-hidden="true">
            ☾<i>✦</i>
          </span>
        </div>
        <div className="shayari-paper">
          <div className="shayari-paper-top">
            <span>
              0{index + 1} / 0{originalShayari.length} <i>— {poem.title}</i>
            </span>
            <div
              className="shayari-language"
              role="group"
              aria-label="Poetry script"
            >
              <button
                type="button"
                aria-pressed={!roman}
                onClick={() => setRoman(false)}
              >
                हिन्दी
              </button>
              <button
                type="button"
                aria-pressed={roman}
                onClick={() => setRoman(true)}
              >
                Roman
              </button>
            </div>
          </div>
          <div
            key={poem.id + roman}
            className="shayari-lines"
            lang={roman ? "hi-Latn" : "hi"}
            aria-live="polite"
          >
            {(roman ? poem.roman : poem.hindi).split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="shayari-paper-bottom">
            <span>Original words, written for your little world. ♡</span>
            <div>
              <button
                type="button"
                aria-label="Previous shayari"
                onClick={() =>
                  setIndex(
                    (index - 1 + originalShayari.length) %
                      originalShayari.length,
                  )
                }
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next shayari"
                onClick={() => setIndex((index + 1) % originalShayari.length)}
              >
                →
              </button>
            </div>
          </div>
          <details className="shayari-meaning" key={poem.id}>
            <summary>A little meaning in English</summary>
            <p>{poem.meaning}</p>
          </details>
        </div>
        <div className="heart-quote-ribbon">
          <span className="eyebrow">NO CONDITIONS. NO SMALL PRINT.</span>
          <LoveNote />
        </div>
      </div>
    </section>
  );
}
function LoveNote() {
  const [note, setNote] = useState(0);
  return (
    <>
      <blockquote aria-live="polite" key={note}>
        {loveNotes[note]}
      </blockquote>
      <button
        type="button"
        onClick={() => setNote((note + 1) % loveNotes.length)}
      >
        One more thing I mean <span aria-hidden="true">♡</span>
      </button>
    </>
  );
}

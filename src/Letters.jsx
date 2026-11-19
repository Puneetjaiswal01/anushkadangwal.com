import React, { useState } from "react";
import { letters, shayari } from "./content";
import { Icon, Envelope } from "./Art";
export default function Letters({ onOpen }) {
  const [tab, setTab] = useState("letters"),
    [poem, setPoem] = useState(0),
    [roman, setRoman] = useState(false);
  const current = shayari[poem];
  return (
    <div className="letters-room">
      <div className="room-heading centered">
        <span className="eyebrow">WORDS YOU CAN COME BACK TO</span>
        <h1>
          For all your days.
          <br />
          <em>And all of you.</em>
        </h1>
        <p>
          A little postbox. Some things I mean.
          <br />
          Open whatever feels like today.
        </p>
      </div>
      <div
        className="letter-switch"
        role="group"
        aria-label="Read letters or shayari"
      >
        <button
          aria-pressed={tab === "letters"}
          onClick={() => setTab("letters")}
        >
          <Icon name="letter" size={17} />
          Letters for you
        </button>
        <button
          aria-pressed={tab === "shayari"}
          onClick={() => setTab("shayari")}
        >
          <span lang="hi">अ</span>Shayari, dil se
        </button>
      </div>
      <div hidden={tab !== "letters"} className="letter-grid">
        {letters.map((letter, i) => (
          <button
            className={"letter-card tone-" + (i % 3)}
            key={letter.id}
            onClick={() => onOpen(letter)}
          >
            <div className="letter-card-top">
              <span className="envelope-art">
                <Envelope />
              </span>
              <span>0{i + 1}</span>
            </div>
            <span className="eyebrow">{letter.label}</span>
            <h2>{letter.title}</h2>
            <p>{letter.preview}</p>
            <div className="letter-card-bottom">
              Open this little letter <Icon name="arrow" size={17} />
            </div>
          </button>
        ))}
      </div>
      <section
        hidden={tab !== "shayari"}
        className="poetry-room"
        aria-labelledby="poetry-title"
      >
        <div className="poetry-intro">
          <span className="eyebrow">THODI SI NARMI. THODI MOHABBAT.</span>
          <h2 id="poetry-title">
            Kuch baatein,
            <br />
            <em>sirf tumhare liye.</em>
          </h2>
          <span aria-hidden="true">☾</span>
        </div>
        <div className="poem-paper">
          <div className="poem-top">
            <span>
              0{poem + 1} / 0{shayari.length} — {current.title}
            </span>
            <div role="group" aria-label="Poem script">
              <button onClick={() => setRoman(false)} aria-pressed={!roman}>
                हिन्दी
              </button>
              <button onClick={() => setRoman(true)} aria-pressed={roman}>
                Roman
              </button>
            </div>
          </div>
          <div
            className="poem-lines"
            key={poem + ":" + roman}
            lang={roman ? "hi-Latn" : "hi"}
            aria-live="polite"
          >
            {(roman ? current.roman : current.hindi)
              .split("\n")
              .map((line, i) => (
                <p key={i}>{line}</p>
              ))}
          </div>
          <div className="poem-bottom">
            <span>Original words, for your little world. ♡</span>
            <div>
              <button
                aria-label="Previous shayari"
                onClick={() =>
                  setPoem((poem + shayari.length - 1) % shayari.length)
                }
              >
                <Icon name="left" size={17} />
              </button>
              <button
                aria-label="Next shayari"
                onClick={() => setPoem((poem + 1) % shayari.length)}
              >
                <Icon name="arrow" size={17} />
              </button>
            </div>
          </div>
          <details className="poem-meaning" key={poem}>
            <summary>A little meaning in English</summary>
            <p>{current.meaning}</p>
          </details>
        </div>
        <p className="poetry-footnote">
          Words from the heart, not a borrowed poet’s signature.
        </p>
      </section>
      <p className="room-footnote">
        Read again. Save a moment. Take your time. ♡
      </p>
    </div>
  );
}

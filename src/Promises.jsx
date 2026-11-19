import React, { useEffect, useRef, useState } from "react";
import { promises, repairNotes } from "./content";
import { Icon } from "./Art";
const KEY = "anushka-promise-reply-v2";
function earlier() {
  try {
    return localStorage.getItem(KEY) || "";
  } catch {
    return "";
  }
}
export default function Promises({ saved, onSave }) {
  const [active, setActive] = useState(0),
    [reply, setReply] = useState(earlier),
    [status, setStatus] = useState(""),
    [dirty, setDirty] = useState(false);
  const field = useRef(null),
    latest = useRef({ text: reply, dirty: false });
  function persist() {
    if (!latest.current.dirty) return;
    try {
      localStorage.setItem(KEY, latest.current.text);
      latest.current.dirty = false;
      setStatus("Your words are saved in this browser.");
    } catch {
      setStatus(
        "Browser saving is unavailable. Copy your words before leaving.",
      );
    }
  }
  useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(persist, 450);
    return () => clearTimeout(timer);
  }, [reply, dirty]);
  useEffect(() => {
    const hidden = () => {
      if (document.hidden) persist();
    };
    const leaving = (event) => {
      persist();
      if (latest.current.dirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("pagehide", persist);
    window.addEventListener("beforeunload", leaving);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      persist();
      window.removeEventListener("pagehide", persist);
      window.removeEventListener("beforeunload", leaving);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(reply);
      setStatus("Copied. Paste it into your chat if you’d like to share it.");
    } catch {
      field.current.focus();
      field.current.select();
      setStatus(
        "Your words are selected. You can copy them from the text box.",
      );
    }
  }
  return (
    <div className="promise-room">
      <div className="room-heading centered">
        <span className="eyebrow">THE HEART OF THIS LITTLE WORLD</span>
        <h1>
          “We’ll figure it out
          <br />
          <em>together.”</em>
        </h1>
        <p>
          I love you. I want to understand you.
          <br />I want us to keep making room for both.
        </p>
      </div>
      <section className="promise-letter">
        <span className="paper-tape" aria-hidden="true" />
        <div className="paper-top">
          <span>MY ANUSHKA,</span>
          <Icon name="heart" />
        </div>
        <h2>
          Can we keep choosing
          <br />
          the little things?
        </h2>
        <p>
          I want us to keep trying on the rough days, and to notice each other
          on the ordinary ones. To appreciate the small efforts. To say “I love
          you” while we have the chance, and make those words feel true in the
          way we treat each other.
        </p>
        <p>
          We don’t have to have every answer. We can be honest, take a breath,
          and ask, “What do you need me to understand?” I want us to face the
          question together, with care for the person on the other side of it.
        </p>
        <p>
          I want to grow with you. Dream with you. Make time for the small,
          lovely things that don’t belong on a to-do list. And I want our
          closeness to leave room for the people we love, the dreams we each
          carry, and the choices that are ours to make.
        </p>
        <p>
          These are the promises I want to put into practice. A page can say
          them. The everyday part is mine to keep showing up for.
        </p>
        <span className="script-signature">
          A little more patience. A little more noticing.
          <br />
          So much love, me.
        </span>
      </section>
      <div className="section-caption">
        <span className="eyebrow">LOVE, IN THE EVERYDAY DETAILS</span>
        <h2>
          Small promises.
          <br />
          <em>Real things to do.</em>
        </h2>
      </div>
      <div className="promise-grid">
        {promises.map((p, i) => (
          <article className={"promise-tile tone-" + (i % 3)} key={p.id}>
            <div className="promise-tile-top">
              <span>0{i + 1}</span>
              <button
                className={
                  "save-button " +
                  (saved.includes("p-" + p.id) ? "is-saved" : "")
                }
                aria-label={
                  (saved.includes("p-" + p.id)
                    ? "Unsave promise: "
                    : "Save promise: ") + p.title
                }
                aria-pressed={saved.includes("p-" + p.id)}
                onClick={() => onSave("p-" + p.id)}
              >
                <Icon name="heart" size={17} />
              </button>
            </div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <div className="promise-action">
              <span>ONE SMALL WAY</span>
              <p>{p.smallAction}</p>
            </div>
          </article>
        ))}
      </div>
      <section className="conversation-card">
        <div>
          <span className="eyebrow">WHEN WE WANT TO UNDERSTAND EACH OTHER</span>
          <h2>
            A little gentleness
            <br />
            <em>goes a long way.</em>
          </h2>
          <p>
            We can be honest with care.
            <br />
            These are words I want to remember.
          </p>
        </div>
        <div className="conversation-notes">
          <div
            className="conversation-tabs"
            role="group"
            aria-label="Conversation reminders"
          >
            {repairNotes.map((r, i) => (
              <button
                key={r.title}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                0{i + 1}
              </button>
            ))}
          </div>
          <div className="conversation-copy" key={active} aria-live="polite">
            <h3>{repairNotes[active].title}</h3>
            <p>{repairNotes[active].body}</p>
            <blockquote>{repairNotes[active].prompt}</blockquote>
          </div>
        </div>
      </section>
      <section className="promise-reply">
        <span className="eyebrow">THERE IS ROOM FOR YOUR VOICE</span>
        <h2>
          What would <em>you</em>
          <br />
          like us to remember?
        </h2>
        <p>
          You don’t have to agree with every word here. This space is for your
          own.
        </p>
        <label htmlFor="promise-reply">
          A thought, a wish, or something you want me to understand.
        </label>
        <textarea
          ref={field}
          id="promise-reply"
          rows={4}
          value={reply}
          onChange={(e) => {
            latest.current = { text: e.target.value, dirty: true };
            setReply(e.target.value);
            setDirty(true);
            setStatus("Keeping your words…");
          }}
          placeholder="For us, I hope…"
        />
        <div className="reply-tools">
          <button type="button" onClick={copy} disabled={!reply.trim()}>
            Copy my words
          </button>
          <span>
            Your words stay on this device. Share only if you want to.
          </span>
        </div>
        <p className="field-status" role="status">
          {status}
        </p>
      </section>
    </div>
  );
}

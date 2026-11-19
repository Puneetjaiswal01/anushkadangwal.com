import React, { useRef, useState } from "react";
import { Icon } from "./Art";
const initial = {
  yes: "Yes, I’d love to watch Avengers: Doomsday on release night and have a candlelight dinner with you. Let’s choose a show and a place together.",
  another:
    "I’d like to spend an evening with you. Could we choose another day that works for us both?",
  no: "Thank you for asking, but I don’t want to go on this date.",
};
export default function DateInvitation() {
  const [selected, setSelected] = useState(null),
    [drafts, setDrafts] = useState(initial),
    [status, setStatus] = useState("");
  const field = useRef(null);
  const text = selected ? drafts[selected] : "";
  async function copy() {
    if (!text.trim()) {
      setStatus("Add your words first.");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied. Paste it into your chat to send it.");
    } catch {
      field.current.focus();
      field.current.select();
      setStatus(
        "Your words are selected. Copy them from the text box and send them in your chat.",
      );
    }
  }
  async function share() {
    try {
      await navigator.share({ title: "A little evening for us", text });
      setStatus("Your reply is still here if you’d like to edit or copy it.");
    } catch (error) {
      setStatus(
        error.name === "AbortError"
          ? "No rush. Your reply is still here."
          : "Sharing couldn’t open. You can copy your reply instead.",
      );
    }
  }
  return (
    <details className="date-card">
      <summary>
        <div className="date-icon" aria-hidden="true">
          <Icon name="moon" size={29} />
          <span>✧</span>
        </div>
        <div>
          <span className="eyebrow">SOMETHING TO LOOK FORWARD TO</span>
          <h2>
            An evening,
            <br />
            <em>just us?</em>
          </h2>
          <p>A movie. A little candlelight. You.</p>
          <span className="date-invite-link">
            Open the invitation <Icon name="arrow" size={13} />
          </span>
        </div>
        <span className="date-open" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="date-inside">
        <p className="date-ask">Anushka, will you go on a date with me?</p>
        <div className="date-plan">
          <div>
            <span>01</span>
            <div>
              <h3>Avengers: Doomsday</h3>
              <p>
                On release night. We’ll choose the cinema and show once bookings
                are available.
              </p>
            </div>
          </div>
          <div>
            <span>02</span>
            <div>
              <h3>Dinner by candlelight</h3>
              <p>
                Something good to eat. Time to talk. An evening we don’t have to
                rush.
              </p>
            </div>
          </div>
        </div>
        <p className="date-choice-label">What feels right to you?</p>
        <div
          className="date-options"
          role="group"
          aria-label="Your answer to the date invitation"
        >
          {[
            ["yes", "Yes, let’s plan it"],
            ["another", "Another day?"],
            ["no", "No, thank you"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={selected === id}
              onClick={() => {
                setSelected(id);
                setStatus("");
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {selected && (
          <div className="date-reply">
            <label htmlFor="date-reply">Your reply, in your words.</label>
            <textarea
              id="date-reply"
              ref={field}
              value={text}
              onChange={(event) => {
                setDrafts({ ...drafts, [selected]: event.target.value });
                setStatus("");
              }}
              rows={4}
            />
            <div className="reply-tools">
              <button type="button" onClick={copy}>
                Copy my reply
              </button>
              {typeof navigator.share === "function" && (
                <button type="button" onClick={share} disabled={!text.trim()}>
                  Share my reply
                </button>
              )}
            </div>
            <p>
              Copy or share it into your chat to send it. Nothing is sent
              automatically.
            </p>
          </div>
        )}
        <p className="date-status" role="status">
          {status}
        </p>
      </div>
    </details>
  );
}

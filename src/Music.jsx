import React, { useEffect, useRef, useState } from "react";
import { Icon } from "./Art";
const SONG = "2W4yABdLc4Jnds67Poi5Nl";
export default function Music({ onPlaying }) {
  const audio = useRef(null),
    [playing, setPlaying] = useState(false),
    [error, setError] = useState(""),
    [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);
  async function toggle() {
    try {
      setError("");
      if (audio.current.paused) await audio.current.play();
      else audio.current.pause();
    } catch {
      setError(
        "The little tune couldn’t start. Try again when you feel like it.",
      );
    }
  }
  function changed(value) {
    setPlaying(value);
    onPlaying?.(value);
  }
  return (
    <section className="music-card" aria-labelledby="music-heading">
      <div className="card-eyebrow">
        <Icon name="music" size={16} />
        <span>A LITTLE COMPANY</span>
      </div>
      <div className="music-heading">
        <div>
          <h2 id="music-heading">
            For the moments
            <br />
            <em>words can wait.</em>
          </h2>
          <p>Put on a song. Stay a little while.</p>
        </div>
        <span className="music-heart" aria-hidden="true">
          ♡
        </span>
      </div>
      {online ? (
        <iframe
          title="Yellow Hearts by Ant Saunders — Spotify player"
          src={`https://open.spotify.com/embed/track/${SONG}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="spotify-player"
        />
      ) : (
        <p className="offline-song">
          Yellow Hearts needs internet. Our little instrumental below is still
          here.
        </p>
      )}
      <div className="music-source">
        <a
          href={`https://open.spotify.com/track/${SONG}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Yellow Hearts · Ant Saunders <Icon name="arrow" size={13} />
        </a>
        <small>Playback and previews are provided by Spotify.</small>
      </div>
      <div className="local-tune">
        <button
          type="button"
          className={"record " + (playing ? "playing" : "")}
          aria-label={
            playing
              ? "Pause the little instrumental"
              : "Play the little instrumental"
          }
          onClick={toggle}
        >
          <span>
            <Icon name={playing ? "pause" : "play"} size={14} />
          </span>
        </button>
        <div>
          <b>A little place to land</b>
          <p>An original instrumental, made for this world.</p>
        </div>
        <span className="tune-length">1:35</span>
      </div>
      <audio
        ref={audio}
        src="/audio/a-little-place-to-land.mp3"
        preload="none"
        onPlaying={() => changed(true)}
        onPause={() => changed(false)}
        onEnded={() => changed(false)}
        onError={() => {
          changed(false);
          setError(
            "The little tune isn’t available right now. You can try again.",
          );
        }}
      />
      {error && (
        <p role="status" className="music-error">
          {error}
        </p>
      )}
    </section>
  );
}

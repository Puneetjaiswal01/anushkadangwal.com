import React, { useEffect, useRef, useState } from "react";
import { songSuggestions } from "./heart-content";
import "./music-room.css";

const clock = (value) => {
  const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
};

export default function MusicRoom() {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const element = audio.current;
    element.volume = 0.35;
    return () => element.pause();
  }, []);

  async function toggleMusic() {
    const element = audio.current;
    if (!element) return;
    if (!element.paused) {
      element.pause();
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (element.error) element.load();
      if (element.ended) element.currentTime = 0;
      await element.play();
    } catch {
      setPlaying(false);
      setError(
        "The little tune couldn’t start. Try again, or choose a song below.",
      );
    } finally {
      setLoading(false);
    }
  }

  function changeVolume(event) {
    const value = Number(event.target.value);
    setVolume(value);
    if (audio.current) audio.current.volume = value;
  }

  return (
    <section id="music" className="music-room" aria-labelledby="music-title">
      <div className="music-room-inner">
        <div className="music-heading">
          <span className="music-kicker">IF WORDS FEEL LIKE TOO MUCH</span>
          <h2 id="music-title">
            We can just sit here.
            <br />
            <em>And listen.</em>
          </h2>
          <p>
            No advice for a minute. No need to answer.
            <br />
            Just something soft to keep you company.
          </p>
        </div>
        <div className="music-player-layout">
          <div className="music-record-scene" aria-hidden="true">
            <span className="music-orbit music-orbit-one" />
            <span className="music-orbit music-orbit-two" />
            <span className="music-distant-star">✧</span>
            <div
              className={`music-record ${playing ? "music-record-playing" : ""}`}
            >
              <div className="music-record-label">
                <span>always,</span>
                <b>anushka</b>
                <i>♡</i>
              </div>
            </div>
            <p className="music-record-caption">
              a little music. a little less noise.
            </p>
          </div>
          <div className="music-player-copy">
            <span className="music-track-type">
              AN ORIGINAL LITTLE INSTRUMENTAL
            </span>
            <h3>A little place to land</h3>
            <p>
              A quiet melody made for this little world. No words to follow.
              Nothing you need to feel on cue.
            </p>
            <audio
              ref={audio}
              src="/audio/a-little-place-to-land.mp3"
              preload="none"
              onPlaying={() => {
                setPlaying(true);
                setLoading(false);
              }}
              onPause={() => {
                setPlaying(false);
                setLoading(false);
              }}
              onEnded={() => {
                setPlaying(false);
                setLoading(false);
              }}
              onTimeUpdate={(event) =>
                setPosition(event.currentTarget.currentTime)
              }
              onLoadedMetadata={(event) =>
                setDuration(event.currentTarget.duration)
              }
              onDurationChange={(event) =>
                setDuration(event.currentTarget.duration)
              }
              onError={() => {
                setPlaying(false);
                setLoading(false);
                setError(
                  "The little tune couldn’t load. You can retry, or choose a song below.",
                );
              }}
            />
            <div className="music-controls">
              <button
                className="music-play"
                onClick={toggleMusic}
                disabled={loading}
                aria-label={
                  loading
                    ? "Loading music"
                    : playing
                      ? "Pause little instrumental"
                      : error
                        ? "Retry little instrumental"
                        : "Play little instrumental"
                }
              >
                <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
                {loading
                  ? "One little moment…"
                  : playing
                    ? "Pause for a moment"
                    : error
                      ? "Try the tune again"
                      : "Play a little softness"}
              </button>
              <span
                className="music-time"
                aria-label={`${clock(position)} elapsed${duration ? ` of ${clock(duration)}` : ""}`}
              >
                {clock(position)}
                {duration > 0 ? ` / ${clock(duration)}` : ""}
              </span>
            </div>
            <div className="music-volume-control">
              <label htmlFor="music-volume">Volume</label>
              <input
                id="music-volume"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={changeVolume}
                aria-valuetext={`${Math.round(volume * 100)} percent`}
              />
              <span aria-hidden="true">{Math.round(volume * 100)}%</span>
            </div>
            <p className="music-player-note" aria-live="polite">
              {error ||
                (playing
                  ? "Playing softly. Stay as long as you like."
                  : "Only plays when you choose. Start softly; your volume is yours.")}
            </p>
          </div>
        </div>
        <div className="music-songs-heading">
          <span>A FEW SONGS TO COME BACK TO</span>
          <p>Maybe one of these sounds like the moment you need.</p>
        </div>
        <div className="music-songs-grid">
          {songSuggestions.map((song, index) => (
            <article className="music-song" key={song.title}>
              <span className="music-song-number">0{index + 1}</span>
              <h3>{song.title}</h3>
              <span className="music-artist">{song.artist}</span>
              <p>{song.note}</p>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.query)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Find ${song.title} on YouTube, opens in a new tab`}
              >
                Find on YouTube <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="music-links-note">
          Song links open YouTube in a new tab. No music starts by itself.
        </p>
      </div>
    </section>
  );
}

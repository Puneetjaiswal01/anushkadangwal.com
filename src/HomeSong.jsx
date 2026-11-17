import React, { useEffect, useState } from "react";
const SONG = "2W4yABdLc4Jnds67Poi5Nl";
export default function HomeSong() {
  const [online, setOnline] = useState(() => navigator.onLine);
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);
  return (
    <section className="home-song" aria-labelledby="home-song-title">
      <div className="home-song-heading">
        <span className="home-song-heart" aria-hidden="true">
          💛
        </span>
        <div>
          <span className="eyebrow">NO PEP TALK. JUST A SONG.</span>
          <h2 id="home-song-title">Yellow Hearts</h2>
          <p>Ant Saunders · a little company for right now.</p>
        </div>
        <a
          href={`https://open.spotify.com/track/${SONG}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Yellow Hearts by Ant Saunders on Spotify, opens a new tab"
        >
          Spotify ↗
        </a>
      </div>
      {online ? (
        <iframe
          className="home-song-player"
          title="Yellow Hearts by Ant Saunders — Spotify player"
          src={`https://open.spotify.com/embed/track/${SONG}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <p className="home-song-offline">
          This song needs internet. Your little instrumental below still plays
          offline.
        </p>
      )}
      <div className="home-song-note">
        <span>Press play in the player. Nothing starts on its own.</span>
        <a
          href="https://open.spotify.com/search/Yellow%20Hearts%20Ant%20Saunders"
          target="_blank"
          rel="noopener noreferrer"
        >
          Player not loading? Find the song ↗
        </a>
      </div>
      <p className="home-song-provider">
        Spotify controls playback and may offer a preview or ask you to open its
        app.
      </p>
    </section>
  );
}

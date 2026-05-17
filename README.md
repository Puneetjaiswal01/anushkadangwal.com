<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Anushka Dangwal — A Love Letter in a Website</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Pinyon+Script&display=swap" rel="stylesheet">
<style>
  :root {
    --blush: #f2c4ce;
    --rose: #d4788a;
    --deep: #8b2a3a;
    --cream: #fdf6f0;
    --warm: #f7ede6;
    --gold: #c9a96e;
    --text: #2c1810;
    --muted: #7a5c58;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--cream);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  /* Custom cursor */
  .cursor {
    width: 12px; height: 12px;
    background: var(--rose);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, width 0.2s, height 0.2s, background 0.2s;
    mix-blend-mode: multiply;
  }
  .cursor-follower {
    width: 36px; height: 36px;
    border: 1px solid var(--rose);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease, left 0.12s ease, top 0.12s ease;
    opacity: 0.5;
  }

  /* Nav */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(253,246,240,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(212,120,138,0.15);
  }
  nav .logo {
    font-family: 'Pinyon Script', cursive;
    font-size: 2rem;
    color: var(--rose);
    letter-spacing: 1px;
  }
  nav ul {
    list-style: none;
    display: flex;
    gap: 2.5rem;
  }
  nav ul a {
    text-decoration: none;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.3s;
  }
  nav ul a:hover { color: var(--rose); }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: var(--warm);
    padding-top: 80px;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(242,196,206,0.4) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 60% 80%, rgba(212,120,138,0.15) 0%, transparent 50%);
  }
  .hero-content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    max-width: 1200px;
    padding: 0 3rem;
    width: 100%;
  }
  .hero-text { }
  .hero-tag {
    display: inline-block;
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid var(--gold);
    padding: 0.4rem 1rem;
    border-radius: 99px;
    margin-bottom: 1.5rem;
    animation: fadeUp 1s ease forwards;
  }
  .hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 7vw, 6rem);
    font-weight: 300;
    line-height: 1.05;
    color: var(--text);
    animation: fadeUp 1s 0.2s ease forwards;
    opacity: 0;
  }
  .hero-name em {
    font-style: italic;
    color: var(--rose);
    display: block;
  }
  .hero-sub {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.8;
    font-weight: 300;
    animation: fadeUp 1s 0.4s ease forwards;
    opacity: 0;
    max-width: 420px;
  }
  .hero-location {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--muted);
    animation: fadeUp 1s 0.6s ease forwards;
    opacity: 0;
  }
  .hero-location span { color: var(--rose); font-size: 1rem; }
  .hero-cta {
    margin-top: 2.5rem;
    display: flex;
    gap: 1rem;
    animation: fadeUp 1s 0.8s ease forwards;
    opacity: 0;
  }
  .btn-primary {
    padding: 0.9rem 2rem;
    background: var(--rose);
    color: white;
    border: none;
    border-radius: 99px;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: none;
    text-decoration: none;
    transition: background 0.3s, transform 0.2s;
  }
  .btn-primary:hover { background: var(--deep); transform: translateY(-2px); }
  .btn-outline {
    padding: 0.9rem 2rem;
    background: transparent;
    color: var(--rose);
    border: 1px solid var(--rose);
    border-radius: 99px;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: none;
    text-decoration: none;
    transition: all 0.3s;
  }
  .btn-outline:hover { background: var(--rose); color: white; transform: translateY(-2px); }

  .hero-image {
    position: relative;
    animation: fadeUp 1s 0.3s ease forwards;
    opacity: 0;
  }
  .hero-img-frame {
    position: relative;
    border-radius: 60% 40% 55% 45% / 50% 45% 55% 50%;
    overflow: hidden;
    aspect-ratio: 3/4;
    max-height: 580px;
    border: 3px solid rgba(212,120,138,0.3);
  }
  .hero-img-frame img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 8s ease;
  }
  .hero-img-frame:hover img { transform: scale(1.05); }
  .hero-float-card {
    position: absolute;
    bottom: 40px;
    left: -40px;
    background: white;
    border-radius: 16px;
    padding: 1rem 1.25rem;
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    animation: float 4s ease-in-out infinite;
  }
  .hero-float-card .icon { font-size: 1.5rem; }
  .hero-float-card .card-text { font-size: 0.75rem; }
  .hero-float-card .card-text strong { display: block; font-size: 0.85rem; color: var(--text); }
  .hero-float-card .card-text span { color: var(--muted); }

  .hero-float-card2 {
    position: absolute;
    top: 40px;
    right: -30px;
    background: var(--deep);
    color: white;
    border-radius: 16px;
    padding: 1rem 1.25rem;
    animation: float 5s 1s ease-in-out infinite;
    text-align: center;
  }
  .hero-float-card2 .big { font-family: 'Cormorant Garamond', serif; font-size: 2rem; line-height: 1; }
  .hero-float-card2 .small { font-size: 0.7rem; letter-spacing: 0.1em; opacity: 0.8; text-transform: uppercase; margin-top: 2px; }

  /* Birthday countdown */
  .countdown-section {
    background: var(--deep);
    color: white;
    padding: 4rem 3rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .countdown-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(212,120,138,0.2) 0%, transparent 70%);
  }
  .countdown-label {
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--blush);
    margin-bottom: 1rem;
  }
  .countdown-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 300;
    margin-bottom: 2.5rem;
  }
  .countdown-title em { font-style: italic; color: var(--blush); }
  .countdown-grid {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  .countdown-item {
    text-align: center;
    min-width: 100px;
  }
  .countdown-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem;
    font-weight: 300;
    line-height: 1;
    color: var(--blush);
    display: block;
  }
  .countdown-unit {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0.6;
    margin-top: 0.5rem;
    display: block;
  }
  .countdown-sep {
    font-size: 3rem;
    color: var(--rose);
    align-self: center;
    opacity: 0.5;
    margin-top: -1rem;
  }

  /* Story / About */
  .story-section {
    padding: 8rem 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  .section-tag {
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
    display: block;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  .section-title em { font-style: italic; color: var(--rose); }

  .story-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
    margin-top: 4rem;
  }
  .story-text p {
    font-size: 1.05rem;
    line-height: 1.9;
    color: var(--muted);
    margin-bottom: 1.5rem;
    font-weight: 300;
  }
  .story-text p strong { color: var(--text); font-weight: 500; }
  .story-image-collage {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 12px;
  }
  .collage-img {
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 1;
  }
  .collage-img:first-child {
    grid-column: 1 / 3;
    aspect-ratio: 16/9;
  }
  .collage-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.6s ease;
  }
  .collage-img:hover img { transform: scale(1.05); }

  /* Traits */
  .traits-section {
    background: var(--warm);
    padding: 6rem 3rem;
  }
  .traits-inner {
    max-width: 1200px;
    margin: 0 auto;
  }
  .traits-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3rem;
  }
  .trait-card {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(212,120,138,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
    overflow: hidden;
  }
  .trait-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--rose), var(--gold));
  }
  .trait-card:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(139,42,58,0.1); }
  .trait-icon { font-size: 2rem; margin-bottom: 1rem; display: block; }
  .trait-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 0.75rem;
    color: var(--text);
  }
  .trait-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.7; font-weight: 300; }

  /* Love letter */
  .letter-section {
    padding: 8rem 3rem;
    background: var(--deep);
    color: white;
    position: relative;
    overflow: hidden;
  }
  .letter-section::before {
    content: '"';
    position: absolute;
    top: -2rem;
    left: 3rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 20rem;
    color: rgba(255,255,255,0.03);
    line-height: 1;
  }
  .letter-inner {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
  }
  .letter-from {
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--blush);
    margin-bottom: 2rem;
  }
  .letter-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 300;
    font-style: italic;
    margin-bottom: 3rem;
    line-height: 1.2;
  }
  .letter-body {
    font-size: 1.1rem;
    line-height: 2;
    color: rgba(255,255,255,0.8);
    font-weight: 300;
    text-align: left;
    border-left: 2px solid var(--rose);
    padding-left: 2rem;
    margin-bottom: 2rem;
  }
  .letter-body p { margin-bottom: 1.5rem; }
  .letter-signature {
    font-family: 'Pinyon Script', cursive;
    font-size: 3rem;
    color: var(--blush);
    text-align: right;
    margin-top: 2rem;
  }

  /* Distance section */
  .distance-section {
    padding: 8rem 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  .distance-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 3rem;
    align-items: center;
    margin-top: 4rem;
  }
  .city-card {
    text-align: center;
    padding: 3rem 2rem;
    border-radius: 20px;
    background: white;
    border: 1px solid rgba(212,120,138,0.15);
    box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  }
  .city-flag { font-size: 3rem; margin-bottom: 1rem; display: block; }
  .city-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    font-weight: 400;
    color: var(--text);
    margin-bottom: 0.5rem;
  }
  .city-desc { font-size: 0.85rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }
  .city-person { color: var(--rose); font-weight: 500; margin-top: 0.75rem; display: block; font-size: 0.9rem; }
  .distance-mid {
    text-align: center;
  }
  .distance-km {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    color: var(--rose);
    display: block;
    line-height: 1;
  }
  .distance-label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.15em; margin-top: 0.5rem; display: block; }
  .distance-heart { font-size: 2rem; display: block; margin-top: 1rem; animation: heartbeat 1.5s ease-in-out infinite; }
  .distance-quote {
    text-align: center;
    margin-top: 3rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-style: italic;
    color: var(--muted);
    max-width: 600px;
    margin: 3rem auto 0;
  }

  /* Gallery */
  .gallery-section {
    padding: 8rem 3rem;
    background: var(--warm);
  }
  .gallery-inner { max-width: 1400px; margin: 0 auto; }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 280px;
    gap: 12px;
    margin-top: 3rem;
  }
  .gallery-item {
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    cursor: none;
  }
  .gallery-item:nth-child(3n+1) { grid-row: span 2; }
  .gallery-item:nth-child(5) { grid-column: span 2; }
  .gallery-item img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.6s ease;
  }
  .gallery-item:hover img { transform: scale(1.08); }
  .gallery-item .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(139,42,58,0.6) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;
  }
  .gallery-item:hover .overlay { opacity: 1; }
  .overlay-text {
    color: white;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-style: italic;
  }

  /* Lightbox */
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    z-index: 1000;
    display: none;
    align-items: center;
    justify-content: center;
  }
  .lightbox.active { display: flex; }
  .lightbox img { max-width: 90vw; max-height: 90vh; object-fit: contain; border-radius: 8px; }
  .lightbox-close {
    position: absolute;
    top: 2rem; right: 2rem;
    color: white;
    font-size: 2rem;
    cursor: none;
    background: none;
    border: none;
    line-height: 1;
  }
  .lightbox-prev, .lightbox-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 2rem;
    background: rgba(255,255,255,0.1);
    border: none;
    width: 50px; height: 50px;
    border-radius: 50%;
    cursor: none;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .lightbox-prev { left: 2rem; }
  .lightbox-next { right: 2rem; }
  .lightbox-prev:hover, .lightbox-next:hover { background: rgba(212,120,138,0.5); }

  /* Quotes */
  .quotes-section {
    padding: 8rem 3rem;
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }
  .quotes-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 3rem;
  }
  .quote-card {
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    border: 1px solid rgba(212,120,138,0.1);
    text-align: left;
    position: relative;
    transition: transform 0.3s;
  }
  .quote-card:hover { transform: translateY(-5px); }
  .quote-card::before {
    content: '"';
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem;
    color: var(--blush);
    line-height: 0.5;
    display: block;
    margin-bottom: 1rem;
  }
  .quote-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-style: italic;
    color: var(--text);
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  .quote-author { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }

  /* Jaat x Pahadi */
  .roots-section {
    background: var(--deep);
    padding: 6rem 3rem;
    color: white;
    text-align: center;
  }
  .roots-inner { max-width: 900px; margin: 0 auto; }
  .roots-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    align-items: center;
    margin-top: 3rem;
  }
  .root-card {
    background: rgba(255,255,255,0.06);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .root-emoji { font-size: 3rem; display: block; margin-bottom: 1rem; }
  .root-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
  .root-sub { font-size: 0.85rem; opacity: 0.6; letter-spacing: 0.1em; }
  .root-desc { font-size: 0.9rem; opacity: 0.75; line-height: 1.7; margin-top: 1rem; font-weight: 300; }
  .root-plus {
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem;
    color: var(--blush);
    opacity: 0.6;
  }
  .roots-tagline {
    margin-top: 3rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-style: italic;
    color: var(--blush);
    opacity: 0.9;
  }

  /* Instagram */
  .social-section {
    padding: 6rem 3rem;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  .insta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.1rem 2.5rem;
    background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    color: white;
    border-radius: 99px;
    text-decoration: none;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 2rem;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .insta-btn:hover { transform: translateY(-3px); box-shadow: 0 20px 40px rgba(220,39,67,0.3); }

  /* Footer */
  footer {
    background: var(--text);
    color: white;
    padding: 4rem 3rem;
    text-align: center;
  }
  .footer-name {
    font-family: 'Pinyon Script', cursive;
    font-size: 4rem;
    color: var(--blush);
    margin-bottom: 1rem;
  }
  .footer-sub { font-size: 0.8rem; color: rgba(255,255,255,0.4); letter-spacing: 0.15em; text-transform: uppercase; }
  .footer-heart { color: var(--rose); font-size: 1.2rem; margin: 1.5rem 0; display: block; }
  .footer-from { font-size: 0.85rem; color: rgba(255,255,255,0.5); }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }

  /* Scroll reveal */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Responsive */
  @media (max-width: 900px) {
    nav { padding: 1rem 1.5rem; }
    nav ul { gap: 1.5rem; }
    .hero-content { grid-template-columns: 1fr; text-align: center; padding: 1.5rem; gap: 2rem; }
    .hero-image { order: -1; max-width: 360px; margin: 0 auto; }
    .hero-sub { max-width: 100%; }
    .hero-cta { justify-content: center; }
    .story-grid { grid-template-columns: 1fr; }
    .traits-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    .gallery-item:nth-child(3n+1) { grid-row: span 1; }
    .gallery-item:nth-child(5) { grid-column: span 1; }
    .distance-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    .roots-grid { grid-template-columns: 1fr; }
    .root-plus { display: none; }
    .quotes-grid { grid-template-columns: 1fr; }
    .hero-float-card, .hero-float-card2 { display: none; }
    body { cursor: auto; }
    .cursor, .cursor-follower { display: none; }
  }
</style>
</head>
<body>

<div class="cursor" id="cursor"></div>
<div class="cursor-follower" id="follower"></div>

<!-- Lightbox -->
<div class="lightbox" id="lightbox">
  <button class="lightbox-close" id="lb-close">✕</button>
  <button class="lightbox-prev" id="lb-prev">‹</button>
  <img id="lb-img" src="" alt="">
  <button class="lightbox-next" id="lb-next">›</button>
</div>

<!-- Nav -->
<nav>
  <div class="logo">Anushka</div>
  <ul>
    <li><a href="#about">About</a></li>
    <li><a href="#letter">Letter</a></li>
    <li><a href="#gallery">Gallery</a></li>
    <li><a href="#us">Our Story</a></li>
  </ul>
</nav>

<!-- Hero -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-content">
    <div class="hero-text">
      <div class="hero-tag">✦ Made with love, by Puneet</div>
      <h1 class="hero-name">
        Anushka<br>
        <em>Dangwal</em>
      </h1>
      <p class="hero-sub">A Pahadi girl with mountains in her heart, grace in her smile, and the kind of warmth that makes everywhere feel like home.</p>
      <div class="hero-location">
        <span>📍</span> Dehradun, Uttarakhand
      </div>
      <div class="hero-cta">
        <a href="#letter" class="btn-primary">Read Her Letter</a>
        <a href="#gallery" class="btn-outline">See Gallery</a>
      </div>
    </div>
    <div class="hero-image">
      <div class="hero-img-frame">
        <img src="https://drive.google.com/uc?export=view&id=1QOi4UDqsBeDVQjBn1-38Fb3N8cc9Ne78" alt="Anushka Dangwal">
      </div>
      <div class="hero-float-card">
        <span class="icon">🌸</span>
        <div class="card-text">
          <strong>Anushka Dangwal</strong>
          <span>Dehradun, Uttarakhand</span>
        </div>
      </div>
      <div class="hero-float-card2">
        <div class="big">♡</div>
        <div class="small">Always & Forever</div>
      </div>
    </div>
  </div>
</section>

<!-- Countdown -->
<section class="countdown-section">
  <p class="countdown-label">✦ Counting down to something special</p>
  <h2 class="countdown-title">Her Birthday is <em>Almost Here</em></h2>
  <div class="countdown-grid">
    <div class="countdown-item">
      <span class="countdown-num" id="cd-days">00</span>
      <span class="countdown-unit">Days</span>
    </div>
    <span class="countdown-sep">:</span>
    <div class="countdown-item">
      <span class="countdown-num" id="cd-hours">00</span>
      <span class="countdown-unit">Hours</span>
    </div>
    <span class="countdown-sep">:</span>
    <div class="countdown-item">
      <span class="countdown-num" id="cd-mins">00</span>
      <span class="countdown-unit">Minutes</span>
    </div>
    <span class="countdown-sep">:</span>
    <div class="countdown-item">
      <span class="countdown-num" id="cd-secs">00</span>
      <span class="countdown-unit">Seconds</span>
    </div>
  </div>
</section>

<!-- About / Story -->
<section class="story-section" id="about">
  <div class="reveal">
    <span class="section-tag">✦ The girl behind the smile</span>
    <h2 class="section-title">About <em>Anushka</em></h2>
  </div>
  <div class="story-grid reveal">
    <div class="story-text">
      <p>Born and raised in the lap of the <strong>Himalayas</strong>, Anushka Dangwal is everything the mountains stand for — strong, breathtaking, and quietly magnificent. Dehradun didn't just give her a hometown, it gave her a soul that carries the serenity of pine forests and the warmth of mountain sunshine.</p>
      <p>She just completed her <strong>B.Com</strong> — a chapter closed with grace and a world of possibilities now open before her. Smart, sharp, and quietly ambitious, she carries her education the same way she carries herself: with elegance.</p>
      <p>She is a <strong>Pahadi Brahmin</strong> girl — rooted in culture, tradition, and values that run deeper than the Ganga itself. There's a certain quiet confidence that comes from knowing exactly who you are and where you come from. Anushka has that in abundance.</p>
      <p>She laughs like she means it. She loves like it costs her nothing. And somehow, even across hundreds of kilometres, she manages to feel like <strong>home</strong>.</p>
    </div>
    <div class="story-image-collage">
      <div class="collage-img">
        <img src="https://drive.google.com/uc?export=view&id=1VYQouwscxGic_pFtGo3AKa76x4YSjCpy" alt="Anushka">
      </div>
      <div class="collage-img">
        <img src="https://drive.google.com/uc?export=view&id=1J4-QWf47nZZW-eYaFt_VnMlmPQMh-c4W" alt="Anushka">
      </div>
      <div class="collage-img">
        <img src="https://drive.google.com/uc?export=view&id=1yoD_inKKToc4ph8RalyggU5n9LoArrSv" alt="Anushka">
      </div>
    </div>
  </div>
</section>

<!-- Traits -->
<section class="traits-section">
  <div class="traits-inner">
    <div class="reveal" style="text-align:center;">
      <span class="section-tag">✦ What makes her, her</span>
      <h2 class="section-title">Things We <em>Love</em> About Her</h2>
    </div>
    <div class="traits-grid reveal">
      <div class="trait-card">
        <span class="trait-icon">🏔️</span>
        <h3 class="trait-title">Mountain Soul</h3>
        <p class="trait-desc">She carries the calm of the Himalayas within her. In a world full of noise, she is the quiet that heals. Dehradun shaped her, and you can see it in every gesture — grounded, serene, real.</p>
      </div>
      <div class="trait-card">
        <span class="trait-icon">💫</span>
        <h3 class="trait-title">Effortless Grace</h3>
        <p class="trait-desc">She doesn't try to be beautiful. She just is. The kind of person who walks into a room and changes its energy without saying a word. There's a warmth to her that's impossible to ignore.</p>
      </div>
      <div class="trait-card">
        <span class="trait-icon">📚</span>
        <h3 class="trait-title">Sharp & Driven</h3>
        <p class="trait-desc">A B.Com graduate with big dreams ahead. She's not just pretty — she's brilliant. The kind of woman who knows what she wants and works quietly until she has it. Ambition wrapped in softness.</p>
      </div>
      <div class="trait-card">
        <span class="trait-icon">❤️</span>
        <h3 class="trait-title">Loves Fiercely</h3>
        <p class="trait-desc">Distance, arguments, differences — none of it dulls her love. She loves with everything she has. The kind of love that makes you want to be better just to be worthy of it.</p>
      </div>
      <div class="trait-card">
        <span class="trait-icon">🌸</span>
        <h3 class="trait-title">Culture & Roots</h3>
        <p class="trait-desc">Deeply rooted in her Pahadi Brahmin heritage, she carries traditions with pride and joy. She knows who she is, where she comes from, and that foundation makes her unshakeable.</p>
      </div>
      <div class="trait-card">
        <span class="trait-icon">✨</span>
        <h3 class="trait-title">Her Laugh</h3>
        <p class="trait-desc">If you've heard her laugh — really laugh — you know. It's the kind that makes everything around it stop and listen. Pure, unfiltered, completely her. The best sound in any room.</p>
      </div>
    </div>
  </div>
</section>

<!-- Love Letter -->
<section class="letter-section" id="letter">
  <div class="letter-inner reveal">
    <p class="letter-from">✦ A letter from Puneet, with all his heart</p>
    <h2 class="letter-title">"To the girl who lives 300 kilometres away<br>but somehow never feels far"</h2>
    <div class="letter-body">
      <p>Anushka,</p>
      <p>I don't know how to explain what it felt like the first time we met. I just know that something shifted — the way things do when something important walks into your life, even before you understand why.</p>
      <p>We fight. God, we fight. And sometimes I'm not sure if I want to argue with you or just hold on to you because at least when we're arguing, I know you're still there. I know you still care. And I'll take that over silence any day.</p>
      <p>You're from the mountains — Dehradun, where the air is clean and the people are rooted. I'm from Gurgaon — fast, loud, relentless. A Jaat boy who met a Pahadi girl, and somehow the distance between those worlds felt smaller than the distance between two cities.</p>
      <p>But 300 kilometres is real. And some days it feels like 3,000. I hate the goodbyes. I hate the bad network calls. I hate the time zones of missing you. But I'd choose all of it, again and again, because the moments I get with you — they are worth every kilometre.</p>
      <p>Happy Birthday, Anushka. I made you a whole website because some feelings are too big for a message. You deserve something that stays — something you can come back to when you need to remember that someone out there thinks you're the most extraordinary person in any room.</p>
      <p>That someone is me. Always.</p>
    </div>
    <div class="letter-signature">Puneet ♡</div>
  </div>
</section>

<!-- Distance Section -->
<section class="distance-section" id="us">
  <div class="reveal" style="text-align:center;">
    <span class="section-tag">✦ Two cities, one heart</span>
    <h2 class="section-title">The <em>Distance</em> Between Us</h2>
  </div>
  <div class="distance-grid reveal">
    <div class="city-card">
      <span class="city-flag">🏔️</span>
      <div class="city-name">Dehradun</div>
      <div class="city-desc">Uttarakhand, India</div>
      <span class="city-person">Home of Anushka ♡</span>
    </div>
    <div class="distance-mid">
      <span class="distance-km">~300</span>
      <span class="distance-label">Kilometres Apart</span>
      <span class="distance-heart">♡</span>
    </div>
    <div class="city-card">
      <span class="city-flag">🏙️</span>
      <div class="city-name">Gurgaon</div>
      <div class="city-desc">Haryana, India</div>
      <span class="city-person">Home of Puneet ♡</span>
    </div>
  </div>
  <p class="distance-quote reveal">"Distance means so little when someone means so much. Every kilometre between us is just proof of how far I'd go for you."</p>
</section>

<!-- Roots Section -->
<section class="roots-section">
  <div class="roots-inner">
    <div class="reveal">
      <span class="section-tag" style="color:var(--blush);">✦ Two worlds, one love</span>
      <h2 class="section-title" style="color:white;">A <em style="color:var(--blush);">Jaat</em> & A <em style="color:var(--blush);">Pahadi</em></h2>
    </div>
    <div class="roots-grid reveal">
      <div class="root-card">
        <span class="root-emoji">⚔️</span>
        <div class="root-title">The Jaat</div>
        <div class="root-sub">Gurgaon, Haryana</div>
        <p class="root-desc">Bold, straightforward, and fiercely loyal. Puneet comes from a lineage of people who stand firm — in their beliefs, their love, their word. He loves loudly and without apology.</p>
      </div>
      <div class="root-plus">×</div>
      <div class="root-card">
        <span class="root-emoji">🌿</span>
        <div class="root-title">The Pahadi</div>
        <div class="root-sub">Dehradun, Uttarakhand</div>
        <p class="root-desc">Rooted like the deodars of her mountains. A Brahmin girl with grace, culture, and a quiet strength that only those raised by hills can have. She loves deeply and enduringly.</p>
      </div>
    </div>
    <p class="roots-tagline reveal">"Different roots. Same sky. One story."</p>
  </div>
</section>

<!-- Gallery -->
<section class="gallery-section" id="gallery">
  <div class="gallery-inner">
    <div class="reveal" style="text-align:center;">
      <span class="section-tag">✦ Memories in frames</span>
      <h2 class="section-title">Our <em>Gallery</em></h2>
      <p style="color:var(--muted);font-size:0.9rem;margin-top:0.5rem;">Click any photo to view full size</p>
    </div>
    <div class="gallery-grid reveal" id="gallery-grid">
      <!-- Photos inserted by JS -->
    </div>
  </div>
</section>

<!-- Quotes -->
<section class="quotes-section">
  <div class="reveal">
    <span class="section-tag">✦ Words that feel like us</span>
    <h2 class="section-title">Thoughts on <em>Love & Distance</em></h2>
  </div>
  <div class="quotes-grid reveal">
    <div class="quote-card">
      <p class="quote-text">The scariest thing about distance is you don't know whether they'll miss you or forget you.</p>
      <span class="quote-author">— Nicholas Sparks</span>
    </div>
    <div class="quote-card">
      <p class="quote-text">I carry your heart with me. I carry it in my heart.</p>
      <span class="quote-author">— E.E. Cummings</span>
    </div>
    <div class="quote-card">
      <p class="quote-text">In true love, the smallest distance is too great, and the greatest distance can be bridged.</p>
      <span class="quote-author">— Hans Nouwens</span>
    </div>
    <div class="quote-card">
      <p class="quote-text">I exist in two places — here, and where you are.</p>
      <span class="quote-author">— Margaret Atwood</span>
    </div>
  </div>
</section>

<!-- Instagram -->
<section class="social-section">
  <div class="reveal" style="text-align:center;">
    <span class="section-tag">✦ Follow her journey</span>
    <h2 class="section-title">Find Her on <em>Instagram</em></h2>
    <p style="color:var(--muted);font-size:0.95rem;line-height:1.8;margin-top:1rem;">She's as beautiful online as she is in real life.<br>Go say hello — she deserves all the love.</p>
    <a href="https://www.instagram.com/_.anu.shka_" target="_blank" class="insta-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      @_.anu.shka_
    </a>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-name">Anushka Dangwal</div>
  <div class="footer-sub">Dehradun · Uttarakhand · India</div>
  <span class="footer-heart">♡</span>
  <div class="footer-from">Made with love by Puneet Jaiswal, Gurgaon — for her birthday, 5th July</div>
  <div style="margin-top:1rem;font-size:0.75rem;color:rgba(255,255,255,0.2);">anushkadangwal.com</div>
</footer>

<script>
// Custom cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('follower');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
function animFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) *.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animFollower);
}
animFollower();

// Countdown to July 5
function updateCountdown() {
  const now = new Date();
  let bday = new Date(now.getFullYear(), 6, 5); // July = month 6
  if (now > bday) bday = new Date(now.getFullYear() + 1, 6, 5);
  const diff = bday - now;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Gallery photos
const photoIds = [
  '1QOi4UDqsBeDVQjBn1-38Fb3N8cc9Ne78',
  '1VYQouwscxGic_pFtGo3AKa76x4YSjCpy',
  '1J4-QWf47nZZW-eYaFt_VnMlmPQMh-c4W',
  '1yoD_inKKToc4ph8RalyggU5n9LoArrSv',
  '1Y8tWuyws81IDb43BvCbciUfhpzZwGxif',
  '17abdrfHiU_uz7gs0wHLov4UGpIBl7K21',
  '17u7lFyZGZpE6Qwx1akXL6llY8JSSeiwq',
  '1QR_MrveQ4ExbrUEj__3dNzPptQO4x-90',
  '1FzeaLHz7T-z7H8mNAjiekI2DCqw3Oi5D',
  '1Q5UzmGOkE7GkmkkL_s0m5UfOX3KYMmAr',
  '1Fkwi_ARyZ6cyTfLXjwNxnLkGjvO1WgDB',
  '1g3O5-1LOuJ7BzWnOelHZlP3n2f8XSyY_',
  '1AOUaH_vsxBsnudi7bkgz1KRY67ZaISvf',
  '1peMptVn8wYH6fQRxtGWDWIBSq39qhEeP',
  '178Jn-3eMp4h2agDIEnRG_LjVpEMow2wK',
  '1A2-5I6L9a0EPvFfC7gFcdtM8wKe7Oj80',
  '1UiMWXD76gOy4ve13lR5DIHqFqBySm17S',
  '1uMj17fYHvumoxcpa0_ShzYDM7Y8KVw2C',
  '1i1LpcbIb3Kr4zWxcsuZU3Q_RKlCI4q8U',
  '1XdmnmY99u2kus_pM4YCH7NYm9fx6itrk',
  '1-uFqf4ySWK7uSFU74Mb3MFK-99KksJ5a',
  '1iqz8STNV89e-b4_t7evNxXOILj5qyCSw',
  '1T4oE9gRZPd5i-zNCTVMscgBaiXzTnXH3'
];

const captions = [
  'Always smiling', 'Pure joy', 'Simply beautiful',
  'Mountain girl', 'Her world', 'Effortless',
  'Candid & real', 'The best moments', 'Unforgettable',
  'She just glows', 'Natural beauty', 'My favorite',
  'Golden hour', 'Pure happiness', 'Timeless',
  'Her laugh though', 'Radiant', 'Just her',
  'Every moment', 'Irreplaceable', 'Our memories',
  'Forever captured', 'The one'
];

const grid = document.getElementById('gallery-grid');
const urls = photoIds.map(id => `https://drive.google.com/uc?export=view&id=${id}`);

photoIds.forEach((id, i) => {
  const url = urls[i];
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.innerHTML = `
    <img src="${url}" alt="Anushka ${i+1}" loading="lazy">
    <div class="overlay"><span class="overlay-text">${captions[i]}</span></div>
  `;
  item.addEventListener('click', () => openLightbox(i));
  grid.appendChild(item);
});

// Lightbox
let currentIdx = 0;
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');

function openLightbox(idx) {
  currentIdx = idx;
  lbImg.src = urls[idx];
  lb.classList.add('active');
}
document.getElementById('lb-close').addEventListener('click', () => lb.classList.remove('active'));
document.getElementById('lb-prev').addEventListener('click', () => {
  currentIdx = (currentIdx - 1 + urls.length) % urls.length;
  lbImg.src = urls[currentIdx];
});
document.getElementById('lb-next').addEventListener('click', () => {
  currentIdx = (currentIdx + 1) % urls.length;
  lbImg.src = urls[currentIdx];
});
lb.addEventListener('click', e => { if(e.target === lb) lb.classList.remove('active'); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') document.getElementById('lb-prev').click();
  if (e.key === 'ArrowRight') document.getElementById('lb-next').click();
  if (e.key === 'Escape') lb.classList.remove('active');
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));
</script>
</body>
</html>

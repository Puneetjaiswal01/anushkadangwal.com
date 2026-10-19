export default function Page() {
  return (
    <main className="farewell">
      <div className="sky" aria-hidden="true">
        <div className="moon float" />
        {Array.from({ length: 65 }, (_, i) => (
          <span className="star" key={i} style={{ left: ((i * 37.73) % 100) + '%', top: ((i * 19.37) % 78) + '%', width: ((i % 3) + 1) + 'px', height: ((i % 3) + 1) + 'px', animationDelay: (i % 7) + 's' }} />
        ))}
        <div className="mountain back" /><div className="mountain" />
      </div>
      <article className="farewell-letter">
        <p className="eyebrow">A little note for you</p>
        <h1>Thank you for everything.</h1>
        <div className="farewell-copy">
          <p>Dear Anushka,</p>
          <p>Thank you for all the beautiful memories, the laughter, and the time we shared. You are one of the happiest, most wonderful people I have ever met, and I will always be grateful to have known you so closely.</p>
          <p>I still love you, and I probably will for a while. I say that simply because it's true, not because I expect anything from you.</p>
          <p>Be blessed. Grow, bloom, and glow. Keep smiling, keep chasing your dreams, and never lose that lovely spark of yours.</p>
          <p>I wish you happiness, peace, and everything good that life has to offer. Take care of yourself, Pahadan.</p>
          <p>Thank you for everything. ♡</p>
        </div>
        <p className="farewell-signoff">Always wishing you well,<span>Jaat ♡</span></p>
      </article>
    </main>
  );
}

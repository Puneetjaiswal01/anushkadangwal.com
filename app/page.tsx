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
        <p className="eyebrow">A little note, from my heart</p>
        <h1>Thank you for everything.</h1>
        <div className="farewell-copy">
          <p>Dear Anushka,</p>
          <p>Some people come into our lives and leave behind memories that will always feel warm, no matter how much time passes. You will always be one of those people for me.</p>
          <p>Thank you for the laughter, the conversations, the little moments, and the happiness we shared. Thank you for being a beautiful part of my life. Even though our paths are different now, I will always be grateful that they crossed.</p>
          <p>You are the happiest, most full-of-life girl I have ever met. I hope you never lose that light in your eyes or the joy that makes you, you. Keep smiling. Keep dreaming. Keep being wonderfully yourself.</p>
          <p>Be blessed. Grow, bloom, and glow. May life be gentle with you, may your hard work take you everywhere you want to go, and may your heart always find peace and reasons to smile.</p>
          <p>There is nothing I ask of you. Just take care of yourself and be happy, truly happy. I will always wish good things for you, even from a distance.</p>
          <p>Not every beautiful story has to last forever to mean something. Ours meant a lot to me.</p>
          <p>Thank you, Pahadan. For everything.</p>
        </div>
        <p className="farewell-signoff">With gratitude and warm wishes,<span>Jaat ♡</span></p>
      </article>
    </main>
  );
}

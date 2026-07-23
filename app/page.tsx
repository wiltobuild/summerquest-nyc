import Link from "next/link";

export default function Home() {
  return (
    <main className="shell landing">
      <nav>
        <Link href="/" className="brand">
          SummerQuest <span>NYC</span>
        </Link>
        <Link href="/featured">Featured Plans</Link>
      </nav>
      <section className="hero">
        <svg
          aria-hidden="true"
          viewBox="0 0 600 160"
          className="skyline"
          preserveAspectRatio="xMaxYMax slice"
        >
          <g fill="#12192b" opacity="0.06">
            <rect x="40" y="70" width="26" height="90" />
            <rect x="75" y="40" width="22" height="120" />
            <rect x="105" y="90" width="30" height="70" />
            <rect x="145" y="20" width="18" height="140" />
            <rect x="170" y="60" width="26" height="100" />
            <polygon points="183,60 170,60 196,60 196,60 183,20" />
            <rect x="205" y="85" width="24" height="75" />
            <rect x="238" y="50" width="20" height="110" />
            <rect x="266" y="100" width="34" height="60" />
            <rect x="310" y="30" width="16" height="130" />
            <rect x="335" y="65" width="28" height="95" />
            <rect x="372" y="45" width="22" height="115" />
            <rect x="403" y="95" width="26" height="65" />
          </g>
        </svg>
        <p className="eyebrow">NYC, planned around your actual day</p>
        <h1>A summer day in the city that fits together.</h1>
        <p>
          Tell us your time, starting point, and mood. Get one clear plan with
          places to go, food, a scenic pause, and something happening nearby.
        </p>
        <div className="actions">
          <Link className="button primary" href="/plan">
            Build My Day
          </Link>
          <Link className="text-link" href="/featured">
            See Featured Plans →
          </Link>
        </div>
      </section>
      <section className="value-grid">
        <article>
          <b>Less searching</b>
          <p>One compatible route instead of an open-tab spiral.</p>
        </article>
        <article>
          <b>Built for summer</b>
          <p>Waterfronts, shade, food, and evening energy.</p>
        </article>
        <article>
          <b>Easy to adjust</b>
          <p>Replace a stop without rebuilding the whole day.</p>
        </article>
      </section>
    </main>
  );
}

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

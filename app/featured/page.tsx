import Link from "next/link";
const plans = [
  {
    title: "Brooklyn Waterfront Sunset",
    copy: "DUMBO, food, and a skyline-facing sunset stop.",
    href: "/itinerary?date=2026-07-25&startTime=14%3A00&duration=medium&neighborhood=DUMBO&audience=couple&vibe=romantic&budget=%24%24&weather=Sunny",
  },
  {
    title: "Rainy Day Manhattan Indoors",
    copy: "Art, food, and shelter from a summer downpour.",
    href: "/itinerary?date=2026-07-25&startTime=11%3A00&duration=medium&neighborhood=Midtown&audience=solo&vibe=low-key&budget=%24%24&weather=Rainy",
  },
];
export default function Featured() {
  return (
    <main className="shell">
      <div className="topbar">
        <Link className="brand" href="/">
          SummerQuest <span>NYC</span>
        </Link>
        <Link href="/plan">Build My Day</Link>
      </div>
      <h1 className="page-title">Featured Plans</h1>
      <p className="muted">Good starting points, ready to make your own.</p>
      <div className="featured-grid">
        {plans.map((p) => (
          <article className="card" key={p.title}>
            <h2>{p.title}</h2>
            <p className="muted">{p.copy}</p>
            <Link className="button primary" href={p.href}>
              Open Plan
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

import Link from "next/link";
import ItineraryView from "@/components/ItineraryView";
import { generatePlan } from "@/lib/recommendations";
import type { Preferences } from "@/types/planner";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  const p: Preferences = {
    date: q.date || "2026-07-25",
    startTime: q.startTime || "12:00",
    duration: (q.duration as Preferences["duration"]) || "medium",
    neighborhood: q.neighborhood || "Midtown",
    audience: q.audience || "friends",
    vibe: q.vibe || "relaxed",
    budget: (q.budget as Preferences["budget"]) || "$$",
    weather: (q.weather as Preferences["weather"]) || "Sunny",
    indoorOutdoor: q.indoorOutdoor,
  };
  const plan = generatePlan(p, q.stops?.split(","));
  return (
    <main className="shell">
      <div className="topbar">
        <Link className="brand" href="/">
          SummerQuest <span>NYC</span>
        </Link>
        <Link href="/plan">Start Over</Link>
      </div>
      <h1 className="page-title">Your summer plan.</h1>
      <ItineraryView initial={plan} />
    </main>
  );
}

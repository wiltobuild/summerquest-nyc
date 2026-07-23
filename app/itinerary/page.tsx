"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ItineraryView from "@/components/ItineraryView";
import { generatePlan } from "@/lib/recommendations";
import type { Preferences } from "@/types/planner";

function ItineraryContent() {
  const q = useSearchParams();
  const p: Preferences = {
    date: q.get("date") || "2026-07-25",
    startTime: q.get("startTime") || "12:00",
    duration: (q.get("duration") as Preferences["duration"]) || "medium",
    neighborhood: q.get("neighborhood") || "Midtown",
    audience: q.get("audience") || "friends",
    vibe: q.get("vibe") || "relaxed",
    budget: (q.get("budget") as Preferences["budget"]) || "$$",
    weather: (q.get("weather") as Preferences["weather"]) || "Sunny",
    indoorOutdoor: q.get("indoorOutdoor") || undefined,
  };
  const stopsParam = q.get("stops");
  const plan = generatePlan(p, stopsParam ? stopsParam.split(",") : undefined);
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

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ItineraryContent />
    </Suspense>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";
import type { Itinerary } from "@/types/planner";
export default function Saved() {
  const [plans] = useState<Itinerary[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("summerquest-plans") || "[]");
  });
  return (
    <main className="shell">
      <div className="topbar">
        <Link className="brand" href="/">
          SummerQuest <span>NYC</span>
        </Link>
        <Link href="/plan">Build My Day</Link>
      </div>
      <h1 className="page-title">Saved Plans</h1>
      {plans.length ? (
        plans.map((p, i) => (
          <article className="card" key={i}>
            <b>{p.preferences.date}</b>
            <p>
              {p.stops
                .map((s) => s.destination?.name || s.event?.title)
                .join(" · ")}
            </p>
          </article>
        ))
      ) : (
        <p className="muted">
          Saved plans stay on this device. Build and save one to see it here.
        </p>
      )}
    </main>
  );
}

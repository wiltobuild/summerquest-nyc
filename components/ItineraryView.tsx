"use client";
import { useState } from "react";
import type { Itinerary } from "@/types/planner";
import { replaceStop } from "@/lib/recommendations";
const icons: Record<string, string> = {
  park: "🌳",
  museum: "🏛️",
  food: "🍽️",
  waterfront: "🌊",
  rooftop: "🌇",
  garden: "🌿",
  beach: "🏖️",
  market: "🛍️",
};
export default function ItineraryView({ initial }: { initial: Itinerary }) {
  const [plan, setPlan] = useState(initial);
  const copy = async () => {
    const x = plan.stops
      .map(
        (s) =>
          `${s.role}: ${s.destination?.name ?? s.event?.title} — ${s.reason}`
      )
      .join("\n");
    await navigator.clipboard.writeText(
      `SummerQuest NYC\n${plan.preferences.date}\n\n${x}`
    );
  };
  const save = () => {
    const saved = JSON.parse(localStorage.getItem("summerquest-plans") || "[]");
    localStorage.setItem("summerquest-plans", JSON.stringify([plan, ...saved]));
    alert("Plan saved on this device.");
  };
  const share = async () => {
    const q = new URLSearchParams(
      Object.entries(plan.preferences).filter(
        ([, value]) => value !== undefined
      ) as [string, string][]
    );
    q.set(
      "stops",
      plan.stops
        .map((s) => s.destination?.id || "")
        .filter(Boolean)
        .join(",")
    );
    await navigator.clipboard.writeText(`${location.origin}/itinerary?${q}`);
    alert("Share link copied.");
  };
  return (
    <>
      <div className="summary">
        <b>
          {plan.preferences.date} · {plan.preferences.startTime} ·{" "}
          {plan.preferences.duration} day
        </b>
        <br />
        <span>
          {plan.preferences.budget} budget · {plan.preferences.vibe} ·{" "}
          {plan.preferences.weather}
        </span>
      </div>
      {plan.warnings.map((w) => (
        <p className="warning" key={w}>
          {w}
        </p>
      ))}
      <div className="stops">
        {plan.stops.map((s, i) => {
          const x = s.destination;
          return (
            <article
              className="card stop"
              key={`${s.role}-${x?.id || s.event?.id}`}
            >
              <div className="visual">
                {x ? icons[x.category] || "📍" : "🎵"}
              </div>
              <div>
                <div className="role">{s.role}</div>
                <h2>{x?.name || s.event?.title}</h2>
                <p>
                  {x ? `${x.neighborhood}, ${x.borough}` : s.event?.location}
                </p>
                <p>{s.reason}</p>
                <div className="meta">
                  {x
                    ? `${x.hours.label} · ${x.priceTier} · ${x.indoorOutdoor}`
                    : `${s.event?.startDateTime.replace("T", " ")} · ${s.event?.price}`}
                </div>
              </div>
              <div className="stop-actions">
                {x && (
                  <>
                    <button
                      className="button secondary"
                      onClick={() => setPlan(replaceStop(plan, i))}
                    >
                      Replace Stop
                    </button>
                    <a
                      className="button secondary"
                      target="_blank"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${x.lat},${x.lng}`}
                    >
                      Directions
                    </a>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div className="footer-actions">
        <button className="button primary" onClick={copy}>
          Copy Plan
        </button>
        <button className="button secondary" onClick={save}>
          Save Plan
        </button>
        <button className="button secondary" onClick={share}>
          Share Plan
        </button>
      </div>
    </>
  );
}

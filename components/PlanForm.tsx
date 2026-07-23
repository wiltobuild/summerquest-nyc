"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Preferences } from "@/types/planner";
const defaults: Preferences = {
  date: "2026-07-25",
  startTime: "12:00",
  duration: "medium",
  neighborhood: "Midtown",
  audience: "friends",
  vibe: "relaxed",
  budget: "$$",
  weather: "Sunny",
  indoorOutdoor: "either",
};
export default function PlanForm() {
  const [p, setP] = useState(defaults),
    [more, setMore] = useState(false),
    [error, setError] = useState("");
  const router = useRouter();
  const change = (key: keyof Preferences, value: string) =>
    setP({ ...p, [key]: value });
  const chips = (key: keyof Preferences, items: string[]) => (
    <div className="chips">
      {items.map((x) => (
        <button
          type="button"
          key={x}
          className={`chip ${p[key] === x ? "active" : ""}`}
          onClick={() => change(key, x)}
        >
          {x}
        </button>
      ))}
    </div>
  );
  return (
    <form
      className="form-card"
      onSubmit={(e) => {
        e.preventDefault();
        if (!p.date || !p.startTime) {
          setError("Choose a date and start time to continue.");
          return;
        }
        router.push(
          `/itinerary?${new URLSearchParams(Object.entries(p) as [string, string][])}`
        );
      }}
    >
      <div className="form-grid">
        <label className="field">
          Date
          <input
            required
            type="date"
            value={p.date}
            onChange={(e) => change("date", e.target.value)}
          />
        </label>
        <label className="field">
          Start time
          <input
            required
            type="time"
            value={p.startTime}
            onChange={(e) => change("startTime", e.target.value)}
          />
        </label>
        <label className="field">
          Time available
          <select
            value={p.duration}
            onChange={(e) => change("duration", e.target.value)}
          >
            <option value="short">About 2–3 hours</option>
            <option value="medium">About 4–6 hours</option>
            <option value="long">7+ hours</option>
          </select>
        </label>
        <label className="field">
          Starting area
          <select
            value={p.neighborhood}
            onChange={(e) => change("neighborhood", e.target.value)}
          >
            {[
              "Midtown",
              "Chelsea",
              "Williamsburg",
              "DUMBO",
              "Upper West Side",
              "Flushing",
              "Park Slope",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="field">
        <span>Who is this for?</span>
        {chips("audience", ["solo", "couple", "friends", "family"])}
      </div>
      <div className="field">
        <span>What sounds right?</span>
        {chips("vibe", [
          "relaxed",
          "adventurous",
          "romantic",
          "social",
          "low-key",
        ])}
      </div>
      <div className="field">
        <span>Budget</span>
        {chips("budget", ["free", "$", "$$", "$$$"])}
      </div>
      <button
        className="text-link more"
        type="button"
        onClick={() => setMore(!more)}
      >
        {more ? "− Less preferences" : "+ More preferences"}
      </button>
      {more && (
        <>
          <div className="field">
            <span>Indoor or outdoor?</span>
            {chips("indoorOutdoor", ["either", "indoor", "outdoor"])}
          </div>
          <div className="field">
            <span>Manual weather mode</span>
            {chips("weather", ["Sunny", "Hot", "Rainy"])}
          </div>
        </>
      )}{" "}
      {error && <p className="warning">{error}</p>}
      <button className="button primary" type="submit">
        Build My Day
      </button>
    </form>
  );
}

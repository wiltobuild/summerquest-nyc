import { destinations, events } from "@/data/destinations";
import type {
  Destination,
  Itinerary,
  PlanStop,
  Preferences,
  Role,
} from "@/types/planner";
const rank = { free: 0, $: 1, $$: 2, $$$: 3 };
const roleCats: Record<Role, string[]> = {
  Opening: ["park", "museum", "garden", "waterfront"],
  Main: ["museum", "park", "beach", "rooftop", "garden", "activity", "show", "bookstore"],
  Food: ["food", "market"],
  Sunset: ["waterfront", "rooftop", "park"],
  Event: [],
  Optional: ["market", "waterfront", "museum", "activity", "show", "bookstore"],
};
export function distance(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) {
  const r = Math.PI / 180,
    x =
      Math.sin(((b.lat - a.lat) * r) / 2) ** 2 +
      Math.cos(a.lat * r) *
        Math.cos(b.lat * r) *
        Math.sin(((b.lng - a.lng) * r) / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
function candidate(
  role: Role,
  p: Preferences,
  used: string[],
  prev?: Destination
) {
  return destinations
    .filter(
      (x) =>
        roleCats[role].includes(x.category) &&
        !used.includes(x.id) &&
        rank[x.priceTier] <= rank[p.budget] &&
        x.hours.open <= Number(p.startTime.split(":")[0]) + 1 &&
        x.hours.close >= Number(p.startTime.split(":")[0]) + 2
    )
    .sort((a, b) => score(b) - score(a));
  function score(x: Destination) {
    let s =
      (x.vibes?.includes(p.vibe) ? 6 : 0) +
      (x.confidence === "medium" ? 1 : 0) +
      (x.neighborhood === p.neighborhood ? 3 : 0);
    if (prev) s -= distance(prev, x) / 3;
    if (p.weather === "Rainy")
      s +=
        x.indoorOutdoor === "indoor"
          ? 8
          : x.indoorOutdoor === "outdoor"
            ? -8
            : 2;
    if (p.weather === "Hot")
      s +=
        x.indoorOutdoor === "indoor" || x.shaded
          ? 3
          : x.indoorOutdoor === "outdoor"
            ? -2
            : 0;
    return s;
  }
}
export function generatePlan(p: Preferences, picked?: string[]): Itinerary {
  const roles: Role[] =
    p.duration === "short"
      ? ["Opening", "Main", "Food"]
      : p.duration === "medium"
        ? ["Opening", "Main", "Food", "Sunset", "Event"]
        : ["Opening", "Main", "Food", "Sunset", "Event", "Optional"];
  const used: string[] = [];
  let prev: Destination | undefined;
  const stops: PlanStop[] = [];
  for (const role of roles) {
    if (role === "Event") {
      const e = events.find(
        (x) =>
          x.startDateTime.slice(0, 10) === p.date &&
        x.endDateTime >= "2026-07-22T00:00" &&
          rank[x.price] <= rank[p.budget]
      );
      if (e)
        stops.push({
          role,
          event: e,
          reason: "A live summer option that fits your date.",
        });
      continue;
    }
    const forced = picked?.[stops.length],
      x = forced ? destinations.find((d) => d.id === forced) : undefined;
    const next = x ?? candidate(role, p, used, prev)[0];
    if (next) {
      stops.push({ role, destination: next, reason: reason(next, p, role) });
      used.push(next.id);
      prev = next;
    }
  }
  const warnings: string[] = [];
  if (!stops.some((s) => s.role === "Event") && roles.includes("Event"))
    warnings.push("No valid event was found for this date.");
  if (p.weather === "Rainy") {
    const withDestination = stops.filter((s) => s.destination);
    const indoorish = withDestination.filter(
      (s) => s.destination?.indoorOutdoor !== "outdoor"
    ).length;
    warnings.push(
      withDestination.length && indoorish / withDestination.length >= 0.5
        ? "Rainy-day adjustments favored indoor and covered stops."
        : "Rain is in the forecast, but few indoor options fit this budget/area — expect some outdoor time."
    );
  }
  return { preferences: p, stops, warnings };
}
function reason(x: Destination, p: Preferences, role: Role) {
  if (p.weather === "Rainy" && x.indoorOutdoor !== "outdoor")
    return "An indoor-friendly choice for a rainy day.";
  if (role === "Food") return "An easy food stop that keeps the route moving.";
  if (role === "Sunset") return "A strong place to slow down toward sunset.";
  return `${x.neighborhood} is a practical fit for your starting point and vibe.`;
}
export function replaceStop(plan: Itinerary, index: number): Itinerary {
  const target = plan.stops[index];
  if (!target?.destination) return plan;
  const used = plan.stops.flatMap((s, i) =>
    i === index || !s.destination ? [] : [s.destination.id]
  );
  const prev = [...plan.stops.slice(0, index)]
    .reverse()
    .find((s) => s.destination)?.destination;
  const next = candidate(target.role, plan.preferences, used, prev).find(
    (x) => x.id !== target.destination?.id
  );
  if (!next) return plan;
  const stops = [...plan.stops];
  stops[index] = {
    role: target.role,
    destination: next,
    reason: reason(next, plan.preferences, target.role),
  };
  return { ...plan, stops };
}

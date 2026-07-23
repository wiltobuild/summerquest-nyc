import { describe, expect, it } from "vitest";
import { generatePlan, replaceStop } from "./recommendations";
import type { Preferences } from "@/types/planner";
const base: Preferences = {
  date: "2026-07-25",
  startTime: "12:00",
  duration: "medium",
  neighborhood: "Midtown",
  audience: "friends",
  vibe: "relaxed",
  budget: "$$",
  weather: "Sunny",
};
describe("recommendations", () => {
  it("excludes venues over budget", () => {
    const p = generatePlan({ ...base, budget: "free" });
    expect(
      p.stops.every((s) => !s.destination || s.destination.priceTier === "free")
    ).toBe(true);
  });
  it("excludes expired events", () => {
    const p = generatePlan({ ...base, date: "2026-07-10" });
    expect(p.stops.some((s) => s.event?.id === "expired-movie")).toBe(false);
  });
  it("replaces only the targeted stop", () => {
    const p = generatePlan(base);
    const n = replaceStop(p, 0);
    expect(n.stops.slice(1).map((s) => s.destination?.id)).toEqual(
      p.stops.slice(1).map((s) => s.destination?.id)
    );
    expect(n.stops[0].role).toBe(p.stops[0].role);
  });
  it("rainy mode warns and leans indoors", () => {
    const p = generatePlan({ ...base, weather: "Rainy" });
    expect(p.warnings.join(" ")).toMatch(/Rainy/);
    expect(
      p.stops
        .filter((s) => s.destination)
        .some((s) => s.destination?.indoorOutdoor !== "outdoor")
    ).toBe(true);
  });
});

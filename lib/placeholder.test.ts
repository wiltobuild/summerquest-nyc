import { describe, expect, it } from "vitest";

import { foundationReady } from "./placeholder";

describe("foundationReady", () => {
  it("returns true", () => {
    expect(foundationReady()).toBe(true);
  });
});

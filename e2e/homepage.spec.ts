import { expect, test } from "@playwright/test";

test("homepage renders without console errors", async ({ page }) => {
  const consoleErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.goto("/");
  await expect(
    page.getByText("SummerQuest NYC foundation is ready.")
  ).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

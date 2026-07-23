# SummerQuest NYC

SummerQuest NYC is a summer itinerary planner for New York City days and evenings. It will help people shape practical, enjoyable plans around the city during the summer season.

Planning a day in New York can require juggling timing, weather, locations, and many options. SummerQuest NYC will bring those considerations into one focused planning experience.

## Stack

- Next.js App Router with TypeScript provides a typed, file-based application foundation.
- Tailwind CSS supports quick, consistent styling without a component-library dependency.
- ESLint and Prettier keep code quality and formatting consistent.
- Vitest covers unit and integration tests; Playwright covers browser-level checks.

## Local setup

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local` and fill in variables when the relevant integrations are added.
3. Install dependencies with `npm install`.
4. Install the Playwright browser with `npx playwright install chromium`.
5. Start the app with `npm run dev`.

## Environment variables

`WEATHER_API_BASE_URL` and `WEATHER_API_KEY` are reserved for a future weather integration. `MAPS_API_KEY` is reserved for a future maps integration. No integration is implemented in this phase.

## Commands

- `npm run dev` — start the local development server.
- `npm run build` — create a production build.
- `npm run lint` — run ESLint.
- `npm run format` — check formatting with Prettier.
- `npm run format:write` — apply Prettier formatting.
- `npm run test` — run unit tests.
- `npm run e2e` — run Playwright end-to-end tests.

## Test convention

Unit and integration tests are co-located with their source files using `*.test.ts`. Browser-level tests live in `e2e/`.

Project Status: Phase Zero — foundation only, no product features yet.

# MedLaunch (Frontend Demo)

MedLaunch is a frontend-only React demo app for client walkthroughs.

It recreates the MedLaunch dashboard experience with:
- Hierarchical provider-performance table view
- Provider rankings charts
- Operational line charts
- Financial aging table
- Clinical and data-sources pages

This demo has **no backend**, **no Firebase**, and uses static local mock data.

## Tech Stack

- Vite
- React + TypeScript
- React Router
- Tailwind CSS
- Recharts
- Vitest + React Testing Library

## Getting Started

```bash
npm install
npm run dev
```

App URL (default): `http://localhost:5173`

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run test
```

## Routes

- `/provider-performance`
- `/provider-rankings`
- `/financial`
- `/operational`
- `/clinical`
- `/data-sources`

Root path `/` redirects to `/provider-performance`.

## Demo Data

All dashboard data is local and lives in:

- `src/data/mockDashboardData.ts`

No API requests are required for this demo.

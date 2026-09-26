# 💪 FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch
the week's work add up. Built for the **B14-A6 Fit Log** assignment from the supplied Figma /
Penpot design.

**Live Link:** _add your deployed URL here_
**GitHub Repository:** _add your repo URL here_

## 📖 Description

FitLog pulls a twelve-lift workout library live from the FitLog REST API, lets you drill into a
full detail page for each exercise (specs, equipment, step-by-step instructions), and lets you
build a capped five-lift plan for today or save lifts for later. Progress — plan, saved, and
completed lifts — persists across reloads.

## 🛠️ Technologies Used

- **Next.js 15** (App Router) — routing, server-side data fetching
- **React 19** + **TypeScript** — UI and type safety
- **Tailwind CSS** — styling and responsive layout
- **Lucide React** — icon set
- **FitLog REST API** (`api.abcz.workers.dev`) — workout data
- **localStorage** — persists Today's Plan, Saved, and Done state

## ✨ Key Features

1. **Responsive workout library** — a 3×4 grid on desktop that collapses gracefully to 2 and 1
   columns on tablet and mobile, with search-by-name/tag/equipment and a Duration / Calories /
   Rating sort dropdown.
2. **Workout detail pages** — full key-specs panel (equipment, difficulty, sets, reps, duration,
   calories, rating) and numbered instructions for every lift, fetched by dynamic route.
3. **Today's Plan with a 5-lift cap** — "Add to today's plan" is disabled once the plan is full,
   with a toast explaining why.
4. **Live metrics summary** — Exercises / Minutes / Calories stat cards update instantly as lifts
   are added, marked done, or removed.
5. **Saved-for-later list**, **Mark as Done / Undo**, and **Remove** controls, each with a toast
   confirmation, plus a custom 404 page for unknown routes.
6. **Persistent state** — the plan, saved list, and completed lifts survive a page reload via
   localStorage.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables (optional)

The API base URL defaults to the public FitLog endpoint, so the app runs with zero
configuration. To point it elsewhere, copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_FITLOG_API_URL=https://api.abcz.workers.dev/api/fitlog
```

## 🔌 API Reference

| Endpoint | Returns |
| --- | --- |
| `GET /api/fitlog` | All workouts as an array |
| `GET /api/fitlog/:id` | A single workout |

## 📦 Deployment

Deploy on Vercel, Netlify, or Cloudflare Pages — no build configuration required.

```bash
npm run build
npm start
```

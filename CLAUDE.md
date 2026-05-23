# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Type-check + build to dist/
npm run lint       # ESLint
npm run preview    # Preview production build
```

There are no tests currently in this project.

## Architecture

**Stack:** React 19 + TypeScript + Vite, Tailwind CSS v4 (via `@tailwindcss/vite`), Supabase (auth + database), TanStack Query v5 for server state, React Hook Form + Zod for forms, React Router v7.

**Mock mode:** When `VITE_SUPABASE_URL` is set to `https://placeholder.supabase.co`, `isMockMode` is true. All data hooks short-circuit to `MOCK_ENTRIES` from `src/lib/mockData.ts`, and `AuthGuard` skips auth entirely. This lets the app run without a real Supabase project.

**Routing (App.tsx):**
- `/` → `LandingPage` (public)
- `/login` → `LoginPage` (public)
- `/journal`, `/new`, `/entry/:id` → wrapped in `AppShell` → `AuthGuard`

**AppShell** renders `Navbar` + `<Outlet>` inside an `AuthGuard`. `AuthGuard` redirects unauthenticated users to `/login` (bypassed in mock mode).

**Auth:** Magic-link email OTP via `useAuth` hook (`src/hooks/useAuth.ts`). Supabase client is initialized in `src/lib/supabase.ts` from `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.

**Data layer (`src/hooks/useLogEntries.ts`):** All CRUD lives here as TanStack Query hooks. `useCreateLogEntry` and `useUpdateLogEntry` manage dishes in a single mutation — update uses a delete-all-then-reinsert strategy for dishes. React Query cache key is `['log_entries']`; single-entry queries nest as `['log_entries', id]`.

**Types (`src/types/index.ts`):** `LogEntry` and `Dish` are DB row shapes. `LogEntryWithDishes` is the join used everywhere. `EntryFormSchema` / `DishFormSchema` are Zod schemas; their inferred types (`EntryFormValues`, `DishFormValues`) are what forms and mutations consume.

**Component structure:**
- `src/components/auth/` — `AuthGuard`, `LoginForm`
- `src/components/entries/` — `EntryCard`, `EntryDetail`, `EntryForm`
- `src/components/dishes/` — `DishForm`, `DishList`
- `src/components/layout/` — `AppShell`, `Navbar`
- `src/components/ui/` — small presentational primitives (`RatingStars`, `CuisineTag`, `OccasionBadge`, `ConfirmDialog`, `LoadingSpinner`, `EmptyState`, `ErrorMessage`)

**Environment variables required:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

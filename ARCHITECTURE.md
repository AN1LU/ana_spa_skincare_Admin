# Architecture Overview — anaspa_skincare_db-interface

This document describes the architecture of the `anaspa_skincare_db-interface` Angular frontend. It was generated from the code in the repository and summarizes the folder layout, main responsibilities, data flow, and deployment notes.

## High-level summary

- Framework: Angular (standalone components, Angular 20.x)
- Language: TypeScript, HTML, CSS
- Client for backend: Supabase JS client (`@supabase/supabase-js`)
- App type: Single-page application (SPA), small admin UI for managing clientes, servicios and citas

## Project layout (important files/folders)

- `angular.json` — Angular CLI project configuration (build, serve, test)
- `package.json` — dependencies and developer scripts (ng serve, ng build, ng test)
- `public/` — static assets (favicon, logo)
- `src/` — application source
  - `src/main.ts` — application bootstrap (uses `bootstrapApplication`)
  - `src/styles.css` — global styles
  - `src/index.html` — host page
  - `src/app/` — application code
    - `app.ts` — root component
    - `app.config.ts` — ApplicationConfig providers (router, global listeners)
    - `app.routes.ts` — route definitions
    - `supabase.ts` — Supabase client wrapper service (singleton injectable)
    - `clientes/`, `servicios/`, `citas/`, `analitica/` — feature components
    - `add-cita/`, `add-client/`, `add-service/`, `edit-services/`, `delete-service/` — smaller feature components used by pages

## Component & feature responsibilities

- Root application: `App` (in `app.ts`) is the entry point for the SPA and renders routed views.
- Routing: `app.routes.ts` maps paths to standalone components. The default route (`''`) loads `Clientes`.
- Data layer: `Supabase` service (in `src/app/supabase.ts`) is a thin wrapper around the Supabase JS client and exposes `.client` to components. The client is created with a hard-coded URL and anon key.
- Pages:
  - `Clientes` — lists clients (default view)
  - `Servicios` — lists services
  - `Citas` — lists appointments and imports `AddCita` standalone component
  - `Analitica` — analytics dashboard (likely visualizations)
- Forms & actions:
  - `AddCita` — modal-like component that loads `clientes` and `servicios` from Supabase and inserts a new `citas` row
  - `AddService`, `AddClient`, `EditServices`, `DeleteService` — CRUD actions for services and clients

## Data flow

1. Components call methods on the injected `Supabase` service to run queries (.from('table').select/insert/update/delete).
2. Queries return standard Supabase responses: `{ data, error }` which components handle (assign data, show alerts, console.log errors).
3. Where needed, components reload or navigate after successful mutations (some use `window.location.reload()` after inserts).

## Notable implementation details

- Standalone components: Many components use `standalone: true` and import `CommonModule` / `FormsModule` directly.
- Routing is provided by `provideRouter(routes)` in `app.config.ts` and bootstrapped using `bootstrapApplication()` in `main.ts`.
- Supabase client is initialized with a public anon key in `supabase.ts`. Consider moving the key to environment variables or a safer secrets store for production.
- The project uses Angular 20.x and modern bootstrap patterns (no NgModule file).

## Security and environment recommendations

- Do not check production Supabase keys into the repo. Move the URL and key to environment variables or use Angular's environment files and a server-side proxy when appropriate.
- Validate user input in forms and avoid using `window.location.reload()` for UX reasons — prefer updating local state instead.

## Development & build

- Use `npm install` to install dependencies.
- `npm start` or `ng serve` runs the development server (default at `http://localhost:4200`).
- `ng build` produces production assets in `dist/`.

## Deployment notes

- The built `dist/` folder can be deployed to any static hosting (Netlify, Vercel, Surge) or served behind a CDN.
- If Supabase is used in production, ensure the auth rules (Row Level Security) and policies are configured.

## Next steps (optional improvements)

- Extract Supabase URL/key into environment configuration.
- Replace `window.location.reload()` with state updates or navigation.
- Add unit/integration tests for services and critical components.
- Add a small architecture diagram (graphical) showing Supabase <-> frontend interactions.

---     

Generated from repository files on Oct 18, 2025.

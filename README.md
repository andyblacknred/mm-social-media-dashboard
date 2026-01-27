# mm-social-media-dashboard

A small **React + TypeScript** dashboard-style application built with **Vite**.

This repository includes example configuration files and an `init` script that generates local-only config files for development.

---

## Demo

TODO: add demo link (GitHub Pages / Vercel / Netlify)

---

## Tech Stack

- React
- TypeScript
- Vite
- ESLint
- PostCSS

---

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Initialize local config (`.env`, `mock/db.json`)

This project ships with example files:

- `.env.example` → `.env`
- `mock/db.example.json` → `mock/db.json`

Run:

```bash
npm run init
```

> The init script should **not overwrite** existing `.env` / `mock/db.json` (so your local config stays safe).

### 3) Start development server

```bash
npm run dev
```

Vite will print the local URL in the terminal (usually `http://localhost:5173`).

---

## Environment Variables

See `.env.example` for the full list of supported variables.

> Keep `.env` private — it should stay in `.gitignore`.

---

## Mock Data

Mock database file:

- `mock/db.json` (generated from `mock/db.example.json`)

If you use a mock server (e.g. `json-server`), you can run it like this:

```bash
npx json-server --watch mock/db.json --port 3001
```

Then point your frontend API base URL to:

- `http://localhost:3001`

> If your implementation does not use `json-server`, you can remove this section.

---

## Available Scripts

Check `package.json` for the full list. Common ones:

- `npm run init` — generate `.env` + `mock/db.json` from example files
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

---

## Project Structure

```text
.
├─ mock/
│  ├─ db.example.json
│  └─ db.json            # generated (local)
├─ public/
├─ src/
├─ .env.example
├─ .env                  # generated (local)
├─ index.html
├─ package.json
└─ vite.config.ts
```

---

## Notes

- Example files exist to make the project easy to run right after cloning.
- Generated files (`.env`, `mock/db.json`) are meant for **local development only**.
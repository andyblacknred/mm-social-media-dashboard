# mm-social-media-dashboard (Test Task)

A small **React + TypeScript** dashboard-style application built with **Vite**.

---

## How It Works

This app is a lightweight social-media dashboard where you can:

- View a list of accounts in a dashboard layout
- See key account stats (e.g. posts in the last 7 days)
- Manage accounts (add / edit / delete) via UI actions and modals

Data is loaded from a local mock API and stored in the client state. The codebase follows an FSD-like structure (`app / pages / widgets / features / entities / shared`).

---

## Tech Stack

- React
- TypeScript
- Vite
- ESLint
- PostCSS
- MUI
- Tailwind CSS
- Bootstrap (grid layout)

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

Run (once after cloning):

```bash
npm run init
```

> Run it for a fresh clone to create local-only files.
> If you already have `.env` / `mock/db.json`, you typically don’t need to run it again.

### 3) Start mock API

```bash
npm run api
```

### 4) Start dev server

```bash
npm run dev
```

Vite will print the local URL in the terminal (usually `http://localhost:5173`).

---

## Local workflow

- `npm run init` — generate `.env` + `mock/db.json` from example files
- `npm run api` — start mock API (json-server) on port `3001`
- `npm run dev` — start Vite dev server

---

## Project Structure

A simplified view of the current structure:

```text
.
├─ mock/
│  ├─ db.example.json
│  └─ db.json                  # generated (local)
├─ src/
│  ├─ app/
│  │  ├─ providers/
│  │  │  └─ AppProviders.tsx
│  │  └─ store/
│  │     └─ store.ts
│  ├─ entities/
│  │  └─ account/
│  │     ├─ api/
│  │     │  └─ accountApi.ts
│  │     ├─ model/
│  │     │  ├─ selectors.ts
│  │     │  ├─ slice.ts
│  │     │  ├─ types.ts
│  │     │  └─ useAccounts.ts
│  │     ├─ ui/
│  │     │  ├─ AccountCard.tsx
│  │     │  └─ HoverCard.ts
│  │     └─ index.ts
│  ├─ features/
│  │  └─ account-manage/
│  │     ├─ model/
│  │     │  ├─ selectors.ts
│  │     │  └─ slice.ts
│  │     ├─ ui/
│  │     │  ├─ AccountActions.tsx
│  │     │  ├─ AccountUpsertModal.tsx
│  │     │  ├─ AddAccountButton.tsx
│  │     │  └─ DeleteAccountConfirmModal.tsx
│  │     └─ index.ts
│  ├─ pages/
│  │  └─ dashboard/
│  │     ├─ ui/
│  │     │  └─ DashboardPage.tsx
│  │     └─ index.ts
│  ├─ widgets/
│  │  └─ accounts-overview/
│  │     ├─ ui/
│  │     │  └─ AccountsOverview.tsx
│  │     └─ index.ts
│  ├─ shared/
│  │  ├─ api/
│  │  │  └─ httpClient.ts
│  │  ├─ config/
│  │  │  └─ env.ts
│  │  └─ lib/
│  │     ├─ formatNumber.ts
│  │     └─ storeHooks.ts
│  ├─ App.tsx
│  └─ main.tsx
├─ .env.example
├─ .env                        # generated (local)
├─ package.json
└─ vite.config.ts
```

---

## Notes

- The backend is **emulated with `json-server`**.
  All mock data lives in `mock/db.json` (generated from `mock/db.example.json`).
- Styling is intentionally mixed:
    - **Bootstrap** is used for the grid/layout
    - **Tailwind + MUI** are used for the rest (utility styling + ready-to-use UI components)
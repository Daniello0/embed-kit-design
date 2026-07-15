# EmbedKit Frontend

React application for EmbedKit, built with Vite, TypeScript, React Router, and Zustand.

## Stack

- **Vite** — dev server and build tool
- **TypeScript** — strict mode
- **React Router** — client-side routing
- **Zustand** — global state management
- **Vitest** — unit tests
- **ESLint + Prettier** — linting and formatting

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run unit tests
npm run format       # Format with Prettier
```

## Project structure

```
src/
├── app/              # App shell and router
├── common/           # Shared constants, stores, utils
├── features/         # Feature modules (main-page, auth, …)
└── main.tsx          # Entry point
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

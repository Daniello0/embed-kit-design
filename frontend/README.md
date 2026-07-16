# EmbedKit Frontend

React application for EmbedKit, built with Vite, TypeScript, React Router, and Zustand.

## Stack

- **Vite** — dev server and build tool
- **TypeScript** — strict mode
- **React Router** — client-side routing
- **Zustand** — global state management
- **Vitest** — unit tests
- **ESLint + Prettier** — linting and formatting

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command                | Description                        |
| :--------------------- | :--------------------------------- |
| `npm run dev`          | Start dev server with hot reload   |
| `npm run build`        | Type-check and production build    |
| `npm run preview`      | Serve the production build locally |
| `npm run lint`         | Run ESLint                         |
| `npm run test`         | Run unit tests once                |
| `npm run test:watch`   | Run tests in watch mode            |
| `npm run format`       | Format with Prettier               |
| `npm run format:check` | Check formatting without writing   |

## Static assets

Brand and placeholder SVGs live in `public/`:

| File                     | Usage                      |
| :----------------------- | :------------------------- |
| `favicon.svg`            | Browser tab icon           |
| `logo.svg`               | App header / landing logo  |
| `placeholder-avatar.svg` | Default bot avatar         |
| `placeholder-logo.svg`   | Partner logo placeholders  |
| `icons.svg`              | Social and UI icon sprites |

Asset paths are exported from `src/common/constants/app.constants.ts` as `ASSETS`.

## Mock data

Prototype seed data is in `src/common/constants/`:

- `mock-seed.constants.ts` — initial and demo app state
- `mock-responses.constants.ts` — canned chat replies
- `mock-bots.constants.ts`, `mock-documents.constants.ts` — demo bot knowledge base
- `mock-pricing.constants.ts`, `mock-analytics.constants.ts`, `mock-partners.constants.ts`

Use `findMockResponse` / `getMockResponseOrFallback` from `src/common/utils/mock-chat.utils.ts` to resolve chat replies.

## Project structure

```
src/
├── app/              # App shell and router
├── common/           # Constants, mocks, stores, utils, shared components
├── features/         # Feature modules (landing, auth, chat, widget, …)
└── main.tsx          # Entry point
```

See [docs/schemas-design.md](../docs/schemas-design.md) for full data models and component inventory.

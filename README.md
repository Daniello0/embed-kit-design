# EmbedKit

Document-grounded chatbot builder — landing page and clickable web app prototype. Users upload company knowledge, test bots in-app, and embed a widget on their site. No backend required; mock data and local state power the prototype.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ (LTS recommended)
- npm 10+

## Quick start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Commands

All commands run from the `frontend/` directory:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Type-check and production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without writing |

## Project structure

```
embed-kit-design/
├── docs/                 # Product spec, UI/UX, data schemas
├── frontend/             # React + Vite application
│   ├── public/           # Static assets (logo, favicon, icons)
│   └── src/
│       ├── app/          # Router and app shell
│       ├── common/       # Shared constants, mocks, utils, components
│       └── features/     # Feature modules (landing, chat, widget, …)
└── README.md
```

## Mock data

Prototype seed data lives in `frontend/src/common/constants/`:

- `mock-seed.constants.ts` — demo user, bot, documents, widget config
- `mock-responses.constants.ts` — canned chat replies with citations
- `mock-pricing.constants.ts` — pricing tiers
- `mock-analytics.constants.ts` — dashboard stats
- `mock-partners.constants.ts` — partner logo placeholders

Chat response matching uses `frontend/src/common/utils/mock-chat.utils.ts`.

## Documentation

- [Product spec](docs/product.mdc)
- [UI/UX design](docs/ui-ux-design.md)
- [Data schemas & component inventory](docs/schemas-design.md)
- [Frontend README](frontend/README.md)

## License

See [LICENSE](LICENSE).

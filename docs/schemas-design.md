# Design Schemas: EmbedKit

> **Code conventions:** [.cursor/rules/project-conventions.mdc](../.cursor/rules/project-conventions.mdc)  
> **Product spec:** [product.mdc](./product.mdc)  
> **UI/UX:** [ui-ux-design.md](./ui-ux-design.md)

Single reference for data structures, enums, component inventory, routes, and UI state. This is a **completed clickable prototype** in `frontend/` — no real backend, auth, or billing. Mock data and Zustand in-memory state replace API persistence.

---

## 1. Enums

All domain values use TypeScript `enum` in `frontend/src/common/enums/`. No string-literal unions for the same values in types or stores.

| Enum | Values | Usage |
| :--- | :--- | :--- |
| `PlanTier` | `free`, `pro`, `business` | User plan; feature gates |
| `DocumentStatus` | `uploading`, `processing`, `ready`, `error` | Per-document pipeline state |
| `DocumentFormat` | `pdf`, `txt`, `docx` | Accepted upload types |
| `BotStatus` | `draft`, `ready`, `processing` | Bot readiness for test chat |
| `BotNavTab` | `knowledge`, `chat`, `widget`, `deploy`, `analytics` | Bot sub-navigation |
| `MessageRole` | `user`, `assistant` | Chat messages |
| `ProcessingStep` | `idle`, `uploading`, `processing`, `ready` | Upload zone aggregate state |
| `PaywallTrigger` | `document_limit`, `watermark`, `widget_branding`, `analytics`, `second_bot`, `team`, `api` | Context for upgrade modal |
| `AuthView` | `signup`, `login` | Authentication screens |
| `SettingsTab` | `profile`, `billing`, `team`, `api` | Settings sidebar tabs |
| `BillingPeriod` | `monthly`, `annual` | Pricing page toggle (UI only) |

Barrel export: `frontend/src/common/enums/index.ts`.

---

## 2. Core Data Models

Type definitions live in `frontend/src/common/types/`.

### User

```typescript
interface User {
  id: string;
  email: string;
  plan: PlanTier;
  createdAt: string; // ISO 8601
}
```

Runtime auth state uses `AppUserState` (`id`, `email`, `plan`) in the Zustand store.

### Bot

```typescript
interface Bot {
  id: string;
  name: string;
  avatarUrl: string | null;
  status: BotStatus;
  documentCount: number;
  createdAt: string;
  updatedAt: string;
}
```

### Document

```typescript
interface Document {
  id: string;
  botId: string;
  fileName: string;
  format: DocumentFormat;
  status: DocumentStatus;
  errorMessage: string | null;
  uploadedAt: string;
}
```

### ChatMessage

```typescript
interface Citation {
  documentId: string;
  documentName: string;
  excerpt: string;
}

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  citations: Citation[]; // empty for user messages
  createdAt: string;
}
```

### WidgetConfig

```typescript
interface WidgetConfig {
  botId: string;
  bubbleColor: string; // hex
  welcomeMessage: string;
  suggestedQuestions: string[];
  showWatermark: boolean; // true on Free
}
```

### PricingPlan (display only)

```typescript
interface PricingPlan {
  tier: PlanTier;
  name: string;
  monthlyPrice: number; // USD
  annualPrice: number; // 20% discount, UI only
  features: string[];
}
```

---

## 3. Plan Limits and Feature Gates

Canonical limits: `PLAN_LIMITS` in `frontend/src/common/constants/routes.constants.ts`.

| Feature | Free | Pro | Business |
| :--- | :--- | :--- | :--- |
| Bots | 1 | 1 | 5 |
| Documents per bot | 5 | 50 | Unlimited |
| Messages / month | 1,000 | 20,000 | 100,000 |
| Widget watermark | Yes | No | No |
| Custom branding | No | Yes | Yes + custom domain |
| Analytics | No | Yes | Yes + export |
| Team seats | 1 | 1 | 5 |
| API access | No | No | Yes |
| Suggested questions | 3 | Unlimited | Unlimited |

### Gated Action → Paywall Trigger

| User action | Trigger enum | Required plan |
| :--- | :--- | :--- |
| Upload 6th document | `document_limit` | Pro |
| Copy embed without watermark | `watermark` | Pro |
| Customize widget colors/logo | `widget_branding` | Pro |
| Open analytics | `analytics` | Pro |
| Create second bot | `second_bot` | Business |
| Open team settings | `team` | Business |
| Generate API key | `api` | Business |

Paywall opens only after `hasReachedAhaMoment` is true (first assistant response in test chat). Enforcement: `app.store.ts` → `openPaywall()`.

---

## 4. Mock Auth Flow

Prototype only — no Firebase, JWT, or server session.

| Step | Behavior |
| :--- | :--- |
| 1 | User submits email/password or clicks **Continue with Google** |
| 2 | `login()` / `loginWithGoogle()` sets `user` in Zustand; `plan` defaults to `free` |
| 3 | Redirect to `/app` (dashboard) |
| 4 | `logout()` resets to `MOCK_INITIAL_APP_STATE` and navigates to `/` |

Validation: `auth.utils.ts` (`validateEmail`, `validatePassword`). No tokens stored.

**Note:** Sign-in starts with an empty bot list. `MOCK_DEMO_APP_STATE` (pre-seeded bot + documents) is used in tests only.

---

## 5. Mock Chat Responses

Fixed canned responses in `mock-responses.constants.ts`. Matching logic: `mock-chat.utils.ts` (`getMockResponseOrFallback`).

```typescript
interface MockResponse {
  match: string; // substring or exact suggested question text
  content: string;
  citations: Citation[];
  delayMs: number; // simulated typing delay, e.g. 800–1500
}
```

Fallback when no match: generic *I found relevant information in your documents* with a citation from the first ready document.

---

## 6. Embed Code Snippet (Mock)

Generated in `deploy.utils.ts`:

```html
<script
  src="https://cdn.embedkit.io/widget.js"
  data-bot-id="BOT_ID"
  async
></script>
```

Free plan appends HTML comment in copy buffer: `<!-- Powered by EmbedKit -->`. Pro/Business: no comment.

---

## 7. Route Map

Defined in `frontend/src/app/router.tsx`. Helpers in `routes.constants.ts`.

| Path | Screen | Auth |
| :--- | :--- | :--- |
| `/` | Landing (`MainPage`) | Public |
| `/signup` | Sign up | Public |
| `/login` | Log in | Public |
| `/pricing` | Pricing | Public |
| `/app` | Dashboard (bots) | Required |
| `/app/bot/:botId/knowledge` | Document upload | Required |
| `/app/bot/:botId/chat` | Test chat | Required |
| `/app/bot/:botId/widget` | Widget builder | Required |
| `/app/bot/:botId/deploy` | Embed code | Required |
| `/app/bot/:botId/analytics` | Analytics (gated) | Required |
| `/app/settings/profile` | Account | Required |
| `/app/settings/billing` | Plan and upgrade | Required |
| `/app/settings/team` | Team (gated) | Required |
| `/app/settings/api` | API keys (gated) | Required |

Bot index route `/app/bot/:botId` redirects to `knowledge`.

---

## 8. UI Component Structure

Code in `frontend/src/features/` and `frontend/src/common/`. Visual specs: [ui-ux-design.md](./ui-ux-design.md).

### Feature: `main-page` + `landing`

| Component | Responsibility |
| :--- | :--- |
| `MainPage` | `/` route; composes landing sections |
| `LandingHeader` | Logo, Log in link |
| `HeroSection` | Product name, tagline, hero image |
| `GradientBackground` | Curved pink/purple stripe bands |
| `ExplainerSteps` | Upload → Test → Embed with large previews |
| `ExplainerStepPreviews` | `UploadStepPreview`, `ChatStepPreview`, `EmbedStepPreview` |
| `PricingSummary` | Compact tier cards → `/pricing` |
| `PartnersSection` | Partner logo row |
| `LandingCta` | **Start building** → `/signup` |
| `useLandingReady` | Preloads images/fonts before reveal |

### Feature: `auth`

| Component | Responsibility |
| :--- | :--- |
| `AuthPage` | Sign up / log in layout |
| `AuthForm` | Email/password fields + validation |
| `GoogleAuthButton` | Mock Google sign-in |
| `RequireAuth` | Route guard → redirect to `/login` |

### Feature: `dashboard`

| Component | Responsibility |
| :--- | :--- |
| `DashboardPage` | Bot grid page at `/app` |
| `AppShell` | Top bar, plan badge, user menu |
| `BotLayout` | Bot-scoped layout with `BotNav` |
| `BotRoutePage` | Resolves `botId` param for child routes |
| `BotGrid` | Responsive grid of bot cards |
| `BotCard` | Rectangular card; view / knowledge / edit actions |
| `CreateBotModal` | Name + optional avatar |
| `EditBotModal` | Edit name/avatar |
| `EmptyBotsState` | First-bot prompt |

**BotCard action map:**

| Position | Component | Action | Route / behavior |
| :--- | :--- | :--- | :--- |
| Top-left | `BotViewIcon` | View / test chat | `/app/bot/:botId/chat` |
| Top-right | `BotKnowledgeIcon` | Knowledge base | `/app/bot/:botId/knowledge` |
| Bottom-left | `BotEditIcon` | Edit general info | Open `EditBotModal` |

### Feature: `knowledge`

| Component | Responsibility |
| :--- | :--- |
| `KnowledgePage` | Document management page |
| `DocumentUploadZone` | Drag-and-drop; accept PDF, TXT, DOCX |
| `DocumentList` | File rows with status badges |
| `DocumentRow` | Name, format, status, remove |
| `DocumentLimitIndicator` | *N of M documents* |

### Feature: `chat`

| Component | Responsibility |
| :--- | :--- |
| `ChatPage` | Test chat page wrapper |
| `ChatThread` | Message list with auto-scroll |
| `ChatMessage` | Bubble + citation chips |
| `ChatInput` | Text input + send |
| `SuggestedQuestions` | Clickable pills (max 3 on Free) |
| `TypingIndicator` | Animated dots during mock delay |

### Feature: `widget`

| Component | Responsibility |
| :--- | :--- |
| `WidgetPage` | Widget builder page |
| `WidgetSettings` | Color, welcome message, questions |
| `WidgetPreview` | Live floating bubble on mock page |
| `BrandingLock` | Upgrade tooltip on gated controls |
| `WidgetCustomizationGate` | Plan gate wrapper |

### Feature: `deploy`

| Component | Responsibility |
| :--- | :--- |
| `DeployPage` | Embed code page |
| `EmbedCodeBlock` | Monospace snippet + copy |
| `WatermarkPreview` | Side-by-side with/without watermark |
| `CopyConfirmToast` | Success feedback |

### Feature: `analytics`

| Component | Responsibility |
| :--- | :--- |
| `AnalyticsPage` | Analytics page wrapper |
| `AnalyticsDashboard` | Stats layout (mocked data) |
| `AnalyticsStatCards` | Conversation count cards |
| `AnalyticsDailyChart` | Daily conversation chart |
| `AnalyticsTopQuestions` | Top questions list |
| `AnalyticsGate` | Blurred state + upgrade CTA |

### Feature: `pricing`

| Component | Responsibility |
| :--- | :--- |
| `PricingPage` | Standalone pricing page |
| `PricingTable` | Three tiers + feature comparison |
| `BillingToggle` | Monthly / annual (UI only) |

### Feature: `settings`

| Component | Responsibility |
| :--- | :--- |
| `SettingsLayout` | Sidebar tabs |
| `ProfileSettings` | Email display (read-only mock) |
| `BillingSettings` | Current plan + upgrade |
| `TeamSettings` | Placeholder + gate |
| `ApiSettings` | Placeholder + gate |
| `SettingsGate` | Reusable plan gate wrapper |

### Shared: `frontend/src/common/components/`

| Component | Responsibility |
| :--- | :--- |
| `Button` | Primary (pink), secondary (purple), ghost |
| `Input` | Text, email, password |
| `Modal` | Dialog shell |
| `PaywallModal` | Plan comparison; trigger-aware copy |
| `PlanBadge` | Free / Pro / Business chip |
| `UpgradeBanner` | Inline dismissible upsell |
| `Toast` | Ephemeral notifications |
| `BotNav` | Tab bar for bot sub-routes |
| `ActionTooltip` | Accessible action labels |
| `PublicPageHeader` | Back-to-home on public pages |
| `BotViewIcon`, `BotKnowledgeIcon`, `BotEditIcon` | Dashboard card action icons |

### Shared: `frontend/src/common/hooks/`

| Hook | Responsibility |
| :--- | :--- |
| `usePreloadImages` | Image/font preload for landing |
| `useUpgradeNavigation` | Navigate to `/pricing` on upgrade CTA |

---

## 9. UI State Schema (Zustand)

Store: `frontend/src/common/stores/app.store.ts`. Types: `app-state.types.ts`.

```typescript
interface AppDataState {
  user: AppUserState;
  bots: Bot[];
  documents: Record<string, Document[]>; // keyed by botId
  chat: Record<string, ChatMessage[]>; // keyed by botId
  widgetConfigs: Record<string, WidgetConfig>; // keyed by botId
  ui: AppUiState;
}

interface AppUiState {
  activeBotId: string | null;
  paywallOpen: boolean;
  paywallTrigger: PaywallTrigger | null;
  upgradeBannerDismissed: boolean;
  hasReachedAhaMoment: boolean;
}
```

Extended runtime fields on the store (not in `AppDataState`):

| Field | Type | Purpose |
| :--- | :--- | :--- |
| `isReady` | `boolean` | Store hydration flag (tests) |
| `chatTypingByBotId` | `Record<string, boolean>` | Per-bot typing indicator |

### Key Actions (store methods)

| Action | Effect |
| :--- | :--- |
| `login(email)` | Set mock user, `plan: free` |
| `loginWithGoogle()` | Set mock user with Google email |
| `logout()` | Reset to `MOCK_INITIAL_APP_STATE` |
| `createBot(name, avatarUrl?)` | Append bot; enforce tier bot limit |
| `updateBot(id, patch)` | Update name/avatar |
| `deleteBot(id)` | Remove bot and associated documents/chat/config |
| `addDocument(botId, file)` | Simulate upload → processing → ready |
| `removeDocument(botId, documentId)` | Remove document; decrement count |
| `sendMessage(botId, text)` | Append user msg; queue mock assistant reply |
| `getWidgetConfig(botId)` | Return config or defaults |
| `updateWidgetConfig(botId, patch)` | Merge widget settings |
| `openPaywall(trigger)` | Only if `hasReachedAhaMoment` |
| `closePaywall()` | Dismiss modal |

Test helper: `resetAppStore()` resets to initial prototype state.

---

## 10. Mock Data Files

| File | Purpose |
| :--- | :--- |
| `mock-seed.constants.ts` | `MOCK_INITIAL_APP_STATE`, `MOCK_DEMO_APP_STATE` |
| `mock-bots.constants.ts` | Demo bot records |
| `mock-documents.constants.ts` | Demo documents per bot |
| `mock-widget.constants.ts` | Default widget configs |
| `mock-user.constants.ts` | Guest and demo user |
| `mock-responses.constants.ts` | Canned chat replies |
| `mock-pricing.constants.ts` | Pricing tiers |
| `mock-analytics.constants.ts` | Dashboard stats |
| `mock-partners.constants.ts` | Partner logo placeholders |
| `mock-ids.constants.ts` | Stable IDs for tests |

---

## 11. Session Persistence

**Not implemented.** State resets on page refresh. `sessionStorage` persistence was considered optional in early design docs but is not wired up. Use `resetAppStore()` in tests to restore defaults.

---

## 12. Onboarding Flow State Machine

| Step | Route | Completion condition |
| :---: | :--- | :--- |
| 1 | `/` | User clicks **Start building** |
| 2 | `/signup` | Mock auth success |
| 3 | `/app` | Bot created |
| 4 | `/app/bot/:botId/knowledge` | ≥1 document `ready` |
| 5 | `/app/bot/:botId/chat` | ≥1 assistant message (`hasReachedAhaMoment`) |
| 6 | `/app/bot/:botId/widget` | Config viewed or saved |
| 7 | `/app/bot/:botId/deploy` | Embed code copied |
| 8 | Paywall modal | Triggered on gated action only |

---

## 13. Empty States

| Context | Copy |
| :--- | :--- |
| No bots | *Create your first chatbot* |
| No documents | *Drop your FAQ, pricing page, or onboarding guide — we'll turn it into answers.* |
| No chat messages | Show `SuggestedQuestions` (3 pills) |
| Analytics (Free) | *Upgrade to Pro to see conversation insights* |
| Team (non-Business) | *Invite teammates on the Business plan* |

---

## 14. Error and Toast Messages

| Event | Message |
| :--- | :--- |
| Upload invalid type | *Please upload a PDF, TXT, or DOCX file.* |
| Document limit | *Free plan includes 5 documents. Upgrade to add more.* |
| Copy embed success | *Code copied to clipboard!* |
| Widget live (Free) | *Widget live! Upgrade to remove EmbedKit branding.* |
| Generic error | *Something went wrong. Please try again.* |

All strings are English in the prototype.

---

## 15. Test Coverage

26 test files under `frontend/src/`, covering:

- Router and navigation
- Zustand store actions and paywall gating
- Feature utils (auth, chat, deploy, dashboard, knowledge, pricing, settings, widget, analytics)
- Key page components (auth, chat, dashboard, deploy, knowledge, main-page, pricing, settings, widget, analytics)
- Shared components (`BotNav`) and hooks (`usePreloadImages`)

Run: `cd frontend && npm run test`

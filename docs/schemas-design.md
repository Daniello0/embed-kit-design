# Design Schemas: EmbedKit

> **Code conventions:** [.cursor/rules/project-conventions.mdc](../.cursor/rules/project-conventions.mdc)  
> **Product spec:** [product.mdc](./product.mdc)  
> **UI/UX:** [ui-ux-design.md](./ui-ux-design.md)

Single reference for data structures, enums, component inventory, and UI state. This is a **clickable prototype** — no real backend, auth, or billing. Mock data and local state replace API persistence.

---

## 1. Enums

All domain values use TypeScript `enum` in `src/common/enums/`. No string-literal unions for the same values in types or stores.

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

**Naming conventions:**
- TypeScript / JSON (prototype): `camelCase`
- If a backend is added later: PostgreSQL `snake_case`, API `camelCase`

---

## 2. Core Data Models (Prototype)

### User

```typescript
interface User {
  id: string;
  email: string;
  plan: PlanTier;
  createdAt: string; // ISO 8601
}
```

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

Paywall must not appear before the user receives at least one meaningful test-chat response (aha moment).

---

## 4. Mock Auth Flow

Prototype only — no Firebase, JWT, or server session.

| Step | Behavior |
| :--- | :--- |
| 1 | User submits email/password or clicks **Continue with Google** |
| 2 | UI sets `user` in Zustand with mock `id` and `email`; `plan` defaults to `free` |
| 3 | Redirect to `/app` (dashboard) |
| 4 | Log out clears `user` and navigates to `/` |

No tokens stored. `sessionStorage` optional for bot draft data only.

---

## 5. Mock Chat Responses

Fixed canned responses keyed by question substring or suggested-question index. Minimum one response required.

```typescript
interface MockResponse {
  match: string; // substring or exact suggested question text
  content: string;
  citations: Citation[];
  delayMs: number; // simulated typing delay, e.g. 800–1500
}
```

**Example entry:**

```json
{
  "match": "pricing",
  "content": "Our Pro plan starts at $14.99/month and includes 50 documents and watermark-free embed.",
  "citations": [
    {
      "documentId": "doc-1",
      "documentName": "pricing.pdf",
      "excerpt": "Pro — $14.99/mo, 50 documents..."
    }
  ],
  "delayMs": 1200
}
```

Fallback response if no match: generic *I found relevant information in your documents* with a citation from the first ready document.

---

## 6. Embed Code Snippet (Mock)

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

| Path | Screen | Auth |
| :--- | :--- | :--- |
| `/` | Landing | Public |
| `/signup` | Sign up | Public |
| `/login` | Log in | Public |
| `/pricing` | Pricing | Public |
| `/app` | Dashboard (bots) | Required |
| `/app/bot/:id/knowledge` | Document upload | Required |
| `/app/bot/:id/chat` | Test chat | Required |
| `/app/bot/:id/widget` | Widget builder | Required |
| `/app/bot/:id/deploy` | Embed code | Required |
| `/app/bot/:id/analytics` | Analytics (gated) | Required |
| `/app/settings/profile` | Account | Required |
| `/app/settings/billing` | Plan and upgrade | Required |
| `/app/settings/team` | Team (gated) | Required |
| `/app/settings/api` | API keys (gated) | Required |

---

## 8. UI Component Structure

Code in `src/features/` and `src/common/`. See [ui-ux-design.md](./ui-ux-design.md) for visual specs.

### Feature: `landing`

| Component | Responsibility |
| :--- | :--- |
| `LandingHeader` | Logo, Log in link |
| `HeroSection` | Product name, tagline, gradient background |
| `GradientBackground` | Curved pink/purple stripe bands |
| `ExamplesSection` | Minimal static previews (upload, chat, widget) |
| `PartnersSection` | Partner logo row |
| `LandingCta` | **Start building** button → `/signup` |
| `ExplainerSteps` | Upload → Test → Embed (optional) |
| `PricingSummary` | Compact tier cards (optional) |

### Feature: `auth`

| Component | Responsibility |
| :--- | :--- |
| `AuthForm` | Email/password fields |
| `GoogleAuthButton` | Mock Google sign-in |
| `AuthPage` | Sign up / log in layout |

### Feature: `dashboard`

| Component | Responsibility |
| :--- | :--- |
| `AppShell` | Top bar, plan badge, user menu |
| `BotGrid` | Responsive grid of bot cards |
| `BotCard` | Rectangular card; Eye (view), BookOpen (knowledge), Pencil (edit) |
| `CreateBotModal` | Name + optional avatar |
| `EditBotModal` | Edit name/avatar (Pencil action) |
| `EmptyBotsState` | First-bot prompt |

**BotCard action map:**

| Position | Icon | Action | Route / behavior |
| :--- | :--- | :--- | :--- |
| Top-left | `Eye` | View / test chat | `/app/bot/:id/chat` |
| Top-right | `BookOpen` | Knowledge base | `/app/bot/:id/knowledge` |
| Bottom-left | `Pencil` | Edit general info | Open `EditBotModal` |

### Feature: `knowledge`

| Component | Responsibility |
| :--- | :--- |
| `DocumentUploadZone` | Drag-and-drop; accept PDF, TXT, DOCX |
| `DocumentList` | File rows with status badges |
| `DocumentRow` | Name, format, status, remove |
| `DocumentLimitIndicator` | *N of M documents* |

### Feature: `chat`

| Component | Responsibility |
| :--- | :--- |
| `ChatThread` | Message list with auto-scroll |
| `ChatMessage` | Bubble + citation chips |
| `ChatInput` | Text input + send |
| `SuggestedQuestions` | Clickable pills (max 3 on Free) |
| `TypingIndicator` | Animated dots during mock delay |

### Feature: `widget`

| Component | Responsibility |
| :--- | :--- |
| `WidgetSettings` | Color, welcome message, questions |
| `WidgetPreview` | Live floating bubble on mock page |
| `BrandingLock` | Upgrade tooltip on gated controls |

### Feature: `deploy`

| Component | Responsibility |
| :--- | :--- |
| `EmbedCodeBlock` | Syntax highlight + copy |
| `WatermarkPreview` | Side-by-side with/without watermark |
| `CopyConfirmToast` | Success feedback |

### Feature: `analytics`

| Component | Responsibility |
| :--- | :--- |
| `AnalyticsDashboard` | Conversation stats (mocked) |
| `AnalyticsGate` | Blurred state + upgrade CTA |

### Feature: `pricing`

| Component | Responsibility |
| :--- | :--- |
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

### Shared: `src/common/components/`

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

---

## 9. UI State Schema (Zustand)

```typescript
enum PlanTier {
  FREE = 'free',
  PRO = 'pro',
  BUSINESS = 'business',
}

enum DocumentStatus {
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  READY = 'ready',
  ERROR = 'error',
}

enum BotStatus {
  DRAFT = 'draft',
  READY = 'ready',
  PROCESSING = 'processing',
}

enum PaywallTrigger {
  DOCUMENT_LIMIT = 'document_limit',
  WATERMARK = 'watermark',
  WIDGET_BRANDING = 'widget_branding',
  ANALYTICS = 'analytics',
  SECOND_BOT = 'second_bot',
  TEAM = 'team',
  API = 'api',
}

interface AppState {
  user: {
    id: string | null;
    email: string | null;
    plan: PlanTier;
  };
  bots: Bot[];
  documents: Record<string, Document[]>; // keyed by botId
  chat: Record<string, ChatMessage[]>; // keyed by botId
  widgetConfigs: Record<string, WidgetConfig>; // keyed by botId
  ui: {
    activeBotId: string | null;
    paywallOpen: boolean;
    paywallTrigger: PaywallTrigger | null;
    upgradeBannerDismissed: boolean;
    hasReachedAhaMoment: boolean; // true after first assistant response
  };
}
```

### Key Actions (store methods)

| Action | Effect |
| :--- | :--- |
| `login(email)` | Set mock user, `plan: free` |
| `logout()` | Clear user and sensitive state |
| `createBot(name, avatarUrl?)` | Append bot; enforce tier bot limit |
| `updateBot(id, patch)` | Update name/avatar |
| `addDocument(botId, file)` | Simulate upload → processing → ready |
| `sendMessage(botId, text)` | Append user msg; queue mock assistant reply |
| `updateWidgetConfig(botId, patch)` | Merge widget settings |
| `openPaywall(trigger)` | Only if `hasReachedAhaMoment` or trigger is not revenue-gated |
| `setAhaMoment()` | Called after first assistant response |

---

## 10. Session Persistence (Optional)

Key: `embedkit:state` in `sessionStorage` — optional for prototype refresh survival.

Persist: `bots`, `documents`, `chat`, `widgetConfigs`, `user`, `ui.hasReachedAhaMoment`.  
Do not persist: `paywallOpen`, transient upload progress.

---

## 11. Onboarding Flow State Machine

| Step | Route | Completion condition |
| :---: | :--- | :--- |
| 1 | `/` | User clicks **Start building** |
| 2 | `/signup` | Mock auth success |
| 3 | `/app` | Bot created |
| 4 | `/app/bot/:id/knowledge` | ≥1 document `ready` |
| 5 | `/app/bot/:id/chat` | ≥1 assistant message (`hasReachedAhaMoment`) |
| 6 | `/app/bot/:id/widget` | Config viewed or saved |
| 7 | `/app/bot/:id/deploy` | Embed code copied |
| 8 | Paywall modal | Triggered on gated action only |

---

## 12. Empty States

| Context | Copy |
| :--- | :--- |
| No bots | *Create your first chatbot* |
| No documents | *Drop your FAQ, pricing page, or onboarding guide — we'll turn it into answers.* |
| No chat messages | Show `SuggestedQuestions` (3 pills) |
| Analytics (Free) | *Upgrade to Pro to see conversation insights* |
| Team (non-Business) | *Invite teammates on the Business plan* |

---

## 13. Error and Toast Messages

| Event | Message |
| :--- | :--- |
| Upload invalid type | *Please upload a PDF, TXT, or DOCX file.* |
| Document limit | *Free plan includes 5 documents. Upgrade to add more.* |
| Copy embed success | *Code copied to clipboard!* |
| Widget live (Free) | *Widget live! Upgrade to remove EmbedKit branding.* |
| Generic error | *Something went wrong. Please try again.* |

All strings are English in the prototype.

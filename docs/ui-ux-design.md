# UI/UX Design Specification: EmbedKit

> **Code conventions:** [.cursor/rules/project-conventions.mdc](../.cursor/rules/project-conventions.mdc)  
> **Product spec:** [product.mdc](./product.mdc)  
> **Data schemas and component inventory:** [schemas-design.md](./schemas-design.md)

## 1. Visual Concept

**Style:** Dark SaaS with a distinct brand — not generic AI gradient templates.  
**Theme:** Dark mode only. No light-mode toggle.  
**Language:** English throughout the UI (labels, copy, placeholders, errors).  
**Atmosphere:** Confident and product-focused — document-grounded chatbots, fast setup, clear upgrade paths.

**Design principles:**
- Minimize cognitive load; one primary action per screen.
- Show value before paywall (upload → test chat → embed → upgrade).
- Use pink for forward/commit actions; purple for navigation and secondary actions.
- Widget preview must look like a real floating chat bubble, not a wireframe.

---

## 2. Color Palette

### Background and Surfaces

| Role | Token | Value | Usage |
| :--- | :--- | :--- | :--- |
| Page background | `--bg-base` | `#0A0B14` | App shell, auth screens |
| Elevated surface | `--bg-surface` | `#12131F` | Cards, sidebars, modals |
| Surface hover | `--bg-surface-hover` | `#1A1B2E` | Bot cards, list rows |
| Border | `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Card outlines, dividers |
| Border focus | `--border-focus` | `rgba(236, 72, 153, 0.5)` | Inputs, focused controls |

### Primary (Pink) — Commit / Forward Actions

Used for: **Apply**, **Start**, **Copy code**, **Test your bot**, **Upgrade**, **Create bot**, primary CTAs.

| Role | Token | Value |
| :--- | :--- | :--- |
| Primary | `--primary` | `#EC4899` |
| Primary hover | `--primary-hover` | `#F472B6` |
| Primary pressed | `--primary-pressed` | `#DB2777` |
| Primary subtle | `--primary-subtle` | `rgba(236, 72, 153, 0.15)` |

### Secondary (Purple) — Navigation / Back / Outline

Used for: **Back**, **Cancel**, ghost buttons, tab inactive states, secondary links.

| Role | Token | Value |
| :--- | :--- | :--- |
| Secondary | `--secondary` | `#8B5CF6` |
| Secondary hover | `--secondary-hover` | `#A78BFA` |
| Secondary pressed | `--secondary-pressed` | `#7C3AED` |
| Secondary subtle | `--secondary-subtle` | `rgba(139, 92, 246, 0.15)` |

### Text

| Role | Token | Value |
| :--- | :--- | :--- |
| Text primary | `--text-primary` | `#F4F4F8` |
| Text secondary | `--text-secondary` | `#A1A1B5` |
| Text muted | `--text-muted` | `#6B6B80` |
| Text on primary | `--text-on-primary` | `#FFFFFF` |

### Semantic

| Role | Token | Value | Usage |
| :--- | :--- | :--- | :--- |
| Success | `--success` | `#34D399` | Copy confirmed, upload complete |
| Warning | `--warning` | `#FBBF24` | Free-tier limits, watermark notice |
| Error | `--error` | `#F87171` | Validation, failed upload |
| Info | `--info` | `#60A5FA` | Processing status, hints |

### Plan Badges

| Plan | Background | Text |
| :--- | :--- | :--- |
| Free | `rgba(107, 107, 128, 0.25)` | `#A1A1B5` |
| Pro | `rgba(236, 72, 153, 0.2)` | `#F472B6` |
| Business | `rgba(139, 92, 246, 0.2)` | `#A78BFA` |

---

## 3. Typography

| Context | Font | Size / Weight / Line-height |
| :--- | :--- | :--- |
| UI body | `Inter`, sans-serif | `14px` / 400 / `1.5` |
| UI small | `Inter`, sans-serif | `12px` / 400 / `1.4` |
| Section heading | `Inter`, semibold | `20px` / 600 / `1.3` |
| Page title | `Inter`, semibold | `28–32px` / 600 / `1.2` |
| Hero title (landing) | `Inter`, bold | `48–56px` / 700 / `1.1` |
| Hero tagline | `Inter`, regular | `18–20px` / 400 / `1.5` |
| Monospace (embed code) | `JetBrains Mono`, monospace | `13px` / 400 / `1.6` |

---

## 4. Spacing, Radius, and Elevation

### Spacing Scale (4px base)

| Token | Value | Typical use |
| :--- | :--- | :--- |
| `--space-1` | `4px` | Icon padding, tight gaps |
| `--space-2` | `8px` | Inline gaps, badge padding |
| `--space-3` | `12px` | Form field internal padding |
| `--space-4` | `16px` | Card padding (compact), mobile gutters |
| `--space-5` | `20px` | Section gaps within cards |
| `--space-6` | `24px` | Card padding (default), section spacing |
| `--space-8` | `32px` | Between major blocks |
| `--space-10` | `40px` | Landing section spacing |
| `--space-16` | `64px` | Landing vertical rhythm |

### Border Radius

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--radius-sm` | `8px` | Badges, chips, small buttons |
| `--radius-md` | `12px` | Inputs, bot cards, buttons |
| `--radius-lg` | `16px` | Panels, modals, upload zone |
| `--radius-xl` | `24px` | Large modals, paywall |
| `--radius-full` | `9999px` | Pills, suggested questions, avatar |

### Shadows and Blur

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--shadow-card` | `0 4px 24px rgba(0, 0, 0, 0.35)` | Bot cards, elevated panels |
| `--shadow-modal` | `0 8px 40px rgba(0, 0, 0, 0.5)` | Paywall modal |
| `--shadow-glow-primary` | `0 0 24px rgba(236, 72, 153, 0.25)` | Primary CTA hover (landing) |

### Layout

| Token | Value |
| :--- | :--- |
| Content max-width (app) | `1200px` |
| Content max-width (landing) | `1120px` |
| Sidebar width (app) | `240px` |
| Chat column max-width | `720px` |

---

## 5. Buttons and Controls

### Button Variants

| Variant | Background | Text | Border | Use |
| :--- | :--- | :--- | :--- | :--- |
| Primary | `--primary` | `--text-on-primary` | none | Apply, Start, Copy code, Upgrade |
| Primary hover | `--primary-hover` | `--text-on-primary` | none | — |
| Secondary | transparent | `--secondary` | `1px solid --secondary` | Back, Cancel |
| Secondary hover | `--secondary-subtle` | `--secondary-hover` | `1px solid --secondary-hover` | — |
| Ghost | transparent | `--text-secondary` | none | Tertiary actions, icon-only |
| Disabled | `rgba(255,255,255,0.06)` | `--text-muted` | none | Gated controls |

### Button Sizes

| Size | Height | Horizontal padding | Font size |
| :--- | :--- | :--- | :--- |
| Small | `32px` | `12px` | `12px` |
| Medium (default) | `40px` | `16px` | `14px` |
| Large | `48px` | `24px` | `16px` |

### Inputs

- Background: `--bg-surface`
- Border: `1px solid --border-subtle`
- Focus ring: `2px` `--border-focus`
- Height: `40px`; textarea min-height: `96px`
- Placeholder color: `--text-muted`

### Icons

- Library: `lucide-react`
- Stroke width: `1.5`
- Default size: `20px`; compact (card actions): `18px`

---

## 6. Page Structure

### 6.1. Landing Page (`/`)

**Header (sticky, transparent over hero):**
- Left: EmbedKit logo (wordmark)
- Right: **Log in** (secondary outline) → `/login`; no theme toggle

**Hero (top of page):**
- **Product name:** EmbedKit
- **Tagline:** *Turn your docs into a chatbot. Embed it on your site in minutes.*
- **Background:** Deep navy base (`#0A0B14`) with layered gradient curved stripe bands — flowing arcs in pink (`#EC4899` at ~12% opacity) and purple (`#8B5CF6` at ~10% opacity), animated with slow horizontal drift (CSS, ~20s loop). Bands are soft, organic curves (SVG or CSS `radial-gradient` layers), not harsh diagonal stripes.

**Examples section (minimal):**
- Heading: *See it in action*
- Two or three small static previews only: (1) document upload thumbnail, (2) chat bubble with citation chip, (3) floating widget on a mock browser frame
- No interactive demo on landing — keep lightweight

**Partners section:**
- Heading: *Trusted by growing teams*
- Row of 4–6 grayscale partner logos (placeholder SVGs); opacity `0.5`, hover `0.8`

**Footer CTA (bottom of page):**
- Full-width band with subtle purple gradient wash
- Single large primary button: **Start building** → `/signup`
- Subtext: *Free plan · No credit card required*

**Optional mid-page blocks (below examples, above partners):**
- Three-step explainer: Upload → Test → Embed (icon + one line each)
- Compact pricing summary (Free / Pro / Business) with link to `/pricing`

---

### 6.2. Authentication (`/signup`, `/login`)

- Centered card on `--bg-base`; max-width `400px`; radius `--radius-lg`
- Heading: **Create your account** / **Welcome back**
- Fields: email, password; divider **or continue with Google**
- Primary: **Sign up** / **Log in** (pink)
- Secondary link: *Already have an account?* / *Don't have an account?*
- No credit card fields

---

### 6.3. Dashboard — Bots (`/app`)

**Layout:** App shell with top bar + main content area.

**Top bar:**
- Left: EmbedKit logo → `/app`
- Center: page title **Your bots**
- Right: `PlanBadge` (Free / Pro / Business) + user menu (Settings, Log out)

**Empty state (no bots):**
- Illustration or icon
- Copy: *Create your first chatbot*
- Primary: **Create bot** (pink)

**Create bot flow:**
- Modal or inline form: bot name (required), optional avatar upload
- On submit → rectangular **bot card** appears in the grid

**Bot card (rectangular):**
- Size: min-width `280px`, height `160px`, radius `--radius-md`, background `--bg-surface`, shadow `--shadow-card`
- **Top-left:** `Eye` icon — **View** (opens test chat `/app/bot/:id/chat`)
- **Top-right:** `BookOpen` icon — **Knowledge base** (`/app/bot/:id/knowledge`)
- **Bottom-left:** `Pencil` icon — **Edit info** (modal: name, avatar)
- **Center:** bot name (semibold), document count badge, last-updated text
- **Bottom-right:** status dot (active / processing)
- Card hover: `--bg-surface-hover`, slight `translateY(-2px)`

**Multi-bot (Business):**
- Grid of cards; **Create bot** card with dashed border and `Plus` icon
- Free/Pro: second bot creation triggers paywall modal

---

### 6.4. Bot — Knowledge (`/app/bot/:id/knowledge`)

- `DocumentUploadZone`: drag-and-drop for PDF, TXT, DOCX
- File list with processing badge (Processing / Ready / Error)
- Empty state: *Drop your FAQ, pricing page, or onboarding guide — we'll turn it into answers.*
- Limit indicator: *3 of 5 documents* (Free)
- Uploading 6th document → contextual `UpgradeBanner` + paywall modal

---

### 6.5. Bot — Test Chat (`/app/bot/:id/chat`)

- ChatGPT-style layout: messages column, input pinned to bottom
- `ChatMessage`: user (right, purple subtle bg) / assistant (left, surface bg)
- Citation chips below assistant messages (mocked source refs)
- `SuggestedQuestions`: three clickable pills in empty state
- Typing indicator: three animated dots before mocked response
- Message fade-in: `200ms`

---

### 6.6. Bot — Widget Builder (`/app/bot/:id/widget`)

- Split layout: settings left, `WidgetPreview` right (floating bubble on mock page)
- Settings: bubble color, welcome message, suggested questions
- Free plan: color picker and logo locked with upgrade tooltip
- Primary: **Apply** (pink) — saves to local state and updates preview

---

### 6.7. Bot — Deploy (`/app/bot/:id/deploy`)

- `EmbedCodeBlock`: syntax-highlighted `<script>` snippet
- **Copy code** (pink); toast on success
- Side-by-side preview: with watermark (Free) vs without (Pro)
- Free copy: *Your embed will show "Powered by EmbedKit".*
- Watermark removal attempt → paywall modal

---

### 6.8. Bot — Analytics (`/app/bot/:id/analytics`)

- Pro+ only; Free shows blurred/empty state with upgrade CTA
- Cards: total conversations, top questions (mocked data)

---

### 6.9. Settings (`/app/settings/*`)

- Sidebar tabs: Profile, Billing, Team (Business), API (Business)
- Gated tabs show lock icon + upgrade prompt on click

---

### 6.10. Pricing (`/pricing`)

- Three plan cards: Free, Pro ($14.99/mo), Business ($29.99/mo)
- Annual toggle (20% discount — UI only)
- Feature comparison table
- Primary CTA per plan: **Get started** / **Upgrade**

---

### 6.11. Paywall Modal

- Triggered contextually (not on landing or sign-up)
- Plan comparison (Free vs Pro vs Business)
- Primary: **Upgrade to Pro** / **Upgrade to Business**
- Secondary: **Maybe later** (purple outline)
- Dismissible; does not block entire app shell

---

## 7. Navigation Patterns

### Bot Sub-navigation (tabs or sidebar within bot context)

| Tab | Route | Icon |
| :--- | :--- | :--- |
| Knowledge | `/knowledge` | `BookOpen` |
| Test chat | `/chat` | `MessageSquare` |
| Widget | `/widget` | `Palette` |
| Deploy | `/deploy` | `Code` |
| Analytics | `/analytics` | `BarChart3` |

Active tab: pink underline or pink text. Inactive: `--text-secondary`.

### Breadcrumbs

- Dashboard → Bot name → current tab
- **Back** button (purple secondary) returns to previous logical screen

---

## 8. Component Inventory

| Component | Location | Notes |
| :--- | :--- | :--- |
| `ChatMessage` | Test chat, widget preview | User/assistant bubbles; citation chips |
| `SuggestedQuestions` | Chat empty state | Up to 3 pills (Free limit) |
| `DocumentUploadZone` | Knowledge | Drag-and-drop; file list; processing badge |
| `BotCard` | Dashboard | Rectangular card; Eye / BookOpen / Pencil actions |
| `WidgetPreview` | Widget builder | Realistic floating bubble |
| `EmbedCodeBlock` | Deploy | Monospace; copy button |
| `PaywallModal` | Gated actions | Plan comparison |
| `PlanBadge` | Nav, settings | Free / Pro / Business |
| `UpgradeBanner` | Gated screens | Inline; dismissible |
| `GradientBackground` | Landing hero | Curved stripe bands |

---

## 9. Motion and Micro-interactions

| Interaction | Behavior |
| :--- | :--- |
| Page transition | Fade-in `300ms` |
| Bot card hover | `translateY(-2px)` + shadow deepen, `150ms` |
| Primary button hover | Background lighten + optional glow on landing CTA |
| Copy embed code | Button label → **Copied!** for `2s`; success toast |
| Upload progress | Determinate bar + percentage |
| Chat typing | Three-dot pulse `1.2s` loop |
| Paywall open | Modal scale `0.96 → 1` + fade, `200ms` |
| Landing gradient bands | Slow horizontal drift, `20s` infinite |

---

## 10. Responsiveness

| Breakpoint | Value | Behavior |
| :--- | :--- | :--- |
| Mobile | `< 768px` | Single column; bot card grid → stack; chat full-width |
| Tablet | `768–1024px` | Two-column bot grid; widget builder stacks |
| Desktop | `> 1024px` | Full layouts as specified |

- Mobile gutters: `--space-4`
- Landing hero title scales down to `32px` on mobile
- Bot card action icons remain visible (no hover-only actions on touch)

---

## 11. Implementation Notes

- Styling: Module CSS per component; design tokens as CSS custom properties on `:root`
- Icons: `lucide-react`, `strokeWidth={1.5}`
- Code layout: `src/features/` for feature UI; shared primitives in `src/common/components/`
- Component hierarchy and Zustand schema: [schemas-design.md](./schemas-design.md)
- All user-visible strings in English; no i18n in MVP prototype

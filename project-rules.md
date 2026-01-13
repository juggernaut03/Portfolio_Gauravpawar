1. Structure & Modularity
Goals: scalability, readability, maintainability.

Do

Use feature‑first structure once the app is non‑trivial.
​

src/app – root layout, routing, providers.

src/shared – design‑system components, hooks, utils.
​

src/features/<feature> – everything for that feature: components/, hooks/, api/, types.ts.

src/pages – route‑level composition only.
​

Keep components small and single‑responsibility (one reason to change).
​

“Smart” components: data fetching, orchestration.

“Dumb” components: just render UI based on props.

Co‑locate things that change together.
​

Tests and stories next to components (Component.tsx, Component.test.tsx).

Feature hooks (useXyz) in that feature’s folder.

Use absolute imports and barrel files.
​

Configure @/* aliases in tsconfig.

src/features/user/index.ts exports public pieces only.

Don’t

Don’t mix feature code in shared: shared is only for generic, cross‑feature building blocks.
​

Don’t create deep nesting like src/components/ui/forms/auth/register/...; keep depth ≤ 3 folders.
​

Don’t let pages contain business logic; they must delegate to features and hooks.
​

2. State, Data & Logic
Do

Separate server state vs local UI state.
​

Use React Query/SWR for API data; hooks like useUserQuery, useUpdateUser.

Use local state (or Zustand/Jotai) for UI concerns and cross‑feature client state.
​

Encapsulate data access in feature hooks.
​

src/features/user/api/useUserQuery.ts.

Components import hooks, not raw fetch or axios.

Use TypeScript everywhere: props, return types, API responses.
​

Memoize where it matters.
​

React.memo for pure presentational components used in lists.

useCallback / useMemo for expensive calculations or dependencies.

Don’t

Don’t fetch data directly in low‑level components; always go through a hook or higher‑level container.
​

Don’t introduce a global state library “just in case”; start with React + query library and add only when necessary.
​

Don’t pass long prop chains across 4–5 levels; lift state or use context where needed.
​

3. Tailwind & Styling Rules
Do

Treat Tailwind as your design system implementation, not random inline CSS.
​

Centralize colors, font sizes, spacing, radii, breakpoints in tailwind.config.

Use semantic names (primary, surface, danger) instead of raw hex values.
​

Create reusable UI primitives with Tailwind.
​

Button, Input, Card, Badge, Modal, Sheet.

Use clsx / class-variance-authority to map variant/size props to Tailwind class sets.
​

Keep classNames ordered and readable.
​

Pattern: layout → flex/grid → size → spacing → typography → color → border → effects → state.

For complex components, split into multiple lines.

Reuse patterns via components or @apply, not copy‑paste.
​

Use @apply only in scoped component CSS or a dedicated utilities file for truly repeated combos.

Prefer React components for non‑trivial UI (buttons, cards, navs).
​

Optimize Tailwind performance.
​

Correct content paths so purge/JIT removes unused classes.

Avoid dynamic un‑parsable class strings.

Don’t

Don’t use inline style={{ ... }} for layout, spacing, or colors unless Tailwind cannot express it.
​

Don’t sprinkle raw hex colors or arbitrary values ([18px]) without a design‑token reason.
​

Don’t define global .btn, .card utilities in random CSS files; keep style abstractions close to components or in a single utilities layer.
​

4. Reuse & Design System
Do

Build a shared design system layer early.
​

src/shared/ui – primitives (Button, Input, Textarea, Select, Dialog).

src/shared/layout – wrappers (PageLayout, Section, SidebarLayout).

Use composition, not inheritance.
​

Create small, focused components that compose together:

PageLayout + PageHeader + PageContent instead of one massive DashboardPage.

Create feature‑specific wrappers from shared primitives.

AuthButton wraps Button with icon, text, and auth logic.

OrderCard composes Card, Badge, and typography primitives.

Don’t

Don’t fork the same component for each feature (PrimaryButton, SecondaryButton, TertiaryButton as separate components); use variants on a single Button.
​

Don’t put feature logic into shared primitives; shared components must stay generic.
​

Don’t duplicate similar layouts across pages; extract layout shells and slot content via children or props.
​

5. Readability, Maintainability & Collaboration
Do

Enforce linting and formatting (ESLint + Prettier) in CI.
​

Use clear naming: UserList, UserListItem, useUserFilters, userApi.
​

Document tricky parts.
​

Short comments for non‑obvious logic.

ARCHITECTURE.md / CONTRIBUTING.md describing structure, state, and styling rules.

Write tests where change‑risk is high.
​

Unit tests for business rules.

Component tests for complex UI behaviour.

Don’t

Don’t exceed ~200–250 lines per component; split into subcomponents or hooks.
​

Don’t use magic numbers/strings; extract to constants or config.
​

Don’t introduce libraries without documenting why and where to use them.

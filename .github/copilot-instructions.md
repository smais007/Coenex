# Project: Next.js + TypeScript + TailwindCSS + shadcn/ui

## Purpose

This repository builds a modern web application using Next.js (App Router), strict TypeScript, TailwindCSS, and the shadcn/ui component library.  
Key aims: reusability, accessibility, performance, clean architecture.

## Stack & Frameworks

- Next.js (App Router) for pages and routing
- TypeScript with `"strict": true` enabled
- TailwindCSS for styling and responsive design
- shadcn/ui components (imported from "@/components/ui/…")
- ESLint + Prettier for code quality & formatting
- Husky + lint-staged for pre-commit checks
- Bun as package manager

## Folder Structure

```
app/
components/
ui/
hooks/
lib/
services/
styles/
```

## Coding Standards

- Use PascalCase for React components, camelCase for hooks/functions.
- Prefer `interface` for object shapes that may extend and `type` for unions/intersections.
- Avoid `any`; use `unknown` with runtime checks or properly typed generics.
- Apply Tailwind utility classes rather than custom CSS; follow consistent ordering (layout → spacing → color → state).
- Use the shadcn/ui components where possible rather than reinventing UI parts.
- Ensure semantic HTML, ARIA attributes, keyboard navigation, focus management (accessibility).
- Handle loading, error, and empty states appropriately.
- Optimize performance: use `React.memo`, lazy imports, `Suspense`, appropriate caching/data-fetching via Next.js.
- Write clean JSDoc comments for non-trivial logic.
- Commit messages follow Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`.
- Unit and integration tests are required (e.g., React Testing Library + Vitest).

## Next.js Specific Rules

- Use dynamic routes via `[param].tsx` notation when needed.
- Sanitize and validate route params and query params.
- Use `getServerSideProps`, `getStaticProps`, `getStaticPaths`, or ISR as appropriate.
- Use `next/image` for optimized image loading (layout, priority, sizes).
- Use App Router conventions and server vs client component separation correctly.

## Accessibility & UX

- Use appropriate ARIA roles, labels, and attributes.
- Ensure focus states, hover states, and keyboard usability.
- Use animations/transitions sparingly and meaningfully (Framer Motion or Tailwind’s transition utilities).

## Performance & Maintainability

- Keep components small, reusable, and composable.
- Separate presentational vs business logic (hooks for state, utils for pure functions).
- Lazy-load heavy components, code-split where beneficial.
- Avoid large bundles; monitor build size.

## Testing & Documentation

- At least one unit test or integration test per component.
- Maintain Storybook (or equivalent) for UI components if adopted.
- Update `README.md` and/or `CONTRIBUTING.md` when rules or architecture change.
- Document complex hooks, utils, and business logic clearly.

---

**Note**: These instructions apply to all files unless a more specific path-based instruction file exists.

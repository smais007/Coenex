This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

A modern web application built with Next.js (App Router), TypeScript, TailwindCSS, and shadcn/ui components. Focused on reusability, accessibility, performance, and clean architecture.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** TailwindCSS v4
- **UI Components:** shadcn/ui
- **Testing:** Vitest + React Testing Library
- **Code Quality:** ESLint + Prettier
- **Git Hooks:** Husky + lint-staged
- **Package Manager:** Bun

## Available Scripts

```bash
# Development
bun dev              # Start development server
bun build            # Build for production
bun start            # Start production server

# Code Quality
bun run lint         # Run ESLint
bun run format       # Format code with Prettier
bun run format:check # Check code formatting

# Testing
bun test             # Run tests
bun test:watch       # Run tests in watch mode
bun test:ui          # Open Vitest UI
bun test:coverage    # Generate coverage report
```

## Documentation

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contributing guidelines and workflow
- **[TESTING.md](./TESTING.md)** - Comprehensive testing guide
- **[SETUP.md](./SETUP.md)** - Detailed tooling setup documentation
- **[.github/copilot-instructions.md](./.github/copilot-instructions.md)** - AI coding assistant rules

## Project Structure

```
app/              → Next.js pages and layouts
components/       → React components
  ui/             → shadcn/ui components
hooks/            → Custom React hooks
lib/              → Utility functions
services/         → API clients and services
styles/           → Additional CSS (prefer Tailwind)
```

## Development Workflow

1. **Install dependencies:** `bun install`
2. **Start dev server:** `bun dev`
3. **Make changes** and write tests
4. **Run tests:** `bun test`
5. **Commit changes** (pre-commit hooks auto-run)

Pre-commit hooks will automatically:

- Lint and fix code with ESLint
- Format code with Prettier
- Only process staged files

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

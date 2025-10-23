# Contributing to Coenex

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)

## Getting Started

### Prerequisites

- **Bun** (v1.0+) - [Install Bun](https://bun.sh/)
- **Node.js** (v18+) - Required for some tooling
- **Git** - For version control

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/smais007/Coenex.git
   cd coenex
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the development server:

   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

### Running Commands

```bash
# Development
bun dev              # Start dev server
bun build            # Build for production
bun start            # Start production server

# Code Quality
bun run lint         # Run ESLint
bun run format       # Format with Prettier
bun run format:check # Check formatting

# Testing
bun test             # Run all tests
bun test:watch       # Run tests in watch mode
bun test:ui          # Open Vitest UI
bun test:coverage    # Generate coverage report
```

### Project Structure

```
app/              → Next.js App Router pages and layouts
components/       → React components
  ui/             → shadcn/ui components
hooks/            → Custom React hooks
lib/              → Utility functions and helpers
services/         → API clients and external services
styles/           → Additional CSS (prefer Tailwind)
```

## Coding Standards

### TypeScript

- **Strict mode** is enabled - No `any` types allowed
- Use `interface` for object shapes that may be extended
- Use `type` for unions, intersections, and mapped types
- Always define return types for functions

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
}

type Status = "pending" | "active" | "inactive";

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Avoid
function getData(id: any) {
  // No 'any'
  // ...
}
```

### Naming Conventions

- **Components**: `PascalCase` - `UserProfile.tsx`
- **Hooks**: `camelCase` with `use` prefix - `useAuth.ts`
- **Functions**: `camelCase` - `fetchData`, `calculateTotal`
- **Constants**: `UPPER_SNAKE_CASE` - `API_BASE_URL`
- **Types/Interfaces**: `PascalCase` - `UserData`, `ApiResponse`

### React Best Practices

#### Component Structure

```typescript
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MyComponentProps {
  title: string;
  onSubmit: () => void;
}

/**
 * Brief description of what this component does
 * @param title - The title to display
 * @param onSubmit - Callback when form is submitted
 */
export function MyComponent({ title, onSubmit }: MyComponentProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Button onClick={onSubmit} disabled={isLoading}>
        Submit
      </Button>
    </div>
  );
}
```

#### Prefer Server Components

Default to Server Components unless you need:

- Browser APIs (window, document)
- Event handlers (onClick, onChange)
- State or lifecycle hooks
- Client-only libraries

```typescript
// Server Component (default)
export default function Page() {
  return <div>Server-rendered content</div>;
}

// Client Component (when needed)
"use client";

export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Styling with Tailwind

- **Use utility classes** instead of custom CSS
- Follow **class ordering**: layout → spacing → color → state

```typescript
// ✅ Good - Utility classes with consistent ordering
<div className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50">

// ❌ Avoid - Custom CSS (unless absolutely necessary)
<div className="custom-container">
```

### Accessibility

- Use **semantic HTML** elements (`<button>`, `<nav>`, `<main>`)
- Add **ARIA attributes** when semantic HTML isn't enough
- Ensure **keyboard navigation** works (Tab, Enter, Escape)
- Provide **visible focus states**

```typescript
// ✅ Good
<button
  aria-label="Close dialog"
  onClick={onClose}
>
  <X className="h-4 w-4" />
</button>

// ❌ Avoid
<div onClick={onClose}>  // Not keyboard accessible
  <X />
</div>
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
feat(auth): add login functionality

# Bug fix
fix(button): resolve alignment issue on mobile

# Documentation
docs(readme): update installation instructions

# Refactor
refactor(api): simplify error handling logic

# Test
test(home): add tests for home page component
```

## Testing Requirements

**Every component must have tests.** See [TESTING.md](./TESTING.md) for detailed guidelines.

### Minimum Requirements

- At least **one test per component**
- Test **user interactions** (clicks, typing, etc.)
- Test **accessibility** (keyboard navigation, ARIA)
- Maintain **>80% code coverage**

### Running Tests

Before submitting a PR:

```bash
bun test              # All tests must pass
bun test:coverage     # Check coverage
```

### Example Test

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

## Pull Request Process

### Before Submitting

1. **Run all checks**:

   ```bash
   bun run lint         # Fix linting errors
   bun run format       # Format code
   bun test             # All tests pass
   ```

2. **Update documentation** if needed

3. **Add tests** for new features

### PR Title Format

Use the same format as commit messages:

```
feat(component): add new feature
fix(api): resolve issue with data fetching
```

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] All tests pass
- [ ] Added new tests
- [ ] Manually tested

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process

1. **Automated checks** must pass (linting, tests)
2. **Code review** by at least one maintainer
3. **Address feedback** and make requested changes
4. **Squash and merge** once approved

## Git Hooks

This project uses **Husky** for git hooks.

### Pre-commit Hook

Automatically runs before each commit:

- **ESLint** - Fixes linting errors
- **Prettier** - Formats code
- **lint-staged** - Only on staged files

If the hook fails, fix the errors and commit again.

### Bypassing Hooks (Not Recommended)

```bash
git commit --no-verify -m "message"
```

**Note**: Only bypass hooks in exceptional circumstances.

## Code Review Guidelines

### For Reviewers

- Be **constructive** and **respectful**
- Suggest **improvements**, don't just criticize
- Focus on **logic, readability, and maintainability**
- Check for **test coverage**
- Verify **accessibility** considerations

### For Contributors

- **Respond promptly** to feedback
- **Ask questions** if feedback is unclear
- **Explain your reasoning** for implementation choices
- Be **open to suggestions**

## Questions or Issues?

- Open an issue on GitHub
- Check existing documentation
- Ask in discussions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Coenex! 🚀

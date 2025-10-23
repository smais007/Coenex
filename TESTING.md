# Testing Guide

This project uses **Vitest** with **React Testing Library** for unit and integration testing.

## Quick Start

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with UI
bun test:ui

# Run tests with coverage
bun test:coverage
```

## Project Structure

```
app/
  page.test.tsx              # Example page test
components/
  ui/
    button.test.tsx          # Example component test
lib/
  test-utils.tsx             # Shared testing utilities
vitest.config.ts             # Vitest configuration
vitest.setup.ts              # Global test setup
```

## Writing Tests

### Basic Component Test

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

it("handles click events", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByRole("button"));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testing with Providers

Use the custom `renderWithProviders` utility from `lib/test-utils.tsx`:

```typescript
import { renderWithProviders, screen } from "@/lib/test-utils";

it("renders with theme provider", () => {
  renderWithProviders(<MyComponent />);
  // Your assertions here
});
```

## Testing Best Practices

### 1. Query Priority

Follow this priority order when selecting elements:

1. **`getByRole`** - Most accessible (preferred)
2. **`getByLabelText`** - Form elements with labels
3. **`getByPlaceholderText`** - Form placeholders
4. **`getByText`** - Non-interactive content
5. **`getByTestId`** - Last resort only

```typescript
// ✅ Good - Uses accessible queries
const button = screen.getByRole("button", { name: /submit/i });

// ❌ Avoid - Too implementation-specific
const button = screen.getByTestId("submit-button");
```

### 2. Async Operations

Always use `await` with user events and async queries:

```typescript
import { waitFor } from "@testing-library/react";

it("shows success message after submit", async () => {
  const user = userEvent.setup();

  render(<Form />);

  await user.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() => {
    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });
});
```

### 3. Mocking Functions

Use `vi.fn()` for mock functions:

```typescript
import { vi } from "vitest";

const mockFn = vi.fn();
mockFn.mockReturnValue("mocked value");
mockFn.mockResolvedValue("async value");
```

### 4. Cleanup

Cleanup is automatic via `vitest.setup.ts`, but you can manually cleanup if needed:

```typescript
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
```

## Coverage

Run coverage reports to ensure adequate test coverage:

```bash
bun test:coverage
```

Coverage reports are generated in the `coverage/` directory.

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Debugging Tests

### Using Vitest UI

```bash
bun test:ui
```

This opens an interactive UI to explore and debug tests.

### Debug Individual Tests

Use `it.only` to run a single test:

```typescript
it.only("runs only this test", () => {
  // ...
});
```

### Print DOM State

```typescript
import { screen } from "@testing-library/react";

screen.debug(); // Prints current DOM
screen.logTestingPlaygroundURL(); // Opens testing playground
```

## Common Patterns

### Testing Forms

```typescript
it("submits form data", async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();

  render(<Form onSubmit={handleSubmit} />);

  await user.type(
    screen.getByLabelText(/email/i),
    "test@example.com"
  );

  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    email: "test@example.com",
  });
});
```

### Testing Accessibility

```typescript
it("is keyboard accessible", async () => {
  const user = userEvent.setup();

  render(<Dialog />);

  // Tab to focus button
  await user.tab();

  // Press Enter to open
  await user.keyboard("{Enter}");

  // Should trap focus inside dialog
  await user.tab();
  expect(screen.getByRole("dialog")).toContainElement(
    document.activeElement
  );
});
```

### Testing Server Components

For Next.js server components, test the rendered output:

```typescript
it("renders server component", () => {
  // Server components can be tested like regular components
  // since they render to static HTML
  render(<ServerComponent />);

  expect(screen.getByText(/expected content/i)).toBeInTheDocument();
});
```

## Troubleshooting

### "document is not defined"

Ensure you're using Vitest (not Bun's test runner):

```bash
bunx vitest run
```

Or update your script in `package.json`:

```json
{
  "scripts": {
    "test": "vitest run"
  }
}
```

### Tests timeout

Increase timeout in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    testTimeout: 10000, // 10 seconds
  },
});
```

### Mock Next.js modules

```typescript
vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => "/",
}));
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/react)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Accessibility](https://testing-library.com/docs/queries/about#priority)

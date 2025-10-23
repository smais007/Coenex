/**
 * Test Utilities
 *
 * Common utilities and helpers for testing components.
 */

import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { vi } from "vitest";

/**
 * Custom render function that wraps components with common providers
 * (Add ThemeProvider, Router, etc. as needed)
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  function Wrapper({ children }: { children: ReactNode }) {
    // Add your providers here
    // Example: <ThemeProvider>{children}</ThemeProvider>
    return <>{children}</>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Mock Next.js router
 */
export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  pathname: "/",
  query: {},
  asPath: "/",
};

// Re-export everything from testing library
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

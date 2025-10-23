/**
 * @vitest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /to get started, edit the page.tsx file/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders the Next.js logo", () => {
    render(<Home />);

    const logo = screen.getByAltText(/next.js logo/i);

    expect(logo).toBeInTheDocument();
  });

  it("renders the Deploy Now link", () => {
    render(<Home />);

    const deployLink = screen.getByRole("link", { name: /deploy now/i });

    expect(deployLink).toBeInTheDocument();
    expect(deployLink).toHaveAttribute("href");
    expect(deployLink).toHaveAttribute("target", "_blank");
  });

  it("renders the Documentation link", () => {
    render(<Home />);

    const docsLink = screen.getByRole("link", { name: /documentation/i });

    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute("target", "_blank");
  });

  it("contains links to templates and learning resources", () => {
    render(<Home />);

    const templatesLink = screen.getByRole("link", { name: /templates/i });
    const learningLink = screen.getByRole("link", { name: /learning/i });

    expect(templatesLink).toBeInTheDocument();
    expect(learningLink).toBeInTheDocument();
  });
});

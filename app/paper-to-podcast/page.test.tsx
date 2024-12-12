import { fireEvent, render, screen } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import PaperToPodcastPage from "./page";

describe("paper to podcast page", () => {
  it("renders the page with header", async () => {
    render(<PaperToPodcastPage />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Paper to Podcast ✨",
    });
    expect(heading).toBeDefined();
  });

  it("has an input button for file upload", async () => {
    render(<PaperToPodcastPage />);
    const fileInput = screen.getAllByRole("button", {
      name: /Upload Paper/i,
    })[0];
    expect(fileInput).toBeDefined();
  });

  it("has a file input within a button", async () => {
    render(<PaperToPodcastPage />);
    const fileInputButton = screen.getAllByRole("button", {
      name: /Upload Paper/i,
    })[0];
    const fileInput = fileInputButton.querySelector('input[type="file"]');
    expect(fileInput).not.toBeNull();
  });

  it("has a description paragraph", async () => {
    render(<PaperToPodcastPage />);
    const description = screen.getAllByText(
      /Upload a paper to convert to podcast! 🚀/i
    )[0];
    expect(description).toBeDefined();
  });

  it("should trigger click handler when button is clicked", async () => {
    render(<PaperToPodcastPage />);
    const fileInputButton = screen.getAllByRole("button", {
      name: /Upload Paper/i,
    })[0];
    const fileInput = fileInputButton.querySelector('input[type="file"]');
    expect(fileInput).not.toBeNull();

    const clickMock = vi.fn();

    if (fileInput) {
      (fileInput as any).click = clickMock;
    }

    const clickStatus = fireEvent.click(fileInputButton as any);
    expect(clickMock).toHaveBeenCalled();
    expect(clickStatus).toBe(true);
  });
});

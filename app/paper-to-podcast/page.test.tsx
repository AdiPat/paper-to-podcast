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

  it("opens file selector when button is clicked", async () => {
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

  it("Shows the uploaded file in the UI after file upload is done", async () => {
    render(<PaperToPodcastPage />);
    const fileInputButton = screen.getAllByRole("button", {
      name: /Upload Paper/i,
    })[0];
    const fileInput = fileInputButton.querySelector('input[type="file"]');

    // Simulate file selection
    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });
    fireEvent.change(fileInput as any, { target: { files: [file] } });

    // Assert that the state is updated and the file name is displayed

    const icon = screen.getAllByTestId("fa-file-alt")[0];
    const fileNameDisplay = (await screen.findAllByText(/example.pdf/i))[0];
    expect(icon).not.toBeNull();
    expect(fileNameDisplay).toBeDefined();
  });

  it("file upload button has upload icon", async () => {
    render(<PaperToPodcastPage />);
    const fileInputButton = screen.getAllByRole("button", {
      name: /Upload Paper/i,
    })[0];
    const icon = screen.getAllByTestId("fa-upload")[0];
    expect(icon).not.toBeNull();
  });

  it("file upload supports only pdf files", async () => {
    render(<PaperToPodcastPage />);
    const fileInputButton = screen.getAllByRole("button", {
      name: /Upload Paper/i,
    })[0];
    const fileInput = fileInputButton.querySelector('input[type="file"]');
    const changeMock = vi.fn();
    (fileInput as any).click = changeMock;
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    fireEvent.click(fileInputButton as any);
    fireEvent.change(fileInput as any, { target: { files: [file] } });
    const errorElement = screen.getAllByText(
      /Only PDF files are supported!/i
    )[0];
    const errorIcon = screen.getAllByTestId("fa-exclamation-triangle")[0];

    expect(changeMock).toHaveBeenCalled();
    expect(fileInput).not.toBeNull();
    expect(errorElement).toBeDefined();
    expect(errorIcon).not.toBeNull();
  });
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Dashboard from "../../../src/pages/dashboard/[username]";
import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";

// next/routerのモック
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

// next-auth/reactのモック
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

describe("Dashboard", () => {
  const mockBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockImplementation(() => ({
      back: mockBack,
      query: {
        username: "test",
      },
    }));
    (useSession as any).mockImplementation(() => ({
      data: {
        user: {
          name: "test",
        },
      },
    }));
  });

  it("ユーザー名が表示されること", () => {
    render(<Dashboard />);
    expect(screen.getByText("ユーザー名: test")).toBeInTheDocument();
  });

  it("戻るボタンをクリックすると前の画面に戻ること", () => {
    render(<Dashboard />);
    const backButton = screen.getByText("戻る");
    fireEvent.click(backButton);
    expect(mockBack).toHaveBeenCalled();
  });
});

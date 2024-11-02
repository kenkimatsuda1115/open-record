import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Dashboard from "../../../src/pages/dashboard/[username]";
import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";

// CSSファイルのモック
vi.mock("@/app/globals.css", () => ({}));

// next/routerのモック
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

// next-auth/reactのモック
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

// signOutのモックを設定
vi.mock("next-auth/react", async () => {
  const actual = await vi.importActual("next-auth/react");
  return {
    ...actual,
    signOut: vi.fn(),
    useSession: () => ({
      data: {
        user: {
          name: "test",
        },
      },
    }),
  };
});

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
  });

  it("ユーザー名が表示されること", () => {
    render(<Dashboard />);
    expect(screen.getByText("ユーザー名: test")).toBeInTheDocument();
  });

  it("ログアウトボタンをクリックするとログアウトすること", () => {
    render(<Dashboard />);
    const logoutButton = screen.getByText("ログアウト");
    fireEvent.click(logoutButton);
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/" });
  });
});

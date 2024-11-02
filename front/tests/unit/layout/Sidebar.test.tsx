import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { vi } from "vitest";
import { Sidebar } from "../../../src/app/components/layout/Sidebar";

// next-auth/reactのモック
vi.mock("next-auth/react");

// next/routerのモック
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));
// useHeaderLayoutのモック
vi.mock("../../../src/app/hooks/layout/HeaderLayout", () => ({
  useHeaderLayout: vi.fn().mockReturnValue({
    navigateToDashboard: vi.fn(),
  }),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // useRouterのモックの実装
    (useRouter as any).mockImplementation(() => ({
      push: vi.fn(),
      query: { username: "testuser" },
    }));

    // useSessionのモックの実装
    (useSession as any).mockReturnValue({
      data: {
        user: { name: "test" },
      },
      status: "authenticated",
    });
  });

  it("正常にレンダリングされること", () => {
    const { container } = render(<Sidebar isOpen={true} />);
    expect(container).toBeInTheDocument();
  });

  it("サイドバーが開いている時、ダッシュボードリンクが表示されること", () => {
    const { getByText } = render(<Sidebar isOpen={true} />);
    expect(getByText("ホーム")).toBeInTheDocument();
  });

  it("サイドバーが開いている時、プロフィールリンクが表示されること", () => {
    const { getByText } = render(<Sidebar isOpen={true} />);
    expect(getByText("プロフィール")).toBeInTheDocument();
  });
});

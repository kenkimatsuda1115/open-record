import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { vi } from "vitest";
import { HeaderLayout } from "../../../src/app/components/layout/HeaderLayout";

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

describe("HeaderLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // useRouterのモックの実装
    (useRouter as any).mockImplementation(() => ({
      push: vi.fn(),
      query: { username: "testuser" },
      back: vi.fn(),
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
    const { container } = render(
      <HeaderLayout>
        <div>Test Content</div>
      </HeaderLayout>,
    );
    expect(container).toBeInTheDocument();
  });

  it("プロジェクト名が表示されること", () => {
    const { getByText } = render(
      <HeaderLayout>
        <div>Test Content</div>
      </HeaderLayout>,
    );
    expect(getByText("Open-Record")).toBeInTheDocument();
  });

  it("ユーザー名が表示されること", () => {
    const { getByText } = render(
      <HeaderLayout>
        <div>Test Content</div>
      </HeaderLayout>,
    );
    expect(getByText("ユーザー名: test")).toBeInTheDocument();
  });

  it("ログアウトボタンが表示されること", () => {
    const { getByText } = render(
      <HeaderLayout>
        <div>Test Content</div>
      </HeaderLayout>,
    );
    expect(getByText("ログアウト")).toBeInTheDocument();
  });

  it("子要素が正しくレンダリングされること", () => {
    const { getByText } = render(
      <HeaderLayout>
        <div>Test Content</div>
      </HeaderLayout>,
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });
});

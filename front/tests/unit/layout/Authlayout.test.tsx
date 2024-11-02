import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { AuthLayout } from "../../../src/app/components/layout/AuthLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { vi } from "vitest";

// next-auth/reactのモック
vi.mock("next-auth/react");

// next/routerのモック
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

describe("AuthLayout", () => {
  beforeEach(() => {
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
      <AuthLayout>
        <div>Test Content</div>
      </AuthLayout>,
    );
    expect(container).toBeInTheDocument();
  });
});

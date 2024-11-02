import { renderHook } from "@testing-library/react";
import { useLogin } from "../../../src/app/page.hook";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { act } from "@testing-library/react";

// テストユーティリティ関数
const setupLoginHook = () => {
  const { result } = renderHook(() => useLogin());

  // ステート更新
  act(() => {
    result.current.setUsername("test");
    result.current.setPassword("1111111");
  });

  return { result };
};

// next-auth/reactのモック
vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));

// next/navigationのモック
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("useLogin", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  it("ログインに成功した場合、ダッシュボードに遷移すること", async () => {
    (signIn as any).mockResolvedValueOnce({ error: null });

    const { result } = setupLoginHook();

    await act(async () => {
      await result.current.login({ preventDefault: vi.fn() } as any);
    });

    expect(signIn).toHaveBeenCalledWith("credentials", {
      redirect: false,
      username: "test",
      password: "1111111",
    });
    expect(mockPush).toHaveBeenCalledWith("/dashboard/test");
    expect(result.current.error).toBe(false);
  });

  it("ログインに失敗した場合、エラーフラグが立つこと", async () => {
    (signIn as any).mockResolvedValueOnce({ error: "Invalid credentials" });

    const { result } = setupLoginHook();

    await act(async () => {
      await result.current.login({ preventDefault: vi.fn() } as any);
    });

    expect(signIn).toHaveBeenCalledWith("credentials", {
      redirect: false,
      username: "test",
      password: "1111111",
    });
    expect(mockPush).not.toHaveBeenCalled();
    expect(result.current.error).toBe(true);
  });

  it("サインアップボタンクリック時に登録画面に遷移すること", async () => {
    const { result } = setupLoginHook();

    await result.current.signUp();

    expect(mockPush).toHaveBeenCalledWith("/signUp");
  });
});

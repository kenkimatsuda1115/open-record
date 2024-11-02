import { renderHook, act } from "@testing-library/react";
import { useSignUp } from "../../../src/app/hooks/useSignUp";
import { useRouter } from "next/router";
import { describe, it, expect, vi, beforeEach } from "vitest";

// next/routerのモック
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

// fetchのモック
global.fetch = vi.fn();

const setupSignUpHook = () => {
  return renderHook(() => useSignUp());
};

describe("useSignUp", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  it("パスワードが一致しない場合、エラーが設定されること", async () => {
    const { result } = setupSignUpHook();

    await act(async () => {
      result.current.setPassword("password123");
      result.current.setPasswordConfirm("password456");
      await result.current.signUp({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("入力内容を確認してください");
  });

  it("必須項目が未入力の場合、エラーが設定されること", async () => {
    const { result } = setupSignUpHook();

    await act(async () => {
      await result.current.signUp({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("入力内容を確認してください");
  });

  it("パスワードが8文字未満の場合、エラーが設定されること", async () => {
    const { result } = setupSignUpHook();

    await act(async () => {
      result.current.setUsername("test");
      result.current.setEmail("test@example.com");
      result.current.setPassword("pass");
      result.current.setPasswordConfirm("pass");
      await result.current.signUp({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("入力内容を確認してください");
  });

  it("メールアドレスが不正な場合、エラーが設定されること", async () => {
    const { result } = setupSignUpHook();

    await act(async () => {
      result.current.setUsername("test");
      result.current.setEmail("invalid-email");
      result.current.setPassword("password123");
      result.current.setPasswordConfirm("password123");
      await result.current.signUp({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("入力内容を確認してください");
  });
  it("ユーザー名が既に使用されている場合、エラーが設定されること", async () => {
    const { result } = setupSignUpHook();

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: () => Promise.resolve({ error: "Username already exists" }),
    });

    await act(async () => {
      result.current.setUsername("test");
      result.current.setEmail("test@example.com");
      result.current.setPassword("password123");
      result.current.setPasswordConfirm("password123");
      await result.current.signUp({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("入力内容を確認してください");
  });

  it("サインアップに失敗した場合、エラーが設定されること", async () => {
    const { result } = setupSignUpHook();

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "Registration failed" }),
    });

    await act(async () => {
      result.current.setUsername("test");
      result.current.setEmail("test@example.com");
      result.current.setPassword("password123");
      result.current.setPasswordConfirm("password123");
      await result.current.signUp({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.error).toBe("入力内容を確認してください");
  });

  it("ログインボタンクリック時にログイン画面に遷移すること", async () => {
    const { result } = setupSignUpHook();

    await act(async () => {
      result.current.goToLogin();
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});

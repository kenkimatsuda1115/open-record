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
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: vi.fn(),
    });
  });

  it("必須項目が未入力の場合にエラーが表示される", async () => {
    const { result } = setupSignUpHook();

    await act(async () => {
      result.current.setUsername("testuser");
      result.current.setEmail("test@example.com");
      result.current.setPassword("password123");
      result.current.signUp({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(result.current.error).toBe("すべての必須項目を入力してください");
  });

  it("パスワードとパスワード確認が一致しない場合にエラーが表示される", async () => {
    const { result } = setupSignUpHook();

    await act(async () => {
      result.current.setUsername("testuser");
      result.current.setEmail("test@example.com");
      result.current.setPassword("password123");
      result.current.setPasswordConfirm("differentpassword");
    });
    await act(async () => {
      result.current.signUp({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(result.current.error).toBe("パスワードが一致しません");
  });

  it("無効なメールアドレスの場合にエラーが表示される", async () => {
    const { result } = setupSignUpHook();

    await act(async () => {
      result.current.setUsername("testuser");
      result.current.setEmail("invalid-email");
      result.current.setPassword("password123");
      result.current.setPasswordConfirm("password123");
    });
    await act(async () => {
      result.current.signUp({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(result.current.error).toBe("有効なメールアドレスを入力してください");
  });

  it("パスワードが8文字未満の場合にエラーが表示される", async () => {
    const { result } = setupSignUpHook();

    await act(async () => {
      result.current.setUsername("testuser");
      result.current.setEmail("test@example.com");
      result.current.setPassword("pass");
      result.current.setPasswordConfirm("pass");
    });
    await act(async () => {
      result.current.signUp({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(result.current.error).toBe(
      "パスワードは8文字以上で入力してください",
    );
  });
});

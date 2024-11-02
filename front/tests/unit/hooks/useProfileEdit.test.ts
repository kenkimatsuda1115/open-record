import { renderHook, act } from "@testing-library/react";
import { useProfileEdit } from "../../../src/app/hooks/useProfileEdit";
import { useRouter } from "next/router";
import { describe, it, expect, vi, beforeEach } from "vitest";

// next/routerのモック
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

// fetchのモック
global.fetch = vi.fn();

const setupProfileEditHook = () => {
  return renderHook(() => useProfileEdit());
};

describe("useProfileEdit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      query: { username: "testuser" },
      push: vi.fn(),
    });
  });

  it("プロフィール情報を正常に取得できる", async () => {
    const mockProfile = {
      username: "testuser",
      nickname: "Test User",
      email: "test@example.com",
      bio: "テストユーザーです",
      location: "Tokyo",
      website: "https://example.com",
      updatedAt: "2024-01-01",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockProfile }),
    });

    const { result } = setupProfileEditHook();

    await act(async () => {
      await result.current.fetchProfile();
    });

    expect(result.current.profile).toEqual(mockProfile);
    expect(result.current.loading).toBe(false);
  });

  it("プロフィール取得時にエラーが発生した場合、エラーがコンソールに出力される", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

    const { result } = setupProfileEditHook();

    await act(async () => {
      await result.current.fetchProfile();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "プロフィール取得エラー:",
      expect.any(Error),
    );
    expect(result.current.loading).toBe(false);
  });

  it("プロフィールを正常に更新できる", async () => {
    const mockPush = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { username: "testuser" },
      push: mockPush,
    });

    const updatedProfile = {
      nickname: "Updated User",
      bio: "更新後のプロフィール",
      location: "Osaka",
      website: "https://updated.com",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: updatedProfile }),
    });

    const { result } = setupProfileEditHook();

    await act(async () => {
      await result.current.updateProfile(updatedProfile);
    });

    expect(result.current.profile).toEqual(updatedProfile);
    expect(mockPush).toHaveBeenCalledWith("/profile/testuser");
  });

  it("プロフィール更新時にエラーが発生した場合、エラーがコンソールに出力される", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = setupProfileEditHook();

    await act(async () => {
      await result.current.updateProfile({});
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "プロフィール更新エラー:",
      expect.any(Error),
    );
  });
});

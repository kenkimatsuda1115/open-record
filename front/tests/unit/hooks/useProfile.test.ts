import { renderHook, act } from "@testing-library/react";
import { useProfile } from "../../../src/app/hooks/useProfile";
import { useRouter } from "next/router";
import { describe, it, expect, vi, beforeEach } from "vitest";

// next/routerのモック
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

// fetchのモック
global.fetch = vi.fn();

const setupProfileHook = () => {
  return renderHook(() => useProfile());
};

describe("useProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
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
      updatedAt: "2024-01-01T00:00:00.000Z",
    };

    (useRouter as jest.Mock).mockReturnValue({
      query: { username: "testuser" },
      push: vi.fn(),
    });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ data: mockProfile }),
    });

    const { result } = setupProfileHook();

    await act(async () => {
      await result.current.fetchProfile();
    });

    expect(result.current.profile).toEqual({
      ...mockProfile,
      updatedAt: new Date(mockProfile.updatedAt).toLocaleDateString("ja-JP"),
    });
    expect(result.current.loading).toBe(false);
  });

  it("プロフィール取得時にエラーが発生した場合、エラーがコンソールに出力される", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    (useRouter as jest.Mock).mockReturnValue({
      query: { username: "testuser" },
      push: vi.fn(),
    });

    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

    const { result } = setupProfileHook();

    await act(async () => {
      await result.current.fetchProfile();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "プロフィール取得エラー:",
      expect.any(Error),
    );
    expect(result.current.loading).toBe(false);
  });

  it("編集ページに正しく遷移できる", () => {
    const mockPush = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { username: "testuser" },
      push: mockPush,
    });

    const { result } = setupProfileHook();

    act(() => {
      result.current.goToEditProfile();
    });

    expect(mockPush).toHaveBeenCalledWith("/profile/testuser/edit");
  });
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";
import ProfileEdit from "../../../src/pages/profile/[username]/edit";
import { useProfileEdit } from "../../../src/app/hooks/useProfileEdit";

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

// useProfileのモック
vi.mock("../../../src/app/hooks/useProfile", () => ({
  useProfile: vi.fn(),
}));
// useProfileEditのモック
vi.mock("../../../src/app/hooks/useProfileEdit", () => ({
  useProfileEdit: vi.fn(),
}));

describe("ProfileEdit", () => {
  const mockProfile = {
    username: "testuser",
    nickname: "Test User",
    email: "test@example.com",
    bio: "テストユーザーです",
    location: "Tokyo",
    website: "https://example.com",
    updatedAt: "2024-01-01",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockImplementation(() => ({
      query: { username: "testuser" },
      push: vi.fn(),
    }));
    (useSession as any).mockReturnValue({
      data: {
        user: { name: "testuser" },
      },
    });
    (useProfileEdit as any).mockReturnValue({
      profile: mockProfile,
      loading: false,
      fetchProfile: vi.fn(),
      updateProfile: vi.fn(),
    });
  });

  it("プロフィール編集フォームが正しく表示されること", () => {
    render(<ProfileEdit />);
    expect(screen.getByLabelText("ニックネーム")).toHaveValue(
      mockProfile.nickname,
    );
    expect(screen.getByLabelText("自己紹介")).toHaveValue(mockProfile.bio);
    expect(screen.getByLabelText("場所")).toHaveValue(mockProfile.location);
    expect(screen.getByLabelText("Webサイト")).toHaveValue(mockProfile.website);
  });

  it("ローディング中の表示がされること", () => {
    (useProfileEdit as any).mockReturnValue({
      profile: null,
      loading: true,
      fetchProfile: vi.fn(),
      updateProfile: vi.fn(),
    });
    render(<ProfileEdit />);
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  it("フォームの送信が正しく動作すること", async () => {
    const mockUpdateProfile = vi.fn();
    (useProfileEdit as any).mockReturnValue({
      profile: mockProfile,
      loading: false,
      fetchProfile: vi.fn(),
      updateProfile: mockUpdateProfile,
    });

    render(<ProfileEdit />);

    const newProfileData = {
      nickname: "Updated Name",
      bio: "Updated Bio",
      location: "Updated Location",
      website: "https://updated.com",
    };

    fireEvent.change(screen.getByLabelText("ニックネーム"), {
      target: { value: newProfileData.nickname },
    });
    fireEvent.change(screen.getByLabelText("自己紹介"), {
      target: { value: newProfileData.bio },
    });
    fireEvent.change(screen.getByLabelText("場所"), {
      target: { value: newProfileData.location },
    });
    fireEvent.change(screen.getByLabelText("Webサイト"), {
      target: { value: newProfileData.website },
    });

    fireEvent.click(screen.getByText("保存"));

    expect(mockUpdateProfile).toHaveBeenCalledWith(newProfileData);
  });

  it("他のユーザーのプロフィールページにアクセスした場合、リダイレクトされること", () => {
    const mockPush = vi.fn();
    (useRouter as any).mockImplementation(() => ({
      query: { username: "otheruser" },
      push: mockPush,
    }));
    (useSession as any).mockReturnValue({
      data: {
        user: { name: "testuser" },
      },
    });

    render(<ProfileEdit />);
    expect(mockPush).toHaveBeenCalledWith("/profile/otheruser");
  });

  it("キャンセルボタンをクリックするとプロフィールページに戻ること", () => {
    const mockPush = vi.fn();
    (useRouter as any).mockImplementation(() => ({
      query: { username: "testuser" },
      push: mockPush,
    }));

    render(<ProfileEdit />);
    fireEvent.click(screen.getByText("キャンセル"));
    expect(mockPush).toHaveBeenCalledWith("/profile/testuser");
  });
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";
import Profile from "../../../src/pages/profile/[username]/index";
import { useProfile } from "../../../src/app/hooks/useProfile";

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

describe("Profile", () => {
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
    }));
    (useSession as any).mockReturnValue({
      data: {
        user: { name: "testuser" },
      },
    });
    (useProfile as any).mockReturnValue({
      profile: mockProfile,
      loading: false,
      fetchProfile: vi.fn(),
      goToEditProfile: vi.fn(),
    });
  });

  it("プロフィール情報が正しく表示されること", () => {
    render(<Profile />);
    expect(screen.getByText(mockProfile.nickname)).toBeInTheDocument();
    expect(screen.getByText(`@${mockProfile.username}`)).toBeInTheDocument();
    expect(
      screen.getByText(`location: ${mockProfile.location}`),
    ).toBeInTheDocument();
    expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.email)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.website)).toBeInTheDocument();
  });

  it("ローディング中の表示がされること", () => {
    (useProfile as any).mockReturnValue({
      profile: null,
      loading: true,
      fetchProfile: vi.fn(),
      goToEditProfile: vi.fn(),
    });
    render(<Profile />);
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  it("プロフィールが見つからない場合のメッセージが表示されること", () => {
    (useProfile as any).mockReturnValue({
      profile: null,
      loading: false,
      fetchProfile: vi.fn(),
      goToEditProfile: vi.fn(),
    });
    render(<Profile />);
    expect(screen.getByText("ユーザーが見つかりません")).toBeInTheDocument();
  });

  it("自分のプロフィールの場合、編集ボタンが表示されること", () => {
    render(<Profile />);
    expect(screen.getByText("プロフィールを編集")).toBeInTheDocument();
  });

  it("他人のプロフィールの場合、編集ボタンが表示されないこと", () => {
    (useSession as any).mockReturnValue({
      data: {
        user: { name: "otheruser" },
      },
    });
    render(<Profile />);
    expect(screen.queryByText("プロフィールを編集")).not.toBeInTheDocument();
  });
});

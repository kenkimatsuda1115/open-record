import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import dotenv from "dotenv";

dotenv.config();
export const useProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  interface UserProfile {
    username: string;
    nickname: string;
    email: string;
    bio: string; // 自己紹介
    location: string; // 場所
    website: string; // ウェブサイト
    updatedAt: string; // 登録日
  }

  const fetchProfile = async () => {
    /**
     * プロフィールを取得する
     */
    if (username) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`,
        );
        const data = await response.json();
        // updatedAtをフォーマットする
        if (data.data.updatedAt) {
          data.data.updatedAt = new Date(
            data.data.updatedAt,
          ).toLocaleDateString("ja-JP");
        }
        setProfile(data.data);
      } catch (error) {
        console.error("プロフィール取得エラー:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const goToEditProfile = () => {
    // 編集ページに遷移
    router.push(`/profile/${username}/edit`);
  };

  return {
    profile,
    loading,
    fetchProfile,
    goToEditProfile,
  };
};

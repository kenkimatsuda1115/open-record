import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import dotenv from "dotenv";

dotenv.config();
export const useProfileEdit = () => {
  const router = useRouter();
  const { username } = router.query;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  interface UserProfile {
    username: string;
    nickname: string;
    email: string;
    bio: string;
    location: string;
    website: string;
    updatedAt: string;
  }

  // プロフィール情報を取得
  const fetchProfile = async () => {
    if (username) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`,
        );
        const data = await response.json();
        setProfile(data.data);
      } catch (error) {
        console.error("プロフィール取得エラー:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // プロフィール更新処理
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!username) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        },
      );

      if (!response.ok) {
        throw new Error("プロフィールの更新に失敗しました");
      }

      const data = await response.json();
      setProfile(data.data);
      router.push(`/profile/${username}`);
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
    }
  };

  return {
    profile,
    loading,
    fetchProfile,
    updateProfile,
  };
};

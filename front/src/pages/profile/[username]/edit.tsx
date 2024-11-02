import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { HeaderLayout } from "../../../app/components/layout/HeaderLayout";
import styles from "./edit.module.css";
import { useProfileEdit } from "../../../app/hooks/profileEdit";

interface UserProfile {
  username: string;
  nickname: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const { data: session } = useSession();
  const { profile, loading, fetchProfile, updateProfile } = useProfileEdit();

  // セッションチェック - 他人のプロフィールは編集不可
  useEffect(() => {
    if (session?.user?.name !== username) {
      router.push(`/profile/${username}`);
    }
  }, [session, username]);

  // プロフィール情報の取得
  useEffect(() => {
    fetchProfile();
  }, [username]);

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profileData = {
      nickname: formData.get("nickname") as string,
      bio: formData.get("bio") as string,
      location: formData.get("location") as string,
      website: formData.get("website") as string,
    };
    await updateProfile(profileData);
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <HeaderLayout>
      <div className={styles.editContainer}>
        <div className={styles.editCard}>
          <h1 className={styles.editTitle}>プロフィール編集</h1>

          <form className={styles.editForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="nickname">ニックネーム</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                className={styles.input}
                defaultValue={profile?.nickname}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bio">自己紹介</label>
              <textarea
                id="bio"
                name="bio"
                className={styles.textarea}
                defaultValue={profile?.bio}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location">場所</label>
              <input
                type="text"
                id="location"
                name="location"
                className={styles.input}
                defaultValue={profile?.location}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="website">Webサイト</label>
              <input
                type="url"
                id="website"
                name="website"
                className={styles.input}
                defaultValue={profile?.website}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveButton}>
                保存
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => router.push(`/profile/${username}`)}
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </HeaderLayout>
  );
}

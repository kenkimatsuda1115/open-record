import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { HeaderLayout } from "../../../app/components/layout/HeaderLayout";
import { useProfile } from "../../../app/hooks/useProfile";
import styles from "./index.module.css";

interface UserProfile {
  username: string;
  nickname: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
  followers: number;
  following: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const { data: session } = useSession();
  const { profile, loading, fetchProfile, goToEditProfile } = useProfile();

  // プロフィールを取得 TODO: 良い取得方法を考える
  useEffect(() => {
    fetchProfile();
  }, [username]);
  console.log("[[profile]]", profile);

  if (loading) {
    return (
      <HeaderLayout>
        <div className="flex justify-center items-center min-h-screen">
          読み込み中...
        </div>
      </HeaderLayout>
    );
  }

  if (!profile) {
    return (
      <HeaderLayout>
        <div className="flex justify-center items-center min-h-screen">
          ユーザーが見つかりません
        </div>
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          {/* ヘッダー部分 */}
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              {/* TODO: アバターを表示する */}
              <div className={styles.avatar}></div>
            </div>
            <div className={styles.userInfo}>
              <h1 className={styles.nickname}>{profile.nickname}</h1>
              <p className={styles.username}>@{profile.username}</p>
              <p className={styles.location}>location: {profile.location}</p>
            </div>
          </div>

          {/* プロフィール情報 */}
          <div className={styles.profileContent}>
            <div className={styles.bioSection}>
              <span className={styles.bioLabel}>自己紹介:</span>
              <span>{profile.bio}</span>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>メールアドレス:</span>
                <span className={styles.infoValue}>{profile.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>登録日:</span>
                <span className={styles.infoValue}>{profile.updatedAt}</span>
              </div>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Webサイト:</span>
                <a href={profile.website} className={styles.websiteLink}>
                  {profile.website}
                </a>
              </div>
            </div>

            {/* 編集ボタン（自分のプロフィールの場合のみ表示） */}
            {session?.user?.name === username && (
              <div className="mt-6">
                <button onClick={goToEditProfile} className={styles.editButton}>
                  プロフィールを編集
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
}

"use client";
import React from "react";
import styles from "./index.module.css";
import { useForgetPassword } from "../../app/hooks/useForgetPassword";
import Button from "../../app/components/ui/Button/Button";
import Footer from "../../app/components/ui/Footer/Footer";
import Input from "../../app/components/ui/Input/Input";
import { PROJECT_NAME } from "@/utils/constants";
export default function ForgetPassword() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    newPassword,
    setNewPassword,
    newPasswordConfirm,
    setNewPasswordConfirm,
    error,
    forgetPassword,
    goToLogin,
  } = useForgetPassword();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <div className={styles.titleGroup}>
            <div className={styles.title}>{PROJECT_NAME}</div>
            <div className={styles.description}>
              オープンレコードは、様々な記録を管理するシステムです。
            </div>
            <div className={styles.subTitle}>パスワード再設定</div>
          </div>

          <form className={styles.forgetPasswordForm}>
            <div className={`${styles.inputGroup} ${styles.username}`}>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                label="ユーザー名"
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.email}`}>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                label="メールアドレス"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.password}`}>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                label="新しいパスワード"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.password}`}>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                label="パスワード確認"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              onClick={forgetPassword}
              disabled={
                newPassword !== newPasswordConfirm ||
                !username ||
                !email ||
                !newPassword
              }
              style={{
                opacity:
                  newPassword !== newPasswordConfirm ||
                  !username ||
                  !email ||
                  !newPassword
                    ? 0.5
                    : 1,
                cursor:
                  newPassword !== newPasswordConfirm ||
                  !username ||
                  !email ||
                  !newPassword
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              再設定
            </Button>
            {newPassword !== newPasswordConfirm && (
              <p className={styles.errorMessage}>パスワードが一致しません</p>
            )}
            {error && <p className={styles.errorMessage}>{error}</p>}
            <Button type="button" onClick={goToLogin}>
              ログイン画面へ
            </Button>
          </form>
        </div>
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

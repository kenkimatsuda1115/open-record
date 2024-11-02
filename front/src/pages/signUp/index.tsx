"use client";
import styles from "./index.module.css";
import { useSignUp } from "../../app/hooks/useSignUp";
import Button from "../../app/components/ui/Button/Button";
import Footer from "../../app/components/ui/Footer/Footer";
export default function SignUp() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    error,
    signUp,
    goToLogin,
  } = useSignUp();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <div className={styles.titleGroup}>
            <div className={styles.title}>Open Record</div>
            <div className={styles.description}>
              オープンレコードは、様々な記録を管理するシステムです。
            </div>
            <div className={styles.subTitle}>新規登録</div>
          </div>

          <form className={styles.signUpForm}>
            <div className={`${styles.inputGroup} ${styles.username}`}>
              <label htmlFor="username">ユーザー名</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.email}`}>
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.password}`}>
              <label htmlFor="password">パスワード</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.password}`}>
              <label htmlFor="passwordConfirm">パスワード確認</label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              onClick={signUp}
              disabled={
                password !== passwordConfirm || !username || !email || !password
              }
              style={{
                opacity:
                  password !== passwordConfirm ||
                  !username ||
                  !email ||
                  !password
                    ? 0.5
                    : 1,
                cursor:
                  password !== passwordConfirm ||
                  !username ||
                  !email ||
                  !password
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              登録
            </Button>
            {password !== passwordConfirm && (
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

"use client";
import styles from "./page.module.css";
import Button from "./components/ui/Button/Button";
import Footer from "./components/ui/Footer/Footer";
import { useLogin } from "./page.hook";

/**
 * ログイン画面
 * - ユーザー名とパスワードを入力してログインする
 * - 新規登録ボタンを押すと新規登録画面に遷移する
 * TODO: CSSをtailwindに統一する
 * TODO: ログインAPIを作成する
 */
export default function Home() {
  const { username, setUsername, password, setPassword, error, login, signUp } =
    useLogin();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <div className={styles.titleGroup}>
            <div className={styles.title}>Open Record</div>
            <div className={styles.description}>
              オープンレコードは、様々な記録を管理するシステムです。
            </div>
            <div className={styles.subTitle}>ログイン</div>
          </div>

          <form className={styles.loginForm}>
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
            <Button type="submit" onClick={login}>
              ログイン
            </Button>
            {error && (
              <div className={styles.errorMessage}>
                ログインに失敗しました。
              </div>
            )}
            <Button onClick={signUp}>新規登録</Button>
          </form>
        </div>
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

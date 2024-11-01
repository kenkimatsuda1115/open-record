"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "./components/ui/Button/Button";
import { useLogin } from "./page.hook";

export default function Home() {
  const inputStyles: { [key: string]: React.CSSProperties } = {
    username: {
      width: "100%",
      color: "#ff0000",
      backgroundColor: "#ffe6e6",
      border: "1px solid #ffcccc",
      borderRadius: "5px",
      padding: "10px",
      gap: "10px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    password: {
      width: "100%",
      color: "#0000ff",
      backgroundColor: "#e6f2ff",
      border: "1px solid #cce0ff",
      borderRadius: "5px",
      padding: "10px",
      gap: "10px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    loginForm: {
      color: "#000000",
      backgroundColor: "#ffffff",
      border: "1px solid #000000",
      borderRadius: "5px",
      padding: "10px",
      gap: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    // 入力フォームエリア
    inputArea: {
      gap: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    errorMessage: {
      color: "#ff0000",
      fontSize: "18px",
      display: "flex",
    },
    signUpButton: {
      color: "#ffffff",
      backgroundColor: "#000000",
      border: "1px solid #000000",
      borderRadius: "5px",
      padding: "2px 10px",
      gap: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const isError = false;
  const LOGIN_ERROR_MESSAGE = "ログインに失敗しました。";
  const { username, setUsername, password, setPassword, error, login, signUp } =
    useLogin();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          {/* <div className={styles.imageContainer}>
            <Image
              src="/next.png"
              alt="Login Image"
              width={300}
              height={300}
              priority
            />
          </div> */}

          <form className={styles.loginForm} style={inputStyles.inputArea}>
            <div className={styles.inputGroup} style={inputStyles.username}>
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
            <div className={styles.inputGroup} style={inputStyles.password}>
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
            <Button type="submit" style={inputStyles.loginForm} onClick={login}>
              ログイン
            </Button>
            {isError && (
              <div style={inputStyles.errorMessage}>{LOGIN_ERROR_MESSAGE}</div>
            )}
            <Button style={inputStyles.signUpButton} onClick={signUp}>
              新規登録
            </Button>
          </form>
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="https://jser.info/" target="_blank" rel="noopener noreferrer">
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          https://jser.info/
        </a>
        <a href="https://zenn.dev/" target="_blank" rel="noopener noreferrer">
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          https://zenn.dev/
        </a>
      </footer>
    </div>
  );
}

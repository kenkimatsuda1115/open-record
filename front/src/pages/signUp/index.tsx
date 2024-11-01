"use client";
import Image from "next/image";
// import logo from '../../app/logo.jpg';
import styles from "../../app/page.module.css";
// import useSignUp from "../../app/hooks/signUp.hook";
import Button from "../../app/components/ui/Button/Button";

export default function SignUp() {
  // const { username, setUsername, email, setEmail, password, setPassword, passwordConfirm, setPasswordConfirm, signUp, goToLogin } = useSignUp();

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
    email: {
      width: "100%",
      color: "#00ff00",
      backgroundColor: "#e6ffe6",
      border: "1px solid #ccffcc",
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
    signUpForm: {
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
    inputArea: {
      width: "100%",
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
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          {/* <div className={styles.imageContainer}>
            <Image
              src={logo}
              alt="Sign Up Image"
              width={300}
              height={300}
              priority
            />
          </div> */}

          <form className={styles.signUpForm} style={inputStyles.inputArea}>
            <div className={styles.inputGroup} style={inputStyles.username}>
              <label htmlFor="username">ユーザー名</label>
              <input
                type="text"
                id="username"
                name="username"
                // value={username}
                value="test"
                // onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup} style={inputStyles.email}>
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                // value={email}
                value="test"
                // onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup} style={inputStyles.password}>
              <label htmlFor="password">パスワード</label>
              <input
                type="password"
                id="password"
                name="password"
                // value={password}
                value="test"
                // onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup} style={inputStyles.password}>
              <label htmlFor="passwordConfirm">パスワード確認</label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                // value={passwordConfirm}
                value="test"
                // onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              // className={styles.signUpButton}
              style={inputStyles.signUpForm}
              // onClick={signUp}
              // disabled={password !== passwordConfirm}
            >
              登録
            </Button>
            {/* {password !== passwordConfirm && (
              <p style={inputStyles.errorMessage}>パスワードが一致しません</p>
            )} */}
            <Button
              type="button"
              // className={styles.signUpButton}
              style={inputStyles.signUpForm}
              // onClick={goToLogin}
            >
              ログイン画面へ
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

import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";

export const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ
    if (password !== passwordConfirm) {
      setError("パスワードが一致しません");
      return;
    }
    // TODO: 入力内容のチェック
    if (username === "" || email === "" || password === "") {
      setError("入力内容を確認してください");
      return;
    }
    if (password.length < 8) {
      setError("パスワードは8文字以上で入力してください");
      return;
    }
    if (email.includes("@") === false) {
      setError("メールアドレスが不正です");
      return;
    }

    try {
      // TODO: ユーザー登録APIを呼び出す

      // 成功したらログイン画面に遷移
      router.push("/");
    } catch (error) {
      console.error("サインアップエラー:", error);
    }
  };

  const goToLogin = () => {
    router.push("/");
  };

  return {
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
  };
};

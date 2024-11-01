import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";

export const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const signUp = async () => {
    if (password !== passwordConfirm) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      // TODO: ユーザー登録APIを呼び出す
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

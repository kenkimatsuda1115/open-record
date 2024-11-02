import { useState } from "react";
import { useRouter } from "next/router";

export const useForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const forgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      setError("パスワードが一致しません");
      return;
    }
    if (!username || !email || !newPassword) {
      setError("入力内容を確認してください");
      return;
    }
    if (newPassword.length < 8) {
      setError("パスワードは8文字以上で入力してください");
      return;
    }
    if (!email.includes("@")) {
      setError("メールアドレスが不正です");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            newPassword,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "パスワード再設定に失敗しました");
        return;
      }
      // パスワード再設定が成功したらログイン画面にリダイレクト
      router.push("/");
    } catch (error) {
      console.error("パスワード再設定エラー:", error);
      setError("パスワード再設定に失敗しました");
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
    newPassword,
    setNewPassword,
    newPasswordConfirm,
    setNewPasswordConfirm,
    error,
    forgetPassword,
    goToLogin,
  };
};

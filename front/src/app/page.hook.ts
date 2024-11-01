"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if (result?.error) {
      setError(true);
      console.log("[[error]]", result.error);
    } else {
      router.push(`/dashboard/${username}`);
    }
  };
  const signUp = async () => {
    /** ユーザー登録画面に遷移する */
    router.push("/signUp");
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    login,
    signUp,
  };
};

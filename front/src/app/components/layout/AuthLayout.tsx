import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * 認証済みのユーザーのみアクセスできるレイアウト
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  // ユーザー名の検証
  if (username && session.user?.name !== username) {
    router.push("/");
    return null;
  }

  if (session.user?.name !== username) {
    return (
      <div>
        You are not authorized to access this page.
        <button onClick={() => router.back()}>戻る</button>
      </div>
    );
  }

  return <>{children}</>;
}

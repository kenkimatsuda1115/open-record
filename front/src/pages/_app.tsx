import type { AppType, AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Auth({ children }: { children: React.ReactNode }) {
  /**
   * 認証状態を取得して、認証されていない場合はリダイレクトする
   */
  const { data: session, status } = useSession();
  const router = useRouter();
  // 認証が不要なページのリスト
  const publicPaths = ["/signUp", "/", "/forgetPassword"];

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated" && router.pathname === "/") {
      // 認証済みの場合はダッシュボードにリダイレクト
      router.push(`/dashboard/${session.user?.name}`);
    } else if (
      // 認証されていない場合はログインページにリダイレクト
      status === "unauthenticated" &&
      !publicPaths.includes(router.pathname)
    ) {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </SessionProvider>
  );
};

export default MyApp;

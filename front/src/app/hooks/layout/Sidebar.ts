import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const useSidebar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const navigateToDashboard = () => {
    /**
     * ダッシュボードページに遷移する
     */
    router.push(`/dashboard/${session?.user?.name}`);
  };

  const navigateToProfile = () => {
    /**
     * プロフィールページに遷移する
     */
    if (session?.user?.name) {
      router.push(`/profile/${session.user.name}`);
    }
  };

  return {
    navigateToProfile,
    navigateToDashboard,
  };
};

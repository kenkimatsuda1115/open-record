import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const useHeaderLayout = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const navigateToDashboard = () => {
    router.push(`/dashboard/${session?.user?.name}`);
  };

  return {
    navigateToDashboard,
  };
};

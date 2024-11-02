import { AuthLayout } from "../../../app/components/layout/AuthLayout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React from "react";
import { HeaderLayout } from "../../../app/components/layout/HeaderLayout";

function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <AuthLayout>
      <HeaderLayout>
        <div>{session?.user?.name}さんのダッシュボード</div>
      </HeaderLayout>
    </AuthLayout>
  );
}

export default Dashboard;

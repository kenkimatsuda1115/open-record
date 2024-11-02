import { AuthLayout } from "../../../app/components/layout/AuthLayout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <AuthLayout>
      <div>
        <h1>Second</h1>
        <p>ユーザー名: {session?.user?.name}</p>
        <button
          onClick={() => {
            router.back();
          }}
        >
          戻る
        </button>
      </div>
    </AuthLayout>
  );
}

export default Dashboard;

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const { username } = router.query;

  if (!session) {
    return <div>Loading...</div>;
  }
  if (session.user?.name !== username) {
    return (
      <div>
        You are not authorized to access this page.
        <button
          onClick={() => {
            router.back();
          }}
        >
          戻る
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Second</h1>
      <button
        onClick={() => {
          router.back();
        }}
      >
        戻る
      </button>
    </div>
  );
}

export default Dashboard;

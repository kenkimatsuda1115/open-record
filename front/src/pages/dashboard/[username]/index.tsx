import { AuthLayout } from "../../../app/components/layout/AuthLayout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React from "react";
import { HeaderLayout } from "../../../app/components/layout/HeaderLayout";
import styles from "./index.module.css";

function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <AuthLayout>
      <HeaderLayout>
        <div className={styles.container}>
          <div className={styles.dashboard}>
            <div className={styles.username}>
              {session?.user?.name}さんのダッシュボード
            </div>

            {/* データ投入セクション */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>データを投入</h2>
              <div className={styles.uploadButtons}>
                <button
                  className={`${styles.button} ${styles.documentButton}`}
                  onClick={() => {
                    /* TODO: ファイル選択ダイアログを開く */
                  }}
                >
                  ドキュメントをアップロード
                </button>
                <button
                  className={`${styles.button} ${styles.csvButton}`}
                  onClick={() => {
                    /* TODO: CSVアップロード処理 */
                  }}
                >
                  CSVをアップロード
                </button>
              </div>
            </div>

            {/* データリスト表示セクション */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>投入済みデータ一覧</h2>
              <div className={styles.grid}>
                {/* TODO: 実際のデータをmapで表示 */}
                {[
                  {
                    id: 1,
                    title: "サンプルドキュメント1",
                    type: "PDFファイル",
                    date: "2024/03/21",
                  },
                  {
                    id: 2,
                    title: "サンプルCSV1",
                    type: "CSVファイル",
                    date: "2024/03/20",
                  },
                  {
                    id: 3,
                    title: "サンプルドキュメント2",
                    type: "PDFファイル",
                    date: "2024/03/22",
                  },
                  {
                    id: 4,
                    title: "サンプルCSV2",
                    type: "CSVファイル",
                    date: "2024/03/23",
                  },
                ].map((item) => (
                  <div key={item.id} className={styles.card}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardMeta}>
                      {item.type} - {item.date}
                    </p>
                    <div className={styles.cardActions}>
                      <button
                        className={`${styles.actionButton} ${styles.detailButton}`}
                      >
                        詳細
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </HeaderLayout>
    </AuthLayout>
  );
}

export default Dashboard;

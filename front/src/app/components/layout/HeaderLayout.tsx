import "@/app/globals.css";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import Button from "../ui/Button/Button";
import styles from "./HeaderLayout.module.css";
import { PROJECT_NAME } from "@/utils/constants";
import { HamburgerButton } from "./HamburgerButton";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

interface HeaderLayoutProps {
  children: ReactNode;
}

export function HeaderLayout({ children }: HeaderLayoutProps) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Sidebar isOpen={isSidebarOpen} />
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HamburgerButton
            isOpen={isSidebarOpen}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <h1 className={styles.title}>{PROJECT_NAME}</h1>
        </div>
        <div className={styles.username}>ユーザー名: {session?.user?.name}</div>

        <div className={styles.logoutButton}>
          <Button onClick={() => signOut({ callbackUrl: "/" })}>
            ログアウト
          </Button>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}

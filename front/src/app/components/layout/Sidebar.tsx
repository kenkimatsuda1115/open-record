import React from "react";
import styles from "./Sidebar.module.css";
import { useSidebar } from "../../hooks/layout/Sidebar";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const { navigateToProfile, navigateToDashboard } = useSidebar();
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarItems}>
        <div className={styles.sidebarItem} onClick={navigateToDashboard}>
          ホーム
        </div>
        <div className={styles.sidebarItem} onClick={navigateToProfile}>
          プロフィール
        </div>
        <div className={styles.sidebarItem}>メニュー2</div>
        <div className={styles.sidebarItem}>メニュー3</div>
      </div>
    </div>
  );
};

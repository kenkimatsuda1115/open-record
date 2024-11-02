import React from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <nav>
        <ul>
          <li>メニュー1</li>
          <li>メニュー2</li>
          <li>メニュー3</li>
        </ul>
      </nav>
    </div>
  );
};

import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const footerStyles: { [key: string]: React.CSSProperties } = {
    footer: {
      width: "100%",
      gap: "24px",
      fontSize: "18px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <div style={footerStyles.footer}>
      <a href="https://jser.info/" target="_blank" rel="noopener noreferrer">
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        https://jser.info/
      </a>
      <a href="https://zenn.dev/" target="_blank" rel="noopener noreferrer">
        <Image
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        https://zenn.dev/
      </a>
    </div>
  );
}

import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.FormEvent) => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  style,
  children,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

/**
 * Storybook用のコメント
 *
 * このコンポーネントは共通のボタンコンポーネントです。
 * 使用例:
 * <Button type="submit" onClick={handleSubmit} style={customStyle}>送信</Button>
 *
 * Props:
 * - type: ボタンのタイプ ('button' | 'submit' | 'reset')
 * - onClick: ボタンがクリックされたときのハンドラ
 * - style: カスタムスタイル
 * - children: ボタンのラベルや内容
 * - disabled: ボタンが無効かどうか
 */

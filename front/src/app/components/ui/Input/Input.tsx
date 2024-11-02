import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  id: string;
  name: string;
  type: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
}

/**
 * ラベル付きの入力フォーム
 */

const Input = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
  required = false,
}: InputProps) => {
  return (
    <div className={`${styles.inputGroup}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;

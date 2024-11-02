import React from "react";
import styles from "../../../../pages/signUp/index.module.css";
import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

// TODO: ドキュメントを充実させる
/**
 * Inputコンポーネントのメタデータ
 */
const meta: Meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

export const Text: StoryObj = {
  args: {
    id: "username",
    name: "username",
    type: "text",
    label: "ユーザー名",
    value: "",
    onChange: () => {},
    style: `${styles.inputGroup} ${styles.username}`,
  },
};
export const Email: StoryObj = {
  args: {
    id: "email",
    name: "email",
    type: "email",
    label: "メールアドレス",
    value: "",
    onChange: () => {},
    className: `${styles.inputGroup} ${styles.email}`,
  },
};

export const Password: StoryObj = {
  args: {
    id: "password",
    name: "password",
    type: "password",
    label: "パスワード",
    value: "",
    onChange: () => {},
    className: `${styles.inputGroup} ${styles.password}`,
  },
};

export const WithError: StoryObj = {
  args: {
    id: "email",
    name: "email",
    type: "email",
    label: "メールアドレス",
    value: "",
    onChange: () => {},
    className: `${styles.inputGroup} ${styles.email}`,
  },
};

import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import Button from "./Button";

/**
 * Buttonコンポーネントのメタデータ
 * - 全画面で利用可能なボタンコンポーネント
 * - デフォルトのボタン、送信ボタン、無効なボタンのストーリーを提供
 */
const meta: Meta = {
  title: "UI/Button", // Storybookで表示されるコンポーネントのタイトル
  component: Button, // Storybookで使用するコンポーネント
  argTypes: {
    type: {
      control: {
        type: "select", // ドロップダウンメニューを使用して選択
        options: ["button", "submit", "reset"], // 選択肢
      },
    },
    onClick: { action: "clicked" }, // onClickイベントをアクションとして設定
    style: { control: "object" }, // スタイルをオブジェクトとして設定
    children: { control: "text" }, // ボタンのラベルをテキストとして設定
    disabled: { control: "boolean" }, // disabledプロパティをブール値として設定
  },
  tags: ["autodocs"], // 自動ドキュメント生成を有効化
};

export default meta;

// テンプレートコンポーネントを定義し、引数を受け取ってButtonコンポーネントを返します
const Template: StoryFn = (args) => <Button children={undefined} {...args} />;

/**
 * デフォルトのボタンのストーリー
 */
export const Default = Template.bind({});
Default.args = {
  type: "button",
  children: "ボタン",
  disabled: false,
};

/**
 * 送信ボタンのストーリー
 */
export const Submit = Template.bind({});
Submit.args = {
  type: "submit",
  children: "送信",
  disabled: false,
};

/**
 * 無効なボタンのストーリー
 */
export const Disabled = Template.bind({});
Disabled.args = {
  type: "button",
  children: "無効なボタン",
  disabled: true,
};

import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import Footer from "./Footer";

/**
 * Footerコンポーネントのメタデータ
 * - パブリック画面で利用可能なフッターコンポーネント
 */
const meta: Meta = {
  title: "UI/Footer", // Storybookで表示されるコンポーネントのタイトル
  component: Footer, // Storybookで使用するコンポーネント
  parameters: {
    layout: "fullscreen", // フルスクリーンレイアウトを適用
  },
  tags: ["autodocs"], // 自動ドキュメント生成を有効化
};

export default meta;

// テンプレートコンポーネントを定義し、引数を受け取ってButtonコンポーネントを返します
const Template: StoryFn = (args) => <Footer {...args} />;

/**
 * デフォルトのフッターのストーリー
 */
export const Default: StoryObj = {
  render: () => <Footer />,
  name: "デフォルトフッター",
  parameters: {
    docs: {
      description: {
        story:
          "パブリック画面で使用される標準的なフッターコンポーネントです。外部リンクを含みます。",
      },
    },
  },
};

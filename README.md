# open-record

## 概要

このプロジェクトは、オープンソースの記録・管理システムです。
様々な記録を管理する目的で作成しています。

## ディレクトリ構造

```
.
├── backend # バックエンド
├── front # フロントエンド
├── package.json # パッケージマネージャー
├── libs # バックエンド・フロントエンドで共通のライブラリがあれば
├── playwright # TODO: e2eテストのディレクトリの場所を検討
└── README.md # このファイル
```

### 主な機能

- ユーザー認証システム
- データの記録・管理
- MongoDB を使用したデータベース管理

### 技術スタック

#### フロントエンド

- Next.js
  - NextAuth.js (認証)
- TypeScript
- Storybook
- Jest
- Playwright
- ESLint
- Prettier

#### バックエンド TODO: これから検討

- Node.js
- Express
- TypeScript
- MongoDB (データベース)
- Jest
- ESLint
- Prettier

## 開発環境構築

### front

```bash
cd front
pnpm install
```

### backend

```bash
cd backend
pnpm install
```

## 開発用コマンド例

### フロントエンド (Next.js)

```bash
cd front
pnpm dev
```

### バックエンド (Node.js)

```bash
cd backend
pnpm dev
```

### テスト

```bash
cd backend
pnpm test
```

### TypeScriptのチェック

```bash
cd front
pnpm tsc
```

### storybook

```bash
cd front
pnpm storybook
```

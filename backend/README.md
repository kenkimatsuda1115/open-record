# バックエンドプロジェクト構成

このプロジェクトはドメイン駆動設計(DDD)のアーキテクチャパターンに従って構築されています。

## 主な技術スタック

- Express - Node.jsウェブアプリケーションフレームワーク
- TypeScript - 型安全な開発環境
- MongoDB - NoSQLデータベース
- Jest - テストフレームワーク
- bcrypt - パスワードハッシュ化

### mongoDBの設定

#### mongoDBを起動 (Mac)

```bash
brew services start mongodb-community
```

#### mongoDBのデータベースを作成

```bash
use <database_name（ex. open-record）>
```

## プロジェクト構造

src/
├── application/ # アプリケーション層
│ └── services/ # ユースケースの実装
├── domain/ # ドメイン層
│ ├── entities/ # エンティティ
│ └── repositories/ # リポジトリインターフェース
├── infrastructure/ # インフラストラクチャ層
│ ├── database/ # データベース接続
│ ├── models/ # Mongooseモデル
│ └── repositories/ # リポジトリ実装
└── interfaces/ # インターフェース層
├── controllers/ # コントローラー
├── middleware/ # ミドルウェア
│ └── errorHandler.ts # エラーハンドリング
└── routes/ # ルーティング

## ドメイン駆動設計(DDD)のルール

- ドメイン層はビジネスロジックを表現する
- アプリケーション層はユースケースを表現する
- インフラストラクチャ層はデータベースとのインターフェースを表現する
- インターフェース層は外部APIとのインターフェースを表現する

## 環境構築

### 1. 必要なパッケージのインストール

```bash
pnpm install
```

## 開発サーバーの起動

```bash
pnpm run dev
```

### 2. 環境変数の設定

必要な環境変数を`.env`ファイルに設定してください。
MONGODB_URI=<MongoDBのURI>
PORT=<ポート番号（ex. 3001）>

### 3. データベースの準備

- MongoDBをローカルにインストールするか、MongoDBアトラスのアカウントを用意してください
- `.env`ファイルにMONGODB_URIを設定してください

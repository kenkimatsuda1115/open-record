import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/database/mongoose";
import authRoutes from "./interfaces/routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { context } from "./graphql/context";
import { typeDefs, resolvers } from "./graphql/schema";

dotenv.config();

const app = express();

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context
});

const startServer = async () => {
  await server.start(); // Apollo Serverの起動
};
startServer();

// ミドルウェア
app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context,
  }),
);

// データベース接続
connectDB();

// ルート TODO: グラフQLのルートに変更した場合は削除
app.use("/api", authRoutes);

// エラーハンドリング
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}/graphql`);
  console.log(`サーバーが起動しました: http://localhost:${PORT}/api`);
});

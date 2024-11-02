import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/database/mongoose";
import authRoutes from "./interfaces/routes/userRoutes";
// import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

// ミドルウェア
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

// データベース接続
connectDB();

// ルート
app.use("/api", authRoutes);

// // エラーハンドリング
// app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});

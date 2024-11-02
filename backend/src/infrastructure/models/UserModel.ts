import mongoose from "mongoose";
import { CounterModel } from "./CounterModel";

export interface IUser {
  id: number;
  username: string;
  hashedPassword: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  id: { type: Number, required: true },
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// シーケンスを管理するためのカウンターを作成
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterModel.findByIdAndUpdate(
      { _id: "userId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    this.id = counter.seq;
  }
  next();
});

export const UserModel = mongoose.model<IUser>("User", userSchema);

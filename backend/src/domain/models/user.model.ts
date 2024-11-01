import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  password: string;
  email: string;
}

const userSchema = new mongoose.Schema<IUser>({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);

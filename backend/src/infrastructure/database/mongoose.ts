import mongoose from "mongoose";

const mongoUri = "<TODO: MONGO_URI>";

export async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

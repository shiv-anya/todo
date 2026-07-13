import mongoose from "mongoose";
export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo connected");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

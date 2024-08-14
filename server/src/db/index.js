import mongoose from "mongoose";
import { DB_NAME, MONGODB_URI } from "../constant.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log(
      `\nMongoDB connected !! DB Host: ${connection.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;

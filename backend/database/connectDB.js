import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }


    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database connected successfully");
  } catch (error) {
    throw new Error(error?.message || "Error in DB connection");
    process.exit(1)
  }
};


export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB Connected Successfully..!!");
  } catch (error) {
    console.log("mongoDb connection failed:", error.message);
  }
};

export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("DB connected ✅");
  } catch (err) {
    console.log("DB failed ❌", err.message);
  }
};

start();

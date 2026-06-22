import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.routes.js";
import AuthRoute from "./routes/AuthRoute.js";
import commentRoutes from "./routes/commentRoutes.js";
import profilePicture from "./routes/user.routes.js";
import connectionRoutes from "./routes/connectionRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("uploads"));
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : ["http://localhost:3000"];

app.use(cors({ origin: allowedOrigins, credentials: true }));
// routes
app.use("/Auth", AuthRoute);
app.use("/user", profilePicture);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/connection", connectionRoutes);

const PORT = process.env.PORT || 9090;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Database connected ✅");

    app.listen(PORT,() => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("DB connection failed ❌");
    console.log(error.message);
  }
};

start();

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// import middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"

const app = express();
const PORT = process.env.PORT || 5100;

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/api/v1", (req, res) => {
    res.json({msg: "Hello from server!"})
})


// handle errors
app.use(errorHandlerMiddleware);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(0);
}

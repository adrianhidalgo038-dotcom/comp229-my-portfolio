//import express from "express";
//var express = require("express");
//var app = express();
import connectDB from "./server/database.js";

// Connect to MongoDB
connectDB();

import app from "./server/express.js";
import router from "./server/assets-router.js";
import cookieParser from "cookie-parser";
import authRoutes from "./server/routes/authRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/src", router);
app.use("/", function (req, res) {
  res.send("Welcome to User application");
});
app.listen(3000);
console.log("Server running at http://localhost:3000/");
//module.exports = app;
export default app;

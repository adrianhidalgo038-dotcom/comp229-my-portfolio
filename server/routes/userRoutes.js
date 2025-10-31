import express from "express";
import {
  getUsers, getUserById, createUser, updateUser, deleteUser, deleteAllUsers,
  login, logout, me
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import mongoose from "mongoose";

const router = express.Router();

const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid id format" });
  }
  next();
};

// CRUD
router.get("/", getUsers);
router.get("/:id", validateId, getUserById);
router.post("/", createUser);
router.put("/:id", validateId, updateUser);
router.delete("/:id", validateId, deleteUser);
router.delete("/", deleteAllUsers);

// Auth
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/me", auth, me);

export default router;

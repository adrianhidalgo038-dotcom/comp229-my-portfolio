import express from "express";
import mongoose from "mongoose";
import {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} from "../controllers/qualificationController.js";

const router = express.Router();

const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid id format" });
  }
  next();
};

router.get("/", getQualifications);
router.get("/:id", validateId, getQualificationById);
router.post("/", createQualification);
router.put("/:id", validateId, updateQualification);
router.delete("/:id", validateId, deleteQualification);
router.delete("/", deleteAllQualifications);

export default router;

import Qualification from "../models/qualification.js";

// GET all
export const getQualifications = async (_req, res) => {
  const docs = await Qualification.find().sort({ completion: -1 });
  res.json(docs);
};

// GET by id
export const getQualificationById = async (req, res) => {
  const doc = await Qualification.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

// POST create
export const createQualification = async (req, res) => {
  try {
    const doc = await Qualification.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update
export const updateQualification = async (req, res) => {
  try {
    const doc = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE by id
export const deleteQualification = async (req, res) => {
  const doc = await Qualification.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Qualification deleted" });
};

// DELETE all
export const deleteAllQualifications = async (_req, res) => {
  const result = await Qualification.deleteMany({});
  res.json({ deletedCount: result.deletedCount });
};

import Project from "../models/project.js";

// GET all
export const getProjects = async (req, res) => {
  const docs = await Project.find().sort({ completion: -1 });
  res.json(docs);
};

// GET by id
export const getProjectById = async (req, res) => {
  const doc = await Project.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

// POST create
export const createProject = async (req, res) => {
  try {
    const doc = await Project.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update by id
export const updateProject = async (req, res) => {
  try {
    const doc = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE by id
export const deleteProject = async (req, res) => {
  const doc = await Project.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Project deleted" });
};

// DELETE all
export const deleteAllProjects = async (_req, res) => {
  const result = await Project.deleteMany({});
  res.json({ deletedCount: result.deletedCount });
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// ---------- CRUD ----------
export const getUsers = async (_req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "name, email, password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already used" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const update = {};
  if (name) update.name = name;
  if (email) update.email = email;
  if (password) update.password = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(req.params.id, update, {
    new: true, runValidators: true, select: "-password"
  });
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const u = await User.findByIdAndDelete(req.params.id);
  if (!u) return res.status(404).json({ message: "Not found" });
  res.json({ message: "User deleted" });
};

export const deleteAllUsers = async (_req, res) => {
  const r = await User.deleteMany({});
  res.json({ deletedCount: r.deletedCount });
};

// ---------- Auth ----------
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
};

// Stateless logout (client drops token). Provided for assignment completeness.
export const logout = async (_req, res) => {
  res.json({ message: "Logged out (discard token on client)" });
};

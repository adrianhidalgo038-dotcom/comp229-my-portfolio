//authController
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "User"
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRET123",             // change this later for environment variable
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.json({
      message: "Signin successful",
      token,
      user: { name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signed out" });
};

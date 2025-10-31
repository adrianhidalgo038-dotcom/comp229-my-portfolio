import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    created:  { type: Date, default: Date.now },
    updated:  { type: Date }
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

const User = mongoose.model("User", userSchema);
export default User;

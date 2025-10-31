import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // automatically adds createdAt and updatedAt
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;

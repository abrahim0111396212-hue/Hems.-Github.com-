import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  sector: String,
  department: String
},{timestamps:true});

export default mongoose.model("User", userSchema);
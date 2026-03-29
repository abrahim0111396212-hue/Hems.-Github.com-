import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: String,
  name: String,
  quantity: Number,
  minLimit: Number,
  productionDate: Date,
  expiryDate: Date,
  barcode: String,
  purchasePrice: Number,
  salePrice: Number
},{timestamps:true});

export default mongoose.model("Product", productSchema);
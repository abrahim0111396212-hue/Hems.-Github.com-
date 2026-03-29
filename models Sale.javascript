import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  userId: String,
  productName: String,
  quantity: Number,
  totalPrice: Number,
  paymentMethod: String, // cash, bank, debt
  remainingAmount: Number,
  returnDate: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Sale", saleSchema);
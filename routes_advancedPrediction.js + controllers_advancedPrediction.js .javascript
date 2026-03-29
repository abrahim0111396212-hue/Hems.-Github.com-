import express from "express";
import auth from "../middleware/auth.js";
import { advancedPrediction } from "../controllers/advancedPrediction.js";
const router = express.Router();
router.get("/", auth, advancedPrediction);
export default router;
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

export const advancedPrediction = async(req,res)=>{
  const userId = req.user.id;
  const sales = await Sale.find({userId});
  const products = await Product.find({userId});
  const today = new Date();

  const predictions = products.map(product=>{
    const dailySales = sales.filter(s=>s.productName===product.name)
                            .filter(s=> new Date(s.createdAt)>= new Date(today.getTime()-30*24*60*60*1000));
    const totalQty = dailySales.reduce((sum,s)=>sum+s.quantity,0);
    const avgDaily = totalQty/30||0;
    const predictedWeek = avgDaily*7;

    const demand = avgDaily*30;
    const orderingCost = 50;
    const holdingCost = 5;
    const EOQ = Math.sqrt(2*demand*orderingCost/holdingCost);

    const predictedStockEnd = product.quantity - predictedWeek;
    const lowStock = predictedStockEnd<product.minLimit;

    return {product:product.name,avgDaily,predictedWeek,EOQ:Math.round(EOQ),predictedStockEnd,lowStock};
  });

  res.json(predictions);
}
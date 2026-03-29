import Product from "../models/Product.js";
import Sale from "../models/Sale.js";

export const getDashboard = async(req,res)=>{
  const userId = req.user.id;
  const products = await Product.find({userId});
  const sales = await Sale.find({userId});
  const today = new Date();

  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum,p)=>sum+p.quantity,0);
  const lowStock = products.filter(p=>p.quantity<=p.minLimit).length;
  const totalSales = sales.reduce((sum,s)=>sum+s.totalPrice,0);
  const todaySales = sales.filter(s=>new Date(s.createdAt).toDateString()===today.toDateString())
                          .reduce((sum,s)=>sum+s.totalPrice,0);
  const totalDebt = sales.filter(s=>s.paymentMethod==="debt")
                         .reduce((sum,s)=>sum+s.remainingAmount,0);
  const dueDebt = sales.filter(s=>{
    if(s.paymentMethod!=="debt") return false;
    const diff = (new Date(s.returnDate)-today)/(1000*60*60*24);
    return diff<=7;
  }).length;

  res.json({totalProducts,totalQuantity,lowStock,totalSales,todaySales,totalDebt,dueDebt});
}
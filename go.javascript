import Sale from "../models/Sale.js";

export const getAnalytics = async(req,res)=>{
  const userId = req.user.id;
  const sales = await Sale.find({userId});

  const daily = {};
  sales.forEach(s=>{
    const date = new Date(s.createdAt).toLocaleDateString();
    daily[date] = (daily[date]||0)+s.totalPrice;
  });

  const products = {};
  sales.forEach(s=>{
    products[s.productName] = (products[s.productName]||0)+s.quantity;
  });
  const topProducts = Object.entries(products).sort((a,b)=>b[1]-a[1]).slice(0,5);

  const payments = {cash:0,bank:0,debt:0};
  sales.forEach(s=>payments[s.paymentMethod]+=s.totalPrice);

  res.json({daily,topProducts,payments});
}
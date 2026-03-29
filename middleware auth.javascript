import jwt from "jsonwebtoken";

export default function(req,res,next){
  const token = req.header("Authorization");
  if(!token) return res.status(401).json({error:"لا يوجد توكن"});

  try{
    const verified = jwt.verify(token,process.env.JWT_SECRET);
    req.user = verified;
    next();
  }catch(err){
    res.status(401).json({error:"توكن غير صالح"});
  }
}
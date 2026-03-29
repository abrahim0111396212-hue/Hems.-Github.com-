import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// تسجيل جديد
router.post("/register", async (req,res)=>{
  try{
    const {fullName,email,phone,password,sector,department} = req.body;
    const hashed = await bcrypt.hash(password,10);

    const user = new User({fullName,email,phone,password:hashed,sector,department});
    await user.save();

    res.json({message:"تم التسجيل بنجاح"});
  }catch(err){ res.status(500).json({error:err.message}); }
});

// تسجيل دخول
router.post("/login", async(req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error:"المستخدم غير موجود"});
    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(400).json({error:"كلمة المرور خاطئة"});

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.json({token});
  }catch(err){ res.status(500).json({error:err.message}); }
});

export default router;
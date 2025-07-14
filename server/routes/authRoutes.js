import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const router=express.Router();
router.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(user) return res.status(400).json({error:'Email already registered'});

        const newUser=await User.create({name,email,password});
        await newUser.save();
        
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
            expiresIn:'1d'
        });
        res.json({token});
    }catch(err){
        res.json({error:err.message})
    }
})

router.post('/login',async (req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:'Invalid User'});
        }
        const isMatch=await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({error:'Incorrect Password'});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1d'
        });

        res.json({token});
        
    }catch(err){
        res.json({error:err.message})
    }
})

export default router;
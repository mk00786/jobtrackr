import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Job from "../models/Job.js";

const router=express.Router();

//POST /auth/jobs
router.post('/',authMiddleware,async (req,res)=>{
    try{
        const newJob=await Job({...req.body,createdBy:req.userId});
        await newJob.save();
        res.status(201).json(newJob);
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

//GET /auth/jobs
router.get('/',authMiddleware,async (req,res)=>{
    try{
        const jobs=await Job.find({createdBy:req.userId}).sort({createdAt:-1});
        res.status(200).json(jobs);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

export default router;
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

//GET all jobs /auth/jobs
router.get('/',authMiddleware,async (req,res)=>{
    try{
        const jobs=await Job.find({createdBy:req.userId}).sort({createdAt:-1});
        res.status(200).json(jobs);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

//GET stats route
router.get('/stats',authMiddleware,async (req,res)=>{
    try{
        const jobs=await Job.find({createdBy:req.userId});
        const stats={
            Applied:0,
            Interviewing:0,
            Offered:0
        };

        jobs.forEach((job)=>{
            if(stats[job.status]!==undefined) stats[job.status]++;
        })
        res.json(stats);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

//Get specific job
router.get('/:id',authMiddleware,async(req,res)=>{
    try{
        const job=await Job.findOne({_id:req.params.id,createdBy:req.userId});
        if(!job) return res.status(404).json({error:'No job found'});
        res.json(job);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

//update job
router.put('/:id',authMiddleware,async (req,res)=>{
    try{
        const updatedJob=await Job.findOneAndUpdate({_id:req.params.id,createdBy:req.userId},req.body,{new:true,runValidators:true});
        if(!updatedJob) return res.status(404).json({error:'Job not found'});
        res.json(updatedJob);
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

//delete job
router.delete('/:id',authMiddleware,async (req,res)=>{
    try{
        const deleteJob=await Job.findOneAndDelete({_id:req.params.id,createdBy:req.userId});
        if(!deleteJob) return res.status(404).json({error:'Job not found'});
        res.json({message:'Job deleted'});
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

export default router;
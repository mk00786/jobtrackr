import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import jobRoutes from './routes/jobRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app=express();
const PORT=process.env.PORT||4000;


app.use(cors());
app.use(express.json());

//API routes
app.use('/auth/jobs',jobRoutes);
app.use('/auth',authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB connected successfully');
    app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`));
})
.catch(err=>console.error('MongoDB connection error',err.message));
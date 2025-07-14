import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jobRoutes from './routes/jobRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());

//API routes
app.use('/auth/jobs',jobRoutes);
app.use('/auth',authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB connected successfully');
    app.listen(5000,()=>console.log('Server is running at port 5000'));
})
.catch(err=>console.log(err))
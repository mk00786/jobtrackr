import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:String,
    company:String,
    location:String,
    status:{
        type:String,
        enum:['Applied','Interviewing','Offered'],
        default:'Applied'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

export default mongoose.model('Job',jobSchema);
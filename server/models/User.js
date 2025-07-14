import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true   
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
});

// Hash password before saving
UserSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

//Comparing Password
UserSchema.methods.comparePassword=async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
}

export default mongoose.model('User',UserSchema);
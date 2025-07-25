import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useState,useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import api from '../../utils/api'
import { toast } from 'react-toastify'
import {Loader2} from 'lucide-react';

const Login = () => {
    const [loading,setLoading]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState({email:'',password:''});

    const {login,token}=useAuth();
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        if(token){
            const redirectTo=location.state?.from?.pathname||'/dashboard';
            navigate(redirectTo);
        }
    },[navigate,token,location.state]);

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSuccess=(token)=>{
        login(token);
        toast.success('Login Successfull');
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const {email,password}=formData;

        if(!email||!password){
            toast.error('Email and Password are required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            toast.error('Email is invalid');
            return;
        } 

        if(password.length<6){
            toast.error('Password must be of 6 characters');
            return;
        }

        try{
            setLoading(true);
            const res=await api.post('/auth/login',{email,password});
            handleSuccess(res.data.token);
        }catch(err){
            console.error('Login Error:',err);
            toast.error(err.response?.data?.message||'Invalid Credentials');
        }finally{
            setLoading(false);
            setFormData({email:'',password:''});
        }
    }

    if(loading){
        return (
            <div className='flex justify-center items-center h-[70vh]'>
                <Loader2 className='animate-spin w-8 h-8 text-blue-600'/>
            </div>
        )
    }

  return (
    <div  className='max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
        <form onSubmit={handleSubmit} autoComplete='on'>

        <input className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none 
        focus:ring-2 focus:ring-blue-500"type='email' name='email' value={formData.email} 
        autoFocusplaceholder='Enter email' onChange={handleChange}/>

        <div className='relative mb-4'>
            <input className='w-full p-3 border border-gray-300 rounded pr-10 focus:outline-none
            focus:ring-2 focus:ring-blue-500' type={showPassword?'text':'password'} 
            name='password' value={formData.password} placeholder='Enter password' 
            onChange={handleChange}/>

            <span className="absolute right-3 top-3 text-sm cursor-pointer text-blue-600 select-none"
            onClick={()=>setShowPassword((prev)=>!prev)}>
                {showPassword?'Hide':'Show'}
            </span>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition 
        duration-200" disabled={loading} type='submit'>{loading?'Logging In':'Login'}</button>
    </form>

    <p className="mt-4 text-sm text-center text-gray-600">Don't have any Account?{" "}
    <span className="text-blue-500 hover:underline cursor-pointer" onClick={()=>navigate('/register')}>
        Register Here
    </span>
    </p>
    </div>
    
  )
}

export default Login

import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

const Login = () => {

    const [formData,setFormData]=useState({
        email:'',
        password:''
    })

    const {login}=useAuth();
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();

        try{
            const res=await api.post('/auth/login',formData);
            
            if(!formData.email||!formData.password){
                alert('All fields are required');
                return;
            }

            login(res.data.token);
            alert('Login Successfull');
            navigate('/');
        }catch(err){
            console.error(err);
            alert('Login Failed');
        }
    }

  return (
    <div  className='max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md'>
        <h2 className='text-xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
        <input className='w-full p-2 border rounded mb-2' type='email' name='email' value={formData.email} placeholder='Enter email' onChange={handleChange}/>
        <input className='w-full p-2 border rounded mb-2' type='password' name='password' value={formData.password} placeholder='Enter password' onChange={handleChange}/>
        <button className='w-full bg-blue-600 text-white py-2 rounded cursor-pointer' type='submit'>Login</button>
    </form>
    <p className='mt-4 text-sm'>Don't have any Account?{" "}
    <span className='text-blue-500 hover:underline cursor-pointer' onClick={()=>navigate('/register')}>
        Register Here
    </span>
    </p>
    </div>
    
  )
}

export default Login

import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    });

    const {login}=useAuth();
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();

        if(!formData.name||!formData.email||!formData.password){
            alert('All fields are mandatory');
            return;
        }

        try{
            const res=await axios.post('http://localhost:5000/auth/register',formData);
            login(res.data.token);
            alert('Registration Successfull');
            navigate('/');
        }catch(err){
            console.error(err);
            alert('Registration Failed');
        }
    }

  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md'>
        <h2 className='text-xl font-bold mb-4'>Register</h2>
        <form onSubmit={handleSubmit}>
            <input className='w-full p-2 border rounded mb-2' placeholder='Enter name' type='text' value={formData.name} name='name' onChange={handleChange} required/>
            <input className='w-full p-2 border rounded mb-2' placeholder='Enter email' type='email' value={formData.email} name='email' onChange={handleChange} required/>
            <input className='w-full p-2 border rounded mb-2' placeholder='Enter password' type='password' value={formData.password} name='password' onChange={handleChange} required/>
            <button className='w-full bg-blue-600 text-white py-2 rounded cursor-pointer' type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register

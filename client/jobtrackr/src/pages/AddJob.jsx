import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const AddJob = () => {
  const [formData,setFormData]=useState({
    title:'',
    company:'',
    location:'',
    status:'Applied'
  });
  
  const navigate=useNavigate();

  const {token}=useAuth();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();

    if(!formData.title||!formData.company||!formData.location){
      toast.error('All fields are required');
      return;
    }

    try{
      const res=await api.post('/auth/jobs',formData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log('Added job:', res.data);

      toast.success('Job added successfully');
      navigate('/');

      setFormData({
        title:'',
        company:'',
        location:'',
        status:'Applied'
      })

    }catch(err){
      console.error(err);
      toast.error('Error adding job');
    }
  }

  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>Add Job</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input name='title' placeholder='Enter title'  onChange={handleChange} className='w-full p-2 block border'/>
        <input name='company' placeholder='Enter company' onChange={handleChange} className='w-full p-2 block border'/>
        <input name='location' placeholder='Enter location' onChange={handleChange} className='w-full p-2 block border'/>
        <select name='status' className='w-full p-2 block border' onChange={handleChange}>
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offered</option>
        </select>
        <button className='bg-blue-500 px-4 py-2 rounded text-white' type='submit'>Add Job</button>
      </form>
    </div>
  )
}

export default AddJob

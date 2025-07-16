import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useParams,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import api from '../../utils/api';

const EditJob = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const {token}=useAuth();

    const [formData,setFormData]=useState({
        title:'',
        company:'',
        location:'',
        status:'Applied'
    });

    useEffect(()=>{
        const fetchJobById=async ()=>{
            try{
                const res=await api.get(`/auth/jobs/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
              
                setFormData(res.data);
            }catch(err){
                toast.error('Failed to fetch job');
            }
        }

        fetchJobById();
    },[id,token]);

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{
            await api.put(`/auth/jobs/${id}`,formData,{
                headers:{Authorization:`Bearer ${token}`}
            })
            toast.success('Job updated successfully');
            navigate('/');
        }catch(err){
            toast.error('Unable to update job');
        }
    }

  return (
    <div>
      <h1 className='text-xl font-bold mb-4 '>Edit Job</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input type='text' placeholder='Title' className='w-full block p-2 border' 
        onChange={handleChange} name='title' value={formData.title}/>
        <input type='text' placeholder='Company' className='w-full block p-2 border' 
        onChange={handleChange} name='company' value={formData.company}/>
        <input type='text' placeholder='Location' className='w-full block p-2 border' 
        onChange={handleChange} name='location' value={formData.location}/>

        <select onChange={handleChange} name='status' value={formData.status}
        className='w-full p-2 border block'>
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offered</option>
        </select>
        <button className='bg-blue-500 px-4 py-2 text-white rounded' type='submit'>Update Job</button>
      </form>
    </div>
  )
}

export default EditJob

import React from 'react'
import {useAuth} from '../context/AuthContext.jsx'
import { useState } from 'react'
import { useEffect } from 'react';
import {toast} from 'react-toastify'
import api from '../../utils/api.js';

const Stats = () => {
  const [stats,setStats]=useState({
    Applied:0,
    Interviewing:0,
    Offered:0
  });
  const {token}=useAuth();

  useEffect(()=>{
    const fetchStats=async ()=>{
      try{
        const res=await api.get('/auth/jobs/stats',{
          headers:{Authorization:`Bearer ${token}`}
        });
        setStats(res.data);
      }catch(err){
        toast.error('Failed to fetch stats');
      }
    }

    fetchStats();
  },[token]);

  const cardStyles={
    Applied:'text-blue-800 bg-blue-100',
    Interviewing:'text-yellow-800 bg-yellow-100',
    Offered:'text-green-100 bg-green-800'
  };

  return (
    <div >
    <h1 className='text-xl font-bold mb-6'>Job Application Status</h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
      {Object.entries(stats).map((([status,count])=>(
        <div key={status} className={`p-6 ${cardStyles[status]} rounded shadow`}>
            <h2 className='text-lg font-semibold'>{status}</h2>
            <p className='text-2xl font-bold'>{count}</p>
        </div>
      )))}
      </div>
    </div>
  )
}

export default Stats

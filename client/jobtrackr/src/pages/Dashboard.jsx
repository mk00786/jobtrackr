import React from 'react'
import JobCard from '../components/JobCard'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../utils/api';

const Dashboard = () => {
  const {token}=useAuth();
  const [jobs,setJobs]=useState([]);
  const [sortOrder,setSortOrder]=useState('newest');
  const [searchTerm,setSearchTerm]=useState('');

  const fetchJobs=async ()=>{
      try{
        let res=await api.get('/auth/jobs',{
          headers:{Authorization:`Bearer ${token}`}
        });
        setJobs(res.data);
      }catch(err){
        console.error(err);
        alert("Error fetching jobs");
      }
    }

  useEffect(()=>{
    fetchJobs();
  },[token]);

  // filterJob+ search by filter
  const filteredJobs=jobs.filter(job=>[job.title,job.company,job.location].some(field=>
    field.toLowerCase().includes(searchTerm.toLowerCase()))).sort((a,b)=>{
    if(sortOrder==='newest') return new Date(b.createdAt)-new Date(a.createdAt);
    if(sortOrder==='oldest') return new Date(a.createdAt)-new Date(b.createdAt);
    if(sortOrder==='az') return a.title.localeCompare(b.title);
    if(sortOrder==='za') return b.title.localeCompare(a.title);
    return 0;
});


  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>Your Jobs</h1>
      <div className='flex flex-col sm:flex-row gap-4 mb-4'>
        <input type='text' onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm}
          placeholder='Search Jobs ...' className='border w-full p-2 sm:w-1/2 rounded'
        />
        <select value={sortOrder} onChange={e=>setSortOrder(e.target.value)}
        className='w-full border p-2 sm:w-1/4'
        >
          <option value='newest'>Newest First</option>
          <option value='oldest'>Oldest First</option>
          <option value='az'>A-Z</option>
          <option value='za'>Z-A</option>
        </select>
      </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {filteredJobs.length>0?(
        <div>
          {filteredJobs.map(job=><JobCard key={job._id} job={job} refreshJobs={fetchJobs} />)}
        </div>
      ):<p>No Jobs Found</p>}
    </div>
    </div>
  )
}

export default Dashboard;

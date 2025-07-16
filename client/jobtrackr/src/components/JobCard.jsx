import React from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import api from '../../utils/api'

const JobCard = ({job,refreshJobs}) => {
  const navigate=useNavigate();
  const {token}=useAuth();

  const handleDelete=async ()=>{
    if(!window.confirm('Are you really want to delete this job')) return;

    try{
      await api.delete(`/auth/jobs/${job._id}`,
        {
          headers:{Authorization:`Bearer ${token}`}
        }
      );
      toast('Job deleted successfully');
      refreshJobs();//Refresh jobs after delete
    }catch(err){
      console.error(err);
      toast('Job delete Failed')
    }
  }

  return (
    <div className='border p-4 mb-4 rounded shadow'>
      <h3 className='text-lg font-bold'>{job.title}</h3>
      <p className='text-gray-600'>{job.company} • {job.location}</p>
      <span className={`inline-block mt-3 px-2 py-1 text-xs rounded-full 
      ${job.status==='Applied'?'bg-blue-100 text-blue-800':job.status==='Interviewing'?
      'bg-yellow-100 text-yellow-800':'bg-green-100 text-green-800'}`}>{job.status}</span>
      <div className='flex space-x-2 mt-4'>
        <button className='bg-yellow-500 text-white px-3 py-1 rounded' 
        onClick={()=>navigate(`/edit-job/${job._id}`)}>Edit</button>
        <button className='bg-red-500 text-white px-3 py-1 rounded' 
        onClick={handleDelete}>Delete</button>
      </div>
      
    </div>
  )
}

export default JobCard
